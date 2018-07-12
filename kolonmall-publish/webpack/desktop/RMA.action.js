import moment from 'moment';

$(document).on('desktop:RMA:load', () => {
  let searchPeriodDays = 30;
  let orderListTemplate = null;
  const RMA_PAGE_SIZE = 10;
  let currentPage = 1;

  function getSearchPeriodText() {
    if (searchPeriodDays == 90) {
      return '3개월';
    } else if (searchPeriodDays == 180) {
      return '6개월';
    } else if (searchPeriodDays == 365) {
      return '1년';
    }
    return '1개월';
  }

  function getStartDate() {
    const endDate = moment().format('YYYYMMDD');
    if (searchPeriodDays == 90) {
      return moment(endDate).add(-3, 'M').format('YYYYMMDD');
    } else if (searchPeriodDays == 180) {
      return moment(endDate).add(-6, 'M').format('YYYYMMDD');
    } else if (searchPeriodDays == 365) {
      return moment(endDate).add(-1, 'Y').format('YYYYMMDD');
    }
    return moment(endDate).add(-1, 'M').format('YYYYMMDD');
  }

  function getSearchStatusText(orderStatus) {
    if (orderStatus == 'CANCEL') {
      return '취소';
    } else if (orderStatus == 'EXCHANGEORDER') {
      return '교환';
    } else if (orderStatus == 'RETURN') {
      return '반품';
    }
    return '취소/교환/반품';
  }

    // pageSize 를 늘리는 방식으로 페이징
  function getOrderList() {
    const isPointOfService = $('#isPointOfServiceSelect option:selected').val();
    const orderStatus = $('#orderStatusSelect option:selected').val();
    const pageSize = currentPage * RMA_PAGE_SIZE;
    const endDate = moment().format('YYYYMMDD');
    const startDate = getStartDate(searchPeriodDays);
    const searchPeriodText = getSearchPeriodText(searchPeriodDays);

    const params = {
      startDate,
      endDate,
      requestType: 20, // (10: 전체주문, 20: 취소반품교환)
      pageSize,
    };

    if (isPointOfService != 'all') {
      params.isPointOfService = isPointOfService;
    }

    if (orderStatus != 'all') {
      params.orderStatus = orderStatus;
    }

    params.searchKeyword = $('#searchWordInput').val();
    $('#resultOrderList').hide();
    $('#rmaListLoading').show();
    $('#moreBtn').hide();
    $.ajax({
      url: '/Order/ConsignmentEntries',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data) {
          if (data.results && data.results.length > 0) {
            $('#emptyResultOrderList').hide();
            $('#resultOrderList').show();
            $.each(data.results, (index, element) => {
              $.each(element.items, (index2, item) => {
                const orderItem = item;
                orderItem.deliveryType = element.deliveryType;
                orderItem.displayedDeliveryType = element.displayedDeliveryType;
                orderItem.orderNumber = element.orderNumber;
                orderItem.isOrderDetailView = false;
              });
              if (index == 0) {
                $('#resultOrderList').html(orderListTemplate(element)).show();
              } else {
                $('#resultOrderList').append(orderListTemplate(element));
              }
            });
            if (data.page.totalCount > pageSize) {
              $('#moreBtn').show();
            } else {
              $('#moreBtn').hide();
            }
          } else {
            $('#searchPeriodText').text(searchPeriodText);
            const searchStatusText = getSearchStatusText(orderStatus);
            $('#searchStatusText').text(searchStatusText);
            $('#emptyResultOrderList').show();
            $('#resultOrderList').hide();
          }
        }
      },
    }).always(() => $('#rmaListLoading').hide());
  }

  if ($('#resultOrderList').length > 0) {
    orderListTemplate = Handlebars.templates['desktop/precompiles/order/order-list'];
    getOrderList();
  }

  $('#periodBtns > li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    $('#periodBtns > li').removeClass('on');
    searchPeriodDays = $this.data('searchPeriod');
    $this.parent().addClass('on');
  });

  $('#searchOrderBtn').click((e) => {
    e.preventDefault();
    currentPage = 1;
    getOrderList();
  });

  $('#moreBtn').click((e) => {
    e.preventDefault();
    currentPage++;
    getOrderList();
  });
});
