var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');

var sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');
var argv = require('yargs').argv;
var fileinclude = require('gulp-file-include');


gulp.task('html', function() {
  return gulp.src(['list.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('W:\\'));
});
gulp.task('js',function(){
  return gulp.src('js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('W:\\'));
});

gulp.task('css', function(){
	return gulp.src(['scss/main.scss'])
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(gulp.dest('W:\\'));

});


gulp.task('watch', function() {
  gulp.watch(['js/**/*.js'], gulp.series('js'));
  gulp.watch(['*.html'], gulp.series('html'));
	gulp.watch(['scss/**/*.scss'], gulp.series('css'));
});
