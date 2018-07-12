$(document).on('mobile:Notice:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      initialSlide: 1.5,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
  $('.toggle-list').on('click', '.ques>a', (e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('on')) {
      $('.toggle-list .ques>a').removeClass('on');
      $('.toggle-list .answer').slideUp(100);
      $this.addClass('on');
      $this.parent('div').next('div').slideDown(100);
    } else {
      $this.removeClass('on');
      $this.parent('div').next('div').slideUp(100);
    }
    return false;
  });
  $('.toggle-list').on('click', '.answer>a', (e) => {
    const $this = $(e.currentTarget);
    $this.parent('div').prev('div').children('a').removeClass('on');
    $this.parent('div').slideUp(100);
    return false;
  });
});
