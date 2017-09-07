$(document).ready(function () {
    $('*').click(function (e) {
        fetchDetails(this);
    });

    function fetchDetails(obj) {
        console.log('ID:' + obj.id + ', Unique:' + UNIQUE(obj.tagName + '#' + obj.id));
        console.log('Class:' + obj.className + ', Unique:' + UNIQUE(obj.className));
        console.log('Name :' + obj.name + ', Unique:' + UNIQUE(obj.name));
        console.log('TagName:' + obj.tagName + ', Unique:' + UNIQUE(obj.tagName));
        console.log('CSSPath:' + $(obj).getCSSPath() + ', Unique:true');
        console.log('XPath:' + $(obj).getXPath() + ', Unique:true');
    }
});

function UNIQUE(obj) {
    return $(obj).length == 1;
}

/**
*Get unique css path
**/
jQuery.fn.getCSSPath = function () {
    var path = '', _tempPath = '', node = this, isParent = false;
    while (node.length) {
        var realNode = node[0], name = (

            // IE9 and non-IE
            realNode.localName ||

            // IE <= 8
            realNode.tagName ||
            realNode.nodeName

        );

        if (!name) {
            break;
        };

        if (isParent) {
            _tempPath = name + (path ? '>' + path : '');
            if (UNIQUE(_tempPath)) {
                path = _tempPath;
                break;
            }
        } else if (UNIQUE(name)) {
            path = name;
            break;
        }

        // on IE8, nodeName is '#document' at the top level, but we don't need that
        if (!name || name == '#document') break;

        name = name.toLowerCase();
        if (realNode.id) {
            name = realNode.tagName + '[id=\'' + realNode.id + '\']';
            if (isParent) {
                _tempPath = name + (path ? '>' + path : '');
                if (UNIQUE(_tempPath)) {
                    path = _tempPath;
                    break;
                }
            } else if (UNIQUE(name)) {
                path = name;
                break;
            }
        }


        if (realNode.className) {
            name = realNode.tagName + '[ID=\'' + realNode.id + '\'][CLASS=\'' + realNode.className + '\']';

            if (isParent) {
                _tempPath = name + (path ? '>' + path : '');
                if (UNIQUE(_tempPath)) {
                    path = _tempPath;
                    break;
                }
            } else if (UNIQUE(name)) {
                path = name;
                break;
            }
        }

        var parent = node.parent();

        var sameTagSiblings = parent.children(name);
        if (sameTagSiblings.length > 1) {
            allSiblings = parent.children();
            var index = allSiblings.index(realNode) + 1;
            if (index > 1) {
                name += ':NTH-CHILD(' + index + ')';
            }
        }

        path = name + (path ? '>' + path : '');
        if (UNIQUE(path))
            break;
        node = parent;
        isParent = true;
    }


    return path;
};

/**
*Get unique xpath
**/
jQuery.fn.getXPath = function () {
    var path = '', _tempPath = '', node = this, isParent = false;
    while (node.length) {
        var realNode = node[0], name = (

            // IE9 and non-IE
            realNode.localName ||

            // IE <= 8
            realNode.tagName ||
            realNode.nodeName

        );

        if (!name) {
            break;
        };

        if (isParent) {
            _tempPath = name + (path ? '>' + path : '');
            if (UNIQUE(_tempPath)) {
                path = _tempPath;
                break;
            }
        } else if (UNIQUE(name)) {
            path = name;
            break;
        }

        // on IE8, nodeName is '#document' at the top level, but we don't need that
        if (!name || name == '#document') break;

        if (realNode.id) {
            name = realNode.tagName + '[ID=\'' + realNode.id + '\']';
            if (isParent) {
                _tempPath = name + (path ? '>' + path : '');
                if (UNIQUE(_tempPath)) {
                    path = _tempPath;
                    break;
                }
            } else if (UNIQUE(name)) {
                path = name;
                break;
            }
        }


        if (realNode.className) {
            name = realNode.tagName + '[ID=\'' + realNode.id + '\' ][CLASS=\'' + realNode.className + '\']';

            if (isParent) {
                _tempPath = name + (path ? '>' + path : '');
                if (UNIQUE(_tempPath)) {
                    path = _tempPath;
                    break;
                }
            } else if (UNIQUE(name)) {
                path = name;
                break;
            }
        }

        var parent = node.parent();

        var sameTagSiblings = parent.children(name);
        if (sameTagSiblings.length > 1) {
            allSiblings = parent.children();
            var index = allSiblings.index(realNode) + 1;
            if (index > 1) {
                name += ':NTH-CHILD(' + index + ')';
            }
        }

        path = name + (path ? '>' + path : '');
        if (UNIQUE(path))
            break;
        node = parent;
        isParent = true;
    }

    $.each(path.replace(/[^0-9\.]+/g, ',').split(','), function (i, o) {
        if (o != '') {
            path = path.replace(':NTH-CHILD(' + o + ')', '[' + (parseFloat(o) - 1) + ']');
        }
    })

    path = path.replace(/>/g, "//").replace(/ID=/g, "@ID=")
                                    .replace(/CLASS=/g, "@CLASS=")
                                    .replace(/]\[@CLASS=/g, "and @CLASS=");
    if (path.indexOf('document') != 0) {
        path = '//' + path;
    }
    return path;
};

/**
*Get unique css path(Not working)
**/
jQuery.fn.extend({
    getPath: function () {
        if (this.length != 1) throw 'Requires one element.';
        var path, node = this, isParent = false;

        do {
            var realNode = node[0];
            var name = (

                // IE9 and non-IE
                realNode.localName ||

                // IE <= 8
                realNode.tagName ||
                realNode.nodeName

            );

            switch (realNode.tagName) {
                case 'INPUT':
                    if ($(realNode).attr('name'))
                        name = 'input[name=' + $(realNode).attr('name') + ']';
                    else if ($(realNode).attr('type'))
                        name = 'input[type=' + $(realNode).attr('type') + ']';
                    break;
                default:
            }

            if (isParent) {
                if (UNIQUE(name + (path ? '>' + path : '')))
                    return name + (path ? '>' + path : '');
            } else if (UNIQUE(name))
                return name;

            // on IE8, nodeName is '#document' at the top level, but we don't need that
            if (!name || name == '#document') break;

            name = name.toLowerCase();

            if (realNode.id) {
                name += '#' + realNode.id;

                if (isParent) {
                    if (UNIQUE(name + (path ? '>' + path : '')))
                        return name + (path ? '>' + path : '');
                } else if (UNIQUE(name))
                    return name;
            }

            if (realNode.className) {
                name += '.' + realNode.className.split(/\s+/).join('.');

                if (isParent) {
                    if (UNIQUE(name + (path ? '>' + path : '')))
                        return name + (path ? '>' + path : '');
                } else if (UNIQUE(name))
                    return name;
            }

            var parent = node.parent(),
                siblings = parent.children(name);
            var tempName = name;

            if (siblings.length > 1)
                if (isParent) {
                    tempName += ':eq(' + siblings.index(node) + ')' + (path ? '>' + path : '');
                }
                else {
                    tempName += ':eq(' + siblings.index(node) + ')';
                }

            if ($(name).length == siblings.length) {
                return tempName;
            }
            path = tempName + (path ? ' > ' + path : '');

            node = parent;
            isParent = true;
        } while (node.length);

        return path;

    }
});