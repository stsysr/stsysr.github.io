function getURL (name) {
  return ['http://', name, '.tumblr.com/api/read/json?num=100&cnt=1&callback=?'].join('');
}

$(function() {
  $.getJSON(getURL('himoawakiri'), function(himo){
    console.log(himo.tumblelog);
    $.getJSON(getURL('awakirihimo'), function(awa){
      console.log(awa.tumblelog);
      $.getJSON(getURL('kirihimoawa'), function(kiri){
        console.log(kiri.tumblelog);
      });
    });
  });
});
