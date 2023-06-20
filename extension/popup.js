
document.addEventListener('DOMContentLoaded', function() {
    console.log("DomContentLoaded")  

    function getSelectedText() {
        console.log("Selected text")
        var selectedText
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'getSelectedText'}, function(response) {
                if (response && response.selectedText) {
                    selectedText = response.selectedText
                    console.log('Selected tex:', selectedText);
                } else {
                    console.log('No selected text received in popup.js');
                    selectedText=""
                }

                senttext(selectedText)
            });
        })

    }

    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', getSelectedText);

    function senttext(text) {

            console.log("Clicking popup submit")
            var question = document.getElementById('question').value;
            var selectedText = text
            console.log("Clicking popup submit", question)
            chrome.runtime.sendMessage({
                action: 'generateAnswer',
                question: question,
                text: text
            }, function(response) {
                console.log('Response received in popup.js:', response);
                var responseDiv = document.getElementById('response');
                responseDiv.innerHTML = response.answer;
            });
        
    }
});
