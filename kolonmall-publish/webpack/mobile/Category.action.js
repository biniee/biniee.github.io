import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import { setMoreBtnEvent } from '../common/common';

$(document).on('mobile:Category:load', () => {
  setMoreBtnEvent('.productMoreBtn', 'mobile');
  $('#sortSelect').change(() => {
    pushHistory();
  });

  const history = createHistory();

  function pushHistory() {
    const search = queryString.parse(location.search);

    const dataEle = $('#searchedProductListWrapper');
    const categoryCode = dataEle.data('categoryCode');
    search.category = categoryCode;
    search.pageSize = dataEle.data('pageSize');
    const sortCode = $('#sortSelect option:selected').val();
    search.sort = sortCode;
    // TODO :  레이어 팝업 영역에서 선택된 값 가져와야 함
    // const colorList = getSelectedColorList();
    // if (colorList != null && colorList.length > 0) {
    //   search.colors = colorList.join(',');
    // }
    // const priceRangeList = getSelectedPriceList();
    // if (priceRangeList != null && priceRangeList.length > 0) {
    //   search.priceRanges = priceRangeList.join(',');
    // }

    history.push({
      path: `/Category/List/${categoryCode}`,
      search: queryString.stringify(search),
      state: search,
    });
  }

  // Listen for changes to the current location.
  history.listen((location/* , action */) => {
    const productResultAreaTemplate = Handlebars.templates['mobile/components/product/grid-with-color'];

    const category = location.state.category !== undefined ? location.state.category : '';
    const sizes = location.state.sizes !== undefined ? location.state.sizes : '';
    const colors = location.state.colors !== undefined ? location.state.colors : '';
    const suppliers = location.state.suppliers !== undefined ? location.state.suppliers : '';
    const priceRanges = location.state.priceRanges !== undefined ? location.state.priceRanges : '';
    const isBest = location.state.isBest !== undefined ? location.state.isBest : '';
    const isNew = location.state.isNew !== undefined ? location.state.isNew : '';
    const onSale = location.state.onSale !== undefined ? location.state.onSale : '';
    const pageNumber = location.state.pageNumber !== undefined ? location.state.pageNumber : '';
    const sort = location.state.sort !== undefined ? location.state.sort : '';
    const pageSize = location.state.pageSize !== undefined ? location.state.pageSize : '';

    const paramObject = {};
    if (category != '') { paramObject.category = category; }
    if (sizes != '') { paramObject.sizes = sizes; }
    if (colors != '') { paramObject.colors = colors; }
    if (suppliers != '') { paramObject.suppliers = suppliers; }
    if (priceRanges != '') { paramObject.priceRanges = priceRanges; }
    if (isBest != '') { paramObject.isBest = isBest; }
    if (isNew != '') { paramObject.isNew = isNew; }
    if (onSale != '') { paramObject.onSale = onSale; }
    if (pageNumber != '') { paramObject.pageNumber = pageNumber; } else { paramObject.pageNumber = 1; }
    if (sort != '') { paramObject.sort = sort; }
    if (pageSize != '') { paramObject.perPage = pageSize; }

    $.getJSON('/Product/Search', $.param(paramObject)).done((data) => {
      if (data) {
        const dataObj = data;
        $.each(dataObj.results, (index, productDataItem) => {
          const productItem = productDataItem;
          productItem.isShowColorImages = true;
        });
        const productData = { product: dataObj, parameters: paramObject };
        if (paramObject.pageNumber == 1) {
          $('.productResultAreaWrapper').html(productResultAreaTemplate(productData));
        } else {
          $('.productResultAreaWrapper').append(productResultAreaTemplate(productData));
        }
      }
    });
  });

  function settingFilterArea() {
    const search = queryString.parse(location.search);
    $('#sortSelect option').each((index, option) => {
      if ($(option).val() == search.sort) {
        $(option).prop('selected', true);
      }
    });
  }

  if ($('#sortSelect').length > 0) {
    settingFilterArea();
  }
});
