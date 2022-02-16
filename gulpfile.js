'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const env = require('gulp-env');
const outDir = './build/*';

/**
 * Remove build directory.
 */
gulp.task('clean',function() {
  return gulp.src(outDir,{
    read: false
  })
    .pipe(rimraf());
});
/**
 * Move the package.json into build.
 */
gulp.task('move-package-json',(cb) => {
  return gulp.src("src/package.json")
    .pipe(gulp.dest('./build'));
});
/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint',() => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
});
/**
 * move config folder
 */
gulp.task('json-configs',(cb) => {
  return gulp.src("src/configs/*.json")
    .pipe(gulp.dest('./build/configs'));
});
/**
 * move sql folder
 */
gulp.task('sqls-files',(cb) => {
  return gulp.src("src/sqls/**/*.sql")
    .pipe(gulp.dest('./build/sqls'));
});

gulp.task('compile',shell.task([
  'npm run tsc',
]))

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch',shell.task([
  'npm run tsc-watch',
]))

/**
 * Build the project.
 */
gulp.task('build',['tslint','compile','json-configs','sqls-files'],() => {
  console.log('Building the project ...');
});


gulp.task('default',['build']);