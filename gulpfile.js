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
    return gulp.src("./lib/elf.js")
        .pipe(
            uglify({
                compress : {
                    evaluate : false,
                    keep_fargs : false,
                    drop_debugger : true
                },
                output: {
                    comments: "some"
                }
            })
        )
        .pipe(
            rename({ suffix: ".min" })
        )
        .pipe(
            gulp.dest("./lib")
        );
});
