import gulp from 'gulp';
import minify from 'gulp-minify';

export function buildJS(src, dest, extension) {
    return gulp.src(src)
    .pipe(minify({
        noSource: true,
        ext: {
            min: extension
        },
    }))
    .pipe(gulp.dest(dest))
}