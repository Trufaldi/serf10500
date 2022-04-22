const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
browserSync = require('browser-sync').create();




task('clean', () => {
    return src('dist/**/*', { read: false })
        .pipe(rm())
})

task('copy:html', () => {
    return src('src/*.html').pipe(dest('dist'));
})

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/scss/main.scss'
];


task('scss', () => {
    return src(styles)
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
});
task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


watch('./src/scss/**/*.scss', series('scss'));
task('default', series('clean', 'copy:html', 'scss', 'server'));