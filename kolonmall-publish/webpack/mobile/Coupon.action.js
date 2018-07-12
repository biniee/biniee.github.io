$(document).on('mobile:Coupon:load', () => {
  $('#couponTabs li a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    $('#couponTabs li').removeClass('on');
    $this.parents('li').addClass('on');

    if ($this.data('couponType') == 'online') {
      $('#onlineCouponList').show();
      $('#offlineCouponList').hide();
    } else {
      $('#onlineCouponList').hide();
      $('#offlineCouponList').show();
    }
  });
});
