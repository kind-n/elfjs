/**
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 2.1.1
 * @license MIT
 * 
 */
"use strict";

! (function (exports, Threads, NODE_ENV) {

    function trim(value) {
        return value.trim();
    }
    function last(value) {
        return value[value.length - 1];
    }
    function tear(value) {
        return (value.slice || Array.prototype.slice).apply(value, Array.prototype.slice.call(arguments, 1));
    }
    function lower(value) {
        return value.toLowerCase();
    }
    function wrong(error) {
        throw error;
    }
    function clean(value, fn) {
        while (value.length) {
            fn(value.pop());
        }
    }
    function reset(value, newly) {
        value.splice.apply(value, [0, value.length].concat(newly));
    }
    function exists(value, name) {
        return isValid(value) && !isBasic(value) && (name in value);
    }
    function equals(value, hoary) {
        if (value === hoary) {
            return true;
        }
        if (isObject(value) &&
            isObject(hoary)) {
            for (var name in value) {
                if (!exists(hoary, name)) { return false; }
                if (!equals(value[name], hoary[name])) { return false; }
            }
            for (var name in hoary) {
                if (!exists(value, name)) { return false; }
            }
            return true;
        }
        return false;
    }
    function define(value, name, descriptor) {
        return Object.defineProperty(value, name, descriptor);
    }
    function flatten(value) {
        var result = [];
        var length = value.length;
        for (var i = 0; i < length; i++) {
            var ns = value[i];
            if (Array.isArray(ns)) {
                if (ns.length) {
                    result.push.apply(result, flatten(ns));
                }
            } else {
                if (isValid(ns)) {
                    result.push(ns);
                }
            }
        }
        return result;
    }
    function intrude(array, value) {
        return array.indexOf(value) < 0 ? array.push(value) === 1 : false;
    }
    function extrude(array, value) {
        var index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
            return !array.length;
        }
        return false;
    }
    function observe(fn, parameters) {
        return function () {
            var instance = exports.createEvent("async");
            fn.apply(this, [instance].concat(parameters));
            instance.refreshPrevented || broadcast();
        };
    }
    function describe(value, enumerable) {
        return {
            configurable: true,
            enumerable: !!enumerable,
            writable: true,
            value: value
        };
    }
    function stringify(value) {
        return JSON.stringify(value);
    }
    function subscribe(value) {
        return intrude(collectivity, value), {
            dispose: extrude.bind(null, collectivity, value)
        };
    }
    function broadcast() {
        if (NODE_ENV) {
            return false;
        }
        if (isUnoccupied) {
            isUnoccupied = false;
            requestAnimationFrame(function () {
                try {
                    collectivity.forEach(function (i) {
                        i.duplex && i.forceUpdate();
                    });
                } finally {
                    isUnoccupied = true;
                }
            });
        }
        return !isUnoccupied;
    }

    function safeMember(value) {
        return typeof Symbol !== "undefined" ? Symbol(value) : value;
    }
    function safeDomain(value) {
        return typeof Proxy !== "undefined" && exports.$safeScope ? new Proxy(value, {
            has: function (value, name) {
                return exists(value, name) || !(exists(allowedGlobalVariates, name) || wrong(new Error(name + " is not defined")));
            }
        }) : value;
    }
    function startsWith(total, value, start) {
        var number = start || 0;
        var length = value.length;
        for (var i = 0; i < length; i++) {
            if (value.charAt(i) !== total.charAt(number + i)) {
                return false;
            }
        }
        return true;
    }
    function assertEvent(value) {
        return isValid(value) && (isFunction(value) || isFunction(value.handleEvent)) || wrong(new Error("Invalid event listener"));
    }
    function createClass(proto) {
        return (function (constructor) {
            return constructor.prototype = proto, constructor;
        }(
            (function (parent) {
                return function () { parent.apply(this, arguments); };
            }(proto.constructor || NOOP))
        ));
    }

    function isValid(value) {
        return value !== null && value !== void 0;
    }
    function isBasic(value) {
        return isString(value)
            || typeof value === "number"
            || typeof value === "boolean";
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isObject(value) {
        return isValid(value)
            && typeof value === "object";
    }
    function isAllied(value, lowerCase) {
        return value.length === lowerCase.length && lower(value) === lowerCase;
    }
    function isFunction(value) {
        return typeof value === "function";
    }
    function isEventAttribute(value) {
        return startsWith(value, exports.$eventStart);
    }
    function isInheritedClass(value, constructor) {
        return value instanceof constructor;
    }

    function DOMAddListener(element, type, listener) {
        element.addEventListener(type, listener, false);
    }
    function DOMDelListener(element, type, listener) {
        element.removeEventListener(type, listener, false);
    }
    function DOMSetProperty(element, name, value) {
        switch (htmlAttributeSpecials[name] || 0) {
            case 0:
                element.setAttribute(name, value);
                break;
            case 1:
                element[name].cssText = DOMFormatStyle(value);
                break;
            case 2:
                element[name] = (value === false) ? value : true;
                break;
            case 3:
                element[name] = DOMFormatClass(value);
                break;
            case 4:
                element[name] = value;
                break;
        }
    }
    function DOMDelProperty(element, name) {
        switch (htmlAttributeSpecials[name] || 0) {
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
            case 4:
                element[name] = "";
                break;
        }
    }
    function DOMInsertChild(element, child, previous) {
        element.insertBefore(child, previous || null);
    }
    function DOMRemoveChild(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    function DOMFormatStyle(value) {
        return isObject(value) ? exports.$map(value, function (value, token) {
            return token.replace(/[A-Z]/g, function (value) {
                return "-" + lower(value);
            }) + ":" + value;
        }).join("; ") : value;
    }
    function DOMFormatClass(value) {
        return isObject(value) ? flatten(exports.$map(value, function (value, token) {
            return value ? token : null;
        })).join(" ") : value;
    }

    function GlobalMethodListener(event) {
        var instance = new SyntheticEvent(event);
        this[DISPLAYING_RENDERER].dispatchEvent(instance);
        instance.refreshPrevented || broadcast();
        event.stopImmediatePropagation();
    }
    function GlobalMethodLauncher(value) {
        return value[DISPLAYING_RENDERER] || (value[DISPLAYING_RENDERER] = new LibertyManager(value));
    }

    function NOOP () {}

    var PENDING  = "pending";
    var RESOLVED = "resolved";
    var REJECTED = "rejected";
    
    var LIFE_CYCLE_INITIAL = "onInitial";
    var LIFE_CYCLE_RENEWAL = "onRenewal";
    var LIFE_CYCLE_DISPOSE = "onDispose";

    var REGEXP_TEMPLATE_WORD = /\S/;
    var REGEXP_TEMPLATE_NAME = /[:A-Za-z0-9][-:\w]*/;
    var REGEXP_TEMPLATE_EACH = /(\S.*)(\s+(?:in|of)\s+)(.*\S)/;
    var REGEXP_TEMPLATE_ATTR = /([^\s"'<>/=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'<>/=]+)))?/;
    var REGEXP_UNESCAPE_CHAR = /&(?:([a-zA-Z][0-9a-zA-Z]*)|#([0-9]+)|#[Xx]([0-9a-fA-F]+));/g;

    var REGEXP_SEPARATOR_CMD = /[,\s]+/;
    var REGEXP_SEPARATOR_ARG = /\s/;
    var REGEXP_SEPARATOR_FIT = /\|/;

    var collectivity = [];
    var isUnoccupied = true;
    var svgNamespace = "http://www.w3.org/2000/svg";
    var mmlNamespace = "http://www.w3.org/1998/Math/MathML";

    var ajaxAttributeDefaults = {
        timeout: 0,
        responseType: "",
        withCredentials: false
    };
    var htmlAttributeMappings = {
        // prop mappings.
        autoFocus: "autofocus",
        autoPlay: "autoplay",
        "class": "className",
        "for": "htmlFor",
        novalidate: "noValidate",
        formnovalidate: "formNoValidate",
        readonly: "readOnly",
        // attr mappings.
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
    var htmlUnescapedMappings = {
        quot: "\x22",
        amp: "\x26",
        lt: "\x3c",
        gt: "\x3e",
        nbsp: "\xa0",
        iexcl: "\xa1",
        cent: "\xa2",
        pound: "\xa3",
        curren: "\xa4",
        yen: "\xa5",
        brvbar: "\xa6",
        sect: "\xa7",
        uml: "\xa8",
        copy: "\xa9",
        ordf: "\xaa",
        laquo: "\xab",
        not: "\xac",
        shy: "\xad",
        reg: "\xae",
        macr: "\xaf",
        deg: "\xb0",
        plusmn: "\xb1",
        sup2: "\xb2",
        sup3: "\xb3",
        acute: "\xb4",
        micro: "\xb5",
        para: "\xb6",
        middot: "\xb7",
        cedil: "\xb8",
        sup1: "\xb9",
        ordm: "\xba",
        raquo: "\xbb",
        frac14: "\xbc",
        frac12: "\xbd",
        frac34: "\xbe",
        iquest: "\xbf",
        Agrave: "\xc0",
        Aacute: "\xc1",
        Acirc: "\xc2",
        Atilde: "\xc3",
        Auml: "\xc4",
        Aring: "\xc5",
        AElig: "\xc6",
        Ccedil: "\xc7",
        Egrave: "\xc8",
        Eacute: "\xc9",
        Ecirc: "\xca",
        Euml: "\xcb",
        Igrave: "\xcc",
        Iacute: "\xcd",
        Icirc: "\xce",
        Iuml: "\xcf",
        ETH: "\xd0",
        Ntilde: "\xd1",
        Ograve: "\xd2",
        Oacute: "\xd3",
        Ocirc: "\xd4",
        Otilde: "\xd5",
        Ouml: "\xd6",
        times: "\xd7",
        Oslash: "\xd8",
        Ugrave: "\xd9",
        Uacute: "\xda",
        Ucirc: "\xdb",
        Uuml: "\xdc",
        Yacute: "\xdd",
        THORN: "\xde",
        szlig: "\xdf",
        agrave: "\xe0",
        aacute: "\xe1",
        acirc: "\xe2",
        atilde: "\xe3",
        auml: "\xe4",
        aring: "\xe5",
        aelig: "\xe6",
        ccedil: "\xe7",
        egrave: "\xe8",
        eacute: "\xe9",
        ecirc: "\xea",
        euml: "\xeb",
        igrave: "\xec",
        iacute: "\xed",
        icirc: "\xee",
        iuml: "\xef",
        eth: "\xf0",
        ntilde: "\xf1",
        ograve: "\xf2",
        oacute: "\xf3",
        ocirc: "\xf4",
        otilde: "\xf5",
        ouml: "\xf6",
        divide: "\xf7",
        oslash: "\xf8",
        ugrave: "\xf9",
        uacute: "\xfa",
        ucirc: "\xfb",
        uuml: "\xfc",
        yacute: "\xfd",
        thorn: "\xfe",
        yuml: "\xff"
    };
    var htmlAttributeSpecials = {
        async: 2,
        autofocus: 2,
        autoplay: 2,
        checked: 2,
        className: 3,
        controls: 2,
        "default": 2,
        defaultValue: 4,
        defaultChecked: 2,
        defer: 2,
        disabled: 2,
        hidden: 2,
        htmlFor: 4,
        innerHTML: 4,
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
        value: 4,
        // ignore it.
        children: 9
    };
    var htmlElementSolitaries = {
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
    var eventUsefulAttributes = {
        altKey: 0,
        animationName: 0,
        button: 0,
        buttons: 0,
        changedTouches: 0,
        charCode: 0,
        clientX: 0,
        clientY: 0,
        clipboardData: 0,
        ctrlKey: 0,
        data: 0,
        dataTransfer: 0,
        deltaMode: 0,
        deltaX: 0,
        deltaY: 0,
        deltaZ: 0,
        detail: 0,
        elapsedTime: 0,
        key: 0,
        keyCode: 0,
        locale: 0,
        location: 0,
        metaKey: 0,
        pageX: 0,
        pageY: 0,
        propertyName: 0,
        relatedTarget: 0,
        repeat: 0,
        screenX: 0,
        screenY: 0,
        shiftKey: 0,
        targetTouches: 0,
        timeStamp: 0,
        touches: 0,
        which: 0
    };
    var allowedModifyDrawings = {
        email: 0,
        number: 0,
        password: 0,
        search: 0,
        text: 0,
        tel: 0,
        url: 0
    };
    var allowedGlobalVariates = {
        Array: 0,
        Boolean: 0,
        Date: 0,
        Infinity: 0,
        Intl: 0,
        JSON: 0,
        Map: 0,
        Math: 0,
        NaN: 0,
        Number: 0,
        Object: 0,
        RegExp: 0,
        Set: 0,
        String: 0,
        decodeURI: 0,
        decodeURIComponent: 0,
        encodeURI: 0,
        encodeURIComponent: 0,
        escape: 0,
        isFinite: 0,
        isNaN: 0,
        parseFloat: 0,
        parseInt: 0,
        undefined: 0,
        unescape: 0,
        // elfjs.
        Elf: 0
    };
    var communityComponentDep = {};
    var communityDirectiveDep = {};
    var communityTransformDep = {};
    var temporaryComponentDep = [];
    var temporaryDirectiveDep = [];
    var temporaryTransformDep = [];
    var temporaryElementOwner = [];

    var COMMITMENT_STATUS = safeMember("Promise.status");
    var COMMITMENT_RESULT = safeMember("Promise.result");
    var COMMITMENT_OBSERVE = safeMember("Promise.observe");
    var COMMITMENT_CAPTURE = safeMember("Promise.capture");
    var COMMITMENT_DISPOSE = safeMember("Promise.dispose");
    var DISPLAYING_INSTANCE = safeMember("Display.instance");
    var DISPLAYING_RENDERER = safeMember("Display.renderer");
    var DISPLAYING_COMPONENT = safeMember("Display.component");
    var DISPLAYING_DIRECTIVE = safeMember("Display.directive");
    var DISPLAYING_TRANSFORM = safeMember("Display.transform");
    var EVENT_STATUS_TRACKER = safeMember("Event.tracker");
    var EVENT_CONTACT_TARGET = safeMember("Event.contact");
    var EVENT_CURRENT_TARGET = safeMember("Event.current");
    var EVENT_ORIGINAL_EVENT = safeMember("Event.product");

    var CommentManager;
    var ContentManager;
    var ComplexManager;
    var ElementManager;
    var LibertyManager;

    var MKEmitter = function (manager) {
        return {
            E: {},
            M: function (type) {
                return this.E[lower(type)] || (this.E[lower(type)] = []);
            },
            attachEvent: function (type, listener) {
                intrude(this.M(type), listener) && manager.connate && DOMAddListener(manager.product, type, GlobalMethodListener);
            },
            detachEvent: function (type, listener) {
                extrude(this.M(type), listener) && manager.connate && DOMDelListener(manager.product, type, GlobalMethodListener);
            },
            replace: function (type, listenerPair) {
                var events = this.M(type);
                var number = events.indexOf(listenerPair.hoary);
                if (number >= 0) {
                    events.splice(number, 1, listenerPair.newly);
                }
            },
            trigger: function (event) {
                var target = manager.product;
                var events = tear(this.M(event.type));
                var length = events.length;
                for (var i = 0; i < length; i++) {
                    var listener = events[i];
                    var instance = new SyntheticEvent(event, null, target);
                    if (listener.handleEvent) {
                        listener.handleEvent(instance);
                    } else {
                        listener.call(target, instance);
                    }
                    if (instance.cancelEntire) {
                        break;
                    }
                }
            },
            dispose: function () {
                if (manager.connate) {
                    for (var name in this.E) {
                        DOMDelListener(manager.product, name, GlobalMethodListener);
                    }
                }
                this.E = {};
            }
        };
    };
    var MKRealtor = function (element, newly) {
        return { value: element, newly: newly };
    };
    var MKDraught = function (element, parent) {
        return isValid(element)
            ? isObject(element)
            ? isString(element.type)
            ? new ElementManager(parent, element)
            : new ComplexManager(parent, element)
            : new ContentManager(parent, element)
            : new CommentManager(parent);
    };
    var MKVariety = function (natures, ancient) {
        var variety = {
            hoary: {},
            newly: {},
            alter: {}
        };
        if (natures !== ancient) {
            for (var name in ancient) {
                if (!exists(natures, name)) {
                    variety.hoary[name] = ancient[name];
                } else if (!equals(natures[name], ancient[name])) {
                    variety.alter[name] = {
                        hoary: ancient[name],
                        newly: natures[name]
                    };
                }
            }
            for (var name in natures) {
                if (!exists(ancient, name)) {
                    variety.newly[name] = natures[name];
                }
            }
        }
        return variety;
    };
    var MKUnitary = function (trustor) {
        return trustor[DISPLAYING_INSTANCE] || (trustor[DISPLAYING_INSTANCE] = new trustor());
    };
    var MKVirtual = function (product) {
        temporaryElementOwner.push(product);
        try {
            return product.render();
        } finally {
            temporaryElementOwner.pop();
        }
    };

    var VMRectifyEvent = function (value) {
        return lower(tear(value, exports.$eventStart.length));
    };
    var VMRectifyTrait = function (value) {
        return htmlAttributeMappings[value] || value;
    };
    var VMNeedBubbling = function (event) {
        return event.bubbles && !event.cancelBubble;
    };
    var VMNoneedRedraw = function (value, hoary) {
        if (value === hoary) {
            return true;
        }
        if (isObject(value) &&
            isObject(hoary)) {
            var valueType = value.type;
            if (value.key !== hoary.key ||
                valueType !== hoary.type) {
                return false;
            }
            if (isString(valueType) &&
                isAllied(valueType, "input")) {
                var tA = value.props.type;
                var tB = hoary.props.type;
                return tA === tB
                    || exists(allowedModifyDrawings, tA)
                    && exists(allowedModifyDrawings, tB);
            }
            return true;
        }
        return isValid(value) === isValid(hoary)
            && isBasic(value) === isBasic(hoary);
    };

    var VMSetOffspring = function (members, product, manager, insider, document, namespace, collect) {
        for (var i = 0, length = insider.length; i < length; i++) {
            var draught = MKDraught(insider[i], manager);
            var realtor = draught.initial(document, namespace, collect);
            realtor.newly && DOMInsertChild(product, realtor.value);
            members.push(draught);
        }
    };
    var VMModOffspring = function (members, product, manager, insider, document, namespace, collect) {
        var deposit = new Array(insider.length);
        var leaguer = insider.map(function (i) {
            return { element: i, product: null };
        });
        var oldTokenIndex;
        var oldTokenPairs;
        var oldStartIndex = 0;
        var newStartIndex = 0;
        var oldEndedIndex = members.length - 1;
        var oldStartVMsgr = members[0];
        var oldEndedVMsgr = members[oldEndedIndex];
        var newEndedIndex = leaguer.length - 1;
        var newStartVMsgr = leaguer[0];
        var newEndedVMsgr = leaguer[newEndedIndex];
        while (oldStartIndex <= oldEndedIndex && newStartIndex <= newEndedIndex) {
            if (!isValid(oldStartVMsgr)) {
                oldStartVMsgr = members[++oldStartIndex];
            } else if (!isValid(oldEndedVMsgr)) {
                oldEndedVMsgr = members[--oldEndedIndex];
            } else if (VMModCompareWithElements(oldStartVMsgr, newStartVMsgr)) {
                VMModMoveOrInsertElement(
                    VMModGetAuthenticElement(oldStartVMsgr).nextSibling,
                    VMModInvokeUpdateElement(oldStartVMsgr, newStartVMsgr, newStartIndex),
                    false
                );
                oldStartVMsgr = members[++oldStartIndex];
                newStartVMsgr = leaguer[++newStartIndex];
            } else if (VMModCompareWithElements(oldEndedVMsgr, newEndedVMsgr)) {
                VMModMoveOrInsertElement(
                    VMModGetAuthenticElement(oldEndedVMsgr).nextSibling,
                    VMModInvokeUpdateElement(oldEndedVMsgr, newEndedVMsgr, newEndedIndex),
                    false
                );
                oldEndedVMsgr = members[--oldEndedIndex];
                newEndedVMsgr = leaguer[--newEndedIndex];
            } else if (VMModCompareWithElements(oldStartVMsgr, newEndedVMsgr)) {
                VMModMoveOrInsertElement(
                    VMModGetAuthenticElement(oldEndedVMsgr).nextSibling,
                    VMModInvokeUpdateElement(oldStartVMsgr, newEndedVMsgr, newEndedIndex),
                    true
                );
                oldStartVMsgr = members[++oldStartIndex];
                newEndedVMsgr = leaguer[--newEndedIndex];
            } else if (VMModCompareWithElements(oldEndedVMsgr, newStartVMsgr)) {
                VMModMoveOrInsertElement(
                    VMModGetAuthenticElement(oldStartVMsgr),
                    VMModInvokeUpdateElement(oldEndedVMsgr, newStartVMsgr, newStartIndex),
                    true
                );
                oldEndedVMsgr = members[--oldEndedIndex];
                newStartVMsgr = leaguer[++newStartIndex];
            } else {
                VMModGetIndexFromMembers(newStartVMsgr, oldStartIndex, oldEndedIndex);
                VMModMoveOrInsertElement(
                    VMModGetAuthenticElement(oldStartVMsgr),
                    VMModCreateOrUpdateVMsgr(newStartVMsgr, newStartIndex),
                    true
                );
                newStartVMsgr = leaguer[++newStartIndex];
            }
        }
        if (oldStartIndex > oldEndedIndex) {
            VMModBatchCreateElements(
                VMModGetAuthenticElement(leaguer[newEndedIndex + 1]), newStartIndex, newEndedIndex);
        } else if (newStartIndex > newEndedIndex) {
            VMModBatchRemoveElements(oldStartIndex, oldEndedIndex);
        }
        reset(members, deposit);
        function VMModGetAuthenticElement(manager) {
            return manager ? manager.draught ? VMModGetAuthenticElement(manager.draught) : manager.product : null;
        }
        function VMModCreateSingleElement(updated, number) {
            var draught = MKDraught(updated.element, manager);
            var realtor = draught.initial(document, namespace, collect);
            updated.product = realtor.value;
            deposit[number] = draught;
            return realtor;
        }
        function VMModCreateOrUpdateVMsgr(updated, number) {
            if (isValid(oldTokenIndex)) {
                var ancient = members[oldTokenIndex];
                if (VMModCompareWithElements(ancient, updated)) {
                    members[oldTokenIndex] = null;
                    return VMModInvokeUpdateElement(ancient, updated, number);
                }
            }
            return VMModCreateSingleElement(updated, number);
        }
        function VMModCompareWithElements(ancient, updated) {
            return VMNoneedRedraw(ancient.element, updated.element);
        }
        function VMModInvokeUpdateElement(ancient, updated, number) {
            var realtor = ancient.renewal(document, namespace, collect, updated.element);
            updated.product = realtor.value;
            deposit[number] = ancient;
            return realtor;
        }
        function VMModMoveOrInsertElement(address, realtor, remain) {
            if (realtor.newly || remain) {
                DOMInsertChild(product, realtor.value, address);
            }
        }
        function VMModGetIndexFromMembers(updated, start, ended) {
            oldTokenPairs = oldTokenPairs || VMModCreateIndexMapByKey(start, ended);
            oldTokenIndex = updated.element.key ? oldTokenPairs[updated.element.key] : VMModFindIndexByIterator(updated, start, ended);
        }
        function VMModFindIndexByIterator(updated, start, ended) {
            for (var i = start; i <= ended; i++) {
                if (members[i] && VMNoneedRedraw(members[i].element, updated.element)) {
                    return i;
                }
            }
        }
        function VMModBatchCreateElements(address, start, ended) {
            for (var i = start; i <= ended; i++) {
                VMModMoveOrInsertElement(
                    address,
                    VMModCreateSingleElement(leaguer[i], i),
                    true
                );
            }
        }
        function VMModBatchRemoveElements(start, ended) {
            for (var i = start; i <= ended; i++) {
                if (members[i]) {
                    members[i].dispose();
                }
            }
        }
        function VMModCreateIndexMapByKey(start, ended) {
            var result = {};
            for (var i = start; i <= ended; i++) {
                var sn = members[i].element.key;
                if (sn) {
                    result[sn] = i;
                }
            }
            return result;
        }
    };
    var VMDelOffspring = function (members) {
        clean(members, function (draught) {
            draught.dispose();
        });
    };
    var VMSetAttribute = function (natures, manager) {
        for (var name in natures) {
            if (isEventAttribute(name)) {
                manager.attachEvent(VMRectifyEvent(name), natures[name]);
            } else if (manager.connate) {
                DOMSetProperty(manager.product, VMRectifyTrait(name), natures[name]);
            }
        }
    };
    var VMModAttribute = function (variety, manager) {
        VMDelAttribute(variety.hoary, manager);
        VMSetAttribute(variety.newly, manager);
        for (var name in variety.alter) {
            if (isEventAttribute(name)) {
                manager.emitter.replace(VMRectifyEvent(name), variety.alter[name]);
            } else if (manager.connate) {
                DOMSetProperty(manager.product, VMRectifyTrait(name), variety.alter[name].newly);
            }
        }
    };
    var VMDelAttribute = function (natures, manager) {
        for (var name in natures) {
            if (isEventAttribute(name)) {
                manager.detachEvent(VMRectifyEvent(name), natures[name]);
            } else if (manager.connate) {
                DOMDelProperty(manager.product, VMRectifyTrait(name));
            }
        }
    };

    var VMSetDirective = NODE_ENV ? NOOP : function (behests, product, natures, command, collect) {
        for (var i = 0, length = command.length; i < length; i++) {
            var dictate = MKUnitary(command[i]);
            if (dictate[LIFE_CYCLE_INITIAL]) {
                collect.push(dictate[LIFE_CYCLE_INITIAL].bind(dictate, product, natures));
            }
            behests.push(dictate);
        }
    };
    var VMModDirective = NODE_ENV ? NOOP : function (behests, product, natures, command, collect) {
        var deposit = [];
        for (var i = 0, length = behests.length; i < length; i++) {
            var sn = VMModCommandIndex(behests[i]);
            if (sn < 0) {
                if (behests[i][LIFE_CYCLE_DISPOSE]) {
                    behests[i][LIFE_CYCLE_DISPOSE](product, natures);
                }
            }
        }
        for (var i = 0, length = command.length; i < length; i++) {
            var sn = VMModBehestsIndex(command[i]);
            if (sn < 0) {
                var dictate = MKUnitary(command[i]);
                if (dictate[LIFE_CYCLE_INITIAL]) {
                    collect.push(dictate[LIFE_CYCLE_INITIAL].bind(dictate, product, natures));
                }
                deposit.push(dictate);
            } else {
                if (behests[sn][LIFE_CYCLE_RENEWAL]) {
                    collect.push(behests[sn][LIFE_CYCLE_RENEWAL].bind(dictate, product, natures));
                }
                deposit.push(behests[sn]);
            }
        }
        reset(behests, deposit);
        function VMModCommandIndex(value) {
            for (var i = 0, length = command.length; i < length; i++) {
                if (isInheritedClass(value, command[i])) {
                    return i;
                }
            }
            return -1;
        }
        function VMModBehestsIndex(value) {
            for (var i = 0, length = behests.length; i < length; i++) {
                if (isInheritedClass(behests[i], value)) {
                    return i;
                }
            }
            return -1;
        }
    };
    var VMDelDirective = NODE_ENV ? NOOP : function (behests, product, natures) {
        clean(behests, function (dictate) {
            if (dictate[LIFE_CYCLE_DISPOSE]) {
                dictate[LIFE_CYCLE_DISPOSE](product, natures);
            }
        });
    };
    var VMSetReference = NODE_ENV ? NOOP : function (element, product) {
        if (element.owner && element.ref) {
            element.owner.refs[element.ref] = product;
        }
    };
    var VMModReference = NODE_ENV ? NOOP : function (element, product, updated) {
        if (element.ref !== updated.ref ||
            element.owner !== updated.owner) {
            VMDelReference(element, product);
            VMSetReference(updated, product);
        }
    };
    var VMDelReference = NODE_ENV ? NOOP : function (element, product) {
        if (element.owner && element.ref &&
            element.owner.refs[element.ref] === product) {
            delete element.owner.refs[element.ref];
        }
    };
    var VMSetLifeCycle = NODE_ENV ? NOOP : function (product, collect) {
        if (product[LIFE_CYCLE_INITIAL]) {
            collect.push(product[LIFE_CYCLE_INITIAL].bind(product));
        }
    };
    var VMModLifeCycle = NODE_ENV ? NOOP : function (product, collect) {
        if (product[LIFE_CYCLE_RENEWAL]) {
            collect.push(product[LIFE_CYCLE_RENEWAL].bind(product));
        }
    }
    var VMDelLifeCycle = NODE_ENV ? NOOP : function (product) {
        if (product[LIFE_CYCLE_DISPOSE]) {
            product[LIFE_CYCLE_DISPOSE]();
        }
    };

    CommentManager = createClass({
        constructor: function (parent) {
            this.parent = parent;
        },
        initial: function (document, namespace, collect) {
            return MKRealtor(this.product = document.createComment(""), true);
        },
        renewal: function (document, namespace, collect, updated) {
            return MKRealtor(this.product, false);
        },
        dispose: function () {
            DOMRemoveChild(this.product);
        }
    });
    ContentManager = createClass({
        constructor: function (parent, element) {
            this.parent = parent;
            this.element = element;
        },
        initial: function (document, namespace, collect) {
            return MKRealtor(this.product = document.createTextNode(this.element), true);
        },
        renewal: function (document, namespace, collect, updated) {
            if (this.element !== updated) {
                this.product.textContent = this.element = updated;
            }
            return MKRealtor(this.product, false);
        },
        dispose: function () {
            DOMRemoveChild(this.product);
        }
    });
    ComplexManager = createClass({
        constructor: function (parent, element) {
            this.parent = parent;
            this.element = element;
            this.emitter = MKEmitter(this);
            this.connate = false;
        },
        initial: function (document, namespace, collect) {
            var manager = this;
            var element = manager.element;
            var natures = element.props;
            var trustor = element.type;
            var command = element.cmd;
            var behests = [];
            var product;
            var draught;
            var realtor;

            product = Object.create(trustor.prototype);
            product[DISPLAYING_RENDERER] = manager;
            product.props = natures;
            product.state = {};
            product.refs = {};
            if (product.constructor) {
                product.constructor();
            }
            draught = MKDraught(MKVirtual(product), manager);
            realtor = draught.initial(document, namespace, collect);

            manager.behests = behests;
            manager.product = product;
            manager.draught = draught;

            VMSetAttribute(natures, manager);
            VMSetDirective(behests, product, natures, command, collect);
            VMSetReference(element, product);
            VMSetLifeCycle(product, collect);

            return realtor;
        },
        renewal: function (document, namespace, collect, updated) {
            var manager = this;
            var element = manager.element;
            var behests = manager.behests;
            var draught = manager.draught;
            var product = manager.product;
            var natures = updated.props;
            var command = updated.cmd;
            var virtual;
            var variety;
            var realtor;

            manager.element = updated;
            product.props = natures;
            virtual = MKVirtual(product);
            variety = MKVariety(natures, element.props);

            if (VMNoneedRedraw(virtual, draught.element)) {
                realtor = draught.renewal(document, namespace, collect, virtual);
            } else {
                draught.dispose();
                draught = MKDraught(virtual, manager);
                realtor = draught.initial(document, namespace, collect);
                manager.draught = draught;
            }

            VMModAttribute(variety, manager);
            VMModReference(element, product, updated);
            VMModDirective(behests, product, natures, command, collect);
            VMModLifeCycle(product, collect);

            return realtor;
        },
        dispose: function () {
            var manager = this;
            var behests = manager.behests;
            var product = manager.product;
            var element = manager.element;

            VMDelDirective(behests, product, element.props);
            VMDelReference(element, product);
            VMDelLifeCycle(product);

            manager.emitter.dispose();
            manager.draught.dispose();
        },
        trigger: function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (VMNeedBubbling(event)) {
                this.parent.trigger(event, connate);
            }
        },
        attachEvent: function (type, listener) {
            this.emitter.attachEvent(type, listener);
        },
        detachEvent: function (type, listener) {
            this.emitter.detachEvent(type, listener);
        },
        dispatchEvent: function (event) {
            this.trigger(event, this.connate);
        }
    });
    ElementManager = createClass({
        constructor: function (parent, element) {
            this.parent = parent;
            this.element = element;
            this.emitter = MKEmitter(this);
            this.connate = true;
        },
        initial: function (document, namespace, collect) {
            var manager = this;
            var element = manager.element;
            var natures = element.props;
            var insider = natures.children;
            var trustor = element.type;
            var command = element.cmd;
            var behests = [];
            var members = [];
            var product;

            if (trustor === "svg") {
                namespace = svgNamespace;
            }
            if (trustor === "math") {
                namespace = mmlNamespace;
            }
            if (namespace) {
                product = document.createElementNS(namespace, trustor);
            } else {
                product = document.createElement(lower(trustor));
            }
            product[DISPLAYING_RENDERER] = manager;

            manager.behests = behests;
            manager.members = members;
            manager.product = product;

            VMSetAttribute(natures, manager);
            VMSetOffspring(members, product, manager, insider, document, namespace, collect);
            VMSetDirective(behests, product, natures, command, collect);
            VMSetReference(element, product);

            return MKRealtor(product, true);
        },
        renewal: function (document, namespace, collect, updated) {
            var manager = this;
            var element = manager.element;
            var behests = manager.behests;
            var members = manager.members;
            var product = manager.product;
            var natures = updated.props;
            var insider = natures.children;
            var trustor = updated.type;
            var command = updated.cmd;
            var variety;

            if (trustor === "svg") {
                namespace = svgNamespace;
            }
            if (trustor === "math") {
                namespace = mmlNamespace;
            }

            manager.element = updated;
            variety = MKVariety(natures, element.props);

            VMModAttribute(variety, manager);
            VMModReference(element, product, updated);
            VMModOffspring(members, product, manager, insider, document, namespace, collect);
            VMModDirective(behests, product, natures, command, collect);

            return MKRealtor(product, false);
        },
        dispose: function () {
            var manager = this;
            var behests = manager.behests;
            var members = manager.members;
            var product = manager.product;
            var element = manager.element;

            VMDelOffspring(members);
            VMDelDirective(behests, product, element.props);
            VMDelReference(element, product);

            manager.emitter.dispose();

            DOMRemoveChild(product);
        },
        trigger: function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (VMNeedBubbling(event)) {
                this.parent.trigger(event, connate);
            }
        },
        attachEvent: function (type, listener) {
            this.emitter.attachEvent(type, listener);
        },
        detachEvent: function (type, listener) {
            this.emitter.detachEvent(type, listener);
        },
        dispatchEvent: function (event) {
            this.trigger(event, this.connate);
        }
    });
    LibertyManager = createClass({
        constructor: function (product) {
            this.product = product;
            this.emitter = MKEmitter(this);
            this.connate = true;
        },
        dispose: function () {
            this.emitter.dispose();
            DOMRemoveChild(this.product);
        },
        trigger: function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (VMNeedBubbling(event)) {
                var parent = (function findParent(product) {
                    var instance = product.parentNode
                        || product.defaultView;
                    if (instance && instance !== product) {
                        if (instance[DISPLAYING_RENDERER]) {
                            return instance[DISPLAYING_RENDERER];
                        } else {
                            return findParent(instance);
                        }
                    }
                }(this.product));
                if (parent) {
                    parent.trigger(event, connate);
                }
            }
        },
        attachEvent: function (type, listener) {
            this.emitter.attachEvent(type, listener);
        },
        detachEvent: function (type, listener) {
            this.emitter.detachEvent(type, listener);
        },
        dispatchEvent: function (event) {
            this.trigger(event, this.connate);
        }
    });

    var SyntheticEvent;

    SyntheticEvent = createClass({
        constructor: function (event, contact, current) {
            define(this, EVENT_CONTACT_TARGET, describe(contact || event.target));
            define(this, EVENT_CURRENT_TARGET, describe(current || event.currentTarget));
            define(this, EVENT_ORIGINAL_EVENT, describe(event[EVENT_ORIGINAL_EVENT] || event));
            define(this, EVENT_STATUS_TRACKER, describe(event[EVENT_STATUS_TRACKER] || {
                defaultPrevented: !!event.defaultPrevented,
                refreshPrevented: !!event.refreshPrevented,
                cancelBubble: !!event.cancelBubble,
                cancelEntire: !!event.cancelEntire
            }));
            for (var name in eventUsefulAttributes) {
                if (exists(event, name)) {
                    define(this, name, {
                        enumerable: true,
                        value: event[name]
                    });
                }
            }
        },
        stopImmediatePropagation: function () {
            this[EVENT_ORIGINAL_EVENT].stopImmediatePropagation();
            this[EVENT_STATUS_TRACKER].cancelEntire = true;
            this[EVENT_STATUS_TRACKER].cancelBubble = true;
        },
        stopPropagation: function () {
            this[EVENT_ORIGINAL_EVENT].stopPropagation();
            this[EVENT_STATUS_TRACKER].cancelBubble = true;
        },
        preventDefault: function () {
            if (this[EVENT_ORIGINAL_EVENT].cancelable) {
                this[EVENT_ORIGINAL_EVENT].preventDefault();
                this[EVENT_STATUS_TRACKER].defaultPrevented = true;
            }
        },
        preventRefresh: function () {
            this[EVENT_STATUS_TRACKER].refreshPrevented = true;
        },
        get type() {
            return this[EVENT_ORIGINAL_EVENT].type;
        },
        get bubbles() {
            return this[EVENT_ORIGINAL_EVENT].bubbles;
        },
        get cancelable() {
            return this[EVENT_ORIGINAL_EVENT].cancelable;
        },
        get cancelBubble() {
            return this[EVENT_STATUS_TRACKER].cancelBubble;
        },
        get cancelEntire() {
            return this[EVENT_STATUS_TRACKER].cancelEntire;
        },
        get defaultPrevented() {
            return this[EVENT_STATUS_TRACKER].defaultPrevented;
        },
        get refreshPrevented() {
            return this[EVENT_STATUS_TRACKER].refreshPrevented;
        },
        get originalEvent() {
            return this[EVENT_ORIGINAL_EVENT];
        },
        get currentTarget() {
            return this[EVENT_CURRENT_TARGET];
        },
        get target() {
            return this[EVENT_CONTACT_TARGET];
        }
    });

    var SynchroPromise;

    var SPFixator = function (instance, status) {
        return function (result) {
            SPResolve(instance, status, result);
        };
    };
    var SPResolve = function (instance, status, result) {
        if (instance[COMMITMENT_STATUS] === PENDING) {
            if (instance === result) {
                status = REJECTED;
                result = new Error("Promise resolved with itself");
            }
            if (isInheritedClass(result, SynchroPromise)) {
                if (result[COMMITMENT_STATUS] === PENDING) {
                    result.then(
                        SPFixator(instance, RESOLVED),
                        SPFixator(instance, REJECTED)
                    );
                    return;
                }
                result[COMMITMENT_CAPTURE] = true;
                instance[COMMITMENT_STATUS] = result[COMMITMENT_STATUS];
                instance[COMMITMENT_RESULT] = result[COMMITMENT_RESULT];
            } else if (result && isFunction(result.then)) {
                result.then(
                    SPFixator(instance, RESOLVED),
                    SPFixator(instance, REJECTED)
                );
                return;
            } else {
                instance[COMMITMENT_STATUS] = status;
                instance[COMMITMENT_RESULT] = result;
            }
            var member = instance[COMMITMENT_OBSERVE];
            var length = member.length;
            while (member.length) {
                var product = member.shift();
                var success = member.shift();
                var failure = member.shift();
                switch (instance[COMMITMENT_STATUS]) {
                    case RESOLVED:
                        SPExecute(product, instance[COMMITMENT_RESULT], success);
                        break;
                    case REJECTED:
                        SPExecute(product, instance[COMMITMENT_RESULT], failure);
                        break;
                }
            }
            if (length === 0 && instance[COMMITMENT_STATUS] === REJECTED) {
                Threads.then(function () { instance[COMMITMENT_CAPTURE] || wrong(instance[COMMITMENT_RESULT]); });
            }
        }
    };
    var SPExecute = function (instance, result, action) {
        try {
            SPResolve(instance, RESOLVED, action(result));
        } catch (error) {
            SPResolve(instance, REJECTED, error);
        }
    };

    SynchroPromise = createClass({
        constructor: function (executor) {
            define(this, COMMITMENT_OBSERVE, describe([]));
            define(this, COMMITMENT_CAPTURE, describe(false));
            define(this, COMMITMENT_RESULT, describe(void 0));
            define(this, COMMITMENT_STATUS, describe(PENDING));
            try {
                define(this, COMMITMENT_DISPOSE, describe(
                    executor(
                        SPFixator(this, RESOLVED),
                        SPFixator(this, REJECTED)
                    )
                ));
            } catch (error) {
                SPResolve(this, REJECTED, error);
            }
        },
        dispose: function () {
            if (this[COMMITMENT_DISPOSE]) {
                this[COMMITMENT_DISPOSE]();
            }
        },
        "catch": function (onrejected) {
            return this.then(null, onrejected);
        },
        then: function (onresolved, onrejected) {
            var current = this;
            var success = onresolved || function (value) { return value; };
            var failure = onrejected || function (error) { return SynchroPromise.reject(error); };
            var product = new SynchroPromise(function () { return current[COMMITMENT_DISPOSE]; });
            current[COMMITMENT_CAPTURE] = true;
            switch (current[COMMITMENT_STATUS]) {
                case PENDING:
                    current[COMMITMENT_OBSERVE].push(product, success, failure);
                    break;
                case RESOLVED:
                    SPExecute(product, current[COMMITMENT_RESULT], success);
                    break;
                case REJECTED:
                    SPExecute(product, current[COMMITMENT_RESULT], failure);
                    break;
            }
            return product;
        },
        get result() {
            return this[COMMITMENT_RESULT];
        },
        get status() {
            return this[COMMITMENT_STATUS]
        }
    });
    SynchroPromise.resolve = function (value) { return new SynchroPromise(function (resolve) { resolve(value); }); };
    SynchroPromise.reject = function (error) { return new SynchroPromise(function (_, reject) { reject(error); }); };
    SynchroPromise.ajax = function (request) {
        return new SynchroPromise(function (resolve, reject) {
            var xhrSuccess;
            var xhrFailure;
            var xhrLocation = request.url;
            var XHR_SUCCESS_TYPE = "load";
            var XHR_FAILURE_TYPE = "error";
            if (request.jsonp) {
                var xhrCallback = "Elf" + (Math.random() * 1E9 | 0);
                var xhrHostNode = document.createElement("script");
                var xhrHeadNode = document.querySelector("head");
                var xhrAbnormal = function () {
                    delete window[xhrCallback];
                };
                xhrSuccess = window[xhrCallback] = function (result) {
                    resolve({
                        status: 200,
                        headers: {},
                        data: function () { return result },
                        text: function () { return isString(result) ? result : stringify(result); },
                        json: function () { return isString(result) ? JSON.parse(result) : result; }
                    });
                    xhrAbnormal();
                    broadcast();
                };
                xhrFailure = function (error) {
                    reject(error);
                    xhrAbnormal();
                    broadcast();
                };
                DOMAddListener(xhrHostNode, XHR_FAILURE_TYPE, xhrFailure);
                DOMSetProperty(xhrHostNode, "type", "text/javascript");
                DOMSetProperty(xhrHostNode, "src", xhrLocation);
                DOMInsertChild(xhrHeadNode, xhrHostNode);
                return function () {
                    if (window[xhrCallback]) {
                        window[xhrCallback] = xhrAbnormal;
                    }
                    DOMDelListener(xhrHostNode, XHR_FAILURE_TYPE, xhrFailure);
                    DOMRemoveChild(xhrHostNode);
                };
            } else {
                var xhrContent = "Content-Type";
                var xhrFashion = request.method || "GET";
                var xhrHeaders = request.headers || {};
                var xhrRequest = new XMLHttpRequest();
                xhrSuccess = function () {
                    var result = xhrRequest.response || xhrRequest.responseText;
                    var status = xhrRequest.status === 1223 ? 200 : xhrRequest.status;
                    if (status === 0) {
                        status = result ? 200 : 0;
                    }
                    var headers = {};
                    var content = trim(xhrRequest.getAllResponseHeaders() || "");
                    if (content) {
                        content.split("\n").forEach(function (i) {
                            var x = ":";
                            var l = trim(i).split(x);
                            var m = trim(l.shift());
                            var n = trim(l.join(x));
                            headers[m] = n;
                        });
                    }
                    if (200 <= status && status < 300) {
                        resolve({
                            status: status,
                            headers: headers,
                            data: function () { return result },
                            text: function () { return isString(result) ? result : stringify(result); },
                            json: function () { return isString(result) ? JSON.parse(result) : result; }
                        });
                    } else {
                        reject(xhrRequest);
                    }
                    broadcast();
                };
                xhrFailure = function () {
                    reject(xhrRequest);
                    broadcast();
                };
                xhrRequest.open(xhrFashion.toUpperCase(), xhrLocation, true);
                DOMAddListener(xhrRequest, XHR_SUCCESS_TYPE, xhrSuccess);
                DOMAddListener(xhrRequest, XHR_FAILURE_TYPE, xhrFailure);
                if (!exists(xhrHeaders, xhrContent)) {
                    xhrRequest.setRequestHeader(xhrContent, "application/x-www-form-urlencoded; charset=utf-8");
                }
                for (var name in ajaxAttributeDefaults) {
                    xhrRequest[name] = exists(request, name) ? request[name] : exists(exports.$xhrFields, name) ? exports.$xhrFields[name] : ajaxAttributeDefaults[name];
                }
                for (var name in xhrHeaders) {
                    xhrRequest.setRequestHeader(name, xhrHeaders[name]);
                }
                xhrRequest.send(request.body);
                return function () {
                    DOMDelListener(xhrRequest, XHR_SUCCESS_TYPE, xhrSuccess);
                    DOMDelListener(xhrRequest, XHR_FAILURE_TYPE, xhrFailure);
                    xhrRequest.abort();
                };
            }
        });
    };
    SynchroPromise.race = function (array) {
        return new SynchroPromise(function (resolve, reject) {
            if (array.length) {
                array.forEach(function (value) {
                    SynchroPromise.resolve(value).then(resolve, reject);
                });
            } else {
                resolve();
            }
        });
    };
    SynchroPromise.all = function (array) {
        return new SynchroPromise(function (resolve, reject) {
            var number = 0;
            var length = array.length;
            var result = new Array(length);
            if (length) {
                array.forEach(function (value, index) {
                    SynchroPromise.resolve(value).then(function (value) {
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
    };


    //
    //
    //
    exports.Promise = SynchroPromise;
    exports.createClass = createClass;

    exports.requestAnimationFrame = function (fn) {
        return { dispose: cancelAnimationFrame.bind(null, requestAnimationFrame(observe(fn, tear(arguments, 1)))) };
    };
    exports.setInterval = function (fn, delay) {
        return { dispose: clearInterval.bind(null, setInterval(observe(fn, tear(arguments, 2)), delay)) };
    };
    exports.setTimeout = function (fn, delay) {
        return { dispose: clearTimeout.bind(null, setTimeout(observe(fn, tear(arguments, 2)), delay)) };
    };

    exports.Component = function (name, proto) {
        return define(createClass(proto), DISPLAYING_COMPONENT, describe(name));
    };
    exports.Directive = function (name, proto) {
        return define(createClass(proto), DISPLAYING_DIRECTIVE, describe(name));
    };
    exports.Transform = function (name, proto) {
        return define(createClass(proto), DISPLAYING_TRANSFORM, describe(name));
    };

    exports.createEvent = function (type, bubbles, detail) {
        return new SyntheticEvent({
            type: type,
            detail: detail,
            bubbles: !!bubbles,
            cancelable: false,
            stopImmediatePropagation: NOOP,
            stopPropagation: NOOP,
            preventDefault: NOOP
        });
    };
    exports.attachEvent = function (node, type, listener) {
        assertEvent(listener) && GlobalMethodLauncher(node).attachEvent(type, listener);
    };
    exports.detachEvent = function (node, type, listener) {
        assertEvent(listener) && GlobalMethodLauncher(node).detachEvent(type, listener);
    };
    exports.dispatchEvent = function (node, event) {
        GlobalMethodLauncher(node).dispatchEvent(new SyntheticEvent(event, node));
    };

    exports.createElement = function (type, props) {
        var natures = props || {};
        var insider = flatten(tear(arguments, 2));
        var element = {
            ref: natures.ref,
            key: natures.key,
            cmd: natures.cmd || [],
            type: type,
            props: {},
            owner: last(temporaryElementOwner)
        };
        for (var name in natures) {
            if (name !== "ref" &&
                name !== "key" &&
                name !== "cmd" &&
                isValid(natures[name])) {
                element.props[name] = natures[name];
            }
        }
        if (isString(type)) {
            if (isAllied(type, "input")) {
                element.props.type = element.props.type || "text";
            } else if (isAllied(type, "button")) {
                element.props.type = element.props.type || "button";
            }
        }
        Object.freeze(define(element.props, "children", describe(insider)));
        return element;
    };
    exports.redactElement = function (html) {
        var preRownum = 0;
        var preColnum = 0;
        var colDiffer = 18;
        var colScaler = 18;
        var colResume = true;
        var outScript = "with(this){return(";
        var astObject = isObject(html) ? html : exports.$parse(html);
        var sourceURI = astObject.filename;
        var sourceDit = astObject.body;
        var sourceMap = {
            version: 3,
            sources: [sourceURI],
            mappings: ";AAAA"
        };
        var lineLength = exports.$lineLength;
        var mapSupport = exports.btoa && exports.evlq && sourceURI;
        var privatelyComponentDep = {};
        var privatelyDirectiveDep = {};
        var privatelyTransformDep = {};
        var manufactor;
        if (sourceDit) {
            ASTElementParse(sourceDit);
        } else {
            ASTAppendScript("null");
        }
        ASTAppendScript(")}");
        manufactor = new Function("Elf", mapSupport ? outScript + "\n//# sourceMappingURL=data:application/json;chatset=utf-8;base64," + exports.btoa(stringify(sourceMap)) + "\n//# sourceURL=" + sourceURI + "!transpiled" : outScript);
        flatten(tear(arguments, 1)).forEach(function (trustor) {
            if (exists(trustor, DISPLAYING_COMPONENT)) {
                privatelyComponentDep[trustor[DISPLAYING_COMPONENT]] = trustor;
            }
            if (exists(trustor, DISPLAYING_DIRECTIVE)) {
                privatelyDirectiveDep[trustor[DISPLAYING_DIRECTIVE]] = trustor;
            }
            if (exists(trustor, DISPLAYING_TRANSFORM)) {
                privatelyTransformDep[trustor[DISPLAYING_TRANSFORM]] = trustor;
            }
        });
        return function () {
            temporaryComponentDep.push(privatelyComponentDep);
            temporaryDirectiveDep.push(privatelyDirectiveDep);
            temporaryTransformDep.push(privatelyTransformDep);
            try {
                return manufactor.call(safeDomain(this || {}), exports);
            } finally {
                temporaryComponentDep.pop();
                temporaryDirectiveDep.pop();
                temporaryTransformDep.pop();
            }
        };
        function ASTElementParse(node) {
            if (node.nodeType === 1) {
                if (node.iteration) {
                    if (node.level) {
                        ASTIterateParse(node);
                    } else {
                        wrong(new Error("Cannot use iteration on root node"));
                    }
                } else if (node.condition) {
                    ASTTernaryParse(node);
                } else {
                    ASTDefaultParse(node);
                }
            } else if (node.nodeType === 3) {
                ASTContentParse(node);
            }
        }
        function ASTDefaultParse(node) {
            ASTAppendScript("Elf.createElement(Elf.$tag(");
            ASTAppendSource(node.nodeName);
            ASTAppendScript(stringify(node.nodeName.raw));
            ASTAppendScript("),");
            ASTNaturesParse(node);
            if (node.children.length) {
                ASTAppendScript(",");
                ASTInsiderParse(node);
            }
            ASTAppendScript(")");
        }
        function ASTIterateParse(node) {
            ASTAppendSource(node.iteration.keys);
            ASTAppendScript("Elf.$map(");
            ASTAppendSource(node.iteration.body);
            ASTAppendScript(node.iteration.body.raw);
            ASTAppendScript(",function(");
            ASTAppendScript(node.iteration.keys.raw);
            ASTAppendScript("){return(");
            if (node.condition) {
                ASTTernaryParse(node);
            } else {
                ASTDefaultParse(node);
            }
            ASTAppendScript(")})");
        }
        function ASTTernaryParse(node) {
            ASTAppendScript("((");
            ASTAppendSource(node.condition);
            ASTAppendScript(node.condition.raw);
            ASTAppendScript(")?");
            ASTDefaultParse(node);
            ASTAppendScript(":null)");
        }
        function ASTInsiderParse(node) {
            ASTAppendScript("[");
            node.children.forEach(function (node, numb) {
                ASTAppendScript(numb > 0 ? "," : "");
                ASTElementParse(node);
            });
            ASTAppendScript("]");
        }
        function ASTNaturesParse(node) {
            ASTAppendScript("{");
            node.attributes.forEach(function (node, numb) {
                ASTAppendScript(numb > 0 ? "," : "");
                ASTAppendScript(stringify(node.name.raw));
                ASTAppendScript(":");
                if (node.incident) {
                    ASTAppendScript("function(event){");
                    ASTAppendSource(node.delegate);
                    ASTAppendScript(node.delegate.raw);
                    ASTAppendScript("}.bind(this)");
                } else if (node.segments.length) {
                    if (node.name.raw === "cmd") {
                        ASTAppendScript("Elf.$cmd(");
                        ASTContentParse(node);
                        ASTAppendScript(")");
                    } else {
                        ASTContentParse(node);
                    }
                } else {
                    ASTAppendScript(stringify(""));
                }
            });
            ASTAppendScript("}");
        }
        function ASTContentParse(node) {
            node.segments.forEach(function (node, numb) {
                ASTAppendScript(numb > 0 ? "+" : "");
                if (node.computed) {
                    ASTExpressParse(node);
                } else {
                    ASTAppendSource(node.input);
                    ASTAppendScript(stringify(node.input.raw));
                }
            });
        }
        function ASTExpressParse(node) {
            ASTAppendSource(node.input);
            ASTAppendScript("Elf.$fit(");
            ASTAppendScript(node.input.raw || "void 0");
            node.pipes.forEach(function (node, numb) {
                ASTAppendScript(",[");
                ASTAppendSource(node.name);
                ASTAppendScript(stringify(node.name.raw));
                node.arguments.forEach(function (node, numb) {
                    ASTAppendScript(",");
                    ASTAppendSource(node);
                    ASTAppendScript(node.raw);
                });
                ASTAppendScript("]");
            });
            ASTAppendScript(")");
        }
        function ASTAppendScript(value) {
            var length = value.length;
            if (colScaler > lineLength - length) {
                outScript += "\n";
                colResume = true;
                colScaler = 0;
                colDiffer = 0;
            }
            colDiffer += length;
            colScaler += length;
            outScript += value;
        }
        function ASTAppendSource(value) {
            if (mapSupport) {
                var rownum = value.loc.rownum;
                var colnum = value.loc.colnum;
                sourceMap.mappings += (colResume ? ";" : ",") + exports.evlq([colDiffer, 0, rownum - preRownum, colnum - preColnum]);
                preRownum = rownum;
                preColnum = colnum;
                colResume = false;
                colDiffer = 0;
            }
        }
    };
    exports.forceUpdate = function () {
        return broadcast();
    };

    exports.depend = function () {
        flatten(tear(arguments)).forEach(function (trustor) {
            if (exists(trustor, DISPLAYING_COMPONENT)) {
                communityComponentDep[trustor[DISPLAYING_COMPONENT]] = trustor;
            }
            if (exists(trustor, DISPLAYING_DIRECTIVE)) {
                communityDirectiveDep[trustor[DISPLAYING_DIRECTIVE]] = trustor;
            }
            if (exists(trustor, DISPLAYING_TRANSFORM)) {
                communityTransformDep[trustor[DISPLAYING_TRANSFORM]] = trustor;
            }
        });
    };
    exports.render = function (element, container, duplex) {
        var monitor;
        var collect = [];
        var draught = MKDraught(element, GlobalMethodLauncher(container));
        var product = {
            forceUpdate: function () {
                manufacture(draught.renewal(document, namespace, collect, element));
            },
            dispose: function () {
                monitor.dispose();
                draught.dispose();
            },
            duplex: !!duplex
        };
        var document = container.ownerDocument;
        var namespace = container.namespaceURI;
        if (container.isDefaultNamespace(namespace)) {
            namespace = null;
        }
        manufacture(draught.initial(document, namespace, collect));
        return monitor = subscribe(product), product;
        function manufacture(realtor) {
            if (realtor.newly) {
                while (container.firstChild) {
                    DOMRemoveChild(container.firstChild);
                }
                DOMInsertChild(container, realtor.value);
            }
            clean(collect, function (fn) { fn(); });
        }
    };
    exports.assign = function (source) {
        source = Object(source);
        for (var i = 1; i < arguments.length; i++) {
            var ns = arguments[i];
            for (var name in ns) {
                if (Object.prototype.hasOwnProperty.call(ns, name)) {
                    source[name] = ns[name];
                }
            }
        }
        return source;
    };

    exports.$tag = function (value) {
        if (exists(last(temporaryComponentDep), value)) {
            return last(temporaryComponentDep)[value];
        }
        if (exists(communityComponentDep, value)) {
            return communityComponentDep[value];
        }
        return value;
    };
    exports.$cmd = function (value) {
        return flatten(trim(value).split(REGEXP_SEPARATOR_CMD).map(function (value) {
            if (exists(last(temporaryDirectiveDep), value)) {
                return last(temporaryDirectiveDep)[value];
            }
            if (exists(communityDirectiveDep, value)) {
                return communityDirectiveDep[value];
            }
            return wrong(new Error("Invalid directive " + value));
        }));
    };
    exports.$fit = function (value) {
        return tear(arguments, 1).reduce(function (init, item) {
            if (exists(last(temporaryTransformDep), item[0])) {
                return execute(MKUnitary(last(temporaryTransformDep)[item[0]]), init, item);
            }
            if (exists(communityTransformDep, item[0])) {
                return execute(MKUnitary(communityTransformDep[item[0]]), init, item);
            }
            return wrong(new Error("Invalid transform " + item[0])), init;
        }, value);
        function execute(target, init, item) {
            return target.transform.apply(target, [init].concat(tear(item, 1)));
        }
    };
    exports.$map = function (value, callback, thisArg) {
        if (isInheritedClass(value, SynchroPromise)) {
            value = value[COMMITMENT_STATUS] === RESOLVED
                ? value[COMMITMENT_RESULT]
                : null;
        }
        if (Array.isArray(value)) {
            return value.map(callback, thisArg);
        }
        var result = [];
        for (var name in value) {
            result.push(
                callback.call(thisArg, value[name], name, value)
            );
        }
        return result;
    };
    exports.$parse = function (html, filename) {
        var start;
        var level = 0;
        var queue = [];
        var lines = [];
        var roots = [];
        var rownum = 0;
        var length = html.length;
        var inStyleSheet = false;
        var inJavaScript = false;
        var docStatement = "";
        var preFormatted = 0;
        var expression = exports.$expression;
        for (start = 0; start < length;) {
            lines.push([start, start = TPLNewlineIndex(start)]);
        }
        for (start = 0; start < length;) {
            if (TPLCommentStart(start)) {
                TPLCommentParse(start, start = TPLCommentEnded(start));
            } else if (TPLDoctypeStart(start)) {
                TPLDoctypeParse(start, start = TPLDoctypeEnded(start));
            }
            if (TPLOccludeStart(start)) {
                TPLOccludeParse(start, start = TPLOccludeEnded(start));
            } else if (TPLElementStart(start)) {
                TPLElementParse(start, start = TPLElementEnded(start));
            } else {
                //
                TPLContentParse(start, start = TPLContentEnded(start));
            }
        }
        if (roots.length > 1) {
            wrong(new Error("Cannot use multiple root node"));
        }
        return {
            body: roots[0],
            doctype: docStatement,
            filename: filename
        };
        function TPLCommentStart(start) {
            return startsWith(html, "<!--", start);
        }
        function TPLDoctypeStart(start) {
            return startsWith(html, "<!", start) && TPLMatch(/^doctype[\s>]/i, start + 2, 8);
        }
        function TPLOccludeStart(start) {
            return startsWith(html, "</", start) && TPLMatch(REGEXP_TEMPLATE_NAME, start + 2, 1);
        }
        function TPLElementStart(start) {
            return startsWith(html, "<", start) && TPLMatch(REGEXP_TEMPLATE_NAME, start + 1, 1);
        }
        function TPLCommentEnded(start) {
            return Math.min(length, TPLRough(html, "-->", start + 4, TPLPlain) + 3);
        }
        function TPLDoctypeEnded(start) {
            return Math.min(length, TPLRough(html, ">", start + 9, TPLPlain) + 1);
        }
        function TPLOccludeEnded(start) {
            return Math.min(length, TPLRough(html, ">", start + 3, TPLPlain) + 1);
        }
        function TPLElementEnded(start) {
            return Math.min(length, TPLExact(html, ">", start + 2, TPLPlain) + 1);
        }
        function TPLContentEnded(start) {
            return Math.min(length, TPLRough(html, "<", start, TPLDuple));
        }
        function TPLNewlineIndex(start) {
            return Math.min(length, TPLRough(html, "\n", start, TPLPlain) + 1);
        }
        function TPLCommentParse(start, ended) {
            console.warn(stringify(tear(html, start, ended)) + " will be dispensed");
        }
        function TPLDoctypeParse(start, ended) {
            docStatement = tear(html, start, ended);
        }
        function TPLOccludeParse(start, ended) {
            var nodeName = TPLNameParse(start + 2, tear(html, start + 2, ended - 1));
            if (preFormatted && isAllied(nodeName.raw, "pre")) {
                preFormatted--;
            }
            if (inStyleSheet && isAllied(nodeName.raw, "style")) {
                inStyleSheet = false;
            }
            if (inJavaScript && isAllied(nodeName.raw, "script")) {
                inJavaScript = false;
            }
            if (!exists(htmlElementSolitaries, lower(nodeName.raw))) {
                while (level) {
                    if (queue[--level].nodeName.raw === nodeName.raw) {
                        break;
                    }
                }
            }
        }
        function TPLElementParse(start, ended) {
            var nodeName = TPLNameParse(start + 1, tear(html, start + 1, ended - 1));
            var shutting = !(html.charAt(ended - 2) === "/" || exists(htmlElementSolitaries, lower(nodeName.raw)));
            if (shutting) {
                if (isAllied(nodeName.raw, "pre")) {
                    preFormatted++;
                } else if (isAllied(nodeName.raw, "style")) {
                    inStyleSheet = true;
                } else if (isAllied(nodeName.raw, "script")) {
                    inJavaScript = true;
                }
            }
            var attrOffset = start + 1 + nodeName.raw.length;
            var attributes = TPLAttrParse(attrOffset, tear(html, attrOffset, ended - 1));
            TPLStore({
                level: level,
                nodeType: 1,
                nodeName: nodeName,
                attributes: attributes.otherwise,
                condition: attributes.condition,
                iteration: attributes.iteration,
                children: []
            }, shutting);
        }
        function TPLContentParse(start, ended) {
            if (start < ended) {
                var index = 0;
                var value = tear(html, start, ended);
                if (level === 0 || (exports.$trimBlank && preFormatted === 0)) {
                    index = TPLBlank(value);
                    value = trim(value);
                }
                if (index >= 0) {
                    TPLStore({
                        level: level,
                        nodeType: 3,
                        segments: inStyleSheet || inJavaScript ? [{
                            computed: false,
                            input: TPLTuple(start, value, true)
                        }] : TPLTextParse(start, value)
                    });
                }
            }
        }
        function TPLNameParse(start, value) {
            var match = value.match(REGEXP_TEMPLATE_NAME);
            return TPLTuple(start + match.index, match[0], true);
        }
        function TPLAttrParse(start, value) {
            var match;
            var token;
            var texts;
            var index;
            var iteration;
            var condition;
            var otherwise = [];
            for (;
                match = value.match(REGEXP_TEMPLATE_ATTR);
                value = tear(value, match.index + match[0].length),
                start = start + match[0].length) {
                token = match[1];
                texts = match[3] || match[4] || match[5] || "";
                start = start + match.index;
                index = start + token.length;
                if (isString(match[2])) {
                    index += match[2].length;
                }
                if (isString(match[3]) ||
                    isString(match[4])) {
                    index += 1;
                }
                if (token === exports.$iteration) {
                    iteration = TPLEachParse(index, texts);
                } else if (token === exports.$condition) {
                    condition = TPLWhenParse(index, texts);
                } else if (isEventAttribute(token)) {
                    otherwise.push({
                        name: TPLTuple(start, token, true),
                        delegate: TPLTuple(index, texts),
                        incident: true
                    });
                } else {
                    otherwise.push({
                        name: TPLTuple(start, token, true),
                        segments: TPLTextParse(index, texts),
                        incident: false
                    });
                }
            }
            return {
                iteration: iteration,
                condition: condition,
                otherwise: otherwise
            };
        }
        function TPLEachParse(start, value) {
            var match = value.match(REGEXP_TEMPLATE_EACH);
            if (match) {
                return {
                    keys: TPLTuple(start + match.index, match[1]),
                    body: TPLTuple(start + match.index + match[1].length + match[2].length, match[3])
                };
            }
            wrong(new Error("Invalid iteration expression " + value));
        }
        function TPLWhenParse(start, value) {
            var index = TPLBlank(value);
            if (index >= 0) {
                return TPLTuple(start + index, trim(value));
            }
        }
        function TPLTextParse(start, value) {
            var texts = [];
            var number = 0;
            var length = value.length;
            var prenum = expression[0].length;
            var sufnum = expression[1].length;
            var incept = 0;
            var finish = 0 - sufnum;
            for (;
                (incept = value.indexOf(expression[0], finish + sufnum)) >= 0 &&
                (finish = value.indexOf(expression[1], incept + prenum)) >= 0
                ; number = finish + sufnum) {
                if (number < incept) {
                    TPLConst(start + number,
                        tear(value, number, incept));
                }
                if (incept < finish - prenum) {
                    TPLTrend(start + incept + prenum,
                        tear(value, incept + prenum, finish));
                }
            }
            if (number < length) {
                TPLConst(start + number,
                    tear(value, number, length));
            }
            return texts;
            function TPLConst(start, value) {
                if (value) {
                    texts.push({
                        computed: false,
                        input: TPLTuple(start, value)
                    });
                }
            }
            function TPLTrend(start, value) {
                var input;
                var pipes = [];
                var number = 0;
                var length = value.length;
                for (; number < length; number++) {
                    if (number === 0) {
                        TPLInput(start + number,
                            tear(value, number, number = TPLUprightIndex(number)));
                    } else {
                        TPLPipes(start + number,
                            tear(value, number, number = TPLUprightIndex(number)));
                    }
                }
                if (input) {
                    texts.push({
                        computed: true,
                        input: input,
                        pipes: pipes
                    });
                }
                function TPLUprightIndex(start) {
                    return Math.min(length, TPLExact(value, REGEXP_SEPARATOR_FIT, TPLShave(value, REGEXP_TEMPLATE_WORD, start), TPLAlone));
                }
                function TPLInput(start, value) {
                    var index = TPLBlank(value);
                    if (index >= 0) {
                        input = TPLTuple(start + index, trim(value));
                    }
                }
                function TPLPipes(start, value) {
                    var token;
                    var flags = [];
                    var number = 0;
                    var length = value.length;
                    for (; number < length; number++) {
                        if (number === 0) {
                            TPLToken(start + number,
                                tear(value, number, number = TPLSpacingIndex(number)));
                        } else {
                            TPLFlags(start + number,
                                tear(value, number, number = TPLSpacingIndex(number)));
                        }
                    }
                    if (token) {
                        pipes.push({
                            name: token,
                            arguments: flags
                        });
                    }
                    function TPLSpacingIndex(start) {
                        return Math.min(length, TPLExact(value, REGEXP_SEPARATOR_ARG, TPLShave(value, REGEXP_TEMPLATE_WORD, start), TPLPlain));
                    }
                    function TPLToken(start, value) {
                        var index = TPLBlank(value);
                        if (index >= 0) {
                            token = TPLTuple(start + index, trim(value));
                        }
                    }
                    function TPLFlags(start, value) {
                        var index = TPLBlank(value);
                        if (index >= 0) {
                            flags.push(
                                TPLTuple(start + index, trim(value))
                            );
                        }
                    }
                }
                function TPLAlone(start) {
                    return !TPLJudge(value.charAt(start + 1), REGEXP_SEPARATOR_FIT)
                        && !TPLJudge(value.charAt(start - 1), REGEXP_SEPARATOR_FIT);
                }
            }
        }
        function TPLStore(value, shutting) {
            queue[level] = value;
            if (level) {
                queue[level - 1].children.push(value);
            } else {
                roots.push(value);
            }
            if (shutting) {
                level++;
            }
        }
        function TPLMatch(regex, start, length) {
            return regex.test(tear(html, start, start + length));
        }
        function TPLTuple(start, value, ignore) {
            var colnum = 0;
            var length = lines.length;
            for (; rownum < length; rownum++) {
                if (start >= lines[rownum][0] &&
                    start < lines[rownum][1]) {
                    colnum = start - lines[rownum][0];
                    break;
                }
            }
            return {
                loc: {
                    rownum: rownum,
                    colnum: colnum
                },
                raw: ignore ? value : value.replace(REGEXP_UNESCAPE_CHAR, function (_, $1, $2, $3) {
                    if ($1) { return htmlUnescapedMappings[$1] || "&" + $1 + ";"; }
                    if ($2) { return String.fromCharCode(parseInt($2, 10)); }
                    if ($3) { return String.fromCharCode(parseInt($3, 16)); }
                    return "";
                })
            };
        }
        function TPLDuple(start) {
            if (inStyleSheet) {
                return startsWith(html, "</", start) && TPLMatch(/^style[\s>]/i, start + 2, 6);
            }
            if (inJavaScript) {
                return startsWith(html, "</", start) && TPLMatch(/^script[\s>]/i, start + 2, 7);
            }
            return TPLCommentStart(start)
                || TPLDoctypeStart(start)
                || TPLOccludeStart(start)
                || TPLElementStart(start);
        }
        function TPLPlain() {
            return true;
        }
        function TPLBlank(html) {
            return html.search(REGEXP_TEMPLATE_WORD);
        }
        function TPLShave(html, value, start) {
            var number = start || 0;
            var length = html.length;
            for (; number < length; number++) {
                if (TPLJudge(html.charAt(number), value)) {
                    break;
                }
            }
            return number;
        }
        function TPLRough(html, value, start, fn) {
            var length = html.length;
            var number = html.indexOf(value, start);
            return number < 0
                ? length : fn(number)
                ? number : TPLRough(html, value, number + 1, fn);
        }
        function TPLExact(html, value, start, fn) {
            var curly = 0;
            var paren = 0;
            var square = 0;
            var inSingle = false;
            var inDouble = false;
            var number = start || 0;
            var length = html.length;
            var escape = "\\";
            var p, n;
            for (; number < length; number++) {
                p = n;
                n = html.charAt(number);
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
                    TPLJudge(n, value)) {
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
        }
        function TPLJudge(html, value) {
            return value.test ? value.test(html) : value === html;
        }
    };

    exports.$xhrFields = {};
    exports.$safeScope = true;
    exports.$trimBlank = true;
    exports.$condition = "e-if";
    exports.$iteration = "e-for";
    exports.$expression = ["{{", "}}"];
    exports.$lineLength = 32768;
    exports.$eventStart = "on";

    exports._GLOBAL_METHOD_LAUNCHER_ = GlobalMethodLauncher;
    exports._GLOBAL_METHOD_LISTENER_ = GlobalMethodListener;
    exports._GLOBAL_SYMBOL_RENDERER_ = DISPLAYING_RENDERER;

} (
    typeof exports !== "undefined" ? exports : this.Elf = {},
    typeof Promise !== "undefined" ? Promise.resolve(0) : { then: setTimeout.bind(null) },
    typeof history === "undefined"
));