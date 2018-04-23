var Elf        = require("elfjs");
var Nav        = require("../../components/navigation/navigation");
var Copyright  = require("../../components/copyright/copyright");

module.exports = Elf.Component("about", {
    render : Elf.redactElement(require("./about.html"), Nav, Copyright)
});