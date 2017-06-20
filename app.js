"use strict";

const fs   = require("fs");
const http = require("http");
const path = require("path");
const zlib = require("zlib");

const MIME_TYPE = {

    ".js"   : "text/javascript",
    ".ts"   : "text/typescript",
    ".html" : "text/html",
    ".scss" : "text/scss",
    ".css"  : "text/css"
};

http.createServer(function (req, res) {

const url = path.join(__dirname, req.url.replace(/\?.*$/, ""));

if (fs.existsSync(url) &&
    fs.statSync(url).isFile()) {

    res.setHeader("Content-Type",
                 (MIME_TYPE[path.extname(url).toLowerCase()] || "text/plain") + "; charset=utf-8");
    res.setHeader("Content-Encoding", "gzip");

    fs.createReadStream(url).pipe(zlib.createGzip()).pipe(res);
} else {
    res.statusCode = 404;
    res.end("Not Found");
}

}).listen(8080);