import loadMore from '../common/More.action';

$(document).on('desktop:Special:load', () => {
  loadMore('#specialListMoreBtn', '#specialListLoading', '#specialList', 'desktop/precompiles/special/special-list-item', '/special/ListJson?');
});
