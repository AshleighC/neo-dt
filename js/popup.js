$.getJSON("data/themes.json", function(themes) {
  var list = "";
  $.each(themes, function(name, id) {
    list += "<li id='" + id + "'><img src='http://images.neopets.com/themes/" +
        id + "/events/trade_offer.png' class='thumbnail'>" + name + "</li>";
  });
  $("#themes").html(list);

  $("#themes li").click(function() {
    $("#themes li").not(this).removeClass("selected");
    $(this).addClass("selected");
    $("#current").html($(this).html());
  });
});
