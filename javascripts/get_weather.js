
function KelvinToCelsius (Kelvin) {
  return Math.round((Kelvin - 273.15)*10)/10;
}

function getWindDirection (degree) {
  var number = Math.round((degree/360)*16);
  var direction = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
  return direction[number];
}

function buildHeaderHtml (data) {
  var info = [
    data.city.country,
    data.city.name
  ].join(' : ');
  $(document.body).prepend($("<h2>").html(info));
}

function buildForecastTable (data) {
  var table = [];
  table.push('<table><tr>');
  for (i=0; i<data.cnt; i++) {
    table.push('<td>');
    table.push(shortenDateFormat(data.list[i].dt_txt));
    table.push('</td>');
  }
  table.push('</tr><tr>');
  for (i=0; i<data.cnt; i++) {
    table.push('<td>');
    table.push('<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">');
    table.push('</td>');
  }
  table.push('</tr><tr>');
  for (i=0; i<data.cnt; i++) {
    table.push('<td>');
    table.push(KelvinToCelsius(data.list[i].main.temp) + '°C');
    table.push('</td>');
  }
  table.push('</tr></table>');
  $("div.forecast").html(table.join(''));
}

function shortenDateFormat (date) {
  var yyyymmddhhmm = date.substring(5, 19).split(' ');
  // var date_arr = yyyymmddhhmm[0].split('-');
  // for (i=0; i<date_arr.length; i++) {
  //   if (date_arr[i].substring(0, 1)=='0') {
  //     var tmp = date_arr[i].slice(1, 2);
  //     date_arr.splice(1, 1, tmp);
  //   } 
  // }
  // var mmdd = date_arr.join('/');
  var mmdd = yyyymmddhhmm[0].replace('-', '/');
  var hhmm = yyyymmddhhmm[1].slice(0, -3);
  return mmdd + ' ' + hhmm;
}

$(function() {
  navigator.geolocation.getCurrentPosition(OK, NG);
  function OK (position) {
    var url = [
      'http://api.openweathermap.org/data/2.5/forecast?',
      'lat=' + position.coords.latitude,
      '&lon=' + position.coords.longitude,
      '&cnt=1&callback=?'
    ].join('');
    $.getJSON(url, function(data){
      buildHeaderHtml(data);
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
