$(document).on('mobile:FAQ:load', () => {
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
  $('.spop-close').click(() => {
    $('.spop-bnr').css('display', 'none');
    return false;
  });
  $('.toggle-list .ques a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('on')) {
      $('.toggle-list .ques a').removeClass('on');
      $('.toggle-list .answer').slideUp(100);
      $this.addClass('on');
      $this.parent('p').next('p').slideDown(100);
    } else {
      $this.removeClass('on');
      $this.parent('p').next('p').slideUp(100);
    }
    return false;
  });
  $('.toggle-list .answer a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent('p').prev('p').children('a').removeClass('on');
    $this.parent('p').slideUp(100);
    return false;
  });
});
