
import Debug = require("../directives/debug");
import Upper = require("../transforms/upper");
import Login = require("./login/login");

Elf.depend(
    Debug, Upper
);

requestAnimationFrame(function () {
    Elf.render(Elf.createElement(Login), document.body, true);
});