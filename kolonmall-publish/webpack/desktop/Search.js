$(document).on('desktop:Search:load', () => {
  const $gnb = $('.gnb');
  const $search = $gnb.find('.search');
  const $searchBtn = $search.find('> a');
  const $close = $search.find('.close');
  const $input = $search.find('input');
  const $searchLayer = $search.find('.search-layer');
  $searchBtn.on('click', (e) => {
    e.preventDefault();
    $gnb.addClass('search-active');
  });
  $close.on('click', () => {
    $gnb.removeClass('search-active');
    $searchLayer.hide();
  });
  $input.on('focus', () => {
    $searchLayer.show();
  });
});
