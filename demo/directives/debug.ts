export = Elf.Directive("debug")(
    class implements Elf.IDirective {

        onInitial (dom) {
            console.log("[Debug directive]: initial.", dom);
        }

        onDispose (dom) {
            console.log("[Debug directive]: dispose.", dom);
        }
    }
);