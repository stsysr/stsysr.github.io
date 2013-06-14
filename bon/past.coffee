getParamValue = (url, key) ->
  uri = url.split("?")
  return ""  if uri.length < 2
  params = uri[1].split("&")
  i = 0

  while i < params.length
    key_value = params[i].split("=")
    return key_value[1]  if key_value[0] is key and key_value.length is 2
    i++
  ""
$ ->
  $(document.body).append("<span class=\"loading\">Loading..</span>").hide().fadeIn 1000
  loading = ->
    $("span.loading").fadeOut 500, ->
      $(this).fadeIn 500


  setInterval loading, 1000
  param = getParamValue(location.href, "artist").replace(/\+/, " ")
  if param is "" or param is "bon+jovi"
    param = "bon jovi"
    $("#b").val "ボンジョビ以外を調べる"
  json = ["http://ws.audioscrobbler.com/2.0/", "?method=artist.getpastevents", "&artist=", param, "&api_key=7d804b465b74e0e6c6fdfd6baeb2ad93", "&limit=1000", "&format=json"].join("")
  $.getJSON json, (data, status, xhr) ->
    events = data.events.event
    $(document.body).append "Search Result : \"" + param + "\""
    if events
      $(document.body).append " / Total : " + data.events["@attr"].total + "<br>"
      $("span.loading").empty().append "✔ "
      event_num = 0
      isEventArray = (events instanceof Array)
      if isEventArray
        event_num = events.length
      else
        event_num = 1
      (loop = (max, data) ->
        $("body").append "<div class=\"info\">"
        i = 0
        while i < max
          artist = undefined
          lineup = undefined
          venue = undefined
          title = undefined
          startDate = undefined
          isArtistsArray = (artist instanceof Array)
          if isEventArray
            title = events[i].title
            artist = events[i].artists.artist
            venue = events[i].venue
            startDate = events[i].startDate
          else
            title = events.title
            artist = events.artists.artist
            venue = events.venue
            startDate = events.startDate
          if isArtistsArray
            lineup = []
            j = 0
            while j < artist.length
              lineup.push artist[j]
              j++
            lineup.join ", "
          else
            lineup = artist
          str = ["<section>", "<h2>" + title + "</h3>", "<dl>", "<dt>date: </dt><dd>" + startDate.slice(0, -9) + "</dd>", "<dt>artists: </dt><dd>" + lineup + "</dd>", "<dt>vanue: </dt><dd>" + venue.name + ", " + venue.location.city + ", " + venue.location.country + "</dd>", "</dl>", "</section>"].join("")
          $("div.info").append str
          i++
      ) event_num, data
    else
      $("span.loading").empty().append("<p>無し</p>").hide().fadeIn 2000

