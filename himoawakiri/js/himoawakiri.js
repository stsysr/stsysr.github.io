
$(function() {
  var url = 'http://himoawakiri.tumblr.com/api/read/json?num=100';
  $.getJSON(url, function(data){
    console.log(data.tumblelog);
  });
});
