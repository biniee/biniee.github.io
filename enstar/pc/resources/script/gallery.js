$(document).ready(function() {
  var $iframe = $('#player');
  var $poster = $('.poster');
  var $playBtn = $('.btn-play');

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
  // 동영상 공유정보,뷰 초기값 생성
  function initVideoShareData() {
    var $img = $('.btn-video.selected img');
    var posterImg = $img.data('poster-img');
    var num = $img.data('num');
    var title = $img.data('title');
    var videoEmbedLink = 'https://www.youtube.com/embed/' + $img.data('video-src') + '?enablejsapi=1&amp;version=3&amp;playerapiid=ytplayer&amp;rel=0&amp;showinfo=0';
    var videoWatchLink = 'https://www.youtube.com/watch?v=' + $img.data('video-src');
    changeVideoView(posterImg, num, title, videoEmbedLink);
    setVideoShareData(title, videoWatchLink);
  }
  // 동영상 뷰(주소,제목,번호) 변경
  function changeVideoView(posterImg, num, title, videoEmbedLink) {
    $poster.css('background-image', 'url(resources/images/gallery/' + posterImg +')').show();
    $('.box-video .info .square').text(num);
    $('.box-video .info .txt').text(title);
    $iframe.attr("src", videoEmbedLink);
    $playBtn.show();
  }
  // 동영상 공유정보 변경
  function setVideoShareData(title, videoWatchLink) {
    $('.video-info-area .box-sns button')
      .data('title', title)
      .data('url', videoWatchLink);
  }
  initVideoShareData();



  // 포토보기
  var photoSwiper = new Swiper('.photo-swiper', {
    speed: 700,
    spaceBetween: 12,
    nextButton: '.box-photo .swiper-button-next',
    prevButton: '.box-photo .swiper-button-prev',
    pagination: '.box-photo .swiper-pagination',
    paginationType: 'bullets',
    paginationClickable: true,
  });
  // 포토보기 팝업
  $('.photo-swiper').on('click', '.open-layer-photo', function() {
    var idx = $(this).index('.open-layer-photo');

    $('.layer-photo').show();
    var photoPopupSwiper = new Swiper('.gallery-popup-swiper', {
      speed: 500,
      nextButton: '.popup-gallery .swiper-button-next',
      prevButton: '.popup-gallery .swiper-button-prev',
    });
    photoPopupSwiper.slideTo(idx, 0, false);

    // 포토보기 팝업 - 공유정보 변경
    function setPhotoShareData() {
      var photo= $('.gallery-popup-swiper .swiper-slide-active');
      $('.popup-gallery .box-sns button')
        .data('unitName', photo.data('unitName'))
        .data('imgNum', photo.data('imgNum'));
    }
    photoPopupSwiper.on('transitionStart', function() {
      setPhotoShareData();
    });
    setPhotoShareData();
  });

  /*
  // 공유링크 통해서 페이지 접근 시 파라미터 정보에 따라 해당 슬라이드로 이동, 팝업 띄움
  // gallery.html?photoname=undead4

  var getParameter = function(param) {
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
      var varName = parameters[i].split('=')[0];
      if (varName.toUpperCase() == param.toUpperCase()) {
        returnValue = parameters[i].split('=')[1];
        return decodeURIComponent(returnValue);
      }
    }
  };
  var sharedUnit = getParameter('photoname');
  if(sharedUnit) {
    var selector = '.open-layer-photo[data-photo-name="' + sharedUnit + '"]';
    var parentSlideIdx = $('.photo-swiper .swiper-slide').index($(selector).closest('.swiper-slide'));
    photoSwiper.slideTo(parentSlideIdx, 0, false);
    $(selector).trigger('click');
  }
  window.onload = function() {
    setTimeout(function() {
      $('html, body').scrollTop($('.box-photo').offset().top - 74);
    }, 100);
  }
  */
});