
function getURL (name) {
  return ['http://', name, '.tumblr.com/api/read/json?num=100&cnt=1&callback=?'].join('');
}

function dispImage (himo, awa, kiri) {
  var array = sortArrayByDate(getConcatArray(himo, awa, kiri));
  for (i=0; i<array.length; i++) {
    var tag = ['<a href="', array[i].url, '"><img src ="', array[i].image_url, '" /></a>'].join('');
    $(document.body).append(tag);
  }
}

function getConcatArray (himo, awa, kiri) {
  var h = addObjectToArray(himo);
  var a = addObjectToArray(awa);
  var k = addObjectToArray(kiri);
  return h.concat(a, k);
}

function sortArrayByDate (array) {
  array.sort(function(a, b) {return a["date"] < b["date"] ? 1 : -1;});
  return array;
}

function addObjectToArray (data) {
  var array = [];
  for (i=0; i<data.posts.length; i++) {
    array.push({
      'date': Number(data.posts[i]['date-gmt'].replace(/-|\s|:|GMT/g, '')),
      'image_url': data.posts[i]['photo-url-100'],
      'url': data.posts[i]['url'],
    });
  }
  return array;
}

$(function() {
  $(document.body).append('<span class="loading">Loading..</span>');
  $.getJSON(getURL('himoawakiri'), function(himo){
    $.getJSON(getURL('awakirihimo'), function(awa){
      $.getJSON(getURL('kirihimoawa'), function(kiri){
        dispImage(himo, awa, kiri);
        $('span.loading').remove();
      });
    });
  });
});
