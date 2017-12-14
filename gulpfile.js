"use strict";

const gulp   = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

gulp.task("default", function () {
    return gulp.src("./src/**/*.js")
        .pipe(
            uglify({
                compress : {
                    keep_fargs: false
                },
                output : {
                    comments: "some"
                }
            })
        )
        .pipe(
            rename({ suffix: ".min" })
        )
        .pipe(
            gulp.dest("./dist")
        );
});