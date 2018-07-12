$(document).on('desktop:Category:load', () => {
  if ($('.top-banner .item').length) {
    new Swiper('.top-banner .slide-list', {
      slidesPerView: 3,
      direction: 'horizontal',
      spaceBetween: 20,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
  if ($('.issue-and-deal-banner .item').length) {
    new Swiper('.issue-and-deal-banner .slide-list', {
      slidesPerView: 3,
      direction: 'horizontal',
      spaceBetween: 20,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }

  if ($('.cate-nav').length) {
    new Swiper('.cate-nav', {
      slidesPerView: 'auto',
      direction: 'horizontal',
      centeredSlides: false,
      spaceBetween: 0,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
  const $win = $(window);
  $('[data-trigger="layer"]').click((e) => {
    e.preventDefault();
    $($(e.target).data('target')).show().find('.close, .close-layer, .btn').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });

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
