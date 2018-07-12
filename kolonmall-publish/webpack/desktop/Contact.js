$(document).on('desktop:Contact:load', () => {
  const $html = $('html');
  const $fileWrap = $('.add-file');
  const $file = $fileWrap.find('input[type="file"]');
  const $thumb = $fileWrap.find('.thumb');
  const $delete = $fileWrap.find('.delete');
  const $layer = $('.layer-popup');
  const $tabs = $('#select-product-tab li');

  $file.change(() => {
    const file = $file[0].files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      $thumb.removeClass('hidden').find('img').attr('src', reader.result);
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  $delete.click(() => {
    $file.val('');
    $thumb.addClass('hidden').find('img').attr('src', '');
  });

  function setLayerTab(index) {
    const $tabContent = $layer.find('.tab-cnt');

    $tabs.eq(index).addClass('on').siblings().removeClass('on');
    $tabContent.eq(index).removeClass('hidden').siblings('.tab-cnt').addClass('hidden');
  }
  $tabs.find('a').click((e) => {
    e.preventDefault();

    const index = $(e.target).closest('li').index();
    setLayerTab(index);
  });

  $('#select-product a').click((e) => {
    const index = $(e.target).index();
    e.preventDefault();

    $html.toggleClass('show-layer');

    setLayerTab(index);

    $layer.find('.close').click(() => {
      $html.removeClass('show-layer');
    });
  });

  $('.qna').click((e) => {
    const $this = $(e.currentTarget);
    const answer = $this.children('dd');
    $this.siblings('dl').removeClass('on');
    $this.toggleClass('on');
    if (answer.parent().hasClass('on')) {
      answer.parent('.qna').siblings().children('dd').slideUp('fast');
      answer.slideDown('fast');
    } else {
      answer.slideUp('fast');
    }
  });

  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
