$(document).on('desktop:eKOLON:load', () => {
  $('#eKolonTabs li a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    $('#eKolonTabs li').removeClass('on');
    $this.parents('li').addClass('on');

    if ($this.data('tabType') == 'point') {
      $('#pointContents').show();
      $('#brandContents').hide();
    } else {
      $('#pointContents').hide();
      $('#brandContents').show();
    }
  });
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
