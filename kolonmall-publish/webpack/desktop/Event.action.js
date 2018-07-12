import loadMore from '../common/More.action';

$(document).on('desktop:Event:load', () => {
  loadMore('#eventListMoreBtn', '#eventListLoading', '#eventList', 'desktop/precompiles/event/event-list-item', '/Event/ListJson?');
});
