
$(function() {
  var url_himo = 'http://himoawakiri.tumblr.com/api/read/json?num=100&cnt=1&callback=?';
  $.getJSON(url_himo, function(data_himo){
    console.log(data_himo.tumblelog);
  });
});
