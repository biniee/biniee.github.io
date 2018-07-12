$(document).on('mobile:AfterSales:load', () => {
  $('#repairProgressFormReSubmitBtn').click((e) => {
    e.preventDefault();

    $('#repairProgressFormArea').show();
    $('#repairProgressItemsArea').html('');
    $('#repairProgressResultArea').hide();
  });

  $('#repairProgressItemsArea').on('click', '.repairItemSubmitBtn', (e) => {
    e.preventDefault();

    const dataEle = $(e.target).parents('li');
    const targetForm = $('#repairProgressDetailForm');
    targetForm.find('input[name="custNm"]').val(dataEle.data('custnm'));
    targetForm.find('input[name="cnslofcMemo"]').val(dataEle.data('cnslofcmemo'));
    targetForm.find('input[name="cmplTh2SchdDt"]').val(dataEle.data('cmplth2schddt'));
    targetForm.find('input[name="shopSendDt"]').val(dataEle.data('shopsenddt'));
    targetForm.find('input[name="empNm"]').val(dataEle.data('empnm'));
    targetForm.find('input[name="mendN1ChrdYn"]').val(dataEle.data('mendn1chrdyn'));
    targetForm.find('input[name="mendSendDt"]').val(dataEle.data('mendsenddt'));
    targetForm.find('input[name="cnslofcRcptDt"]').val(dataEle.find('.cnslofcRcptDt').text());
    targetForm.find('input[name="shopNM"]').val(dataEle.find('.shopNM').text());
    targetForm.find('input[name="styleColorCd"]').val(dataEle.find('.styleColorCd').text());
    targetForm.find('input[name="mendC"]').val(dataEle.find('.mendC').text());
    targetForm.submit();
  });

  $('#repairProgressFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#repairProgressForm').submit();
  });

  $('#repairProgressForm').validate({
    rules: {
      name: {
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
      mobileNumber: {
        required: '휴대폰 번호를 입력하세요.',
      },
    },
    submitHandler: () => {
      const repairProgressFormSubmitBtnLadda = Ladda.create($('#repairProgressFormSubmitBtn')[0]);
      repairProgressFormSubmitBtnLadda.start();

      const template = Handlebars.templates['mobile/precompiles/afterSales/repair-progress-item'];

      $.ajax({
        url: '/AfterSales/RepairProgress/List',
        method: 'POST',
        data: $('#repairProgressForm').serialize(),
        dataType: 'JSON',
        success: (data) => {
          if (data && data.length > 0) {
            $.each(data, (index, repairItem) => {
              $('#repairProgressFormArea').hide();
              $('#repairProgressResultArea').show();
              $('#repairProgressItemsArea').append(template(repairItem));
            });
          } else {
            alert('조회하신 정보가 없습니다');
          }
        },
        complete: () => {
          repairProgressFormSubmitBtnLadda.stop();
        },
      });
    },
  });
});
