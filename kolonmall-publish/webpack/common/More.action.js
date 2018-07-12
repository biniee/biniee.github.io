/** 더보기 관련 공통 로직 */
const loadMore = (moreBtn, loading, listWrapper, templateName, url) => {
  if ($(moreBtn).length == 0) {
    return;
  }

  let currentPage = 1;

  const template = Handlebars.templates[templateName];

  const getMoreList = () => {
    $(loading).show();
    $(moreBtn).hide();
    $.getJSON(`${url}pageNumber=${currentPage}`, (data) => {
      $.each(data.results, (index, element) => {
        $(listWrapper).append(template(element));
      });

      if (data.page.totalCount > currentPage * data.page.perPage) {
        $(moreBtn).show();
      } else {
        $(moreBtn).hide();
      }
    }).always(() => $(loading).hide());
  };

  $(moreBtn).click((e) => {
    e.preventDefault();
    currentPage++;
    getMoreList();
  });
};

export default loadMore;
