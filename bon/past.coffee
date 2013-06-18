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
isArray = (obj) ->
  obj instanceof Array
dispEventData = (data) ->
  events = data.events.event
  if events
    $(document.body).append " / Total : " + data.events["@attr"].total + "<br>"
    $("span.loading").empty().append "✔ "
    event_num = 0
    (if (isArray(events)) then event_num = events.length else event_num = 1)
    getEventData event_num, events
  else
    $("span.loading").empty().append("<p>無し</p>").hide().fadeIn 2000
getEventData = (max, events) ->
  "use strict"
  i = 0

  while i < max
    artist = undefined
    lineup = undefined
    venue = undefined
    title = undefined
    startDate = undefined
    if isArray(events)
      title = events[i].title
      artist = events[i].artists.artist
      venue = events[i].venue
      startDate = events[i].startDate
    else
      title = events.title
      artist = events.artists.artist
      venue = events.venue
      startDate = events.startDate
    if isArray(artist)
      lineup = artist.reduce((a, b) ->
        a + ", " + b
      )
    else
      lineup = artist
    str = [ "<section>", "<h2>" + title + "</h3>", "<dl>", "<dt>date: </dt><dd>" + startDate.slice(0, -9) + "</dd>", "<dt>artists: </dt><dd>" + lineup + "</dd>", "<dt>venue: </dt><dd>" + venue.name + ", " + venue.location.city + ", " + venue.location.country + "</dd>", "</dl>", "</section>" ].join("")
    $("body").append("<div class=\"info\">").append str
    i++
$ ->
  $(document.body).append("<span class=\"loading\">Loading..</span>").hide().fadeIn 1000
  loading = ->
    $("span.loading").fadeOut 500, ->
      $(this).fadeIn 500

  setInterval loading, 1000
  param = getParamValue(location.href, "artist").replace(/\+/, " ")
  if param is "" or param is "bon jovi"
    param = "bon jovi"
    $("#b").val "BonJovi以外を調べる"
  json = [ "http://ws.audioscrobbler.com/2.0/", "?method=artist.getpastevents", "&artist=", param, "&api_key=7d804b465b74e0e6c6fdfd6baeb2ad93", "&limit=1000", "&format=json" ].join("")
  $.getJSON json, (data, status, xhr) ->
    $(document.body).append "Search Result : \"" + decodeURI(param) + "\""
    dispEventData data
