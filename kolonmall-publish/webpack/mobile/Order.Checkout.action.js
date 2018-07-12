/* eslint max-len: "off" */

$(document).on('mobile:Order:load', () => {
  function updateTotalPrice(totalPrice) {
    $('#totalBasePrice').text(`${totalPrice.totalBasePrice.formattedPrice}${totalPrice.totalBasePrice.symbol}`);
    $('#deliveryCost').text(`${totalPrice.deliveryCost.formattedPrice}${totalPrice.deliveryCost.symbol}`);
    $('#totalDiscounts').text(`${totalPrice.totalDiscounts.formattedPrice}${totalPrice.totalDiscounts.symbol}`);
    $('#totalPointDiscounts').text(`${totalPrice.totalPointDiscounts.formattedPrice}${totalPrice.totalPointDiscounts.symbol}`);
    $('#totalPrice').html(`<i>${totalPrice.totalPrice.formattedPrice}</i>${totalPrice.totalPrice.symbol}`);
    $('#totalPrice').data('totalPrice', totalPrice.totalPrice.formattedPrice);
  }

  function applyDeposit(deposit) {
    const csrfToken = $('[name=CSRFToken]').val();
    const depositData = { CSRFToken: csrfToken, amount: deposit };
    $.post('/Order/Deposit/Apply', depositData).done((data) => {
      $('#usedDeposit').val(data.usedDeposit);
      updateTotalPrice(data.totalPrice);
      if (deposit == 0) {
        $('#paymentMethodArea').show();
        $('#noPaymentMethodArea').hide();
      } else {
        if (data.totalPrice.totalPrice.formattedPrice == '0') {
          $('#paymentMethodArea').hide();
          $('#noPaymentMethodArea').show();
        }
      }
    });
  }

  function applyPoints(points) {
    const csrfToken = $('[name=CSRFToken]').val();
    const pointData = { CSRFToken: csrfToken, amount: points };
    $.post('/Order/Point/Apply', pointData).done((data) => {
      $('#usedPoint').val(data.usedPoint);
      updateTotalPrice(data.totalPrice);
    });
  }

  $('#allDepositBtn').click((e) => {
    e.preventDefault();
    const totalDeposit = $('#availableDeposit').data('availableDeposit').toString().replace(/,/g, '');
    const totalPrice = $('#totalPrice').data('totalPrice').toString().replace(/,/g, '');
    applyDeposit(Math.min(totalDeposit, totalPrice));
  });

  $('#toggleDepositBtn').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if ($this.hasClass('on')) {
      applyDeposit(0);
    }
  });

  $('#allPointsBtn').click((e) => {
    e.preventDefault();

    const totalPoints = $('#availablePoint').data('availablePoint').toString().replace(/,/g, '');
    const totalPrice =  $('#totalPrice').data('totalPrice').toString().replace(/,/g, '');
    applyPoints(Math.min(totalPoints, totalPrice));
  });

  $('#togglePointBtn').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if ($this.hasClass('on')) {
      applyPoints(0);
    }
  });

  function placeOrder() {
    const totalPrice =  parseInt($('#totalPrice').data('totalPrice').toString().replace(/,/g, ''));
    let paymentMethod = '';
    if (totalPrice == 0) {
      paymentMethod = 'POINT';
    } else {
      $('#paymentMethodListArea li').each((index, liElement) => {
        const $this = $(liElement);
        if ($this.hasClass('on')) {
          paymentMethod = $this.data('paymentMethod');
          return false;
        }
        return true;
      });
    }
    $('#paymentMethod').val(paymentMethod);
    $.post('/Order/PrepareChcekout', $('#checkoutForm').serialize())
      .done((data) => {
        // 모바일/데스크탑 구분해서 결제 관련 창을 띄우는 로직이 달라 질 수 있어서 분기함.
        // TODO: 각 결제 타입별로 모바일/데스크탑에 따라 다르게 구현 해야 함.
        // TODO: 현재 샘플은 모바일 기준으로 구현되어 있음.
        switch (paymentMethod) {
          case 'PAYCO':
            alert(JSON.stringify(data));
            location.href = data.paymentUrl;
            break;
          case 'KAKAOPAY':
            alert(JSON.stringify(data));
            location.href = data.paymentUrl;
            break;
          case 'CARDLGUPLUS':
          case 'BANDTRANSFERLGUPLUS':
            alert(JSON.stringify(data));
            location.href = data.paymentUrl;
            break;
          case 'POINT': // 전액 포인트/예치금 결제
            location.href = data.paymentUrl;
            break;
          default:
            // TODO: 알수 없는 결제수단입니다.
            break;
        }
      })
      .fail((request) => {
        const responseObj = JSON.parse(request.responseText);
        if (responseObj.code == 'ERROR') {
          alert(responseObj.message);
        }
      });
  }



  $('#checkoutFormSubmitTestBtn').click((e) => {
    e.preventDefault();
    placeOrder();
  });
});
