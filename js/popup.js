var key = "neo-dt";

var select = function(id, animate) {
  var theme = $("#" + id);
  $("#themes li").not(theme).removeClass("selected");
  theme.addClass("selected");

  if (animate) {
    var current = $("#current");
    var next = $("#next");
    current.animate({"left": "-100%"}, {
      "start": function() {
        next.html(theme.html());
        next.animate({"left": 0});
      },
      "complete": function() {
        current.html(next.html());
        current.css("left", 0);
        next.html("");
        next.css("left", "100%");
      }
    });
  } else {
    $("#current").html(theme.html());
  }
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
      select(result[key], false);
    }

    $("#themes li").click(function() {
      var change = {};
      var id = $(this).attr("id");
      select(id, true);
      change[key] = id;
      chrome.storage.local.set(change);
    });
  });
});
