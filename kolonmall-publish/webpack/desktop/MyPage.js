import Swiper from 'swiper';

$(document).on('desktop:MyPage:load', () => {
  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
  // $('.layer-popup').find('.tab a').on('click', (e) => {
  //   const $this = $(e.currentTarget);
  //   const $parent = $this.closest('li');
  //   const cclass = $this.attr('href').replace('#', '.');
  //   const active = 'active';
  //   e.preventDefault();
  //   $parent.addClass('on').siblings().removeClass('on');
  //   $(cclass).addClass(active).siblings().removeClass(active);
  // });
  $('.mypage-fnq .list a').click((e) => {
    const $this = $(e.currentTarget);
    const answer = $this.closest('.question').siblings('.answer');
    e.preventDefault();
    $this.closest('.list').siblings().removeClass('on');
    $this.closest('.list').toggleClass('on');
    if (answer.closest('.list').hasClass('on')) {
      answer.closest('.list').siblings().find('.answer').slideUp('fast');
      answer.slideDown('fast');
    } else {
      answer.slideUp('fast');
    }
  });
  if ($('.recent-list .list').length) {
    new Swiper('.recent-list', {
      slidesPerView: 6,
      direction: 'horizontal',
      spaceBetween: 24,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });
  }
});
