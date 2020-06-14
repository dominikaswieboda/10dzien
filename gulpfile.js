var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');

var config = {
	dist: 'dist/',
	src: 'src/',
	cssin: 'src/css/**/*.css',
	jsin: 'src/js/**/*.js',
	imgin: 'src/images/**/*.{jpg,jpeg,png,gif,ico}',
	assetsin: 'src/assets/**/*.{jpg,jpeg,png,gif,pdf,ico}',
	htmlin: 'src/*.html',
	scssin: 'src/scss/**/*.scss',
	cssout: 'dist/css/',
	jsout: 'dist/js/',
	imgout: 'dist/images/',
	assetsout: 'dist/assets/',
	htmlout: 'dist/',
	scssout: 'src/css/',
	cssoutname: 'style.css',
	jsoutname: 'script.js',
	cssreplaceout: 'css/style.css',
	jsreplaceout: 'js/script.js'
};

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function () {
	browserSync({
		server: config.src
	});

	gulp.watch([config.htmlin, config.jsin], ['reload']);
	gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', function () {
	return gulp.src(config.scssin)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scssout))
		.pipe(browserSync.stream());
});

gulp.task('css', function () {
	return gulp.src(config.cssin)
		.pipe(concat(config.cssoutname))
		.pipe(gulp.dest(config.cssout));
});

gulp.task('js', function () {
	return gulp.src(config.jsin)
		.pipe(gulp.dest(config.jsout));
});

gulp.task('images', function () {
	return gulp.src(config.imgin)
		.pipe(changed(config.imgout))
		.pipe(imagemin())
		.pipe(gulp.dest(config.imgout));
});

gulp.task('assets', function () {
	return gulp.src(config.assetsin)
		.pipe(changed(config.assetsout))
		.pipe(gulp.dest(config.assetsout));
});

gulp.task('html', function () {
	return gulp.src(config.htmlin)
		.pipe(gulp.dest(config.dist))
});

gulp.task('clean', function () {
	return del([config.dist]);
});

gulp.task('build', function () {
	sequence('clean', ['html', 'js', 'css', 'images', 'assets']);
});

gulp.task('default', ['serve']);