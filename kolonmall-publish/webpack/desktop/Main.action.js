import { setMoreBtnEvent } from '../common/common';

$(document).on('desktop:Main:load', () => {
  setMoreBtnEvent('.productMoreBtn', 'desktop');

  function getBrandBestContents(categoryId) {
    $.getJSON(`/Product/Search?category=${categoryId}&isBest=true&perPage=5&pageNumber=1`, (data) => {
      const dataObj = {};
      dataObj.product = data;
      dataObj.parameters = { category: categoryId, isBest: true };
      const productGridComponentTemplate = Handlebars.templates['desktop/components/product/grid'];
      $('#mainBrandBestContentsArea').html(productGridComponentTemplate(dataObj));
    });
  }

  $('#mainBrandBestMenuList a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);
    const selectedBrandCategoryId = $this.data('categoryId');
    $('#mainBrandBestMenuList a').removeClass('active');
    $this.addClass('active');

    $('#mainBrandBestLinkArea').attr('href', `/Brand/${selectedBrandCategoryId}`);
    getBrandBestContents($this.data('categoryId'));
  });

  if ($('#mainBrandBestMenuList').length > 0) {
    const firstBrandCategoryId = $('#mainBrandBestMenuList a').eq(0).data('categoryId');
    getBrandBestContents(firstBrandCategoryId);
  }
});
