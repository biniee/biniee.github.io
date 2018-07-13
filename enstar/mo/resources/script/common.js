$(document).ready(function() {
  var root = window.location.origin; // 최상위 경로
  if(window.location.origin == 'http://synk_dev.gitlab.io') { // 개발서버일 경우 루트url 변경 // 배포시 삭제
    root = window.location.origin + '/enstar';
  }
  var curUrl = window.location.href; // 현재 페이지

  var UserAgent = navigator.userAgent;
  if(UserAgent.match(/iPhone|iPod|iPad|iPad2|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) == null && UserAgent.match(/LG|SAMSUNG|Samsung/) == null) {
    top.location.href = root + '/pc/main.html';
  }

  // 헤더 인터렉션
  var $header = $('#header');
  if(!$header.hasClass('header-hide')) {
    $(window).on('scroll', function(){
      if($(window).scrollTop() > 100) {
        $header.addClass('header-hide');
      } else {
        $header.removeClass('header-hide');
      }
    });
  }

  // 레이어팝업 열기
  $('[data-trigger-popup]').click(function(){
    var targetLayer = $(this).data('triggerPopup');
    $(targetLayer).show();
    $('html').css('overflow-y', 'hidden');
  });

  // 레이어팝업 close버튼,팝업바깥클릭으로 닫기
  $('.layer-popup .bg, .layer-popup .close').click(function(){
    if($('.layer-popup #player').length) {
      $('.layer-popup #player')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    $(this).parents('.layer-popup').hide();
    $('html').css('overflow-y', '');
  });

  // $.getScript("//developers.kakao.com/sdk/js/kakao.min.js");
  // Kakao.init('1254f88e430bbdcc269f493e9526a587');

  // 공유하기
  if($('.box-sns').length) {
    $('.box-sns').on('click', 'button', function(){
      var $this = $(this);
      var title = $this.data('title');
      var url = $this.data('url');
      var type = $this.data('type');
      var sns = $this.attr('class');
      var kakaoTalkImageUrl;
      var kakaoTalkImageWidth;
      var kakaoTalkImageHeight;
      var unitName = $this.data('unitName');
      var imgNum = $this.data('imgNum');
      var posterImg = $this.data('poster-img');
      if(!title) {
        title = '빛나라 나의별 ! 앙상블스타즈 사전예약!';
      }
      if(!url) {
        url = root + '/mo/main.html';
        kakaoTalkImageUrl = root + '/pc/resources/images/share-img-kakaotalk-2-520x693.jpg';
        kakaoTalkImageWidth = 520;
        kakaoTalkImageHeight = 693;
      }
      if(type == 'photo' && unitName != '' && imgNum != '') {
        url = root + '/mo/share/' + unitName + imgNum + '.html';
        kakaoTalkImageUrl = root + '/mo/resources/images/gallery/' + unitName + '/' + imgNum + '.png';
        kakaoTalkImageWidth = 568;
        kakaoTalkImageHeight = 320;
      }
      if(type == 'video' && posterImg != '') {
        kakaoTalkImageUrl = root + '/mo/resources/images/gallery/' + 'play_' + posterImg;
        kakaoTalkImageWidth = 670;
        kakaoTalkImageHeight = 378;
      }
      switch(sns) {
        case 'kakao-story' :
          Kakao.Story.share({ url: url, text: title });
          break;
        case 'facebook' :
          window.open("https://m.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url));
          break;
        case 'twitter' :
          title = "빛나라 나의별 ! 앙상블스타즈 사전예약!\n유메노사키 학원 입학 설명회에 초대합니다!\n사전예약하면 ‘준진의 일상’ 이모티콘과 스페셜아이템 지급!\n"
          window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + '' + encodeURIComponent(url));
          break;
        case 'kakao-talk' :
          var kakaoReservationPage = 'http://gameevent.kakao.com/preregistrations/907?from=m_brandpage';
          var prop = {
            objectType: 'feed',
            content: {
              title: '빛나라 나의별 ! 앙상블스타즈 사전예약!',
              description: '사전예약하면 ‘준진의 일상’ 이모티콘과 스페셜아이템 지급!',
              imageUrl: kakaoTalkImageUrl,
              imageWidth: kakaoTalkImageWidth,
              imageHeight: kakaoTalkImageHeight,
              link: {
                mobileWebUrl: kakaoReservationPage,
                webUrl: kakaoReservationPage
              }
            },
            buttons: [
              {
                title: '이벤트 바로가기',
                link: {
                  mobileWebUrl: kakaoReservationPage,
                  webUrl: kakaoReservationPage
                }
              }
            ]
          };
          Kakao.Link.sendDefault(prop);
      }
    });
  }
});