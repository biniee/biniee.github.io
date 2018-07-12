import express from 'express';
import fs from 'fs';
import path from 'path';
import Q from 'q';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import proxy from 'http-proxy-middleware';
import exphbs from 'express-handlebars';
import promisedHandlebars from 'promised-handlebars';
import MobileDetect from 'mobile-detect';
// import nunjucks from 'nunjucks';
// import favicon from 'serve-favicon';
// import logger from 'morgan';
import router from './router';
import handlebarCommonHelper from './webpack/common/handlebars/custom-helper';
import handlebarSystemHelper from './lib/handlebars/helper';

const config = JSON.parse(fs.readFileSync('./conf/config.json', 'utf8'));
const app = express();
const BROWSER_MOBILE_VIEW_MODE = 'BROWSER_MOBILE_VIEW_MODE';

/** view engine setting start **/
// // nunjucks
// const env = nunjucks.configure('views', {
//   autoescape: true,
//   express: app,
//   watch: true,
// });
// const defaultViewPath = {
//   index: './_system/nunjucks/views/index',
//   error: './_system/nunjucks/views/error',
// };
// app.set('view engine', 'html');
// app.locals.partialPath = path.join(__dirname, 'views/partials');

// handlebars
var Handlebars = promisedHandlebars(require('handlebars'), { Promise: Q.Promise })

const productJsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './models/product/main.json'), 'utf8'));
const bannerJsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './models/banner/main.json'), 'utf8'));
const categoryBannerJsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './models/banner/category.json'), 'utf8'));
const brandBannerJsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './models/banner/brand.json'), 'utf8'));
const defaultBannerJsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './models/banner/default.json'), 'utf8'));

const fetch_product = (device_type, catalog_type, parameters, pageSize, options) => {
  let viewData = {};
  switch (catalog_type) {
    case 'new':
      viewData = productJsonData.newArrivals;
      break;
    case 'best':
      viewData = productJsonData.brandBest;
      break;
    case 'page/main/sale':
      viewData = productJsonData.sale;
      break;
    default:
      viewData = productJsonData.sale;
      break;
    }

  return options.fn(viewData);
};

const fetch_special_product = (device_type, parameters, specialId, pageSize, options) => {
  const viewData = productJsonData.sale;
  return options.fn(viewData);
};

const render_product = (device_type, view_type, product, parameters) => {
  const viewPath = path.join(__dirname, `./views/${device_type}/components/product/${view_type}.hbs`);

  var deferred = Q.defer();
  expressHandlebars.render(viewPath, { product, parameters }).then(html => {
    deferred.resolve(html);
  });
  
  return deferred.promise;
};

const render_special_product = (device_type, view_type, product, parameters) => {
  const viewPath = path.join(__dirname, `./views/${device_type}/components/special/grid.hbs`);

  var deferred = Q.defer();
  expressHandlebars.render(viewPath, { product, parameters }).then(html => {
    deferred.resolve(html);
  });
  
  return deferred.promise;
};

const fetch_banner = (device_type, page_type, page_id, position_type, options) => {
  let viewData = {};
  if (page_id == 'main' && position_type == 'desktop-main') {
      viewData = { banners: defaultBannerJsonData.desktop_main };
  } else if (page_id == 'lnb' && position_type == 'footer') {
    viewData = { banners: defaultBannerJsonData.lnb_footer };
  } else if (page_id == 'main' && position_type == 'footer') {
    viewData = { banners: defaultBannerJsonData.line };
  } else if (page_id == 'main' && position_type == 'mobile-top-line') {
    viewData = { banners: defaultBannerJsonData.line_one };
  } else if (page_id == 'login' && position_type == 'side') {
    viewData = { banners: defaultBannerJsonData.login_side };
  } else if (page_id == 'mypage' && position_type == 'middle') {
    viewData = { banners: defaultBannerJsonData.line_one };
  } else if (page_type == 'brand' && position_type == 'main') {
    viewData = { banners: defaultBannerJsonData.brand_main };
  } else {
    viewData = { banners: defaultBannerJsonData.square };
  }
  return options.fn(viewData);
};

const render_banner = (device_type, sub_type, banners) => {
  const viewPath = path.join(__dirname, `./views/${device_type}/components/banner/${sub_type}.hbs`);

  var deferred = Q.defer();
  expressHandlebars.render(viewPath, banners).then(html => {
    deferred.resolve(html);
  });
  return deferred.promise;
};

const render_desktop_main_banner = (banners) => {
  if (banners.results == null || banners.results.length == 0) {
    return '';
  }
  
  let html = '';
  html += '<article class="visual-slide">';
  html += '  <div class="swiper-wrapper">';

  const maxSeq = banners.results[banners.results.length - 1].seq;
  
  for(let i = 0; i < parseInt(maxSeq/3, 10) + 1; i++) {
    const left = banners.results.filter(banner => banner.seq == i * 3);
    const center = banners.results.filter(banner => banner.seq == i * 3 + 1);
    const right = banners.results.filter(banner => banner.seq == i * 3 + 2);

    if (center.length) {
      html += '<div class="swiper-slide">';
    } else {
      html += '<div class="swiper-slide no-center-banner">';
    }

    if (left.length) {
      html += '  <div class="left-banner">';
      html += `    <a href="${left[0].link}">`;
      html += `      <img src="${left[0].content.bgImage}" alt="">`;
      html += '    </a>';
      html += '  </div>';
    }
            
    if (center.length) {
      html += `  <div class="center-banner"><a href="${center[0].link}"><img src="${center[0].content.bgImage}" alt=""></a></div>`;
    }

    if (right.length) {
      html += '  <div class="right-banner">';
      html += `    <a href="${right[0].link}">`;
      html += `      <img src="${right[0].content.bgImage}" alt="">`;
      html += '    </a>';
      html += '  </div>';
    }
    html += '</div>';
  }


  html += '  </div>';
  html += '  <div class="swiper-controls">';
  html += '    <button type="button" class="swiper-button-prev">prev</button>';
  html += '    <button type="button" class="swiper-button-next">next</button>';
  html += '  </div>';
  html += '</article>';

  return html;
};


Handlebars.registerHelper('fetch_banner', fetch_banner);
Handlebars.registerHelper('fetch_product', fetch_product);
Handlebars.registerHelper('fetch_special_product', fetch_special_product);
Handlebars.registerHelper('render_product', render_product);
Handlebars.registerHelper('render_special_product', render_special_product);
Handlebars.registerHelper('render_banner', render_banner);
Handlebars.registerHelper('render_desktop_main_banner', render_desktop_main_banner);
Handlebars.registerHelper('line_cnt', function(str, count, options) {
  if (str != null && str.length > 0) {
    const cnt = (str.match(/\n/g) || []).length;
    if (cnt == count - 1) {
      return options.fn(this);
    }
  }

  return options.inverse(this);
});
delete handlebarCommonHelper.line_cnt;

require('handlebars-helpers')({
  handlebars: Handlebars
});

const helpers = Object.assign({}, handlebarSystemHelper , handlebarCommonHelper);

const expressHandlebars = exphbs.create({
  handlebars: Handlebars,
  extname: 'hbs',
  layoutsDir: 'views/',
  partialsDir: 'views/',
  helpers: Object.assign({}, helpers),
});

app.engine('hbs', expressHandlebars.engine);
const defaultViewPath = {
  index: './_system/handlebars/views/index',
  error: './_system/handlebars/views/error',
};
app.set('view engine', 'hbs');
/** view engine setting end **/


function mobileDetect(req, res, next) {
  const md = new MobileDetect(req.headers['user-agent']);
  req.mobile = md.mobile();

  if (typeof req.cookies[BROWSER_MOBILE_VIEW_MODE] !== 'undefined') {
    req.mobileViewMode = parseInt(req.cookies[BROWSER_MOBILE_VIEW_MODE]);
  } else {
    req.mobileViewMode = req.mobile;
  }

  next();
}

function commonData(req, res, next) {
  const data = {};
  data.gnb = {
    categories: [
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4898",
        name: "전시1",
      },
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4827",
        name: "전시2",
      },
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4817",
        name: "전시3",
      },
      {
        "url": "/Category/4607",
        name: "SPORTS",
      },
      {
        "url": "/Category/4608",
        name: "MEN",
      },
      {
        "url": "/Category/4609",
        name: "WOMEN",
      },
      {
        "url": "/Category/4610",
        name: "FOOTWEAR",
      },
      {
        "url": "/Category/4611",
        name: "BAG&amp;ACC",
      }
    ],
    brandCategory: {
      subcategories: 
      [
        {
          "url": "/Brand/4894",
          "name": "KOLON SPORT"
        },
        {
          "url": "/Brand/6147",
          "name": "LUCKYCHOUETTE"
        },
        {
          "url": "/Brand/6633",
          "name": "SUECOMMABONNIE"
        },
        {
          "url": "/Brand/8043",
          "name": "SUPERCOMMA B"
        },
        {
          "url": "/Brand/4950",
          "name": "COURONNE"
        },
        {
          "url": "/Brand/4946",
          "name": "SERIES"
        },
        {
          "url": "/Brand/1330",
          "name": "EPIGRAM"
        },
        {
          "url": "/Brand/4942",
          "name": "CUSTOMELLOW"
        },
        {
          "url": "/Brand/4940",
          "name": "HEAD"
        },
        {
          "url": "/Brand/4938",
          "name": "JACK NICKLAUS"
        },
        {
          "url": "/Brand/4943",
          "name": "GGIO2"
        },
        {
          "url": "/Brand/4944",
          "name": "SPASSO"
        },
        {
          "url": "/Brand/4945",
          "name": "BRENTWOOD"
        },
        {
          "url": "/Brand/4947",
          "name": "HENRY COTTON'S"
        },
        {
          "url": "/Brand/4939",
          "name": "ELORD"
        },
        {
          "url": "/Brand/9038",
          "name": "WAAC"
        },
        {
          "url": "/Brand/5683",
          "name": "CLUB CAMBRIDGE"
        },
        {
          "url": "/Brand/5682",
          "name": "CAMBRIDGE MEMBERS"
        },
        {
          "url": "/Brand/9187",
          "name": "K+"
        },
        {
          "url": "/Brand/9022",
          "name": "STONEFEATHER"
        },
        {
          "url": "/Brand/7299",
          "name": "AMANDA GHOST"
        },
        {
          "url": "/Brand/5511",
          "name": "SPASSO"
        },
        {
          "url": "/Brand/4949",
          "name": "GEOX"
        },
        {
          "url": "/Brand/6442",
          "name": "RE;CODE"
        },
        {
          "url": "/Brand/7092",
          "name": "ELORD GOLF"
        }
      ]
    }
  };

  data.categoriesByCode = {
    categories: [
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4898",
        name: "전시1",
      },
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4827",
        name: "전시2",
      },
      {
        "url": "http://www.kolonmall.com/shop/category_list.html?ctgry_id=4817",
        name: "전시3",
      },
      {
        "url": "/Category/4607",
        name: "SPORTS",
      },
      {
        "url": "/Category/4608",
        name: "MEN",
      },
      {
        "url": "/Category/4609",
        name: "WOMEN",
      },
      {
        "url": "/Category/4610",
        name: "FOOTWEAR",
      },
      {
        "url": "/Category/4611",
        name: "BAG&amp;ACC",
      }
    ],
    brandCategory: {
      subcategories: 
      [
        {
          "url": "/Brand/4894",
          "name": "KOLON SPORT"
        },
        {
          "url": "/Brand/6147",
          "name": "LUCKYCHOUETTE"
        },
        {
          "url": "/Brand/6633",
          "name": "SUECOMMABONNIE"
        },
        {
          "url": "/Brand/8043",
          "name": "SUPERCOMMA B"
        },
        {
          "url": "/Brand/4950",
          "name": "COURONNE"
        },
        {
          "url": "/Brand/4946",
          "name": "SERIES"
        },
        {
          "url": "/Brand/1330",
          "name": "EPIGRAM"
        },
        {
          "url": "/Brand/4942",
          "name": "CUSTOMELLOW"
        },
        {
          "url": "/Brand/4940",
          "name": "HEAD"
        },
        {
          "url": "/Brand/4938",
          "name": "JACK NICKLAUS"
        },
        {
          "url": "/Brand/4943",
          "name": "GGIO2"
        },
        {
          "url": "/Brand/4944",
          "name": "SPASSO"
        },
        {
          "url": "/Brand/4945",
          "name": "BRENTWOOD"
        },
        {
          "url": "/Brand/4947",
          "name": "HENRY COTTON'S"
        },
        {
          "url": "/Brand/4939",
          "name": "ELORD"
        },
        {
          "url": "/Brand/9038",
          "name": "WAAC"
        },
        {
          "url": "/Brand/5683",
          "name": "CLUB CAMBRIDGE"
        },
        {
          "url": "/Brand/5682",
          "name": "CAMBRIDGE MEMBERS"
        },
        {
          "url": "/Brand/9187",
          "name": "K+"
        },
        {
          "url": "/Brand/9022",
          "name": "STONEFEATHER"
        },
        {
          "url": "/Brand/7299",
          "name": "AMANDA GHOST"
        },
        {
          "url": "/Brand/5511",
          "name": "SPASSO"
        },
        {
          "url": "/Brand/4949",
          "name": "GEOX"
        },
        {
          "url": "/Brand/6442",
          "name": "RE;CODE"
        },
        {
          "url": "/Brand/7092",
          "name": "ELORD GOLF"
        }
      ]
    }
  };

  req._common = data;
  next();
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'output')));
app.use(express.static(path.join(__dirname, '.tmp')));
config.staticPaths.forEach(function(p) {
  app.use(express.static(path.join(__dirname, p)));
});

if (process.env.ENV != 'production') {
  // live reload
  app.use(require('connect-livereload')());

  app.use(config.outputPath.javascripts, proxy({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));
}

app.use('/', mobileDetect);
app.use('/', commonData);
app.use('/', router(defaultViewPath));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render(defaultViewPath.error, {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render(defaultViewPath.error, {
    message: err.message,
    error: {},
  });
});

module.exports = app;
