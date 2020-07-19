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
    'src/js/lib.js',
    'src/js/vue.js'
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

function css (cb) {

  var files = ['src/css/style.css']
  gulp
    .src(files)
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('css'))
    cb();
}

function sass(cb){
    return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
    cb();
}

exports.default = function () {
    // vue();
    gulp.watch('./src/js/*.js',  scripts);
    gulp.watch('src/sass/*.scss', sass);
    // gulp.watch('src/css/*.css', css);
  
}

