var gulp = require('gulp');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
gulp.task('limpa', function () {
    return del('build');
});
gulp.task('copia', ['limpa'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('build'));
});
gulp.task('prefixa', ['copia'], function () {
    return gulp.src('build/css/*.css')
        .pipe(autoprefixer({ browsers: ['Chrome >= 42', 'Firefox >= 29', 'IE >= 10', 'last 2 versions'] }))
        .pipe(gulp.dest('build/css'));
});
gulp.task('minifica', ['prefixa'], function () {
    return gulp.src('build/*.html')
        .pipe(usemin({css: [minifyCss()], js: [uglify()]}))
        .pipe(gulp.dest('build'));
});
gulp.task('watch', function () {
    return gulp.watch('src/**/*', function () {
        return gulp.start('minifica');
    });
});
gulp.task('default', function () {
    return gulp.start('minifica');
});