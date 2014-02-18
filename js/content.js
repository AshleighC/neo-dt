var key = "neo-dt";
var regex = /[0-9]{3}_[a-z0-9]*_[a-z0-9]{5}/;

var themeId = false;
var css;
var random;

var setVars = function(theme, newRand) {
  themeId = theme;
  css = chrome.extension.getURL("css/themes/" + theme + ".css");
  if (newRand || (typeof random == "undefined")) {
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

var fixBanner = function(animate) {
  $("#ad-table").remove();
  $("#pushdown_banner").css("pointer-events", "none");

  var banner = $("#ban");
  var ad = $("#ad-slug-wrapper");
  var hide = themeId.match("bir|sfp");

  if (ad.length != 0) {
    ad.height(90);
    banner.offset({"top": 20});
    banner.height(hide ? 0 : 94);
  } else {
    banner.height(hide ? 90 : 94);
  }
};

var fixSrc = function(img, theme, path) {
  img.attr("src", chrome.extension.getURL("img/themes/" + theme + path));
};

var fixImages = function(animate) {
  if (themeId) {
    fixBanner(animate);

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

    $(".nav_image img, .copyright img").each(function(i, img) {
      var url = $(img).attr("src");
      var match = url.match(regex);
      if (match) {
        fixSrc($(img), themeId, url.substr(match.index + match[0].length));
      }
    });
  }
};

var imageInterval = setInterval(fixImages, 100);

var replaceInnerHTML = function(node) {
  var html = node.innerHTML;
  if (css && themeId && html.indexOf(themeId) == -1) {
    node.innerHTML = html.replace(
        /http:\/\/images\.neopets\.com\/css\/themes\/.{0,20}\.css/g, css);
  }
};

document.addEventListener("DOMNodeInserted", function(ev) {
  fixImages();
  var node = ev.relatedNode;
  var html = node.innerHTML;
  if ((node.localName == "head") && (html.indexOf("/themes/") != -1)) {
    if (themeId) {
      replaceInnerHTML(node);
    } else if (themeId == undefined) {
      var currentTheme = html.match(regex)[0];
      chrome.runtime.sendMessage({"theme": currentTheme});
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
    fixImages(true);
  });
});
