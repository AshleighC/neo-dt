var key = "neo-dt";
var regex = /[0-9]{3}_[a-z0-9]*_[a-z0-9]{5}/;

var themeId;

chrome.storage.local.get(key, function (result) {
  themeId = result[key];
});

var random = Math.random();
var rotations;

$.getJSON(chrome.extension.getURL("data/rotations.json"), function(data) {
  rotations = data;
});

var fixSrc = function(img, theme, path) {
  img.attr("src", chrome.extension.getURL("img/themes/" + theme + path));
};

var fixImages = function() {
  if (themeId) {
    var eventIcon = $(".eventIcon img");
    var url = eventIcon.attr("src");
    if (url) {
      fixSrc(eventIcon, themeId, "/events" +
          url.substring(url.lastIndexOf("/")));
    }

    var footerImg = $(".footerNifty");
    if (rotations && footerImg.attr("src")) {
      rotation = Math.floor(random * rotations[themeId]) + 1;
      fixSrc(footerImg, themeId, "/rotations/" + rotation + ".png");
    }
  }
};

var imageInterval = setInterval(fixImages, 100);

var replaceInnerHTML = function(node, theme) {
  var html = node.innerHTML;
  if (theme && html.indexOf(theme) == -1) {
    node.innerHTML = node.innerHTML.replace(regex, theme);
  }
};

document.addEventListener("DOMNodeInserted", function(ev) {
  fixImages();
  var node = ev.relatedNode;
  var html = node.innerHTML;
  if ((node.localName == "head") && (html.indexOf("/themes/") != -1)) {
    if (themeId) {
      replaceInnerHTML(node, themeId);
    } else {
      chrome.storage.local.get(key, function(result) {
        replaceInnerHTML(node, result[key]);
      });
    }
  }
}, false);

$(document).ready(function() {
  clearInterval(imageInterval);
});

chrome.runtime.onMessage.addListener(function(theme, sender, sendResponse) {
  themeId = theme;
  random = Math.random();
  $("link").each(function(i, stylesheet) {
    var url = $(stylesheet).attr("href");
    if (url && url.indexOf("themes") > 0) {
      $(stylesheet).attr("href", url.replace(regex, theme));
    }
    fixImages();
  });
});
