
var Elf = require("elfjs");
require("elfjs-loader");
require("elfjs-router");

var ROUTES = [
    {
        path : "/index.html",
        component : function () { return Elf.require("/views/index/index"); }
    },
    {
        path : "/about.html",
        component : function () { return Elf.require("/views/about/about"); }
    },
    {
        path : "**",
        component : function () {
            return Elf.createClass({
                render : function () {
                    return "Not Found";
                }
            });
        }
    }
];

Elf.router.register(ROUTES);

module.exports = Elf.render(
    Elf.createElement(Elf.router.RouterView), document.querySelector("section"), true);