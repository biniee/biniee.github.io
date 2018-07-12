import Swiper from 'swiper';

$(document).on('mobile:Main:load', () => {
  if ($('.scr-prod').length) {
    new Swiper('.scr-prod', {
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').removeClass('left');
      },
      onReachEnd() {
        $('.icn-navi').addClass('left');
      },
    });
  }
  if ($('.swiper-menu').length) {
    new Swiper('.swiper-menu', {
      direction: 'vertical',
      slidesPerView: 'auto',
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
            // mousewheelControl: true,
    });
  }
  $(() => {
    $('.spop-close').click(() => {
      $('.spop-bnr').css('display', 'none');
      return false;
    });
  });
  $('.tg-btn').click((e) => {
    const $this = $(e.currentTarget);
    const popUp = $('.popup');
    const popText = $('.popup .pop-txt');

    if (!$this.hasClass('on')) {
      $this.addClass('on');

      if ($this.hasClass('pop-on')) {
        popText.html('KOLONmall 마케팅 정보 알림 수신에<br/>동의 하셨습니다.');
        popUp.addClass('show');
        setTimeout(() => {
          popUp.removeClass('show');
        }, 3000);
      }
    } else {
      $this.removeClass('on');
      if ($this.hasClass('pop-on')) {
        popText.html('KOLONmall의 온라인 할인혜택, 특가프로모션,<br/>이벤트 등의 정보를 받으실 수 없습니다.');
        popUp.addClass('show');
        setTimeout(() => {
          popUp.removeClass('show');
        }, 3000);
      }
    }
    return false;
  });
  // $('.setting').click((e) => {
  //   const $this = $(e.currentTarget);
  //   const popUp = $('.popup');
  //   popUp.css('display','none');
  // });
});
