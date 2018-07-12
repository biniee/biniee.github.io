$(document).on('desktop:MyPage:load', () => {
  const $html = $('html');
  const DELIVERY = 'DELIVERY';
  // const PICKUP = 'PICKUP';
  // const RMA = 'RMA';

  const selectecMainTabs = [];

  let isMainTabChanged = false;

  function showTabContentsByMainTabType(tabType) {
    const tartgetEle = $(`#tabContents .sub-tab[data-tab-type='${tabType}']`);

    let hasData = false;

    $.each(tartgetEle.find('li'), (index, element) => {
      if ($(element).data('orderCount') > 0) {
        // 카운트 탭(서브탭) 에 카운트 수가 0이상일 경우는 disabled 상태 제거
        $(element).removeClass('disabled');
      }
    });

    $.each(tartgetEle.find('li'), (index, element) => {
      if ($(element).data('orderCount') > 0) {
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
    const template = Handlebars.templates['desktop/precompiles/order/order-list'];
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
              $(`#${summary.orderStatus}`).html(template(order));
            } else {
              $(`#${summary.orderStatus}`).append(template(order));
            }
          });
        }
      });
    }).then(() => {
      showTabContentsByMainTabType(tabType);
    });
  }

  function showSummaryOrderList(tabType) {
    if (!selectecMainTabs.includes(tabType)) {
      selectecMainTabs.push(tabType);
      getSummaryOrderList(tabType);
    } else {
      showTabContentsByMainTabType(tabType);
    }
  }

  function getWowMyKolonList() {
    $('#layerPopupArea').empty();
    $.ajax({
      url: '/MyPage/WowMyKolon',
      method: 'GET',
      dataType: 'TEXT',
      success: (data) => {
        if (data && data.length > 0) {
          $('#layerPopupArea').show();
          $('#layerPopupArea').append(data);

          $html.toggleClass('show-layer');

          const $layer = $('.layer-popup');
          $layer.find('.close-layer').click(() => {
            $html.removeClass('show-layer');
          });
          $layer.find('.close').click(() => {
            $html.removeClass('show-layer');
          });
        } else {
          // TODO: Error handling
        }
      },
    });
  }

  function getFamilyGuideList() {
    $('#layerPopupArea').empty();
    $.ajax({
      url: '/MyPage/FamilyGuide',
      method: 'GET',
      dataType: 'TEXT',
      success: (data) => {
        if (data && data.length > 0) {
          $('#layerPopupArea').show();
          $('#layerPopupArea').append(data);

          $html.toggleClass('show-layer');

          const $layer = $('.layer-popup');
          $layer.find('.close-layer').click(() => {
            $html.removeClass('show-layer');
          });
          $layer.find('.close').click(() => {
            $html.removeClass('show-layer');
          });
        } else {
          // TODO: error handling
        }
      },
    });
  }

  if ($('#tabContents').length > 0) {
    showSummaryOrderList(DELIVERY);
  }

  $('.sub-tab li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    const targetId = $this.parents('li').attr('id');
    const targetContentsId = targetId.split('_')[0];
    $this.parents('.sub-tab').find('li').removeClass('on');
    $this.parents('li').addClass('on');
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

  $('#wowMyKolonLayerPopupBtn').click((e) => {
    e.preventDefault();

    getWowMyKolonList();
  });

  $('#familyGuideLayerPopupBtn').click((e) => {
    e.preventDefault();

    getFamilyGuideList();
  });
});
