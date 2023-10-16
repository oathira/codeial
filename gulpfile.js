// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');

// gulp.task('css', function() {
//     console.log('minifying css...');

//     return gulp.src('./assets/sass/**/*.scss')
//         .pipe(sass())
//         .pipe(cssnano())
//         .pipe(gulp.dest('./assets/css')) // Corrected path

//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets')) // Corrected path
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true
//         }))
//         .pipe(gulp.dest('./public/assets')); // Corrected path
// });
