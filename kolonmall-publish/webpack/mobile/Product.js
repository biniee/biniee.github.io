$(document).on('mobile:Product:load', () => {
  if ($('.prod-detail-slide').length) {
    new Swiper('.prod-detail-slide', {
      slidesPerView: 1,
      direction: 'horizontal',
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }
  $('.prod-detail-main .detail-info .favorite').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('on')) {
      $this.addClass('on');
      $('.prod-detail-main .favorite-pop').fadeIn('slow', () => {
        $('.prod-detail-main .favorite-pop').delay(500).fadeOut('slow');
      });
      $('.prod-detail-main .favorite-pop>i').addClass('ico-on');
      $('.prod-detail-main .favorite-pop>p').eq(0).addClass('txt-on').siblings('p').removeClass('txt-on');
    } else {
      $this.removeClass('on');
      $('.prod-detail-main .favorite-pop').fadeIn('slow', () => {
        $('.prod-detail-main .favorite-pop').delay(500).fadeOut('slow');
      });
      $('.prod-detail-main .favorite-pop>i').removeClass('ico-on');
      $('.prod-detail-main .favorite-pop>p').eq(1).addClass('txt-on').siblings('p').removeClass('txt-on');
    }
    return false;
  });
  $('.prod-detail-main .etc-box .tab-bts>a').click((e) => {
    const $this = $(e.currentTarget);
    const idx = $this.index();
    $this.addClass('on').siblings('a').removeClass('on');
    if (idx == 0) {
      $('.prod-detail-main .etc-box .tab-conts>div').removeClass('on');
    } else {
      $('.prod-detail-main .etc-box .tab-conts>div').eq(idx - 1).addClass('on').siblings('div').removeClass('on');
    }
    return false;
  });
  $('.prod-detail-main .option-box .size>a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('size-x')) {
      $this.addClass('on').siblings('a').removeClass('on');
    }
    return false;
  });
  let count = 1;
  $('.prod-detail-main .option-box .bts-ctrl>a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('plus')) {
      if (count > 0) {
        count -= 1;
        $('.prod-detail-main .option-box .ea>span').text(count);
      }
    } else {
      count += 1;
      $('.prod-detail-main .option-box .ea>span').text(count);
    }
    return false;
  });
  if ($('.prod-img').length) {
    new Swiper('.prod-img', {
      slidesPerView: 1,
      direction: 'horizontal',
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }
  $('.prod-detail-contents .detail-addinfo a').on('click', (e) => {
    const $this = $(e.currentTarget);

    e.preventDefault();
    $this.parent().toggleClass('active').siblings().removeClass('active');
  });
  if ($('.prod-list .list-wrap').length) {
    new Swiper('.list-wrap', {
      slidesPerView: 1,
      direction: 'horizontal',
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }
});
