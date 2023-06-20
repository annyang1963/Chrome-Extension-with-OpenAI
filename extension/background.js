chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'getSelectedText') {
      chrome.tabs.executeScript({
          file: 'content.js'
      }, function() {
          chrome.tabs.sendMessage(sender.tab.id, {action: 'getSelectedText'}, function(response) {
              if (response && response.selectedText) {
                  sendResponse({selectedText: response.selectedText});
              } else {
                  sendResponse({});
              }
          });
      });
      return true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'generateAnswer') {
      fetch('http://127.0.0.1:8000/process', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              question: request.question,
              text: request.text
          })

      })
      .then(response => {
          return response.json();
      })
      .then(data => {
          sendResponse(data);
      })
      .catch(error => console.error(error));
      return true;
  }
});
