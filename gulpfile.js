// REQUIREMENTS ***************************************************************

var gulp = require('gulp');
var fs = require('fs');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');

var lts = require('typescript');
var ts = require('gulp-typescript');

var browserify = require('browserify');
var reactify = require('reactify');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var tsPath = 'src/**/*.{ts,tsx}';
var tsDefPath = 'typings/**/*.{ts,tsx}';
var bufferPath = 'buffer';
var distPath = 'dist';

// HELPERS ********************************************************************

var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

// TASKS **********************************************************************

gulp.task('typescript', function() {
  var tsResult = gulp.src([tsPath, tsDefPath])
    .pipe(ts({
      typescript: lts,
      target: 'ES5',
      declarationFiles: false,
      noExternalResolve: true,
      jsx: 'preserve'
    }));

  tsResult.dts.pipe(gulp.dest(bufferPath + '/tsdefinitions'));
  return tsResult.js.pipe(gulp.dest(bufferPath + '/js'));
});

// Compile jsx into Javascript.
gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add('buffer/js/index.jsx');
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch([tsPath], ['build']);
});

// Run a basic python server.
gulp.task('server', shell.task([
  "python -m SimpleHTTPServer 8000",
]));

gulp.task('build', function() {
  runSequence('typescript', 'browserify');
});

// Run the gulp tasks 
gulp.task('default', [

  'build', 

  'watch', 
  'server'

]);
