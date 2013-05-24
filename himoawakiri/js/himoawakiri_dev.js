
function getURL (name) {
  return ['http://', name, '.tumblr.com/api/read/json?num=100&cnt=1&callback=?'].join('');
}

function dispData (himo, awa, kiri, awa2, kiri2) {
  var array = sortArrayByDate(getConcatArray(himo, awa, kiri, awa2, kiri2));
  var table = [];
  table.push('<table border="1">');
  table.push(['<caption>data : ', array.length, ' posts</caption>'].join(''));
  table.push('<tr><th>image</th><th>user</th><th>timestamp</th><th>reblog-key</th></tr>');
  for (var i=0; i<array.length; i++) {
    console.log(array[i]);
    table.push('<tr><td>');
    table.push(['<a href="', array[i].url, '"><img src ="', array[i].image_url, '" /></a>'].join(''));
    table.push('</td><td>');
    table.push(array[i].name);
    table.push('</td><td>');
    table.push(convertUnixTimestamp(array[i].timestamp));
    table.push('</td><td>');
    table.push(array[i]['reblog-key']);
    table.push('</td></tr>');
  }
  table.push('</table>');
  $(document.body).append(table.join(''));
}

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

function getConcatArray (himo, awa, kiri, awa2, kiri2) {
  var param = getParamValue(location.href, 'user');
  var h = addObjectToArray(himo);
  var a = addObjectToArray(awa);
  var k = addObjectToArray(kiri);
  var a2 = addObjectToArray(awa2);
  var k2 = addObjectToArray(kiri2);
  if (param == 'himo') {
    return h;
  } else if (param == 'awa') {
    return a;
  } else if (param == 'kiri') {
    return k;
  } else if (param == 'awa2') {
    return a2;
  } else if (param == 'kiri2') {
    return k2;
  } else {
    return h.concat(a, k, a2, k2);
  }
}

function sortArrayByDate (array) {
  if (getParamValue(location.href, 'sort') == 'asc') {
    array.sort(function(a, b) {return a["date"] > b["date"] ? 1 : -1;});
  } else {
    array.sort(function(a, b) {return a["date"] < b["date"] ? 1 : -1;});
  }
  return array;
}

function addObjectToArray (data) {
  var array = [];
  for (var i=0; i<data.posts.length; i++) {
    array.push({
      'name': data.tumblelog.name,
      'timestamp': data.posts[i]['unix-timestamp'],
      'date': Number(data.posts[i]['date-gmt'].replace(/-|\s|:|GMT/g, '')),
      'image_url': data.posts[i]['photo-url-100'],
      'url': data.posts[i]['url'],
      'reblog-key': data.posts[i]['reblog-key']
    });
  }
  return array;
}

function convertUnixTimestamp (timestamp) {
  var d = new Date(timestamp * 1000);
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
  var min = (d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec = (d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

$(function() {
  $(document.body).append('<span class="loading">Loading..</span>');
  $.getJSON(getURL('himoawakiri'), function(himo){
    $.getJSON(getURL('awakirihimo'), function(awa){
      $.getJSON(getURL('kirihimoawa'), function(kiri){
        $.getJSON(getURL('awahimokiri'), function(awa2){
          $.getJSON(getURL('kiriawahimo'), function(kiri2){
            dispData(himo, awa, kiri, awa2, kiri2);
            $('span.loading').remove();
          });
        });
      });
    });
  });
});
