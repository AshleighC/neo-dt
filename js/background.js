var key = "neo-dt";

var setIcon = function(tabId, themeId) {
  var details = {
    "tabId": tabId,
    "path": "img/themes/" + themeId + "/events/trade_offer.png"
  };
  chrome.pageAction.setIcon(details);
  chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.match(/\.neopets.com/)) {
    chrome.storage.local.get(key, function(result) {
      if (!$.isEmptyObject(result)) {
        setIcon(tabId, result[key]);
      }
    });
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.tabs.query({url: "*://*.neopets.com/*"}, function(tabs) {
    $(tabs).each(function(i, tab) {
      var theme = changes[key].newValue;
      setIcon(tab.id, theme);
      chrome.tabs.sendMessage(tab.id, theme);
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getTopBannerOption")
      sendResponse({data: localStorage["enable_top_banner"]});
    else
      sendResponse({}); // snub them.
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  setIcon(sender.tab.id, message.theme);
  var change = {};
  change[key] = message.theme;
  chrome.storage.local.set(change);
});
