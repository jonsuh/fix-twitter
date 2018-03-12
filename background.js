chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.icym === true) {
      chrome.tabs.insertCSS(sender.tab.id, {
        file: "icym.css"
      });
    }
  }
);
