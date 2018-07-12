import loadMore from '../common/More.action';

$(document).on('mobile:Special:load', () => {
  loadMore('#specialListMoreBtn', '#specialListLoading', '#specialList', 'mobile/precompiles/special/special-list-item', '/special/ListJson?');
});
