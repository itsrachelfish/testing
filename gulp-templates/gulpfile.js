var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var fs = require('fs');

var templates =
{
    // Function for compiling src templates into dist files
    compile: function()
    {
        var pages = fs.readdirSync('./src/pages');
        pages.forEach(function(page)
        {
            var input =
            [
                './src/partials/head.html',
                './src/pages/' + page,
                './src/partials/foot.html'
            ];

            gulp.src(input)
            .pipe(concat(page))
            .pipe(gulp.dest('./dist'));

            console.log(page, "compiled");
        });
    },

    watch: function()
    {
        watch('src/**/*.html', function ()
        {
            templates.compile();
        });
    }
}

gulp.task('default', ['compile', 'watch']);
gulp.task('compile', templates.compile);
gulp.task('watch', templates.watch);
