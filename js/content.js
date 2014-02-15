var key = "neo-dt";
var regex = /[0-9]{3}_[a-z0-9]*_[a-z0-9]{5}/;

var random = Math.random();
var rotations;

$.getJSON(chrome.extension.getURL("data/rotations.json"), function(data) {
  rotations = data;
});

var fixSrc = function(img, theme, path) {
  img.attr("src", chrome.extension.getURL("img/themes/" + theme + path));
};

var fixImages = function(theme) {
  var eventIcon = $(".eventIcon img");
  var url = eventIcon.attr("src");
  if (url) {
    fixSrc(eventIcon, theme, "/events" + url.substring(url.lastIndexOf("/")));
  }

  var footerImg = $(".footerNifty");
  if (rotations && footerImg.attr("src")) {
    rotation = Math.floor(random * rotations[theme]) + 1;
    fixSrc(footerImg, theme, "/rotations/" + rotation + ".png");
  }
};

document.addEventListener("DOMNodeInserted", function(ev) {
  var html = ev.relatedNode.innerHTML;
  if (ev.relatedNode.localName == "head" && html.indexOf("/themes/") != -1) {
    chrome.storage.local.get(key, function (result) {
      var theme = result[key];
      if (!$.isEmptyObject(result) && html.indexOf(theme) == -1) {
        ev.relatedNode.innerHTML = html.replace(regex, theme);
      }
      fixImages(theme);
    });
  }
}, false);

chrome.runtime.onMessage.addListener(function(theme, sender, sendResponse) {
  $("link").each(function(i, stylesheet) {
    var url = $(stylesheet).attr("href");
    if (url && url.indexOf("themes") > 0) {
      $(stylesheet).attr("href", url.replace(regex, theme));
    }
    fixImages(theme);
  });
});
