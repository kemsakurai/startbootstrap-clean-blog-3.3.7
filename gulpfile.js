var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/clean-blog.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/clean-blog.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/clean-blog.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))
    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})
// Run uncss
gulp.task('uncss-bootstrap', function () {
    var plugins = [
        uncss({
            html: ['index.html', 'about.html', 'contact.html','post.html','index2.html','post2.html','post3.html','post4.html'],
            ignore: ['.glyphicon',
                     '.glyphicon-user',
                     '.glyphicon-folder-close',
                     '.glyphicon-calendar',
                     '.glyphicon-comment',
                     '.icon-bar',
                     '.visible-lg',
                     '.navbar-collapse.in',
                     '.navbar-right',
                     '.btn-group-sm',
                     '.navbar-form',
                    ]
        }),
    ];
    return gulp.src('vendor/bootstrap/css/bootstrap.css')
        .pipe(postcss(plugins))
        .pipe(rename({
            extname: '.optimized.css'
          }))
        .pipe(gulp.dest('vendor/bootstrap/css'));
});

// Run uncss
gulp.task('add-swap-bootstrap', function () {
    return gulp.src('vendor/bootstrap/css/bootstrap.optimized.css')
        .pipe(postcss([ require('postcss-font-display')({ display: 'swap', replace: false }) ]))
        .pipe(rename('bootstrap.optimized.css'))
        .pipe(gulp.dest('vendor/bootstrap/css'));
});

// Run uncss
gulp.task('uncss-font-awesome', function () {
    var plugins = [
        uncss({ 
            html: ['index.html', 'about.html', 'contact.html','post.html','index2.html','post2.html','post3.html','post4.html'],
        }),
    ];
    return gulp.src('vendor/font-awesome/css/font-awesome.css')
        .pipe(postcss(plugins))
        .pipe(rename({
            extname: '.optimized.css'
          }))
        .pipe(gulp.dest('vendor/font-awesome/css'));
});

// Run uncss
gulp.task('add-swap-font-awesome', function () {
    return gulp.src('vendor/font-awesome/css/font-awesome.optimized.css')
        .pipe(postcss([ require('postcss-font-display')({ display: 'swap', replace: false }) ]))
        .pipe(rename('font-awesome.optimized.css'))
        .pipe(gulp.dest('vendor/font-awesome/css'));
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
