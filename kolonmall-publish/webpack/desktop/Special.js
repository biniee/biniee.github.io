import Swiper from 'swiper';

$(document).on('desktop:Special:load', () => {
  const $wrap = $('.detail-cont');
  const $nav = $wrap.find('.nav');
  $nav.find('a').on('click', (e) => {
    const $this = $(e.currentTarget);
    const thisHref = $this.attr('href');
    e.preventDefault();
    $this.addClass('active').siblings().removeClass('active');
    if ($(thisHref).length) {
      const targetTop = $(thisHref).offset().top;
      $('body, html').animate({ scrollTop: targetTop }, 300);
    }
  });

  const $list = $('.page-function .list');
  if ($list.length) {
    $list.on('click', (e) => {
      e.preventDefault();
      const $this = $(e.currentTarget);
      $this.toggleClass('active');
    });

    $list.one('click', () => {
      const $slideWrap = $('.slide-list');
      const $slideItem = $slideWrap.find('.list');
      const $controls = $slideWrap.next('.swiper-controls');
      if ($slideItem.length > 6) {
        $controls.show();
        new Swiper($slideWrap, {
          slidesPerView: 6,
          direction: 'horizontal',
          spaceBetween: 32,
          loop: true,
          observer: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
        });
      }
    });
  }
});
