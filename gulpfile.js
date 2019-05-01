const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

/*
EXAMPLE
gulp.task('name-task', function () {
    gulp.src('source-files')
        .pipe(gulpPlugin())
        .pipe(gulp.dest('destination-directory'))
});*/

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: "src"
      },
      notify: false
   });
});


gulp.task('sass',function () {
   gulp.src('src/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
          stream:true
       }))
});

gulp.task('scripts', function () {
   gulp.src('src/js/assets/*.js')
       .pipe(concat('main.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('src/js'))
       .pipe(browserSync.reload({
          stream:true
       }))
});

gulp.task('cleanCSS', function () {
    gulp.src('src/css/*.css')
        .pipe(concat("styles.css"))
        //добавити префікси
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //зжати файл
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream:true
        }))
});

gulp.task('imagemin', function(){
    gulp.src("src/img/*")
        .pipe(cache(imagemin([
            pngquant({quality: [0.3, 0.4], speed: 5})
        ])))
        .pipe(gulp.dest("dist/img"))
});

gulp.task('htmlmin', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
});

gulp.task('babel', function(){
    gulp.src('src/js/main.min.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', ['browserSync','sass', 'scripts', 'cleanCSS'], function () {
   gulp.watch('src/scss/**/*.scss', ['sass']);
   gulp.watch("src/*.html", browserSync.reload);
   gulp.watch('src/js/**/*.js', ['scripts']);
   gulp.watch('src/css/**/*.css', ['cleanCSS']);
});

gulp.task('build', ['htmlmin', 'babel', 'cleanCSS', 'imagemin']);
gulp.task('default', ['imagemin']);
