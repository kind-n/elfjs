module.exports = function (server) {
    // One-Page Application
    server.use("/*.html", function () {
        return server.end("index.html");
    });
};