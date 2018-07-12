$(document).on('desktop:load', () => {
  // 데스크탑 전체 적용
  const $win = $(window);
  const $html = $('html');

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

  // 브랜드 메뉴
  $('.etc .btn-brand').click((e) => {
    const $this = $(e.currentTarget);
    $('.brand-menu').toggleClass('on');
  });

  // 셀렉트 메뉴
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

  $html.click((e) => {
    if ($(e.target).data('target') != '.list-option') {
      $($('#sortOptionToggle').data('target')).hide();
    }
  });

  // 제휴문의 Form Submit 관련
  $('.add-area :text').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });
  $('.add-area textarea').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
    } else {
      $this.next().css('display', 'block');
    }
  });

  $('#from_email1').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() != null && $this.val() != '' && $this.val() != 'undefined') {
      $('#from_email').val($this.val() + '@' + $('#from_email2').val());
    }
  });

  $('#from_email2').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() != null && $this.val() != '' && $this.val() != 'undefined') {
      $('#from_email').val($('#from_email1').val() + '@' + $this.val());
    }
  });

  const $select = $('.alliance-form').find('select');
  $select.on('change', (e) => {
    const $this = $(e.currentTarget);
    const $direct = $this.find('#direct');
    const $naver = $this.find('#naver');
    const $nate = $this.find('#nate');
    const $hanmail = $this.find('#hanmail');
    const $targetArea = $this.closest('.alliance-form').find('#from_email2');

    if ($direct.is(':checked')) {
      $targetArea.val('');
    } else if ($naver.is(':checked')) {
      $targetArea.val('naver.com');
    } else if ($nate.is(':checked')) {
      $targetArea.val('nate.com');
    } else if ($hanmail.is(':checked')) {
      $targetArea.val('hanmail.net');
    }

    $('#from_email').val($('#from_email1').val() + '@' + $this.val());
  });
  $('#proposalFormSubmitBtn').click((e) => {
    e.preventDefault();
    $('#from_email').val($('#from_email1').val() + '@' + $('#from_email2').val());
    $('#proposalForm').submit();
  });

  $('#proposalForm').validate({
    rules: {
      title: {
        required: true,
      },
      from_name: {
        required: true,
      },
      telno: {
        required: true,
      },
      from_email1: {
        required: true,
      },
      from_email2: {
        required: true,
      },
      from_email: {
        required: true,
        email: true,
      },
      content: {
        required: true,
      },
      agree: {
        required: true,
      },
    },
    messages: {
      title: {
        required: '제목을 입력해 주세요.',
      },
      from_name: {
        required: '이름을 입력해 주세요.',
      },
      telno: {
        required: '연락처를 입력해 주세요.',
      },
      from_email1: {
        required: '이메일을 입력해 주세요.',
      },
      from_email2: {
        required: '이메일을 입력해 주세요.',
      },
      from_email: {
        required: '이메일을 입력해 주세요.',
        email: '이메일 형식으로 입력해 주세요.',
      },
      content: {
        required: '내용을 입력해 주세요.',
      },
      agree: {
        required: '개인정보, 수집, 이용에 대한 동의를 하셔야 제휴문의가 가능합니다.',
      },
    },
    submitHandler: () => {
      const proposalFormSubmitBtnLadda = Ladda.create($('#proposalFormSubmitBtn')[0]);
      proposalFormSubmitBtnLadda.start();

      $.ajax({
        url: '/Proposal/Add',
        method: 'POST',
        data: $('#proposalForm').serialize(),
        dataType: 'JSON',
        success: () => {
          alert('문의가 접수 되었습니다.');
          location.href = '/FAQ';
        },
        complete: () => {
          proposalFormSubmitBtnLadda.stop();
        },
      });
    },
  });
  // footer top
  function footerTop() {
    const $btnTop = $('.btn-top');
    $win.on('scroll', () => {
      const scrollTop = $win.scrollTop();
      if (scrollTop > 1500) {
        $btnTop.addClass('active');
      } else {
        $btnTop.removeClass('active');
      }
    });
    $btnTop.on('click', () => {
      $('html, body').animate({ scrollTop: 0 }, 300);
    });
  }
  footerTop();

  // 배너 더보기
  const CONTENTS_DEFAULT_PER_PAGE = 6;

  $('.contents-default-more-btn').click((e) => {
    const $this = $(e.currentTarget);
    let currentPage = $this.data('current-page') || 1;
    const perPage = CONTENTS_DEFAULT_PER_PAGE;
    const items = $('.item-wrapper', $this.prev());
    const totalCount = items.length;
    const totalPage = parseInt((totalCount - 1)/perPage, 10) + 1;

    if (currentPage < totalPage) {
      currentPage++;

      for (let i = (currentPage - 1) * perPage; i < currentPage * perPage && i < totalCount; i++) {
        $(items[i]).show();
      }

      $this.data('current-page', currentPage);

      if (currentPage == totalPage) {
        $this.hide();
      }
    }
  });
});
