$(function() {
  navigator.geolocation.getCurrentPosition(OK, NG);
  function OK(position) {
    var url = ['http://api.openweathermap.org/data/2.5/weather?',
               'lat=' + position.coords.latitude,
               '&lon=' + position.coords.longitude,
               '&cnt=1&callback=?'].join('');
    $.getJSON(url, function(data){
      var info = ['緯度：' + data.coord.lat,
                  '経度：' + data.coord.lon,
                  data.country,
                  data.name,
                  data.weather[0].description,
                  data.main.humidity + '%',
                  '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">'].join('<br>');
      $("span.result").html(info);
    });
  }
  function NG(error) {
    $("span.result").html('エラー！');
  }
});
