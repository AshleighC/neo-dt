var theme = "011_alc_c1d1c";

$("link").each(function(i, stylesheet) {
  var url = $(stylesheet).attr("href");
  if (url.indexOf("themes") > 0) {
    var i = url.indexOf("?");
    url = (i > 0) ? url.substring(0, i) : url;
    url = url.replace(/.{3}_.{3}_.{5}/, theme);
    $(stylesheet).attr("href", url);
  }
});

/** TODO: Handle footer images properly instead of removing them. **/
$(".footerNifty").remove();
