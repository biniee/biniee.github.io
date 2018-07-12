$(document).on('mobile:load', () => {
  // 모바일 전체 적용

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

  // footer top
  function footerTop() {
    const $win = $(window);
    const $btnTop = $('.go-top');
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

  // 배너
  if ($('.prod-big-bnr').length) {
    new Swiper('.prod-big-bnr', {
      slidesPerView: 1,
      direction: 'horizontal',
      loop: true,
      pagination: '.scr-prod-pagination',
      paginationType: 'progress',
    });
  }

  // 배너 더보기
  const CONTENTS_DEFAULT_PER_PAGE = 3;

  $('.contents-default-more-btn').click((e) => {
    const $this = $(e.currentTarget);
    let currentPage = $this.data('current-page') || 1;
    const perPage = CONTENTS_DEFAULT_PER_PAGE;
    const items = $('.item', $this.prev());
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
