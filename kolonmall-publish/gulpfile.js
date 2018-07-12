'use strict';

var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var runSeq = require('run-sequence').use(gulp);
var path = require('path');

var urlrewrite = require('postcss-urlrewrite');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var spritesmith = require('gulp.spritesmith');

var config = require('./conf/config.json');

var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');

// variable
var outputPath = config.outputPath;
var webpackConfig = require('./webpack.config.js');
var devServerPort = 3001;
var devServerPath = outputPath.javascripts + '/build/';

// helper
var handleError = { errorHandler: notify.onError("Error: <%= error.message %>") };

// webpack
function webpackCallback(taskName, callback) {
  return function(err, stats) {
    if (err) throw new gutil.PluginError(taskName, err);
    if (stats) {
      gutil.log(taskName, stats.toString({
        colors: true,
        chunkModules: false
      }));
    }
    if (callback) {
      callback();
    }
  }
}

// stylesheet
var postcssPlugins = [
  autoprefixer({ browsers: ['last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 8', 'android 4'] }),
  urlrewrite({
    imports: true,
    properties: [ 'background', 'src' ],
    rules: [
      { from: /^images/, to: outputPath.images },
      { from: /^fonts/, to: outputPath.fonts },
      { from: /^\.\.\/fonts/, to: outputPath.fonts }
    ]
  })
];

function compileSass(path, target, options) {
  if (typeof target === 'undefined') {
    target = '.tmp' + outputPath.stylesheets + '/';
  }

  var defaultOpts = {
    'useSourceMap': true
  };

  var opts = Object.assign({}, defaultOpts, options);
  var plugins = postcssPlugins.slice(0);
  if (opts.useNano) {
    plugins.push(cssnano({
      preset: 'default',
    }));
  }

  return gulp.src(path, { base: 'public' + outputPath.stylesheets })
    .pipe(plumber(handleError))
    .pipe(gulpif(opts.useSourceMap, sourcemaps.init()))
    .pipe(sass.sync({
      includePaths: config.sassIncludePaths || []
    }))
    .pipe(postcss(plugins))
    .pipe(gulpif(opts.useSourceMap, sourcemaps.write('.')))
    .pipe(gulp.dest(target));
}

// production build
gulp.task('webpack:build', function(callback) {
  var prodConfig = Object.assign(webpackConfig);
  prodConfig.plugins = prodConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );

  // run
  webpack(prodConfig, webpackCallback('webpack:build', callback));
});

// development build dev server
gulp.task('webpack:build-dev-server', function(callback) {
  var devServerConfig = Object.assign({}, webpackConfig);
  devServerConfig.cache = true;
  devServerConfig.devtool = 'cheap-module-eval-source-map';
  //myConfig.debug = true;
  devServerConfig.entry['client'].unshift(
    'webpack-dev-server/client?http://0.0.0.0:' + devServerPort + '/'
  );
  devServerConfig.output.publicPath = 'http://0.0.0.0:' + devServerPort + devServerPath;

  // run
  var compiler = webpack(devServerConfig);

  new WebpackDevServer(compiler, {
    publicPath: devServerPath,
    stats: {
      colors: true,
      chunkModules: false
    }
  }).listen(devServerPort, "0.0.0.0", webpackCallback('webpack:build-dev-server', callback));
});

// create sprite
gulp.task('sprite', function() {
  // Generate our spritesheet
  var spriteData = gulp.src('public' + outputPath.images + '/icons/*.png')
    .pipe(plumber(handleError))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      retinaSrcFilter: ['public' + outputPath.images + '/icons/*@2x.png'],
      retinaImgName: 'sprite@2x.png',
      cssName: '_sprite.css',
      imgPath: outputPath.images + '/sprite.png',
      retinaImgPath: outputPath.images + '/sprite@2x.png',
    }));

  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('.tmp' + outputPath.images + '/'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('public' + outputPath.stylesheets + '/includes'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

// Scss lint
gulp.task('scss-lint', function() {
  return gulp.src(['public' + outputPath.stylesheets + '/**/*.scss', '!public' + outputPath.stylesheets + '/sprite.scss'])
    .pipe(plumber(handleError))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Scss compile
gulp.task('styles', function() {
  return compileSass(['public' + outputPath.stylesheets + '/**/*.scss']);
});

gulp.task('styles:dist', function() {
  return compileSass(['public' + outputPath.stylesheets + '/**/*.scss'], '.tmp' + outputPath.stylesheets, { useSourceMap: false, useNano: true });
});

// Run express server
gulp.task('express-server', () => {
  let started = false;

	return nodemon({
    script: 'bin/www',
    exec: 'babel-node',
    presets: 'es2015',
	}).on('start', () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

// build
gulp.task('clean:dist', function() {

});

gulp.task('copy:dist', function() {
  return gulp.src(['public' + outputPath.images + '/**/*', 'public' + outputPath.fonts + '/**/*'],{
    "base" : "public"
  })
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['webpack:build']);

// dist
gulp.task('dist', function() {
  runSeq('clean:dist', ['build', 'styles:dist', 'copy:dist']);
});

// 웹서버 배포
gulp.task('serve', function() {
  runSeq('sprite', ['styles:dist', 'webpack:build', 'express-server']);
});

// Default development task
gulp.task('default', function() {
  runSeq('sprite', ['styles', 'scss-lint', 'webpack:build-dev-server', 'express-server']);

  // 의존성 없는 파일
  gulp
    .watch([
      'public' + outputPath.stylesheets + '/*.scss',
      'public' + outputPath.stylesheets + '/**/*.scss',
      '!public' + outputPath.stylesheets + '/plugin.scss',
      '!public' + outputPath.stylesheets + '/**/includes/*.scss',
      '!public' + outputPath.stylesheets + '/**/partials/*.scss'
    ])
    .on("change", function(file) {
      compileSass(file.path);
    });

  // plugin 관련 파일
  gulp
    .watch([
      'public' + outputPath.stylesheets + '/plugin.scss',
    ])
    .on("change", function(file) {
      compileSass(path.join(__dirname, 'public' + outputPath.stylesheets + '/plugin.scss'));
    });

  gulp
    .watch([
      '!public' + outputPath.stylesheets + '/plugin.scss',
      'public' + outputPath.stylesheets + '/**/includes/*.scss',
      'public' + outputPath.stylesheets + '/**/includes/*.css',
      'public' + outputPath.stylesheets + '/**/partials/*.scss'
    ])
    .on("change", function(file) {
      compileSass([
        'public' + outputPath.stylesheets + '/**/*.scss',
        '!public' + outputPath.stylesheets + '/plugin.scss'
      ]);
    });

  gulp
    .watch('public' + outputPath.stylesheets + '/**/*.scss', ['scss-lint'])
    .on("change", function(file) {
      gulp.src(file.path)
        .pipe(plumber(handleError))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
    });
  gulp.watch('public' + outputPath.images + '/icons/*.png', ['sprite']);
});
