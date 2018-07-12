import onLoad from '../common/Login.action';

$(document).on('desktop:Login:load', onLoad);
$(document).on('desktop:Login:load', () => {
  // mobile only onLoad function
  $('#guestOrderFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#guestOrderForm').submit();
  });

  $('#guestOrderForm').validate({
    rules: {
      name: {
        required: true,
      },
      orderNumber: {
        required: true,
      },
    },
    messages: {
      name: {
        required: '주문자명을 입력하세요.',
      },
      orderNumber: {
        required: '주문번호를 입력하세요.',
      },
    },
  });

  $('#loginForm').submit(function () {
    if($("#id-phone").is(":checked")) {
      $("#type").val("02");
    } else {
      $("#type").val("01");
    }
  });
});
