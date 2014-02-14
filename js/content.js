var key = "neo-dt";
var regex = /[0-9]{3}_[a-z0-9]*_[a-z0-9]{5}/;

document.addEventListener("DOMNodeInserted", function(ev) {
  var html = ev.relatedNode.innerHTML;
  if (ev.relatedNode.localName == "head" && html.indexOf("/themes/") != -1) {
    chrome.storage.local.get(key, function (result) {
      if (!$.isEmptyObject(result) && html.indexOf(result[key]) == -1) {
        ev.relatedNode.innerHTML = html.replace(regex, result[key]);
      }
    });
  }
}, false);

chrome.runtime.onMessage.addListener(function(theme, sender, sendResponse) {
  $("link").each(function(i, stylesheet) {
    var url = $(stylesheet).attr("href");
    if (url && url.indexOf("themes") > 0) {
      $(stylesheet).attr("href", url.replace(regex, theme));
    }
  });
});

/* TODO: Handle images. */
