var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var mergeJson = require('gulp-merge-json');
var cleanDest = require('gulp-clean-dest');


var paths = {
  bowerDir: './bower_components',
  npmDir: './node_modules',
  scriptDest: './web/js/',
  cssDest: './web/css/',
  fontDest: './web/fonts/',
  resourcesDir: './app/Resources/',
  localeDest: 'web/locales/'
};


// javascript files
gulp.task('scriptsGeneral', function() {
  return gulp.src([
      paths.npmDir + '/jquery/dist/jquery.js',
      paths.npmDir + '/bootstrap/dist/js/bootstrap.js',
      paths.npmDir + '/core-js/client/shim.min.js',
      paths.npmDir + '/zone.js/dist/zone.js'
    ])
    .pipe(concat('static.js'))
		//.pipe(uglify())
    .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('scriptsJustInTime', function() {
  return gulp.src([
      //paths.npmDir + '/reflect-metadata/Reflect.js',
      paths.npmDir + '/systemjs/dist/system.src.js'
    ])
    .pipe(concat('static-jit.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

// general stylesheet files
gulp.task('cssGeneral', function() {
  return gulp.src([
      paths.npmDir + '/bootstrap/dist/css/bootstrap.css',
      paths.npmDir + '/font-awesome/css/font-awesome.css',
      paths.npmDir + '/leaflet/dist/leaflet.css',
      paths.npmDir + '/ng2-toasty/style-bootstrap.css',
      'forms.css',
      'style.css'
    ])
    .pipe(concat('static.css'))
    .pipe(gulp.dest(paths.cssDest));
});

// fonts
gulp.task('fonts', function() {
  return gulp.src([
      paths.npmDir + '/bootstrap/dist/fonts/*.*',
      paths.npmDir + '/font-awesome/fonts/*.*',
    ])
    .pipe(gulp.dest(paths.fontDest));
});

// put together locale strings
gulp.task('localesDe', function() {
  return gulp.src('locales/**/de.json')
    .pipe(mergeJson('de.json'))
    .pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesEn', function() {
  return gulp.src('locales/**/en.json')
    .pipe(mergeJson('en.json'))
    .pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesRu', function() {
  return gulp.src('locales/**/ru.json')
    .pipe(mergeJson('ru.json'))
    .pipe(gulp.dest(paths.localeDest));
});

// copy web-assets for ahead of time compilation
gulp.task('copy', [], function() {
  return gulp.src(['web/**/*', 'web/**/*'], {})
    .pipe(cleanDest('dist/web'))
    .pipe(gulp.dest('dist/web'));
});

// the default task (called when you run `gulp` from cli)
gulp.task('default', ['scriptsGeneral', 'scriptsJustInTime' /*, 'scriptsAdditional'*/ , 'cssGeneral', 'fonts', 'localesDe', 'localesEn', 'localesRu', 'copy']);
