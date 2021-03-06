const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-pxrem');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');





task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
        .pipe(rm())
})

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(`dist`))
        .pipe(reload({ stream: true }));
})

const styles = [
    'node_modules/normalize.css/normalize.css',

];


task('scss', () => {
    return src([...STYLE_LIBS, 'src/scss/main.scss'])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem())
        .pipe(gulpif(env === 'prod',
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/css`))
        .pipe(reload({ stream: true }));
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'src/js/*.js'
];


task('scripts', () => {
    return src([...JS_LIBS, "src/js/*.js"])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js', { newLine: ";" }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(`${DIST_PATH}/js`))
        .pipe(reload({ stream: true }));
});

task('icons', () => {
    return src('src/img/svg/*.svg')
        .pipe(svgo({
            plugins: [{
                removeAttrs: {
                    attrs: '(fill|stroke|style|width|height|data.*)'
                }
            }]
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

watch('./src/*.scss', series('scss'));
watch('./src/*.html', series('copy:html'));
watch('./src/js/*.js', series('scripts'));
watch('./src/img/icons/*.svg', series('icons'));

task('default',
    series('clean', parallel('copy:html', 'scss', 'scripts', 'icons'), 'server'));

task('build',
    series(
        'clean',
        parallel('copy:html', 'scss', 'scripts', 'icons'))
);