$(document).on('desktop:FAQ:load', () => {
  function getDetail(nodeId, kbId, targetEle) {
    $.getJSON(`/FAQ/${nodeId}/getFaqDetailView/${kbId}`, (data) => {
      $(targetEle).html(data.contents);
    });
  }

  $('.ques').click((e) => {
    const dataEle = $(e.target).parents('dl');
    const nodeId = dataEle.data('nodeId');
    const kbId = dataEle.data('kbId');
    const targetEle = dataEle.find('.answer');
    if ($.trim(targetEle.text()) == '') {
      getDetail(nodeId, kbId, targetEle);
    }
  });
});
