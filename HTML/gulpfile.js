const autoprefixer = require('gulp-autoprefixer')
var gulp = require('gulp');

gulp.task('prefixer', function () {
    console.log("fsdfs");
    return gulp.src('test.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});
