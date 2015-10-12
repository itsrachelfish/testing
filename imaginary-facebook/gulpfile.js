var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');

// Initialize watchify
var vendorBundler = watchify(browserify());
var jsBundler = watchify(browserify({debug: true, transform: 'reactify'}));

// Object to handle bundling / compilation tasks
var bundle =
{
    vendor: function()
    {
        vendorBundler.bundle()
        // Log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('vendor-bundle.js'))
        .pipe(gulp.dest('./static/js'));
    },
    
    main: function()
    {
        jsBundler.bundle()
        // Log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('main-bundle.js'))
        .pipe(gulp.dest('./static/js'));
    }
};

// Add vendor scripts to the bundle
vendorBundler.add('./static/js/vendor.js');
vendorBundler.on('update', bundle.vendor);
vendorBundler.on('log', gutil.log);

// Add main script file to the bundle
jsBundler.add('./static/js/main.js');
jsBundler.on('update', bundle.main);
jsBundler.on('log', gutil.log);

// Bundle scripts
gulp.task('default', ['vendor', 'main']);
gulp.task('vendor', bundle.vendor);
gulp.task('main', bundle.main);
