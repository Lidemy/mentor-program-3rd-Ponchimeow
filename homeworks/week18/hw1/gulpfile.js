const gulp = require('gulp');
const sass = require('gulp-sass');

function css() {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
}

exports.css = css;
exports.default = gulp.parallel(css);
