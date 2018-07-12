import { setMoreBtnEvent } from '../common/common';

$(document).on('mobile:Main:load', () => {
  setMoreBtnEvent('.productMoreBtn', 'mobile');
});
