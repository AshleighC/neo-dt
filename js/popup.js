var key = "neo-dt";
var theme;

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
      var url = chrome.extension.getURL(
          "img/themes/" + id + "/events/trade_offer.png");
      list += ("<li id='" + id + "'><img src='" + url +
          "' class='thumbnail'>" + name + "</li>");
    });
    $("#themes").html(list);

    if (!$.isEmptyObject(result)) {
      theme = result[key];
      select(theme, false);
    }

    $("#themes li").click(function() {
      var id = $(this).attr("id");

      if (id != theme) {
        theme = id;
        select(theme, true);

        var change = {};
        change[key] = theme;
        chrome.storage.local.set(change);
      }
    });
  });
});
