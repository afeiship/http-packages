const gulp = require('gulp');
const { CleanRegistry, EsbScripts } = require('@jswork/gulp-registry');

const task1 = new CleanRegistry();
const task2 = new EsbScripts();

[task1, task2].forEach(gulp.registry);

gulp.task('default', gulp.series(['clean', 'esb:scripts']));
