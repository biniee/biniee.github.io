$(document).on('desktop:Order:load', () => {
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer, .btn').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
  $('.layer-popup').find('.tab a').on('click', (e) => {
    const $this = $(e.currentTarget);
    const $parent = $this.closest('li');
    const cclass = $this.attr('href').replace('#', '.');
    const active = 'active';
    e.preventDefault();
    $parent.addClass('on').siblings().removeClass('on');
    $(cclass).addClass(active).siblings().removeClass(active);
  });
  $('.date-input').on('click', (e) => {
    const $this = $(e.currentTarget);
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
  if ($('.reason-wrap').length) {
    const $select = $('.reason').find('select');
    $select.on('change', (e) => {
      const $this = $(e.currentTarget);
      const $direct = $this.find('.direct');
      const $size = $this.find('.size');
      const $textarea = $this.closest('.reason').find('.direct-textarea');
      const $selectSize = $this.closest('.reason').find('.size-select');
      if ($direct.is(':checked')) {
        $textarea.show();
      } else {
        $textarea.hide();
      }
      if ($size.is(':checked')) {
        $selectSize.show();
      } else {
        $selectSize.hide();
      }
    });
  }
  if ($('.shipping').length) {
    $('.already label + .checkbox').on('click', (e) => {
      const $this = $(e.currentTarget);
      const check = $this.find('.is-send');
      if (check.is(':checked') == true) {
        $('.address-form.common').css('display', 'none');
        $('.address-form.send-form').css('display', 'block');
      } else {
        $('.address-form.common').css('display', 'block');
        $('.address-form.send-form').css('display', 'none');
      }
    });
  }
  const $defaultPay = $('.billing > div');
  $defaultPay.each((index, element) => {
    const $this = $(element);
    const $span = $this.find('span');
    const width = [$span.eq(0).width(), $span.eq(1).width()];
    const maxW = parseInt(Math.max.apply(null, width), 10);
    $span.css({ 'min-width': maxW + 'px' });
  });
  const $saleInput = $('.disabled-input');
  $saleInput.each((index, element) => {
    const $this = $(element);
    const $span = $this.find('span');
    const $input = $this.find('input[type="text"]');
    const width = $span.width() + 2;
    $input.css({ 'padding-right': width + 'px' });
  });
  if ($('.prod-list .list').length) {
    new Swiper('.prod-list-swipe', {
      slidesPerView: 5,
      direction: 'horizontal',
      spaceBetween: 19,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
  $('.layer-my-delivery').find('input').on('change', (e) => {
    const $this = $(e.currentTarget);
    const $li = $this.closest('li');
    $li.addClass('on').siblings().removeClass('on');
  });
  $('.layer-family .number-list').find('input').on('change', (e) => {
    const $this = $(e.currentTarget);
    const $li = $this.closest('li');
    if ($this.prop('checked')) {
      $li.addClass('on');
    } else {
      $li.removeClass('on');
    }
  });
  if ($('.ui-datepicker').length) {
    const datePicker = $('.ui-datepicker');
    $('.hasDatepicker').on('click', (e) => {
      const $this = $(e.currentTarget);
      if( datePicker.css('display') == 'block' ){
        $this.addClass('active');
      }
    });
  }
});
