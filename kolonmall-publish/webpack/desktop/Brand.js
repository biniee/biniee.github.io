import Swiper from 'swiper';

$(document).on('desktop:Brand:load', () => {
  // visual banner
  if ($('.visual-banner .item').length) {
    new Swiper('.visual-banner', {
      slidesPerView: 1,
      direction: 'horizontal',
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
  if ($('.issue .item').length) {
    new Swiper('.issue .slide-list', {
      slidesPerView: 3,
      direction: 'horizontal',
      spaceBetween: 21,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }

  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer, .btn').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });

  $('[data-trigger="toggle"]').click((e) => {
    const $toggle = $(e.currentTarget);
    e.preventDefault();

    $($(e.target).data('target')).show().find('a').on('click', (event) => {
      const $this = $(event.currentTarget);
      const txt = $this.text();

      $this.addClass('active').parent().siblings().find('a').removeClass('active');
      $toggle.text(txt);
      $($(e.target).data('target')).hide();
    });
  });
});
