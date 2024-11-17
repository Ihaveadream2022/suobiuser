const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const ts = require("gulp-typescript");
const htmlmin = require('gulp-htmlmin');
const tsProject = ts.createProject("tsconfig.json");
const isProduction = process.env.NODE_ENV === "production";

function clean_out() {
    if (isProduction) {
        return gulp.src(["dist"], { allowEmpty: true }).pipe(clean());
    } else {
        return gulp.src(["public"], { allowEmpty: true }).pipe(clean());
    }
}
function compile_scss() {
    if (isProduction) {
        return gulp
            .src("./src/css/**/*.scss")
            .pipe(postcss([autoprefixer()]))
            .pipe(sass().on("error", sass.logError)) // compile
            .pipe(cleanCSS({ level: 2 })) // compress
            .pipe(gulp.dest("./dist/css"));
    } else {
        return gulp.src("./src/css/**/*.scss").pipe(sass().on("error", sass.logError)).pipe(gulp.dest("./public/css"));
    }
}
function compile_ts() {
    if (isProduction) {
        return tsProject.src().pipe(tsProject()).pipe(uglify()).pipe(gulp.dest("./dist/js"));
    } else {
        return tsProject.src().pipe(tsProject()).pipe(gulp.dest("./public/js"));
    }
}
function copy_lib_js() {
    const target = isProduction ? "dist/js/lib" : "public/js/lib";
    return gulp.src("./src/js/lib/*.js", { allowEmpty: true, encoding: false  }).pipe(gulp.dest(target));
}
function copy_image() {
    const target = isProduction ? "dist/image" : "public/image";
    return gulp.src("./src/image/**/*", { allowEmpty: true, encoding: false  }).pipe(gulp.dest(target));
}
function copy_html() {
    const target = isProduction ? "dist" : "public";
    if (isProduction) {
        return gulp
            .src("./src/**/*.html", { allowEmpty: true })
            .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
            .pipe(gulp.dest(target));
    } else {
        return gulp.src("./src/**/*.html", { allowEmpty: true }).pipe(gulp.dest(target));
    }
}
function watch_files() {
    gulp.watch("./src/css/**/*.scss", compile_scss);
    gulp.watch("./src/js/**/*.ts", compile_ts);
    gulp.watch("./src/image/*", copy_image);
    gulp.watch("./src/**/*.html", copy_html);
}

exports.start = gulp.series(clean_out, compile_scss, compile_ts, copy_lib_js, copy_image, copy_html, watch_files);
exports.build = gulp.series(clean_out, compile_scss, compile_ts, copy_lib_js, copy_image, copy_html);
