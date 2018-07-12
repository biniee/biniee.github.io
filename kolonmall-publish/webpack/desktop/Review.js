$(document).on('desktop:Review:load', () => {
  const $reviewLayer = $('.layer-review');
  $reviewLayer.on('click', '.star', (e) => {
    const $this = $(e.currentTarget);
    const mouseX = e.pageX;
    const thisPosition = $this.offset().left;
    const starPosition = Math.floor((mouseX - thisPosition) / 46) + 1;
    $this.attr({ 'data-grade': starPosition });
    $('#rating').val(starPosition);
  });
});
