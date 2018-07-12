export const setMoreBtnEvent = (selector, deviceType) => {
  $('#kolon-content').on('click', selector, (e) => {
    e.preventDefault();

    const $this = $(e.target);
    const componentType = $this.data('componentType');
    let componentPath = '/precompiles/product/grid';
    if (componentType == 'list') {
      componentPath = '/precompiles/product/list';
    }
    const productResultAreaTemplate = Handlebars.templates[`${deviceType}${componentPath}`];
    const targetIndex = $('#kolon-content .productMoreBtn').index($this);
    const isShowColorImages = $this.data('isShowColorImages');

    const category = $this.data('category');
    const sizes = $this.data('sizes');
    const colors = $this.data('colors');
    const suppliers = $this.data('suppliers');
    const priceRanges = $this.data('priceRanges');
    const isBest = $this.data('isBest');
    const isNew = $this.data('isNew');
    const onSale = $this.data('onSale');
    const pageNumber = $this.data('pageNumber');
    const sort = $this.data('sort');
    const perPage = $this.data('perPage');

    const paramObject = {};
    if (category != '') { paramObject.category = category; }
    if (sizes != '') { paramObject.sizes = sizes; }
    if (colors != '') { paramObject.colors = colors; }
    if (suppliers != '') { paramObject.suppliers = suppliers; }
    if (priceRanges != '') { paramObject.priceRanges = priceRanges; }
    if (isBest != '') { paramObject.isBest = isBest; }
    if (isNew != '') { paramObject.isNew = isNew; }
    if (onSale != '') { paramObject.onSale = onSale; }
    if (pageNumber != '') { paramObject.pageNumber = pageNumber + 1; } else { paramObject.pageNumber = 2; }
    if (sort != '') { paramObject.sort = sort; }
    if (perPage != '') { paramObject.perPage = perPage; }

    $.getJSON('/Product/Search', $.param(paramObject)).done((data) => {
      $.each(data.results, (index, dataItem) => {
        const productData = dataItem;
        productData.isShowColorImages = isShowColorImages;
        $('#kolon-content .productResultArea').eq(targetIndex).append(productResultAreaTemplate(productData));
      });

      if (data.page.totalCount <= perPage * paramObject.pageNumber) {
        $this.remove();
      } else {
        $this.data('pageNumber', paramObject.pageNumber);
      }
    });
  });
};