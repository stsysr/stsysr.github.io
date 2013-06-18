
function getParamValue (url, key) {
  var uri = url.split('?');
  if (uri.length < 2) return '';
  var params = uri[1].split('&');
  for (var i=0; i<params.length; i++) {
    var key_value = params[i].split("=");
    if (key_value[0] == key && key_value.length == 2) {
      return key_value[1];
    }
  }
  return '';
}

function isArray (obj) {
  return obj instanceof Array;
}

function dispEventData (data) {
  var events = data.events.event;
  if (events) {
    $(document.body).append(' / Total : ' + data.events['@attr'].total + '<br>');
    $('span.loading').empty().append('✔ ');
    var event_num = 0;
    (isArray(events))? event_num = events.length : event_num = 1;
    getEventData(event_num, data, events);
  } else {
    $('span.loading').empty().append('<p>無し</p>').hide().fadeIn(2000);
  }
}

function getEventData (max, data, events) {
  'use strict';
  for (var i=0; i<max; i++) {
    var artist, lineup, venue, title, startDate;
    if (isArray(events)) {
      title = events[i].title;
      artist = events[i].artists.artist;
      venue = events[i].venue;
      startDate = events[i].startDate;
    } else {
      title = events.title;
      artist = events.artists.artist;
      venue = events.venue;
      startDate = events.startDate;
    }
    if (isArray(artist)) {
      lineup = artist.reduce(function (a, b) { return a + ', ' + b; });
    } else {
      lineup = artist;
    }
    var str = [
      '<section>',
      '<h2>' + title + '</h3>',
      '<dl>',
      '<dt>date: </dt><dd>' + startDate.slice(0, -9) + '</dd>',
      '<dt>artists: </dt><dd>' + lineup + '</dd>',
      '<dt>venue: </dt><dd>' + venue.name + ', ' + venue.location.city + ', ' + venue.location.country + '</dd>',
      '</dl>',
      '</section>'
    ].join('');
    $('body').append('<div class="info">').append(str);
  }
}

$(function() {
  $(document.body).append('<span class="loading">Loading..</span>').hide().fadeIn(1000);
  var loading = function(){
    $('span.loading').fadeOut(500,function(){$(this).fadeIn(500);});
  };
  setInterval(loading, 1000);

  var param = getParamValue(location.href, 'artist').replace(/\+/, ' ');
  if (param == '' || param == 'bon jovi') {
    param = 'bon jovi';
    $('#b').val('BonJovi以外を調べる');
  }

  var json = [
    'http://ws.audioscrobbler.com/2.0/',
    '?method=artist.getpastevents',
    '&artist=',
    param,
    '&api_key=7d804b465b74e0e6c6fdfd6baeb2ad93',
    '&limit=1000',
    '&format=json'
  ].join('');

  $.getJSON(json, function(data, status, xhr) {
    $(document.body).append('Search Result : "' + decodeURI(param) + '"');
    dispEventData(data);
  });
});
