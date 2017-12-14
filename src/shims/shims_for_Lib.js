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
// elfjs shims for other libs.
// elfjs will host all native events of Window and Node.
//

! (function (Elf, Window, Node) {

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

var GlobalEventLauncher = Elf["Global.launcher"];
var GlobalEventListener = Elf["Global.listener"];

Node.prototype.addEventListener      = attachEvent(Node.prototype.addEventListener);
Node.prototype.removeEventListener   = detachEvent(Node.prototype.removeEventListener);
Window.prototype.addEventListener    = attachEvent(Window.prototype.addEventListener);
Window.prototype.removeEventListener = detachEvent(Window.prototype.removeEventListener);

} (window.Elf, Window, Node));