$(document).on('desktop:Deposit:load', () => {
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer, .btn').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
  $('.date-input').on('click', (e) => {
    const $this = $(this);
    const thisHeight = $this.outerHeight(true);
    const thisTop = $this.offset().top + thisHeight;
    const thisLeft = $this.offset().left;

    e.preventDefault();
    $this.addClass('active');
    $('.date-layer').show().css({ top: thisTop + 'px', left: thisLeft + 'px' });
    $('.bg').on('click.closeDate', () => {
      $('.date-input').removeClass('active');
      $('.date-layer').hide().css({ top: '', left: '' });
      $('.bg').off('click.closeDate');
    });
  });
});
