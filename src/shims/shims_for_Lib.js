/**
 * 
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 1.3.0
 * @license MIT
 * 
 */
"use strict";

//
// elfjs shims for other libs.
// elfjs will host all native events of Window and Node.
//

! (function (Elf, Window, Node) {

if (Elf === void 0) {
    throw new Error("Elf is not defined");
}

var GlobalEventLauncher = Elf["Global.launcher"];
var GlobalEventListener = Elf["Global.listener"];

Window.prototype.addEventListener    = attachEvent(Window.prototype.addEventListener);
Window.prototype.removeEventListener = detachEvent(Window.prototype.removeEventListener);
Node.prototype.addEventListener      = attachEvent(Node.prototype.addEventListener);
Node.prototype.removeEventListener   = detachEvent(Node.prototype.removeEventListener);

function attachEvent (nativeAttachEvent) {
    return function (type, listener) {
        if (listener !== GlobalEventListener) {
            GlobalEventLauncher(this).attachEvent(type, listener);
        } else {
            nativeAttachEvent.apply(this, arguments);
        }
    };
}
function detachEvent (nativeDetachEvent) {
    return function (type, listener) {
        if (listener !== GlobalEventListener) {
            GlobalEventLauncher(this).detachEvent(type, listener);
        } else {
            nativeDetachEvent.apply(this, arguments);
        }
    }
}

} (window.Elf, Window, Node));