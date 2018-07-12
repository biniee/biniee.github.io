import moment from 'moment';

$(document).on('mobile:Point:load', () => {
  let searchPeriodDays = 30;
  let type = 'available';
  let pointListTemplate = null;
  let isPeriodChanged = false;
  let isPointTabChanged = false;
  let pageNumber = 1;

  function getPointList() {
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
      type, // (available, unavailable)
      pageNumber,
    };
    let endOfData = false;
    $('#moreBtn').hide();
    $('#pointListLoading').show();
    $.ajax({
      url: '/Point/History',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data.results && data.results.length > 0) {
          const targetEle = $('#resultPointList');
          targetEle.show();
          $.each(data.results, (index, element) => {
            if (pageNumber == 1 && ((isPeriodChanged && index == 0) || (isPointTabChanged && index == 0))) {
              $('#emptyResultPointList').hide();
              targetEle.html(pointListTemplate(element));
            } else {
              targetEle.append(pointListTemplate(element));
            }
          });
        } else {
          if (pageNumber == 1) {
            $('#resultPointList').hide();
            $('#emptyResultPointList').show();
          }
          endOfData = true;
        }
      },
    }).always(() => {
      $('#pointListLoading').hide();

      // 페이징 처리시 필요한 total count 개념이 없으므로 더보기 버튼은 무조건적으로 노출. 클릭후 데이터 없으면 사라짐.
      if (endOfData) {
        $('#moreBtn').hide();
      } else {
        $('#moreBtn').show();
      }
    });
  }
  $('#moreBtn').click((e) => {
    e.preventDefault();

    pageNumber++;
    getPointList();
  });

  if ($('#resultPointListWrapper').length > 0) {
    pointListTemplate = Handlebars.templates['mobile/precompiles/point/point-item'];
    getPointList();
  }

  $('#periodTabs > li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if (!$this.hasClass('on')) {
      isPeriodChanged = true;
      pageNumber = 1;
      $('#pointListLoading').show();
    }
    $('#emptyResultPointList').hide();
    $('#periodTabs > li').removeClass('on');
    searchPeriodDays = $this.data('searchPeriod');
    $this.parent().addClass('on');

    getPointList();
  });

  $('#pointTabs > li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    if (!$this.hasClass('on')) {
      isPointTabChanged = true;
      pageNumber = 1;
      $('#pointListLoading').show();
    }
    $('#emptyResultPointList').hide();
    $('#pointTabs > li').removeClass('on');
    type = $this.data('historyType');
    $this.parent().addClass('on');

    getPointList();
  });
});
