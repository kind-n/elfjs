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

(function (Elf, document, location, JSON) {


function provide (target) {
    return Promise.resolve({ exports : target });
}

function LDDefine (modname) {
    return function () {
        var provide = Array.prototype.slice.call(arguments);
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
function LDImport (dirname) {
    return function (modname) {
        return (modulesCache[modname] || LDLoader(
                    LDActual(modname) || LDLocate(
                        /^\//.test(modname) ? modname :
                        /^\./.test(modname) ? dirname + "/" + modname :
                        (optionsCache.baseURL || "/") + "/" + modname )
        )).then(function (provide) {
            return "exports" in provide ? provide.exports : (provide.exports = LDLaunch(provide));
        });
    };
}
function LDLaunch (provide) {
    var obtain = {};
    var module = { exports : {} };
    if (typeof provide.trustor === "function") {
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
function LDLoader (modname) {
    return modulesCache[modname] || (modulesCache[modname] = Promise.ajax({
        url : LDRouter (modname)
    }).then(function (response) {
        return (Compiler[modname.slice(modname.lastIndexOf(".") + 1).toLowerCase()] || provide)(response.text(), modname);
    }));
}
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
function LDRouter (modname) {
    return optionsCache.routing ? optionsCache.routing(modname) : modname;
}
function LDActual (modname) {
    return optionsCache.mapping && optionsCache.mapping[modname];
}
function LDFinder (modname) {
    return modname.replace(/[^\/]+$/, "");
}
function LDFormat (value) {
    if (optionsCache.module === "commonjs") {
        return "define(" + LDDepend(value.replace(REGEXP_DELS, "")) + ",function(require,exports,module){\n" + value + "\n})";
    }
    return value;
}
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
        value = value.slice(match.index + match[0].length)) {
        token = match[2] || match[3];
        if (token && match[1] !== ".") {
            if (result.indexOf(token) < 0) {
                result.push(token);
            }
        }
    }
    return JSON.stringify(result);
}

var modulesCache = {};
var optionsCache = {};
var Compiler = {
    js   : function (value, modname) {
        return new Function("define",
            LDFormat(value) + "\n//@ sourceURL=" + modname)(
            LDDefine(modname)
        ), modulesCache[modname];
    },
    css  : function (value, modname) {
        var text = document.createTextNode(value);
        var node = document.createElement("style");
        var head = document.querySelector("head");
        node.setAttribute("type", "text/css");
        node.insertBefore(text, null);
        head.insertBefore(node, null);
        return provide(node);
    },
    html : function (value, modname) {
        return provide(Elf.$html_analysis(value, modname));
    },
    json : function (value, modname) {
        return provide(JSON.parse(value));
    }
};

var Promise     = Elf.Promise;
var REGEXP_DELS = /(?:\/\*[\s\S]*?\*\/|\/\/[\s\S]*?(?:\n|$))/g;
var REGEXP_DEPS = /(?:\b|(\.)\s*)require\s*\(\s*(?:"([^"]+)"|'([^']+)')\s*\)/;


Elf.set      = function (modname, value) {
    modulesCache[modname] = provide(value);
};
Elf.config   = function (options) {
    optionsCache = options;
};
Elf.require  = function (modname) {
    return LDImport(optionsCache.baseURL || "/")(modname);
};
Elf.Compiler = Compiler;

} (window.Elf, document, location, JSON));