import gulp from 'gulp'
import watch from 'gulp-watch'
import runSequence from 'run-sequence'
import mocha from 'gulp-spawn-mocha'
import eslint from'gulp-eslint'
import babel from 'gulp-babel'
import replace from 'gulp-replace'
import ignore from 'gulp-ignore'
import del from 'del'

const conf= {
  src: ['../src/**/*.js', '../src/**/*.jsx'],
  test: ['../src/**/*.spec.js', '../src/**/*.spec.jsx'],
  dest: '../lib',
  testRequire: ['./mocha.js'],
}

gulp.task('test', () => {
  runSequence('mocha')
})

gulp.task('test-watch', () => {
  runSequence('watch')
})

gulp.task('lint', () => {
  runSequence('eslint')
})

gulp.task('compile', () => {
  runSequence('clean', 'compilejs')
})

// tasks
gulp.task('watch', () => {
  watch(conf.src, () => {
    runSequence('mocha')
  })
})

gulp.task('eslint', () => {
  return gulp.src(conf.src)
  .pipe(eslint({
    configFile: './.eslintrc',
  }))
  .pipe(eslint.format())
})

gulp.task('mocha', () => {
  return gulp.src(conf.test, {
    read: false
  })
  .pipe(mocha({
    reporter: 'spec',
    require: conf.testRequire,
    env: {
      'NODE_ENV': 'test',
      'TEST': 'true',
      'NODE_PATH': '../src',
    }
  }))
})

gulp.task('compilejs', () => {
  process.env.NODE_ENV= 'production'
  return gulp.src(conf.src)
    .pipe(ignore.exclude('**/*.spec.*'))
    .pipe(babel({
      stage: 0,
    }))
    .pipe(replace(/\.jsx/g, '.js'))
    .pipe(gulp.dest(conf.dest));
})

gulp.task('clean', () => {
  return del([
    '../lib/**/*',
  ], {force: true})
})
