// General.
var gulp = require('gulp');
var shell = require('gulp-shell');
var source = require("vinyl-source-stream");
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

// Javascript.
var browserify = require('browserify');
var reactify = require('reactify');

// CSS.
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

// TASKS **********************************************************************

// Start server.
gulp.task('server', shell.task([
  'pkill python',
  'python -m SimpleHTTPServer 8000',
], {
  ignoreErrors: true
}));

// Compile jsx into Javascript.
gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add('src/App.jsx');
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js*', ['browserify']);

  // TODO: Not sure why this is necessary.
  gulp.watch('scss/**/*.scss', ['scss:process']);
});

// Compile Sass into css.
gulp.task('scss:copy', function() {
  gulp.src('src/**/*.scss', {base: 'src'})
    .pipe(watch('src/**/*.scss', {base: 'src'}))
    .pipe(flatten())
    .pipe(gulp.dest('scss/_components'));
});

gulp.task('scss:process', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];

  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', [
  
  'scss:copy',
  'scss:process',

  'browserify',
  'watch',
  'server',

]);
