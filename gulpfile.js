var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    package = require('./package.json');

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('sass', function () {
    return gulp.src('sass/sass.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version', 'ie 9'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('css/build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src(['js/polyfills/*.js', 'js/plugins/*.js', 'js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/build'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/build'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("*.html", ['bs-reload']);
});