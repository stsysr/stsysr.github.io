
function KelvinToCelsius (Kelvin) {
  return Math.round((Kelvin - 273.15)*10)/10;
}

function getWindDirection (degree) {
  var number = Math.round((degree/360)*16);
  var direction = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
  return direction[number];
}

function buildForecastTable (data) {
  var table = [];
  table.push('<table><tr>');
  for (i=0; i<data.cnt; i++) {
    table.push('<td>');
    table.push('<img src="http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png">');
    table.push('</td>');
  }
  table.push('</tr></table>');
  $("div.forecast").html(table.join(''));
  console.log(table.join(''));
}

$(function() {
  navigator.geolocation.getCurrentPosition(OK, NG);
  function OK (position) {
    var forecast = [
      'http://api.openweathermap.org/data/2.5/forecast?',
      'lat=' + position.coords.latitude,
      '&lon=' + position.coords.longitude,
      '&cnt=1&callback=?'
    ].join('');
    $.getJSON(forecast, function(data){
      buildForecastTable(data);
      // var info = [
      //   'country: ' + data.city.country,
      //   'city: ' + data.city.name
      // ].join('<br>');
      // var weather = [
      //   'date: ' + data.list[0].dt_txt,
      //   '<img src="http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png">',
      //   'temperature: ' + KelvinToCelsius(data.list[0].main.temp) + '°C',
      //   'max temperature: ' + KelvinToCelsius(data.list[0].main.temp_max) + '°C',
      //   'min temperature: ' + KelvinToCelsius(data.list[0].main.temp_min) + '°C',
      //   'pressure: ' + data.list[0].main.pressure + 'hpa',
      //   'sea_level: ' + data.list[0].main.sea_level,
      //   'grnd_level ' + data.list[0].main.grnd_level,
      //   'humidity ' + data.list[0].main.humidity + '%',
      //   'wind: ' + data.list[0].wind.speed + 'm/s',
      //   'deg: ' + getWindDirection(data.list[0].wind.deg) + '/' + data.list[0].wind.deg + '°',
      //   'description: ' + data.list[0].weather[0].description
      // ].join('<br>');
      // $("div.forecast").html(info + '<br>' + weather);
    });
  }
  function NG (error) {
    $("div.forecast").html('error');
  }
});
