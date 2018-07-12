import loadMore from '../common/More.action';

$(document).on('mobile:Event:load', () => {
  loadMore('#eventListMoreBtn', '#eventListLoading', '#eventList', 'mobile/precompiles/event/event-list-item', '/Event/ListJson?');
});
