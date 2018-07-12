$(document).on('mobile:FAQ:load', () => {
  function getDetail(nodeId, kbId, targetEle) {
    $.getJSON(`/FAQ/${nodeId}/getFaqDetailView/${kbId}`, (data) => {
      $(targetEle).html(data.contents);
    });
  }

  $('.ques a').click((e) => {
    const dataEle = $(e.target).parents('li');
    const nodeId = dataEle.data('nodeId');
    const kbId = dataEle.data('kbId');
    const targetEle = dataEle.find('.answer .txt');
    if ($.trim(targetEle.text()) == '') {
      getDetail(nodeId, kbId, targetEle);
    }
  });
});
