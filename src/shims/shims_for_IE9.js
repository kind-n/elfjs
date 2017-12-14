/**
 * 
 * 
 * http://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 1.0.0
 * @license MIT
 * 
 */
"use strict";

//
// elfjs shims for IE9.
// If not output source map, maybe not use it.
//

! (function (window) {

if (typeof btoa === "undefined") {

    window.btoa = function (value) {
        return base64Encode(utf8Encdoe(value));
    };

    var diagrammatic = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function base64Encode (value) {
        var result = "";
        var length = value.length;
        var enc1, enc2, enc3, enc4;
        var num1, num2, num3;
        var i = 0;
        while (i < length) {
            num1 = value[i++];
            num2 = value[i++];
            num3 = value[i++];
            enc1 = num1 >> 2;
            enc2 = ((num1 & 3) << 4) | (num2 >> 4);
            enc3 = ((num2 & 15) << 2) | (num3 >> 6);
            enc4 = num3 & 63;
            if (isNaN(num2)) {
                enc3 = 64;
            }
            if (isNaN(num3)) {
                enc4 = 64;
            }
            result += diagrammatic.charAt(enc1)
                    + diagrammatic.charAt(enc2)
                    + diagrammatic.charAt(enc3)
                    + diagrammatic.charAt(enc4);
        }
        return result;
    }
    function utf8Encdoe (value) {
        var result = [];
        var length = value.length;
        for (var i = 0; i < length; i++) {
            var ns = value.charCodeAt(i);
            if (ns < 128) {
                result.push(ns);
            } else if ((ns > 127) && (ns < 2048)) {
                result.push((ns >> 6) | 192);
                result.push((ns & 63) | 128);
            } else {
                result.push((ns >> 12) | 224);
                result.push(((ns >> 6) & 63) | 128);
                result.push((ns & 63) | 128);
            }
        }
        return result;
    }
}

if (typeof requestAnimationFrame === "undefined") {
    window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 1000 / 60);
    };
    window.cancelAnimationFrame = function (hwd) {
        return clearTimeout(hwd);
    };
}

} (window));