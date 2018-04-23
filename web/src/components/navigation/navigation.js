var Elf = require("elfjs");

module.exports = Elf.Component("navigation", {
    render : Elf.redactElement(require("./navigation.html"))
});