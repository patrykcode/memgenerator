const gulp = require('gulp')
const minify = require('gulp-minify')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

function scripts (cb) {
  var files = [
    'src/js/lib.js'
  ]
  gulp
    .src(files)
    .pipe(minify({ noSource: true }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('js'))
    cb();
}
function vue () {
  var files = [
    'src/js/vue.js'
  ]
  gulp
    .src(files)
    .pipe(minify({ noSource: true }))
    .pipe(concat('vue.js'))
    .pipe(gulp.dest('js'))
}
function css () {


  var files = ['src/css/style.css']
  gulp
    .src(files)
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('css'))
}

exports.default = function () {
    // vue();
    gulp.watch('src/js/*.js', {cwd: 'js'}, scripts);
    gulp.watch('src/css/*.css', {cwd: 'css'}, css);
  
}

