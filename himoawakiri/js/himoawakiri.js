
$(function() {
  var url = 'http://himoawakiri.tumblr.com/api/read/json?num=100&cnt=1&callback=?';
  $.getJSON(url, function(data){
    console.log(data.tumblelog);
  });
});
