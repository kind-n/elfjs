var Elf        = require("elfjs");
var Nav        = require("../../components/navigation/navigation");
var Copyright  = require("../../components/copyright/copyright");

module.exports = Elf.Component("index", {
    render : Elf.redactElement(require("./index.html"), Nav, Copyright)
});