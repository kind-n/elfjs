/**
 *
 * @description Simple pack for release
 *
 */
"use strict;"

var path = require("path");
var glob = require("glob");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var CleanDirPlugin = require("clean-webpack-plugin");
var CopyFilePlugin = require("copy-webpack-plugin");

var SOURCE_PATH = path.resolve("./src");
var OUTPUT_PATH = path.resolve("./dist");
var ENTRIES_DIR = "bootstraps";
// Main glob pattern in SOURCE_PATH/ENTRIES_DIR
var ECMA_PATTERN = [
    "*.js"
];
// HTML glob pattern in SOURCE_PATH
var HTML_PATTERN = [
    "*.html"
];
// Copy glob pattern in SOURCE_PATH
var COPY_PATTERN = [
    "assets/**/*.*",
    "components/**/*.*",
    //"documents/**/*.*",
    //"languages/**/*.*",
    "views/**/*.*"
];

module.exports = {
    entry: glob.sync(
            path.join(SOURCE_PATH, ENTRIES_DIR, ECMA_PATTERN.length === 1 ? ECMA_PATTERN[0] : "{" + ECMA_PATTERN.join(",") + "}")
        ).reduce(function (init, item) {
            return Object.defineProperty(init, path.basename(item, path.extname(item)), {
                configurable: true,
                enumerable: true,
                writable: true,
                value: item
            });
        }, Object.create(null)),
    output: {
        path: OUTPUT_PATH,
        filename: ENTRIES_DIR + "/[name].js"
    },
    module: {
        rules: [{
            test: /\.html?$/i,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true,
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: false
                }
            }]
        }]
    },
    context: SOURCE_PATH,
    plugins: [
        new CleanDirPlugin(OUTPUT_PATH),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    keep_fargs: false,
                    drop_debugger: true
                },
                output: {
                    ascii_only: true,
                    comments: "some"
                }
            }
        }),
        new CopyFilePlugin([{
            from: HTML_PATTERN.length === 1 ? HTML_PATTERN[0] : "{" + HTML_PATTERN.join(",") + "}",
            transform: function (value, path) {
                return value
                    .toString()
                    .replace(/(\s*<script.*src=").\/node_modules\/elfjs-loader\/dist\/elf-loader\.min\.js(".*\/script>)/g, "")
                    .replace(/(\s*<script.*src=").\/assets\/javascripts\/app\.js".*data-main="(.*)(".*\/script>)/g, "$1$2$3");
            }
        }].concat(
            COPY_PATTERN.map(function (item) {
                return { from: item };
            })
        ))
    ],
    externals: {
        "elfjs"       : "window.Elf",
        "elfjs-common": "window.Elf",
        "elfjs-engine": "window.Elf",
        "elfjs-loader": "window.Elf",
        "elfjs-router": "window.Elf"
    }
};