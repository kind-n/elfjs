/**
 * 
 * 
 * http://www.elfjs.org
 * 
 * @copyright (C) 2017 Wu Hu. All Rights Reserved.
 * 
 * @version 0.1.3
 * @license MIT
 * 
 */


/// <reference path="./elf.d.ts" />

///////////////////////////////////
/// CODE
///////////////////////////////////

/**
 * 
 * @typedef Manager
 * @property {Array} behests
 * @property {Boolean} connate
 * @property {Emitter} emitter
 * @property {Manager} creator
 * @property {JSX.Element | String | void} element
 * @property {JSX.ElementClass | HTMLElement | Comment | Text} example
 * @property {function(...):Realtor} initial
 * @property {function(...):Realtor} renewal
 * @property {Function} dispose
 * @property {Function=} trigger
 * @property {Function=} attachEvent
 * @property {Function=} detachEvent
 * @property {Function=} dispatchEvent
 * @property {Manager=} manager
 * @property {Array=} members
 */

/**
 * 
 * @typedef Emitter
 * @property {function(...):boolean} contain
 * @property {function(...):boolean} enqueue
 * @property {function(...):boolean} unqueue
 * @property {Function} replace
 * @property {Function} trigger
 * @property {Function} dispose
 */

/**
 * 
 * @typedef Realtor
 * @property {Boolean} append
 * @property {HTMLElement} target
 */

/**
 * 
 * @typedef Variety
 * @property {any=} append
 * @property {any=} remove
 * @property {{[x:string]:{oldValue:any,newValue:any}}=} change
 */

/**
 * 
 * @typedef EachExpr
 * @property {String} keys
 * @property {String} body
 */

/**
 * 
 * @typedef PropExpr
 * @property {Object} props
 * @property {String=} when
 * @property {EachExpr=} each
 */

/**
 * 
 * @typedef AbstractSyntaxTree
 * @property {Array} children
 * @property {String} qname
 * @property {Number} level
 * @property {Object} props
 * @property {String=} when
 * @property {EachExpr=} each
 */

"use strict";

/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

! (function (Elf) {

/**
 * 
 * 
 * @returns {Array} 
 */
function asArray () {
    return Array.prototype.slice.apply(this, arguments);
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isArray (target) {
    return Array.isArray(target);
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isValid (target) {
    return target !== void 0 && target !== null;
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isBasal (target) {
    return isString(target) || isNumber(target);
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isString (target) {
    return typeof target === "string";
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isNumber (target) {
    return typeof target === "number";
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isMethod (target) {
    return typeof target === "function";
}
/**
 * 
 * 
 * @param {any} target 
 * @returns {Boolean}
 */
function isObject (target) {
    return isValid(target) && typeof target === "object";
}

/**
 * 
 * 
 * @param {any} target 
 * @param {any} proto 
 * @returns {Boolean}
 */
function isExtend (target, proto) {
    return Object.prototype.isPrototypeOf.call(proto, target);
}

/**
 * 
 * 
 * @param {String} target 
 * @param {String} value 
 * @param {Number} current 
 * @returns {Boolean}
 */
function isStarts (target, value, current) {
    var number = current || 0;
    var length = value.length;
    for (var i = 0; i < length; i++) {
        if (value.charAt(i) !== target.charAt(number + i)) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {String}
 */
function asString (target) {
    return JSON.stringify(target);
}

/**
 * 
 * 
 * @param {String} target 
 * @returns {any}
 */
function asObject (target) {
    return JSON.parse(target);
}

/**
 * 
 * 
 * @param {String} target
 * @returns {String}
 */
function unEscape (target) {
    code.innerHTML = target;
    return code.textContent;
}

/**
 * 
 * 
 * @param {any} target 
 * @param {PropertyKey} name 
 * @returns {Boolean}
 */
function hasProp (target, name) {
    return Object.prototype.hasOwnProperty.call(target, name);
}

/**
 * 
 * 
 * @param {T} target 
 * @param {PropertyKey} name 
 * @param {any} value 
 * @param {Boolean} enumerable 
 * @returns {T}
 * @template T
 */
function defProp (target, name, value, enumerable) {
    return Object.defineProperty(target, name, newProp(value, enumerable));
}

/**
 * 
 * 
 * @param {any} target 
 * @param {Boolean} enumerable 
 * @returns {PropertyDescriptor}
 */
function newProp (target, enumerable) {
    return {
        configurable: true,
        enumerable: !!enumerable,
        writable: true,
        value: target
    };
}

/**
 * 
 * 
 * @param {String | Number} target 
 * @returns {PropertyKey}
 */
function wadProp (target) {
    if (typeof Symbol !== "undefined") {
        return Symbol(target);
    }
    return target;
}

/**
 * 
 * 
 * @param {Array} target
 * @returns {Array} 
 */
function cliFlat (target) {
    var result = [];
    var length = target.length;
    for (var i = 0; i < length; i++) {
        var ns = target[i];
        if (isArray(ns)) {
            if (ns.length) {
                result.push.apply(result, cliFlat(ns));
            }
        } else {
            if (isValid(ns)) {
                result.push(ns);
            }
        }
    }
    return result;
}

/**
 * 
 * 
 * @param {Function} target 
 * @param {Array} param
 * @returns {Function}
 */
function cliWrap (target, param) {
    return function () {
        target.apply(this, param) || actBroadcast();
    };
}

/**
 * 
 * 
 * @param {Array} target 
 * @param {any} value 
 * @returns {Function}
 */
function cliPush (target, value) {
    return cliPlus(target, value), cliLess.bind(this, target, value);
}

/**
 * 
 * 
 * @param {Array} target 
 * @param {any} value 
 * @returns {Boolean}
 */
function cliPlus (target, value) {
    return target.indexOf(value) < 0 ? target.push(value) === 1 : false;
}

/**
 * 
 * 
 * @param {Array} target 
 * @param {any} value 
 * @returns {Boolean}
 */
function cliLess (target, value) {
    var number = target.indexOf(value);
    if (number >= 0) {
        target.splice(number, 1);
        return target.length === 0;
    }
    return false;
}

/**
 * 
 * 
 * @param {String} target 
 * @returns {String}
 */
function cliLower (target) {
    return target.toLowerCase();
}

/**
 * 
 * 
 * @param {any} target 
 * @param {any} ns 
 * @returns {Function}
 */
function cliApply (target, ns) {
    return function (fn) {
        fn.call(target, ns);
    };
}

/**
 * 
 * 
 * @param {Array} target 
 * @param {Function} fn 
 */
function cliClean (target, fn) {
    while (target.length) {
        fn(target.pop());
    }
}

/**
 * 
 * 
 * @param {Array} target 
 * @param {Array} value 
 */
function cliReset (target, value) {
    Array.prototype.splice.apply(target, [0, target.length].concat(value));
}

/**
 * 
 * 
 * @param {String} target 
 * @param {Function} fn
 * @returns {Function} 
 */
function cliIndex (target, fn) {
    return function (value, current) {
        var curly = 0;
        var paren = 0;
        var square = 0;
        var inSingle = false;
        var inDouble = false;
        var number = current || 0;
        var length = target.length;
        var escape = "\\";
        var p, n;
        for (; number < length; number++) {
            p = n;
            n = target.charAt(number);
            if (inSingle) {
                if (n === "'" && p !== escape) {
                    inSingle = false;
                }
                continue;
            }
            if (inDouble) {
                if (n === '"' && p !== escape) {
                    inDouble = false;
                }
                continue;
            }
            if (0 === curly &&
                0 === paren &&
                0 === square &&
                n === value) {
                if (fn(number)) {
                    break;
                }
                continue;
            }
            switch (n) {
                case "{":
                    curly++;
                    break;
                case "}":
                    curly--;
                    break;
                case "(":
                    paren++;
                    break;
                case ")":
                    paren--;
                    break;
                case "[":
                    square++;
                    break;
                case "]":
                    square--;
                    break;
                case "'":
                    inSingle = true;
                    break;
                case '"':
                    inDouble = true;
                    break;
            }
        }
        return number;
    };
}

/**
 * 
 * 
 * @param {any} target 
 * @param {any} origin 
 * @returns {Boolean}
 */
function cliEqual (target, origin) {
    if (target === origin) {
        return true;
    }
    if (isObject(target) &&
        isObject(origin)) {
        for (var name in target) {
            if (!hasProp(origin, name)) {
                return false;
            }
            if (!cliEqual(target[name], origin[name])) {
                return false;
            }
        }
        for (var name in origin) {
            if (!hasProp(target, name)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * 
 * 
 * @param {Elf.Request} request 
 * @param {Function} resolve 
 * @param {Function} reject
 * @returns {Function} 
 */
function xhrAsync (request, resolve, reject) {
    var xhrContent = "Content-Type";
    var xhrPattern = "X-Requested-With";
    var xhrFashion = request.method  || "GET";
    var xhrHeaders = request.headers || {};
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open(xhrFashion.toUpperCase(), request.url, true);
    domAttachEvent(xhrRequest, natureLoad, ownResolved);
    domAttachEvent(xhrRequest, natureFail, ownRejected);
    if (!hasProp(xhrHeaders, xhrContent)) {
        xhrAffix(xhrRequest, xhrContent, "application/x-www-form-urlencoded; charset=UTF-8");
    }
    if (!hasProp(xhrHeaders, xhrPattern)) {
        xhrAffix(xhrRequest, xhrPattern, "XMLHttpRequest");
    }
    for (var name in xhrHeaders) {
        xhrAffix(xhrRequest, name, xhrHeaders[name]);
    }
    xhrRequest.send(request.body);
    return function () {
        domDetachEvent(xhrRequest, natureLoad, ownResolved);
        domDetachEvent(xhrRequest, natureFail, ownRejected);
        xhrRequest.abort();
    };
    function ownResolved () {
        var result = xhrRequest.responseText;
        var status = xhrRequest.status === 1223 ? 200 : xhrRequest.status;
        if (status === 0) {
            status = result ? 200 : 0;
        }
        var headers = {};
        var content = (xhrRequest.getAllResponseHeaders() || "").trim();
        if (content) {
            content.split("\n").forEach(function (i) {
                var x = ":";
                var l = i.trim().split(x);
                var m = l.shift().trim();
                var n = l.join(x).trim();
                headers[m] = n;
            });
        }
        if (200 <= status && status < 300) {
            resolve({
                status  : status,
                headers : headers,
                text    : function () {
                    return result;
                },
                json    : function () {
                    return asObject(result);
                }
            });
        } else {
            reject(xhrRequest);
        }
        actBroadcast();
    }
    function ownRejected () {
        reject(xhrRequest);
        actBroadcast();
    }
}

/**
 * 
 * 
 * @param {Elf.Request} request 
 * @param {Function} resolve 
 * @param {Function} reject
 * @returns {Function} 
 */
function xhrJsonp (request, resolve, reject) {
    var xhrCallback = "Elf" + (Math.random() * 1E9 | 0);
    var xhrHostNode = domCreateElement("script");
    win[xhrCallback]= ownResolved;
    domAttachEvent(xhrHostNode, natureFail, ownRejected);
    domAttachProps(xhrHostNode, natureType, "text/javascript");
    domAttachProps(xhrHostNode, natureLink, request.url);
    domAppendChild(head, xhrHostNode);
    return function () {
        if (win[xhrCallback]) {
            win[xhrCallback] = function () {
                delete win[xhrCallback];
            };
        }
        domRemoveChild(xhrHostNode);
    };
    function ownResolved (value) {
        delete win[xhrCallback];
        resolve({
            status  : 200,
            headers : {},
            text    : function () {
                return isObject(value) ? asString(value) : value;
            },
            json    : function () {
                return value;
            }
        });
        actBroadcast();
    }
    function ownRejected (error) {
        delete win[xhrCallback];
        reject(error);
        actBroadcast();
    }
}

/**
 * 
 * 
 * @param {XMLHttpRequest} request
 * @param {String} name
 * @param {String} value
 */
function xhrAffix (request, name, value) {
    request.setRequestHeader(name, value);
}

/**
 * 
 * @returns {Boolean}
 */
function actBroadcast () {
    if (actLeisure) {
        actLeisure = false;
        setTimeout(function () {
            actMonitor.forEach(function (i) {
                i.duplex && i.forceUpdate();
            });
            actLeisure = true;
        });
    }
    return !actLeisure;
}

/**
 * 
 * 
 * @param {any} value 
 * @returns {Elf.Destruction}
 */
function actSubscribe (value) {
    return { dispose : cliPush(actMonitor, value) };
}

/**
 * 
 * 
 * @param {String} trustor 
 * @returns {Comment}
 */
function domCreateComment (trustor) {
    return doc.createComment(trustor);
}

/**
 * 
 * 
 * @param {String} trustor 
 * @returns {Text}
 */
function domCreateContent (trustor) {
    return doc.createTextNode(trustor);
}

/**
 * 
 * 
 * @param {String} trustor
 * @param {String} namespace
 * @returns {HTMLElement}
 */
function domCreateElement (trustor, namespace) {
    return namespace ? doc.createElementNS(namespace, trustor) : doc.createElement(trustor);
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 */
function domAppendChild (element) {
    cliFlat(asArray.call(arguments, 1)).forEach(element.appendChild, element);
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 */
function domRemoveChild (element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {Event} event 
 */
function domBubbleEvent (element, event) {
    element.dispatchEvent(new event.constructor(event.type, event));
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 * @param {Boolean} newly
 */
function domLookupEvent (element, type, listener, newly) {
    var members = [];
    var example = noop;
    if (hasProp(element, symbolListener)) {
        members = element[symbolListener];
    } else {
        if (newly) {
            defProp(element, symbolListener, members = []);
        }
    }
    for (var i = 0; i < members.length; i++) {
        var ns = members[i];
        if (ns[0] === type &&
            ns[1] === listener) {
            return ns[2];
        }
    }
    if (newly) {
        members.push([
            type,
            listener,
            example = function (event) {
                if (isObject(listener)) {
                    listener.handleEvent(event) || actBroadcast();
                } else {
                    listener.call(this, event) || actBroadcast();
                }
            }
        ]);
    }
    return example;
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 * @param {Boolean} duplex 
 */
function domAttachEvent (element, type, listener, duplex) {
    element.addEventListener(type, duplex ? domLookupEvent(element, type, listener, true) : listener, false);
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 * @param {Boolean} duplex 
 */
function domDetachEvent (element, type, listener, duplex) {
    element.removeEventListener(type, duplex ? domLookupEvent(element, type, listener) : listener, false);
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {String} name 
 * @param {any} value 
 */
function domAttachProps (element, name, value) {
    switch (propsSpecial[name] || 0) {
        case 0:
            element.setAttribute(name, value);
            break;
        case 1:
            element[name].cssText = domFormatStyle(value);
            break;
        case 2:
            element[name] = (value === false) ? value : true;
            break;
        case 3:
            element[name] = value;
            break;
    }
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @param {String} name 
 */
function domDetachProps (element, name) {
    switch (propsSpecial[name] || 0) {
        case 0:
            element.removeAttribute(name);
            break;
        case 1:
            element[name].cssText = "";
            break;
        case 2:
            element[name] = false;
            break;
        case 3:
            element[name] = "";
            break;
    }
}

/**
 * 
 * 
 * @param {any} value
 */
function domFormatStyle (value) {
    if (isObject(value)) {
        return expLoop(value, function (value, name) {
            return name.replace(regex_huge, function (value) {
                return "-" + cliLower(value);
            }) + ":" + value;
        }).join(";");
    }
    return value;
}

/**
 * 
 * 
 * @param {String} temp
 * @returns {String} 
 */
function tplNameParser (temp) {
    return temp.match(regex_name)[0];
}

/**
 * 
 * 
 * @param {String} temp
 * @returns {EachExpr} 
 */
function tplLoopParser (temp) {
    var expr = temp.match(regex_loop);
    if (expr) {
        return {
            keys : expr[1],
            body : expr[2]
        };
    }
    console.error("[Elf error]: Invalid elf-each expression: " + temp);
}

/**
 * 
 * 
 * @param {String} temp
 * @returns {PropExpr}
 */
function tplPropParser (temp) {
    var result = { props : {} };
    for (var expr; expr = temp.match(regex_prop); temp = temp.substring(expr.index + expr[0].length)) {
        var name = expr[1];
        var text = expr[3] || expr[4] || expr[5] || "";
        if (name === "elf-each") {
            result.each = tplLoopParser(text);
            continue;
        }
        if (name === "elf-when") {
            result.when = text.trim();
            continue;
        }
        result.props[name] = text;
    }
    return result;
}

/**
 * 
 * 
 * @param {String} temp
 * @returns {AbstractSyntaxTree} 
 */
function tplHtmlParser (temp) {
    var level = 0;
    var queue = [];
    var roots = [];
    var number = 0;
    var length = temp.length;
    while (number < length) {
        if (ownCommentStart(number)) {
            ownCommentParse(number, number = ownCommentClose(number + 4) + 3);
            continue;
        }
        if (ownClosureStart(number)) {
            ownClosureParse(number, number = ownElementClose(number + 2) + 1);
            continue;
        }
        if (ownElementStart(number)) {
            ownElementParse(number, number = ownElementClose(number + 1) + 1);
            continue;
        }
        ownContentParse(number, number = ownContentClose(number));
    }
    if (roots.length > 1) {
        console.error("[Elf error]: Cannot use multiple root node.");
    }
    return roots[0] || "";
    function ownCommentStart (current) {
        return isStarts(temp, tagCommentOpen, current);
    }
    function ownClosureStart (current) {
        return isStarts(temp, tagClosureOpen, current);
    }
    function ownElementStart (current) {
        return isStarts(temp, tagElementOpen, current);
    }
    function ownCommentClose (current) {
        current = temp.indexOf(tagCommentFold, current);
        return current >= 0 ? current : length;
    }
    function ownContentClose (current) {
        current = temp.indexOf(tagElementOpen, current);
        return current >= 0 ? (
            ownCommentStart(current) ||
            ownClosureStart(current) ||
            ownElementStart(current) ? current : ownContentClose(current + 1)
        ) : length;
    }
    function ownElementClose (current) {
        return cliIndex(temp, function () { return true; })(tagElementFold, current);
    }
    function ownCommentParse (start, end) {
        console.warn("Comment '" + temp.slice(start, end) + "' will be dispensed.");
    }
    function ownClosureParse (start, end) {
        var qname = tplNameParser(temp.slice(start + 2, end));
        if (!hasProp(xhtmlFoliage, qname)) {
            while  (level > 0) {
                if (queue[--level].qname === qname) {
                    break;
                }
            }
        }
    }
    function ownElementParse (start, end) {
        var qname = tplNameParser(temp.slice(start + 1, end));
        var value = tplPropParser(temp.slice(start + 1 + qname.length, end));
        var close = hasProp(xhtmlFoliage, qname) || temp.charAt(end - 2) === "/";
        ownStoreValue({
            each     : value.each,
            when     : value.when,
            props    : value.props,
            qname    : qname,
            level    : level,
            children : []
        }, !close);
    }
    function ownContentParse (start, end) {
        ownStoreValue(temp.slice(start, end).trim());
    }
    function ownStoreValue (value, depth) {
        if (value) {
            queue[level] = value;
            if (level > 0) {
                queue[level - 1].children.push(value);
            } else {
                roots.push(value);
            }
            if (depth) {
                level++;
            }
        }
    }
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstElement (node) {

    if (isString(node)) {
        return ganAstContent(node);
    }
    if (node.each) {
        if (node.level > 0) {
            return ganAstIterate(node);
        }
        console.error("[Elf error]: Cannot use elf-each on root node.");
    }
    if (node.when) {
        return ganAstTernary(node);
    }
    return ganAstDefault(node);
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstDefault (node) {
    return "Elf.v(Elf.c(" + asString(node.qname) + ")," + ganAstNatures(node) + (node.children.length ? "," + ganAstInsider(node) : "") + ")";
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstIterate (node) {
    return "Elf.m(" + node.each.body + ",function(" + node.each.keys + "){with(this){return " + (node.when ? ganAstTernary(node) : ganAstDefault(node)) + "}},this)";
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstTernary (node) {
    return "((" + node.when + ")?" + ganAstDefault(node) + ":null)";
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstInsider (node) {
    return "[" + node.children.map(ganAstElement).join(",") + "]";
}

/**
 * 
 * 
 * @param {AbstractSyntaxTree} node
 * @returns {String} 
 */
function ganAstNatures (node) {
    return "{" +
        expLoop(node.props, function (value, name) {
            if (name === "cmd") {
                return asString(name) + ":Elf.d(" + ganAstContent(value) + ")";
            }
            if (isStarts(name, eventPrefix)) {
                return asString(name) + ":function($event){with(this){" + value + "}}.bind(this)";
            }
            return asString(name) + ":" + (value ? ganAstContent(value) : asString(value));
        }).join(",")
    + "}";
}

/**
 * 
 * 
 * @param {String} node
 * @returns {String} 
 */
function ganAstFilters (node) {
    var result;
    var number = -1;
    var divide = "|";
    var length = node.length;
    var thrust = cliIndex(node, function (i) {
        return node.charAt(i + 1) !== divide
            && node.charAt(i - 1) !== divide;
    });
    while (number < length) {
        var temp = node.slice(number + 1, number = thrust(divide, number + 1)).trim();
        if (temp) {
            if (result) {
                var expr = temp.match(regex_pipe);
                if (expr) {
                    result = "Elf.t(" + asString(expr[1]) + "," + result + (expr[2] ? "," + expr[2] : "") + ")";
                }
            } else {
                result = temp;
            }
        }
    }
    return result;
}

/**
 * 
 * 
 * @param {String} node
 * @returns {String} 
 */
function ganAstContent (node) {
    var number = 0;
    var incept = 0;
    var finish = -2;
    var result = [];
    for (;
        (incept = node.indexOf("{{", finish + 2)) >= 0 &&
        (finish = node.indexOf("}}", incept + 2)) >= 0
        ;number = finish + 2) {
        if (number < incept) {
            ownAboriginal(number, incept);
        }
        if (incept < finish - 2) {
            ownExpression(incept + 2, finish);
        }
    }
    if (number < node.length) {
        ownAboriginal(number, node.length);
    }
    return result.join("+");
    function ownAboriginal(start, end) {
        result.push(asString(unEscape(node.slice(start, end))));
    }
    function ownExpression(start, end) {
        var value = ganAstFilters(unEscape(node.slice(start, end)));
        if (value) {
            result.push("(" + value + ")");
        }
    }
}

/**
 * 
 * 
 * @param {Elf.ITransform} example 
 * @param {Array} param 
 * @returns {any}
 */
function sapTransform (example, param) {
   return example.transform.apply(example, param);   
}

/**
 * 
 * 
 * @param {Realtor} realtor 
 * @param {HTMLElement} container 
 */
function sapInsertion (realtor, container) {
    if (realtor.append) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        domAppendChild(container, realtor.target);
    }
}

/**
 * 
 * 
 * @param {Array} collect 
 */
function sapExplosion (collect) {
    cliClean(collect, cliApply());
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Function}
 */
function expPipe (target) {
    return function (name, value) {
        if (hasProp(target, name)) {
            return sapTransform(singlesCreator(target[name]), asArray.call(arguments, 1));
        }
        if (hasProp(transformDep, name)) {
            return sapTransform(singlesCreator(transformDep[name]), asArray.call(arguments, 1));
        }
        console.error("[Elf error]: Invalid transform: " + name);
        return isValid(value) ? value : "";
    };
}

/**
 * 
 * 
 * @param {any} target
 * @returns {Function} 
 */
function expLing (target) {
    return function (temp) {
        var result = [];
        for (var expr; expr = temp.match(regex_ling); temp = temp.substring(expr.index + expr[0].length)) {
            var name = expr[1];
            if (hasProp(target, name)) {
                cliPush(result, target[name]);
                continue;
            }
            if (hasProp(directiveDep, name)) {
                cliPush(result, directiveDep[name]);
                continue;
            }
            console.error("[Elf error]: Invalid directive: " + name);
        }
        return result;
    };
}

/**
 * 
 * 
 * @param {any} target 
 * @returns {Function} 
 */
function expName (target) {
    return function (name) {
        return target[name] || componentDep[name] || cliLower(name);
    };
}

/**
 * 
 * 
 * @param {any} target 
 * @param {Function} fn 
 * @param {any} context 
 * @returns {Array}
 */
function expLoop (target, fn, context) {
    if (isArray(target)) {
        return target.map(fn, context);
    }
    var result = [];
    for (var name in target) {
        result.push(fn.call(context, target[name], name, target));
    }
    return result;
}

/**
 * 
 * 
 * @param {any} value 
 * @returns {Elf.Promise.<Elf.Provide>}
 */
function rawMode (target) {
    return promiseNext({ exports: target });
}

/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

/**
 * 
 * 
 * @param {String} modname 
 * @returns {Function}
 */
function requireDefine (modname) {
    return function () {
        var provide = asArray.call(arguments);
        var trustor = provide.pop();
        var depends = provide.pop() || [];
        var rawname = provide.pop() || modname;
        amdModules[rawname] = promiseNext({
            dirname : requireFinder(modname),
            depends : depends,
            trustor : trustor
        });
    };
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {Function}
 */
function requireImport (dirname) {
    return function (modname) {
        return (amdModules[modname] || requireLoader(
            (requireActual(modname) || requireLocate(
                /^\//.test(modname) ? modname :
                /^\./.test(modname) ? dirname + "/" + modname :
                (amdOptions.baseURL || "") + "/" + modname
            ))
        )).then(function (provide) {
            return hasProp(provide, "exports") ? provide.exports : (provide.exports = requireLaunch(provide));
        });
    };
}

/**
 * 
 * 
 * @param {Elf.Provide} provide
 * @returns {Elf.Promise} 
 */
function requireLaunch (provide) {
    var obtain = {};
    var module = { exports : {} };
    if (isMethod(provide.trustor)) {
        return promiseWhen(
            provide.depends.map(function (ns) {
                if (ns === "require") return obtain;
                if (ns === "exports") return module.exports;
                if (ns === "module")  return module;
                return requireImport(provide.dirname)(ns);
            })
        ).then(function (depends) {
            return provide.trustor.apply(module.exports, depends.map(function (ns) {
                return ns === obtain ? function (name) {
                    return depends[provide.depends.indexOf(name)];
                } : ns;
            })) || module.exports;
        });
    } else {
        return promiseNext(provide.trustor);
    }
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {Elf.Promise.<Elf.Provide>}
 */
function requireLoader (modname) {
    return amdModules[modname] || (amdModules[modname] = promiseAjax({
        url : requireRouter(modname)
    }).then(function (response) {
        return (trustorProto[cliLower(modname.substring(modname.lastIndexOf(".") + 1))] || rawMode)(response.text(), modname);
    }));
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function requireLocate (modname) {
    var hostname = loc.host;
    var protocol = loc.protocol;
    var splitURL = modname.split(/\/+/);
    if (/\w+:$/.test(splitURL[0])) {
        protocol = splitURL.shift();
        hostname = splitURL.shift();
        splitURL.unshift();
    }
    for (var i = 0; i < splitURL.length;) {
        if (splitURL[i] === ".") {
            splitURL.splice(i, 1);
            continue;
        }
        if (splitURL[i] === ".." && i > 0) {
            splitURL.splice(i - 1, 2);
            continue;
        }
        i++;
    }
    var location = splitURL.join("/");
    if (splitURL.pop().indexOf(".") < 0) {
        location = location + "." + (amdOptions.defaultExtension || "js");
    }
    return protocol + "//" + hostname + "/" + location.replace(/^\/+/, "");
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function requireRouter (modname) {
    return amdOptions.routing ? amdOptions.routing(modname) : modname;
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function requireActual (modname) {
    return amdOptions.mapping && amdOptions.mapping[modname];
}

/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function requireFinder (modname) {
    return modname.replace(/[^\/]+$/, "");
}

/**
 * 
 * 
 * @param {String} value 
 * @returns {String}
 */
function requireFormat (value) {
    return amdOptions.module === "commonjs" ? "define(" + requireDepend(value) + ",function(require,exports,module){\n" + value + "\n})" : value;
}

/**
 * 
 * 
 * @param {String} temp 
 * @returns {String}
 */
function requireDepend (temp) {
    var result = ["require", "exports", "module"];
    for (var expr; expr = temp.match(regex_deps); temp = temp.substring(expr.index + expr[0].length)) {
        var prev = expr[1];
        var name = expr[2] || expr[3];
        if (name && prev !== ".") {
            cliPush(result, name);
        }
    }
    return asString(result);
}

/**
 * 
 * 
 * @param {T} value 
 * @returns {T}
 * @template T
 */
function promiseNoop (value) {
    return value;
}

/**
 * 
 * 
 * @param {any} value 
 * @param {Function} resolve 
 * @param {Function} reject 
 */
function promiseThen (value, resolve, reject) {
    if (isExtend(value, promiseProto)) {
        value.then(resolve, reject);
    } else {
        resolve(value);
    }
}

/**
 * 
 * 
 * @param {any} error 
 * @param {Function} resolve 
 * @param {Function} reject 
 */
function promiseFail (error, resolve, reject) {
    if (isExtend(error, promiseProto)) {
        error.then(resolve, reject);
    } else {
        reject(error);
    }
}

/**
 * 
 * 
 * @param {any} value 
 */
function promiseDone (value) {
    if (this[symbolProcess] === statusPending) {
        if (isExtend(value, promiseProto)) {
            value.then(promiseDone.bind(this), promisePoor.bind(this));
        } else {
            this[symbolContent] = value;
            this[symbolProcess] = statusResolved;
            this[symbolSuccess].forEach(cliApply(this, value));
        }
    }
}

/**
 * 
 * 
 * @param {any} error 
 */
function promisePoor (error) {
    if (this[symbolProcess] === statusPending) {
        if (isExtend(error, promiseProto)) {
            error.then(promiseDone.bind(this), promisePoor.bind(this));
        } else {
            this[symbolContent] = error;
            this[symbolProcess] = statusRejected;
            this[symbolFailure].forEach(cliApply(this, error));
        }
    }
}

/**
 * 
 * 
 * @param {any} error 
 * @returns {Elf.Promise}
 */
function promiseNext (value) {
    return promiseCreator(function (resolve, reject) { resolve(value); });
}

/**
 * 
 * 
 * @param {any} error 
 * @returns {Elf.Promise}
 */
function promiseLoss (error) {
    return promiseCreator(function (resolve, reject) { reject(error); });
}

/**
 * 
 * 
 * @param {Array} array 
 * @returns {Elf.Promise}
 */
function promiseWhen (array) {
    return promiseCreator(function (resolve, reject) {
        var number = 0;
        var length = array.length;
        var result = new Array(length);
        if (length) {
            array.forEach(function (ns, index) {
                promiseThen(ns, function (value) {
                    result[index] = value;
                    if (++number === length) {
                        resolve(result);
                    }
                }, reject);
            });
        } else {
            resolve(result);
        }
    }); 
}

/**
 * 
 * 
 * @param {Array} array 
 * @returns {Elf.Promise}
 */
function promiseRace (array) {
    return promiseCreator(function (resolve, reject) {
        if (array.length) {
            array.forEach(function (ns) {
                promiseThen(ns, resolve, reject);
            });
        } else {
            resolve();
        }
    });
}

/**
 * 
 * 
 * @param {Elf.Request} request 
 * @returns {Elf.Promise.<Elf.Response>}
 */
function promiseAjax (request) {
    return promiseCreator(function (resolve, reject) {
        return request.jsonp ? xhrJsonp(request, resolve, reject) : xhrAsync(request, resolve, reject);
    });
}

/**
 * 
 * 
 */
function exhibitEventBubbles () {
    this.bubbles = false;
}

/**
 * 
 * 
 */
function exhibitEventRefersh () {
    this.refresh = false;
}

/**
 * 
 * 
 * @param {Event} event 
 */
function exhibitEventHandler (event) {
    var example = {};
    var manager = event.target[symbolRenderer];
    for (var name in event) {
        if (hasProp(eventNatures, name)) {
            example[name] = event[name];   
        }
    }
    event.stopPropagation();
    example.refresh         = true;
    example.originalEvent   = event;
    example.stopPropagation = exhibitEventBubbles;
    example.preventRefresh  = exhibitEventRefersh;
    example.preventDefault  = function () {
        this.originalEvent.preventDefault();
        this.defaultPrevented = true;
    };
    manager.dispatchEvent(example);
    example.refresh && actBroadcast();
}

/**
 * 
 * 
 * @param {JSX.Element} target 
 * @param {JSX.Element} origin
 * @returns {Boolean} 
 */
function exhibitJudgeRedrawn (target, origin) {
    if (isObject(target) &&
        isObject(origin)) {
        return target.type === origin.type;
    }
    return isValid(target) === isValid(origin)
        && isBasal(target) === isBasal(origin);
}

/**
 * 
 * 
 * @param {any} target 
 * @param {any} origin 
 * @returns {Variety}
 */
function exhibitGroupVariety (target, origin) {
    var result = {
        append : {},
        remove : {},
        change : {}
    };
    for (var name in origin) {
        if (!hasProp(target, name)) {
            result.remove[name] = origin[name];
            continue;
        }
        if (!cliEqual(target[name], origin[name])) {
            result.change[name] = {
                oldValue : origin[name],
                newValue : target[name]
            };
        }
    }
    for (var name in target) {
        if (!hasProp(origin, name)) {
            result.append[name] = target[name];
        }
    }
    return result;
}

/**
 * 
 * 
 * @param {String} name
 * @returns {String} 
 */
function exhibitAdjustEvent (name) {
    return cliLower(name.substring(eventPrefix.length));
}

/**
 * 
 * 
 * @param {String} name
 * @returns {String} 
 */
function exhibitAdjustProps (name) {
    return propsMapping[name] || name;
}

/**
 * 
 * 
 * @param {JSX.Element} target 
 * @param {{value:JSX.Element,index:Number}} origin 
 * @returns {Number}
 */
function exhibitAdjustIndex (target, origin) {
    return origin && exhibitJudgeRedrawn(target, origin.value) ? origin.index : -1;
}

/**
 * 
 * 
 * @param {Array.<JSX.Element>} insider 
 * @param {HTMLElement} example 
 * @param {JSX.ElementClass} owner 
 * @param {String} namespace 
 * @param {Manager} current 
 * @param {Array.<Function>} collect 
 * @param {Array.<Manager>} members 
 */
function exhibitAppendChild (insider, example, owner, namespace, current, collect, members) {
    for (var i = 0; i < insider.length; i++) {
        var manager = managerCreator(insider[i], current);
        var realtor = manager.initial(owner, namespace, collect);
        if (realtor.append) {
            domAppendChild(example, realtor.target);
        }
        members.push(manager);
    }
}

/**
 * 
 * 
 * @param {Array.<JSX.Element>} insider 
 * @param {HTMLElement} example 
 * @param {JSX.ElementClass} owner 
 * @param {String} namespace 
 * @param {Manager} current 
 * @param {Array.<Function>} collect 
 * @param {Array.<Manager>} members 
 */
function exhibitChangeChild (insider, example, owner, namespace, current, collect, members) {
    var manager;
    var realtor;
    var appends = [];
    var disturb = false;
    var insiderMap = {};
    var ancientMap = {};
    for (var i = 0; i < insider.length; i++) {
        var el = insider[i];
        var sn = el.key || i;
        insiderMap[sn] = {
            value : el,
            index : i
        };
    }
    for (var i = 0; i < members.length; i++) {
        var el = members[i].element;
        var sn = el.key || i;
        ancientMap[sn] = {
            value : el,
            index : i
        };
    }
    for (var i = 0; i < members.length; i++) {
        var el = members[i].element;
        var sn = el.key || i;
        var number = exhibitAdjustIndex(el, insiderMap[sn]);
        if (number < 0) {
            members[i].dispose();
        }
    }
    for (var i = 0; i < insider.length; i++) {
        var el = insider[i];
        var sn = el.key || i;
        var number = exhibitAdjustIndex(el, ancientMap[sn]);
        if (number < 0) {
            manager = managerCreator(el, current);
            realtor = manager.initial(owner, namespace, collect);
            disturb = true;
        } else {
            manager = members[number];
            realtor = manager.renewal(owner, namespace, collect, el);
        }
        if (disturb || realtor.append || number < i) {
            domAppendChild(example, realtor.target);
        }
        appends.push(manager);
    }
    cliReset(members, appends);
}

/**
 * 
 * 
 * @param {Array.<Manager>} members 
 * @param {JSX.ElementClass} owner 
 */
function exhibitRemoveChild (members, owner) {
    cliClean(members, function (ns) {
        ns.dispose(owner);
    });
}

/**
 * 
 * 
 * @param {any} natures 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {Manager} current 
 * @param {Boolean} connate 
 */
function exhibitAppendProps (natures, example, current, connate) {
    for (var name in natures) {
        if (isStarts(name, eventPrefix)) {
            current.attachEvent(exhibitAdjustEvent(name), natures[name]);
        } else if (connate) {
            domAttachProps(example, exhibitAdjustProps(name), natures[name]);
        }
    }
}

/**
 * 
 * 
 * @param {Variety} variety 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {Manager} current 
 * @param {Boolean} connate 
 */
function exhibitChangeProps (variety, example, current, connate) {
    exhibitRemoveProps(variety.remove, example)
    exhibitAppendProps(variety.append, example, current, connate);
    for (var name in variety.change) {
        if (isStarts(name, eventPrefix)) {
            current.emitter.replace(exhibitAdjustEvent(name), variety.change[name].oldValue, variety.change[name].newValue);
        } else if (connate) {
            domAttachProps(example, exhibitAdjustProps(name), variety.change[name].newValue);
        }
    }
}

/**
 * 
 * 
 * @param {any} natures 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {Manager} current 
 * @param {Boolean} connate 
 */
function exhibitRemoveProps (natures, example, current, connate) {
    for (var name in natures) {
        if (isStarts(name, eventPrefix)) {
            current.detachEvent(exhibitAdjustEvent(name), natures[name]);
        } else if (connate) {
            domDetachProps(example, exhibitAdjustProps(name));
        }
    }
}

/**
 * 
 * 
 * @param {Array} command 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {any} natures 
 * @param {Array} behests 
 */
function exhibitAppendOrder (command, example, natures, behests) {
    for (var i = 0; i < command.length; i++) {
        var dictate = singlesCreator(command[i]);
        if (dictate[cycleInitial]) {
            dictate[cycleInitial](example, natures);
        }
        behests.push(dictate);
    }
}

/**
 * 
 * 
 * @param {Array} command 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {any} natures 
 * @param {Array} behests 
 */
function exhibitChangeOrder (command, example, natures, behests) {
    var appends = [];
    for (var i = 0; i < behests.length; i++) {
        var sn = commandIndex(behests[i]);
        if (sn < 0) {
            if (behests[i][cycleDispose]) {
                behests[i][cycleDispose](example, natures);
            }
        }
    }
    for (var i = 0; i < command.length; i++) {
        var sn = behestsIndex(command[i]);
        if (sn < 0) {
            var dictate = singlesCreator(command[i]);
            if (dictate[cycleInitial]) {
                dictate[cycleInitial](example, natures);
            }
            appends.push(dictate);
        } else {
            appends.push(behests[sn]);
        }
    }
    cliReset(behests, appends);
    function commandIndex (target) {
        for (var i = 0; i < command.length; i++) {
            if (target instanceof command[i]) {
                return i;
            }
        }
        return -1;
    }
    function behestsIndex (target) {
        for (var i = 0; i < behests.length; i++) {
            if (behests[i] instanceof target) {
                return i;
            }
        }
        return -1;
    }
}

/**
 * 
 * 
 * @param {Array} behests 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {any} natures
 */
function exhibitRemoveOrder (behests, example, natures) {
    cliClean(behests, function (ns) {
        if (ns[cycleDispose]) {
            ns[cycleDispose](example, natures);
        }
    });
}

/**
 * 
 * 
 * @param {String} referee 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {JSX.ElementClass} owner 
 */
function exhibitAppendRefer (referee, example, owner) {
    if (referee) {
        owner.refs[referee] = example;
    }
}

/**
 * 
 * 
 * @param {String} ancient 
 * @param {String} referee 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {JSX.ElementClass} owner 
 */
function exhibitChangeRefer (ancient, referee, example, owner) {
    if (ancient !== referee) {
        exhibitRemoveRefer(ancient, owner);
        exhibitAppendRefer(referee, example, owner);
    }
}

/**
 * 
 * 
 * @param {String} referee 
 * @param {JSX.ElementClass} owner 
 */
function exhibitRemoveRefer (referee, owner) {
    if (referee) {
        delete owner.refs[referee];
    }
}

/**
 * 
 * 
 * @param {JSX.ElementClass} example 
 * @param {Array} collect 
 */
function invokeInitialCycle (example, collect) {
    if (example[cycleInitial]) {
        collect.push(example[cycleInitial].bind(example));
    }
}

/**
 * 
 * 
 * @param {JSX.ElementClass} example 
 */
function invokeDisposeCycle (example) {
    if (example[cycleDispose]) {
        example[cycleDispose]();
    }
}

/**
 * 
 * 
 * @param {Emitter} emitter 
 * @param {JSX.ElementClass | HTMLElement} example 
 * @param {Boolean} connate 
 */
function exhibitHollowEvent (emitter, example, connate) {
    emitter.dispose(function (type) {
        connate && domDetachEvent(example, type, exhibitEventHandler);
    });
}

/**
 * 
 * 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function exhibitAttachEvent (type, listener) {
    /**
     * @type {Manager}
     */
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    if (emitter.enqueue(type, listener) && connate) {
        domAttachEvent(example, type, exhibitEventHandler);
    }
}

/**
 * 
 * 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function exhibitDetachEvent (type, listener) {
    /**
     * @type {Manager}
     */
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    if (emitter.unqueue(type, listener) && connate) {
        domDetachEvent(example, type, exhibitEventHandler);
    }
}

/**
 * 
 * 
 * @param {Elf.Event} event 
 * @param {Boolean} present 
 */
function exhibitSpreadEvent (event, present) {
    /**
     * @type {Manager}
     */
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    var creator = current.creator;
    if (connate === present) {
        if (emitter.contain(event.type)) {
            emitter.trigger(event.type,
                cliApply(example, Elf.assign({}, event, { currentTarget : example }))
            );
        }
    }
    if (event.bubbles) {
        creator.trigger(event, present);
    }
}

/**
 * 
 * 
 * @param {Elf.Event} event 
 */
function exhibitInvokeEvent (event) {
    /**
     * @type {Manager}
     */
    var current = this;
    var connate = current.connate;
    var example = current.example;
    event.target = example;
    current.trigger(event, connate);
}

/**
 * 
 * @param {Array[]} depends
 * @returns {Function}
 */
function exhibitDependStore (depends) {
    return function (ns) {
        depends.forEach(function (i) {
            if (hasProp(ns, i[0])) {
                defProp(i[1], ns[i[0]], ns);
            }
        });
    };
}

/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

/**
 * 
 * 
 * @param {Function} executor 
 * @returns {Elf.Promise}
 */
function promiseCreator (executor) {
    return new promiseProto.constructor(executor);
}

/**
 * 
 * 
 * @param {Elf.Class.<T>} trustor 
 * @returns {T}
 * @template T
 */
function singlesCreator (trustor) {
    return trustor[symbolSingleton] || (trustor[symbolSingleton] = new trustor());
}

/**
 * 
 * 
 * @param {HTMLElement} element 
 * @returns {Manager}
 */
function radicalCreator (element) {
    return {
        trigger : function (event, present) {
            present && domBubbleEvent(element, event.originalEvent);
        }
    };
}

/**
 * 
 * 
 * @param {JSX.Element} element 
 * @param {Manager} creator 
 * @returns {Manager}
 */
function managerCreator (element, creator) {
    return Object.create(
        isValid(element)
        ? isObject(element)
        ? isString(element.type)
        ? elementProto
        : complexProto
        : contentProto
        : commentProto
        , {
            element : newProp(element),
            creator : newProp(creator)
        }
    );
}

/**
 * 
 * 
 * @param {Function} trustor 
 * @param {any} attribute 
 * @param {any} manager 
 * @returns {JSX.ElementClass}
 */
function exampleCreator (trustor, attribute, manager) {
    var example = Object.create(trustor.prototype);
    defProp(example, symbolRenderer, manager);
    defProp(example, "props", attribute);
    defProp(example, "refs", {});
    example.constructor();
    return example;
}

/**
 * 
 * 
 * @param {String} trustor 
 * @param {String} namespace 
 * @param {any} manager 
 * @returns {HTMLElement}
 */
function elementCreator (trustor, namespace, manager) {
    var example = domCreateElement(trustor, namespace);
    defProp(example, symbolRenderer, manager);
    return example;
}

/**
 * 
 * 
 * @returns {Emitter}
 */
function emitterCreator () {
    var example = {};
    return {
        contain : function (type) {
            return hasEmitter(type) && example[type].length > 0;
        },
        enqueue : function (type, listener) {
            return defEmitter(type) && cliPlus(example[type], listener);
        },
        unqueue : function (type, listener) {
            return hasEmitter(type) && cliLess(example[type], listener);
        },
        replace : function (type, oldValue, newValue) {
            if (hasEmitter(type)) {
                var number = example[type].indexOf(oldValue);
                if (number >= 0) {
                    example[type].splice(number, 1, newValue);
                }
            }
        },
        trigger : function (type, fn) {
            if (hasEmitter(type)) {
                example[type].forEach(function (ns) {
                    fn(isObject(ns) ? ns.handleEvent.bind(ns) : ns);
                });
            }
        },
        dispose : function (fn) {
            Object.keys(example).forEach(fn);
            example = {};
        }
    };
    function defEmitter (type) {
        return example[type] || (example[type] = []);
    }
    function hasEmitter (type) {
        return example[type];
    }
}


/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

var win = window;
var doc = document;
var loc = location;
var noop = function () {};
var head = doc.querySelector("head");
var code = doc.createElement("code");

var namespace1 = "http://www.w3.org/2000/svg";
var namespace2 = "http://www.w3.org/2000/MathML";

var regex_deps = /(?:\b|(\.)\s*)require\s*\(\s*(?:"([^"]+)"|'([^']+)')\s*\)/;
var regex_prop = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>/=]+)))?/;
var regex_loop = /([^\s].*)\s+(?:in|of)\s+(.*[^\s])/;
var regex_pipe = /([\w]+)(?:\s+([\s\S]*)?)?/;
var regex_ling = /[,\s]*([^,\s]+)[,\s]*/;
var regex_name = /[-:\w]+/;
var regex_huge = /[A-Z]/g;

var tagElementOpen = "<";
var tagClosureOpen = "</";
var tagCommentOpen = "<!--";
var tagCommentFold = "--";
var tagElementFold = ">";

var natureLoad = "load";
var natureType = "type";
var natureFail = "error";
var natureLink = "src";

var statusPending  = "pending";
var statusResolved = "resolved";
var statusRejected = "rejected";

var symbolDispose   = wadProp("elf:dispose");
var symbolSuccess   = wadProp("elf:success");
var symbolFailure   = wadProp("elf:failure");
var symbolProcess   = wadProp("elf:process");
var symbolContent   = wadProp("elf:content");

var symbolListener  = wadProp("elf:listener");
var symbolRenderer  = wadProp("elf:renderer");
var symbolTransform = wadProp("elf:transform");
var symbolDirective = wadProp("elf:directive");
var symbolComponent = wadProp("elf:component");
var symbolSingleton = wadProp("elf:singleton");

var eventPrefix  = "on";
var cycleInitial = eventPrefix + "Initial";
var cycleDispose = eventPrefix + "Dispose";

/**
 * 
 * @type {{[x:string]:Elf.Promise<Elf.Provide>}}
 */
var amdModules = {};
/**
 * 
 * 
 * @type {Elf.Options}
 */
var amdOptions = {};

var actMonitor = [];
var actLeisure = true;

var transformDep = {};
var directiveDep = {};
var componentDep = {};

var propsMapping = {
    autoFocus: "autofocus",
    autoPlay: "autoplay",
    "class": "className",
    "for": "htmlFor",
    novalidate: "noValidate",
    formnovalidate: "formNoValidate",
    readonly: "readOnly",

    accentHeight: "accent-height",
    acceptCharset: "accept-charset",
    alignmentBaseline: "alignment-baseline",
    altimgHeight: "altimg-height",
    altimgValign: "altimg-valign",
    altimgWidth: "altimg-width",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    httpEquiv: "http-equiv",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDasharray: "stroke-dasharray",
    strokeDashoffset: "stroke-dashoffset",
    strokeLinecap: "stroke-linecap",
    strokeLinejoin: "stroke-linejoin",
    strokeMiterlimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",

    xlinkActuate: "xlink:actuate",
    xlinkArcrole: "xlink:arcrole",
    xlinkHref: "xlink:href",
    xlinkRole: "xlink:role",
    xlinkShow: "xlink:show",
    xlinkTitle: "xlink:title",
    xlinkType: "xlink:type",
    xmlBase: "xml:base",
    xmlSpace: "xml:space"
};
var propsSpecial = {
    async: 2,
    autofocus: 2,
    autoplay: 2,
    checked: 2,
    className: 3,
    controls: 2,
    "default": 2,
    defaultValue: 3,
    defaultChecked: 2,
    defer: 2,
    disabled: 2,
    hidden: 2,
    htmlFor: 3,
    innerHTML: 3,
    loop: 2,
    multiple: 2,
    muted: 2,
    noValidate: 2,
    formNoValidate: 2,
    open: 2,
    readOnly: 2,
    required: 2,
    reversed: 2,
    scoped: 2,
    selected: 2,
    style: 1,
    value: 3,

    children: 9
};
var eventNatures = {
    altKey: 0,
    animationName: 0,
    bubbles: 0,
    button: 0,
    buttons: 0,
    cancelable: 0,
    changedTouches: 0,
    charCode: 0,
    clientX: 0,
    clientY: 0,
    clipboardData: 0,
    ctrlKey: 0,
    data: 0,
    dataTransfer: 0,
    defaultPrevented: 0,
    deltaMode: 0,
    deltaX: 0,
    deltaY: 0,
    deltaZ: 0,
    detail: 0,
    elapsedTime: 0,
    eventPhase: 0,
    isTrusted: 0,
    key: 0,
    keyCode: 0,
    locale: 0,
    location: 0,
    metaKey: 0,
    pageX: 0,
    pageY: 0,
    propertyName: 0,
    pseudoElement: 0,
    relatedTarget: 0,
    repeat: 0,
    screenX: 0,
    screenY: 0,
    shiftKey: 0,
    target: 0,
    targetTouches: 0,
    timeStamp: 0,
    touches: 0,
    type: 0,
    which: 0
};
var xhtmlFoliage = {
    area: 0,
    base: 0,
    br: 0,
    col: 0,
    embed: 0,
    hr: 0,
    img: 0,
    input: 0,
    keygen: 0,
    link: 0,
    menuitem: 0,
    meta: 0,
    param: 0,
    source: 0,
    track: 0,
    wbr: 0
};

var trustorProto = {
    js   : function (value, modname) {
        return new Function("define", requireFormat(value) + "\n//# sourceURL=" + modname)(requireDefine(modname)), amdModules[modname];
    },
    css  : function (value, modname) {
        var text = domCreateContent(value);
        var node = domCreateElement("style");
        domAttachProps(node, natureType, "text/css");
        domAppendChild(node, text);
        domAppendChild(head, node);
        return rawMode(node, modname);
    },
    json : function (value, modname) {
        return rawMode(asObject(value), modname);
    }
};
var promiseProto = {
    constructor  : function (executor) {
        defProp(this, symbolProcess, statusPending);
        defProp(this, symbolSuccess, []);
        defProp(this, symbolFailure, []);
        defProp(this, symbolContent);
        try {
            defProp(this, symbolDispose, executor(
                promiseDone.bind(this),
                promisePoor.bind(this)
            ));
        } catch (error) {
            promisePoor.call(this, error);
            console.error(error);
        }
    },
    then         : function (onresolved, onrejected) {
        return promiseCreator(function (resolve, reject) {
            onresolved = onresolved || promiseNoop.bind(this);
            onrejected = onrejected || promiseNoop.bind(this);
            if (this[symbolProcess] === statusPending) {
                var clearResolved = cliPush(this[symbolSuccess], function (value) {
                    promiseThen(onresolved(value), resolve, reject);
                });
                var clearRejected = cliPush(this[symbolFailure], function (error) {
                    promiseFail(onrejected(error), resolve, reject);
                });
                return function () {
                    clearResolved();
                    clearRejected();
                };
            }
            if (this[symbolProcess] === statusResolved) {
                return promiseThen(onresolved(this[symbolContent]), resolve, reject);
            }
            if (this[symbolProcess] === statusRejected) {
                return promiseFail(onrejected(this[symbolContent]), resolve, reject);
            }
        }.bind(this));
    },
    catch        : function (onrejected) {
        return this.then(null, onrejected);
    },
    dispose      : function () {
        if (this[symbolDispose]) {
            this[symbolDispose].apply(this, arguments);
        }
    }
};
var complexProto = {
    initial : function (owner, namespace, collect) {
        /**
         * @type {Manager}
         */
        var current = this;
        var element = current.element;
        var natures = element.props;
        var trustor = element.type;
        var command = element.cmd;
        var referee = element.ref;
        var connate = false;

        var behests = [];
        var emitter = emitterCreator();
        var example = exampleCreator(trustor, natures, current);
        var manager = managerCreator(example.render(), current);
        var realtor = manager.initial(example, namespace, collect);

        current.connate = connate;
        current.behests = behests;
        current.emitter = emitter;
        current.example = example;
        current.manager = manager;

        invokeInitialCycle(example, collect);
        exhibitAppendRefer(referee, example, owner);
        exhibitAppendProps(natures, example, current, connate);
        exhibitAppendOrder(command, example, natures, behests);

        return realtor;
    },
    renewal : function (owner, namespace, collect, element) {
        /**
         * @type {Manager}
         */
        var current = this;
        var ancient = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var manager = current.manager;
        var natures = element.props;
        var referee = element.ref;
        var realtor;

        current.element = element;
        example.props   = natures;

        var nextElement = example.render();
        var nextVariety = exhibitGroupVariety(natures, ancient.props);

        if (exhibitJudgeRedrawn(nextElement, manager.element)) {
            realtor = manager.renewal(owner, namespace, collect, nextElement);
        } else {
            manager.dispose();
            manager = managerCreator(nextElement, current);
            realtor = manager.initial(example, namespace, collect);
            current.manager = manager;
        }

        exhibitChangeProps(nextVariety, example, current, connate);
        exhibitChangeOrder(element.cmd, example, natures, behests);
        exhibitChangeRefer(ancient.ref, referee, example, owner);

        return realtor;
    },
    dispose : function (owner) {
        /**
         * @type {Manager}
         */
        var current = this;
        var element = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var emitter = current.emitter;
        var manager = current.manager;
        var natures = element.props;
        var referee = element.ref;
        invokeDisposeCycle(example);
        exhibitRemoveRefer(referee, owner);
        exhibitRemoveOrder(behests, example, natures);
        exhibitHollowEvent(emitter, example, connate);
        manager.dispose(example);
    },
    trigger      : exhibitSpreadEvent,
    attachEvent  : exhibitAttachEvent,
    detachEvent  : exhibitDetachEvent,
    dispatchEvent: exhibitInvokeEvent
};
var elementProto = {
    initial : function (owner, namespace, collect) {
        /**
         * @type {Manager}
         */
        var current = this;
        var element = current.element;
        var natures = element.props;
        var insider = natures.children;
        var trustor = element.type;
        var command = element.cmd;
        var referee = element.ref;
        var connate = true;

        if (trustor === "svg") {
            namespace = namespace1;
        }
        if (trustor === "math") {
            namespace = namespace2;
        }

        var members = [];
        var behests = [];
        var emitter = emitterCreator();
        var example = elementCreator(trustor, namespace, current);

        current.connate = connate;
        current.members = members;
        current.behests = behests;
        current.emitter = emitter;
        current.example = example;

        exhibitAppendChild(insider, example, owner, namespace, current, collect, members);
        exhibitAppendProps(natures, example, current, connate);
        exhibitAppendOrder(command, example, natures, behests);
        exhibitAppendRefer(referee, example, owner);

        return {
            append : true,
            target : example
        };
    },
    renewal : function (owner, namespace, collect, element) {
        /**
         * @type {Manager}
         */
        var current = this;
        var ancient = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var members = current.members;
        var natures = element.props;
        var trustor = element.type;
        var referee = element.ref;

        if (trustor === "svg") {
            namespace = namespace1;
        }
        if (trustor === "math") {
            namespace = namespace2;
        }

        current.element = element;

        var nextInsider = natures.children;
        var nextVariety = exhibitGroupVariety(natures, ancient.props);

        exhibitChangeChild(nextInsider, example, owner, namespace, current, collect, members);
        exhibitChangeProps(nextVariety, example, current, connate);
        exhibitChangeOrder(element.cmd, example, natures, behests);
        exhibitChangeRefer(ancient.ref, referee, example, owner);

        return {
            append : false,
            target : example
        };
    },
    dispose : function (owner) {
        /**
         * @type {Manager}
         */
        var current = this;
        var element = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var members = current.members;
        var example = current.example;
        var emitter = current.emitter;
        var natures = element.props;
        var referee = element.ref;
        exhibitRemoveRefer(referee, owner);
        exhibitRemoveChild(members, owner);
        exhibitRemoveOrder(behests, example, natures);
        exhibitHollowEvent(emitter, example, connate);
        domRemoveChild(example);
    },
    trigger      : exhibitSpreadEvent,
    attachEvent  : exhibitAttachEvent,
    detachEvent  : exhibitDetachEvent,
    dispatchEvent: exhibitInvokeEvent
};
var contentProto = {
    initial : function (owner, namespace, collect) {
        /**
         * @type {Manager}
         */
        var current = this;
        var element = current.element;
        var example = domCreateContent(element);

        current.example = example;

        return {
            append : true,
            target : example
        };
    },
    renewal : function (owner, namespace, collect, element) {
        /**
         * @type {Manager}
         */
        var current = this;
        var example = current.example;
        var ancient = current.element;
        if (ancient !== element) {
            current.element = element;
            example.textContent = element;
        }
        return {
            append : false,
            target : example
        };
    },
    dispose : function (owner) {
        domRemoveChild(this.example);
    }
};
var commentProto = {
    initial : function (owner, namespace, collect) {
        return {
            append : true,
            target : this.example = domCreateComment("")
        };
    },
    renewal : function (owner, namespace, collect, element) {
        return {
            append : false,
            target : this.example
        };
    },
    dispose : function (owner) {
        domRemoveChild(this.example);
    }
};

var promiseConstructor       = promiseProto.constructor;
promiseConstructor.prototype = promiseProto;
promiseConstructor.resolve   = promiseNext;
promiseConstructor.reject    = promiseLoss;
promiseConstructor.ajax      = promiseAjax;
promiseConstructor.race      = promiseRace;
promiseConstructor.all       = promiseWhen;

/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */
/* ============================= */

Elf.Trustor = trustorProto;
Elf.Promise = promiseConstructor;

/**
 * 
 * 
 * @param {String} modname
 * @returns {Elf.Promise}
 */
Elf.require = function (modname) {
    return requireImport(amdOptions.baseURL || "/")(modname);
};

/**
 * 
 * 
 * @param {Function} fn
 * @param {Number} duration
 * @returns {Elf.Destruction}
 */
Elf.setTimeout  = function (fn, duration) {
    return { dispose : clearTimeout.bind(win, setTimeout(cliWrap(fn, asArray.call(arguments, 2)), duration)) };
};

/**
 * 
 * 
 * @param {Function} fn
 * @param {Number} duration
 * @returns {Elf.Destruction}
 */
Elf.setInterval = function (fn, duration) {
    return { dispose : clearInterval.bind(win, setInterval(cliWrap(fn, asArray.call(arguments, 2)), duration)) };
};

/**
 * 
 * 
 * @param {Function} fn
 * @returns {Elf.Destruction}
 */
Elf.requestAnimationFrame = function (fn) {
    return { dispose : cancelAnimationFrame.bind(win, requestAnimationFrame(cliWrap(fn, asArray.call(arguments, 1)))) };
};

/**
 * 
 * 
 * @returns {Boolean}
 */
Elf.forceUpdate   = function () {
    return actBroadcast();
};

/**
 * 
 * 
 * @param {String} type
 * @param {Boolean} bubbles
 * @param {any} value
 * @returns {Elf.Event}
 */
Elf.createEvent   = function (type, bubbles, value) {
    return {
        type            : cliLower(type),
        bubbles         : !!bubbles,
        refresh         : false,
        cancelable      : false,
        defaultPrevented: false,
        preventDefault  : noop,
        target          : null,
        preventRefresh  : exhibitEventRefersh,
        stopPropagation : exhibitEventBubbles,
        value           : value
    };
};

/**
 * 
 * 
 * @param {HTMLElement | JSX.ElementClass} node
 * @param {String} type
 * @param {EventListenerOrEventListenerObject} listener
 */
Elf.attachEvent   = function (node, type, listener) {
    if (hasProp(node, symbolRenderer)) {
        node[symbolRenderer].attachEvent(type, listener);
    } else {
        domAttachEvent(node, type, listener, true);
    }
};

/**
 * 
 * 
 * @param {HTMLElement | JSX.ElementClass} node
 * @param {String} type
 * @param {EventListenerOrEventListenerObject} listener
 */
Elf.detachEvent   = function (node, type, listener) {
    if (hasProp(node, symbolRenderer)) {
        node[symbolRenderer].detachEvent(type, listener);
    } else {
        domDetachEvent(node, type, listener, true);
    }
};

/**
 * 
 * 
 * @param {HTMLElement | JSX.ElementClass} node
 * @param {Elf.Event} event
 */
Elf.dispatchEvent = function (node, event) {
    if (hasProp(node, symbolRenderer)) {
        node[symbolRenderer].dispatchEvent(event);
    } else {
        domBubbleEvent(node, event.originalEvent || event);
    }
};

/**
 * 
 * 
 * @param {String | Elf.Class<JSX.ElementClass>} type
 * @param {any} props
 * @returns {JSX.Element}
 */
Elf.createElement = function (type, props) {
    var natures = props || [];
    var insider = cliFlat(asArray.call(arguments, 2));

    var element = {
        props   : {},
        type    : type,
        cmd     : natures.cmd || [],
        key     : natures.key,
        ref     : natures.ref
    };
    for (var name in natures) {
        if (name !== "cmd" &&
            name !== "key" &&
            name !== "ref" &&
            isValid(natures[name])) {
            element.props[name] = natures[name];
        }
    }
    defProp(element.props, "children", insider);
    Object.freeze(element.props);
    return element;
};

/**
 * 
 * 
 * @param {String} temp
 * @returns {Function}
 */
Elf.redactElement = function (temp) {
    var transformDep = {};
    var directiveDep = {};
    var componentDep = {};
    cliFlat(asArray.call(arguments, 1)).forEach(exhibitDependStore([
        [symbolTransform, transformDep],
        [symbolDirective, directiveDep],
        [symbolComponent, componentDep]
    ]));
    return (function (provide, trustor) {
        return function () {
            return trustor.call(isValid(this) && this !== win ? this : {}, provide);
        };
    } ({
        v : Elf.createElement,
        t : expPipe(transformDep),
        d : expLing(directiveDep),
        c : expName(componentDep),
        m : expLoop
    }, new Function("Elf", "with(this){return " + ganAstElement(tplHtmlParser(temp.trim())) + "}")));
};

/**
 * 
 * 
 * @param {T}
 * @returns {Elf.Class<T>}
 * @template T
 */
Elf.createClass   = function (proto) {
    return (function (constructor) {
        return constructor.prototype = proto, constructor;
    } (
        (function (parent) {
            return function () { parent.apply(this, arguments); };
        } (proto.constructor || noop))
    ));
};

/**
 * 
 * 
 * @param {String} name
 * @returns {Elf.ClassDecorator}
 */
Elf.Transform = function (name) {
    return function (target) {
        return defProp(target, symbolTransform, name);
    };
};

/**
 * 
 * 
 * @param {String} name
 * @returns {Elf.ClassDecorator}
 */
Elf.Directive = function (name) {
    return function (target) {
        return defProp(target, symbolDirective, name);
    };
};

/**
 * 
 * 
 * @param {String} name
 * @param {Function} redactor
 * @returns {Elf.ClassDecorator}
 */
Elf.Component = function (name, redactor) {
    return function (target) {
        if (redactor) {
            target.prototype.render = redactor;
        }
        return defProp(target, symbolComponent, name);
    };
};

/**
 * 
 * 
 */
Elf.depend = function () {
    cliFlat(asArray.call(arguments)).forEach(exhibitDependStore([
        [symbolTransform, transformDep],
        [symbolDirective, directiveDep],
        [symbolComponent, componentDep]
    ]));
};

/**
 * 
 * 
 * @param {JSX.Element} element
 * @param {HTMLElement} container
 * @param {Boolean} duplex
 * @returns {Elf.Application}
 */
Elf.render = function (element, container, duplex) {
    var example = {
        refs        : {},
        duplex      : !!duplex,
        dispose     : function () {
            monitor.dispose();
            manager.dispose();
        },
        forceUpdate : function () {
            sapInsertion(manager.renewal(example, null, collect, element), container);
            sapExplosion(collect);
        }
    };
    var collect = [];
    var monitor = actSubscribe(example);
    var creator = radicalCreator(container);
    var manager = managerCreator(element, creator);
    sapInsertion(manager.initial(example, null, collect), container);
    sapExplosion(collect);
    return example;
};

/**
 * 
 * 
 * @param {any} target
 * @returns {any}
 */
Elf.assign = (Object.assign || function (target) {
    var insider = asArray.call(arguments, 1);
    for (var i = 0; i < insider.length; i++) {
        for (var name in insider[i]) {
            target[name] = insider[i][name];
        }
    }
    return target;
}).bind(Object);

/**
 * 
 * 
 * @param {Elf.Options} options
 */
Elf.config = function (options) {
    amdOptions = options;
};

/**
 * 
 * 
 * @param {String} modname
 * @param {any} value
 */
Elf.set    = function (modname, value) {
    amdModules[modname] = rawMode(value, modname);
};

} (this.Elf = {}));