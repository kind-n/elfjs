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

//////////////////////////////////////////////////
/// TYPE
//////////////////////////////////////////////////

/**
 * 
 * @typedef Manager
 * @property {Array} behests
 * @property {Boolean} connate
 * @property {Emitter} emitter
 * @property {Manager} founder
 * @property {JSX.Element | String | void} element
 * @property {JSX.ElementClass | HTMLElement | Comment | Text} product
 * @property {function(...):Realtor} initial
 * @property {function(...):Realtor} renewal
 * @property {Function} dispose
 * @property {Function=} trigger
 * @property {Function=} attachEvent
 * @property {Function=} detachEvent
 * @property {Function=} dispatchEvent
 * @property {Manager=} draught
 * @property {Array=} members
 */

/**
 * 
 * @typedef Emitter
 * @property {function(...):boolean} intrude
 * @property {function(...):boolean} extrude
 * @property {Function} replace
 * @property {Function} trigger
 * @property {Function} dispose
 */

/**
 * 
 * @typedef Realtor
 * @property {Boolean} newly
 * @property {HTMLElement} value
 */

//////////////////////////////////////////////////
/// CODE
//////////////////////////////////////////////////

! (function (global, factory) {
    (typeof module !== "undefined" && typeof exports === "object") ? factory(exports) :
    (typeof define === "function" && define.amd) ? define(factory) :
    (factory((global.Elf = global.Elf || {})))
} (this, function (exports) {

/**
 * Removes the leading and trailing white space and line terminator characters from a string.
 * 
 * @param   {String} target
 * @returns {String} 
 */
function trim (target) {
    return target.trim();
}
/**
 * Returns the last value of the array.
 * 
 * @param   {Array<T>} target 
 * @returns {T}
 * @template           T
 */
function last (target) {
    return target[target.length - 1];
}
/**
 * Slice string or array.
 * 
 * @param   {Array | String} target 
 * @param   {Number=}        start
 * @param   {Number=}        ended
 * @returns {Array | String}
 */
function tear (target) {
    return (target.slice || Array.prototype.slice).apply(
            target, Array.prototype.slice.call(arguments, 1));
}
/**
 * Converts all the alphabetic characters in a string to lowercase.
 * 
 * @param   {String} target 
 * @returns {String}
 */
function lower (target) {
    return target.toLowerCase();
}
/**
 * Throw error.
 * 
 * @param {Error} target 
 */
function wrong (target) {
    throw target;
}
/**
 * Empty the array and flashback to execute the callback.
 * 
 * @param {Array}    target 
 * @param {Function} callback 
 */
function clean (target, fn) {
    while (target.length) {
        fn(target.pop());
    }
}
/**
 * Filled with a new array.
 * 
 * @param {Array} target 
 * @param {Array} value 
 */
function reset (target, value) {
    Array.prototype.splice.apply(target, [0, target.length].concat(value));
}
/**
 * Determines whether it is member of the object.
 * 
 * @param   {*}           target 
 * @param   {PropertyKey} name 
 * @returns {Boolean}
 */
function exists (target, name) {
    return isValid(target) && name in target;
}
/**
 * Depth comparison of two objects.
 * 
 * @param   {*}       target 
 * @param   {*}       origin 
 * @returns {Boolean}
 */
function equals (target, origin) {
    if (target === origin) {
        return true;
    }
    if (isObject(target) &&
        isObject(origin)) {
        for (var name in target) {
            if (!exists(origin, name)) {
                return false;
            }
            if (!equals(target[ name ], origin[ name ])) {
                return false;
            }
        }
        for (var name in origin) {
            if (!exists(target, name)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
/**
 * Creates an object that has the specified prototype, and that optionally contains specified properties.
 * 
 * @param   {PropertyDescriptorMap} target 
 * @returns {Object}
 */
function create (target) {
    return Object.create(null, target);
}
/**
 * Adds a property to an object, or modifies attributes of an existing property.
 * 
 * @param   {T}                  target 
 * @param   {PropertyKey}        name 
 * @param   {PropertyDescriptor} descriptor 
 * @returns {T}
 * @template                     T
 */
function define (target, name, descriptor) {
    return Object.defineProperty(target, name, descriptor);
}
/**
 * Returns a ordinary PropertyDescriptor.
 * 
 * @param {*}                   target 
 * @param {Boolean}             enumerable 
 * @return {PropertyDescriptor}
 */
function normal (target, enumerable) {
    return {
        configurable : true,
        enumerable : !!enumerable,
        writable : true,
        value : target
    };
}
/**
 * Returns a readonly PropertyDescriptor.
 * 
 * @param {*}                   target 
 * @param {Boolean}             enumerable 
 * @return {PropertyDescriptor}
 */
function secure (target, enumerable) {
    return {
        enumerable : !!enumerable,
        get : target
    };
}
/**
 * Returns a constant PropertyDescriptor.
 * 
 * @param {*}                   target 
 * @param {Boolean}             enumerable 
 * @return {PropertyDescriptor}
 */
function fixate (target, enumerable) {
    return {
        enumerable : !!enumerable,
        value : target
    };
}
/**
 * Flattens a nested array.
 * 
 * @param   {Array} target
 * @returns {Array} 
 */
function flatten (target) {
    var result = [];
    var length = target.length;
    for (var i = 0; i < length; i++) {
        var ns = target[i];
        if (isArray(ns)) {
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
/**
 * Add an object to an array.
 * And return whether it's first to add.
 * 
 * @param   {Array}   target 
 * @param   {*}       value 
 * @returns {Boolean}
 */
function intrude (target, value) {
    return target.indexOf(value) < 0 ? target.push(value) === 1 : false;
}
/**
 * Remove an object from an array.
 * And return whether it's last to remove.
 * 
 * @param   {Array}   target 
 * @param   {*}       value 
 * @returns {Boolean}
 */
function extrude (target, value) {
    var number = target.indexOf(value);
    if (number >= 0) {
        target.splice(number, 1);
        return target.length === 0;
    }
    return false;
}
/**
 * Watch an async function.
 * 
 * @param   {Function} target 
 * @param   {Array}    flags 
 * @returns {Function}
 */
function observe (target, flags) {
    return function () {
        var instance = exports.createEvent("async", false);
        target.apply(this, [instance].concat(flags));
        instance.refreshPrevented || broadcast();
    };
}
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * 
 * @param   {*}      target 
 * @returns {String}
 */
function stringify (target) {
    return JSON.stringify(target);
}
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * 
 * @param   {String} target 
 * @returns {*}
 */
function objectify (target) {
    return JSON.parse(target);
}
/**
 * Add individual to the collectivity.
 * 
 * @param   {Elf.Individual} target 
 * @returns {Elf.Disposable}
 */
function subscribe (target) {
    return intrude(collectivity, target), {
        dispose : extrude.bind(null, collectivity, target)
    };
}
/**
 * Invoke collectivity update.
 * Only once at the same time.
 * 
 * @returns {Boolean}
 */
function broadcast () {
    if (isUnoccupied) {
        isUnoccupied = false;
        setTimeout(function () {
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


/**
 * Determines whether the passed value is an Array.
 * 
 * @param   {*}       target
 * @returns {Boolean}
 */
function isArray (target) {
    return Array.isArray(target);
}
/**
 * Determines whether the passed value is a valid value.
 * 
 * @param   {*}       target
 * @returns {Boolean}
 */
function isValid (target) {
    return target !== void 0 && target !== null;
}
/**
 * Determines whether the passed value is an basic type.
 * 
 * @param   {*}       target
 * @returns {Boolean}
 */
function isBasic (target) {
    return isString(target)
        || typeof target === "number"
        || typeof target === "boolean";
}
/**
 * Determines whether the passed value is a string.
 * 
 * @param   {*}       target
 * @returns {Boolean}
 */
function isString (target) {
    return typeof target === "string";
}
/**
 * Determines whether the passed value is an object.
 * 
 * @param   {*}       target
 * @returns {Boolean}
 */
function isObject (target) {
    return typeof target === "object" && target !== null;
}
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 * 
 * @param   {String}  target
 * @param   {String}  value
 * @param   {Number}  current
 * @returns {Boolean} 
 */
function startsWith (target, value, start) {
    var number = start || 0;
    var length = value.length;
    for (var i = 0; i < length; i++) {
        if (value.charAt(i) !== target.charAt(number + i)) {
            return false;
        }
    }
    return true;
};

/**
 * Determines whether the passed value is PRE element.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isPreformatted (value) {
    return isString(value) && lower(value) === "pre";
}
/**
 * Determines whether the passed value is INPUT element.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isInputElement (value) {
    return isString(value) && lower(value) === "input";
}
/**
 * Determines whether the passed value is solitary element.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isSolitaryNode (value) {
    return exists(htmlElementSolitaries, lower(value));
}
/**
 * Determines whether the passed value is text type of INPUT element.
 * 
 * @param   {String}  value
 * @returns {Boolean} 
 */
function isVariableType (value) {
    return exists(allowedModifyDrawings, value);
}

/**
 * Determines whether the passed value is iteration attrubute.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isCycleAttribute (value) {
    return exports.$iteration === value;
}
/**
 * Determines whether the passed value is condition attrubute.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isJudgeAttribute (value) {
    return exports.$condition === value;
}
/**
 * Determines whether the passed value is event attrubute.
 * 
 * @param   {String}  value 
 * @returns {Boolean}
 */
function isEventAttribute (value) {
    return startsWith(value, exports.$eventStart);
}
/**
 * Determines whether the target is inheriting the class.
 * 
 * @param {*}         value 
 * @param {Function}  clazz 
 * @returns {Boolean}
 */
function isInheritedClass (value, clazz) {
    return value instanceof clazz;
}


/**
 * Returns the event need bubble.
 * 
 * @param   {Elf.Event} event 
 * @returns {Boolean}
 */
function ShouldEventBubbling (event) {
    return event.bubbles && !event.cancelBubble;   
}
/**
 * Modify the target of event.
 * 
 * @param   {Event | Elf.Event} event 
 * @param   {*}                 target 
 * @returns {Elf.Event}
 */
function ModifyContactTarget (event, target) {
    return define(new SyntheticEvent(event), EVENT_CONTACT_TARGET, normal(target));
}
/**
 * Modify the currentTarget of event.
 * 
 * @param   {Event | Elf.Event} event 
 * @param   {*}                 target 
 * @returns {Elf.Event}
 */
function ModifyCurrentTarget (event, target) {
    return define(new SyntheticEvent(event), EVENT_CURRENT_TARGET, normal(target));
}


/**
 * Returns a new unique Symbol value.
 * 
 * @param   {String | Number} target 
 * @returns {PropertyKey}
 */
function SafeMember (value) {
    if (supportedSafeMember) {
        return Symbol(value);
    }
    return value;
}
/**
 * Returns a new Proxy value.
 * 
 * @param   {T} target 
 * @returns {T}
 * @template    T
 */
function SefeSphere (value) {
    if (supportedSafeSphere) {
        return new Proxy(value, {
            has : function (target, name) {
                return exists(target, name) || !(exists(allowedGlobalVariates, name) || wrong(new Error(name + " is not defined")));
            }
        });
    }
    return value;
}

//
// Promise default callbacks.
//
function Misfortune (error) {
    return Promise.reject(error);
}
function Accomplish (value) {
    return value;
}

//
// The implementation of Promise. 
//
function PMDeliver (target) {
    return function () {
        return target[COMMITMENT_DISPOSE];
    };
}
function PMFixator (target, status) {
    return function (result) {
        PMResolve(target, status, result);
    };
}
function PMResolve (target, status, result) {
    if (target[COMMITMENT_STATUS] === PENDING) {
        if (target === result) {
            status = REJECTED;
            result = new Error("Promise resolved with itself");
        }
        if (isInheritedClass(result, Promise)) {
            if (result[COMMITMENT_STATUS] === PENDING) {
                result.then(
                    PMFixator(target, RESOLVED),
                    PMFixator(target, REJECTED)
                );
                return;
            }
            target[COMMITMENT_STATUS] = result[COMMITMENT_STATUS];
            target[COMMITMENT_RESULT] = result[COMMITMENT_RESULT];
            result[COMMITMENT_CAPTURE] = true;
        } else {
            target[COMMITMENT_STATUS] = status;
            target[COMMITMENT_RESULT] = result;
        }
        var member = target[COMMITMENT_OBSERVE];
        var length = member.length;
        while (member.length) {
            var product = member.shift();
            var success = member.shift();
            var failure = member.shift();
            switch (target[COMMITMENT_STATUS]) {
                case RESOLVED:
                    PMExecute(product, target[COMMITMENT_RESULT], success);
                    break;
                case REJECTED:
                    PMExecute(product, target[COMMITMENT_RESULT], failure);
                    break;
            }
        }
        if (length === 0 && target[COMMITMENT_STATUS] === REJECTED) {
            setTimeout(function () {
                target[COMMITMENT_CAPTURE] || wrong(target[COMMITMENT_RESULT]);
            });
        }
    }
}
function PMExecute (target, result, action) {
    try {
        PMResolve(target, RESOLVED, action(result));
    } catch (error) {
        PMResolve(target, REJECTED, error);
    }
}

//
// The implementation of async requests (AJAX/JSONP).
//
function PMAsync (request, resolve, reject) {
    var xhrContent = "Content-Type";
    var xhrPattern = "X-Requested-With";
    var xhrFashion = request.method  || "GET";
    var xhrHeaders = request.headers || {};
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open(xhrFashion.toUpperCase(), request.url, true);
    DOMAddListener(xhrRequest, "load", doresolved);
    DOMAddListener(xhrRequest, "error", dorejected);
    if (!exists(xhrHeaders, xhrContent)) {
        PMAffix(xhrRequest, xhrContent, "application/x-www-form-urlencoded; charset=UTF-8");
    }
    if (!exists(xhrHeaders, xhrPattern)) {
        PMAffix(xhrRequest, xhrPattern, "XMLHttpRequest");
    }
    for (var name in xhrHeaders) {
        PMAffix(xhrRequest, name, xhrHeaders[name]);
    }
    xhrRequest.send(request.body);
    return function () {
        DOMDelListener(xhrRequest, "load", doresolved);
        DOMDelListener(xhrRequest, "error", dorejected);
        xhrRequest.abort();
    };
    function doresolved () {
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
                status  : status,
                headers : headers,
                text    : function () {
                    return result;
                },
                json    : function () {
                    return objectify(result);
                }
            });
        } else {
            reject(xhrRequest);
        }
        broadcast();
    }
    function dorejected () {
        reject(xhrRequest);
        broadcast();
    }
}
function PMJsonp (request, resolve, reject) {
    var xhrCallback = "Elf" + (Math.random() * 1E9 | 0);
    var xhrHeadNode = document.querySelector("head");
    var xhrHostNode = DOMMakeElement("script");
    window[xhrCallback] = doresolved;
    DOMAddListener(xhrHostNode, "error", dorejected);
    DOMSetProperty(xhrHostNode, "type", "text/javascript");
    DOMSetProperty(xhrHostNode, "src", request.url);
    DOMInsertChild(xhrHeadNode, xhrHostNode);
    return function () {
        if (window[xhrCallback]) {
            window[xhrCallback] = doabnormal;
        }
        DOMRemoveChild(xhrHostNode);
    };
    function doresolved (value) {
        resolve({
            status : 200,
            headers : {},
            text : function () {
                return isObject(value) ? stringify(value) : value;
            },
            json : function () {
                return value;
            }
        });
        doabnormal();
        broadcast();
    }
    function dorejected (error) {
        reject(error);
        doabnormal();
        broadcast();
    }
    function doabnormal () {
        delete window[xhrCallback];
    }
}
function PMAffix (request, header, value) {
    request.setRequestHeader(header, value);
}

/**
 * Returns an Emitter.
 * 
 * @param   {Manager} manager 
 * @returns {Emitter}
 */
function MKEmitter (manager) {
    return {
        E : {},
        M : function (type) {
            return this.E[lower(type)] || (this.E[lower(type)] = []);
        },
        intrude : function (type, listener) {
            intrude(this.M(type), listener) && manager.connate && DOMAddListener(manager.product, type, GlobalEventListener);
        },
        extrude : function (type, listener) {
            extrude(this.M(type), listener) && manager.connate && DOMDelListener(manager.product, type, GlobalEventListener);
        },
        replace : function (type, oldValue, newValue) {
            var events = this.M(type);
            var number = events.indexOf(oldValue);
            if (number >= 0) {
                events.splice(number,1, newValue);
            }
        },
        trigger : function (event) {
            var target = manager.product;
            var events = tear(this.M(event.type));
            var length = events.length;
            for (var i = 0; i < length; i++) {
                var listener = events[i];
                var instance = ModifyCurrentTarget(event, target);
                if (listener.handleEvent) {
                    listener.handleEvent(instance);
                } else {
                    listener.call(target,instance);
                }
                if (instance.cancelEntire) {
                    break;
                }
            }
        },
        dispose : function () {
            if (manager.connate) {
                for (var type in this.E) {
                    DOMDelListener(manager.product, type, GlobalEventListener);
                }
            }
            this.E = {};
        }
    };
}
/**
 * Returns a Realtor.
 * 
 * @param   {HTMLElement} element 
 * @param   {Boolean}     newly 
 * @returns {Realtor}
 */
function MKRealtor (element, newly) {
    return { value: element, newly: newly };
}
/**
 * Create a Manager by a virtual element.
 * 
 * @param   {JSX.Element} element 
 * @param   {Manager}     founder 
 * @returns {Manager}
 */
function MKDraught (element, founder) {
    return isValid(element)
        ? isObject(element)
        ? isString(element.type)
        ? new ElementRenderer(element, founder)
        : new ComplexRenderer(element, founder)
        : new ContentRenderer(element, founder)
        : new CommentRenderer(founder);
}
/**
 * Compare two virtual elements, and returns the difference.
 * 
 * @param   {JSX.Element} element 
 * @param   {JSX.Element} ancient 
 * @returns {Variety}
 */
function MKVariety (element, ancient) {
    var variety = {
        hoary : {},
        newly : {},
        alter : {}
    };
    if (element !== ancient) {
        for (var name in ancient) {
            if (!exists(element, name)) {
                variety.hoary[name] = ancient[name];
            } else
            if (!equals(element[name], ancient[name])) {
                variety.alter[name] = {
                    oldValue : ancient[name],
                    newValue : element[name]
                };
            }
        }
        for (var name in element) {
            if (!exists(ancient, name)) {
                variety.newly[name] = element[name];
            }
        }
    }
    return variety;
}
/**
 * Create a Component instance.
 * 
 * @param   {Elf.Class<JSX.ElementClass>} trustor 
 * @param   {*}                           attribute 
 * @param   {Manager}                     manager 
 * @returns {JSX.ElementClass}
 */
function MKExample (trustor, attribute, manager) {
    var product = Object.create(trustor.prototype);
    define(product, DISPLAYING_RENDERER, normal(manager));
    define(product, "props", normal(attribute));
    define(product, "refs", normal({}));
    product.constructor();
    return product;
}
/**
 * Create a HTMLElement instance.
 * 
 * @param   {String}      trustor 
 * @param   {String}      namespace 
 * @param   {Manager}     manager 
 * @returns {HTMLElement}
 */
function MKElement (trustor, namespace, manager) {
    return define(DOMMakeElement(trustor, namespace), DISPLAYING_RENDERER, normal(manager));
}
/**
 * Returns a single object of the passed value.
 * 
 * @param   {Elf.Class<T>} trustor 
 * @returns {T}
 * @template               T
 */
function MKUnitary (trustor) {
    return trustor[DISPLAYING_INSTANCE] || (trustor[DISPLAYING_INSTANCE] = new trustor());
}
/**
 * Create a single manager of the passed value.
 * 
 * @param   {HTMLElement | JSX.ElementClass} product 
 * @returns {Manager}
 */
function MKManager (product) {
    return product[DISPLAYING_RENDERER] || (product[DISPLAYING_RENDERER] = new LibertyRenderer(product));
}
/**
 * Create a virtual element.
 * 
 * @param   {JSX.ElementClass} product 
 * @returns {JSX.Element}
 */
function MKVirtual (product) {
    temporaryElementOwner.push(product);
    try {
        return product.render();
    } finally {
        temporaryElementOwner.pop();
    }
}
/**
 * Returns this closest element with manager.
 * 
 * @param   {HTMLElement | Document | Window} product 
 * @returns {Manager}
 */
function MKFounder (product) {
    var instance = product.parentNode
                || product.defaultView;
    if (instance && instance !== product) {
        if (instance[DISPLAYING_RENDERER]) {
            return instance[DISPLAYING_RENDERER];
        } else {
            return MKFounder(instance);
        }
    }
}


/**
 * Rectify event attrubute.
 * 
 * @param   {String} value 
 * @returns {String}
 */
function VMRectifyEvent (target) {
    return lower(tear(target, exports.$eventStart.length));
}
/**
 * Rectify trait attrubute.
 * 
 * @param   {String} value 
 * @returns {String}
 */
function VMRectifyTrait (target) {
    return htmlAttributeMappings[target] || target;
}
/**
 * Compare two virtual elements, and returns no need redraw.
 * 
 * @param {JSX.Element | String | Number} target 
 * @param {JSX.Element | String | Number} origin 
 */
function VMNoneedRedraw (target, origin) {
    if (target === origin) {
        return true;
    }
    if (isObject(target) &&
        isObject(origin)) {
        if ( target.key !== origin.key ) {
            return false;
        }
        if (target.type !== origin.type) {
            return false;
        }
        if (isInputElement(target.type)) {
            var tA = target.props.type;
            var tB = origin.props.type;
            return tA === tB
                || isVariableType(tA)
                && isVariableType(tB);
        }
        return true;
    }
    return isValid(target) === isValid(origin)
        && isBasic(target) === isBasic(origin);
}


/**
 * Create childNodes.
 * 
 * @param {Array<Manager>}                       members 
 * @param {HTMLElement}                          product 
 * @param {Manager}                              manager 
 * @param {Array<JSX.Element | String | Number>} insider 
 * @param {String}                               namespace 
 * @param {Array}                                collect 
 */
function VMSetOffspring (members, product, manager, insider, namespace, collect) {
    for (var i = 0; i < insider.length; i++) {
        var draught = MKDraught(insider[i], manager);
        var realtor = draught.initial(namespace, collect);
        if (realtor.newly) {
            DOMInsertChild(product, realtor.value);
        }
        members.push(draught);
    }
}
/**
 * Modify childNodes.
 * 
 * @param {Array<Manager>}                       members 
 * @param {HTMLElement}                          product 
 * @param {Manager}                              manager 
 * @param {Array<JSX.Element | String | Number>} insider 
 * @param {String}                               namespace 
 * @param {Array}                                collect 
 */
function VMModOffspring (members, product, manager, insider, namespace, collect) {
    var deposit = new Array(insider.length);
    var leaguer = insider.map(function (item) { return { element: item, product: null }; });

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
        } else
        if (!isValid(oldEndedVMsgr)) {
            oldEndedVMsgr = members[--oldEndedIndex];
        } else
        if (VMModCompareWithElements(oldStartVMsgr, newStartVMsgr)) {
            VMModMoveOrInsertElement(
                VMModGetAuthenticElement(oldStartVMsgr).nextSibling,
                VMModInvokeUpdateElement(oldStartVMsgr, newStartVMsgr, newStartIndex),
                false
            );
            oldStartVMsgr = members[++oldStartIndex];
            newStartVMsgr = leaguer[++newStartIndex];
        } else
        if (VMModCompareWithElements(oldEndedVMsgr, newEndedVMsgr)) {
            VMModMoveOrInsertElement(
                VMModGetAuthenticElement(oldEndedVMsgr).nextSibling,
                VMModInvokeUpdateElement(oldEndedVMsgr, newEndedVMsgr, newEndedIndex),
                false
            );
            oldEndedVMsgr = members[--oldEndedIndex];
            newEndedVMsgr = leaguer[--newEndedIndex];
        } else
        if (VMModCompareWithElements(oldStartVMsgr, newEndedVMsgr)) {
            VMModMoveOrInsertElement(
                VMModGetAuthenticElement(oldEndedVMsgr).nextSibling,
                VMModInvokeUpdateElement(oldStartVMsgr, newEndedVMsgr, newEndedIndex),
                true
            );
            oldStartVMsgr = members[++oldStartIndex];
            newEndedVMsgr = leaguer[--newEndedIndex];
        } else
        if (VMModCompareWithElements(oldEndedVMsgr, newStartVMsgr)) {
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
    } else
    if (newStartIndex > newEndedIndex) {
        VMModBatchRemoveElements(oldStartIndex, oldEndedIndex);
    }
    reset(members, deposit);

    function VMModGetAuthenticElement (manager) {
        return manager ? manager.draught ? VMModGetAuthenticElement(manager.draught) : manager.product : null;
    }
    function VMModCreateSingleElement (updated, number) {
        var draught = MKDraught(updated.element, manager);
        var realtor = draught.initial(namespace, collect);
        updated.product = realtor.value;
        deposit[number] = draught;
        return realtor;
    }
    function VMModCreateOrUpdateVMsgr (updated, number) {
        if (isValid(oldTokenIndex)) {
            var ancient = members[oldTokenIndex];
            if (VMModCompareWithElements(ancient, updated)) {
                members[oldTokenIndex] = null;
                return VMModInvokeUpdateElement(ancient, updated, number);
            }
        }
        return VMModCreateSingleElement(updated, number);
    }
    function VMModCompareWithElements (ancient, updated) {
        return VMNoneedRedraw (ancient.element, updated.element);
    }
    function VMModInvokeUpdateElement (ancient, updated, number) {
        var realtor = ancient.renewal(namespace, collect, updated.element);
        updated.product = realtor.value;
        deposit[number] = ancient;
        return realtor;
    }
    function VMModMoveOrInsertElement (address, realtor, remain) {
        if (realtor.newly || remain) {
            DOMInsertChild(product, realtor.value, address);
        }
    }
    function VMModGetIndexFromMembers (updated, start, ended) {
        oldTokenPairs = oldTokenPairs || VMModCreateIndexMapByKey(start, ended);
        oldTokenIndex = updated.element.key ? oldTokenPairs[updated.element.key] : VMModFindIndexByIterator(updated, start, ended);
    }
    function VMModFindIndexByIterator (updated, start, ended) {
        for (var i = start; i <= ended; i++) {
            if (members[i] && VMNoneedRedraw(members[i].element, updated.element)) {
                return i;
            }
        }
    }
    function VMModBatchCreateElements (address, start, ended) {
        for (var i = start; i <= ended; i++) {
            VMModMoveOrInsertElement(
                address,
                VMModCreateSingleElement(leaguer[i], i),
                true
            );
        }
    }
    function VMModBatchRemoveElements (start, ended) {
        for (var i = start; i <= ended; i++) {
            if (members[i]) {
                members[i].dispose();
            }
        }
    }
    function VMModCreateIndexMapByKey (start, ended) {
        var result = {};
        for (var i = start; i <= ended; i++) {
            var sn = members[i].element.key;
            if (sn) {
                result[sn] = i;
            }
        }
        return result;
    }
}
/**
 * Remove childNodes.
 * 
 * @param {Array<Manager>} members 
 */
function VMDelOffspring (members) {
    clean(members, function (draught) {
        draught.dispose();
    });
}
/**
 * Assign attributes.
 * 
 * @param {*}       feature 
 * @param {Manager} manager 
 */
function VMSetAttribute (feature, manager) {
    for (var name in feature) {
        if (isEventAttribute(name)) {
            manager.attachEvent(VMRectifyEvent(name), feature[name]);
        } else
        if (manager.connate) {
            DOMSetProperty(manager.product, VMRectifyTrait(name), feature[name]);
        }
    }
}
/**
 * Modify attributes.
 * 
 * @param {Variety} variety 
 * @param {Manager} manager 
 */
function VMModAttribute (variety, manager) {
    VMDelAttribute(variety.hoary, manager);
    VMSetAttribute(variety.newly, manager);
    for (var name in variety.alter) {
        if (isEventAttribute(name)) {
            manager.emitter.replace(VMRectifyEvent(name), variety.alter[name].oldValue, variety.alter[name].newValue);
        } else
        if (manager.connate) {
            DOMSetProperty(manager.product, VMRectifyTrait(name), variety.alter[name].newValue);
        }
    }
}
/**
 * Remove attributes.
 * 
 * @param {*}       feature 
 * @param {Manager} manager 
 */
function VMDelAttribute (feature, manager) {
    for (var name in feature) {
        if (isEventAttribute(name)) {
            manager.detachEvent(VMRectifyEvent(name), feature[name]);
        } else
        if (manager.connate) {
            DOMDelProperty(manager.product, VMRectifyTrait(name), feature[name]);
        }
    }
}
/**
 * Assign directives.
 * 
 * @param {Array}                          behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*}                              feature 
 * @param {Array}                          command 
 * @param {Array}                          collect 
 */
function VMSetDirective (behests, product, feature, command, collect) {
    for (var i = 0; i < command.length; i++) {
        var dictate = MKUnitary(command[i]);
        if (dictate[LIFE_CYCLE_INITIAL]) {
            collect.push(dictate[LIFE_CYCLE_INITIAL].bind(dictate, product, feature));
        }
        behests.push(dictate);
    }
}
/**
 * Modify directives.
 * 
 * @param {Array}                          behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*}                              feature 
 * @param {Array}                          command 
 * @param {Array}                          collect 
 */
function VMModDirective (behests, product, feature, command, collect) {
    var deposit = [];
    for (var i = 0; i < behests.length; i++) {
        var sn = commandIndex(behests[i]);
        if (sn < 0) {
            if (behests[i][LIFE_CYCLE_DISPOSE]) {
                behests[i][LIFE_CYCLE_DISPOSE](product, feature);
            }
        }
    }
    for (var i = 0; i < command.length; i++) {
        var sn = behestsIndex(command[i]);
        if (sn < 0) {
            var dictate = MKUnitary(command[i]);
            if (dictate[LIFE_CYCLE_INITIAL]) {
                collect.push(dictate[LIFE_CYCLE_INITIAL].bind(dictate, product, feature));
            }
        } else {
            deposit.push(behests[sn]);
        }
    }
    reset(behests, deposit);
    function commandIndex (target) {
        for (var i = 0; i < command.length; i++) {
            if (isInheritedClass(target, command[i])) {
                return i;
            }
        }
        return -1;
    }
    function behestsIndex (target) {
        for (var i = 0; i < behests.length; i++) {
            if (isInheritedClass(behests[i], target)) {
                return i;
            }
        }
        return -1;
    }
}
/**
 * Remove directives.
 * 
 * @param {Array}                          behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*}                              feature 
 */
function VMDelDirective (behests, product, feature) {
    clean(behests, function (dictate) {
        if (dictate[LIFE_CYCLE_DISPOSE]) {
            dictate[LIFE_CYCLE_DISPOSE](product, feature);
        }
    });
}
/**
 * Assign reference.
 * 
 * @param {JSX.Element}                    element 
 * @param {HTMLElement | JSX.ElementClass} product 
 */
function VMSetReference (element, product) {
    if (element.owner && element.ref) {
        element.owner.refs[element.ref] = product;
    }
}
/**
 * Modify reference.
 * 
 * @param {JSX.Element}                    element 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {JSX.Element}                    ancient 
 */
function VMModReference (element, product, ancient) {
    if (element.ref   !== ancient.ref ||
        element.owner !== ancient.owner) {
        VMDelReference(ancient);
        VMSetReference(element, product);
    }
}
/**
 * Remove reference.
 * 
 * @param {JSX.Element} element 
 */
function VMDelReference (element) {
    if (element.owner && element.ref) {
        delete element.owner.refs[element.ref];
    }
}
/**
 * Execute initial life cycle.
 * 
 * @param {JSX.ElementClass} product 
 * @param {Array}            collect 
 */
function VMSetLifeCycle (product, collect) {
    if (product[LIFE_CYCLE_INITIAL]) {
        collect.push(product[LIFE_CYCLE_INITIAL].bind(product));
    }
}
/**
 * Execute dispose life cycle.
 * 
 * @param {JSX.ElementClass} product 
 */
function VMDelLifeCycle (product) {
    if (product[LIFE_CYCLE_DISPOSE]) {
        product[LIFE_CYCLE_DISPOSE]();
    }
}


/**
 * Native add event listener.
 * 
 * @param {HTMLElement}                        element 
 * @param {String}                             type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function DOMAddListener (element, type, listener) {
    element.addEventListener(type, listener, false);
}
/**
 * Native remove event listener.
 * 
 * @param {HTMLElement}                        element 
 * @param {String}                             type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function DOMDelListener (element, type, listener) {
    element.removeEventListener(type, listener, false);
}
/**
 * Native set attribute.
 * 
 * @param {HTMLElement} element 
 * @param {String}      name 
 * @param {*}           value 
 */
function DOMSetProperty (element, name, value) {
    switch (htmlAttributeSpecials[ name ] || 0) {
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
/**
 * Native remove attribute.
 * 
 * @param {HTMLElement} element 
 * @param {String}      name 
 */
function DOMDelProperty (element, name) {
    switch (htmlAttributeSpecials[ name ] || 0) {
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
/**
 * Native insert child.
 * 
 * @param {HTMLElement} product 
 * @param {HTMLElement} element 
 * @param {HTMLElement} address 
 */
function DOMInsertChild (product, element, address) {
    product.insertBefore(element, address || null);
}
/**
 * Native remove child.
 * 
 * @param {HTMLElement} element 
 */
function DOMRemoveChild (element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}
/**
 * Format style, support object style.
 * 
 * @param   {*}      product 
 * @returns {String}
 */
function DOMFormatStyle (product) {
    if (isObject(product)) {
        return exports.$map(product, function (value, token) {
            return token.replace(/[A-Z]/g, function (value) {
                return "-" + lower(value);
            }) + ":" + value;
        }).join("; ");
    }
    return product;
}
/**
 * Format class, support object class.
 * 
 * @param   {*}      product
 * @returns {String} 
 */
function DOMFormatClass (product) {
    if (isObject(product)) {
        return flatten(exports.$map(product, function (value, token) {
            return value ? token : null;
        })).join(" ");
    }
    return product;
}
/**
 * Native create element.
 * 
 * @param   {String}      trustor 
 * @param   {String}      namespace 
 * @returns {HTMLElement}
 */
function DOMMakeElement (trustor, namespace) {
    return namespace ? document.createElementNS(namespace, trustor) : document.createElement(lower(trustor));
}

//
// Constants.
//
var CODE;
var NOOP = function () {};
var RESOLVED = "resolved";
var REJECTED = "rejected";
var PENDING  = "pending";

var LIFE_CYCLE_INITIAL   = "onInitial";
var LIFE_CYCLE_DISPOSE   = "onDispose";

var REGEXP_TEMPLATE_NAME = /[:A-Za-z0-9][-:\w]*/;
var REGEXP_TEMPLATE_EACH = /(\S.*)(\s+(?:in|of)\s+)(.*\S)/;
var REGEXP_TEMPLATE_ATTR = /([^\s"'<>/=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'<>/=]+)))?/;
var REGEXP_TEMPLATE_WORD = /\S/;

var REGEXP_SEPARATOR_CMD = /[,\s]+/;
var REGEXP_SEPARATOR_FIT = /\|/;
var REGEXP_SEPARATOR_ARG = /\s/;

/**
 * Individual storage.
 */
var collectivity = [];
/**
 * Indicates whether an update can be made.
 */
var isUnoccupied = true;
/**
 * SVG root element's tag.
 */
var svgRootQName = "svg";
/**
 * MathML root element's tag.
 */
var mmlRootQName = "math";
/**
 * SVG namespaceURI.
 */
var svgNamespace = "http://www.w3.org/2000/svg";
/**
 * MathML namespaceURI.
 */
var mmlNamespace = "http://www.w3.org/2000/MathML";
/**
 * Encoding chart.
 */
var diagrammatic = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * Indicates whether can use Symbol API.
 */
var supportedSafeMember = typeof Symbol !== "undefined";
/**
 * Indicates whether can use Proxy API.
 */
var supportedSafeSphere = typeof Proxy  !== "undefined";
/**
 * HTMLElement attribute mappings.
 */
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
/**
 * HTMLElement attribute specials.
 * 1 -> CSSStyleDeclaration
 * 2 -> Boolean
 * 3 -> ClassName
 * 4 -> String
 * 9 -> ignore
 */
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
/**
 * HTMLElement solitaries, They don't have end tag.
 */
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
/**
 * Event useful attributes.
 */
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
/**
 * Allowed modify input types.
 */
var allowedModifyDrawings = {
    text: 0,
    number: 0,
    password: 0,
    search: 0,
    email: 0,
    tel: 0,
    url: 0
};
/**
 * Allowed global variates.
 */
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
    isFinite: 0,
    isNaN: 0,
    parseFloat: 0,
    parseInt: 0,
    undefined: 0,
    // elfjs.
    Elf: 0
};
/**
 * Community dependency for Component.
 */
var communityComponentDep = {};
/**
 * Community dependency for Directive.
 */
var communityDirectiveDep = {};
/**
 * Community dependency for Transform.
 */
var communityTransformDep = {};
/**
 * Temporary dependency for Component.
 */
var temporaryComponentDep = [];
/**
 * Temporary dependency for Directive.
 */
var temporaryDirectiveDep = [];
/**
 * Temporary dependency for Transform.
 */
var temporaryTransformDep = [];
/**
 * Temporary dependency for element owner.
 */
var temporaryElementOwner = [];

//
// Safe member of object.
//
var COMMITMENT_STATUS    = SafeMember("Promise.status");
var COMMITMENT_RESULT    = SafeMember("Promise.result");
var COMMITMENT_OBSERVE   = SafeMember("Promise.observe");
var COMMITMENT_CAPTURE   = SafeMember("Promise.capture");
var COMMITMENT_DISPOSE   = SafeMember("Promise.dispose");
var DISPLAYING_INSTANCE  = SafeMember("Display.instance");
var DISPLAYING_RENDERER  = SafeMember("Display.renderer");
var DISPLAYING_COMPONENT = SafeMember("Display.component");
var DISPLAYING_DIRECTIVE = SafeMember("Display.directive");
var DISPLAYING_TRANSFORM = SafeMember("Display.transform");
var EVENT_STATUS_TRACKER = SafeMember("Event.tracker");
var EVENT_CONTACT_TARGET = SafeMember("Event.contact");
var EVENT_CURRENT_TARGET = SafeMember("Event.current");
var EVENT_ORIGINAL_EVENT = SafeMember("Event.founder");

/**
 * Global event listener.
 * All HTMLElement are bind this.
 * 
 * @param {Event} event 
 */
var GlobalEventListener  = Accomplish(function (event) {
    var instance = new SyntheticEvent(event);
    this[DISPLAYING_RENDERER].dispatchEvent(instance);
    instance.refreshPrevented || broadcast();
    event.stopImmediatePropagation();
});
/**
 * Comment renderer.
 */
var CommentRenderer = Accomplish(function (founder) {
    this.founder = founder;
});
/**
 * Content renderer.
 */
var ContentRenderer = Accomplish(function (element, founder) {
    this.element = element;
    this.founder = founder;
});
/**
 * Complex renderer.
 */
var ComplexRenderer = Accomplish(function (element, founder) {
    var current = this;
    current.emitter = MKEmitter(current);
    current.element = element;
    current.founder = founder;
    current.connate = false;
});
/**
 * Element renderer.
 */
var ElementRenderer = Accomplish(function (element, founder) {
    var current = this;
    current.emitter = MKEmitter(current);
    current.element = element;
    current.founder = founder;
    current.connate = true;
});
/**
 * Liberty renderer.
 */
var LibertyRenderer = Accomplish(function (product) {
    var current = this;
    current.emitter = MKEmitter(current);
    current.product = product;
    current.connate = true;
});
/**
 * SyntheticEvent.
 */
var SyntheticEvent  = Accomplish(function (event) {
    define(this, EVENT_CONTACT_TARGET, normal(event.target));
    define(this, EVENT_CURRENT_TARGET, normal(event.currentTarget));
    define(this, EVENT_ORIGINAL_EVENT, normal(event[EVENT_ORIGINAL_EVENT] || event));
    define(this, EVENT_STATUS_TRACKER, normal(event[EVENT_STATUS_TRACKER] || {
        defaultPrevented : !!event.defaultPrevented,
        refreshPrevented : !!event.refreshPrevented,
        cancelBubble     : !!event.cancelBubble,
        cancelEntire     : !!event.cancelEntire
    }));
    for (var name in eventUsefulAttributes) {
        if (exists(event, name)) {
            define(this, name, fixate(event[name], true));
        }
    }
});
/**
 * Promise.
 */
var Promise         = Accomplish(function (executor) {
    define(this, COMMITMENT_OBSERVE, normal([]));
    define(this, COMMITMENT_CAPTURE, normal(false));
    define(this, COMMITMENT_RESULT , normal(void 0));
    define(this, COMMITMENT_STATUS , normal(PENDING));
    try {
        define(this, COMMITMENT_DISPOSE, normal(
            executor(
                PMFixator(this, RESOLVED),
                PMFixator(this, REJECTED)
            )
        ));
    } catch (error) {
        PMResolve(this, REJECTED, error);
    }
});

//
// Prototypes of class.
//
CommentRenderer.prototype = create({
    constructor : normal(CommentRenderer),
    initial     : normal(function (namespace, collect) {
        return MKRealtor(this.product = document.createComment(""), true);
    }),
    renewal     : normal(function (namespace, collect, updated) {
        return MKRealtor(this.product, false);
    }),
    dispose     : normal(function () {
        DOMRemoveChild(this.product);
    })
});
ContentRenderer.prototype = create({
    constructor : normal(ContentRenderer),
    initial     : normal(function (namespace, collect) {
        return MKRealtor(this.product = document.createTextNode(this.element), true);
    }),
    renewal     : normal(function (namespace, collect, updated) {
        if (this.element !== updated) {
            this.product.textContent = this.element = updated;
        }
        return MKRealtor(this.product, false);
    }),
    dispose     : normal(function () {
        DOMRemoveChild(this.product);
    })
});
ComplexRenderer.prototype = create({
    constructor : normal(ComplexRenderer),
    initial     : normal(function (namespace, collect) {
        var manager = this;
        var element = manager.element;
        var feature = element.props;
        var trustor = element.type;
        var command = element.cmd;

        var behests = [];
        var product = MKExample(trustor, feature, manager);
        var draught = MKDraught(MKVirtual(product), manager);
        var realtor = draught.initial(namespace, collect);

        manager.behests = behests;
        manager.product = product;
        manager.draught = draught;

        VMSetAttribute(feature, manager);
        VMSetDirective(behests, product, feature, command, collect);
        VMSetReference(element, product);
        VMSetLifeCycle(product, collect);

        return realtor;
    }),
    renewal     : normal(function (namespace, collect, updated) {
        var manager = this;
        var element = manager.element;
        var behests = manager.behests;
        var draught = manager.draught;
        var product = manager.product;
        var possess = updated.owner;
        var feature = updated.props;
        var command = updated.cmd;
        var appoint = updated.ref;
        var realtor;

        manager.element = updated;
        product.props   = updated.props;

        var virtual = MKVirtual(product);
        var variety = MKVariety(feature, element.props);

        if (VMNoneedRedraw(virtual, draught.element)) {
            realtor = draught.renewal(namespace, collect, virtual);
        } else {
            draught.dispose();
            draught = MKDraught(virtual, manager);
            realtor = draught.initial(namespace, collect);
            manager.draught = draught;
        }

        VMModAttribute(variety, manager);
        VMModDirective(behests, product, feature, command, collect);
        VMModReference(updated, product, element);

        return realtor;
    }),
    dispose     : normal(function () {
        var manager = this;
        var behests = manager.behests;
        var product = manager.product;
        var element = manager.element;

        VMDelDirective(behests, product, element.props);
        VMDelReference(element);
        VMDelLifeCycle(product);
        manager.emitter.dispose();
        manager.draught.dispose();
    }),
    trigger     : normal(function (event, connate) {
        if (this.connate === connate) {
            this.emitter.trigger(event);
        }
        if (ShouldEventBubbling(event)) {
            this.founder.trigger(event, connate);
        }
    }),
    attachEvent : normal(function (type, listener) {
        this.emitter.intrude(type, listener);
    }),
    detachEvent : normal(function (type, listener) {
        this.emitter.extrude(type, listener);
    }),
    dispatchEvent : normal(function (event) {
        this.trigger(event, this.connate);
    })
});
ElementRenderer.prototype = create({
    constructor : normal(ElementRenderer),
    initial     : normal(function (namespace, collect) {
        var manager = this;
        var element = manager.element;
        var insider = element.props.children;
        var feature = element.props;
        var trustor = element.type;
        var command = element.cmd;

        if (trustor === svgRootQName) {
            namespace = svgNamespace;
        }
        if (trustor === mmlRootQName) {
            namespace = mmlRootQName;
        }

        var behests = [];
        var members = [];
        var product = MKElement(trustor, namespace, manager);

        manager.behests = behests;
        manager.members = members;
        manager.product = product;

        VMSetAttribute(feature, manager);
        VMSetOffspring(members, product, manager, insider, namespace, collect);
        VMSetDirective(behests, product, feature, command, collect)
        VMSetReference(element, product);

        return MKRealtor(product, true);
    }),
    renewal     : normal(function (namespace, collect, updated) {
        var manager = this;
        var element = manager.element;
        var behests = manager.behests;
        var members = manager.members;
        var product = manager.product;
        var insider = updated.props.children;
        var feature = updated.props;
        var trustor = updated.type;
        var command = updated.cmd;
        
        if (trustor === svgRootQName) {
            namespace = svgNamespace;
        }
        if (trustor === mmlRootQName) {
            namespace = mmlRootQName;
        }

        manager.element = updated;

        var variety = MKVariety(feature, element.props);

        VMModAttribute(variety, manager);
        VMModOffspring(members, product, manager, insider, namespace, collect);
        VMModDirective(behests, product, feature, command, collect);
        VMModReference(updated, product, element);

        return MKRealtor(product, false);
    }),
    dispose     : normal(function () {
        var manager = this;
        var behests = manager.behests;
        var members = manager.members;
        var product = manager.product;
        var element = manager.element;

        VMDelOffspring(members);
        VMDelDirective(behests, product, element.props);
        VMDelReference(element);
        manager.emitter.dispose();
        DOMRemoveChild(product);
    }),
    trigger     : normal(function (event, connate) {
        if (this.connate === connate) {
            this.emitter.trigger(event);
        }
        if (ShouldEventBubbling(event)) {
            this.founder.trigger(event, connate);
        }
    }),
    attachEvent : normal(function (type, listener) {
        this.emitter.intrude(type, listener);
    }),
    detachEvent : normal(function (type, listener) {
        this.emitter.extrude(type, listener);
    }),
    dispatchEvent : normal(function (event) {
        this.trigger(event, this.connate);
    })
});
LibertyRenderer.prototype = create({
    constructor : normal(LibertyRenderer),
    trigger     : normal(function (event, connate) {
        if (this.connate === connate) {
            this.emitter.trigger(event);
        }
        if (ShouldEventBubbling(event)) {
            var founder = MKFounder(this.product);
            if (founder) {
                founder.trigger(event, connate);
            }
        }
    }),
    attachEvent : normal(function (type, listener) {
        this.emitter.intrude(type, listener);
    }),
    detachEvent : normal(function (type, listener) {
        this.emitter.extrude(type, listener);
    }),
    dispatchEvent : normal(function (event) {
        this.trigger(event, this.connate);
    })
});
SyntheticEvent.prototype  = create({
    constructor : normal(SyntheticEvent),
    stopImmediatePropagation : normal(function () {
        this[EVENT_ORIGINAL_EVENT].stopImmediatePropagation();
        this[EVENT_STATUS_TRACKER].cancelEntire = true;
        this[EVENT_STATUS_TRACKER].cancelBubble = true;
    }),
    stopPropagation  : normal(function () {
        this[EVENT_ORIGINAL_EVENT].stopPropagation();
        this[EVENT_STATUS_TRACKER].cancelBubble = true;
    }),
    preventDefault   : normal(function () {
        if (this[EVENT_ORIGINAL_EVENT].cancelable) {
            this[EVENT_ORIGINAL_EVENT].preventDefault();
            this[EVENT_STATUS_TRACKER].defaultPrevented = true;
        }
    }),
    preventRefresh   : normal(function () {
        this[EVENT_STATUS_TRACKER].refreshPrevented = true;
    }),
    type             : secure(function () {
        return this[EVENT_ORIGINAL_EVENT].type;
    }, true),
    bubbles          : secure(function () {
        return this[EVENT_ORIGINAL_EVENT].bubbles;
    }, true),
    cancelable       : secure(function () {
        return this[EVENT_ORIGINAL_EVENT].cancelable;
    }, true),
    cancelBubble     : secure(function () {
        return this[EVENT_STATUS_TRACKER].cancelBubble;
    }, true),
    cancelEntire     : secure(function () {
        return this[EVENT_STATUS_TRACKER].cancelEntire;
    }, true),
    defaultPrevented : secure(function () {
        return this[EVENT_STATUS_TRACKER].defaultPrevented;
    }, true),
    refreshPrevented : secure(function () {
        return this[EVENT_STATUS_TRACKER].refreshPrevented;
    }, true),
    originalEvent    : secure(function () {
        return this[EVENT_ORIGINAL_EVENT];
    }, true),
    currentTarget    : secure(function () {
        return this[EVENT_CURRENT_TARGET];
    }, true),
    target           : secure(function () {
        return this[EVENT_CONTACT_TARGET];
    }, true)
});
Promise.prototype         = create({
    constructor : normal(Promise),
    dispose     : normal(function () {
        if (this[COMMITMENT_DISPOSE]) {
            this[COMMITMENT_DISPOSE]();
        }
    }),
    "catch"     : normal(function (onrejected) {
        return this.then(null, onrejected);
    }),
    then        : normal(function (onresolved, onrejected) {
        var success = onresolved || Accomplish;
        var failure = onrejected || Misfortune;
        var product = new Promise(PMDeliver(this));
        switch (this[COMMITMENT_STATUS]) {
            case PENDING:
                this[COMMITMENT_OBSERVE].push(product, success, failure);
                break;
            case RESOLVED:
                PMExecute(product, this[COMMITMENT_RESULT], success);
                break;
            case REJECTED:
                PMExecute(product, this[COMMITMENT_RESULT], failure);
                break;
        }
        this[COMMITMENT_CAPTURE] = true;
        return product;
    }),
    status      : secure(function () {
        return this[COMMITMENT_STATUS];
    }),
    result      : secure(function () {
        return this[COMMITMENT_RESULT];
    })     
});

//
// Promise static expansion.
//
Promise.resolve = Accomplish(function (value) {
    return new Promise(function (resolve) { resolve(value); });
});
Promise.reject  = Accomplish(function (error) {
    return new Promise(function (_,reject) { reject(error); });
});
Promise.ajax    = Accomplish(function (request) {
    return new Promise(function (resolve, reject) {
        return request.jsonp ? PMJsonp(request, resolve, reject) : PMAsync(request, resolve, reject);
    });
});
Promise.race    = Accomplish(function (array) {
    return new Promise(function (resolve, reject) {
        if (array.length) {
            array.forEach(function (value) {
                (isInheritedClass(value, Promise) ? value : Promise.resolve(value)).then(resolve, reject);
            });
        } else {
            resolve();
        }
    });
});
Promise.all     = Accomplish(function (array) {
    return new Promise(function (resolve, reject) {
        var number = 0;
        var length = array.length;
        var result = new Array(length);
        if (length) {
            array.forEach(function (value, index) {
                (isInheritedClass(value, Promise) ? value : Promise.resolve(value)).then(function (value) {
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
});


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * 
 * @param   {T} target
 * @returns {T}
 * @template    T
 */
exports.assign = function (target) {
    target = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var ns = arguments[i];
        for (var name in ns) {
            if (Object.prototype.hasOwnProperty.call(ns, name)) {
                target[name] = ns[name];
            }
        }
    }
    return target;
};
/**
 * Returns a new Class value.
 * 
 * @param   {*}        proto
 * @returns {Function}
 */
exports.createClass = function (proto) {
    return (function (constructor) {
        return constructor.prototype = proto, constructor;
    } (
        (function (parent) {
            return function () { parent.apply(this, arguments); };
        } (proto.constructor || NOOP))
    ));
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param   {Function}       callback
 * @returns {Elf.Disposable}
 */
exports.requestAnimationFrame = function (callback, delay) {
    return {
        dispose : cancelAnimationFrame.bind(null, requestAnimationFrame(observe(callback, tear(arguments, 1))))
    };
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param   {Function}       callback
 * @param   {Number}         delay
 * @returns {Elf.Disposable}
 */
exports.setInterval = function (callback, delay) {
    return {
        dispose : clearInterval.bind(null, setInterval(observe(callback, tear(arguments, 2)), delay))
    };
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param   {Function}       callback
 * @param   {Number}         delay
 * @returns {Elf.Disposable}
 */
exports.setTimeout = function (callback, delay) {
    return {
        dispose : clearTimeout.bind(null, setTimeout(observe(callback, tear(arguments, 2)), delay))
    };
};

/**
 * Returns a Component class.
 * 
 * @param   {String}                        name
 * @param   {T}                             proto
 * @returns {Elf.Class<Elf.IComponent & T>}
 * @template                                T
 */
exports.Component = function (name, proto) {
    return define(exports.createClass(proto), DISPLAYING_COMPONENT, normal(name));
};
/**
 * Returns a Directive class.
 * 
 * @param   {String}                        name
 * @param   {T}                             proto
 * @returns {Elf.Class<Elf.IDirective & T>}
 * @template                                T
 */
exports.Directive = function (name, proto) {
    return define(exports.createClass(proto), DISPLAYING_DIRECTIVE, normal(name));
};
/**
 * Returns a Transform class.
 * 
 * @param   {String}                        name
 * @param   {T}                             proto
 * @returns {Elf.Class<Elf.ITransform & T>}
 * @template                                T
 */
exports.Transform = function (name, proto) {
    return define(exports.createClass(proto), DISPLAYING_TRANSFORM, normal(name));
};
/**
 * Returns an Event value.
 * 
 * @param   {String}    type 
 * @param   {Boolean}   bubbles 
 * @param   {*}         detail 
 * @returns {Elf.Event}
 */
exports.createEvent = function (ype, bubbles, detail) {
    return new SyntheticEvent({
        type                     : type,
        bubbles                  : !!bubbles,
        cancelable               : false,
        detail                   : detail,
        stopImmediatePropagation : NOOP,
        stopPropagation          : NOOP,
        preventDefault           : NOOP
    });
};
/**
 * Wrapped native event function, Let it be tracked.
 *  
 * @param {HTMLElement | JSX.ElementClass}     node 
 * @param {String}                             type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
exports.attachEvent = function (node, type, listener) {
    MKManager(node).attachEvent(type, listener);
};
/**
 * Wrapped native event function, Let it be tracked.
 *  
 * @param {HTMLElement | JSX.ElementClass}     node 
 * @param {String}                             type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
exports.detachEvent = function (node, type, listener) {
    MKManager(node).detachEvent(type, listener);
};
/**
 * Dispatches an Event at the node.
 * 
 * @param {HTMLElement | JSX.ElementClass} node 
 * @param {Elf.Event}                      event 
 */
exports.dispatchEvent = function (node, event) {
    MKManager(node).dispatchEvent(ModifyContactTarget(event, node));
};
/**
 * Returns a virtual element.
 * 
 * @param   {String | Elf.Class<JSX.ElementClass>} type 
 * @param   {*}                                    props 
 * @returns {JSX.Element}
 */
exports.createElement = function (type, props) {
    var feature = props || {};
    var insider = flatten(tear(arguments, 2));
    var element = {
        owner   : last(temporaryElementOwner),
        props   : {},
        type    : type,
        cmd     : feature.cmd || [],
        key     : feature.key,
        ref     : feature.ref
    };
    for (var name in feature) {
        if (name !== "cmd" &&
            name !== "key" &&
            name !== "ref" &&
            isValid(feature[name])) {
            element.props[ name ] = feature[ name ];
        }
    }
    define(element.props, "children", normal(insider));
    Object.freeze(element.props);
    return element;
};
/**
 * Returns a function that create the virtual element.
 * 
 * @param   {String | Function} trustor 
 * @returns {() => JSX.Element}
 */
exports.redactElement = function (trustor) {
    if (isString(trustor)) {
        trustor = exports.$html_analysis(trustor);
    }
    var privatelyComponentDep = {};
    var privatelyDirectiveDep = {};
    var privatelyTransformDep = {};
    flatten(tear(arguments, 1)).forEach(function (trustor) {
        if (exists(trustor, DISPLAYING_COMPONENT)) {
            define(privatelyComponentDep, trustor[DISPLAYING_COMPONENT], normal(trustor));
        }
        if (exists(trustor, DISPLAYING_DIRECTIVE)) {
            define(privatelyDirectiveDep, trustor[DISPLAYING_DIRECTIVE], normal(trustor));
        }
        if (exists(trustor, DISPLAYING_TRANSFORM)) {
            define(privatelyTransformDep, trustor[DISPLAYING_TRANSFORM], normal(trustor));
        }
    });
    return function () {
        temporaryComponentDep.push(privatelyComponentDep);
        temporaryDirectiveDep.push(privatelyDirectiveDep);
        temporaryTransformDep.push(privatelyTransformDep);
        try {
            return trustor.call(SefeSphere(this || {}), exports);
        } finally {
            temporaryComponentDep.pop();
            temporaryDirectiveDep.pop();
            temporaryTransformDep.pop();
        }
    };
};
/**
 * Force update all duplex individuals, Ignored if already in progress.
 * 
 * @returns {Boolean}
 */
exports.forceUpdate = function () {
    return broadcast();
};
/**
 * Register global dependency.
 */
exports.depend = function () {
    flatten(tear(arguments)).forEach(function (trustor) {
        if (exists(trustor, DISPLAYING_COMPONENT)) {
            define(communityComponentDep, trustor[DISPLAYING_COMPONENT], normal(trustor));
        }
        if (exists(trustor, DISPLAYING_DIRECTIVE)) {
            define(communityDirectiveDep, trustor[DISPLAYING_DIRECTIVE], normal(trustor));
        }
        if (exists(trustor, DISPLAYING_TRANSFORM)) {
            define(communityTransformDep, trustor[DISPLAYING_TRANSFORM], normal(trustor));
        }
    });
};
/**
 * Create HTMLElement by a virtual element and append to DOM.
 * 
 * @param   {JSX.Element}    element 
 * @param   {HTMLElement}    container 
 * @param   {Boolean}        duplex
 * @returns {Elf.Individual} 
 */
exports.render = function (element, container, duplex) {
    var monitor;
    var collect = [];
    var expanse = container.namespaceURI;
    var manager = new MKManager(container);
    var draught = MKDraught(element, manager);
    var product = {
        forceUpdate : function () {
            manufacture(draught.renewal(expanse, collect, element));
        },
        dispose : function () {
            monitor.dispose();
            draught.dispose();
        },
        duplex : !!duplex
    };
    manufacture(draught.initial(expanse, collect));
    return monitor = subscribe(product), product;
    function manufacture (realtor) {
        if (realtor.newly) {
            while (container.firstChild) {
                DOMRemoveChild(container.firstChild);
            }
            DOMInsertChild(container, realtor.value);
        }
        clean(collect, function (fn) { fn(); });
    }
};

/**
 * Represents the completion of an asynchronous operation
 * 
 * @type {Elf.PromiseConstructor}
 */
exports.Promise = Promise;

/**
 * Returns a Component class when matched.
 * @private The following methods or properties are used internally.
 *
 * @param  {String}                    value
 * @return {String | JSX.ElementClass} 
 */
exports.$tag = function (value) {
    if (exists(last(temporaryComponentDep), value)) {
        return last(temporaryComponentDep)[ value ];
    }
    if (exists(communityComponentDep, value)) {
        return communityComponentDep[ value ];
    }
    return value;
};
/**
 * Convert the value with Transforms.
 * @private The following methods or properties are used internally.
 * 
 * @param   {String} value
 * @returns {String} 
 */
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
    function execute (target, init, item) {
        return target.transform.apply(target, [init].concat(tear(item, 1)));
    }
};
/**
 * Returns a Directive class array when matched.
 * @private The following methods or properties are used internally.
 * 
 * @param   {String}                           value
 * @returns {Array<Elf.Class<Elf.IDirective>>} 
 */
exports.$cmd = function (value) {
    return flatten(trim(value).split(REGEXP_SEPARATOR_CMD).map(function (value) {
        if (exists(last(temporaryDirectiveDep), value)) {
            return last(temporaryDirectiveDep)[ value ];
        }
        if (exists(communityDirectiveDep, value)) {
            return communityDirectiveDep[ value ];
        }
        return wrong(new Error("Invalid directive " + value));
    }));
};
/**
 * Calls a defined callback function on each element of an array (or object), and returns an array that contains the results.
 * @private The following methods or properties are used internally.
 * 
 * @param   {*}        value 
 * @param   {Function} callback 
 * @param   {*}        target 
 * @returns {Array}
 */
exports.$map = function (value, callback, thisArg) {
    if (isInheritedClass(value, Promise)) {
        value = value[COMMITMENT_STATUS] === RESOLVED
              ? value[COMMITMENT_RESULT]
              : null;
    }
    if (isArray(value)) {
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
/**
 * Analysis html template.
 * When filename is passed in, the source map will be output.
 * @private The following methods or properties are used internally.
 * 
 * @param   {String}   html 
 * @param   {String=}  filename 
 * @returns {Function}
 */
exports.$html_analysis = function (html, filename) {
    var start;
    var tally = 0;
    var ahead = 0;
    var level = 0;
    var queue = [];
    var lines = [];
    var roots = [];
    var rownum = 0;
    var colnum = 0;
    var number = 18;
    var totals = 18;
    var resume = true;
    var script = "with(this){return(";
    var length = html.length;
    var source = {
        version         : 3,
        sources         : [ filename ],
        mappings        : ";AAAA"
    };
    var lineLength = exports.$lineLength;
    var expression = exports.$expression;
    var outputmaps = exports.btoa && exports.evlq && filename;
    for (start = 0; start < length;) {
        lines.push([start, start = TPLNewlineIndex(start)]);
    }
    for (start = 0; start < length;) {
        if (TPLCommentStart(start)) {
            TPLCommentParse(start, start = TPLCommentEnded(start));
        } else
        if (TPLDoctypeStart(start)) {
            TPLDoctypeParse(start, start = TPLDoctypeEnded(start));
        }
        if (TPLOccludeStart(start)) {
            TPLOccludeParse(start, start = TPLOccludeEnded(start));
        } else
        if (TPLElementStart(start)) {
            TPLElementParse(start, start = TPLElementEnded(start));
        } else {
            //
            TPLContentParse(start, start = TPLContentEnded(start));
        }
    }
    if (roots.length > 1) {
        wrong(new Error("Cannot use multiple root node"));
    }
    if (roots[0]) {
        ASTElementParse(roots[0]);
    } else {
        ASTAppendScript("null");
    }
    ASTAppendScript(")}");
    if (outputmaps) {
        script = script
                + "\n"
                + "\n//# sourceMappingURL=data:application/json;chatset=utf-8;base64," + exports.btoa(stringify(source))
                + "\n//# sourceURL=" + filename + "!transpiled";
    }
    return new Function("Elf", script);
    function TPLCommentStart (start) {
        return startsWith(html, "<!--", start);
    }
    function TPLDoctypeStart (start) {
        return startsWith(html, "<!"  , start) && /DOCTYPE/i.test(html.slice(start + 2, start + 9));
    }
    function TPLOccludeStart (start) {
        return startsWith(html, "</"  , start) && REGEXP_TEMPLATE_NAME.test(html.charAt(start + 2));
    }
    function TPLElementStart (start) {
        return startsWith(html, "<"   , start) && REGEXP_TEMPLATE_NAME.test(html.charAt(start + 1));
    }
    function TPLCommentEnded (start) {
        return Math.min(length, TPLRough(html, "-->", start + 4, TPLPlain) + 3);
    }
    function TPLDoctypeEnded (start) {
        return Math.min(length, TPLRough(html, ">"  , start + 9, TPLPlain) + 1);
    }
    function TPLOccludeEnded (start) {
        return Math.min(length, TPLRough(html, ">"  , start + 3, TPLPlain) + 1);
    }
    function TPLElementEnded (start) {
        return Math.min(length, TPLExact(html, ">"  , start + 2, TPLPlain) + 1);
    }
    function TPLContentEnded (start) {
        return Math.min(length, TPLRough(html, "<"  , start    , TPLDuple)    );
    }
    function TPLNewlineIndex (start) {
        return Math.min(length, TPLRough(html, "\n" , start    , TPLPlain) + 1);
    }
    function TPLCommentParse (start, ended) {
        console.warn(stringify(tear(html, start, ended)) + " will be dispensed");
    }
    function TPLDoctypeParse (start, ended) {
        console.warn(stringify(tear(html, start, ended)) + " will be dispensed");
    }
    function TPLOccludeParse (start, ended) {
        var qname = TPLNameParse(start + 2,
                      tear(html, start + 2, ended - 1));
        if (tally && isPreformatted(qname.value)) {
            tally--;
        }
        if (!isSolitaryNode(qname.value)) {
            while  (level) {
                if (queue[--level].qname.value === qname.value) {
                    break;
                }
            }
        }
    }
    function TPLElementParse (start, ended) {
        var qname = TPLNameParse(start + 1,
                      tear(html, start + 1, ended - 1));
        var attrs = TPLAttrParse(start + 1 + qname.value.length,
                      tear(html, start + 1 + qname.value.length, ended - 1));
        var depth = !(html.charAt(ended - 2) === "/" || isSolitaryNode(qname.value));
        if (depth && isPreformatted(qname.value)) {
            tally++;
        }
        TPLStore({
            label : true,
            level : level,
            qname : qname,
            attrs : attrs,
            nodes : []
        }, depth);
    }
    function TPLContentParse (start, ended) {
        if (start < ended) {
            var index = 0;
            var value = tear(html, start, ended);
            if (tally === 0) {
                index = TPLBlank(value);
                value = trim(value);
            }
            if (index >= 0) {
                if (TPLCDATA()) {
                    TPLStore({
                        label : false,
                        level : level,
                        texts : [{
                            rawer : true,
                            place : TPLPlace(start),
                            value : value
                        }]
                    });
                } else {
                    TPLStore({
                        label : false,
                        level : level,
                        texts : TPLTextParse(start + index, value)
                    });
                }
            }
        }
    }
    function TPLNameParse (start, value) {
        var match = value.match(REGEXP_TEMPLATE_NAME);
        return TPLTuple(start + match.index, match[0]);
    }
    function TPLAttrParse (start, value) {
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
            start = start                   + match[0].length) {
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
            if (isCycleAttribute(token)) {
                iteration = TPLEachParse(index, texts);
            } else
            if (isJudgeAttribute(token)) {
                condition = TPLWhenParse(index, texts);
            } else
            if (isEventAttribute(token)) {
                otherwise.push({
                    event : true,
                    token : TPLTuple(start, token),
                    prime : TPLTuple(index, texts) 
                });
            } else {
                otherwise.push({
                    event : false,
                    token : TPLTuple(start, token),
                    texts : TPLTextParse(index, texts)
                });
            }
        }
        return {
            iteration : iteration,
            condition : condition,
            otherwise : otherwise
        };
    }
    function TPLEachParse (start, value) {
        var match = value.match(REGEXP_TEMPLATE_EACH);
        if (match) {
            return {
                keys : TPLTuple(start + match.index , match[1]),
                body : TPLTuple(start + match.index + match[1].length + match[2].length, match[3])
            };
        }
        wrong(new Error("Invalid iteration expression " + value));
    }
    function TPLWhenParse (start, value) {
        var index = TPLBlank (value);
        if (index >= 0) {
            return TPLTuple(start + index, trim(value));
        }
    }
    function TPLTextParse (start, value) {
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
            ;number = finish + sufnum) {
            if (number < incept) {
                TPLConst(start + number,
                    tear(value , number, incept ));
            }
            if (incept < finish - prenum) {
                TPLTrend(start + incept + prenum,
                    tear(value , incept + prenum, finish ));
            }
        }
        if (number < length) {
            TPLConst(start + number,
                tear(value , number, length ));
        }
        return texts;
        function TPLConst (start, value) {
            if (value) {
                texts.push({
                    rawer : true,
                    place : TPLPlace(start),
                    value : TPLValue(value)
                });
            }
        }
        function TPLTrend (start, value) {
            var first;
            var pipes = [];
            var number = 0;
            var length = value.length;
            for ( ; number < length; number++) {
                if (number === 0) {
                    TPLFirst(start + number,
                        tear(value , number, number = TPLUprightIndex(number) ));
                } else {
                    TPLPipes(start + number,
                        tear(value , number, number = TPLUprightIndex(number) ));
                }
            }
            if (first) {
                texts.push({
                    rawer : false,
                    first : first,
                    pipes : pipes
                });
            }
            function TPLUprightIndex (start) {
                return Math.min(length, TPLExact(value, REGEXP_SEPARATOR_FIT, TPLShave(value, REGEXP_TEMPLATE_WORD, start), TPLAlone));
            }
            function TPLFirst (start, value) {
                var index = TPLBlank(value);
                if (index >= 0) {
                    first = TPLTuple(start + index, trim(value));
                }
            }
            function TPLPipes (start, value) {
                var token;
                var flags = [];
                var number = 0;
                var length = value.length;
                for ( ; number < length; number++) {
                    if (number === 0) {
                        TPLToken(start + number,
                            tear(value , number, number = TPLSpacingIndex(number) ));
                    } else {
                        TPLFlags(start + number,
                            tear(value , number, number = TPLSpacingIndex(number) ));
                    }
                }
                if (token) {
                    pipes.push({
                        token : token,
                        flags : flags
                    });
                }
                function TPLSpacingIndex (start) {
                    return Math.min(length, TPLExact(value, REGEXP_SEPARATOR_ARG, TPLShave(value, REGEXP_TEMPLATE_WORD, start), TPLPlain));
                }
                function TPLToken (start, value) {
                    var index = TPLBlank(value);
                    if (index >= 0) {
                        token = TPLTuple(start + index, trim(value));
                    }
                }
                function TPLFlags (start, value) {
                    var index = TPLBlank(value);
                    if (index >= 0) {
                        flags.push(
                                TPLTuple(start + index, trim(value))
                        );
                    }
                }
            }
        }
        function TPLAlone (start) {
            return !REGEXP_SEPARATOR_FIT.test(value.charAt(start + 1))
                && !REGEXP_SEPARATOR_FIT.test(value.charAt(start - 1));
        }
    }
    function TPLStore (value, depth) {
        queue[level] = value;
        if (level) {
            queue[level - 1].nodes.push(value);
        } else {
            roots.push(value);
        }
        if (depth) {
            level++;
        }
    }
    function TPLTuple (start, value) {
        return {
            place : TPLPlace(start),
            value : TPLValue(value) 
        };
    }
    function TPLPlace (value) {
        for ( ; ahead <  lines.length; ahead++) {
            if (value >= lines[ahead][0] &&
                value <  lines[ahead][1]) {
                return {
                    rownum : ahead,
                    colnum : value - lines[ahead][0]
                };
            }
        }
    }
    function TPLValue (value) {
        return exports.$html_unescape(value);
    }
    function TPLDuple (start) {
        var cdata = TPLCDATA(start);
        if (cdata) {
            return startsWith(html, "</" + cdata, start) && /[^-:\w]/.test(html.charAt(start + cdata.length + 2));
        }
        return TPLCommentStart(start)
            || TPLOccludeStart(start)
            || TPLElementStart(start);
    }
    function TPLPlain () {
        return true;
    }
    function TPLCDATA () {
        if (level > 0) {
            var name = queue[level - 1].qname.value;
            if (lower(name) === "style" ||
                lower(name) === "script") {
                return name;
            }
        }
    }
    function TPLBlank (html) {
        return html.search(REGEXP_TEMPLATE_WORD);
    }
    function TPLShave (html, value, start) {
        var number = start || 0;
        var length = html.length;
        for (; number < length; number++) {
            if (TPLJudge(html.charAt(number), value)) {
                break;
            }
        }
        return number;
    }
    function TPLRough (html, value, start, fn) {
        var length = html.length;
        var number = html.indexOf(value, start);
        return number < 0
            ? length : fn(number)
            ? number : TPLRough(html, value, number + 1, fn);
    }
    function TPLExact (html, value, start, fn) {
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
    function TPLJudge (html, value) {
        return value.test ? value.test(html) : value === html;
    }
    function ASTElementParse (node) {
        if (node.label) {
            if (node.attrs.iteration) {
                if (node.level) {
                    ASTIterateParse(node);
                } else {
                    wrong(new Error("Cannot use iteration on root node"));
                }
            } else
            if (node.attrs.condition) {
                ASTTernaryParse(node);
            } else {
                ASTDefaultParse(node);
            }
        } else {
            ASTContentParse(node);
        }
    }
    function ASTDefaultParse (node) {
        ASTAppendScript("Elf.createElement(Elf.$tag(");
        ASTAppendSource(node.qname);
        ASTAppendScript(stringify(node.qname.value));
        ASTAppendScript("),");
        ASTNaturesParse(node);
        if (node.nodes.length) {
            ASTAppendScript(",");
            ASTInsiderParse(node);
        }
        ASTAppendScript(")");
    }
    function ASTIterateParse (node) {
        ASTAppendSource(node.attrs.iteration.keys);
        ASTAppendScript("Elf.$map(");
        ASTAppendSource(node.attrs.iteration.body);
        ASTAppendScript(node.attrs.iteration.body.value);
        ASTAppendScript(",function(");
        ASTAppendScript(node.attrs.iteration.keys.value);
        ASTAppendScript("){return(");
        if (node.attrs.condition) {
            ASTTernaryParse(node);
        } else {
            ASTDefaultParse(node);
        }
        ASTAppendScript(")},this)");
    }
    function ASTTernaryParse (node) {
        ASTAppendScript("((");
        ASTAppendSource(node.attrs.condition);
        ASTAppendScript(node.attrs.condition.value);
        ASTAppendScript(")?");
        ASTDefaultParse(node);
        ASTAppendScript(":null)");
    }
    function ASTInsiderParse (node) {
        ASTAppendScript("[");
        node.nodes.forEach(function (node, numb) {
            ASTAppendScript(numb > 0 ? "," : "");
            ASTElementParse(node);
        });
        ASTAppendScript("]");
    }
    function ASTNaturesParse (node) {
        ASTAppendScript("{");
        node.attrs.otherwise.forEach(function (node, numb) {
            ASTAppendScript(numb > 0 ? "," : "");
            ASTAppendScript(stringify(node.token.value));
            ASTAppendScript(":");
            if (node.event) {
                ASTAppendScript("function(event){");
                ASTAppendSource(node.prime);
                ASTAppendScript(node.prime.value);
                ASTAppendScript("}.bind(this)");
            } else
            if (node.texts.length) {
                if (node.token.value === "cmd") {
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
    function ASTContentParse (node) {
        node.texts.forEach(function (node, numb) {
            ASTAppendScript(numb > 0 ? "+" : "");
            if (node.rawer) {
                ASTAppendSource(node);
                ASTAppendScript(stringify(node.value));
            } else {
                ASTExpressParse(node);
            }
        });
    }
    function ASTExpressParse (node) {
        ASTAppendSource(node.first);
        ASTAppendScript("Elf.$fit(");
        ASTAppendScript(node.first.value || "void 0");
        node.pipes.forEach(function (node, numb) {
            ASTAppendScript(",[");
            ASTAppendSource(node.token);
            ASTAppendScript(stringify(node.token.value));
            node.flags.forEach(function (node, numb) {
                ASTAppendScript(",");
                ASTAppendSource(node);
                ASTAppendScript(node.value);
            });
            ASTAppendScript("]");
        });
        ASTAppendScript(")");
    }
    function ASTAppendScript (value) {
        var length = value.length;
        if (totals > lineLength - length) {
            script += "\n";
            resume = true;
            totals = 0;
            number = 0;
        }
        number += length;
        totals += length;
        script += value;
    }
    function ASTAppendSource (value) {
        if (outputmaps) {
            source.mappings += resume ? ";" : ",";
            source.mappings += exports.evlq([number, 0, value.place.rownum - rownum, value.place.colnum - colnum]);
            rownum = value.place.rownum;
            colnum = value.place.colnum;
            resume = false;
            number = 0;
        }
    }
};
/**
 * Unescape html character.
 * @private The following methods or properties are used internally.
 * 
 * @param   {String} html 
 * @returns {String}
 */
exports.$html_unescape = function (html) {
    CODE || (CODE = DOMMakeElement("i"));
    CODE.innerHTML = html;
    return CODE.textContent;
};
/**
 * Event attribute prefix of template.
 * @private The following methods or properties are used internally.
 */
exports.$eventStart = "on";
/**
 * Maximum length of line that generate the code.
 * @private The following methods or properties are used internally.
 */
exports.$lineLength = 0x8000;
/**
 * JavaScript expression block of template.
 * @private The following methods or properties are used internally.
 */
exports.$expression = ["{{", "}}"];
/**
 * Condition attribute of template.
 * @private The following methods or properties are used internally.
 */
exports.$condition  = "e-if";
/**
 * Iteration attribute of template.
 * @private The following methods or properties are used internally.
 */
exports.$iteration  = "e-for";

//
// Internal members access for plug-in.
//
exports["Global.listener"] = GlobalEventListener;
exports["Global.renderer"] = DISPLAYING_RENDERER;
exports["Global.launcher"] = MKManager;

}));