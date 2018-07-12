$(document).on('mobile:RMA:load', () => {
  $('.bundle .set a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('set-open')) {
      $this.addClass('set-open');
      $this.parents('.info').next().next().css('display', 'block');
    } else {
      $this.removeClass('set-open');
      $this.parents('.info').next().next().css('display', 'none');
    }
    return false;
  });
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
});
