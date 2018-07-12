$(document).on('desktop:GuestOrder:load', () => {
  $('.form-login .in-txt input').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
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
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
