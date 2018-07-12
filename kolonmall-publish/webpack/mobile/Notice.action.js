import loadMore from '../common/More.action';

$(document).on('mobile:Notice:load', () => {
  loadMore('#noticeListMoreBtn', '#noticeListLoading', '#noticeList', 'mobile/precompiles/notice/notice-item', '/Notice/ListJson?');
});
