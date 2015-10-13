var gulp = require('gulp');
var webpack = require('gulp-webpack');

// Object to handle bundling / compilation tasks
var bundle =
{
    scripts: function()
    {
        return gulp.src('./static/js/main.js')
          .pipe(webpack(require('./webpack-config')))
          .pipe(gulp.dest('./static/js/'));
    }
};

// Bundle scripts
gulp.task('default', ['scripts']);
gulp.task('scripts', bundle.scripts);
