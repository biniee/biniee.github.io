import customHelpers from 'common/handlebars/custom-helper';

/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/no-webpack-loader-syntax: "off" */
require('expose-loader?Handlebars!handlebars');

require('handlebars-helpers')({
  handlebars: window.Handlebars,
});

Object.keys(customHelpers).forEach((key) => {
  Handlebars.registerHelper(key, customHelpers[key]);
});

/*
  array: require('./array'),
  code: require('./code'),
  collection: require('./collection'),
  comparison: require('./comparison'),
  date: require('./date'),
  fs: require('./fs'),
  html: require('./html'),
  i18n: require('./i18n'),
  inflection: require('./inflection'),
  logging: require('./logging'),
  markdown: require('./markdown'),
  match: require('./match'),
  math: require('./math'),
  misc: require('./misc'),
  number: require('./number'),
  object: require('./object'),
  path: require('./path'),
  string: require('./string'),
  url: require('./url')
*/
