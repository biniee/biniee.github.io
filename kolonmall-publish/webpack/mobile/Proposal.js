$(document).on('mobile:Proposal:load', () => {
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      initialSlide: 6,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
  $('.add-area :text').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
  $('.add-area textarea').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
});
