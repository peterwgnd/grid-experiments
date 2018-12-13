var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	gulp.src('./scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('data', function() {
	gulp.src('./*.json')
		.pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['sass','html','data'], function() {

	browserSync.init({
		server: './dist/'
	});

	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./*.html',['html']).on('change', browserSync.reload);
	gulp.watch('./*.json',['data']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);