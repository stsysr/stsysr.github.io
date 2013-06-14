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
  param = getParamValue(location.href, "artist")
  param = "bon%20jovi"  if param is ""
  json = ["http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=", param, "&api_key=7d804b465b74e0e6c6fdfd6baeb2ad93&format=json"].join("")
  $.getJSON json, (data, status, xhr) ->
    if data.events.event
      $("span.loading").empty().append("✔").fadeOut 2000
      (loop = (max, data) ->
        $("body").append "<div class=\"info\">"
        i = 0
        while i < max
          str = ["<p>", "<strong>" + data.events.event[i].title + "</strong>", data.events.event[i].startDate.slice(0, -9), "<img src=\"" + data.events.event[i].image[1]["#text"] + "\" />", data.events.event[i].venue.name + ", " + data.events.event[i].venue.location.city, "<img src=\"" + data.events.event[i].venue.image[1]["#text"] + "\" />", "</p>"].join("<br>")
          $("div.info").append str
          i++
      ) data.events.event.length, data
    else
      $("span.loading").empty().append("<p>無し</p>").hide().fadeIn 2000
