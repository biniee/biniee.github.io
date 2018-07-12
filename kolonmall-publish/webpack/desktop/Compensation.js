$(document).on('desktop:Compensation:load', () => {
  $('#compensationTabs li a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    $('#compensationTabs li').removeClass('on');
    $this.parents('li').addClass('on');

    if ($this.data('tabType') == 'delay') {
      $('#delayContent').show();
      $('#soldOutContent').hide();
      $('#couponContent').hide();
    } else if ($this.data('tabType') == 'soldOut') {
      $('#delayContent').hide();
      $('#soldOutContent').show();
      $('#couponContent').hide();
    } else {
      $('#delayContent').hide();
      $('#soldOutContent').hide();
      $('#couponContent').show();
    }
  });
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
