// REQUIREMENTS ***************************************************************

var gulp = require('gulp');
var fs = require('fs');
var header = require('gulp-header');

var lts = require('typescript');
var ts = require('gulp-typescript');

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

gulp.task('addReference', function() {
  gulp.src(tsPath)
    .pipe(header('/// <reference path="../typings/react/react.d.ts" />'))
    .pipe(gulp.dest('buffer/withHeaders'));
});

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

gulp.task('browserify', function() {

});

gulp.task('watch', function() {
  gulp.watch([tsPath], ['typescript']);
  // gulp.watch([tsPath], ['addReference']);
});

// Run the gulp tasks 
gulp.task('default', ['typescript', 'watch']);
