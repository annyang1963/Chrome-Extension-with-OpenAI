chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Inside content.js")
    if (request.action == 'getSelectedText') {
        console.log("Inside getSelectedText")
        var selectedText = window.getSelection().toString();
        sendResponse({
            selectedText: selectedText
        });
    }
});
