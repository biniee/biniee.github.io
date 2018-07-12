$(document).on('desktop:RMA:load', () => {
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
});
