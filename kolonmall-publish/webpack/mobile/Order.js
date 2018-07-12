$(document).on('mobile:Order:load', () => {
  $('.order-prod .more').click((e) => {
    const $this = $(e.currentTarget);
    if (!$('.order-prod ul').hasClass('on')) {
      $this.addClass('on');
      $('.order-prod ul').addClass('on');
    } else {
      $this.removeClass('on');
      $('.order-prod ul').removeClass('on');
    }
    return false;
  });
  $('.gift .more').click((e) => {
    const $this = $(e.currentTarget);
    if (!$('.gift').hasClass('on')) {
      $this.addClass('on');
      $('.gift').addClass('on');
    } else {
      $this.removeClass('on');
      $('.gift').removeClass('on');
    }
    return false;
  });
  $('.gift-choice .list>li').click((e) => {
    const $this = $(e.currentTarget);
    $this.addClass('select').siblings('li').removeClass('select');
    return false;
  });
  $('.tg-btn').click((e) => {
    const $this = $(e.currentTarget);
    const $tgcon = $this.parent('div').next('div');
    const deposit = $this.parent('div').parent('div');
    if (!$this.hasClass('on')) {
      $this.addClass('on');
      $tgcon.addClass('on');
      if (deposit.hasClass('deposit')) {
        $this.next('span').css('display', 'none');
      }
    } else {
      $this.removeClass('on');
      $tgcon.removeClass('on');
      if (deposit.hasClass('deposit')) {
        $this.next('span').css('display', 'block');
      }
    }
    return false;
  });
  $('.pay-tab>li').click((e) => {
    const $this = $(e.currentTarget);
    $this.addClass('on').siblings('li').removeClass('on');
    $('.pay-con>div').eq($this.index()).addClass('on').siblings('div').removeClass('on');
    return false;
  });
  $('.add input').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
  $('.bundle .set a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('set-open')) {
      $this.addClass('set-open');
      $this.parents('.info').next().next().css('display', 'block');
    } else {
      $this.removeClass('set-open');
      $this.parents('.info').next().next().css('display', 'none');
    }
    return false;
  });
  $('.mypage-order .cancel .btns-tab>a').click((e) => {
    const $this = $(e.currentTarget);
    const tbIdx = $this.index();
    if (!$this.hasClass('on')) {
      $this.addClass('on').siblings('a').removeClass('on');
      $this.parent('div').next().children('div').eq(tbIdx).addClass('tab-on').siblings('div').removeClass('tab-on');
    }
    return false;
  });
  $('.mypage-order .cancel-return .btn-tg>a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('tg')) {
      $this.addClass('tg');
      $this.parents('.d-info').children('.ad2').css('display', 'block');
      $this.parents('.d-info').children('.ad1').css('display', 'none');
    } else {
      $this.removeClass('tg');
      $this.parents('.d-info').children('.ad2').css('display', 'none');
      $this.parents('.d-info').children('.ad1').css('display', 'block');
    }
    return false;
  });
  if ($('.scr-navi').length) {
    new Swiper('.scr-navi', {
      slidesPerView: 'auto',
      centeredSlides: false,
      paginationClickable: true,
      spaceBetween: 0,
      freeMode: true,
      onReachBeginning() {
        $('.icn-navi').addClass('left');
      },
      onReachEnd() {
        $('.icn-navi').removeClass('left');
      },
    });
  }
  $('.cl-pickup').click((e) => {
    const $this = $(e.currentTarget);
    $this.toggleClass('on');
    return false;
  });

  $('.check.hs-gift').change(() => {
    const popup = $('.popup');
    if ($('input:checkbox[class="orderItemCheckbox"]').is(':checked') == true) {
      popup.addClass('show');
      setTimeout(() => {
        popup.removeClass('show');
      }, 3000);
    } else {
      // console.log('off');
    }
  });
  $('.form-reset').click(() => {
    const form = $('#deliveryForm');
    form.find('input').val('');
    form.find('textarea').val('');
    return false;
  });
  $('.order-detail .cancel .check').change((e) => {
    const $this = $(e.currentTarget);
    if ($('input:checkbox[class="orderItemCheckbox"]').is(':checked') == true) {
      $this.parent().parent('li').css('opacity', '1');
    } else {
      $this.parent().parent('li').css('opacity', '.6');
    }
  });
  $('.top .check').change(() => {
    if ($('input:checkbox[id="all"]').is(':checked') == true) {
      $('.my-order-result .order-detail .cancel ul li').css('opacity', '1');
    } else {
      $('.my-order-result .order-detail .cancel ul li').css('opacity', '.6');
    }
  });
  $('.zip-list > li > a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent().addClass('on').siblings().removeClass('on');
    return false;
  });
});
