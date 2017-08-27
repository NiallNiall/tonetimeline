"use strict";

var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    include = require("gulp-include");


// paths & files
var src = {
     html: [ 'src/**/*.html'],
     sass: 'src/sass/**/*.scss',
   vndrjs: 'src/vendor/**/*.js', 
       js: 'src/js/*.js',
      img: 'src/img/**/*'
};

var dist = {
  dist: 'dist/',
  html: 'dist/',
  css: 'dist/css/',
  js: 'dist/js/',
  img: 'dist/img'
}

var localPort = 4000,
       lrPort = 35729;

gulp.task('server', function(){
  var server = connect();

  server.use(connectLivereload({port: lrPort}));
  server.use(serveStatic(dist.dist));
  server.listen(localPort);

  console.log("\nlocal server running at http://localhost:" + localPort + "/\n");
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src(src.sass)
    .pipe(sass({
      outputStyle: [ 'expanded' ],
      sourceComments: 'normal'
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(dist.css))
    .pipe(gulpLivereload());
});


//This was a foreach kinda thing
// var folders = ['src/js/base.js', 'src/js/baseClass.js'];

// // Test!
// gulp.task('test', function(){

//     var tasks = folders.map(function(element){
//         return gulp.src(element)
//             // ... other steps ...
//             .pipe(gulp.dest(dist.img));
//     });

//     return merge(tasks);
// });

// gulp.task("scripts", function() {
//   console.log("-- gulp is running task 'scripts'");

//   gulp.src(src.js)
//     .pipe(include())
//       .on('error', console.log)
//     .pipe(gulp.dest(dist.js));
// });

// copy images
gulp.task( 'copyImg', function() {
  gulp.src( src.img )
    .pipe( gulp.dest( dist.img ) );
});

// Compile Javascript
// gulp.task('jshint', function(){
//   gulp.src(src.js)
//       .pipe(include())
//       .on('error', console.log)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(gulp.dest(dist.js))
//     .pipe(gulpLivereload());
// });

// Compile Javascript
gulp.task('jshint', function(){
  gulp.src(src.js)
      .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(dist.js))
    .pipe(gulpLivereload());
});

// copy javascript
gulp.task( 'copyJs', function() {
  gulp.src( src.vndrjs )
    .pipe( gulp.dest( dist.js + 'vendor/' ) );
});

// copy HTML
gulp.task('copyHtml', function(){
  gulp.src(src.html)
    .pipe( gulp.dest( dist.html ) )
    .pipe(gulpLivereload());
});

gulp.task('watch', function(){
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['jshint']);
  gulp.watch(src.html, ['copyHtml']);

  gulpLivereload.listen();
})

// build all assets
gulp.task( 'build', [ 'sass', 'copyHtml', 'jshint', 'copyJs', 'copyImg' ] );

gulp.task('default', ['build', 'server', 'watch']);