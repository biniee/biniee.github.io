$(document).on('desktop:Notice:load', () => {
  $('#compensationTabs li a').click((e) => {
    e.preventDefault();
  });
  $('.toggle-list .answer>a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent('div').prev('div').children('a').removeClass('on');
    $this.parent('div').slideUp(100);
    return false;
  });
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
