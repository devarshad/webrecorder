var _WTStatus = localStorage.WRStatus;

$(document).ready(function () {
    $checkbox = $('#status');
    if (localStorage.getItem("WTStatus") == "true") {
        $checkbox.prop("checked", true);
        chrome.tabs.executeScript(null, { file: "jquery-3.1.0.min.js" });
        chrome.tabs.executeScript(null, { file: "bg.js" });
    }
    else
        $checkbox.prop("checked", false);
    /**
    *disable click event of status button
    **/
    $('#status-label').on("click", function (e) {
        e.preventDefault();
    });

    $('#status-label').on("mousedown", function (e) {
        if ($checkbox.prop("checked") == false) {
            localStorage.setItem('WTStatus', "true");
            chrome.tabs.executeScript(null, { file: "jquery-3.1.0.min.js" });
            chrome.tabs.executeScript(null, { file: "bg.js" });
        } else {
            localStorage.setItem('WTStatus', "false");
        }
        $checkbox.prop("checked", !$checkbox.prop("checked"));
    });
})