/*!
 * gulp
 * npm install gulp-sass --save-dev
 * npm install gulp-autoprefixer --save-dev
 * npm install gulp-cssnano --save-dev
 * npm install gulp-jshint --save-dev
 * npm install gulp-concat --save-dev
 * npm install gulp-uglify --save-dev
 * npm install gulp-imagemin --save-dev
 * npm install gulp-notify --save-dev
 * npm install gulp-rename --save-dev
 * npm install gulp-cache --save-dev
 * npm install del --save-dev
 * npm install gulp-plumber --save-dev 
 * npm install gulp-sourcemaps --save-dev 
 * npm install gulp-zip --save-dev 
 * npm install browser-sync --save-dev
 * npm install vinyl-ftp --save-dev
 * npm install gulp-sftp --save-dev
 * npm install gulp-util --save-dev
 */
// Load plugins
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    zip = require('gulp-zip'),
    ftp = require('vinyl-ftp'),
    sftp = require('gulp-sftp'),
    browserSync = require('browser-sync').create();
//Project Config
const CONFIG = {
    name: 'PROJECTNAME', //Project Name
    sftp: false, // If the deployment is on a sftp server
    ftp: false, // If the deployment is on a ftp server
    wp: false, // If the project is a wordpress theme
    uploadOnSave: false, //WARNING: THIS UPLOADS THE WHOLE PROJECT ON SAVE
    url: 'PROJECTURL', //If is Wordpress Site url eg: localhost/2016/project
    vendor: [ // Vendor plugins for js concatination (it will compile in this order)
        'src/js/modernizr.js',
        'src/js/cssbrowserselector.js',
        'src/js/jquery-1.12.4.js',
        'src/js/main.js'
    ],
    buildSrc: [ // Build source files for generating a build zip file
        'dist/js',
        'dist/css',
        'dist/images',
        './icons/**',
        './icon/**',
        './favicon/**',
        './favicons/**',
        './*.html'
    ],
    buildSrcWP: [ // Build source for generating a zip file WORDPRESS ONLY
        '**/*',
        '*',
        '!node_modules/**',
        '!./src',
        '!src',
        '!./node_modules'
    ],
    browserSyncFiles: [ // If this is a wordpres theme we need a proxy server to inject files
        '**/*.php',
        '**/*.{png,jpg,gif}'
    ],
    ftpDetails: { // If FTP or SFTP is used this is the server configuration
        host: 'SERVER IP OR DOMAIN',
        port: '22',
        user: 'SERVER USER',
        password: 'SERVER PASSWORD',
        parallel: '5',
        remoteFolder: 'REMOTE FOLDER'
    },
    ftpFiles: [ // When gulp deploy task is called this filters what should be uploaded
        '**/*',
        '*',
        '!node_modules/**',
        '!./node_modules' // if you wish to exclude directories, start the item with an !
    ]
};
//Main Browsersync task
gulp.task('browser-sync', function() {
    if (CONFIG.wp == true) {
        browserSync.init(CONFIG.browserSyncFiles, {
            proxy: CONFIG.url,
            injectChanges: true
        });
    } else {
        //Browser sync
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    }
});
//Ftp Deploy task
gulp.task('deploy', function() {
    if (CONFIG.ftp == true) {
        //Create connection
        const conn = ftp.create({
            host: CONFIG.ftpDetails.host,
            port: CONFIG.ftpDetails.port,
            user: CONFIG.ftpDetails.user,
            password: CONFIG.ftpDetails.password,
            parallel: CONFIG.ftpDetails.parallel,
            log: gutil.log
        });
        //Upload
        return gulp.src(CONFIG.ftpFiles, { base: '.', buffer: false })
            .pipe(conn.newer(CONFIG.ftpDetails.remoteFolder)) // only upload newer files 
            .pipe(conn.dest(CONFIG.ftpDetails.remoteFolder))

        //Else sftp       
    } else if (CONFIG.sftp == true) {
        // SFTP version
        //Create Conn
        const sftpconn = sftp({
            host: CONFIG.ftpDetails.host,
            user: CONFIG.ftpDetails.user,
            pass: CONFIG.ftpDetails.password,
            port: CONFIG.ftpDetails.port,
            remotePath: CONFIG.ftpDetails.remoteFolder,
        });
        //Upload
        return gulp.src(CONFIG.ftpFiles, { base: '.', buffer: false })
            .pipe(sftpconn);
    }
});
// Styles
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(autoprefixer('last 12 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
    return gulp.src(CONFIG.vendor)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(plumber())
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }));
});
// Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/images']);
});
//Zip
gulp.task('zip', function() {
    if (CONFIG.wp == true) {
        return gulp.src(CONFIG.buildSrcWP, { base: "." })
            .pipe(zip(CONFIG.name + "_wp" + ".zip"))
            .pipe(gulp.dest("build/"))
            .pipe(notify({ message: 'Wordpress ZIP Generated' }));
    } else {
        var date = new Date().toISOString().replace(/[^0-9]/g, '');
        return gulp.src(CONFIG.buildSrc, { base: "." })
            .pipe(zip("deploy-" + CONFIG.name + "-" + date + ".zip"))
            .pipe(gulp.dest("build/"))
            .pipe(notify({ message: 'ZIP Generated' }));
    }
});
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
// Watch
gulp.task('watch', ['browser-sync'], function() {
    if ((CONFIG.sftp == true || CONFIG.ftp == true) && CONFIG.uploadOnSave == true) {
        // Watch .scss files
        gulp.watch('src/sass/**/*.scss', ['styles', 'deploy']);
        // Watch .js files
        gulp.watch('src/js/**/*.js', ['scripts', 'deploy']);
        // Watch image files
        gulp.watch('src/images/**/*', ['images', 'deploy']);
        // Browsersync for html 
    } else {
        // Watch .scss files
        gulp.watch('src/sass/**/*.scss', ['styles']);
        // Watch .js files
        gulp.watch('src/js/**/*.js', ['scripts']);
        // Watch image files
        gulp.watch('src/images/**/*', ['images']);
        // Browsersync for html 
        gulp.watch("*.html").on('change', browserSync.reload);
    }
    //Ftp
    //gulp.watch(['*.html', './', '**/*'], ['ftp-deploy']);
});
