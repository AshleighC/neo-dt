var key = "neo-dt";
var regex = /[0-9]{3}_[a-z0-9]*_[a-z0-9]{5}/;

var theme = null;
var css;
var random;
var rotations;

var setVars = function(themeId, newRandom) {
  theme = themeId;
  css = chrome.extension.getURL("css/themes/" + theme + ".css");
  if (newRandom || (typeof random == "undefined")) {
    random = Math.random();
  }
};

chrome.storage.local.get(key, function (result) {
  setVars(result[key]);
});

$.getJSON(chrome.extension.getURL("data/rotations.json"), function(data) {
  rotations = data;
});

var imageInterval = setInterval(fixImages, 100);

var fixSrc = function(img, path) {
  img.attr("src", chrome.extension.getURL("img/themes/" + theme + path));
};

var imageFixes = {};

imageFixes["banner"] = function() {
  var banner = $("#ban");
  var ad = $("#ad-slug-wrapper");

  $("#ad-table").remove();
  $("#pushdown_banner").css("pointer-events", "none");

  if (ad.length != 0) {
    ad.height(90);
    banner.offset({"top": 20});
    banner.css({"top": 0, "height": theme.match("bir|sfp") ? 0 : 94});
  } else {
    banner.height(90);
  }
};

imageFixes["eventIcon"] = function() {
  var eventIcon = $(".eventIcon img");
  var url = eventIcon.attr("src");
  if (url) {
    fixSrc(eventIcon, "/events" + url.substring(url.lastIndexOf("/")));
  }
};

imageFixes["footerImage"] = function() {
  var footerImg = $(".footerNifty");
  if (rotations && footerImg.attr("src")) {
    rotation = Math.floor(random * rotations[theme]) + 1;
    fixSrc(footerImg, "/rotations/" + rotation + ".png");
  }
};

imageFixes["navigation"] = function() {
  $(".nav_image img, .copyright img").each(function(i, img) {
    var url = $(img).attr("src");
    var match = url.match(regex);
    if (match) {
      fixSrc($(img), url.substr(match.index + match[0].length));
    }
  });
};

var fixImages = function() {
  if (theme) {
    for (element in imageFixes) {
      imageFixes[element]();
    }
  }
};

var replaceTheme = function(node) {
  var html = node.innerHTML;
  if (theme) {
    if (css && !html.match(theme)) {
      node.innerHTML = html.replace(
          /http:\/\/images\.neopets\.com\/css\/themes\/.{0,20}\.css/g, css);
    }
  } else {
    chrome.runtime.sendMessage({"theme": html.match(regex)[0]});
  }
};

document.addEventListener("DOMNodeInserted", function(ev) {
  fixImages();
  var node = ev.relatedNode;
  if (node.localName == "head" && node.innerHTML.match("/themes/")) {
    if (theme === null) {
      chrome.storage.local.get(key, function(result) {
        setVars(result[key]);
        replaceTheme(node);
      });
    } else {
      replaceTheme(node);
    }
  }
}, false);

$(document).ready(function() {
  clearInterval(imageInterval);
});

chrome.runtime.onMessage.addListener(function(themeId, sender, sendResponse) {
  setVars(themeId, true);
  $("link").each(function(i, stylesheet) {
    var url = $(stylesheet).attr("href");
    if (url && url.indexOf("themes") > 0) {
      $(stylesheet).attr("href", css);
    }
    fixImages();
  });
});
