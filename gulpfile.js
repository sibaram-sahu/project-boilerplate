'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp           = require('gulp');
var autoprefixer   = require('gulp-autoprefixer');
var browserSync    = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var copy           = require('gulp-copy');
var concat 				 = require('gulp-concat');
var clean 				 = require('gulp-clean');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var inputTemplates = './app/*.html';
var siteOutput = './dist';

// -----------------------------------------------------------------------------
// Clean the dist folder
// -----------------------------------------------------------------------------

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// -----------------------------------------------------------------------------
// Css
// -----------------------------------------------------------------------------

gulp.task('css', function () {
	return gulp.src([
		'app/styles/*.css'
	])
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest(siteOutput + '/styles'));
});

// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function () {
	return gulp.src([
		'app/scripts/*.js'
	])
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest(siteOutput + '/scripts'));
});

// -----------------------------------------------------------------------------
// fonts
// -----------------------------------------------------------------------------

gulp.task('fonts', function () {
	return gulp.src(['app/fonts/*'])
		// .pipe(copy('./dist/fonts'))
		.pipe(gulp.dest(siteOutput+ '/fonts/'));
});

// -----------------------------------------------------------------------------
// images
// -----------------------------------------------------------------------------

gulp.task('images', function () {
	return gulp.src(['app/images/*'])
		// .pipe(copy('./dist/images'))
		.pipe(gulp.dest(siteOutput+ '/images/'));
});

// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function () {
	// Gets .html and .nunjucks files in pages
	return gulp.src(inputTemplates)
		// Renders template with nunjucks
		.pipe(nunjucksRender({
			path: ['app/templates/'],
			watch: false
		}))
		// output files in dist folder
		.pipe(gulp.dest(siteOutput))
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function () {

	gulp.watch('./app/styles/*.css', ['css']).on('change', browserSync.reload);

	gulp.watch('./app/scripts/*.js', ['scripts']).on('change', browserSync.reload);

	// Watch nunjuck templates and reload browser if change
	gulp.watch(inputTemplates, ['nunjucks']).on('change', browserSync.reload);

});



// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: siteOutput
		}
	});
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', [/*'clean',*/'nunjucks', 'css', 'scripts', 'fonts', 'images','watch', 'browser-sync']);
