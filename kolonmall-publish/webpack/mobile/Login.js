$(document).on('mobile:Login:load', () => {
  $('.form-login .in-txt input').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
      const inTxt = $this.parent('.in-txt');
      inTxt.removeClass('on');
    } else {
      $this.next().css('display', 'block');
      const inTxt = $this.parent('.in-txt');
      inTxt.addClass('on');
    }
    if ($('.id').hasClass('on') && $('.pass').hasClass('on')) {
      $('.btn-login').addClass('on');
    } else {
      $('.btn-login').removeClass('on');
    }
  });
  $('.form-login .in-txt input').focus((e) => {
    const $this = $(e.currentTarget);
    $this.addClass('active');
  });
  $('.form-login .in-txt input').blur((e) => {
    const $this = $(e.currentTarget);
    $this.removeClass('active');
  });
  $('.contact-phone').click((e) => {
    const $this = $(e.currentTarget);
    $this.toggleClass('on');
  });
});
