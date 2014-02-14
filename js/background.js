var key = "neo-dt";

var setIcon = function(tabId, themeId) {
  var details = {"tabId": tabId, "path": "img/" + themeId + ".png"};
  chrome.pageAction.setIcon(details);
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf(".neopets.com") >= 0) {
    chrome.storage.local.get(key, function(result) {
      if (!$.isEmptyObject(result)) {
        setIcon(tabId, result[key]);
      }
    });
    chrome.pageAction.show(tabId);
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    setIcon(tabs[0].id, changes[key].newValue);
  });
});
