$(document).on('desktop:FAQ:load', () => {
  $('.qna').click((e) => {
    const $this = $(e.currentTarget);
    const answer = $this.children('dd');
    $this.siblings('dl').removeClass('on');
    $this.toggleClass('on');
    if (answer.parent().hasClass('on')) {
      answer.parent('.qna').siblings().children('dd').slideUp('fast');
      answer.slideDown('fast');
    } else {
      answer.slideUp('fast');
    }
  });

  $('[data-trigger="layer"]').click((e) => {
    $($(e.target).data('target')).show().find('.close, .close-layer').on('click', () => {
      $($(e.target).data('target')).hide();
      $('html').removeClass('show-layer');
    });
  });
});
