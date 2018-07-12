$(document).on('mobile:Contact:load', () => {
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
  $('.to-one .ques>a').click((e) => {
    const $this = $(e.currentTarget);
    if (!$this.hasClass('on')) {
      $this.addClass('on');
      $this.parent('div').next('div').slideDown(100);
    } else {
      $this.removeClass('on');
      $this.parent('div').next('div').slideUp(100);
    }
    return false;
  });
  $('.to-one .answer>a').click((e) => {
    const $this = $(e.currentTarget);
    $this.parent('p').prev('p').children('a').removeClass('on');
    $this.parent('p').slideUp(100);
    return false;
  });
  $('.cs-depth3 ul>li').click((e) => {
    const $this = $(e.currentTarget);
    const tabnum = $this.index();
    $this.addClass('on').siblings('li').removeClass('on');
    $('.search-prod').children('.tab').css('display', 'none');
    $(`.tab${tabnum}`).css('display', 'block');
    return false;
  });
  $('.add-form :text').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
  $('.add-form textarea').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
  $('.file :file').change((e) => {
    const $this = $(e.currentTarget);
    const preview = $this.next().children('img');
    $this.next().children('.in-tit').css('display', 'block').siblings('span').css('display', 'none');
    if (window.FileReader) {
      if (!$this[0].files[0].type.match(/image\//)) return;
      const reader = new FileReader();
      reader.onload = (ee) => {
        const src = ee.target.result;
        preview.attr('src', src);
      };
      reader.readAsDataURL($this[0].files[0]);
    } else {
      $this[0].select();
      $this[0].blur();
      preview.attr('src', '/_ui/img/icn/icn-file.jpg');
    }
  });
  const cntInquiry = $('.cnt-inquiry ul');
  const iqOffset = cntInquiry.offset();
  const headerHgt = $('.kolon-header').height();
  $(window).scroll(() => {
    if ($(document).scrollTop() + headerHgt > iqOffset.top) {
      $(cntInquiry).addClass('fixed');
    } else {
      $(cntInquiry).removeClass('fixed');
    }
  });
});
