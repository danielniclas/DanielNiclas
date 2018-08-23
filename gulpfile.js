var gulp = require('gulp');
var sass = require('gulp-sass');
// var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var streamqueue  = require('streamqueue');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
      './node_modules/magnific-popup/dist/*'
    ])
    .pipe(gulp.dest('./vendor/magnific-popup'))

  // Scrollreveal
  gulp.src([
      './node_modules/scrollreveal/dist/*.js'
    ])
    .pipe(gulp.dest('./vendor/scrollreveal'))

});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./assets/css/presonal.css')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', function() {

  console.log('In CSS Minify');
  return gulp.src([
      './assets/css/personal.css',
      '!./assets/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:minify']);

// Concat + Minify JavaScript

gulp.task('js:concat', function() {

  console.log('In js:concat');
  return streamqueue({ objectMode: true },
    gulp.src('./assets/js/theme.js'),
    gulp.src('./assets/js/contact.js'),
    gulp.src('./assets/js/form.js'),
    gulp.src('./assets/js/timer.js'),
    gulp.src('./assets/js/graphic.js')

  )
    .pipe(concat('personal.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/js/mini'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:concat']);

// Default task
gulp.task('default', ['css', 'js:concat']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task   > gulp dev
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./assets/css/personal.css', ['css']);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});



gulp.task('test', function(){
  console.log('In TeST!');
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// // BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }
//
// // Clean assets
// function clean() {
//   console.log('CLEAN')
// }
//
// // CSS task
// function css() {
//   console.log('IN CSS')
// }
//
// // Watch files
// function watchFiles() {
//   gulp.watch('./assets/css/personal.css', gulp.series(css, browserSyncReload));
//   gulp.watch('./assets/js/*.js', gulp.series(js, browserSyncReload));
//   gulp.watch('./*.html', browserSyncReload);
//
// }
//
//
// // build
// gulp.task(
//   "mook",
//   gulp.series(clean, gulp.parallel(css, clean))
// );
//
//
//
// // watch
// gulp.task("watch", gulp.parallel(watchFiles, browserSync));