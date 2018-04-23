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

if (typeof Elf !== "undefined") {

    ! (function (
        NProto,
        WProto,
        ATTACH_EVENT,
        DETACH_EVENT,
        GlobalMethodLauncher,
        GlobalMethodListener) {

        NProto[ATTACH_EVENT] = attachEvent(NProto[ATTACH_EVENT]);
        NProto[DETACH_EVENT] = detachEvent(NProto[DETACH_EVENT]);
        WProto[ATTACH_EVENT] = attachEvent(WProto[ATTACH_EVENT]);
        WProto[DETACH_EVENT] = detachEvent(WProto[DETACH_EVENT]);
        
        function attachEvent (NativeEventAttacher) {
            return function (type, listener) {
                if (listener !== GlobalMethodListener) {
                    GlobalMethodLauncher(this).attachEvent(type, listener);
                } else {
                    NativeEventAttacher.apply(this, arguments);
                }
            };
        }
        function detachEvent (NativeEventDetacher) {
            return function (type, listener) {
                if (listener !== GlobalMethodListener) {
                    GlobalMethodLauncher(this).detachEvent(type, listener);
                } else {
                    NativeEventDetacher.apply(this, arguments);
                }
            };
        }
    } (
        Node.prototype,
        Window.prototype,
        "addEventListener",
        "removeEventListener",
        Elf._GLOBAL_METHOD_LAUNCHER_,
        Elf._GLOBAL_METHOD_LISTENER_
    ));
}