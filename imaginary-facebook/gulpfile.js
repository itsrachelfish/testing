var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');


// Browserify options
var options =
{
//    debug: true,
    transform: 'reactify',
    noParse: ['react']
};

// Initialize watchify
var bundler = watchify(browserify(options));

// Object to handle bundling / compilation tasks
var bundle =
{
    main: function()
    {
        bundler.bundle()
        // Log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('main-bundle.js'))
        .pipe(gulp.dest('./static/js'));
    }
};

// Add script files to the bundle
bundler.add('./static/js/main.js');
bundler.on('update', bundle.main);
bundler.on('log', gutil.log);

// Bundle scripts
gulp.task('default', ['main']);
gulp.task('main', bundle.main);
