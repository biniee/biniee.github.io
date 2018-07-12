import Swiper from 'swiper';

$(document).on('mobile:Brand:load', () => {
  /*
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
    });
  }*/
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').removeClass('left');
      },
      onReachEnd() {
        $('.icn-navi').addClass('left');
      },
    });
  }
  if ($('.brand-top').length) {
    new Swiper('.brand-top', {
      autoplay: 5000,
      speed: 600,
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
    });
  }
  if ($('.list-scr-navi').length) {
    new Swiper('.list-scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').removeClass('left');
      },
      onReachEnd() {
        $('.icn-navi').addClass('left');
      },
    });
  }
  if ($('.scr-prod').length) {
    new Swiper('.scr-prod', {
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }
  if ($('.brand-shop').length) {
    new Swiper('.brand-shop', {
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
      pagination: '.brand-shop-pagination',
      paginationType: 'progress',
    });
  }
  if ($('.all-slide').length) {
    new Swiper('.all-slide', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').removeClass('left');
      },
      onReachEnd() {
        $('.icn-navi').addClass('left');
      },
    });
  }
  if ($('.brand-slide').length) {
    new Swiper('.brand-slide', {
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
    });
  }
  if ($('.shop-list').length) {
    new Swiper('.shop-list', {
      slidesPerView: 'auto',
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
    });
  }
  $('.size > ul > li > button, .sel-color > ul > li > button').click((e) => {
    const $this = $(e.currentTarget);
    // $this.parent().addClass('on').siblings().removeClass('on');
    if ($this.parent().hasClass('on')) {
      $this.parent().removeClass('on');
    } else {
      $this.parent().addClass('on');
    }
    return false;
  });
  $('.list > li > a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent().addClass('on').siblings().removeClass('on');
    return false;
  });
  $('.al-list > li > ul > li a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent().addClass('on').siblings().removeClass('on');
    return false;
  });
  $('.btns .btn-default').click(() => {
    $('.size').children().children().removeClass('on');
    $('.sel-color').children().children().removeClass('on');
    $('.sel-price input[type=checkbox]').prop('checked', false);
    $('.al-list').children().children().children().removeClass('on');
    $('.list').children().removeClass('on');
    $('.btns').removeClass('on');
  });
  $('.size > ul > li > button, .sel-color > ul > li > button, .sel-price > ul > li > label').click(() => {
    if ($('.btns').hasClass('on')) {
      // $('.btns').removeClass('on');
    } else {
      $('.btns').addClass('on');
    }
  });
});
