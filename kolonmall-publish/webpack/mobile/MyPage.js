import Swiper from 'swiper';

$(document).on('mobile:MyPage:load', () => {
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
});
