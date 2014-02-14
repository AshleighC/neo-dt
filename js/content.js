var theme = "011_alc_c1d1c";

document.addEventListener("DOMNodeInserted", function(ev) {
  if (ev.relatedNode.localName == "head") {
    $("link").each(function(i, stylesheet) {
      var url = $(stylesheet).attr("href");
      if (url && url.indexOf("themes") > 0) {
        var i = url.indexOf("?");
        url = (i > 0) ? url.substring(0, i) : url;
        url = url.replace(/.{3}_.{3}_.{5}/, theme);
        $(stylesheet).attr("href", url);
      }
    });
  }
}, false);

/** TODO: Handle footer images properly instead of removing them. **/
$(".footerNifty").remove();
