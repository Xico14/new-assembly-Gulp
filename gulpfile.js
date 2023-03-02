// плагины
const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const del = require('del')
// пути файлов src - откуда брать dest - куда положить для стилей и скриптов
const paths = {
    styles: {
        src: 'src/style/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}
// очистка итоговой дирректории
function clean() {
    return del(['dist'])
}
// компиляция файла less в сss c переименование и уменьшением
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCss())
        .pipe(rename({
            basename: 'main',
            suffix: 'min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

// отслеживает изменения
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}
// последовательность выполнения задач
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)
// вызов действия с плагинами 
exports.clean=clean
exports.styles=styles
exports.scripts=scripts
exports.watch=watch
exports.build = build
exports.default = build