$(document).on('desktop:AfterSales:load', () => {
  const $html = $('html');
  $('#repairProgressFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#mobileNumber').val($('#mobileNumber1').val() + $('#mobileNumber2').val() + $('#mobileNumber3').val());
    $('#repairProgressForm').submit();
  });

  $('#repairProgressForm').validate({
    rules: {
      name: {
        required: true,
      },
      mobileNumber1: {
        required: true,
      },
      mobileNumber2: {
        required: true,
      },
      mobileNumber3: {
        required: true,
      },
    },
    messages: {
      name: {
        required: '이름을 입력하세요.',
      },
      mobileNumber1: {
        required: '휴대폰 번호를 입력하세요.',
      },
      mobileNumber2: {
        required: '휴대폰 번호를 입력하세요.',
      },
      mobileNumber3: {
        required: '휴대폰 번호를 입력하세요.',
      },
    },
    submitHandler: () => {
      const repairProgressFormSubmitBtnLadda = Ladda.create($('#repairProgressFormSubmitBtn')[0]);
      repairProgressFormSubmitBtnLadda.start();

      const template = Handlebars.templates['desktop/precompiles/afterSales/repair-progress-item'];

      $.ajax({
        url: '/AfterSales/RepairProgress/List',
        method: 'POST',
        data: $('#repairProgressForm').serialize(),
        dataType: 'JSON',
        success: (data) => {
          if (data && data.length > 0) {
            $.each(data, (index, repairItem) => {
              $('#repairProgressFormArea').hide();
              $('#repairProgressItemsArea').show();
              $('#repairProgressItemsArea').append(template(repairItem));

              // 레이어 팝업
              const $list = $('.repair-list .list');
              const $layer = $('.layer-popup');
              $list.click((e) => {
                e.preventDefault();

                $html.toggleClass('show-layer');

                $layer.find('.close').click(() => {
                  $html.removeClass('show-layer');
                });
                $layer.find('.btn').click(() => {
                  $html.removeClass('show-layer');
                });
              });
              //
            });
          } else {
            $('div.no-result').show();
          }
        },
        complete: () => {
          repairProgressFormSubmitBtnLadda.stop();
        },
      });
    },
  });
});
