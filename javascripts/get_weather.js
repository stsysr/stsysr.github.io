
function KelvinToCelsius (Kelvin) {
  return Math.round((Kelvin - 273.15)*10)/10;
}

function getWindDirection (degree) {
  var number = Math.round((degree/360)*16);
  var direction = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
  return direction[number];
}

$(function() {
  navigator.geolocation.getCurrentPosition(OK, NG);
  function OK(position) {
    var current = ['http://api.openweathermap.org/data/2.5/weather?',
               'lat=' + position.coords.latitude,
               '&lon=' + position.coords.longitude,
               '&cnt=1&callback=?'].join('');
    var forecast = ['http://api.openweathermap.org/data/2.5/forecast?',
                    'lat=' + position.coords.latitude,
                    '&lon=' + position.coords.longitude].join('');
    $.getJSON(current, function(data){
      var info = ['latitude: ' + data.coord.lat,
                  'longitude: ' + data.coord.lon,
                  'country: ' + data.sys.country,
                  'city: ' + data.name,
                  'weather: ' + data.weather[0].main,
                  'temperature: ' + KelvinToCelsius(data.main.temp) + '°C',
                  'max temperature: ' + KelvinToCelsius(data.main.temp_max) + '°C',
                  'min temperature: ' + KelvinToCelsius(data.main.temp_min) + '°C',
                  'humidity: ' + data.main.humidity + '%',
                  'pressure: ' + data.main.pressure + 'hpa',
                  'sunrise: ' + data.sys.sunrise,
                  'sunset: ' + data.sys.sunset,
                  'wind: ' + data.wind.speed + 'm/s',
                  'deg: ' + getWindDirection(data.wind.deg) + '/' + data.wind.deg + '°',
                  'description: ' + data.weather[0].description,
                  '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">'].join('<br>');
      $("div.current").html(info);
    });
    $.getJSON(forecast, function(data){
      var icon = '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">';
      $("div.forecast").html(icon);
    });
  }
  function NG(error) {
    $("div.current").html('error');
    $("div.forecast").html('error');
  }
});
