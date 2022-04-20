'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cleanCSS = require('gulp-clean-css');

const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');

const srcPaths = {
    sass: ['./src/scss/**/*.scss'],
    scripts: ['./src/js/output.js']
};

gulp.task('sass', function() {
  return gulp.src('./src/scss/output.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('application.css.liquid'))
    .pipe(gulp.dest('./assets'));
});


gulp.task('scripts', function() {
    return browserify({entries: srcPaths.scripts, debug: true})
        .transform("babelify", { presets: ["@babel/preset-env"] })
        .bundle()
        .pipe(source('output.js'))
        .pipe(buffer())
        .pipe(uglify().on('error', function (e) {
            console.log(e);
            this.emit('end');
        }))
        .pipe(rename('application.js'))
        .pipe(gulp.dest('./assets'));
 });


gulp.task('watch', function(){
    gulp.watch(srcPaths.sass, gulp.series('sass')); 
    gulp.watch('./src/js/**/*.js', gulp.series('scripts')); 
});


gulp.task('default', gulp.series('sass', 'scripts'));