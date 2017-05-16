
import "./login.scss";

import temp = require("./login.html");

export = Elf.Component("login", Elf.redactElement(temp))(

    class implements Elf.IComponent <any> {

        props: any;

        user = {} as User;

        show = false;

        onChange (event: JSX.FormEvent<HTMLInputElement>) {
            this.user.username = event.target.value;
        }

        onSubmit (event: JSX.FormEvent<HTMLButtonElement>) {
            this.show = true;
        }
    }
);

interface User {

    username? : string;
    password? : string;
}