import Swiper from 'swiper';

$(document).on('mobile:Category:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
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
  if ($('.brand-list').length) {
    new Swiper('.brand-list', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
    });
  }
});
