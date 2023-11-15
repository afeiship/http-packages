const gulp = require('gulp');
const { CleanRegistry, TsScripts } = require('@jswork/gulp-registry');

const task1 = new CleanRegistry();
const task2 = new TsScripts();

[task1, task2].forEach(gulp.registry);

gulp.task('cp:types', () => {
  return gulp.src('src/@types/*').pipe(gulp.dest('dist/@types'));
});

gulp.task('default', gulp.series(['clean', 'ts:scripts', 'cp:types']));
