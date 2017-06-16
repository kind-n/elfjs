/**
 * elf.js
 * 
 * @copyright http://www.elfjs.org
 * 
 * @version 0.0.1
 * @license MIT
 * 
 */
"use strict";
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */

! (function (Elf) {

function AS_ARRAY  () {
    return Array.prototype.slice.apply(this, arguments);
}
function IS_ARRAY  (target) {
    return Array.isArray(target);
}
function IS_ACTUAL (target) {
    return target !== void 0 && target !== null;
}
function IS_OBJECT (target) {
    return IS_ACTUAL(target) && typeof target === "object";
}
function IS_STRING (target) {
    return IS_ACTUAL(target) && typeof target === "string";
}
function IS_STARTS (target, value, current) {
    var number = current || 0;
    var length = value.length;
    for (var i = 0; i < length; i++) {
        if (value.charAt(i) !== target.charAt(number + i)) {
            return false;
        }
    }
    return true;
}

function TO_OBJECT (target) {
    return JSON.parse(target);
}
function TO_STRING (target) {
    return JSON.stringify(target);
}
function UN_ESCAPE (target) {
    CODE.innerHTML = target;
    return CODE.textContent;
}


function HAS_PROP  (target, name) {
    return target.hasOwnProperty(name);
}
function DEF_PROP  (target, name, value, enumerable) {
    return Object.defineProperty(target, name, NEW_PROP(value, enumerable));
}
function NEW_PROP  (target, enumerable) {
    return {
        configurable: true,
        enumerable: !!enumerable,
        writable: true,
        value: target
    };
}


function FUN_WRAP  (fn) {
    return function () {
        return fn() || ACT_BROADCAST();
    };
}
function FUN_FLAT  (target) {
    var result = [];
    var length = target.length;
    for (var i = 0; i < length; i++) {
        var ns = target[i];
        if (IS_ARRAY(ns)) {
            result.push.apply(result, FUN_FLAT(ns));
        } else {
            if (IS_ACTUAL(ns)) {
                result.push(ns);
            }
        }
    }
    return result;
}
function FUN_PUSH  (target, value) {
    FUN_RAISE(target, value);
    return function () {
        FUN_MINUS(target, value);
    };
}


function FUN_EQUAL (target, origin) {
    if (IS_OBJECT(target) && IS_OBJECT(origin)) {
        for (var name in target) {
            if (!HAS_PROP(origin, name)) {
                return false;
            }
            if (!FUN_EQUAL(target[name], origin[name])) {
                return false;
            }
        }
        for (var name in origin) {
            if (!HAS_PROP(target, name)) {
                return false;
            }
        }
        return true;
    }
    return target === origin;
}
function FUN_RAISE (target, value) {
    var index = target.indexOf(value);
    if (index === -1) {
        target.push(value);
        return target.length === 1;
    }
}
function FUN_MINUS (target, value) {
    var index = target.indexOf(value);
    if (index !== -1) {
        target.splice(index, 1);
        return target.length === 0;
    }
}
function FUN_APPLY (target, flags) {
    return function (fn) {
        fn.apply(target, flags || []);
    };
}
function FUN_CLEAN (target, fn) {
    while (target.length) {
        fn(target.pop());
    }
}
function FUN_INDEX (target, fn) {
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
function FUN_LOWER (target) {
    return target.toLowerCase();
}

/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */


function XHR_ASYNC (request, referee) {
    var XHR_SUCCESS = "load";
    var XHR_FAILURE = "error";
    var XHR_CONTENT = "Content-Type";
    var XHR_REQUEST = "X-Requested-With";
    var XHR_FASHION = request.method || "GET";
    var XHR_HEADERS = request.headers || {};
    var XHR_EXAMPLE = new XMLHttpRequest();
    XHR_EXAMPLE.open(XHR_FASHION.toUpperCase(), request.url, true);
    DOM_ATTACH_EVENT(XHR_EXAMPLE, XHR_SUCCESS, XHR_RESOLVED);
    DOM_ATTACH_EVENT(XHR_EXAMPLE, XHR_FAILURE, XHR_REJECTED);
    if (!HAS_PROP(XHR_HEADERS, XHR_CONTENT)) {
        XHR_AFFIX(XHR_EXAMPLE, XHR_CONTENT, "application/x-www-form-urlencoded; charset=UTF-8");
    }
    if (!HAS_PROP(XHR_HEADERS, XHR_REQUEST)) {
        XHR_AFFIX(XHR_EXAMPLE, XHR_REQUEST, "XMLHttpRequest");
    }
    for (var name in XHR_HEADERS) {
        XHR_AFFIX(XHR_EXAMPLE, name, XHR_HEADERS[name]);
    }
    XHR_EXAMPLE.send(request.body);
    return function () {
        DOM_DETACH_EVENT(XHR_EXAMPLE, XHR_SUCCESS, XHR_RESOLVED);
        DOM_DETACH_EVENT(XHR_EXAMPLE, XHR_FAILURE, XHR_REJECTED);
        XHR_EXAMPLE.abort();
    };
    function XHR_RESOLVED () {
        var result = XHR_EXAMPLE.responseText;
        var status = XHR_EXAMPLE.status === 1223 ? 200 : XHR_EXAMPLE.status;
        if (status === 0) {
            status = result ? 200 : 0;
        }
        var headers = {};
        var content = (XHR_EXAMPLE.getAllResponseHeaders() || "").trim();
        if (content) {
            content.split("\n").forEach(function (i) {
                var l = i.trim().split(":");
                var m = l.shift().trim();
                var n = l.join(":").trim();
                headers[m] = n;
            });
        }
        if (200 <= status && status < 300) {
            referee.next({
                status  : status,
                headers : headers,
                text    : function () {
                    return result;
                },
                json    : function () {
                    return TO_OBJECT(result);
                }
            });
        } else {
            referee.loss(XHR_EXAMPLE);
        }
        ACT_BROADCAST();
    }
    function XHR_REJECTED () {
        referee.loss(XHR_EXAMPLE);
        ACT_BROADCAST();
    }
}
function XHR_JSONP (request, referee) {
    var XHR_CALLBACK = "Elf" + (Math.random() * 1e9 | 0);
    var XHR_HOSTNODE = DOM_CREATE_ELEMENT("script");
    WIN[XHR_CALLBACK]= XHR_RESOLVED;
    DOM_ATTACH_EVENT(XHR_HOSTNODE, "error", XHR_REJECTED);
    DOM_ATTACH_PROPS(XHR_HOSTNODE, "type" , "text/javascript");
    DOM_ATTACH_PROPS(XHR_HOSTNODE, "src"  , request.url);
    DOM_APPEND_CHILD(HEAD, XHR_HOSTNODE);
    return function () {
        if (WIN[XHR_CALLBACK]) {
            WIN[XHR_CALLBACK] = NOOP;
        }
        DOM_REMOVE_CHILD(XHR_HOSTNODE);
    };
    function XHR_RESOLVED (value) {
        delete WIN[XHR_CALLBACK];
        referee.next({
            status  : 200,
            headers : {},
            text    : function () {
                return TO_STRING(value);
            },
            json    : function () {
                return value;
            }
        });
        ACT_BROADCAST();
    }
    function XHR_REJECTED (error) {
        delete WIN[XHR_CALLBACK];
        referee.loss(error);
        ACT_BROADCAST();
    }
}
function XHR_AFFIX (request, name, value) {
    request.setRequestHeader(name, value);
}


function ACT_BROADCAST () {
    if (CONST_ACT_LEISURE) {
        CONST_ACT_LEISURE = false;
        WIN.setTimeout(function () {
            CONST_ACT_MONITOR.forEach(FUN_APPLY());
            CONST_ACT_LEISURE = true;
        });
    }
}
function ACT_SUBSCRIBE (value) {
    return { dispose : FUN_PUSH(CONST_ACT_MONITOR, value) };
}


function DOM_CREATE_COMMENT (trustor) {
    return DOC.createComment(trustor);
}
function DOM_CREATE_CONTENT (trustor) {
    return DOC.createTextNode(trustor);
}
function DOM_CREATE_ELEMENT (trustor, namespace) {
    return namespace ? DOC.createElementNS(namespace, trustor) : DOC.createElement(trustor);
}


function DOM_APPEND_CHILD (element) {
    FUN_FLAT(AS_ARRAY.call(arguments, 1)).forEach(element.appendChild, element);
}
function DOM_REMOVE_CHILD (element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}
function DOM_HOLLOW_CHILD (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function DOM_BUBBLE_EVENT (element, event) {
    element.dispatchEvent(new event.constructor(event.type, event));
}
function DOM_ATTACH_EVENT (element, type, listener) {
    element.addEventListener(type, listener, false);
}
function DOM_DETACH_EVENT (element, type, listener) {
    element.removeEventListener(type, listener, false);
}
function DOM_ATTACH_PROPS (element, name, value) {
    switch (CONST_PROPS_SPECIAL[name] || 0) {
        case 0:
            element.setAttribute(name, value);
            break;
        case 1:
            element[name].cssText = DOM_FORMAT_STYLE(value);
            break;
        case 2:
            element[name] = (value === false) ? value : true;
            break;
        case 3:
            element[name] = value;
            break;
    }
}
function DOM_DETACH_PROPS (element, name) {
    switch (CONST_PROPS_SPECIAL[name] || 0) {
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
function DOM_FORMAT_STYLE (value) {
    if (IS_OBJECT(value)) {
        return EXHIBIT_ENGINE_LOOPS(value, function (value, name) {
            return name.replace(REG_UPPER, function (value) {
                return "-" + FUN_LOWER(value);
            }) + ":" + value;
        }).join(";");
    }
    return value;
}



function TPL_QNAME_PARSER (temp) {
    return temp.match(REG_QNAME)[0];
}
function TPL_LOOPS_PARSER (temp) {
    var expr = temp.match(REG_LOOPS);
    if (expr) {
        return { keys: expr[1], body: expr[2] };
    }
    console.error("[Elf error]: Invalid elf-each expression: " + temp);
}
function TPL_PROPS_PARSER (temp) {
    var result = { props: {} };
    for (var expr; expr = temp.match(REG_PROPS); temp = temp.substr(expr[0].length)) {
        var name = expr[1];
        var text = expr[3] || expr[4] || expr[5] || "";
        if (name === "elf-each") {
            result.each = TPL_LOOPS_PARSER(text);
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
function TPL_XHTML_PARSER (temp) {
    var level = 0;
    var queue = [];
    var roots = [];
    var number = 0;
    var length = temp.length;
    while (number < length) {
        if (TPL_COMMENT_START(number)) {
            TPL_COMMENT_PARSE(number, number = TPL_COMMENT_CLOSE(number + 4) + 3);
            continue;
        }
        if (TPL_CLOSURE_START(number)) {
            TPL_CLOSURE_PARSE(number, number = TPL_ELEMENT_CLOSE(number + 2) + 1);
            continue;
        }
        if (TPL_ELEMENT_START(number)) {
            TPL_ELEMENT_PARSE(number, number = TPL_ELEMENT_CLOSE(number + 1) + 1);
            continue;
        }
        TPL_CONTENT_PARSE(number, number = TPL_CONTENT_CLOSE(number));
    }
    if (roots.length > 1) {
        console.error("[Elf error]: Cannot use multiple root node.");
    }
    return roots[0] || "";
    function TPL_COMMENT_START (current) {
        return IS_STARTS(temp, TAG_COMMENT_OPEN, current);
    }
    function TPL_CLOSURE_START (current) {
        return IS_STARTS(temp, TAG_CLOSURE_OPEN, current) && REG_QNAME.test(temp.charAt(current + 2));
    }
    function TPL_ELEMENT_START (current) {
        return IS_STARTS(temp, TAG_ELEMENT_OPEN, current) && REG_QNAME.test(temp.charAt(current + 1));
    }
    function TPL_COMMENT_CLOSE (current) {
        current = temp.indexOf(TAG_COMMENT_OVER, current);
        return current >= 0 ? current : length;
    }
    function TPL_CONTENT_CLOSE (current) {
        current = temp.indexOf(TAG_ELEMENT_OPEN, current);
        return current >= 0 ? (
            TPL_COMMENT_START (current) ||
            TPL_CLOSURE_START (current) ||
            TPL_ELEMENT_START (current) ? current : TPL_CONTENT_CLOSE(current + 1)
        ) : length;
    }
    function TPL_ELEMENT_CLOSE (current) {
        return FUN_INDEX(temp, function () { return true; })(TAG_ELEMENT_OVER, current);
    }
    function TPL_COMMENT_PARSE (start, end) {
        console.warn("Comment '" + temp.slice(start, end) + "' will be dispensed.");
    }
    function TPL_CLOSURE_PARSE (start, end) {
        var qname = TPL_QNAME_PARSER(temp.slice(start + 2, end));
        if (!HAS_PROP(CONST_XHTML_FOLIAGE, qname)) {
            while  (level > 0) {
                if (queue[--level].qname === qname) {
                    break;
                }
            }
        }
    }
    function TPL_ELEMENT_PARSE (start, end) {
        var qname = TPL_QNAME_PARSER(temp.slice(start + 1, end));
        var value = TPL_PROPS_PARSER(temp.slice(start + 1 + qname.length, end));
        var close = HAS_PROP(CONST_XHTML_FOLIAGE, qname) || temp.charAt(end - 2) === "/";
        TPL_STORE_VALUE({
            each     : value.each,
            when     : value.when,
            props    : value.props,
            qname    : qname,
            level    : level,
            children : []
        }, !close);
    }
    function TPL_CONTENT_PARSE (start, end) {
        TPL_STORE_VALUE(temp.slice(start, end).trim());
    }
    function TPL_STORE_VALUE (value, depth) {
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



function GAN_ELEMENT (node) {
    if (IS_STRING(node)) {
        return GAN_CONTENT(node);
    }
    if (node.each) {
        if (node.level > 0) {
            return GAN_ITERATE(node);
        }
        console.error("[Elf error]: Cannot use elf-each on root node.");
    }
    if (node.when) {
        return GAN_TERNARY(node);
    }
    return GAN_DEFAULT(node);
}
function GAN_DEFAULT (node) {
    return "Elf.v(Elf.c(" + TO_STRING(node.qname) + ")," + GAN_NATURES(node) + "," + GAN_INSIDER(node) + ")";
}
function GAN_ITERATE (node) {
    return "Elf.m(" + node.each.body + ",function(" + node.each.keys + "){with(this){return " + (node.when ? GAN_TERNARY(node) : GAN_DEFAULT(node)) + "}},this)";
}
function GAN_TERNARY (node) {
    return "((" + node.when + ")?" + GAN_DEFAULT(node) + ":null)";
}
function GAN_INSIDER (node) {
    return "[" + node.children.map(GAN_ELEMENT).join(",") + "]";
}
function GAN_CONTENT (node) {
    var number = 0;
    var incept = 0;
    var finish = -2;
    var result = [];
    for (;
        (incept = node.indexOf("{{", finish + 2)) !== -1 &&
        (finish = node.indexOf("}}", incept + 2)) !== -1
        ;number = finish + 2) {
        if (number < incept) {
            GAN_ABORIGINAL(number, incept);
        }
        if (incept < finish - 2) {
            GAN_EXPRESSION(incept + 2, finish);
        }
    }
    if (number < node.length) {
        GAN_ABORIGINAL(number, node.length);
    }
    return result.join("+");
    function GAN_ABORIGINAL (start, end) {
        result.push(TO_STRING(UN_ESCAPE(node.slice(start, end))));
    }
    function GAN_EXPRESSION (start, end) {
        var expr = GAN_FILTERS(UN_ESCAPE(node.slice(start, end)));
        if (expr) {
            result.push("(" + expr + ")");
        }
    }
}
function GAN_FILTERS (node) {
    var result;
    var number = -1;
    var divide = "|";
    var length = node.length;
    var thrust = FUN_INDEX(node, function (i) {
        return node.charAt(i + 1) !== divide
            && node.charAt(i - 1) !== divide;
    });
    while (number < length) {
        var temp = node.slice(number + 1, number = thrust(divide, number + 1)).trim();
        if (temp) {
            if (result) {
                var expr = temp.match(REG_PIPER);
                if (expr) {
                    result = "Elf.t(" + TO_STRING(expr[1]) + "," + result + (expr[2] ? "," + expr[2] : "") + ")";
                }
            } else {
                result = temp;
            }
        }
    }
    return result;
}
function GAN_NATURES (node) {
    return "{" + EXHIBIT_ENGINE_LOOPS(node.props, function (ns, name) {
        if (name === "cmd") {
            return TO_STRING(name) + ":Elf.d(" + GAN_CONTENT(ns) + ")";
        }
        if (IS_STARTS(name, EVENT_EXHIBIT_PREFIX)) {
            return TO_STRING(name) + ":function($event){with(this){return " + ns + "}}.bind(this)";
        }
        return TO_STRING(name) + ":" + GAN_CONTENT(ns);
    }).join(",") + "}";
}


/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */

function TRUSTOR_JS   (value, modname) {
    return new Function("define", value)(REQUIRE_DEFINE(modname)), CONST_AMD_MODULES[modname];
}
function TRUSTOR_TS   (value, modname) {
    return TRUSTOR_JS(WIN.ts.transpile(value, {
        module : WIN.ts.ModuleKind.AMD,
        target : WIN.ts.ScriptTarget.ES5,
        experimentalDecorators : true,
        emitDecoratorMetadata : true,
        inlineSourceMap : true,
        sourceMap : true,
        jsx : WIN.ts.JsxEmit.React,
        jsxFactory : "Elf.createElement"
    }, modname) + "\n//# sourceURL=" + modname + ".map", modname);
}
function TRUSTOR_CSS  (value, modname) {
    var text = DOM_CREATE_CONTENT(value);
    var node = DOM_CREATE_ELEMENT("style");
    DOM_ATTACH_PROPS(node, "type", "text/css");
    DOM_ATTACH_PROPS(node, "from", modname);
    DOM_APPEND_CHILD(node, text);
    DOM_APPEND_CHILD(HEAD, node);
    return TRUSTOR_RAW(node, modname);
}
function TRUSTOR_RAW  (value, modname) {
    return PROMISE_EXTERNAL_NEXT({ exports : value, dirname: REQUIRE_FINDER(modname) });
}
function TRUSTOR_SASS (indentedSyntax) {
    return function (value, modname) {
        return PROMISE_CREATOR(function (referee) {
            WIN.Sass.compile(value, {
                style: WIN.Sass.style.expanded,
                indentedSyntax: indentedSyntax
            }, function (response) {
                if (response.status) {
                    referee.loss(response);
                } else {
                    TRUSTOR_CSS(response.text, modname).then(referee.next);
                }
            });
        });
    };
}
function TRUSTOR_JSON (value, modname) {
    return TRUSTOR_RAW(TO_OBJECT(value), modname);
}


function REQUIRE_DEFINE (modname) {
    return function () {
        var provide = AS_ARRAY.call(arguments);
        var trustor = provide.pop();
        var depends = provide.pop() || [];
        var rawname = provide.pop() || modname;
        CONST_AMD_MODULES[rawname] = PROMISE_EXTERNAL_NEXT({
            dirname : REQUIRE_FINDER(modname),
            depends : depends,
            trustor : trustor
        });
    };
}
function REQUIRE_IMPORT (dirname) {
    return function (modname) {
        return (CONST_AMD_MODULES[modname] || REQUIRE_LOADER(
            REQUIRE_LOOKUP(modname) || REQUIRE_LOCATE(
                /^\//.test(modname) ? modname :
                /^\./.test(modname) ? dirname + "/" + modname :
                (CONST_AMD_OPTIONS.baseURL || "") + "/" + modname
            )
        )).then(function (provide) {
            return provide.exports || (provide.exports = REQUIRE_LAUNCH(provide));
        });
    };
}
function REQUIRE_LAUNCH (provide) {
    var obtain = {};
    var module = { exports : {} };
    if (typeof provide.trustor === "function") {
        return PROMISE_EXTERNAL_WHEN(
            provide.depends.map(function (ns) {
                if (ns === "require") return obtain;
                if (ns === "exports") return module.exports;
                if (ns === "module")  return module;
                return REQUIRE_IMPORT(provide.dirname)(ns);
            })
        ).then(function (depends) {
            return provide.trustor.apply(WIN, depends.map(function (ns) {
                return ns === obtain ? require : ns;
            })) || module.exports;
            function require (name) {
                return depends[provide.depends.indexOf(name)];
            }
        });
    } else {
        return PROMISE_EXTERNAL_NEXT(provide.trustor);
    }
}
function REQUIRE_LOADER (modname) {
    return CONST_AMD_MODULES[modname] || (CONST_AMD_MODULES[modname] = PROMISE_EXTERNAL_AJAX({
        url : REQUIRE_ROUTER(modname)
    }).then(function (response) {
        return (TRUSTOR_COMPILER[FUN_LOWER(
            modname.substr(modname.lastIndexOf(".") + 1)
        )] || TRUSTOR_RAW)(response.text(), modname);
    }));
}
function REQUIRE_LOOKUP (modname) {
    return CONST_AMD_OPTIONS.mapping && CONST_AMD_OPTIONS.mapping[modname];
}
function REQUIRE_LOCATE (modname) {
    var hostname = LOC.host;
    var protocol = LOC.protocol;
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
            splitURL.splice(--i, 2);
        }
        ++i;
    }
    var location = splitURL.join("/");
    if (splitURL.pop().indexOf(".") < 0) {
        location = location + "." + (CONST_AMD_OPTIONS.defaultExtension || "js");
    }
    return protocol + "//" + hostname + "/" + location.replace(/^\/+/, "");
}
function REQUIRE_ROUTER (modname) {
    return CONST_AMD_OPTIONS.routing ? CONST_AMD_OPTIONS.routing(modname) : modname;
}
function REQUIRE_FINDER (modname) {
    return modname.replace(/[^\/]+$/, "");
}


function PROMISE_INTERNAL_NEXT (value) {
    if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_PENDING) {
        this[TXT_PROMISE_PROCESS] = TXT_PROMISE_RESOLVED;
        this[TXT_PROMISE_CONTENT] = value;
        this[TXT_PROMISE_SUCCESS].forEach(FUN_APPLY(this, [value]));
    }
}
function PROMISE_INTERNAL_LOSS (error) {
    if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_PENDING) {
        this[TXT_PROMISE_PROCESS] = TXT_PROMISE_REJECTED;
        this[TXT_PROMISE_CONTENT] = error;
        this[TXT_PROMISE_FAILURE].forEach(FUN_APPLY(this, [error]));
    }
}
function PROMISE_INTERNAL_THEN (value, referee) {
    if (PROMISE_DEFERRED.isPrototypeOf(value)) {
        value.then(referee.next);
        value.fail(referee.loss);
    } else {
        referee.next(value);
    }
}
function PROMISE_INTERNAL_FAIL (error, referee) {
    if (PROMISE_DEFERRED.isPrototypeOf(error)) {
        error.then(referee.next);
        error.fail(referee.loss);
    } else {
        referee.loss(error);
    }
}
function PROMISE_EXTERNAL_NEXT (value) {
    return PROMISE_CREATOR(function (referee) { referee.next(value); });
}
function PROMISE_EXTERNAL_LOSS (error) {
    return PROMISE_CREATOR(function (referee) { referee.loss(error); });
}
function PROMISE_EXTERNAL_WHEN (array) {
    return PROMISE_CREATOR(function (referee) {
        var number = 0;
        var length = array.length;
        var result = new Array(length);
        if (length) {
            array.forEach(function (ns, index) {
                PROMISE_INTERNAL_THEN(ns, {
                    next: function (value) {
                        result[index] = value;
                        if (++number === length) {
                            referee.next(result);
                        }
                    },
                    loss: referee.loss
                });
            });
        } else {
            referee.next(result);
        }
    });
}
function PROMISE_EXTERNAL_RACE (array) {
    return PROMISE_CREATOR(function (referee) {
        if (array.length) {
            array.forEach(function (ns) {
                PROMISE_INTERNAL_THEN(ns, referee);
            });
        } else {
            referee.next();
        }
    });
}
function PROMISE_EXTERNAL_AJAX (request) {
    return PROMISE_CREATOR(function (referee) {
        return request.jsonp ? XHR_JSONP(request, referee) : XHR_ASYNC(request, referee);
    });
}



function EXHIBIT_EVENT_BUBBLES () {
    this.bubbles = false;
}
function EXHIBIT_EVENT_REFRESH () {
    this.refresh = false;
}
function EXHIBIT_EVENT_HANDLER (event) {
    var example = {};
    var manager = event.target[TXT_EXHIBIT_RENDERER];
    for (var name in event) {
        if (HAS_PROP(CONST_EVENT_NATURES, name)) {
            example[name] = event[name];
        }
    }
    event.stopPropagation();
    example.refresh         = true;
    example.originalEvent   = event;
    example.stopPropagation = EXHIBIT_EVENT_BUBBLES;
    example.preventRefresh  = EXHIBIT_EVENT_REFRESH;
    example.preventDefault  = function () {
        this.originalEvent.preventDefault();
        this.defaultPrevented = true;
    };
    manager.dispatchEvent(example);
    example.refresh && ACT_BROADCAST();
}


function EXHIBIT_JUDGE_REDRAWN (target, origin) {
    if (IS_OBJECT(target) && IS_OBJECT(origin)) {
        return target.type === origin.type;
    }
    return target === origin;
}
function EXHIBIT_GROUP_NATURES (target, origin) {
    var result = {
        append : {},
        remove : {},
        update : {}
    };
    for (var name in target) {
        if (!HAS_PROP(origin, name)) {
            result.remove[name] = target[name];
            continue;
        }
        if (!FUN_EQUAL(target[name], origin[name])) {
            result.update[name] = {
                oldValue : target[name],
                newValue : origin[name]
            };
        }
    }
    for (var name in origin) {
        if (!HAS_PROP(target, name)) {
            result.append[name] = origin[name];
        }
    }
    return result;
}


function EXHIBIT_ADJUST_EVENT (name) {
    return FUN_LOWER(name.substr(EVENT_EXHIBIT_PREFIX.length));
}
function EXHIBIT_ADJUST_PROPS (name) {
    return CONST_PROPS_MAPPING[name] || name;
}


function EXHIBIT_ATTACH_CHILD (insider, example, owner, namespace, current, collect, members) {
    for (var i = 0; i < insider.length; i++) {
        var manager = MANAGER_CREATOR(insider[i], current);
        var realtor = manager.initial(owner, namespace, collect);
        if (realtor.append) {
            DOM_APPEND_CHILD(example, realtor.target);
        }
        members.push(manager);
    }
}
function EXHIBIT_ATTACH_PROPS (natures, example, owner, namespace, current, connate) {
    for (var name in natures) {
        if (IS_STARTS(name, EVENT_EXHIBIT_PREFIX)) {
            current.attachEvent(EXHIBIT_ADJUST_EVENT(name), natures[name]);
        } else {
            if (connate) {
                DOM_ATTACH_PROPS(example, EXHIBIT_ADJUST_PROPS(name), natures[name]);
            }
        }
    }
}
function EXHIBIT_ATTACH_ORDER (command, example, owner, namespace, natures, behests) {
    for (var i = 0; i < command.length; i++) {
        var dictate = SINGLES_CREATOR(command[i]);
        if (dictate[CYCLE_EXHIBIT_INITIAL]) {
            dictate[CYCLE_EXHIBIT_INITIAL](example, owner, namespace, natures);
        }
        behests.push(dictate);
    }
}
function EXHIBIT_ATTACH_REFER (referee, example, owner) {
    if (referee) {
        owner.refs[referee] = example;
    }
}
function EXHIBIT_ATTACH_CYCLE (example, collect) {
    if (example[CYCLE_EXHIBIT_INITIAL]) {
        collect.push(example[CYCLE_EXHIBIT_INITIAL].bind(example));
    }
}

function EXHIBIT_DETACH_CHILD (members, owner) {
    FUN_CLEAN(members, function (ns) {
        ns.dispose(owner);
    });
}
function EXHIBIT_DETACH_PROPS (natures, example, owner, namespace, current, connate) {
    for (var name in natures) {
        if (IS_STARTS(name, EVENT_EXHIBIT_PREFIX)) {
            current.detachEvent(EXHIBIT_ADJUST_EVENT(name), natures[name]);
        } else {
            if (connate) {
                DOM_DETACH_PROPS(example, EXHIBIT_ADJUST_PROPS(name));
            }
        }
    }
}
function EXHIBIT_DETACH_ORDER (behests, example) {
    FUN_CLEAN(behests, function (value) {
        if (value[CYCLE_EXHIBIT_DISPOSE]) {
            value[CYCLE_EXHIBIT_DISPOSE](example);
        }
    });
}
function EXHIBIT_DETACH_REFER (referee, owner) {
    if (referee) {
        delete owner.refs[referee];
    }
}
function EXHIBIT_DETACH_CYCLE (example) {
    if (example[CYCLE_EXHIBIT_DISPOSE]) {
        example[CYCLE_EXHIBIT_DISPOSE]();
    }
}
function EXHIBIT_HOLLOW_EVENT (emitter, example, connate) {
    emitter.dispose(function (value, name) {
        if (connate) {
            DOM_DETACH_EVENT(example, name, EXHIBIT_EVENT_HANDLER);
        }
    });
}

function EXHIBIT_CHANGE_REFER (ancient, referee, example, owner) {
    if (ancient !== referee) {
        EXHIBIT_DETACH_REFER(ancient, owner);
        EXHIBIT_ATTACH_REFER(referee, example, owner);
    }
}
function EXHIBIT_CHANGE_CHILD (ancient, insider, example, owner, namespace, current, collect, members) {
    var manager;
    var realtor;
    var appends = [];
    var disturb = false;
    var insiderMap = {};
    var membersMap = {};
    for (var i = 0; i < insider.length; i++) {
        var el = insider[i];
        var sn = el.key || i;
        insiderMap[sn] = {
            value : el,
            index : i
        };
    }
    for (var i = 0; i < members.length; i++) {
        var ns = members[i];
        var el = ns.element;
        var sn = el.key || i;
        membersMap[sn] = {
            value : el,
            index : i
        };
    }
    for (var i = 0; i < members.length; i++) {
        var ns = members[i];
        var el = ns.element;
        var sn = el.key || i;
        var number = INSIDER_INDEX(el, sn);
        if (number === -1) {
            ns.dispose();
        }
    }
    for (var i = 0; i < insider.length; i++) {
        var el = insider[i];
        var sn = el.key || i;
        var number = MEMBERS_INDEX(el, sn);
        if (number === -1) {
            manager = MANAGER_CREATOR(el, current);
            realtor = manager.initial(owner, namespace, collect);
            disturb = true;
        } else {
            manager = members[number];
            realtor = manager.renewal(owner, namespace, collect, el);
        }
        if (disturb || realtor.append || number < i) {
            DOM_APPEND_CHILD(example, realtor.target);
        }
        appends.push(manager);
    }
    FUN_CLEAN(members, NOOP);
    members.push.apply(members, appends);
    function INSIDER_INDEX(target, name) {
        var origin = insiderMap[name];
        if (origin) {
            if (EXHIBIT_JUDGE_REDRAWN(target, origin.value)) {
                return origin.index;
            }
        }
        return -1;
    }
    function MEMBERS_INDEX(target, name) {
        var origin = membersMap[name];
        if (origin) {
            if (EXHIBIT_JUDGE_REDRAWN(target, origin.value)) {
                return origin.index;
            }
        }
        return -1;
    }
}
function EXHIBIT_CHANGE_PROPS (ancient, natures, example, owner, namespace, current, connate) {
    var mutate = EXHIBIT_GROUP_NATURES(ancient, natures);
    var append = mutate.append;
    var remove = mutate.remove;
    var update = mutate.update;
    EXHIBIT_DETACH_PROPS(append, example, owner, namespace, current, connate);
    EXHIBIT_ATTACH_PROPS(remove, example, owner, namespace, current, connate);
    for (var name in update) {
        if (IS_STARTS(name, EVENT_EXHIBIT_PREFIX)) {
            current.emitter.replace(EXHIBIT_ADJUST_EVENT(name), update[name].oldValue, update[name].newValue);
        } else {
            if (connate) {
                DOM_ATTACH_PROPS(example, EXHIBIT_ADJUST_PROPS(name), update[name].newValue);
            }
        }
    }
}
function EXHIBIT_CHANGE_ORDER (ancient, command, example, owner, namespace, natures, behests) {
    var appends = [];
    for (var i = 0; i < behests.length; i++) {
        var number = COMMAND_INDEX(behests[i]);
        if (number === -1) {
            if (behests[i][CYCLE_EXHIBIT_DISPOSE]) {
                behests[i][CYCLE_EXHIBIT_DISPOSE](example);
            }
        }
    }
    for (var i = 0; i < command.length; i++) {
        var number = BEHESTS_INDEX(command[i]);
        if (number === -1) {
            var dictate = SINGLES_CREATOR(command[i]);
            if (dictate[CYCLE_EXHIBIT_INITIAL]) {
                dictate[CYCLE_EXHIBIT_INITIAL](example, owner, namespace, natures);
            }
            appends.push(dictate);
        } else {
            appends.push(behests[number]);
        }
    }
    FUN_CLEAN(behests, NOOP);
    behests.push.apply(behests, appends);
    function COMMAND_INDEX (ns) {
        for (var i = 0; i < command.length; i++) {
            if (ns instanceof command[i]) {
                return i;
            }
        }
        return -1;
    }
    function BEHESTS_INDEX (ns) {
        for (var i = 0; i < behests.length; i++) {
            if (behests[i] instanceof ns) {
                return i;
            }
        }
        return -1;
    }
}


function EXHIBIT_ATTACH_EVENT (type, listener) {
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    if (emitter.enqueue(type, listener)) {
        if (connate) {
            DOM_ATTACH_EVENT(example, type, EXHIBIT_EVENT_HANDLER);
        }
    }
}
function EXHIBIT_DETACH_EVENT (type, listener) {
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    if (emitter.unqueue(type, listener)) {
        if (connate) {
            DOM_DETACH_EVENT(example, type, EXHIBIT_EVENT_HANDLER);
        }
    }
}
function EXHIBIT_BUBBLE_EVENT (event, present) {
    var current = this;
    var connate = current.connate;
    var creator = current.creator;
    if (connate === present) {
        DOM_BUBBLE_EVENT(creator, event.originalEvent);
    }
}
function EXHIBIT_SPREAD_EVENT (event, present) {
    var current = this;
    var connate = current.connate;
    var emitter = current.emitter;
    var example = current.example;
    var creator = current.creator;
    if (connate === present) {
        emitter.trigger(event.type, FUN_APPLY(example, [event]));
    }
    if (event.bubbles) {
        creator.trigger(event, present);
    }
}
function EXHIBIT_INVOKE_EVENT (event) {
    var current = this;
    var connate = current.connate;
    var example = current.example;
    event.target = example;
    current.trigger(event, connate);
}


function EXHIBIT_ENGINE_LOOPS (target, fn, context) {
    if (IS_ARRAY(target)) {
        return target.map(fn, context);
    }
    var result = [];
    for (var name in target) {
        result.push(fn.call(context, target[name], name, target));
    }
    return result;
}
function EXHIBIT_ENGINE_QNAME (target) {
    return function (name) {
        return target[name] || COMPONENT_DEPENDS[name] || FUN_LOWER(name);
    };
}
function EXHIBIT_ENGINE_ORDER (target) {
    return function (temp) {
        var result = [];
        for (var expr; expr = temp.match(REG_COMMA); temp = temp.substr(expr[0].length)) {
            var name = expr[1];
            if (HAS_PROP(target, name)) {
                FUN_PUSH(result, target[name]);
                continue;
            }
            if (HAS_PROP(DIRECTIVE_DEPENDS, name)) {
                FUN_PUSH(result, DIRECTIVE_DEPENDS[name]);
                continue;
            }
            console.error("[Elf error]: Invalid directive: " + name);
        }
        return result;
    };
};
function EXHIBIT_ENGINE_PIPER (target) {
    return function (name, value) {
        var provide = AS_ARRAY.call(arguments, 1);
        if (HAS_PROP(target, name)) {
            var example = SINGLES_CREATOR(target[name]);
            return example.transform.apply(example, provide);
        }
        if (HAS_PROP(TRANSFORM_DEPENDS, name)) {
            var example = SINGLES_CREATOR(TRANSFORM_DEPENDS[name]);
            return example.transform.apply(example, provide);
        }
        console.error("[Elf error]: Invalid transform: " + name);
        return IS_ACTUAL(value) ? value : "";
    };
}

/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */

function PROMISE_CREATOR (trustor) {
    var example = Object.create(PROMISE_DEFERRED);
    example.constructor(trustor);
    return example;
}
function SINGLES_CREATOR (trustor) {
    return trustor[TXT_EXHIBIT_SINGLETON] || (trustor[TXT_EXHIBIT_SINGLETON] = new trustor());
}
function MANAGER_CREATOR (element, creator) {
    return Object.create(
          IS_ACTUAL(element)
        ? IS_OBJECT(element)
        ? IS_STRING(element.type)
        ? ELEMENT_RENDERER
        : COMPLEX_RENDERER
        : CONTENT_RENDERER
        : COMMENT_RENDERER
        , {
            element: NEW_PROP(element),
            creator: NEW_PROP(creator)
        });
}
function EXAMPLE_CREATOR (trustor, attribute, manager) {
    var example = Object.create(trustor.prototype);
    DEF_PROP(example, TXT_EXHIBIT_RENDERER, manager);
    DEF_PROP(example, "props", attribute);
    DEF_PROP(example, "refs", {});
    example.constructor();
    return example;
}
function ELEMENT_CREATOR (trustor, namespace, manager) {
    var example = DOM_CREATE_ELEMENT(trustor, namespace);
    DEF_PROP(example, TXT_EXHIBIT_RENDERER, manager);
    return example;
}
function EMITTER_CREATOR () {
    var example = {};
    return {
        enqueue : function (type, value) {
            return DEF_EMITTER(type) && FUN_RAISE(example[type], value);
        },
        unqueue : function (type, value) {
            return HAS_EMITTER(type) && FUN_MINUS(example[type], value);
        },
        replace : function (type, oldValue, newValue) {
            if (HAS_EMITTER(type)) {
                var index = example[type].indexOf(oldValue);
                if (index !== -1) {
                    example[type].splice(index, 1, newValue);
                    return true;
                }
            }
            return false;
        },
        trigger : function (type, fn) {
            if (HAS_EMITTER(type)) {
                example[type].forEach(fn);
            }
        },
        dispose : function (fn) {
            EXHIBIT_ENGINE_LOOPS(example, fn);
            example = {};
        }
    };
    function DEF_EMITTER (type) {
        return example[type] || (example[type] = []);
    }
    function HAS_EMITTER (type) {
        return example[type];
    }
}

/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */

var WIN = window;
var DOC = document;
var LOC = location;

var NOOP = function () {};
var HEAD = DOC.querySelector("head");
var CODE = DOC.createElement("code");

var REG_UPPER = /[A-Z]/g;
var REG_QNAME = /[-:\w]+/;
var REG_COMMA = /[,\s]*([^,\s]+)[,\s]*/;
var REG_LOOPS = /([^\s].*)\s+(?:in|of)\s+(.*[^\s])/;
var REG_PROPS = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>/=]+)))?/;
var REG_PIPER = /([\w]+)(?:\s+([\s\S]*)?)?/;

var TAG_ELEMENT_OPEN = "<";
var TAG_CLOSURE_OPEN = "</";
var TAG_COMMENT_OPEN = "<!--";
var TAG_COMMENT_OVER = "-->";
var TAG_ELEMENT_OVER = ">";

var TXT_PROMISE_PENDING   = "PENDING";
var TXT_PROMISE_RESOLVED  = "RESOLVED";
var TXT_PROMISE_REJECTED  = "REJECTED";
var TXT_PROMISE_DISPOSE   = "ELF:DISPOSE";
var TXT_PROMISE_SUCCESS   = "ELF:SUCCESS";
var TXT_PROMISE_FAILURE   = "ELF:FAILURE";
var TXT_PROMISE_PROCESS   = "ELF:PROCESS";
var TXT_PROMISE_CONTENT   = "ELF:CONTENT";

var TXT_EXHIBIT_RENDERER  = "ELF:RENDERER";
var TXT_EXHIBIT_COMPONENT = "ELF:COMPONENT";
var TXT_EXHIBIT_DIRECTIVE = "ELF:DIRECTIVE";
var TXT_EXHIBIT_TRANSFORM = "ELF:TRANSFORM";
var TXT_EXHIBIT_SINGLETON = "ELF:SINGLETON";

var EVENT_EXHIBIT_PREFIX  = "on";
var CYCLE_EXHIBIT_INITIAL = "onInitial";
var CYCLE_EXHIBIT_DISPOSE = "onDispose";

var COMPONENT_DEPENDS = {};
var DIRECTIVE_DEPENDS = {};
var TRANSFORM_DEPENDS = {};

var CONST_AMD_MODULES = {};
var CONST_AMD_OPTIONS = {};
var CONST_ACT_MONITOR = [];
var CONST_ACT_LEISURE = true;

var CONST_PROPS_MAPPING = {
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
var CONST_PROPS_SPECIAL = {
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
var CONST_XHTML_FOLIAGE = {
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
var CONST_EVENT_NATURES = {
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



var TRUSTOR_COMPILER = {
    js   : TRUSTOR_JS,
    ts   : TRUSTOR_TS,
    tsx  : TRUSTOR_TS,
    css  : TRUSTOR_CSS,
    sass : TRUSTOR_SASS(true),
    scss : TRUSTOR_SASS(false),
    json : TRUSTOR_JSON
};
var PROMISE_DEFERRED = {
    constructor: function (trustor) {
        DEF_PROP(this, TXT_PROMISE_PROCESS, TXT_PROMISE_PENDING);
        DEF_PROP(this, TXT_PROMISE_SUCCESS, []);
        DEF_PROP(this, TXT_PROMISE_FAILURE, []);
        DEF_PROP(this, TXT_PROMISE_CONTENT);
        try {
            DEF_PROP(this, TXT_PROMISE_DISPOSE, trustor({
                next: PROMISE_INTERNAL_NEXT.bind(this),
                loss: PROMISE_INTERNAL_LOSS.bind(this)
            }));
        } catch (error) {
            PROMISE_INTERNAL_LOSS.call(this, error);
            console.error(error);
        }
    },
    dispose: function () {
        if (this[TXT_PROMISE_DISPOSE]) {
            this[TXT_PROMISE_DISPOSE]();
        }
    },
    then: function (fn) {
        return PROMISE_CREATOR(function (referee) {
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_PENDING) {
                return FUN_PUSH(this[TXT_PROMISE_SUCCESS], function (value) {
                    PROMISE_INTERNAL_THEN(fn(value), referee);
                });
            }
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_RESOLVED) {
                return PROMISE_INTERNAL_THEN(fn(this[TXT_PROMISE_CONTENT]), referee);
            }
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_REJECTED) {
                return referee.loss(this[TXT_PROMISE_CONTENT]);
            }
        }.bind(this));
    },
    fail: function (fn) {
        return PROMISE_CREATOR(function (referee) {
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_PENDING) {
                return FUN_PUSH(this[TXT_PROMISE_FAILURE], function (error) {
                    PROMISE_INTERNAL_FAIL(fn(error), referee);
                });
            }
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_REJECTED) {
                return PROMISE_INTERNAL_FAIL(fn(this[TXT_PROMISE_CONTENT]), referee);
            }
            if (this[TXT_PROMISE_PROCESS] === TXT_PROMISE_RESOLVED) {
                return referee.next(this[TXT_PROMISE_CONTENT]);
            }
        }.bind(this));
    }
};
var RADICAL_RENDERER = {
    initial : function (owner, namespace, collect) {
        var current = this;
        var element = current.element;
        var connate = true;

        var manager = MANAGER_CREATOR(element, current);
        var realtor = manager.initial(owner, namespace, collect);

        current.connate = connate;
        current.manager = manager;
        return realtor;
    },
    renewal : function (owner, namespace, collect, element) {
        return this.manager.renewal(owner, namespace, collect, element);
    },
    dispose : function (owner) {
        this.manager.dispose(owner);
    },
    trigger : EXHIBIT_BUBBLE_EVENT
};
var COMPLEX_RENDERER = {
    initial : function (owner, namespace, collect) {
        var current = this;
        var element = current.element;
        var natures = element.props;
        var trustor = element.type;
        var command = element.cmd;
        var referee = element.ref;
        var connate = false;
        
        var behests = [];
        var emitter = EMITTER_CREATOR();
        var example = EXAMPLE_CREATOR(trustor, natures, current);
        var manager = MANAGER_CREATOR(example.render(), current);
        var realtor = manager.initial(example, namespace, collect);

        current.connate = connate;
        current.behests = behests;
        current.emitter = emitter;
        current.example = example;
        current.manager = manager;

        EXHIBIT_ATTACH_CYCLE(example, collect);
        EXHIBIT_ATTACH_REFER(referee, example, owner);
        EXHIBIT_ATTACH_PROPS(natures, example, owner, namespace, current, connate);
        EXHIBIT_ATTACH_ORDER(command, example, owner, namespace, natures, behests);

        return realtor;
    },
    renewal : function (owner, namespace, collect, element) {
        var current = this;
        var ancient = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var manager = current.manager;
        var natures = element.props;
        var command = element.cmd;
        var referee = element.ref;
        var realtor;

        current.element = element;
        example.props   = natures;

        var prevElement = manager.element;
        var nextElement = example.render();
        var prevNatures = ancient.props;
        var prevCommand = ancient.cmd;
        var prevReferee = ancient.ref;
        
        if (EXHIBIT_JUDGE_REDRAWN(prevElement, nextElement)) {
            realtor = manager.renewal(owner, namespace, collect, nextElement);
        } else {
            manager = MANAGER_CREATOR(nextElement, current);
            realtor = manager.initial(example, namespace, collect);
            current.manager = manager;
        }

        EXHIBIT_CHANGE_PROPS(prevNatures, natures, example, owner, namespace, current, connate);
        EXHIBIT_CHANGE_ORDER(prevCommand, command, example, owner, namespace, natures, behests);
        EXHIBIT_CHANGE_REFER(prevReferee, referee, example, owner);

        return realtor;
    },
    dispose : function (owner) {
        var current = this;
        var referee = current.element.ref;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var emitter = current.emitter;
        var manager = current.manager;
        EXHIBIT_DETACH_CYCLE(example);
        EXHIBIT_DETACH_REFER(referee, owner);
        EXHIBIT_DETACH_ORDER(behests, example);
        EXHIBIT_HOLLOW_EVENT(emitter, example, connate);
        manager.dispose(example);
    },
    trigger       : EXHIBIT_SPREAD_EVENT,
    attachEvent   : EXHIBIT_ATTACH_EVENT,
    detachEvent   : EXHIBIT_DETACH_EVENT,
    dispatchEvent : EXHIBIT_INVOKE_EVENT
};
var ELEMENT_RENDERER = {
    initial : function (owner, namespace, collect) {
        var current = this;
        var element = current.element;
        var natures = element.props;
        var insider = natures.children;
        var trustor = element.type;
        var command = element.cmd;
        var referee = element.ref;
        var connate = true;

        if (trustor === "svg") {
            namespace = "http://www.w3.org/2000/svg";
        }
        if (trustor === "math") {
            namespace = "http://www.w3.org/2000/MathML";
        }

        var members = [];
        var behests = [];
        var emitter = EMITTER_CREATOR();
        var example = ELEMENT_CREATOR(trustor, namespace, current);
        
        current.connate = connate;
        current.members = members;
        current.behests = behests;
        current.emitter = emitter;
        current.example = example;

        EXHIBIT_ATTACH_REFER(referee, example, owner);
        EXHIBIT_ATTACH_CHILD(insider, example, owner, namespace, current, collect, members);
        EXHIBIT_ATTACH_PROPS(natures, example, owner, namespace, current, connate);
        EXHIBIT_ATTACH_ORDER(command, example, owner, namespace, natures, behests);

        return {
            target : example,
            append : true
        };
    },
    renewal : function (owner, namespace, collect, element) {
        var current = this;
        var ancient = current.element;
        var connate = current.connate;
        var behests = current.behests;
        var example = current.example;
        var members = current.members;
        var natures = element.props;
        var insider = natures.children;
        var trustor = element.type;
        var command = element.cmd;
        var referee = element.ref;

        if (trustor === "svg") {
            namespace = "http://www.w3.org/2000/svg";
        }
        if (trustor === "math") {
            namespace = "http://www.w3.org/2000/MathML";
        }

        current.element = element;

        var prevElement = ancient;
        var nextElement = element;
        var prevNatures = ancient.props;
        var prevInsider = prevNatures.children;
        var prevCommand = ancient.cmd;
        var prevReferee = ancient.ref;

        EXHIBIT_CHANGE_REFER(prevReferee, referee, example, owner);
        EXHIBIT_CHANGE_CHILD(prevInsider, insider, example, owner, namespace, current, collect, members);
        EXHIBIT_CHANGE_PROPS(prevNatures, natures, example, owner, namespace, current, connate);
        EXHIBIT_CHANGE_ORDER(prevCommand, command, example, owner, namespace, natures, behests);

        return {
            target : example,
            append : false
        };
    },
    dispose : function (owner) {
        var current = this;
        var referee = current.element.ref;
        var connate = current.connate;
        var behests = current.behests;
        var members = current.members;
        var example = current.example;
        var emitter = current.emitter;
        EXHIBIT_DETACH_REFER(referee, owner);
        EXHIBIT_DETACH_CHILD(members, owner);
        EXHIBIT_DETACH_ORDER(behests, example);
        EXHIBIT_HOLLOW_EVENT(emitter, example, connate);
        DOM_REMOVE_CHILD(example);
    },
    trigger       : EXHIBIT_SPREAD_EVENT,
    attachEvent   : EXHIBIT_ATTACH_EVENT,
    detachEvent   : EXHIBIT_DETACH_EVENT,
    dispatchEvent : EXHIBIT_INVOKE_EVENT
};
var CONTENT_RENDERER = {
    initial : function (owner, namespace, collect) {
        var current = this;
        var element = current.element;
        var example = DOM_CREATE_CONTENT(element);

        current.example = example;

        return {
            target : example,
            append : true
        };
    },
    renewal : function (owner, namespace, collect, element) {
        var current = this;
        var example = current.example;
        var prevElement = current.element;
        var nextElement = element;
        if (prevElement !== nextElement) {
            current.element = nextElement;
            example.textContent = element;
        }
        return {
            target : example,
            append : false
        };
    },
    dispose : function (owner) {
        DOM_REMOVE_CHILD(this.example);
    }
};
var COMMENT_RENDERER = {
    initial : function (owner, namespace, collect) {
        var current = this;
        var example = DOM_CREATE_COMMENT("");

        current.example = example;

        return {
            target : example,
            append : true
        };
    },
    renewal : function (owner, namespace, collect, element) {
        var current = this;
        var example = current.example;
        return {
            target : example,
            append : false
        };
    },
    dispose : function (owner) {
        DOM_REMOVE_CHILD(this.example);
    }
};


/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */
/* ============================ */


Elf.Promise       = PROMISE_CREATOR;
Elf.Trustor       = TRUSTOR_COMPILER;

Elf.require       = function (modname) {
    return REQUIRE_IMPORT(CONST_AMD_OPTIONS.baseURL || "")(modname);
};

Elf.setTimeout    = function (fn, duration) {
    return { dispose : WIN.clearTimeout.bind(WIN, WIN.setTimeout(FUN_WRAP(fn), duration)) };
};
Elf.setInterval   = function (fn, duration) {
    return { dispose : WIN.clearInterval.bind(WIN, WIN.setInterval(FUN_WRAP(fn), duration)) };
};
Elf.setImmediate  = function (fn) {
    return { dispose : WIN.cancelAnimationFrame.bind(WIN.requestAnimationFrame(FUN_WRAP(fn))) };
};


Elf.createClass   = function (proto) {
    return (function (constructor) {
        return constructor.prototype = proto, constructor;
    } (
        (function (parent) {
            return function () { parent.apply(this, arguments); };
        } (proto.constructor || NOOP))
    ));
};
Elf.createEvent   = function (type, bubbles, value) {
    return {
        type            : FUN_LOWER(type),
        value           : value,
        bubbles         : !!bubbles,
        refresh         : false,
        cancelable      : false,
        defaultPrevented: false,
        target          : null,
        preventDefault  : NOOP,
        preventRefresh  : EXHIBIT_EVENT_REFRESH,
        stopPropagation : EXHIBIT_EVENT_BUBBLES
    };
};
Elf.attachEvent   = function (node, type, listener) {
    if (HAS_PROP(node, TXT_EXHIBIT_RENDERER)) {
        node[TXT_EXHIBIT_RENDERER].attachEvent(type, listener);
    } else {
        DOM_ATTACH_EVENT(node, type, listener);
    }
};
Elf.detachEvent   = function (node, type, listener) {
    if (HAS_PROP(node, TXT_EXHIBIT_RENDERER)) {
        node[TXT_EXHIBIT_RENDERER].detachEvent(type, listener);
    } else {
        DOM_DETACH_EVENT(node, type, listener);
    }
};
Elf.dispatchEvent = function (node, event) {
    if (HAS_PROP(node, TXT_EXHIBIT_RENDERER)) {
        node[TXT_EXHIBIT_RENDERER].dispatchEvent(event);
    } else {
        DOM_BUBBLE_EVENT(node, event.originalEvent || event);
    }
};
Elf.createElement = function (type, props) {
    var natures = props || {};
    var insider = FUN_FLAT(AS_ARRAY.call(arguments, 2));
    var element = {
        props : {},
        type  : type,
        cmd   : natures.cmd || [],
        key   : natures.key,
        ref   : natures.ref
    };
    for (var name in natures) {
        if (name !== "cmd" &&
            name !== "key" &&
            name !== "ref" &&
            IS_ACTUAL(natures[name])) {
            element.props[name] = natures[name];
        }
    }
    DEF_PROP(element.props, "children", insider);
    return element;
};
Elf.redactElement = function (temp) {
    if (IS_STRING(temp)) {
        var component = {};
        var directive = {};
        var transform = {};
        FUN_FLAT(AS_ARRAY.call(arguments, 1)).forEach(function (ns) {
            if (HAS_PROP(ns, TXT_EXHIBIT_COMPONENT)) {
                DEF_PROP(component, ns[TXT_EXHIBIT_COMPONENT], ns);
            }
            if (HAS_PROP(ns, TXT_EXHIBIT_DIRECTIVE)) {
                DEF_PROP(directive, ns[TXT_EXHIBIT_DIRECTIVE], ns);
            }
            if (HAS_PROP(ns, TXT_EXHIBIT_TRANSFORM)) {
                DEF_PROP(transform, ns[TXT_EXHIBIT_TRANSFORM], ns);
            }
        });
        var provide = {
            v : Elf.createElement,
            m : EXHIBIT_ENGINE_LOOPS,
            c : EXHIBIT_ENGINE_QNAME(component),
            d : EXHIBIT_ENGINE_ORDER(directive),
            t : EXHIBIT_ENGINE_PIPER(transform)
        };
        var trustor = new Function("Elf", "with(this){return " + GAN_ELEMENT(TPL_XHTML_PARSER(temp.trim())) + "}");
        return function () { return trustor.call(IS_ACTUAL(this) && this !== WIN ? this : {}, provide); };
    }
    return temp;
};

Elf.Component     = function (name, redactor) {
    return function (target) {
        if (redactor) {
            target.prototype.render = redactor;
        }
        return DEF_PROP(target, TXT_EXHIBIT_COMPONENT, name);
    };
};
Elf.Directive     = function (name) {
    return function (target) {
        return DEF_PROP(target, TXT_EXHIBIT_DIRECTIVE, name);
    };
};
Elf.Transform     = function (name) {
    return function (target) {
        return DEF_PROP(target, TXT_EXHIBIT_TRANSFORM, name);
    };
};


Elf.render        = function (element, container, duplex) {
    var monitor;
    var collect = [];
    var example = {
        refs         : {},
        dispose      : RENDER_DISPOSE,
        forceUpdate  : RENDER_RENEWAL
    };
    var manager = Object.create(RADICAL_RENDERER, {
        element      : NEW_PROP(element),
        creator      : NEW_PROP(container)
    });
    var realtor = manager.initial(example, null, collect);
    if (duplex) {
        monitor = ACT_SUBSCRIBE(RENDER_RENEWAL);
    }
    RENDER_INITIAL();
    RENDER_EXPLODE();
    return example;
    function RENDER_DISPOSE () {
        if (monitor) {
            monitor.dispose();
        }
        manager.dispose();
        manager = null;
        monitor = null;
        collect = null;
        realtor = null;
    }
    function RENDER_RENEWAL () {
        realtor = manager.renewal(example, null, collect, element);
        RENDER_INITIAL();
        RENDER_EXPLODE();
    }
    function RENDER_EXPLODE () {
        FUN_CLEAN(collect, FUN_APPLY());
    }
    function RENDER_INITIAL () {
        if (realtor.append) {
            DOM_HOLLOW_CHILD(container);
            DOM_APPEND_CHILD(container, realtor.target);
        }
    }
};
Elf.depend        = function () {
    FUN_FLAT(AS_ARRAY.call(arguments)).forEach(function (ns) {
        if (HAS_PROP(ns, TXT_EXHIBIT_COMPONENT)) {
            DEF_PROP(COMPONENT_DEPENDS, ns[TXT_EXHIBIT_COMPONENT], ns);
        }
        if (HAS_PROP(ns, TXT_EXHIBIT_DIRECTIVE)) {
            DEF_PROP(DIRECTIVE_DEPENDS, ns[TXT_EXHIBIT_DIRECTIVE], ns);
        }
        if (HAS_PROP(ns, TXT_EXHIBIT_TRANSFORM)) {
            DEF_PROP(TRANSFORM_DEPENDS, ns[TXT_EXHIBIT_TRANSFORM], ns);
        }
    });
};

Elf.config        = function (options) {
    CONST_AMD_OPTIONS = options;
};
Elf.set           = function (modname, value) {
    CONST_AMD_MODULES[modname] = TRUSTOR_RAW(value, modname);
};

} (this.Elf = {}));