import onLoad from '../common/Login.action';

$(document).on('mobile:Login:load', onLoad);
$(document).on('mobile:Login:load', () => {
  // mobile only onLoad function
  $('#loginForm').submit(function () {
    if($("#checkPhone").hasClass("on")) {
      $("#type").val("02");
    } else {
      $("#type").val("01");
    }
  });
});
