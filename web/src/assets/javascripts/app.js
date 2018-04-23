/**
 * 
 * @description Simple load helper for development
 */
"use strict";

!(function (Elf) {

    var current = document.currentScript || (function (scripts) {
        var i = 0, l = scripts.length;
        for (; i < l; i++) {
            if (scripts[i].readyState === "interactive") {
                return scripts[i];
            }
        }
        return scripts[l - 1];
    }(document.getElementsByTagName("script")));

    var extname = current.getAttribute("data-defaultExtension") || "js";
    var ingress = current.getAttribute("data-main");
    var baseURL = Elf.require.dirname(location.href);
    var libsURL = Elf.require.dirname(current.src);

    Elf.config({
        maps: {
            babel: Elf.require.resolve(libsURL, "libs/babel.min.js"),
            less : Elf.require.resolve(libsURL, "libs/less.min.js"),
            sass : Elf.require.resolve(libsURL, "libs/sass.sync.min.js"),
            ts   : Elf.require.resolve(libsURL, "libs/typescript.min.js")
        },
        baseURL: baseURL,
        defaultExtension: extname
    });

    if (ingress) {
        Elf.require(ingress);
    }

}(this.Elf));