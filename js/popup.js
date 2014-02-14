var key = "neo-dt";

var select = function(id) {
  var theme = $("#" + id);
  $("#themes li").not(theme).removeClass("selected");
  theme.addClass("selected");
  $("#current").html(theme.html());
};

chrome.storage.local.get(key, function (result) {
  $.getJSON("data/themes.json", function(themes) {
    var list = "";
    $.each(themes, function(name, id) {
      list += "<li id='" + id + "'><img src='http://images.neopets.com/themes/" +
      id + "/events/trade_offer.png' class='thumbnail'>" + name + "</li>";
    });
    $("#themes").html(list);

    if (!$.isEmptyObject(result)) {
      select(result[key]);
    }

    $("#themes li").click(function() {
      var change = {};
      var id = $(this).attr("id");
      select(id);
      change[key] = id;
      chrome.storage.local.set(change);
    });
  });
});
