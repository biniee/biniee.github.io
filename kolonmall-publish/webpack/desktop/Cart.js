$(document).on('desktop:Cart:load', () => {
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
  const $defaultPay = $('.billing > div');
  $defaultPay.each((index, element) => {
    const $this = $(element);
    const $span = $this.find('span');
    const width = [$span.eq(0).width(), $span.eq(1).width()];
    const maxW = parseInt(Math.max.apply(null, width), 10);

    $span.css({ 'min-width': maxW + 'px' });
  });
});
