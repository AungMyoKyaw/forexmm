var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

gulp.task('transpile',function(){
	return gulp.src('src/**')
		.pipe(babel({
			presets:['env']
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('test',function(){
	return gulp.src('test/forexmm.test.js')
		.pipe(mocha())
		.once('error',function(){
			process.exit(1);
		})
		.once('end',function(){
			process.exit();
		});
})

gulp.task('default',['transpile','test']);
