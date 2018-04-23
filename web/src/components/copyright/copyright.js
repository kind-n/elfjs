var Elf = require("elfjs");

module.exports = Elf.Component("copyright", {
    render : Elf.redactElement(require("./copyright.html"))
});