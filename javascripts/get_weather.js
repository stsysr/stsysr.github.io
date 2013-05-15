$(function() {
  navigator.geolocation.getCurrentPosition(OK, NG);
  function OK(position) {
    var url = ['http://openweathermap.org/data/2.1/find/city?',
               'lat=' + position.coords.latitude,
               '&lon=' + position.coords.longitude,
               '&cnt=1&callback=?'].join('');
    $.getJSON(url, function(data){
      var info = ['緯度：' + position.coords.latitude,
                  '経度：' + position.coords.longitude,
                  position.sys.country,
                  data.list[0].weather[0].description,
                  '<img src="http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png">'].join('<br>');
      $("span.result").html(info);
    });
  }
  function NG(error) {
    $("span.result").html('エラー！');
  }
});
