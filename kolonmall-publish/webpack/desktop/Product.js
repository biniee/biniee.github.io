import Swiper from 'swiper';

$(document).on('desktop:Product:load', () => {
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
  if ($('.thumb-group .swiper-slide').length) {
    const mySwiper = new Swiper('.thumb-group .thumb', {
      slidesPerView: 1,
      nextButton: '.thumb-group .swiper-button-next',
      prevButton: '.thumb-group .swiper-button-prev',
    });
    const $swiperThumb = $('.swiper-thumb a');
    $swiperThumb.on('click', (e) => {
      const $this = $(e.currentTarget);
      const $index = $this.index();

      e.preventDefault();
      $this.addClass('on').siblings().removeClass('on');
      mySwiper.slideTo($index);
    });
    mySwiper.on('slideChangeStart', () => {
      $swiperThumb.eq(mySwiper.activeIndex).addClass('on').siblings().removeClass('on');
    });
  }

  const $boxSlide = $('.size-box-slide');
  $boxSlide.each((index, element) => {
    const $this = $(element);

    $this.addClass('data-slide' + index);

    const $slide = $('.data-slide' + index);
    const $item = $slide.find('.swiper-slide');
    const $control = $slide.siblings('.swiper-controls');
    const $next = $control.find('.swiper-button-next');
    const $prev = $control.find('.swiper-button-prev');

    $control.hide();
    if ($item.length > 6) {
      $control.show();

      new Swiper($slide, {
        slidesPerView: 6,
        spaceBetween: 5,
        paginationClickable: true,
        nextButton: $next,
        prevButton: $prev,
      });
    }
  });

  $('.prod-cont .add-info a').on('click', (e) => {
    const $this = $(e.currentTarget);

    e.preventDefault();
    $this.parent().toggleClass('active').siblings().removeClass('active');
  });
  if ($('.recent-list .list').length) {
    new Swiper('.recent-list', {
      slidesPerView: 6,
      direction: 'horizontal',
      spaceBetween: 24,
      loop: true,
      nextButton: '.recent-list .swiper-button-next',
      prevButton: '.recent-list .swiper-button-prev',
    });
  }
  function detailNav() {
    const $win = $(window);
    const $detailNav = $('.detail-nav');
    const detailTop = $detailNav.offset().top;
    $win.on('scroll', () => {
      const scrollTop = $win.scrollTop();
      if (scrollTop >= detailTop) {
        $detailNav.addClass('fixed');
      } else {
        $detailNav.removeClass('fixed');
      }
    });
  }
  detailNav();
});
