import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import { setMoreBtnEvent } from '../common/common';

$(document).on('desktop:Category:load', () => {
  setMoreBtnEvent('.productMoreBtn', 'desktop');
  if ($('.itemCount').length > 0) {
    $('.itemCount').each((index, element) => {
      const $this = $(element);
      const targetEle = $this.parents('.prod-wrap');
      let itemCount = 0;
      if (targetEle.find('.productMoreBtn').length > 0) {
        itemCount = $this.data('totalCount');
      } else {
        itemCount = targetEle.find('.list').length;
      }
      $this.text(itemCount);
    });
  }

  function getSelectedColorList() {
    const colorList = [];
    if ($('#filterPopupWrapper .colorFilter:checked').length > 0) {
      $('#filterPopupWrapper .colorFilter:checked').each((index, thisEle) => {
        colorList.push($(thisEle).val());
      });
    }
    return colorList;
  }

  function getSelectedPriceList() {
    const priceRangeList = [];
    if ($('#filterPopupWrapper .priceFilter:checked').length > 0) {
      $('#filterPopupWrapper .priceFilter:checked').each((index, thisEle) => {
        priceRangeList.push($(thisEle).val());
      });
    }
    return priceRangeList;
  }

  const history = createHistory();

  function pushHistory(sortCodeParam) {
    const search = queryString.parse(location.search);

    const dataEle = $('.searchedProductListWrapper');
    const categoryCode = dataEle.data('categoryCode');
    search.category = categoryCode;
    search.pageSize = dataEle.data('pageSize');
    const colorList = getSelectedColorList();
    if (colorList != null && colorList.length > 0) {
      search.colors = colorList.join(',');
    }
    const priceRangeList = getSelectedPriceList();
    if (priceRangeList != null && priceRangeList.length > 0) {
      search.priceRanges = priceRangeList.join(',');
    }
    let sortCode = $('#sortOptionWrapper').find('.active').length > 0 ? $('#sortOptionWrapper').find('.active').eq(0).data('sortCode') : 'approval-desc';
    if (sortCodeParam != '') {
      sortCode = sortCodeParam;
      search.pageNumber = 1;
    } 
    
    search.sort = sortCode;
    history.push({
      path: `/Category/List/${categoryCode}`,
      search: queryString.stringify(search),
      state: search,
    });
  }

  $('#applyFilterBtn').click((e) => {
    e.preventDefault();
    pushHistory();
    const selectedFilterBarTemplate = Handlebars.templates['desktop/partials/category/category-list-selected-filter-bar'];
    const paramObject = {};
    paramObject.colors = getSelectedColorList();
    paramObject.priceRanges = getSelectedPriceList();
    $('#selectedFilterWrapper dl').html(selectedFilterBarTemplate(paramObject));
    $('#selectedFilterWrapper').show();
  });

  $('.sortOption').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    const sortCode = $this.data('sortCode');
    pushHistory(sortCode);
  });

  // Listen for changes to the current location.
  history.listen((location/* , action */) => {
    const productResultAreaTemplate = Handlebars.templates['desktop/components/product/grid-with-color-and-page'];

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
        const productData = { product: dataObj, pageUrl: `${location.path}${location.search}` };
        $('#kolon-content .productResultAreaWrapper').html(productResultAreaTemplate(productData));
      }
    });
  });

  function settingFilterArea() {
    $('#sortOptionWrapper .sortOption').each((index, element) => {
      const $this = $(element);
      if ($this.hasClass('active')) {
        $('#sortOptionToggle').text($this.text());
      }
    });

    if ($('#filterPopupWrapper .colorFilter:checked, #filterPopupWrapper .priceFilter:checked').length > 0) {
      $('#applyFilterBtn').show();
      $('#closeFilterPopupBtn').hide();
    } else {
      $('#applyFilterBtn').hide();
      $('#closeFilterPopupBtn').show();
    }
  }

  if ($('.searchedProductListWrapper').length > 0) {
    settingFilterArea();
  }

  function resetFilter() {
    const dataEle = $('.searchedProductListWrapper');
    const categoryCode = dataEle.data('categoryCode');
    const search = {};
    search.category = categoryCode;
    history.push({
      path: `/Category/List/${categoryCode}`,
      search: queryString.stringify(search),
      state: search,
    });

    $('#selectedFilterWrapper dl').html('');
    $('#selectedFilterWrapper').hide();
  }

  $('#filterPopupWrapper .colorFilter, #filterPopupWrapper .priceFilter').change((e) => {
    const $this = $(e.target);
    if ($this.is(':checked')) {
      $('#applyFilterBtn').show();
      $('#closeFilterPopupBtn').hide();
    } else {
      // 필터 팝업 내용중 체크한 것이 하나도 없을 경우
      if ($('#filterPopupWrapper .colorFilter:checked, #filterPopupWrapper .priceFilter:checked').length == 0) {
        $('#applyFilterBtn').hide();
        $('#closeFilterPopupBtn').show();
        resetFilter();
      }
    }
  });

  $('.resetFilterBtn').click((e) => {
    e.preventDefault();

    resetFilter();
  });
});
