
function getURL (name) {
  return ['http://', name, '.tumblr.com/api/read/json?num=100&cnt=1&callback=?'].join('');
}

function dispData (himo, awa, kiri) {
  var array = sortArrayByDate(getConcatArray(himo, awa, kiri));
  for (i=0; i<array.length; i++) {
    var img_url = array[i].url;
    var tag = ['<a href="', img_url, '"><img src ="', img_url, '" /></a>'].join('');
    $(document.body).append(tag);
  }
}

function getParamValue (url, key) {
  uri = url.split('?');
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

function getConcatArray (himo, awa, kiri) {
  var param = getParamValue(location.href, 'user');
  var h = addObjectToArray(himo);
  var a = addObjectToArray(awa);
  var k = addObjectToArray(kiri);
  if (param == 'himo') {
    return h;
  } else if (param == 'awa') {
    return a;
  } else if (param == 'kiri') {
    return k;
  } else {
    return h.concat(a, k);
  }
}

function sortArrayByDate (array) {
  if (getParamValue(location.href, 'sort') == 'asc') {
    // 昇順 param -> ?sort=asc
    array.sort(function(a, b) {return a["date"] > b["date"] ? 1 : -1;});
  } else {
    // 降順
    array.sort(function(a, b) {return a["date"] < b["date"] ? 1 : -1;});
  }
  return array;
}

function addObjectToArray (data) {
  var array = [];
  for (i=0; i<data.posts.length; i++) {
    array.push({
      'date': Number(data.posts[i]['date-gmt'].replace(/-|\s|:|GMT/g, '')),
      'url': data.posts[i]['photo-url-100']
    });
  }
  return array;
}

$(function() {
  $(document.body).append('<span class="loading">Loading..</span>');
  $.getJSON(getURL('himoawakiri'), function(himo){
    $.getJSON(getURL('awakirihimo'), function(awa){
      $.getJSON(getURL('kirihimoawa'), function(kiri){
        dispData(himo, awa, kiri);
        $('span.loading').remove();
      });
    });
  });
});
