$(document).on('mobile:MyPage:load', () => {
  const DELIVERY = 'DELIVERY';
  // const PICKUP = 'PICKUP';
  // const RMA = 'RMA';

  const selectedMainTabs = [];

  let isMainTabChanged = false;

  function showTabContentsByMainTabType(tabType) {
    const tartgetEle = $(`#tabContents .sub-tab[data-tab-type='${tabType}']`);

    let hasData = false;

    $.each(tartgetEle.find('li'), (index, element) => {
      if ($(element).data('orderCount') > 0) {
        tartgetEle.find('li').removeClass('tab-on');
        $(element).addClass('tab-on');
        const contentsAreaId = $(element).attr('id').split('_')[0];
        $('.tab-contents-wrapper .tab-contents').hide();
        // 데이터가 있는 첫번째 탭 컨텐츠 영역이 보이게
        $(`#${contentsAreaId}`).show();
        hasData = true;
        return false;
      }
      return true;
    });
    if (!hasData) {
      $('.tab-contents-wrapper .tab-contents').hide();
      $(`.${tabType}`).eq(0).show();
    }
  }

  function getSummaryOrderList(tabType) {
    const template = Handlebars.templates['mobile/precompiles/order/order-list'];
    $.getJSON(`/MyPage/CurrentOrders?orderType=${tabType}`, (data) => {
      $.each(data, (index, summary) => {
        $(`#${summary.orderStatus}_count`)
          .data('orderCount', summary.count)
          .find('.count').text(summary.count);
        if (summary.count > 0) {
          $(`#${summary.orderStatus}_count`).addClass('on');
          $.each(summary.orders, (index2, order) => {
            const summaryOrder = order;
            summaryOrder.isRmaListView = false;
            if (isMainTabChanged && index2 == 0) {
              $(`#${summary.orderStatus}`).html(template(summaryOrder));
            } else {
              $(`#${summary.orderStatus}`).append(template(summaryOrder));
            }
          });
        }
      });
    }).then(() => {
      showTabContentsByMainTabType(tabType);
    });
  }

  function showSummaryOrderList(tabType) {
    if (!selectedMainTabs.includes(tabType)) {
      selectedMainTabs.push(tabType);
      getSummaryOrderList(tabType);
    } else {
      showTabContentsByMainTabType(tabType);
    }
  }

  if ($('#tabContents').length > 0) {
    showSummaryOrderList(DELIVERY);
  }

  $('.sub-tab li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    const targetId = $this.parents('li').attr('id');
    const targetContentsId = targetId.split('_')[0];
    $this.parents('.sub-tab').find('li').removeClass('tab-on');
    $this.parents('li').addClass('tab-on');
    $('.tab-contents-wrapper .tab-contents').hide();
    $(`#${targetContentsId}`).show();
  });

  $('#tabs > li').click((e) => {
    e.preventDefault();
    $('#tabs > li').removeClass('on');
    isMainTabChanged = true;

    const $this = $(e.target);
    const thisId = e.target.id.split('_')[0];
    $this.parent().addClass('on');
    $('#tabContents .sub-tab').hide();
    $(`#tabContents .sub-tab[data-tab-type='${thisId}']`).show();

    showSummaryOrderList(thisId);
  });
});
