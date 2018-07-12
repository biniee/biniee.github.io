$(document).on('mobile:Compensation:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      initialSlide: 5,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
});
