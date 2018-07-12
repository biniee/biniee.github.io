$(document).on('mobile:Special:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
    });
    let sct;
    const scrposy = $('.scr-navi').offset().top;
    $(window).scroll((e) => {
      const $this = $(e.currentTarget);
      sct = $this.scrollTop();
      if (sct > scrposy) {
        $('.scr-navi').css({ position: 'fixed' });
      } else {
        $('.scr-navi').css({ position: 'static' });
      }
    });
    let navi;
    let scrnaviheight = $('.scr-navi').outerHeight();
    $(window).resize(() => {
      scrnaviheight = $('.scr-navi').outerHeight();
    });
    $('.scr-navi a').click((e) => {
      const $this = $(e.currentTarget);
      navi = $this.attr('href');
      if ($this.parent('div').index() == 0) {
        sct = $(navi).offset().top;
        $('html, body').stop().animate({ scrollTop: sct });
      } else {
        sct = $(navi).offset().top - scrnaviheight;
        $('html, body').stop().animate({ scrollTop: sct });
      }
      return false;
    });
  }

  $('#orderTypeSelect').on('change', () => {
    const value = $('#orderTypeSelect option:selected').val();
    if (value == 'recent') {
      location.href = "/Special?orderType=recent";
    } else if (value == 'deadline') {
        location.href = "/Special?orderType=deadline";
    }
  });
});
