$(function() {
  function OK () {
    $.getJSON(url, function(data){
    });
  }
  function NG (error) {
    $("body").html('error');
  }
});
