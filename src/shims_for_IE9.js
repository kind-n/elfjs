/**
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 2.0.0
 * @license MIT
 * 
 */
"use strict";

if (typeof requestAnimationFrame === "undefined") {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || function (fn) {
        return setTimeout(fn, 1000 / 60);
    };
    window.cancelAnimationFrame  = window.webkitCancelAnimationFrame || function (hwd) {
        return clearTimeout(hwd);
    };
}