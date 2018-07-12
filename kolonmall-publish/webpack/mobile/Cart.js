$(document).on('mobile:Cart:load', () => {
  $('.gift-choice .list>li').click((e) => {
    const $this = $(e.currentTarget);
    $this.addClass('select').siblings('li').removeClass('select');
    return false;
  });
});
