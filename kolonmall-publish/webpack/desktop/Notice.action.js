$(document).on('desktop:Notice:load', () => {
  $('#noticeListMoreBtn').click((e) => {
    e.preventDefault();

    const template = Handlebars.templates['mobile/precompiles/notice/notice-item'];
    $.getJSON('api/notice?currentPage=2&pageSize=10', (data) => {
      $.each(data, (index, element) => {
        $('#noticeList').append(template(element));
      });
      $('#noticeListMoreBtn').remove();
    });
  });
});
