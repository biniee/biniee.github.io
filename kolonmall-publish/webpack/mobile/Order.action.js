/* eslint max-len: "off" */
import moment from 'moment';

$(document).on('mobile:Order:load', () => {
  let searchPeriodDays = 30;
  let orderListTemplate = null;
  const RMA_TYPE_CANCEL = 'Cancel';     // 취소
  const RMA_TYPE_EXCHANGE = 'Exchange'; // 교환
  const RMA_TYPE_RETURN = 'Return';     // 반품
  const AJAX_RETURN_SUCCESS_CODE = 'ok';
  const rmaType = $('#rmaOrderForm').data('rmaType');
  const DEFAULT_SWAP_OPTION_CODE = 'A01999'; // 사유코드 기타
  const ORDER_PAGE_SIZE = 10;
  let currentPage = 1;

  function getRMAText() {
    if (rmaType == RMA_TYPE_CANCEL) {
      return '취소';
    } else if (rmaType == RMA_TYPE_EXCHANGE) {
      return '교환';
    }

    return '반품';
  }

  const rmaTypeText = getRMAText();

  function getOrderList() {
    const isPointOfService = $('#isPointOfServiceSelect option:selected').val();
    const endDate = moment().format('YYYYMMDD');
    let startDate = moment(endDate).add(-1, 'M').format('YYYYMMDD');
    let searchPeriodText = '1개월';
    if (searchPeriodDays == 90) {
      startDate = moment(endDate).add(-3, 'M').format('YYYYMMDD');
      searchPeriodText = '3개월';
    } else if (searchPeriodDays == 365) {
      startDate = moment(endDate).add(-1, 'Y').format('YYYYMMDD');
      searchPeriodText = '1년';
    }
    const params = {
      startDate,
      endDate,
      requestType: 10, // (10: 전체주문, 20: 취소반품교환)
      pageSize: ORDER_PAGE_SIZE,
      currentPage,
    };

    if (isPointOfService != 'all') {
      params.isPointOfService = isPointOfService;
    }
    params.searchKeyword = $('#searchWordInput').val();
    if (currentPage == 1) {
      $('#resultOrderListWrapper').hide();
    }
    $('#orderListLoading').show();
    $('#moreBtn').hide();
    $.ajax({
      url: '/Order/ConsignmentEntries',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data.results && data.results.length > 0) {
          $('#emptyResultOrderList').hide();
          $('#resultOrderListWrapper').show();

          $.each(data.results, (index, result) => {
            const order = result;
            order.isRmaListView = false;
            $.each(result.items, (index2, item) => {
              const orderItem = item;
              orderItem.deliveryType = result.deliveryType;
              orderItem.displayedDeliveryType = result.displayedDeliveryType;
              orderItem.orderNumber = result.orderNumber;
              orderItem.isOrderDetailView = false;
            });
            if (currentPage == 1 && index == 0) {
              $('#resultOrderListWrapper').show();
              $('#resultOrderList').html(orderListTemplate(result));
            } else {
              $('#resultOrderList').append(orderListTemplate(result));
            }
          });
          if (data.page.totalCount > currentPage * ORDER_PAGE_SIZE) {
            $('#moreBtn').show();
          } else {
            $('#moreBtn').hide();
          }
        } else {
          $('#searchPeriodText').text(searchPeriodText);
          $('#emptyResultOrderList').show();
          $('#resultOrderListWrapper').hide();
        }
      },
    }).always(() => $('#orderListLoading').hide());
  }
  if ($('#resultOrderListWrapper').length > 0) {
    orderListTemplate = Handlebars.templates['mobile/precompiles/order/order-list'];
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

  $('#deliveryFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#deliveryForm').submit();
  });

  $('#deliveryForm').validate({
    rules: {
      firstName: {
        required: true,
      },
      mobileNumber: {
        required: true,
      },
    },
    messages: {
      firstName: {
        required: '이름을 입력하세요.',
      },
      mobileNumber: {
        required: '휴대폰 번호를 입력하세요.',
      },
    },
    submitHandler: () => {
      const deliveryRequestVal = $('#deliveryRequestSelect option:selected').val();
      if (deliveryRequestVal == 'txtbox' && $.trim($('#deliveryMessageTextarea').val()) === '') {
        alert('배송메세지를 입력해 주세요.');
        return;
      }

      $.ajax({
        url: '/Order/Addresses',
        method: 'POST',
        data: $('#deliveryForm').serialize(),
        dataType: 'JSON',
        success: (data) => {
          if (data.status == 'ok') {
            location.href = '/Order/Checkout';
          }
        },
      });
    },
  });

  $('#checkoutFormSubmitBtn').click((e) => {
    e.preventDefault();

    $.ajax({
      url: '/Order/PlaceOrder',
      method: 'POST',
      data: $('#checkoutForm').serialize(),
      dataType: 'JSON',
      success: (data) => {
        if (data.status == 'ok') {
          location.href = '/Order/Complete';
        }
      },
    });
  });

  $('#myDeliveryAddFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#myDeliveryAddForm').submit();
  });

  $('#myDeliveryAddForm').validate({
    rules: {
      name: {
        required: true,
      },
      address: {
        required: true,
      },
      mobileNumber: {
        required: true,
      },
    },
    messages: {
      name: {
        required: '이름을 입력하세요.',
      },
      address: {
        required: '주소를 입력하세요.',
      },
      mobileNumber: {
        required: '휴대폰 번호를 입력하세요.',
      },
    },
    submitHandler: () => {
      const deliveryRequestVal = $('#deliveryRequestSelect option').is(':selected').val();
      if (deliveryRequestVal == 'txtbox' && $.trim($('#deliveryMessageTextarea').val()) === '') {
        alert('배송메세지를 입력해 주세요.');
        return;
      }

      $.ajax({
        url: '',
        method: 'POST',
        data: $('#deliveryForm').serialize(),
        dataType: 'JSON',
        success: () => {
          // if (data.status == 'ok') {
          // }
        },
      });
    },
  });

  function getReturnPaymentInfo(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption, originDeliveryCode, deliveryStatus, refundDeliveryGb) {
    $.getJSON(`/Order/${orderNumber}/Return/PaymentInfo?orderEntrycode=${orderEntrycode}&orderConsignmentEntrycode=${orderConsignmentEntrycode}&quantity=${quantity}&returnOption=${rmaOption}&originDeliveryCode=${originDeliveryCode}&deliveryStatus=${deliveryStatus}&refundDeliveryGb=${refundDeliveryGb}`, (data) => {
      if (data && data.length > 0) {
        let afterEle = '';
        let symbol = '원';
        $.each(data, (index, payment) => {
          if (payment.method == 'POINT') {
            symbol = 'point';
          }
          if (index == 0) {
            $('#firstRefundName').text(payment.name);
            $('#firstRefundValue').text(`${payment.formattedAmount}${symbol}`);
          } else {
            afterEle += '<dt></dt>';
            afterEle += `<dd class="dt">${payment.name}</dd>`;
            afterEle += `<dd>${payment.formattedAmount}${symbol}</dd>`;
          }
          $('#firstRefundValue').after(afterEle);
        });
      }
    });
  }

  function getReturnDeliveryCost(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption, originDeliveryCode, deliveryStatus) {
    if ($.trim(orderEntrycode) != '') {
      $.getJSON(`/Order/${orderNumber}/Return/DeliveryCost?orderEntrycode=${orderEntrycode}&orderConsignmentEntrycode=${orderConsignmentEntrycode}&quantity=${quantity}&returnOption=${rmaOption}&originDeliveryCode=${originDeliveryCode}&deliveryStatus=${deliveryStatus}`, (data) => {
        if (data) {
          $('#returnDeliveryCost').text(`${data.deliveryCost}원`);
        }
      });
    } else {
      $('#returnDeliveryCost').text('0원');
    }
  }

  function getCancelPaymentInfo(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity) {
    $.getJSON(`/Order/${orderNumber}/Cancel/PaymentInfo?orderEntrycode=${orderEntrycode}&orderConsignmentEntrycode=${orderConsignmentEntrycode}&quantity=${quantity}`, (data) => {
      if (data) {
        if (data.status == AJAX_RETURN_SUCCESS_CODE) {
          // TODO : 주문 취소시 환불금액 관련 데이터 리모델링 예정. 기획쪽에서 데이터 정리 예정
          if (data.returnObject && data.returnObject.deliveryCost) {
            $('#orderDeliveryCost').text(`${data.returnObject.deliveryCost}원`);
          }
          if (data.returnList && data.returnList.length > 0) {
            // $.each(data.returnList, (index, cancelInfo) => {
            //   $('#cancelTotalBasePrice').text('원');
            //   $('#orderTotalDiscount').text('원');
            //   $('#orderDetailPrice').text('원');
            //   $('#orderDetailPriceValue').text();
            // });
          }
        }
      }
    });
  }

  function getExchangeDeliveryCost(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption) {
    if ($.trim(orderEntrycode) != '') {
      $.getJSON(`/Order/${orderNumber}/Exchange/DeliveryCost?orderEntrycode=${orderEntrycode}&orderConsignmentEntrycode=${orderConsignmentEntrycode}&quantity=${quantity}&swapOption=${rmaOption}`, (data) => {
        if (data) {
          $('#exchangeDeliveryCost').text(`${data.deliveryCost}원`);
        }
      });
    } else {
      $('#exchangeDeliveryCost').text('0원');
    }
  }

  function getRmaPaymentInfo() {
    const orderNumber = $('#rmaOrderForm').data('orderNumber');
    const entryCodes = [];
    const consignmentEntryCodes = [];
    const quantities = [];
    const rmaOptions = [];
    const originDeliveryCodes = [];
    const deliveryStatusList = [];

    let deliveryStatusVal = 'N';
    if ($('#rmaOrderForm #deliveryStatus').is(':checked')) {
      deliveryStatusVal = 'Y';
    }

    let refundDeliveryGbVal = '10';
    $('#rmaOrderForm #refundDeliveryGb a').each((index, ele) => {
      if ($(ele).hasClass('on')) {
        refundDeliveryGbVal = $(ele).data('refundDeliveryGb');
      }
    });

    $.each($('#rmaOrderForm #rmaOrderItemList li input[type=checkbox]:checked'), (index, orderItem) => {
      const dataEle = $(orderItem).parents('li');
      entryCodes.push(dataEle.data('entryCode'));
      consignmentEntryCodes.push(dataEle.data('consignmentEntryCode'));
      quantities.push(dataEle.find('.orderItemQuantity').val());
      const rmaOptionValue = dataEle.find('.rmaOption option:selected').val();
      let rmaOptionCode = rmaOptionValue;
      if (rmaOptionValue == '' || rmaOptionValue == 'txtbox') {
        rmaOptionCode = DEFAULT_SWAP_OPTION_CODE;
      } else if (rmaOptionValue == 'size') {
        rmaOptionCode = 'A01941';
      }
      rmaOptions.push(rmaOptionCode);
      originDeliveryCodes.push(dataEle.data('originDeliveryCode'));
      deliveryStatusList.push(deliveryStatusVal); // 반품 시, 상품을 이미 판매자에게 발송했는지 여부
    });

    const orderEntrycode = entryCodes.join(',');
    const orderConsignmentEntrycode = consignmentEntryCodes.join(',');
    const quantity = quantities.join(',');
    const rmaOption = rmaOptions.join(',');
    const originDeliveryCode = originDeliveryCodes.join(',');
    const deliveryStatus = deliveryStatusList.join(',');
    const refundDeliveryGb = refundDeliveryGbVal;// 반품 시, 환불금액에서 차감 OR 계좌로 입금

    if (rmaType == RMA_TYPE_CANCEL) {
      getCancelPaymentInfo(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity);
    } else if (rmaType == RMA_TYPE_EXCHANGE) {
      getExchangeDeliveryCost(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption);
    } else if (rmaType == RMA_TYPE_RETURN) {
      getReturnPaymentInfo(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption, originDeliveryCode, deliveryStatus, refundDeliveryGb);
      getReturnDeliveryCost(orderNumber, orderEntrycode, orderConsignmentEntrycode, quantity, rmaOption, originDeliveryCode, deliveryStatus);
    }
  }

  function toggleControlsActive() {
    $('#rmaOrderForm #rmaOrderItemList li input[class=orderItemCheckbox]').each((index, checkedEle) => {
      const $this = $(checkedEle);
      const targetEle = $(checkedEle).parents('li');
      if ($this.is(':checked')) {
        targetEle.find('.rmaOption, .quantityMinus, .quantityPlus, .sizeSelect, .rmaReason').removeAttr('disabled');
      } else {
        targetEle.find('.rmaOption, .quantityMinus, .quantityPlus, .sizeSelect, .rmaReason').attr('disabled', 'disabled');
      }
    });
  }

  if ($('#rmaOrderForm').length > 0) {
    getRmaPaymentInfo();
  }

  // 아이템 체크/체크 해제시, 사유변경시, 전체 토글 체크/체크 해제시, 반품시 '상품을 이미 판매자에게 발송' 체크/체크 해제시
  // 1. 배송비와 금액 재계산
  // 2. 체크 해제된 항목 찾아서 disabled로 변경.
  $('#rmaOrderForm #rmaOrderItemList li input[class=orderItemCheckbox], .rmaOption, #rmaOrderForm #all, #rmaOrderForm #deliveryStatus').change(() => {
    getRmaPaymentInfo();
    toggleControlsActive();
  });

  $('#rmaOrderForm #rmaOrderItemList li input[class=orderItemQuantity]').change(() => {
    getRmaPaymentInfo();
  });

  $('#refundDeliveryGb a').click(() => {
    getRmaPaymentInfo();
  });

  $('.quantityMinus').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if ($this.attr('disabled') === undefined || $this.attr('disabled') != 'disabled') {
      const targetEle = $this.parents('.conts').find('input[class=orderItemQuantity]');
      const currentQty = targetEle.val();
      let intCurrentQty = parseInt(currentQty, 10);
      if (intCurrentQty !== undefined && intCurrentQty > 1) {
        intCurrentQty--;
        targetEle.val(intCurrentQty).trigger('change');
      }
    }
  });

  $('.quantityPlus').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if ($this.attr('disabled') === undefined || $this.attr('disabled') != 'disabled') {
      const targetEle = $this.parents('.conts').find('input[class=orderItemQuantity]');
      const currentQty = targetEle.val();
      let intCurrentQty = parseInt(currentQty, 10);
      if (intCurrentQty !== undefined && intCurrentQty < targetEle.data('originalQuantity')) {
        intCurrentQty++;
        targetEle.val(intCurrentQty).trigger('change');
      }
    }
  });

  const sizeOptionDataMap = new Map();

  function showSizeList(selectedProductCode, productBaseCode, targetEle) {
    let optionHtml = '';
    $.each(sizeOptionDataMap.get(productBaseCode), (index, size) => {
      const selectedAttr = selectedProductCode == size.code ? 'selected="selected"' : '';
      const disabledAttr = !size.isInStock ? 'disabled="disabled"' : '';
      optionHtml += `<option value='${size.code}' ${selectedAttr} ${disabledAttr}>${size.sizeValue} ${!size.isInStock ? '(품절)' : ''}</option>`;
    });
    targetEle.html(optionHtml);
  }

  function getSizeList(selectedProductCode, productBaseCode, targetEle) {
    $.getJSON(`/Product/${productBaseCode}/variantOptions`, (data) => {
      if (data && data.results && data.results.length > 0) {
        const sizeList = [];
        $.each(data.results, (index, product) => {
          let value = '';
          $.each(product.variantOptionQualifiers, (index2, option) => {
            if (option.qualifier == 'size') {
              value = option.value;
            }
          });
          const sizeData = {
            code: product.code,
            sizeValue: value,
            isInStock: product.stock.stockLevelStatus != 'outOfStock' && product.stock.stockLevel > 0,
          };
          sizeList.push(sizeData);
        });

        sizeOptionDataMap.set(productBaseCode, sizeList);
      }
    }).then(() => {
      showSizeList(selectedProductCode, productBaseCode, targetEle);
    });
  }

  $('.sizeSelect').click((e) => {
    const $this = $(e.target);
    const dataEle = $this.parents('li');
    const productBaseCode = dataEle.data('productBaseCode');
    const selectedProductCode = $('.sizeSelect option:selected').val();
    if (!sizeOptionDataMap.has(productBaseCode)) {
      getSizeList(selectedProductCode, productBaseCode, $this);
    } else {
      showSizeList(selectedProductCode, productBaseCode, $this);
    }
  });

  $('#rmaOrderSubmitBtn').click((e) => {
    e.preventDefault();

    const targetForm = $('#rmaOrderForm');
    const orderNumber = targetForm.data('orderNumber');
    const targetItems = targetForm.find('#rmaOrderItemList li input[class=orderItemCheckbox]:checked');
    if (targetItems.length < 1) {
      alert(`${rmaTypeText}할 상품을 선택해 주세요.`);
      return false;
    }

    const orderEntrycodes = [];
    const orderConsignmentEntrycodes = [];
    const quantities = [];
    const rmaOptions = [];
    const rmaReasons = [];
    const originDeliveryCodes = [];
    const sizes = [];
    const productCodes = [];

    let isValidState = true;
    $.each(targetItems, (index, rmaItemEle) => {
      const rmaItem = $(rmaItemEle).parents('li');
      orderEntrycodes.push(rmaItem.data('entryCode'));
      orderConsignmentEntrycodes.push(rmaItem.data('consignmentEntryCode'));
      quantities.push(rmaItem.find('.orderItemQuantity').val());
      const rmaOption = rmaItem.find('.rmaOption option:selected').val();
      if (rmaOption == '') {
        alert(`${rmaTypeText} 사유를 선택해 주세요.`);
        isValidState = false;
      }
      let rmaReason = rmaItem.find('.rmaReason').val();
      if ($.trim(rmaReason) == '') {
        rmaReason = ' '; // 공백문자열이라도 넘기기
      }
      if (rmaOption == 'txtbox') {
        if ($.trim(rmaReason) == '') {
          alert(`상품 ${rmaTypeText} 사유를 작성해 주세요.`);
          isValidState = false;
        }
        rmaOptions.push(DEFAULT_SWAP_OPTION_CODE);
      } else {
        rmaOptions.push(rmaOption);
      }
      rmaReasons.push(rmaReason);
      if (rmaType == RMA_TYPE_EXCHANGE) {
        sizes.push(rmaItem.data('productSize'));
        productCodes.push(rmaItem.data('productCode'));
        originDeliveryCodes.push(rmaItem.data('originDeliveryCode'));
      } else if (rmaType == RMA_TYPE_RETURN) {
        originDeliveryCodes.push(rmaItem.data('originDeliveryCode'));
      }
    });

    if (!isValidState) {
      return isValidState;
    }

    const requestData = $('#rmaOrderForm').serializeArray(); // convert form to array

    requestData.push({ name: 'orderEntrycode', value: orderEntrycodes.join(',') });
    requestData.push({ name: 'orderConsignmentEntrycode', value: orderConsignmentEntrycodes.join(',') });
    requestData.push({ name: 'quantity', value: quantities.join(',') });
    if (rmaType == RMA_TYPE_CANCEL) {
      requestData.push({ name: 'cancelOption', value: rmaOptions.join(',') });
      requestData.push({ name: 'cancelReason', value: rmaReasons.join(',') });
    } else if (rmaType == RMA_TYPE_EXCHANGE) {
      requestData.push({ name: 'originDeliveryCode', value: originDeliveryCodes.join(',') });
      requestData.push({ name: 'size', value: sizes.join(',') });
      requestData.push({ name: 'productCode', value: productCodes.join(',') });
      requestData.push({ name: 'replacementOption', value: rmaOptions.join(',') });
      requestData.push({ name: 'replacementReason', value: rmaReasons.join(',') });
    } else if (rmaType == RMA_TYPE_RETURN) {
      requestData.push({ name: 'originDeliveryCode', value: originDeliveryCodes.join(',') });
      requestData.push({ name: 'returnOption', value: rmaOptions.join(',') });
      requestData.push({ name: 'returnReason', value: rmaReasons.join(',') });
    }
    $.ajax({
      url: `/Order/${orderNumber}/${rmaType}`,
      method: 'POST',
      data: $.param(requestData),
      dataType: 'JSON',
      success: (data) => {
        if (data) {
          if (data.status == AJAX_RETURN_SUCCESS_CODE) {
            location.href = `/Order/${rmaType}Complete`;
          } else {
            alert(data.message);
          }
        }
      },
      // error: (xhr, status, error)=> {
      // TODO : error 처리
      // },
    });
    return true;
  });

  // 반품시 배송사 정보 조회
  function getDeliveryVendorList() {
    const targetEle = $('#deliveryVendorSelect');
    if (targetEle.find('option').length == 1) {
      $.getJSON('/Order/DeliveryList', (data) => {
        if (data.results && data.results.length > 0) {
          $.each(data.results, (index, deliveryVendor) => {
            targetEle.append(`<option value="${deliveryVendor.deliveryVendorCode}">${deliveryVendor.deliveryVendorName}</option>`);
          });
        }
      });
    }
  }

  $('.alreadySend a').click((e) => {
    if (!$(e.target).hasClass('tg')) {
      getDeliveryVendorList();
    }
  });
});
