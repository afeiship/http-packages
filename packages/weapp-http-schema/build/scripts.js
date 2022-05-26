(function() {
  'use strict';

  const gulp = require('gulp');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });
  const tsconfig = require('../tsconfig.json');

  gulp.task('scripts', function() {
    return gulp
      .src('src/index.ts')
      .pipe($.jswork.pkgHeader())
      .pipe($.typescript(tsconfig.compilerOptions))
      .pipe(gulp.dest('dist'))
      .pipe($.size({ title: '[ minimize size ]:' }));
  });
})();
