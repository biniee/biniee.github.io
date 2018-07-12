$(document).on('desktop:AfterSales:load', () => {
  // const $html = $('html');
  // const $list = $('.repair-list .list');
  // const $layer = $('.layer-popup');
  //
  // $list.click((e) => {
  //   e.preventDefault();
  //
  //   console.log('@@@@@@@');
  //
  //   $html.toggleClass('show-layer');
  //
  //   $layer.find('.close').click(() => {
  //     $html.removeClass('show-layer');
  //   });
  // });

  $('#afterSalesTabs li a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    console.log('type: ' + $this.data('tabType'));
    $('#afterSalesTabs li').removeClass('on');
    $this.parents('li').addClass('on');

    if ($this.data('tabType') == 'warranty') {
      $('#warrantyContent').show();
      $('#repairGuideContent').hide();
      $('#repairCoverageContent').hide();
      $('#repairProgressContent').hide();
    } else if ($this.data('tabType') == 'repairGuide') {
      $('#warrantyContent').hide();
      $('#repairGuideContent').show();
      $('#repairCoverageContent').hide();
      $('#repairProgressContent').hide();
    } else if ($this.data('tabType') == 'repairCoverage') {
      $('#warrantyContent').hide();
      $('#repairGuideContent').hide();
      $('#repairCoverageContent').show();
      $('#repairProgressContent').hide();
    } else {
      $('#warrantyContent').hide();
      $('#repairGuideContent').hide();
      $('#repairCoverageContent').hide();
      $('#repairProgressContent').show();
    }
  });
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
