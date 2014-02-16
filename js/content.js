var key = "neo-dt";
var regex = /http:\/\/images\.neopets\.com\/css\/themes\/.{0,20}\.css/g;

var themeId;
var css;
var random;

var setVars = function(theme, newRand) {
  themeId = theme;
  css = chrome.extension.getURL("css/themes/" + theme + ".css");
  if (newRand) {
    random = Math.random();
  }
};

chrome.storage.local.get(key, function (result) {
  setVars(result[key]);
});

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

var replaceInnerHTML = function(node) {
  var html = node.innerHTML;
  if (css && themeId && html.indexOf(themeId) == -1) {
    node.innerHTML = html.replace(regex, css);
  }
};

document.addEventListener("DOMNodeInserted", function(ev) {
  fixImages();
  var node = ev.relatedNode;
  var html = node.innerHTML;
  if ((node.localName == "head") && (html.indexOf("/themes/") != -1)) {
    if (themeId) {
      replaceInnerHTML(node);
    } else {
      chrome.storage.local.get(key, function(result) {
        setVars(result[key]);
        replaceInnerHTML(node);
      });
    }
  }
}, false);

$(document).ready(function() {
  clearInterval(imageInterval);
});

chrome.runtime.onMessage.addListener(function(theme, sender, sendResponse) {
  setVars(theme, true);
  $("link").each(function(i, stylesheet) {
    var url = $(stylesheet).attr("href");
    if (url && url.indexOf("themes") > 0) {
      $(stylesheet).attr("href", css);
    }
    fixImages();
  });
});
