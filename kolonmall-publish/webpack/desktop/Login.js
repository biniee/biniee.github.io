$(document).on('desktop:Login:load', () => {
  const $win = $(window);
  // login
  const $loginWrap = $('.login-wrap');
  const $tab = $loginWrap.find('.tab-menu');
  $tab.find('a').on('click', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('href');
    $this.addClass('active').siblings().removeClass('active');
    $(target).addClass('active').siblings().removeClass('active');
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

