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
                  '国：' + data.sys.country,
                  '都市：' + data.name,
                  '湿度：' + data.main.humidity + '%',
                  '天気：' + data.weather[0].description,
                  '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">'].join('<br>');
      $("span.result").html(info);
    });
  }
  function NG(error) {
    $("span.result").html('エラー！');
  }
});
