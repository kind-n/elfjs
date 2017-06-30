/**
 * dom.d.ts
 * 
 * @copyright http://www.elfjs.org
 * 
 * @version 0.0.12
 * @license MIT
 * 
 */

declare module "*.html" {
    const _: string;
    export = _;
}

declare module "*.sass" {
    const _: any;
    export = _;
}

declare module "*.scss" {
    const _: any;
    export = _;
}

declare module "*.json" {
    const _: any;
    export = _;
}

declare module "*.css" {
    const _: HTMLStyleElement;
    export = _;
}