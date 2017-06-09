var inactivityTimer;

$(document).ready(function(){

    $(".btn-en, .btn-slo").click(function(){
        var lang = $(this).data("lang");
        localStorage.setItem("lang",lang);
        $("body").removeClass("lang-en lang-slo").addClass("lang-" + lang);

        $(this).parents(".dropdown").children("button").text($(this).text());


    });

    $(this).on("click mousemove mousedown keypress touchstart", resetTimer);
    resetTimer();
});

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(inactivity, 1000*60*2);
}

function inactivity(){
    window.location.href = "index.html";
}

/* get URL parameters */
var query = window.location.search.substring(1);
var vars = query.split("&");
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};

  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
};

if(QueryString().sid) {
    var url = $(".sidBtn").attr("href");
    $(".sidBtn").attr("href",url+"?sid=" + QueryString().sid);

    if(QueryString().lang)
      $(".sidBtn").attr("href",url+"&lang=" + QueryString().lang);
}
else if(QueryString().lang) {
    var url = $(".sidBtn").attr("href");
    $(".sidBtn").attr("href",url+"?lang=" + QueryString().lang);
}

var big = "true"
function handAnim() {
    if (big) {
        $(".hand.touch").css("width", "55vh");
        if($(".magnify").length) {
            $(".hand.swipe").css("left", "15%");
            $(".hand.swipe").css("top", "-4%");
        } else {
            $(".hand.swipe").css("left", "15%");
        }
    } else {
        $(".hand.touch").css("width", "45vh");
        if($(".magnify").length) {
            $(".hand.swipe").css("left", "-4%");
            $(".hand.swipe").css("top", "25%");
        } else {
            $(".hand.swipe").css("left", "35%");
        }
    }
    
    big = !big;
}

handAnim();
setInterval(handAnim, 1000);

/* Samples script */
$(".samples img").click(function() {

    var sid = $(this).attr("id");
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    $("#sample").removeClass("disabled");

    console.log(QueryString().lang);
    if(QueryString().lang) {
      var url = $(".sidBtn").attr("href");
      $("#sample").attr("href", "scratch.html?sid=" + sid + "&lang=" + QueryString().lang);
    }
    else
      $("#sample").attr("href", "scratch.html?sid=" + sid);

});

$(".result img").click(function() {
    var sid = QueryString().sid;

    if(QueryString().lang) {
      var url = $(".sidBtn").attr("href");
      $("#sample").attr("href", "microscope.html?sid=" + sid + "&lang=" + QueryString().lang);
    }
    else
      $("#sample").attr("href", "microscope.html?sid=" + sid);

    // reset all img shadows
    $(".col-xs-5 img").each(function() {
      $(this).css("box-shadow", "");
    });


    if ($(this).attr("value") === sid) {
      $("#mg-right").attr("src", "images/ziva_good.png");
      $(this).css("box-shadow", "0px 10px 25px 1px rgba(33, 239, 140, 0.64)")
      
    }

    else {
      $("#mg-right").attr("src", "images/ziva_bad.png");
      $(this).css("box-shadow", "0px 10px 25px 1px rgba(237, 32, 36, 0.64)")
    }


});