var gulp = require('gulp');
var babel = require('gulp-babel')

gulp.task('transpile',function(){
	return gulp.src('src/**')
		.pipe(babel({
			presets:['env']
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('default',['transpile']);
