export = Elf.Transform("upper")(
    class implements Elf.ITransform {

        transform (value) {
            return String(value).toUpperCase();
        }
    }
);