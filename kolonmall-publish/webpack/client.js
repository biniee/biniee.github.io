// client(browser)에서 사용할 스크립트를 정의합니다.
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/no-webpack-loader-syntax: "off" */
require('expose-loader?$!expose-loader?jQuery!jquery');
require('jquery-validation');
require('expose-loader?Ladda!ladda');
require('expose-loader?plupload!plupload');
require('moment');
require('jquery-ui');

// default validation option
$.validator.setDefaults({
  onkeyup: false,
  onclick: false,
  onfocusout: false,
  showErrors: (errorMap, errorList) => {
    if (errorList.length < 1) {
      return;
    }
    alert(errorList[0].message);
  },
});

const getCartCount = () => {
  $.getJSON('/Cart/Count', (data) => {
    if (data && data.cartCount && data.cartCount > 0) {
      $('.top-navi .cart').html(`<i>${data.cartCount}</i>`);
    }
  });
};

const preloadImage = () => {
  const images = [
    '/_ui/img/m/icn/icn-check01.png',
    '/_ui/img/m/icn/icn-check02.png',
    '/_ui/img/m/icn/icn-check03-off.png',
    '/_ui/img/m/icn/icn-check03.png',
    '/_ui/img/m/icn/icn-check04-on.png',
    '/_ui/img/m/icn/icn-check04.png',
    '/_ui/img/m/icn/icn-check05.png',
    '/_ui/img/m/icn/icn-check06.png',
    '/_ui/img/m/icn/icn-check07-on.png',
    '/_ui/img/m/icn/icn-check07.png',
    '/_ui/img/m/icn/icn-check10-1.png',
    '/_ui/img/m/icn/icn-check10.png',
  ];
  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image;
  });
};

getCartCount();
preloadImage();

// require all sub directories
const requireAll = (r) => { r.keys().forEach(r); };
requireAll(require.context('./desktop/', true, /\.js$/));
requireAll(require.context('./mobile/', true, /\.js$/));
