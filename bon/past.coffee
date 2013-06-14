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
  param = getParamValue(location.href, "artist")
  param = "bon jovi"  if param is ""
  json = ["http://ws.audioscrobbler.com/2.0/", "?method=artist.getpastevents", "&artist=", param, "&api_key=7d804b465b74e0e6c6fdfd6baeb2ad93", "&limit=800", "&format=json"].join("")
  $.getJSON json, (data, status, xhr) ->
    $(document.body).append "Search Result : " + param + "<br>"
    if data.events.event
      $("span.loading").empty().append "✔"
      (loop = (max, data) ->
        $("body").append "<div class=\"info\">"
        i = 0
        while i < max
          artist = data.events.event[i].artists.artist
          lineup = undefined
          isArray = (artist instanceof Array)
          if isArray
            lineup = []
            j = 0
            while j < artist.length
              lineup.push artist[j]
              j++
            lineup.join ", "
          else
            lineup = artist
          venue = data.events.event[i].venue
          str = ["<section>", "<h2>" + data.events.event[i].title + "</h3>", "<dl>", "<dt>date: </dt><dd>" + data.events.event[i].startDate.slice(0, -9) + "</dd>", "<dt>artists: </dt><dd>" + lineup + "</dd>", "<dt>vanue: </dt><dd>" + venue.name + ", " + venue.location.city + ", " + venue.location.country + "</dd>", "</dl>", "</section>"].join("")
          $("div.info").append str
          i++
      ) data.events.event.length, data
    else
      $("span.loading").empty().append("<p>無し</p>").hide().fadeIn 2000
