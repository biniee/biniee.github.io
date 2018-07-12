import Swiper from 'swiper';

$(document).on('desktop:Event:load', () => {
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
