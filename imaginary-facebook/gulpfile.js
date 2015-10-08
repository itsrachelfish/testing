var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

// Initialize watchify
var bundler = watchify(browserify({debug: true}));

// Object to handle bundling / compilation tasks
var bundle =
{
    js: function()
    {
        bundler.bundle()
        // Log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./static/js'));
    }
};

// Add main script file to the bundle
bundler.add('./static/js/main.js');
bundler.on('update', bundle.js);
bundler.on('log', gutil.log);

// Bundle js
gulp.task('default', ['js']);
gulp.task('js', bundle.js);
