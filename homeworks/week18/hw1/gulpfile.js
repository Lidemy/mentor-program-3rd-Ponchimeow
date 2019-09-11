const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');

gulp.task('m-css', () => gulp.src('./*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('./dist')));

gulp.task('m-js', () => gulp.src('./*.js')
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(uglify())
  .pipe(gulp.dest('./dist')));

gulp.task('clean', () => gulp.src('dist', { allowEmpty: true }).pipe(clean()));

gulp.task('default', gulp.series('clean', 'm-js', 'm-css'));
