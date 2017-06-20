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
                    drop_console : true,
                    drop_debugger : true
                },
                preserveComments: "some"
            })
        )
        .pipe(
            rename({ suffix: ".min" })
        )
        .pipe(
            gulp.dest("./lib")
        );
});