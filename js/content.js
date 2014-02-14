var theme = "011_alc_c1d1c";

document.addEventListener("DOMNodeInserted", function(ev) {
  var html = ev.relatedNode.innerHTML;
  if ((html.indexOf("/themes/") != -1) && (html.indexOf(theme) == -1)) {
    ev.relatedNode.innerHTML = html.replace(/.{3}_.*_.{5}/, theme);
  }
}, false);

/** TODO: Handle footer images properly instead of removing them. **/
$(".footerNifty").remove();
