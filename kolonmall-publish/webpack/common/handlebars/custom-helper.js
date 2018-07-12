/* eslint camelcase: "off" */
import moment from 'moment';
import nl2brModule from 'nl2br';

const render_hide_loader = htmlId => (
  '<div id="' + htmlId + '" class="progress-circle-indeterminate m-t-45 p-b-45" style="display: none;"></div>'
);

const render_loader = htmlId => (
  '<div id="' + htmlId + '" class="progress-circle-indeterminate m-t-45 p-b-45"></div>'
);

const pageUrl = (url, page) => {
  if (url.indexOf('?') > -1) {
    const params = url.substring(url.indexOf('?') + 1).split('&');
    let search = '?';
    for (let i = 0; i < params.length; i++) {
      if (params[i].indexOf('pageNumber') == -1) {
        search += params[i] + '&';
      }
    }
    return `${url.substring(0, url.indexOf('?'))}${search}pageNumber=${page}`;
  }

  return `${url}?pageNumber=${page}`;
};

const render_paging = (pageInfo, url) => {
  const pageSpan = 10;
  const halfPageSpan = parseInt(pageSpan / 2, 10);

  const totalPage = parseInt((pageInfo.totalCount - 1) / pageInfo.perPage, 10) + 1;
  let startPage = pageInfo.currentPage <= pageSpan ? 1 : pageInfo.currentPage - pageSpan + 1;
  if (pageInfo.currentPage > halfPageSpan && totalPage > pageSpan) {
    if (pageInfo.currentPage > totalPage - halfPageSpan) {
      startPage = totalPage - pageSpan + 1;
    } else {
      startPage = pageInfo.currentPage - halfPageSpan + 1;
    }
  }
  const endPage = (startPage + pageSpan) > totalPage ? totalPage : (startPage + pageSpan - 1);

  let html = '';

  html += '<div class="paging">';
  if (pageInfo.currentPage == 1) {
    html += '  <a class="prev">이전 페이지</a>';
  } else {
    html += `  <a href="${pageUrl(url, pageInfo.currentPage - 1)}" class="prev">이전 페이지</a>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    if (pageInfo.currentPage == i) {
      html += `  <strong class="on">${i}</strong>`;
    } else {
      html += `  <a href="${pageUrl(url, i)}">${i}</a>`;
    }
  }
  if (pageInfo.currentPage == totalPage) {
    html += '  <a class="next">다음 페이지</a>';
  } else {
    html += `  <a href="${pageUrl(url, pageInfo.currentPage + 1)}" class="next">다음 페이지</a>`;
  }
  html += '</div>';

  return html;
};

const to_date_string = date => moment(date).format('YYYY.MM.DD');

const to_time_string = date => moment(date).format('hh:mm');

const to_datetime_string = date => moment(date).format('YYYY.MM.DD hh:mm');

const rma_title_by_status = (status) => {
  if (status == 'CANCEL_RECEIPT' || status == 'CANCEL_PROGRESS' || status == 'CANCEL_COMPLETED') {
    return 'Cancel';
  } else if (status == 'EXCHANGE_RECEIPT' || status == 'EXCHANGE_PROGRESS' || status == 'EXCHANGE_COMPLETED') {
    return 'Exchange';
  } else if (status == 'RETURN_RECEIPT' || status == 'RETURN_PROGRESS' || status == 'RETURN_COMPLETED') {
    return 'Return';
  }

  return 'Cancel';
};

const nl2br = str => nl2brModule(str);

const render_background_color = str => (`#${str}`);

const list_to_string_with_comma_space = (str) => {
  if (str != null && str.length > 0) {
    return str.join(', ');
  }
  return '';
};

const list_to_string_with_comma = (str) => {
  if (str != null && str.length > 0) {
    return str.join(',');
  }
  return '';
};

const hide_item_gte = (idx, count) => {
  if (idx >= count) {
    return 'display: none;';
  }

  return '';
};

const line_cnt = (str, count, options) => {
  if (str != null && str.length > 0) {
    const cnt = (str.match(/\n/g) || []).length;
    if (cnt == count - 1) {
      return options.fn(this);
    }
  }

  return options.inverse(this);
};

const helper = {
  render_hide_loader,
  render_loader,
  render_paging,
  to_date_string,
  to_time_string,
  to_datetime_string,
  rma_title_by_status,
  nl2br,
  render_background_color,
  list_to_string_with_comma_space,
  list_to_string_with_comma,
  hide_item_gte,
  line_cnt,
};

export default helper;
