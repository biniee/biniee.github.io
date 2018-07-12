$(document).on('mobile:Point:load', () => {
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
  $('.star-rating a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent().children('a').removeClass('on');
    $this.addClass('on').prevAll('a').addClass('on');
    return false;
  });
  $('.tit a.pop01').click(() => {
    $('.wrap-pop.pop01').css('display', 'block');
  });
  $('.tit a.pop02').click(() => {
    $('.wrap-pop.pop02').css('display', 'block');
  });
  $('.wrap-pop a').click(() => {
    $('.wrap-pop').css('display', 'none');
  });
  $('.open-gud').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('on')) {
      $this.addClass('on');
      $('.guide').slideDown();
    } else {
      $this.removeClass('on');
      $('.guide').slideUp();
    }
    return false;
  });
  $('.cls-gud').click(() => {
    $('.guide').slideUp();
    $('.open-gud').removeClass('on');
    return false;
  });
});
