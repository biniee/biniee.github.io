import Swiper from 'swiper';

$(document).on('desktop:Main:load', () => {
  const $win = $(window);
  // main visual
  if ($('.visual-slide').length) {
    $('.visual-slide').addClass('full-width');
    new Swiper('.visual-slide', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      loop: true,
      centeredSlides: true,
      spaceBetween: 15,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }

  // special price
  if ($('.special .item').length) {
    new Swiper('.special .slide-list', {
      slidesPerView: 3,
      direction: 'horizontal',
      spaceBetween: 15,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
  // issue & deals
  if ($('.issue .item').length) {
    new Swiper('.issue .slide-list', {
      slidesPerView: 3,
      direction: 'horizontal',
      spaceBetween: 15,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
  // gnb
  function fixedBg() {
    const winW = $(window).width();
    const headerW = $('.kolon-header').width();
    const targetW = (winW - headerW) / 2;

    $('.fixed-bg').css({ left: -targetW + 'px', right: -targetW + 'px' });
  }
  const $category = $('.header-nav').find('.category');
  let cateTimeout;
  $category.on('mouseenter focus', '> li > a', (e) => {
    const $this = $(e.currentTarget);
    // const $subCate = $this.next('.sub-category');

    $this.addClass('active').parent().siblings().children('a').removeClass('active');
  });
  $category.on('mouseleave', (e) => {
    const $this = $(e.currentTarget);
    const $active = $this.find('.active');

    cateTimeout = setTimeout(() => {
      $active.removeClass('active');
    }, 300);
  }).on('mouseenter', () => {
    clearTimeout(cateTimeout);
  });
  fixedBg();
  $win.on('resize.fixedBg', () => {
    fixedBg();
  });
});

