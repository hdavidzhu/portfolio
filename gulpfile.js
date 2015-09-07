// REQUIREMENTS ***************************************************************

var gulp = require('gulp');
var fs = require('fs');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var merge = require('merge2');

// var runSequence = require('run-sequence');
// var gCallback = require('gulp-callback');

var lts = require('typescript');
var ts = require('gulp-typescript');

var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var tsify = require('tsify');
var assign = require('lodash').assign;

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

// HELPERS ********************************************************************

// TASKS **********************************************************************

// Typescript to javascript.
var tsPath = 'src/**/*.{ts,tsx}';
var tsDefPath = 'typings/**/*.{ts,tsx}';
var bufferPath = 'buffer';
var distPath = 'dist';

var tsProject = ts.createProject({
  typescript: lts,
  target: 'ES5',
  declarationFiles: false,
  noExternalResolve: true,
  jsx: 'preserve'
});

gulp.task('typescript', function() {

  console.log("Running typscript.");

  var tsResult = gulp.src([tsPath, tsDefPath])
    .pipe(ts(tsProject));

  tsResult.dts.pipe(gulp.dest(bufferPath + '/tsdefinitions'));
  return tsResult.js.pipe(gulp.dest(bufferPath + '/js'));
});

gulp.task('watch', function() {
  gulp.watch([tsPath], ['typescript']);
});

// Custom browserify options.
var customOpts = {
  entries: ['./src/index.tsx'],
  debug: true
};

gulp.task('browserify', ['typescript'], function(callback){

  var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts));
  b.transform(reactify);

  // var b = browserify();
  // b.transform(reactify); // Use the reactify transform.
  // b.add('buffer/js/index.jsx');
  
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('dist'));
});

// gulp.task('build', function() {
//   runSequence('typescript', 'browserify');
// });

// Run a basic python server.
gulp.task('server', shell.task([
  "pkill python",
  "python -m SimpleHTTPServer 8000",
]));

// Run the gulp tasks 
gulp.task('default', [

  // 'build',
  'typescript',
  'browserify',

  'watch',
  'server'

]);
