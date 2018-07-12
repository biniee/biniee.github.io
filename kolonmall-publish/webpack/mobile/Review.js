$(document).on('mobile:Review:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      initialSlide: 3,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
  $('.star-rating:not(.registered) a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent().children('a').removeClass('on');
    $this.addClass('on').prevAll('a').addClass('on');
    return false;
  });
});