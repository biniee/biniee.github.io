$(document).on('mobile:Search:load', () => {
  $('.srch-word input').keyup((e) => {
    const $this = $(e.currentTarget);
    if ($this.val() == null || $this.val() == '' || $this.val() == 'undefined') {
      $this.next().css('display', 'none');
      $this.parent().siblings().children('.search').addClass('gray');
      $('.typing').css('display', 'none');
    } else {
      $this.next().css('display', 'block');
      $this.parent().siblings().children('.search').removeClass('gray');
      $('.typing').css('display', 'block');
    }
  });
  $('.srch-word .reset').click((e) => {
    const $this = $(e.currentTarget);
    $this.prev('input').val('');
    $this.css('display', 'none');
    $this.parent().siblings().children('.search').addClass('gray');
    $('.typing').css('display', 'none');
    return false;
  });
});
