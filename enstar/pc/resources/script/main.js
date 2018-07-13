$(document).ready(function() {
  var $iframe = $('#player');
  var $poster = $('.poster');
  var $playBtn = $('.btn-play');

  function randomIntFromInterval(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  var initSlideNum = randomIntFromInterval(0,7);

  var swiper = new Swiper('.swiper-container', {
    speed: 700,
    loop: true,
    initialSlide: initSlideNum,
    pagination: '.swiper-pagination',
    paginationType: 'bullets',
    paginationClickable: true,
    mousewheelControl: true,
  });

  // main interaction
  var win = $(window);
  var slide = $('.contents.main .swiper-slide .character');
  var winW = win.width();

  win.on('mousemove', function(e) {
    //slide.css('background-position-x', (e.pageX / winW * 60) + 20 + '%');     // 인터렉션 움직임 매우 큼
    //slide.css('background-position-x', (e.pageX / winW * 40) + 30 + '%');     // 인터렉션 움직임 큼
    slide.css('background-position-x', (e.pageX / winW * 20) + 40 + '%');       // 인터렉션 움직임 중간
    //slide.css('background-position-x', (e.pageX / winW * 10) + 45 + '%');     // 인터렉션 움직임 작음
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