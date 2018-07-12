import moment from 'moment';

$(document).on('mobile:Deposit:load', () => {
  let searchPeriodDays = 30;
  let depositListTemplate = null;
  let isPeriodChanged = false;
  let pageNumber = 1;

  function getDepositList() {
    const endDate = moment().format('YYYYMMDD');
    let startDate = moment(endDate).add(-1, 'M').format('YYYYMMDD');
    if (searchPeriodDays == 90) {
      startDate = moment(endDate).add(-3, 'M').format('YYYYMMDD');
    } else if (searchPeriodDays == 365) {
      startDate = moment(endDate).add(-1, 'Y').format('YYYYMMDD');
    }
    const params = {
      startDate,
      endDate,
      pageNumber,
    };

    $('#depositListLoading').show();

    $.ajax({
      url: '/Deposit/History',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data.results && data.results.length > 0) {
          const targetEle = $('#resultDepositList');
          targetEle.parents('#resultDepositListWrapper').show();
          $.each(data.results, (index, element) => {
            if (pageNumber == 1 && isPeriodChanged && index == 0) {
              $('#emptyResultDepositList').hide();
              targetEle.html(depositListTemplate(element));
            } else {
              targetEle.append(depositListTemplate(element));
            }
          });
        } else {
          if (pageNumber == 1) {
            $('#emptyResultDepositList').show();
          } else {
            $('#moreBtn').hide();
          }
        }
      },
    }).always(() => $('#depositListLoading').hide());
  }

  $('#moreBtn').click((e) => {
    e.preventDefault();

    pageNumber++;
    getDepositList();
  });

  if ($('#resultDepositListWrapper').length > 0) {
    depositListTemplate = Handlebars.templates['mobile/precompiles/deposit/deposit-item'];
    getDepositList();
  }

  $('#periodTabs > li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if (!$this.hasClass('on')) {
      isPeriodChanged = true;
      pageNumber = 1;
      $('#moreBtn').show();
    }

    $('#periodTabs > li').removeClass('on');
    searchPeriodDays = $this.data('searchPeriod');
    $this.parent().addClass('on');

    getDepositList();
  });
});
