import gulp from 'gulp';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import leec from 'gulp-line-ending-corrector';

import sass from 'sass';
import gulpSass from 'gulp-sass';
const sassCompiler = gulpSass(sass);

(function () {

    return gulp.src('./resources/sass/app.scss')
    .pipe(sassCompiler())
    .pipe(concat('app.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(sourcemaps.init({
        loadMaps: true,
        largeFile: true
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(leec())
    .pipe(gulp.dest('./public/css'))
}());