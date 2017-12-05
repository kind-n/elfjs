/**
 * 
 * 
 * http://www.elfjs.org
 * 
 * @copyright (C) 2017 Wu Hu. All Rights Reserved.
 * 
 * @version 0.3.0
 * @license MIT
 * 
 */
"use strict";

/// <reference path="./elf.d.ts" />

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

/**
 * 
 * @typedef Variety
 * @property {*} newly
 * @property {*} hoary
 * @property {{[x:string]:{oldValue:*,newValue:*}}} alter
 */

//////////////////////////////////////////////////
/// CODE
//////////////////////////////////////////////////

! (function (Elf, window, document, location) {

/**
 * Removes the leading and trailing white space and line terminator characters from a string.
 * 
 * @param {String} target
 * @returns {String} 
 */
function trim (target) {
    return target.trim();
}
/**
 * Returns the last value of the array.
 * 
 * @param {Array<T>} target 
 * @returns {T}
 * @template T
 */
function last (target) {
    return target[target.length - 1];
}
/**
 * Create a new Array instance from an array-like, But not support iterable object. 
 * 
 * @param {Array | String} target 
 * @param {Number=} start
 * @param {Number=} ended
 * @returns {Array | String}
 */
function slit (target) {
    return (target.slice || Array.prototype.slice).apply(
            target, Array.prototype.slice.call(arguments, 1));
}
/**
 * Converts all the alphabetic characters in a string to lowercase.
 * 
 * @param {String} target 
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
 * Filled with a new array.
 * 
 * @param {Array} target 
 * @param {Array} value 
 */
function reset (target, value) {
    Array.prototype.splice.apply(target, [0, target.length].concat(value));
}
/**
 * Returns a binding context and parameters of the function.
 * 
 * @param {*} target 
 * @param {*} value 
 */
function apply (target, value) {
    return function (callback) {
        return callback.call(target, value);
    };
}
/**
 * Empty the array and flashback to execute the callback.
 * 
 * @param {Array} target 
 * @param {Function} callback 
 */
function clean (target, callback) {
    while (target.length) {
        callback(target.pop());
    }
}
/**
 * Adds a property to an object, or modifies attributes of an existing property.
 * 
 * @param {T} target 
 * @param {PropertyKey} name 
 * @param {*} value 
 * @param {Boolean} enumerable 
 * @returns {T}
 * @template T
 */
function define (target, name, value, enumerable) {
    return Object.defineProperty(target, name, {
        configurable : true,
        enumerable : !!enumerable,
        writable : true,
        value : value
    });
}
/**
 * Depth comparison of two objects.
 * 
 * @param {*} target 
 * @param {*} origin 
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
 * Determines whether it is member of the object.
 * 
 * @param {*} target 
 * @param {PropertyKey} name 
 * @returns {Boolean}
 */
function exists (target, name) {
    return isValid(target) && name in target;
}
/**
 * Returns a Promise of Provide.
 * 
 * @param {*} target
 * @returns {Elf.Promise<Elf.Provide>} 
 */
function provide (target) {
    return Promise.resolve({ exports : target });
}
/**
 * Flattens a nested array.
 * 
 * @param {Array} target
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
 * Add an value to the array. The same value can't be added.
 * And return the function that remove it.
 * 
 * @param {Array} target 
 * @param {*} value 
 * @returns {Function}
 */
function impress (target, value) {
    return intrude(target, value), extrude.bind(this, target, value);
}
/**
 * Add an object to an array.
 * And return whether it's first to add.
 * 
 * @param {Array} target 
 * @param {*} value 
 * @returns {Boolean}
 */
function intrude (target, value) {
    return target.indexOf(value) < 0 ? target.push(value) === 1 : false;
}
/**
 * Remove an object from an array.
 * And return whether it's last to remove.
 * 
 * @param {Array} target 
 * @param {*} value 
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
 * @param {Function} target 
 * @param {Array} flags 
 * @returns {Function}
 */
function observe (target, flags) {
    return function () {
        var instance = Elf.createEvent("async", false);
        target.apply(this, [instance].concat(flags));
        instance.refreshPrevented || broadcast();
    };
}
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * 
 * @param {*} target 
 * @returns {String}
 */
function stringify (target) {
    return JSON.stringify(target);
}
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * 
 * @param {String} target 
 * @returns {*}
 */
function objectify (target) {
    return JSON.parse(target);
}
/**
 * Invoke collectivity update.
 * Only once at the same time.
 * 
 * @returns {Boolean}
 */
function subscribe (target) {
    return {
        dispose : impress(collectivity, target)
    };
}
/**
 * Add individual to the collectivity.
 * 
 * @param {Elf.Individual} target 
 * @returns {Elf.Disposable}
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

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Determines whether the passed value is an Array.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isArray (target) {
    return Array.isArray(target);
}
/**
 * Determines whether the passed value is a valid value.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isValid (target) {
    return target !== void 0 && target !== null;
}
/**
 * Determines whether the passed value is an basic type.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isBasic (target) {
    return isString(target)
        || isNumber(target)
        || isBoolean(target);
}
/**
 * Determines whether the passed value is a string.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isString (target) {
    return typeof target === "string";
}
/**
 * Determines whether the passed value is a number.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isNumber (target) {
    return typeof target === "number";
}
/**
 * Determines whether the passed value is an object.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isObject (target) {
    return typeof target === "object" && isValid(target);
}
/**
 * Determines whether the passed value is a boolean.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isBoolean (target) {
    return typeof target === "boolean";
}
/**
 * Determines whether the passed value is a function.
 * 
 * @param {*} target
 * @returns {Boolean}
 */
function isFunction (target) {
    return typeof target === "function";
}
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 * 
 * @param {String} target
 * @param {String} value
 * @param {Number} current
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
 * Determines whether the passed value is event attrubute.
 * 
 * @param {String} target 
 * @returns {Boolean}
 */
function isEventAttribute (target) {
    return startsWith(target, eventStart);
}
/**
 * Determines whether the passed value is text type of INPUT element.
 * 
 * @param {String} target
 * @returns {Boolean} 
 */
function isAlterableInput (target) {
    return exists(allowedRejiggerInputs, target);
}
/**
 * Determines whether the passed value is INPUT element.
 * 
 * @param {String} target 
 * @returns {Boolean}
 */
function isInteractiveTag (target) {
    return isString(target) && lower(target) === "input";
}
/**
 * Determines whether the target is inheriting the class.
 * 
 * @param {*} target 
 * @param {Function} trustor 
 */
function isInheritedClass (target, trustor) {
    return target instanceof trustor;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Returns a new Proxy value.
 * 
 * @param {T} target 
 * @returns {T}
 * @template T
 */
function ProxyObject (target) {
    if (supportedProxyObject) {
        return new Proxy(target, {
            has : function (target, name) {
                var isContain = exists(target, name);
                var isAllowed = exists(allowedGlobalVariates, name);
                if (!isContain && !isAllowed) {
                    wrong(new Error(name + " is not defined"));
                }
                return isContain || !isAllowed;
            }
        });
    }
    return target;
}
/**
 * Returns a new unique Symbol value.
 * 
 * @param {String | Number} target 
 * @returns {PropertyKey}
 */
function GuardMember (target) {
    if (supportedGuardMember) {
        return Symbol(target);
    }
    return target;
}
/**
 * Returns the event need bubble.
 * 
 * @param {Elf.Event} event 
 * @returns {Boolean}
 */
function ShouldEventBubbling (event) {
    return event.bubbles && !event.cancelBubble;   
}
/**
 * Global event listener.
 * All HTMLElement are bind this.
 * 
 * @param {Event} event 
 */
function GlobalEventListener (event) {
    var instance = new SyntheticEvent(event);
    this[DISPLAY_RENDERER].dispatchEvent(instance);
    instance.refreshPrevented || broadcast();
    event.stopImmediatePropagation();
    event.stopPropagation();
}
/**
 * Modify the target of event.
 * 
 * @param {Event | Elf.Event} event 
 * @param {*} target 
 * @returns {Elf.Event}
 */
function ModifyContactTarget (event, target) {
    return define(new SyntheticEvent(event), EVENT_CONTACT_TARGET, target);
}
/**
 * Modify the currentTarget of event.
 * 
 * @param {Event | Elf.Event} event 
 * @param {*} target 
 * @returns {Elf.Event}
 */
function ModifyCurrentTarget (event, target) {
    return define(new SyntheticEvent(event), EVENT_CURRENT_TARGET, target);
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * 
 * 
 * @param {String} modname 
 * @returns {Function}
 */
function LDDefine (modname) {
    return function () {
        var provide = slit(arguments);
        var trustor = provide.pop();
        var depends = provide.pop() || [];
        var rawname = provide.pop() || modname;
        modulesCache[rawname] = Promise.resolve({
            dirname : LDFinder(modname),
            depends : depends,
            trustor : trustor
        });
    }
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {Function}
 */
function LDImport (dirname) {
    return function (modname) {
        return (modulesCache[modname] || LDLoader(
                    LDActual(modname) || LDLocate(
                        /^\//.test(modname) ? modname :
                        /^\./.test(modname) ? dirname + "/" + modname :
                        (optionsCache.baseURL || "/") + "/" + modname )
        )).then(function (provide) {
            return exists(provide, "exports") ? provide.exports : (provide.exports = LDLaunch(provide));
        });
    };
}
/**
 * 
 * 
 * @param {Elf.Provide} provide
 * @returns {Elf.Promise} 
 */
function LDLaunch (provide) {
    var obtain = {};
    var module = { exports : {} };
    if (isFunction(provide.trustor)) {
        return Promise.all(
            provide.depends.map(function (item) {
                if (item === "require") return obtain;
                if (item === "exports") return module.exports;
                if (item === "module")  return module;
                return LDImport(provide.dirname)(item);
            })
        ).then(function (depends) {
            return provide.trustor.apply(module.exports, depends.map(function (item) {
                return item === obtain ? function (name) {
                    return depends[provide.depends.indexOf(name)];
                } : item;
            })) || module.exports;
        });
    } else {
        return Promise.resolve(provide.trustor);
    }
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {Elf.Promise<Elf.Provide>}
 */
function LDLoader (modname) {
    return modulesCache[modname] || (modulesCache[modname] = Promise.ajax({
        url : LDRouter (modname)
    }).then(function (response) {
        return (Elf.Compiler[lower(slit(modname, modname.lastIndexOf(".") + 1))] || provide)(response.text(), modname);
    }));
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function LDLocate (modname) {
    var hostname = location.host;
    var protocol = location.protocol;
    var splitURL = modname.split(/\/+/);
    if (/\w+:$/.test(splitURL[0])) {
        protocol = splitURL.shift();
        hostname = splitURL.shift();
        splitURL.unshift();
    }
    for (var i = 0; i < splitURL.length;) {
        if (splitURL[i] === ".") {
            splitURL.splice(i, 1);
        } else
        if (splitURL[i] === ".." && i > 0) {
            splitURL.splice(--i, 2);
        } else {
            i++;
        }
    }
    var address = splitURL.join("/");
    if (splitURL.pop().indexOf(".") < 0) {
        address = address + "." + (optionsCache.defaultExtension || "js");
    }
    return protocol + "//" + hostname + "/" + address.replace(/^\/+/, "");
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function LDRouter (modname) {
    return optionsCache.routing ? optionsCache.routing(modname) : modname;
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function LDActual (modname) {
    return optionsCache.mapping && optionsCache.mapping[modname];
}
/**
 * 
 * 
 * @param {String} modname 
 * @returns {String}
 */
function LDFinder (modname) {
    return modname.replace(/[^\/]+$/, "");
}
/**
 * 
 * 
 * @param {String} value 
 * @returns {String}
 */
function LDFormat (value) {
    if (optionsCache.module === "commonjs") {
        return "define(" + LDDepend(value.replace(REGEXP_DELS, "")) + ",function(require,exports,module){\n" + value + "\n})";
    }
    return value;
}
/**
 * 
 * 
 * @param {String} value 
 * @returns {String}
 */
function LDDepend (value) {
    var match;
    var token;
    var result = [
        "require",
        "exports",
        "module"
    ];
    for (;
        match = value.match(REGEXP_DEPS);
        value = slit(value, match.index + match[0].length)) {
        token = match[2] || match[3];
        if (token && match[1] !== ".") {
            intrude(result, token);
        }
    }
    return stringify(result);
}

//
//

/**
 * Returns an Emitter.
 * 
 * @param {Manager} manager 
 * @returns {Emitter}
 */
function MKEmitter (manager) {
    return {
        EX : {},
        MK : function (type) {
            return this.EX[type] || (this.EX[type] = []);
        },
        intrude : function (type, listener) {
            intrude(this.MK(type), listener) && manager.connate && DOMAddListener(manager.product, type, GlobalEventListener);
        },
        extrude : function (type, listener) {
            extrude(this.MK(type), listener) && manager.connate && DOMDelListener(manager.product, type, GlobalEventListener);
        },
        replace : function (type, oldValue, newValue) {
            var events = this.MK(type);
            var number = events.indexOf(oldValue);
            if (number >= 0) {
                events.splice(number,1, newValue);
            }
        },
        trigger : function (event) {
            var target = manager.product;
            var events = this.MK(event.type);
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
                for (var type in this.EX) {
                    DOMDelListener(manager.product, type, GlobalEventListener);
                }
            }
            this.AX = {};
        }
    };
}
/**
 * Returns a Realtor.
 * 
 * @param {HTMLElement} element 
 * @param {Boolean} newly 
 * @returns {Realtor}
 */
function MKRealtor (element, newly) {
    return { value: element, newly: newly };
}
/**
 * Create a Manager by a virtual element.
 * 
 * @param {JSX.Element} element 
 * @param {Manager} founder 
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
 * @param {JSX.Element} element 
 * @param {JSX.Element} ancient 
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
                continue;
            }
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
 * Create a Component.
 * 
 * @param {Elf.Class<JSX.ElementClass>} trustor 
 * @param {*} attribute 
 * @param {Manager} manager 
 * @returns {JSX.ElementClass}
 */
function MKExample (trustor, attribute, manager) {
    var product = Object.create(trustor.prototype);
    define(product, DISPLAY_RENDERER, manager, true);
    define(product, "props", attribute);
    define(product, "refs", {});
    product.constructor();
    return product;
}
/**
 * Create a HTMLElement.
 * 
 * @param {String} trustor 
 * @param {String} namespace 
 * @param {Manager} manager 
 * @returns {HTMLElement}
 */
function MKElement (trustor, namespace, manager) {
    return define(DOMCreateElement(trustor, namespace), DISPLAY_RENDERER, manager, true);
}
/**
 * Returns a single object of the passed value.
 * 
 * @param {Elf.Class<T>} trustor 
 * @returns {T}
 * @template T
 */
function MKUnitary (trustor) {
    return trustor[DISPLAY_INSTANCE] || (trustor[DISPLAY_INSTANCE] = new trustor());
}
/**
 * Create a single manager of the passed value.
 * 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @returns {Manager}
 */
function MKManager (product) {
    return product[DISPLAY_RENDERER] || (product[DISPLAY_RENDERER] = new LibertyRenderer(product));
}
/**
 * Create a virtual element.
 * 
 * @param {JSX.ElementClass} product 
 * @returns {JSX.Element}
 */
function MKVirtual (product) {
    try {
        temporaryElementOwner.push(product);
        return product.render();
    } finally {
        temporaryElementOwner.pop();
    }
}
/**
 * Returns this closest element with manager.
 * 
 * @param {HTMLElement | Document | Window} product 
 * @returns {Manager}
 */
function MKFounder (product) {
    var instance = product.parentNode || product.defaultView;
    if (instance && instance !== product) {
        if (instance[DISPLAY_RENDERER]) {
            return instance[DISPLAY_RENDERER];
        } else {
            return MKFounder(instance);
        }
    }
}

//
//

/**
 * Rectify event attrubute.
 * 
 * @param {String} value 
 * @returns {String}
 */
function VMRectifyEvent (value) {
    return lower(slit(value, eventStart.length));
}
/**
 * Rectify trait attrubute.
 * 
 * @param {String} value 
 * @returns {String}
 */
function VMRectifyTrait (value) {
    return htmlAttributeMappings[value] || value;
}
/**
 * Compare two virtual elements, and returns no need redraw.
 * 
 * @param {JSX.Element | String | Number} target 
 * @param {JSX.Element | String | Number} origin 
 */
function VMNoneedRedraw (target, origin) {
    if (isObject(target) && isObject(origin)) { 
        if ( target.key !== origin.key ) {
            return false;
        }
        if (target.type !== origin.type) {
            return false;
        }
        if (isInteractiveTag(target.type) &&
            isInteractiveTag(origin.type)) {
            var tA = target.props.type;
            var tB = origin.props.type;
            return tA === tB
                || isAlterableInput(tA)
                && isAlterableInput(tB);
        }
        return true;
    }
    return isValid(target) === isValid(origin)
        && isBasic(target) === isBasic(origin);
}

//
//


/**
 * Create children.
 * 
 * @param {Array<Manager>} members 
 * @param {HTMLElement} product 
 * @param {Manager} manager 
 * @param {Array<JSX.Element | String | Number>} insider 
 * @param {String} namespace 
 * @param {Array} collect 
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
 * Modify children.
 * 
 * @param {Array<Manager>} members 
 * @param {HTMLElement} product 
 * @param {Manager} manager 
 * @param {Array<JSX.Element | String | Number>} insider 
 * @param {String} namespace 
 * @param {Array} collect 
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
 * Remove children.
 * 
 * @param {Array<Manager>} members 
 */
function VMDelOffspring (members) {
    clean(members, function (draught) {
        draught.dispose();
    });
}
/**
 * Assign attribute.
 * 
 * @param {*} feature 
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
 * Modify attribute.
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
 * Remove attribute.
 * 
 * @param {*} feature 
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
 * Assign directive.
 * 
 * @param {Array} behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*} feature 
 * @param {Array} command 
 * @param {Array} collect 
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
 * Modify directive.
 * 
 * @param {Array} behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*} feature 
 * @param {Array} command 
 * @param {Array} collect 
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
 * Remove directive.
 * 
 * @param {Array} behests 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {*} feature 
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
 * @param {JSX.Element} element 
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
 * @param {JSX.Element} element 
 * @param {HTMLElement | JSX.ElementClass} product 
 * @param {JSX.Element} ancient 
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
 * @param {Array} collect 
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

//
//

/**
 * Native add event listener.
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function DOMAddListener (element, type, listener) {
    element.addEventListener(type, listener, false);
}
/**
 * Native remove event listener.
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
function DOMDelListener (element, type, listener) {
    element.removeEventListener(type, listener, false);
}
/**
 * Native set attribute.
 * 
 * @param {HTMLElement} element 
 * @param {String} name 
 * @param {*} value 
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
 * @param {String} name 
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
 * @param {*} product 
 * @returns {String}
 */
function DOMFormatStyle (product) {
    if (isObject(product)) {
        return Object.keys(product).map(function (value) {
            return value.replace(/[A-Z]/g, function (value) {
                return "-" + lower(value);
            }) + ":" + product[value];
        }).join(";");
    }
    return product;
}
/**
 * Format class, support object class.
 * 
 * @param {*} product
 * @returns {String} 
 */
function DOMFormatClass (product) {
    if (isObject(product)) {
        return Object.keys(product).filter(function (value) {
            return !!product[value];
        }).join(" ");
    }
    return product;
}
/**
 * Native create element.
 * 
 * @param {String} trustor 
 * @param {String} namespace 
 * @returns {HTMLElement}
 */
function DOMCreateElement (trustor, namespace) {
    return namespace ? document.createElementNS(namespace, trustor) : document.createElement(lower(trustor));
}
/**
 * Native create text node.
 * 
 * @param {String} trustor 
 * @returns {Text}
 */
function DOMCreateContent (trustor) {
    return document.createTextNode(trustor);
}
/**
 * Native create comment.
 * 
 * @param {String} trustor 
 * @returns {Comment}
 */
function DOMCreateComment (trustor) {
    return document.createComment(trustor);
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//
// Constants.
//
var NOOP = function () {};
var HEAD = document.querySelector("head");
var CODE = document.createElement("code");
var FAIL = "error";
var LOAD = "load";
var TYPE = "type";
var LINK = "src";

/**
 * Output source map of template.
 */
var sourceMap = true;
/**
 * Event attribute prefix of template.
 */
var eventStart = "on";
/**
 * JavaScript expression block of template.
 */
var expression = [
    "{{",
    "}}"
];
/**
 * Maximum length of line that generate the code.
 */
var lineLength = 0x8000;
/**
 * Modules cache.
 */
var modulesCache = {};
/**
 * Options cache.
 */
var optionsCache = {};
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
var strCodeChart = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * Indicates whether can use Proxy API.
 */
var supportedProxyObject = (typeof Proxy  !== "undefined");
/**
 * Indicates whether can use Symbol API.
 */
var supportedGuardMember = (typeof Symbol !== "undefined");
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
 * Allowed Rejigger input types.
 */
var allowedRejiggerInputs = {
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

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var STATUS_PENDING       = "pending";
var STATUS_RESOLVED      = "resolved";
var STATUS_REJECTED      = "rejected";

var LIFE_CYCLE_INITIAL   = "onInitial";
var LIFE_CYCLE_DISPOSE   = "onDispose";

var PROMISE_STATUS       = GuardMember("Promise.status");           // Promise status.
var PROMISE_RESULT       = GuardMember("Promise.result");           // Promise result.
var PROMISE_HEARER       = GuardMember("Promise.hearer");           // Promise hearer.
var PROMISE_CAUGHT       = GuardMember("Promise.caught");           // Promise caught.
var PROMISE_CANCEL       = GuardMember("Promise.cancel");           // Promise cancel.

var DISPLAY_INSTANCE     = GuardMember("Display.instance");         // Unitary instance.
var DISPLAY_RENDERER     = GuardMember("Display.renderer");         // HTMLElement's renderer.
var DISPLAY_COMPONENT    = GuardMember("Display.component");        // Component's annotation.
var DISPLAY_DIRECTIVE    = GuardMember("Display.directive");        // Directive's annotation.
var DISPLAY_TRANSFORM    = GuardMember("Display.transform");        // Transform's annotation.

var EVENT_CONTACT_TARGET = GuardMember("Event.contactTarget");      // Event target.
var EVENT_CURRENT_TARGET = GuardMember("Event.currentTarget");      // Event currentTarget.
var EVENT_ORIGINAL_EVENT = GuardMember("Event.originalEvent");      // Event originalEvent.
var EVENT_STATUS_TRACKER = GuardMember("Event.statusTracker");      // Event status.

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var REGEXP_DELS = /(?:\/\*[\s\S]*?\*\/|\/\/[\s\S]*?(?:\n|$))/g;
var REGEXP_DEPS = /(?:\b|(\.)\s*)require\s*\(\s*(?:"([^"]+)"|'([^']+)')\s*\)/;

var REGEXP_NAME = /[:A-Za-z0-9][-:\w]*/;
var REGEXP_EACH = /(\S.*)(\s+(?:in|of)\s+)(.*\S)/;
var REGEXP_ATTR = /([^\s"'<>/=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'<>/=]+)))?/;
var REGEXP_WORD = /\S/;
var DIVIDE_PIPE = /\|/;
var DIVIDE_ARGS = /\s/;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Comment renderer.
 */
var CommentRenderer = (function () {
    function CommentRenderer (founder) {
        this.founder = founder;
    }
    CommentRenderer.prototype = {
        constructor : CommentRenderer,
        initial : function (namespace, collect) {
            return MKRealtor(this.product = DOMCreateComment(""), true);
        },
        renewal : function (namespace, collect, updated) {
            return MKRealtor(this.product, false);
        },
        dispose : function () {
            DOMRemoveChild(this.product);
        }
    };
    return CommentRenderer;
} ());
/**
 * Content renderer.
 */
var ContentRenderer = (function () {
    function ContentRenderer (element, founder) {
        this.element = element;
        this.founder = founder;
    }
    ContentRenderer.prototype = {
        constructor : ContentRenderer,
        initial : function (namespace, collect) {
            return MKRealtor(this.product = DOMCreateContent(this.element), true);
        },
        renewal : function (namespace, collect, updated) {
            if (this.element !== updated) {
                this.product.textContent = this.element = updated;
            }
            return MKRealtor(this.product, false);
        },
        dispose : function () {
            DOMRemoveChild(this.product);
        }
    };
    return ContentRenderer;
} ());
/**
 * Complex renderer.
 */
var ComplexRenderer = (function () {
    function ComplexRenderer (element, founder) {
        this.emitter = MKEmitter(this);
        this.element = element;
        this.founder = founder;
        this.connate = false;
    }
    ComplexRenderer.prototype = {
        constructor : ComplexRenderer,
        initial : function (namespace, collect) {
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
        },
        renewal : function (namespace, collect, updated) {
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
        },
        dispose : function () {
            var manager = this;
            var behests = manager.behests;
            var product = manager.product;
            var element = manager.element;

            VMDelDirective(behests, product, element.props);
            VMDelReference(element);
            VMDelLifeCycle(product);
            manager.emitter.dispose();
            manager.draught.dispose();
        },
        trigger : function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (ShouldEventBubbling(event)) {
                this.founder.trigger(event, connate);
            }
        },
        attachEvent   : function (type, listener) {
            this.emitter.intrude (type, listener);
        },
        detachEvent   : function (type, listener) {
            this.emitter.extrude (type, listener);
        },
        dispatchEvent : function (event) {
            this.trigger(event, this.connate);
        }
    };
    return ComplexRenderer;
} ());
/**
 * Element renderer.
 */
var ElementRenderer = (function () {
    function ElementRenderer (element, founder) {
        this.emitter = MKEmitter(this);
        this.element = element;
        this.founder = founder;
        this.connate = true;
    }
    ElementRenderer.prototype = {
        constructor : ElementRenderer,
        initial : function (namespace, collect) {
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
        },
        renewal : function (namespace, collect, updated) {
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
        },
        dispose : function () {
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
        },
        trigger : function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (ShouldEventBubbling(event)) {
                this.founder.trigger(event, connate);
            }
        },
        attachEvent   : function (type, listener) {
            this.emitter.intrude (type, listener);
        },
        detachEvent   : function (type, listener) {
            this.emitter.extrude (type, listener);
        },
        dispatchEvent : function (event) {
            this.trigger(event, this.connate);
        }
    };
    return ElementRenderer;
} ());
/**
 * Liberty renderer.
 */
var LibertyRenderer = (function () {
    function LibertyRenderer (product) {
        this.emitter = MKEmitter(this);
        this.product = product;
        this.connate = true;
    }
    LibertyRenderer.prototype = {
        constructor : LibertyRenderer,

        trigger : function (event, connate) {
            if (this.connate === connate) {
                this.emitter.trigger(event);
            }
            if (ShouldEventBubbling(event)) {
                var founder = MKFounder(this.product);
                if (founder) {
                    founder.trigger(event, connate);
                }
            }
        },
        attachEvent   : function (type, listener) {
            this.emitter.intrude (type, listener);
        },
        detachEvent   : function (type, listener) {
            this.emitter.extrude (type, listener);
        },
        dispatchEvent : function (event) {
            this.trigger(event, this.connate);
        }
    };
    return LibertyRenderer;
} ());
/**
 * SyntheticEvent.
 */
var SyntheticEvent = (function () {
    function SyntheticEvent (event) {
        define(this, EVENT_CONTACT_TARGET, event.target);
        define(this, EVENT_CURRENT_TARGET, event.currentTarget);
        define(this, EVENT_ORIGINAL_EVENT, event[EVENT_ORIGINAL_EVENT] || event);
        define(this, EVENT_STATUS_TRACKER, event[EVENT_STATUS_TRACKER] || {
            defaultPrevented           : !!event.defaultPrevented,
            refreshPrevented           : !!event.refreshPrevented,
            cancelBubble               : !!event.cancelBubble,
            cancelEntire               : !!event.cancelEntire
        });
        for (var name in eventUsefulAttributes) {
            exists(event, name) && (this[name] = event[name]);
        }
    }
    SyntheticEvent.prototype = {
        constructor : SyntheticEvent,
        stopImmediatePropagation : function () {
            this[EVENT_ORIGINAL_EVENT].stopImmediatePropagation();
            this[EVENT_STATUS_TRACKER].cancelEntire = true;
            this[EVENT_STATUS_TRACKER].cancelBubble = true;
        },
        stopPropagation          : function () {
            this[EVENT_ORIGINAL_EVENT].stopPropagation();
            this[EVENT_STATUS_TRACKER].cancelBubble = true;
        },
        preventDefault           : function () {
            if (this[EVENT_ORIGINAL_EVENT].cancelable) {
                this[EVENT_ORIGINAL_EVENT].preventDefault();
                this[EVENT_STATUS_TRACKER].defaultPrevented = true;
            }
        },
        preventRefresh           : function () {
            this[EVENT_STATUS_TRACKER].refreshPrevented = true;
        },
        get type () {
            return this[EVENT_ORIGINAL_EVENT].type;
        },
        get bubbles () {
            return this[EVENT_ORIGINAL_EVENT].bubbles;
        },
        get cancelable () {
            return this[EVENT_ORIGINAL_EVENT].cancelable;
        },
        get cancelBubble () {
            return this[EVENT_STATUS_TRACKER].cancelBubble;
        },
        get cancelEntire () {
            return this[EVENT_STATUS_TRACKER].cancelEntire;
        },
        get defaultPrevented () {
            return this[EVENT_STATUS_TRACKER].defaultPrevented;
        },
        get refreshPrevented () {
            return this[EVENT_STATUS_TRACKER].refreshPrevented;
        },
        get originalEvent () {
            return this[EVENT_ORIGINAL_EVENT];
        },
        get currentTarget () {
            return this[EVENT_CURRENT_TARGET];
        },
        get target () {
            return this[EVENT_CONTACT_TARGET];
        }
    };
    return SyntheticEvent;
} ());
/**
 * Promise.
 */
var Promise = (function () {
    function Promise (executor) {
        define(this, PROMISE_STATUS, STATUS_PENDING);
        define(this, PROMISE_RESULT, void 0);
        define(this, PROMISE_CAUGHT, false);
        define(this, PROMISE_HEARER, []);
        try {
            define(this, PROMISE_CANCEL, executor(
                fixator(this, STATUS_RESOLVED),
                fixator(this, STATUS_REJECTED)
            ));
        } catch (error) {
            resolve(this, STATUS_REJECTED, error);
        }
    }
    Promise.all       = function (array) {
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
    };
    Promise.race      = function (array) {
        return new Promise(function (resolve, reject) {
            if (array.length) {
                array.forEach(function (value) {
                    (isInheritedClass(value, Promise) ? value : Promise.resolve(value)).then(resolve, reject);
                });
            } else {
                resolve();
            }
        });
    };
    Promise.ajax      = function (request) {
        return new Promise(function (resolve, reject) {
            return request.jsonp ? xhrJsonp(request, resolve, reject) : xhrAsync(request, resolve, reject);
        });
    };
    Promise.reject    = function (error) {
        return new Promise(function (_,reject) { reject(error); });
    };
    Promise.resolve   = function (value) {
        return new Promise(function (resolve) { resolve(value); });
    };
    Promise.prototype = {
        constructor : Promise,
        dispose : function () {
            if (this[PROMISE_CANCEL]) {
                this[PROMISE_CANCEL]();
            }
        },
        catch   : function (onrejected) {
            return this.then(null, onrejected);
        },
        then    : function (onresolved, onrejected) {
            var target = this;
            var success = onresolved || accomplish;
            var failure = onrejected || misfortune;
            var product = new Promise(deliver(target));
            switch (target[PROMISE_STATUS]) {
                case STATUS_PENDING:
                    target[PROMISE_HEARER].push(product, success, failure);
                    break;
                case STATUS_RESOLVED:
                    execute(product, target[PROMISE_RESULT], success);
                    break;
                case STATUS_REJECTED:
                    execute(product, target[PROMISE_RESULT], failure);
                    break;
            }
            target[PROMISE_CAUGHT] = true;
            return product;
        },
        get status () {
            return this[PROMISE_STATUS];
        },
        get result () {
            return this[PROMISE_RESULT];
        }
    };
    return Promise;
    function deliver (target) {
        return function () {
            return target[PROMISE_CANCEL];
        };
    }
    function fixator (target, status) {
        return function (result) {
            resolve(target, status, result);
        };
    }
    function resolve (target, status, result) {
        if (target[PROMISE_STATUS] === STATUS_PENDING) {
            if (target === result) {
                status = STATUS_REJECTED;
                result = new Error("Promise resolved with itself");
            }
            if (isInheritedClass(result, Promise)) {
                if (result[PROMISE_STATUS] === STATUS_PENDING) {
                    result.then(
                        fixator(target, STATUS_RESOLVED),
                        fixator(target, STATUS_REJECTED)
                    );
                    return;
                }
                result[PROMISE_CAUGHT]  = true;
                target[PROMISE_STATUS] = result[PROMISE_STATUS];
                target[PROMISE_RESULT] = result[PROMISE_RESULT];
            } else {
                target[PROMISE_STATUS] = status;
                target[PROMISE_RESULT] = result;
            }
            var hearer = target[PROMISE_HEARER];
            var length = hearer.length;
            while (hearer.length) {
                var product = hearer.shift();
                var success = hearer.shift();
                var failure = hearer.shift();
                switch (target[PROMISE_STATUS]) {
                    case STATUS_RESOLVED:
                        execute(product, target[PROMISE_RESULT], success);
                        break;
                    case STATUS_REJECTED:
                        execute(product, target[PROMISE_RESULT], failure);
                        break;
                }
            }
            if (length === 0 && target[PROMISE_STATUS] === STATUS_REJECTED) {
                setTimeout(function () {
                    target[PROMISE_CAUGHT] || wrong(target[PROMISE_RESULT]);
                });
            }
        }
    }
    function execute (target, result, action) {
        try {
            resolve(target, STATUS_RESOLVED, action(result));
        } catch (error) {
            resolve(target, STATUS_REJECTED, error);
        }
    }
    function misfortune (value) {
        return Promise.reject(value);
    }
    function accomplish (value) {
        return value;
    }
    function xhrAsync (request, resolve, reject) {
        var xhrContent = "Content-Type";
        var xhrPattern = "X-Requested-With";
        var xhrFashion = request.method  || "GET";
        var xhrHeaders = request.headers || {};
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.open(xhrFashion.toUpperCase(), request.url, true);
        DOMAddListener(xhrRequest, LOAD, doresolved);
        DOMAddListener(xhrRequest, FAIL, dorejected);
        if (!exists (xhrHeaders, xhrContent)) {
            xhrAffix(xhrRequest, xhrContent, "application/x-www-form-urlencoded; charset=UTF-8");
        }
        if (!exists (xhrHeaders, xhrPattern)) {
            xhrAffix(xhrRequest, xhrPattern, "XMLHttpRequest");
        }
        for (var name in xhrHeaders) {
            xhrAffix(xhrRequest, name, xhrHeaders[name]);
        }
        xhrRequest.send(request.body);
        return function () {
            DOMDelListener(xhrRequest, LOAD, doresolved);
            DOMDelListener(xhrRequest, FAIL, dorejected);
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
    function xhrJsonp (request, resolve, reject) {
        var xhrCallback = "Elf" + (Math.random() * 1E9 | 0);
        var xhrHostNode = DOMCreateElement("script");
        window[xhrCallback] = doresolved;
        DOMAddListener(xhrHostNode, FAIL, dorejected);
        DOMSetProperty(xhrHostNode, TYPE, "text/javascript");
        DOMSetProperty(xhrHostNode, LINK, request.url);
        DOMInsertChild(HEAD, xhrHostNode);
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
    function xhrAffix (request, header, value) {
        request.setRequestHeader(header, value);
    }
} ());

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

Elf.isArray    = isArray;
Elf.isValid    = isValid;
Elf.isBasic    = isBasic;
Elf.isString   = isString;
Elf.isNumber   = isNumber;
Elf.isObject   = isObject;
Elf.isBoolean  = isBoolean;
Elf.isFunction = isFunction;
Elf.startsWith = startsWith;
Elf.Promise    = Promise;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Compiler.
 */
Elf.Compiler = (function () {
    return {
        js   : function (value, modname) {
            return new Function("define",
                LDFormat(value) + "\n//# sourceURL=" + modname)(
                LDDefine(modname)
            ), modulesCache[modname];
        },
        css  : function (value, modname) {
            var text = DOMCreateContent(value);
            var node = DOMCreateElement("style");
            DOMSetProperty(node, TYPE, "text/css");
            DOMInsertChild(node, text);
            DOMInsertChild(HEAD, node);
            return provide(node);
        },
        html : function (value, modname) {
            return provide(Elf.Template.parse(value, modname));
        },
        json : function (value, modname) {
            return provide(objectify(value));
        }
    };
} ());
/**
 * Encoding.
 */
Elf.Encoding = (function () {
    return {
        base64Decode : function (target) {
            var result = [];
            var length = target.length;
            var enc1, enc2, enc3, enc4;
            var num1, num2, num3;
            var i = 0;
            while (i < length) {
                enc1 = strCodeChart.indexOf(target.charAt(i++));
                enc2 = strCodeChart.indexOf(target.charAt(i++));
                enc3 = strCodeChart.indexOf(target.charAt(i++));
                enc4 = strCodeChart.indexOf(target.charAt(i++));
                num1 = (enc1 << 2) | (enc2 >> 4);
                num2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                num3 = ((enc3 & 3) << 6) | enc4;
                result.push(num1);
                if (enc3 !== 64) {
                    result.push(num2);
                }
                if (enc4 !== 64) {
                    result.push(num3);
                }
            }
            return result;
        },
        base64Encode : function (target) {
            var result = "";
            var length = target.length;
            var enc1, enc2, enc3, enc4;
            var num1, num2, num3;
            var i = 0;
            while (i < length) {
                num1 = target[i++];
                num2 = target[i++];
                num3 = target[i++];
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
                result += strCodeChart.charAt(enc1)
                        + strCodeChart.charAt(enc2)
                        + strCodeChart.charAt(enc3)
                        + strCodeChart.charAt(enc4);
            }
            return result;
        },
        htmlDecode : function (target) {
            return CODE.innerHTML = target, CODE.textContent;
        },
        htmlEncode : function (target) {
            return CODE.textContent = target, CODE.innerHTML;
        },
        utf8Decode : function (target) {
            var result = "";
            var length = target.length;
            var code, num1, num2, num3;
            var i = 0;
            while (i < length) {
                num1 = target[i++];
                if (num1 < 128) {
                    code = num1;
                } else if ((num1 > 191) && (num1 < 224)) {
                    num1 = (num1 & 31) << 6;
                    num2 = (target[i++] & 63);
                    code = num1 | num2;
                } else {
                    num1 = (num1 & 15) << 12;
                    num2 = (target[i++] & 63) << 6;
                    num3 = (target[i++] & 63);
                    code = num1 | num2 | num3;
                }
                result += String.fromCharCode(code);
            }
            return result;
        },
        utf8Encode : function (target) {
            var result = [];
            var length = target.length;
            for (var i = 0; i < length; i++) {
                var ns = target.charCodeAt(i);
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
        },
        vlqDecode : function (target) {
            var result = [];
            var length = target.length;
            var offset = 0;
            var amount = 0;
            for (var i = 0; i < length; i++) {
                var ns = strCodeChart.indexOf(target[i]);
                amount = amount + ((ns & 31) << offset);
                if (ns & 32) {
                    offset = offset + 5;
                } else {
                    result.push(amount & 1 ? -(amount >> 1) : (amount >> 1));
                    amount = 0;
                    offset = 0;
                }
            }
            return result;
        },
        vlqEncode : function (target) {
            var result = "";
            var length = target.length;
            for (var i = 0; i < length; i++) {
                var ns = target[i];
                if (ns < 0) {
                    ns = (-ns << 1) | 1;
                } else {
                    ns = ns << 1;
                }
                do {
                    var clamped = ns & 31;
                    if ((ns >>= 5) > 0) {
                        clamped = clamped | 32;
                    }
                    result += strCodeChart.charAt(clamped);
                } while (ns > 0);
            }
            return result;
        }
    };
} ());
/**
 * Template.
 */
Elf.Template = (function () {
    return {
        get sourceMap () {
            return sourceMap;
        },
        set sourceMap (value) {
            return sourceMap = value;
        },
        get eventStart () {
            return eventStart;
        },
        set eventStart (value) {
            return eventStart = value;
        },
        get expression () {
            return expression;
        },
        set expression (value) {
            return expression = value;
        },
        get lineLength () {
            return lineLength;
        },
        set lineLength (value) {
            return lineLength = value;
        },
        parse : function (html, filename) {
            return new Function(parse(html, filename || "<anonymous>.html"));
        }
    };
    function blank (html) {
        return html.search(REGEXP_WORD);
    }
    function shave (html, start) {
        var number = start || 0;
        var length = html.length;
        for (; number < length; number++) {
            if (REGEXP_WORD.test(html.charAt(number))) {
                break;
            }
        }
        return number;
    }
    function rough (html, value, start, fn) {
        var length = html.length;
        var number = html.indexOf(value, start);
        return number < 0
            ? length : fn(number)
            ? number : rough(html, value, number + 1, fn);
    }
    function exact (html, value, start, fn) {
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
                judge(n, value)) {
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
    function judge (html, value) {
        return value.test ? value.test(html) : value === html;
    }
    function acorn (html) {
        var start;
        var ahead = 0;
        var tally = 0;
        var level = 0;
        var queue = [];
        var lines = [];
        var roots = [];
        var length = html.length;
        for (start = 0; start < length;) {
            lines.push([start, start = TPLNewlineIndex(start)]);
        }
        for (start = 0; start < length;) {
            if (TPLCommentStart(start)) {
                TPLCommentParse(start, start = TPLCommentEnded(start));
            } else
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
        return roots[0];
        function TPLCommentStart (start) {
            return startsWith(html, "<!--", start);
        }
        function TPLOccludeStart (start) {
            return startsWith(html, "</"  , start) && REGEXP_NAME.test(html.charAt(start + 2));
        }
        function TPLElementStart (start) {
            return startsWith(html, "<"   , start) && REGEXP_NAME.test(html.charAt(start + 1));
        }
        function TPLCommentEnded (start) {
            return Math.min(length, rough(html, "-->", start + 4, TPLPlain) + 3);
        }
        function TPLOccludeEnded (start) {
            return Math.min(length, rough(html, ">"  , start + 3, TPLPlain) + 1);
        }
        function TPLElementEnded (start) {
            return Math.min(length, exact(html, ">"  , start + 2, TPLPlain) + 1);
        }
        function TPLContentEnded (start) {
            return Math.min(length, rough(html, "<"  , start    , TPLDuple)    );
        }
        function TPLNewlineIndex (start) {
            return Math.min(length, rough(html, "\n" , start    , TPLPlain) + 1);
        }
        function TPLCommentParse (start, ended) {
            console.warn("Comment '" + slit(html, start, ended) + "' will be dispensed");
        }
        function TPLOccludeParse (start, ended) {
            var qname = TPLNameParse(start + 2,
                          slit(html, start + 2, ended - 1));
            if (tally && lower(qname.value) === "pre") {
                tally--;
            }
            if (!exists(htmlElementSolitaries, lower(qname.value))) {
                while  (level) {
                    if (queue[--level].qname.value === qname.value) {
                        break;
                    }
                }
            }
        }
        function TPLElementParse (start, ended) {
            var qname = TPLNameParse(start + 1,
                          slit(html, start + 1, ended - 1));
            var attrs = TPLAttrParse(start + 1 + qname.value.length,
                          slit(html, start + 1 + qname.value.length, ended - 1));
            var depth = !(html.charAt(ended - 2) === "/" || exists(htmlElementSolitaries, lower(qname.value)));
            if (depth && lower(qname.value) === "pre") {
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
                var value = slit(html, start, ended);
                if (tally === 0) {
                    index = blank(value);
                    value = trim(value);
                }
                if (index >= 0) {
                    TPLStore({
                        label : false,
                        level : level,
                        texts : TPLTextParse(start + index, value)
                    });
                }
            }
        }
        function TPLNameParse (start, value) {
            var match = value.match(REGEXP_NAME);
            return TPLTuple(start + match.index, match[0]);
        }
        function TPLAttrParse (start, value) {
            var match;
            var token;
            var texts;
            var index;
            var each;
            var when;
            var rest = [];
            for (;
                match = value.match(REGEXP_ATTR);
                value = slit(value, match.index + match[0].length),
                start = start   +   match.index + match[0].length) {
                token = match[1];
                texts = match[3] || match[4] || match[5] || "";
                index = match.index + token.length
                    + (isString(match[2]) ? match[2].length : 0)
                    + (isString(match[3])
                    || isString(match[4]) ? 1 : 0) + start;
                if (token === "elf-each") {
                    each  = TPLEachParse(index, texts);
                } else
                if (token === "elf-when") {
                    when  = TPLWhenParse(index, texts);
                } else 
                if (isEventAttribute(token)) {
                    rest.push({
                        event : true,
                        token : TPLTuple(start + match.index, token),
                        exprs : TPLTuple(index, texts) 
                    });
                } else {
                    rest.push({
                        event : false,
                        token : TPLTuple(start + match.index, token),
                        texts : TPLTextParse(index, texts)
                    });
                }
            }
            return {
                each : each,
                when : when,
                rest : rest
            };
        }
        function TPLEachParse (start, value) {
            var match = value.match(REGEXP_EACH);
            if (match) {
                return {
                    keys : TPLTuple(start + match.index , match[1]),
                    body : TPLTuple(start + match.index + match[1].length + match[2].length, match[3])
                };
            }
            wrong(new Error("Invalid elf-each expression '" + value + "'"));
        }
        function TPLWhenParse (start, value) {
            var index = blank(value);
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
                        slit(value , number, incept));
                }
                if (incept < finish - prenum) {
                    TPLTrend(start + incept + prenum,
                        slit(value , incept + prenum, finish));
                }
            }
            if (number < length) {
                TPLConst(start + number,
                    slit(value , number, length));
            }
            return texts;
            function TPLConst (start, value) {
                if (value) {
                    texts.push({
                        const : true,
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
                            slit(value , number, number = TPLUprightIndex(number)));
                    } else {
                        TPLPipes(start + number,
                            slit(value , number, number = TPLUprightIndex(number)));
                    }
                }
                if (first) {
                    texts.push({
                        const : false,
                        first : first,
                        pipes : pipes
                    });
                }
                function TPLUprightIndex (start) {
                    return Math.min(length, exact(value, DIVIDE_PIPE, shave(value, start), TPLAlone));
                }
                function TPLFirst (start, value) {
                    var index = blank(value);
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
                                slit(value , number, number = TPLSpacingIndex(number)));
                        } else {
                            TPLFlags(start + number,
                                slit(value , number, number = TPLSpacingIndex(number)));
                        }
                    }
                    if (token) {
                        pipes.push({
                            token : token,
                            flags : flags
                        });
                    }
                    function TPLSpacingIndex (start) {
                        return Math.min(length, exact(value, DIVIDE_ARGS, shave(value, start), TPLPlain));
                    }
                    function TPLToken (start, value) {
                        var index = blank(value);
                        if (index >= 0) {
                            token = TPLTuple(start + index, trim(value));
                        }
                    }
                    function TPLFlags (start, value) {
                        var index = blank(value);
                        if (index >= 0) {
                            flags.push(
                                    TPLTuple(start + index, trim(value))
                            );
                        }
                    }
                }
            }
            function TPLAlone (start) {
                return !DIVIDE_PIPE.test(value.charAt(start + 1))
                    && !DIVIDE_PIPE.test(value.charAt(start - 1));
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
            for ( ; ahead < lines.length; ahead++) {
                if (value > lines[ahead][0] - 1 &&
                    value < lines[ahead][1]) {
                    return {
                        rownum : ahead,
                        colnum : value - lines[ahead][0]
                    };
                }
            }
            return {
                rownum : 0,
                colnum : 0
            };
        }
        function TPLValue (value) {
            return Elf.Encoding.htmlDecode(value);
        }
        function TPLDuple (start) {
            return TPLCommentStart(start)
                || TPLOccludeStart(start)
                || TPLElementStart(start);
        }
        function TPLPlain () {
            return true;
        }
    }
    function parse (html, filename) {
        var rownum = 0;
        var colnum = 0;
        var resume = true;
        var codecs = Elf.Encoding;
        var script = "with(this){return ";
        var number = script.length;
        var totals = number;
        var source = {
            version        : 3,
            sources        : [ filename ],
            sourcesContent : [ html ],
            mappings       : ""
        };
        var result = acorn(html);
        if (result) {
            ASTElementParse(result);
        } else {
            ASTAppendScript("null");
        }
        ASTAppendScript("}");
        if (sourceMap) {
            return script +
                "\n//# sourceMappingURL=data:application/json;base64," +
                codecs.base64Encode(codecs.utf8Encode(stringify(source)));
        } else {
            return script;
        }
        function ASTElementParse (node) {
            if (node.label) {
                if (node.attrs.each) {
                    if (node.level) {
                        ASTIterateParse(node);
                    } else {
                        wrong(new Error("Cannot use elf-each on root node"));
                    }
                } else
                if (node.attrs.when) {
                    ASTTernaryParse(node);
                } else {
                    ASTDefaultParse(node);
                }
            } else {
                ASTContentParse(node);
            }
        }
        function ASTDefaultParse (node) {
            ASTAppendScript("Elf.createElement(Elf.tag(");
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
            ASTAppendScript("Elf.map(");
            ASTAppendSource(node.attrs.each.body);
            ASTAppendScript(node.attrs.each.body.value);
            ASTAppendScript(",function(");
            ASTAppendSource(node.attrs.each.keys);
            ASTAppendScript(node.attrs.each.keys.value);
            ASTAppendScript("){return(");
            //ASTAppendScript("){with(this){return(");
            if (node.attrs.when) {
                ASTTernaryParse(node);
            } else {
                ASTDefaultParse(node);
            }
            ASTAppendScript(")})");
        }
        function ASTTernaryParse (node) {
            ASTAppendScript("((");
            ASTAppendSource(node.attrs.when);
            ASTAppendScript(node.attrs.when.value);
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
            node.attrs.rest.forEach(function (node, numb) {
                ASTAppendScript(numb > 0 ? "," : "");
                ASTAppendScript(stringify(node.token.value));
                ASTAppendScript(":");
                if (node.event) {
                    ASTAppendScript("function($event){");
                    ASTAppendSource(node.exprs);
                    ASTAppendScript(node.exprs.value);
                    ASTAppendScript("}");
                } else
                if (node.texts.length) {
                    if (node.token.value === "cmd") {
                        ASTAppendScript("Elf.cmd(");
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
                if (node.const) {
                    ASTAppendSource(node);
                    ASTAppendScript(stringify(node.value));
                } else {
                    ASTExpressParse(node);
                }
            });
        }
        function ASTExpressParse (node) {
            ASTAppendSource(node.first);
            ASTAppendScript("Elf.fit(");
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
            if (sourceMap) {
                source.mappings += resume ? ";" : ",";
                source.mappings += codecs.vlqEncode([number, 0, value.place.rownum - rownum, value.place.colnum - colnum]);
                rownum = value.place.rownum;
                colnum = value.place.colnum;
                resume = false;
                number = 0;
            }
        }
    }
} ());
/**
 * Object.assign.
 */
Elf.assign = (function () {
    return (Object.assign || (function (target) {
        var insider = slit(arguments, 1);
        for (var i = 0; i < insider.length; i++) {
            for (var key in insider[i]) {
                target[key]=insider[i][key];
            }
        }
        return target;
    })).bind(Object);
} ());

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Set static module.
 * 
 * @param {String} modname 
 * @param {*} value 
 */
Elf.set     = function (modname, value) {
    modulesCache[modname] = provide(value);
};
/**
 * Set loader options.
 * 
 * @param {Elf.Options} options
 * @returns {Elf.Options}
 */
Elf.config  = function (options) {
    optionsCache = options;
};
/**
 * Load a module.
 * 
 * @param {String} modname
 * @returns {Elf.Promise}
 */
Elf.require = function (modname) {
    return LDImport(optionsCache.baseURL || "/")(modname);
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param {Function} callback
 * @param {Number} delay
 * @returns {Elf.Disposable}
 */
Elf.setTimeout = function (callback, delay) {
    return {
        dispose : clearTimeout.bind(window, setTimeout(observe(callback, slit(arguments, 2)), delay))
    };
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param {Function} callback
 * @param {Number} delay
 * @returns {Elf.Disposable}
 */
Elf.setInterval = function (callback, delay) {
    return {
        dispose : clearInterval.bind(window, setInterval(observe(callback, slit(arguments, 2)), delay))
    };
};
/**
 * Wrapped native async function, Let it be tracked.
 * 
 * @param {Function} callback
 * @returns {Elf.Disposable}
 */
Elf.requestAnimationFrame = function (callback) {
    return {
        dispose : cancelAnimationFrame.bind(window, requestAnimationFrame(observe(callback, slit(arguments, 1))))
    };
};
/**
 * Returns a Component class.
 * 
 * @param {String} name
 * @param {T} proto
 * @returns {Elf.Class<Elf.IComponent & T}
 * @template T
 */
Elf.Component = function (name, proto) {
    return define(Elf.createClass(proto), DISPLAY_COMPONENT, name);
};
/**
 * Returns a Directive class.
 * 
 * @param {String} name
 * @param {T} proto
 * @returns {Elf.Class<Elf.IDirective & T}
 * @template T
 */
Elf.Directive = function (name, proto) {
    return define(Elf.createClass(proto), DISPLAY_DIRECTIVE, name);
};
/**
 * Returns a Transform class.
 * 
 * @param {String} name
 * @param {T} proto
 * @returns {Elf.Class<Elf.ITransform & T>}
 * @template T
 */
Elf.Transform = function (name, proto) {
    return define(Elf.createClass(proto), DISPLAY_TRANSFORM, name);
};
/**
 * Returns a new Class value.
 * 
 * @param {*} proto
 * @returns {Function}
 */
Elf.createClass = function (proto) {
    return (function (constructor) {
        return constructor.prototype = proto, constructor;
    } (
        (function (parent) {
            return function () { parent.apply(this, arguments); };
        } (proto.constructor || NOOP))
    ));
};
/**
 * Returns an Event value.
 * 
 * @param {String} type 
 * @param {Boolean} bubbles 
 * @param {*} detail 
 * @returns {Elf.Event}
 */
Elf.createEvent = function (type, bubbles, detail) {
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
 * @param {HTMLElement | JSX.ElementClass} node 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
Elf.attachEvent = function (node, type, listener) {
    MKManager( node ).attachEvent(type, listener);
};
/**
 * Wrapped native event function, Let it be tracked.
 *  
 * @param {HTMLElement | JSX.ElementClass} node 
 * @param {String} type 
 * @param {EventListenerOrEventListenerObject} listener 
 */
Elf.detachEvent = function (node, type, listener) {
    MKManager( node ).detachEvent(type, listener);
};
/**
 * Dispatches an Event at the node.
 * 
 * @param {HTMLElement | JSX.ElementClass} node 
 * @param {Elf.Event} event 
 */
Elf.dispatchEvent = function (node, event) {
    MKManager( node ).dispatchEvent(ModifyContactTarget(event, node));
};
/**
 * Returns a virtual element.
 * 
 * @param {String | Elf.Class<JSX.ElementClass>} type 
 * @param {*} props 
 * @returns {JSX.Element}
 */
Elf.createElement = function (type, props) {
    var feature = props || {};
    var insider = flatten(slit(arguments, 2));
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
    define(element.props, "children", insider);
    Object.freeze(element.props);
    return element;
};
/**
 * Returns a function that create the virtual element.
 * 
 * @param {String} html 
 * @returns {Function}
 */
Elf.redactElement = function (html) {
    var trustor = isFunction(html) ? html : Elf.Template.parse(html);
    var temporaryComponentDepends = {};
    var temporaryDirectiveDepends = {};
    var temporaryTransformDepends = {};
    flatten(slit(arguments, 1)).forEach(function (trustor) {
        if (exists(trustor, DISPLAY_COMPONENT)) {
            define(temporaryComponentDepends, trustor[DISPLAY_COMPONENT], trustor);
        }
        if (exists(trustor, DISPLAY_DIRECTIVE)) {
            define(temporaryDirectiveDepends, trustor[DISPLAY_DIRECTIVE], trustor);
        }
        if (exists(trustor, DISPLAY_TRANSFORM)) {
            define(temporaryTransformDepends, trustor[DISPLAY_TRANSFORM], trustor);
        }
    });
    return function () {
        try {
            temporaryComponentDep.push(temporaryComponentDepends);
            temporaryDirectiveDep.push(temporaryDirectiveDepends);
            temporaryTransformDep.push(temporaryTransformDepends);
            return trustor.call(
                ProxyObject(isValid(this) && this !== window ? this : {})
            );
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
Elf.forceUpdate = function () {
    return broadcast();
};
/**
 * Register global dependency.
 */
Elf.depend = function () {
    flatten(slit(arguments)).forEach(function (trustor) {
        if (exists(trustor, DISPLAY_COMPONENT)) {
            define(communityComponentDep, trustor[DISPLAY_COMPONENT], trustor);
        }
        if (exists(trustor, DISPLAY_DIRECTIVE)) {
            define(communityDirectiveDep, trustor[DISPLAY_DIRECTIVE], trustor);
        }
        if (exists(trustor, DISPLAY_TRANSFORM)) {
            define(communityTransformDep, trustor[DISPLAY_TRANSFORM], trustor);
        }
    });
};
/**
 * Create HTMLElement by virtual element and append to DOM.
 * 
 * @param {JSX.Element} element 
 * @param {HTMLElement} container 
 * @param {Boolean} duplex
 * @returns {Elf.Individual} 
 */
Elf.render = function (element, container, duplex) {
    var monitor;
    var collect = [];
    var manager = new MKManager(container);
    var draught = MKDraught(element, manager);
    var product = {
        forceUpdate : function () {
            manufacture(draught.renewal(null, collect, element));
        },
        dispose : function () {
            monitor.dispose();
            draught.dispose();
        },
        duplex : !!duplex
    };
    manufacture(draught.initial(null, collect));
    supervisory(product);
    return product;
    function supervisory (product) {
        monitor = subscribe(product);
    }
    function manufacture (realtor) {
        if (realtor.newly) {
            while (container.firstChild) {
                DOMRemoveChild(container.firstChild);
            }
            DOMInsertChild(container, realtor.value);
        }
        clean(collect, apply());
    }
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/**
 * Returns a Component class when matched.
 * It is used inside the template engine.
 * 
 * @param {String} value
 * @return {String | JSX.ElementClass} 
 */
Elf.tag = function (value) {
    if (exists(last(temporaryComponentDep), value)) {
        return last(temporaryComponentDep)[ value ];
    }
    if (exists(communityComponentDep, value)) {
        return communityComponentDep[ value ];
    }
    return value;
};
/**
 * Returns a Directive class array when matched.
 * It is used inside the template engine.
 * 
 * @param {String} value
 * @returns {Array<Elf.Class<Elf.IDirective>>} 
 */
Elf.cmd = function (value) {
    return flatten(trim(value).split(/\s+/).map(function (value) {
        if (exists(last(temporaryDirectiveDep), value)) {
            return last(temporaryDirectiveDep)[ value ];
        }
        if (exists(communityDirectiveDep, value)) {
            return communityDirectiveDep[ value ];
        }
        return wrong(new Error("Invalid directive '" + value + "'")), null;
    }));
};
/**
 * Convert the value with Transforms.
 * It is used inside the template engine.
 * 
 * @param {String} value
 * @returns {String} 
 */
Elf.fit = function (value) {
    return pattern(slit(arguments, 1).reduce(function (init, item) {
        if (exists(last(temporaryTransformDep), item[0])) {
            return execute(MKUnitary(last(temporaryTransformDep)[item[0]]), init, item);
        }
        if (exists(communityTransformDep, item[0])) {
            return execute(MKUnitary(communityTransformDep[item[0]]), init, item);
        }
        return wrong(new Error("Invalid transform '" + item[0] + "'")), init;
    }, value));
    function execute (target, init, item) {
        return target.transform.apply(target, [init].concat(slit(item, 1)));
    }
    function pattern (target) {
        return isValid(target) ? String(target) : "";
    }
};
/**
 * Calls a defined callback function on each element of an array (or object), and returns an array that contains the results.
 * It is used inside the template engine.
 * 
 * @param {*} value 
 * @param {Function} callback 
 * @param {*} target 
 * @returns {Array}
 */
Elf.map = function (value, callback, thisArgs) {
    if (isInheritedClass(value, Promise)) {
        value = value.status === STATUS_RESOLVED ? value.result : null;
    }
    if (isArray(value)) {
        return value.map(callback, thisArgs);
    }
    var result = [];
    for (var name in value) {
        result.push(callback.call(thisArgs, value[name], name, value));
    }
    return result;
};

} (this.Elf = {}, window, document, location));