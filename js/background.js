chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf(".neopets.com") >= 0) {
    chrome.pageAction.show(tabId);
  }
});
