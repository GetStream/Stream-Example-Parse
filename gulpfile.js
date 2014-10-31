var gulp = require('gulp'),
  compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  handlebars = require('gulp-ember-handlebars'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  open = require('gulp-open'),
  plumber = require('gulp-plumber'),
  neuter = require('gulp-neuter'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),
  stripDebug = require('gulp-strip-debug'),
  concat = require('gulp-concat'),
  es6ModuleTranspiler = require("gulp-es6-module-transpiler");
  
/*
Usage:

Development:
gulp

Production
gulp build
*/

function plumberError(error) {
	gutil.log(gutil.colors.red(error.message));
	this.emit('end');
}


gulp.task('css', function() {
  gulp.src('styles/*.scss')
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb',
    sass: 'styles',
    css: 'public/dist/styles'
  }))
  .pipe(minifyCSS())
  .pipe(autoprefixer())
  .pipe(gulp.dest('public/dist/styles'));
});

gulp.task('templates', function() {
  gulp.src(['templates/**/*.hbs'])
  	.pipe(plumber())
    .pipe(handlebars({
      outputType: 'browser',
      namespace: 'Ember.TEMPLATES'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/dist/scripts'));
});

var scriptSrc = [
  	'js/*.js',
  	'js/components/*.js',
  	'js/controllers/*.js',
  	'js/routes/*.js',
];

gulp.task('scripts_dev', function() {
  return gulp.src(scriptSrc)
  	.pipe(plumber({'errorHandler': plumberError}))
    // .pipe(es6ModuleTranspiler({
        // type: "amd"
    // }))
    .pipe(neuter("app.js").on('error', gutil.log))
    .pipe(concat('main.js').on('error', gutil.log))
    .pipe(gulp.dest('public/dist/scripts').on('error', gutil.log));
});


var libsSrc = [
  	'js/libs/jquery-1.10.2.js',
  	'js/libs/handlebars-1.1.2.js',
  	'js/libs/ember-1.7.0.js',
  	'bower_components/ember-data/ember-data.js',
  	'js/libs/ember-parse-adapter.js',
  	'bower_components/getstream/dist/js/getstream.js',
  	//'js/libs/require.js',
  	'bower_components/ember-simple-auth/simple-auth.js',
];

gulp.task('libs_dev', function() {
  return gulp.src(libsSrc)
  	.pipe(plumber({'errorHandler': plumberError}))
    .pipe(concat('libs.js').on('error', gutil.log))
    .pipe(gulp.dest('public/dist/scripts').on('error', gutil.log));
});

gulp.task('scripts_prod', function() {
  return gulp.src(scriptSrc)
    .pipe(stripDebug())
    .pipe(neuter("app.js"))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/dist/scripts'));
});

gulp.task("url", function(){
  var options = {
    url: "https://getstream.parseapp.com",
    app: "google-chrome"
  };
  gulp.src("./app/index.html")
  .pipe(open("", options));
});

var signal = 'change';
function handler() {
	setTimeout(
	livereload.changed
	, 200);
}

gulp.task('watch', function() {
  // start the live reload
  livereload.listen();
  //watches SCSS files for changes
  gulp.watch('styles/**/*.*', ['css']).on(signal, handler);
  //watches handlebars files for changes
  gulp.watch('templates/**/*.hbs', ['templates']).on(signal, handler);
  //watches JavaScript files for changes
  gulp.watch('js/**/*.js', ['scripts_dev']).on(signal, handler);
  // open the url
  gulp.run("url");
});

gulp.task('default', ['css', 'templates', 'scripts_dev', 'libs_dev', 'watch']);

gulp.task('build', ['css', 'templates', 'scripts_prod']);

