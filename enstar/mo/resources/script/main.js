$(document).ready(function() {
  var $iframe = $('#player');
  var $poster = $('.poster');
  var $playBtn = $('.btn-play');

  var swiper = new Swiper('.swiper-container', {
    speed: 700,
    loop: true,
    pagination: '.swiper-pagination',
    paginationType: 'bullets',
    paginationClickable: true,
  });

  // 동영상 재생
  $('.btn-play').on('click', function() {
    $playBtn.hide();
    $poster.hide();
    $iframe[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  });
  // 동영상 선택 시
  $('.btn-video img').on('click', function(e) {
    e.preventDefault();
    var $this = $(e.target);
    if(!$this.parent().hasClass('disabled')) {
      $this.parent().siblings().removeClass('selected');
      $this.parent().addClass('selected');
      initVideoShareData();
    }
  });

  // 동영상팝업 1주일 안보기 쿠키
  // 쿠키삭제 : $.cookie('watchVideo', null, {path: '/'});
  if($.cookie('watchVideo') == 'no') {
    $('#layerVideo').hide();
  }
  $('#cookieWatchVideo').on('change', function() {
    $.cookie('watchVideo', 'no', {expires: 7, path: '/'});
    $('#layerVideo').hide();
  });
});