$(document).on('desktop:GuestOrder:load', () => {
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
});
