// REQUIREMENTS ***************************************************************

var gulp = require('gulp');
var lts = require('typescript');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var fs = require('fs');

var tsPath = 'src/app/**/*.{ts,tsx}';
var compilePath = 'dist';
var dist = 'src/js/dist';

// HELPERS ********************************************************************
var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

// TASKS **********************************************************************

// Bump versions on package/bower/manifest.
gulp.task('bump', function() {

  var pkg = getPackageJson(); // Re-get package.
  var newVer = semver.inc(pkg.version, 'patch'); // Increment version.
 
  // Uses gulp-filter.
  var manifestFilter = tasks.filter(['manifest.json']);
  var regularJsons = tasks.filter(['!manifest.json']);
 
  return gulp.src([
      './bower.json', 
      './package.json'
    ])
    .pipe(tasks.bump({
      version: newVer
    }))
    .pipe(manifestFilter)
    .pipe(gulp.dest('./src'))
    .pipe(manifestFilter.restore())
    .pipe(regularJsons)
    .pipe(gulp.dest('./'));
});

gulp.task('typescript', function() {
  var tsResult = gulp.src(tsPath)
    .pipe(ts({
      typescript: lts,
      target: 'ES5',
      declarationFiles: false,
      noExternalResolve: false,
      jsx: 'preserve'
    }));

  tsResult.dts.pipe(gulp.dest(compilePath + '/tsdefinitions'));
  return tsResult.js.pipe(gulp.dest(compilePath + '/app'));
});

gulp.task('watch', function() {
  gulp.watch([tsPath], ['typescript']);
});

// Run the gulp tasks 
gulp.task('default', ['typescript', 'watch']);
