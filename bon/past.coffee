<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>BON</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="stylesheet" href="./../stylesheets/styles.css">
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="./../javascripts/scale.fix.js"></script> 
  </head>
  <body>
  <script type="text/javascript">
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
    $(function() {
      $(document.body).append('<span class="loading">Loading..</span>').hide().fadeIn(1000);
      var loading = function(){
        $('span.loading').fadeOut(500,function(){$(this).fadeIn(500)});
      };
      setInterval(loading, 1000);
      var param = getParamValue(location.href, 'artist').replace(/\+/, ' ');
      if (param == '' || param == 'bon+jovi') {
        param = 'bon jovi';
        $('#b').val('ボンジョビ以外を調べる');
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
        $(document.body).append('Search Result : "' + param + '"');
        if (data.events.event) {
          $(document.body).append(' / Total : ' + data.events['@attr'].total + '<br>');
          $('span.loading').empty().append('✔');
          var event_num = 0;
          var isEventArray = (data.events.event instanceof Array);
          if (isEventArray) {
            event_num = data.events.event.length;
          } else {
            event_num = 1;
          }
          (function loop(max, data) {
            $('body').append('<div class="info">');
            for (i=0; i<max; i++) {
              var artist, lineup, venue, title, startDate;
              if (isEventArray) {
                artist = data.events.event[i].artists.artist;
              } else {
                artist = data.events.event.artists.artist;
              }
              var isArray = (artist instanceof Array);
              if (isArray) {
                lineup = [];
                for (j=0; j<artist.length; j++) {
                  lineup.push(artist[j]);
                }
                lineup.join(', ');
              } else {
                lineup = artist;
              }
              if (isEventArray) {
                venue = data.events.event[i].venue;
              } else {
                venue = data.events.event.venue;
              }
              if (isEventArray) {
                title = data.events.event[i].title;
              } else {
                title = data.events.event.title;
              }
              if (isEventArray) {
                startDate = data.events.event[i].startDate;
              } else {
                startDate = data.events.event.startDate;
              }
              var str = [
                '<section>',
                '<h2>' + title + '</h3>',
                '<dl>',
                '<dt>date: </dt><dd>' + startDate.slice(0, -9) + '</dd>',
                '<dt>artists: </dt><dd>' + lineup + '</dd>',
                '<dt>vanue: </dt><dd>' + venue.name + ', ' + venue.location.city + ', ' + venue.location.country + '</dd>',
                '</dl>',
                '</section>'
              ].join('');
              $('div.info').append(str);
            }
          })(event_num, data);
        } else {
          $('span.loading').empty().append('<p>無し</p>').hide().fadeIn(2000);
        }
      });
    });
  </script>
  <form action="./past.html" method="get">
    <input type="text" name="artist" value="">
    <input type="submit" id="b" value="ボンジョビを調べる">
  </form>
  </body>
</html>
