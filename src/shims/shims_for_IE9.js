/**
 * 
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 1.3.3
 * @license MIT
 * 
 */
"use strict";

//
// elfjs shims for IE9.
// If not use requestAnimationFrame API, maybe not use it.
//

if (typeof requestAnimationFrame === "undefined") {
    window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 1000 / 60);
    };
    window.cancelAnimationFrame = function (hwd) {
        return clearTimeout(hwd);
    };
}