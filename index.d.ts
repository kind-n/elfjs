// Type definitions for elfjs v2.0
// Project: https://www.elfjs.org/
// Definitions by: Wu Hu <https://github.com/kind-n>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6


export as namespace Elf;

export class Promise<T> implements Disposable {
    static all <R1, R2, R3, R4, R5, R6, R7, R8, R9> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>,
        R5 | Promise<R5>,
        R6 | Promise<R6>,
        R7 | Promise<R7>,
        R8 | Promise<R8>,
        R9 | Promise<R9>
    ]): Promise<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
    static all <R1, R2, R3, R4, R5, R6, R7, R8> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>,
        R5 | Promise<R5>,
        R6 | Promise<R6>,
        R7 | Promise<R7>,
        R8 | Promise<R8>
    ]): Promise<[R1, R2, R3, R4, R5, R6, R7, R8]>;
    static all <R1, R2, R3, R4, R5, R6, R7> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>,
        R5 | Promise<R5>,
        R6 | Promise<R6>,
        R7 | Promise<R7>
    ]): Promise<[R1, R2, R3, R4, R5, R6, R7]>;
    static all <R1, R2, R3, R4, R5, R6> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>,
        R5 | Promise<R5>,
        R6 | Promise<R6>
    ]): Promise<[R1, R2, R3, R4, R5, R6]>;
    static all <R1, R2, R3, R4, R5> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>,
        R5 | Promise<R5>
    ]): Promise<[R1, R2, R3, R4, R5]>;
    static all <R1, R2, R3, R4> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>,
        R4 | Promise<R4>
    ]): Promise<[R1, R2, R3, R4]>;
    static all <R1, R2, R3> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>,
        R3 | Promise<R3>
    ]): Promise<[R1, R2, R3]>;
    static all <R1, R2> (values: [
        R1 | Promise<R1>,
        R2 | Promise<R2>
    ]): Promise<[R1, R2]>;
    static all  <R> (values: R[] | Promise<R>[]): Promise<R[]>;
    static race <R> (values: R[] | Promise<R>[]): Promise<R>;
    static ajax (request: Request): Promise<Response>;
    static reject (error: any): Promise<void>;
    static resolve <R> (value: R): Promise<R>;

    readonly result: any;
    readonly status: "pending" | "resolved" | "rejected";

    constructor (executor: ((resolve: ((value?: T) => void), reject: ((error?: any) => void)) => Function | void));

    then <R1, R2> (onresolved: ((value: T) => R1 | Promise<R1>), onrejected?: ((error: any) => R2 | Promise<R2>)): Promise<R1 | R2>;
    catch <R> (onrejected: (error: any) => R | Promise<R>): Promise<T | R>;
    dispose (): void;
}

export function assign <T1, T2, T3, T4> (source1: T1, source2: T2, source3: T3, source4: T4): T1 & T2 & T3 & T4;
export function assign <T1, T2, T3> (source1: T1, source2: T2, source3: T3): T1 & T2 & T3;
export function assign <T1, T2> (source1: T1, source2: T2): T1 & T2;
export function assign (source: any, ...sources: any[]): any;

export function createClass <T> (proto: T): Class<T>;

export function requestAnimationFrame <T1, T2, T3, T4> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void), arg1: T1, arg2: T2, arg3: T3, arg4: T4): Disposable;
export function requestAnimationFrame <T1, T2, T3> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3) => void), arg1: T1, arg2: T2, arg3: T3): Disposable;
export function requestAnimationFrame <T1, T2> (fn: ((event: Event<any>, arg1: T1, arg2: T2) => void), arg1: T1, arg2: T2): Disposable;
export function requestAnimationFrame <T> (fn: ((event: Event<any>, ...args: T[]) => void), ...args: T[]): Disposable;

export function setInterval <T1, T2, T3, T4> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void), delay: number, arg1: T1, arg2: T2, arg3: T3, arg4: T4): Disposable;
export function setInterval <T1, T2, T3> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3) => void), delay: number, arg1: T1, arg2: T2, arg3: T3): Disposable;
export function setInterval <T1, T2> (fn: ((event: Event<any>, arg1: T1, arg2: T2) => void), delay: number, arg1: T1, arg2: T2): Disposable;
export function setInterval <T> (fn: ((event: Event<any>, ...args: T[]) => void), delay?: number, ...args: T[]): Disposable;

export function setTimeout <T1, T2, T3, T4> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void), delay: number, arg1: T1, arg2: T2, arg3: T3, arg4: T4): Disposable;
export function setTimeout <T1, T2, T3> (fn: ((event: Event<any>, arg1: T1, arg2: T2, arg3: T3) => void), delay: number, arg1: T1, arg2: T2, arg3: T3): Disposable;
export function setTimeout <T1, T2> (fn: ((event: Event<any>, arg1: T1, arg2: T2) => void), delay: number, arg1: T1, arg2: T2): Disposable;
export function setTimeout <T> (fn: ((event: Event<any>, ...args: T[]) => void), delay?: number, ...args: T[]): Disposable;

export function Component <T extends Partial<any>> (name: string, proto: T & IComponent): Class<T & IComponent>;
export function Directive <T extends Partial<any>> (name: string, proto: T & IDirective): Class<T & IDirective>;
export function Transform <T extends Partial<any>> (name: string, proto: T & ITransform): Class<T & ITransform>;

export function createEvent   <T extends IComponent | HTMLElement | Document | Window> (type: string, bubbles?: boolean, detail?: any): Event<T>;
export function attachEvent   <T extends IComponent | HTMLElement | Document | Window> (node: T, type: string, listener: EventListenerOrEventListenerObject<T>): void;
export function detachEvent   <T extends IComponent | HTMLElement | Document | Window> (node: T, type: string, listener: EventListenerOrEventListenerObject<T>): void;
export function dispatchEvent <T extends IComponent | HTMLElement | Document | Window> (node: T, event: Event<T>): void;

export function createElement (type: string | ComponentConstructor, props?: any, ...children: any[]): JSX.Element;
export function redactElement (temp: string | AbstractSyntaxTree, ...depends: (ComponentConstructor | DirectiveConstructor | TransformConstructor)[]): () => JSX.Element;

export function forceUpdate (): boolean;
export function render (element: JSX.Element, container: HTMLElement, duplex?: boolean): Individual;
export function depend (...depends: (ComponentConstructor | DirectiveConstructor | TransformConstructor)[]): void;

interface Request {
    readonly url: string;
    readonly body?: string;
    readonly headers?: any;
    readonly method?: "GET" | "PUT" | "POST" | "HEAD" | "PATCH" | "DELETE" | "OPTIONS";
    readonly jsonp?: boolean;
}
interface Response {
    readonly status: number;
    readonly headers: any;
    text(): string;
    json(): any;
}
interface IComponent extends ILifeCycle {
    readonly props?: any;
    readonly state?: any;
    readonly refs?: any;
    onInitial? (): void;
    onDispose? (): void;
    render (): JSX.Element;
}
interface IDirective extends ILifeCycle {
    onInitial? (product: IComponent | HTMLElement, props: any): void;
    onDispose? (product: IComponent | HTMLElement, props: any): void;
}
interface ITransform {
    transform (...args: any[]): any;
}
interface ILifeCycle {
    onInitial? (...args: any[]): void;
    onDispose? (...args: any[]): void;
}
interface Individual extends Disposable {
    forceUpdate (): void;
}
interface Disposable {
    dispose (): void;
}
interface ComponentConstructor extends Class<IComponent> {

}
interface DirectiveConstructor extends Class<IDirective> {

}
interface TransformConstructor extends Class<ITransform> {

}
interface AbstractSyntaxTree {
    readonly doctype: string;
    readonly filename: string;
    readonly body: AbstractSyntaxElement;
}
interface AbstractSyntaxElement {
    readonly nodeType: number;
    readonly nodeName?: AbstractSyntaxResult;
    readonly children?: AbstractSyntaxElement[];
    readonly segments?: AbstractSyntaxSegment[];
    readonly attributes?: AbstractSyntaxAttribute[];
    readonly condition?: AbstractSyntaxResult;
    readonly iteration?: {
        readonly keys: AbstractSyntaxResult;
        readonly body: AbstractSyntaxResult;
    }
}
interface AbstractSyntaxSegment {
    readonly computed: boolean;
    readonly input: AbstractSyntaxResult;
    readonly pipes?: AbstractSyntaxPiping[];
}
interface AbstractSyntaxAttribute {
    readonly incident: boolean;
    readonly name: AbstractSyntaxResult;
    readonly delegate?: AbstractSyntaxResult;
    readonly segments?: AbstractSyntaxSegment[];
}
interface AbstractSyntaxPiping {
    readonly name: AbstractSyntaxResult;
    readonly arguments: AbstractSyntaxResult[];
}
interface AbstractSyntaxResult {
    readonly raw: string;
    readonly loc: {
        readonly rownum: number;
        readonly colnum: number;
    };
}
interface Class<T> {
    new (...args: any[]): T;
}
interface Event<T> {
    readonly type: string;
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    readonly cancelBubble: boolean;
    readonly cancelEntire: boolean;
    readonly defaultPrevented: boolean;
    readonly refershPrevented: boolean;
    readonly currentTarget: T;
    readonly target: EventTarget;
    readonly detail: any;
    stopImmediatePropagation (): void;
    stopPropagation (): void;
    preventDefault (): void;
    preventRefresh (): void;
}
interface EventListener<T> {
    (this: T, event: Event<T>): void;
}
interface EventListenerObject<T> {
    handleEvent (event: Event<T>): void;
}
type EventListenerOrEventListenerObject<T> = EventListener<T> | EventListenerObject<T>;


declare global {
    namespace JSX {
        interface Props {
            cmd?: any[];
            key?: string;
            ref?: string;
        }
        interface Element {
            readonly cmd: any[];
            readonly key: string;
            readonly ref: string;
            readonly type: string | ComponentConstructor;
            readonly owner: IComponent;
            readonly props: any;
        }
        interface ElementClass extends IComponent { }
        interface ElementAttributesProperty { props: {} }
        interface IntrinsicAttributes      extends Props { }
        interface IntrinsicClassAttributes extends Props { }

        interface IntrinsicElements {
            // HTML Element
            a                          : DOMProps<HTMLAnchorElement>;
            abbr                       : DOMProps<HTMLElement>;
            acronym                    : DOMProps<HTMLElement>;
            address                    : DOMProps<HTMLElement>;
            applet                     : DOMProps<HTMLAppletElement>;
            area                       : DOMProps<HTMLAreaElement>;
            article                    : DOMProps<HTMLElement>;
            aside                      : DOMProps<HTMLElement>;
            audio                      : DOMProps<HTMLAudioElement>;
            b                          : DOMProps<HTMLElement>;
            base                       : DOMProps<HTMLBaseElement>;
            basefont                   : DOMProps<HTMLBaseFontElement>;
            bdi                        : DOMProps<HTMLElement>;
            bdo                        : DOMProps<HTMLElement>;
            bgsound                    : DOMProps<HTMLElement>;
            big                        : DOMProps<HTMLElement>;
            blink                      : DOMProps<HTMLElement>;
            blockquote                 : DOMProps<HTMLElement>;
            body                       : DOMProps<HTMLBodyElement>;
            br                         : DOMProps<HTMLBRElement>;
            button                     : DOMProps<HTMLButtonElement>;
            canvas                     : DOMProps<HTMLCanvasElement>;
            caption                    : DOMProps<HTMLElement>;
            center                     : DOMProps<HTMLElement>;
            cite                       : DOMProps<HTMLElement>;
            code                       : DOMProps<HTMLElement>;
            col                        : DOMProps<HTMLTableColElement>;
            colgroup                   : DOMProps<HTMLTableColElement>;
            content                    : DOMProps<HTMLElement>;
            data                       : DOMProps<HTMLElement>;
            datalist                   : DOMProps<HTMLDataListElement>;
            dd                         : DOMProps<HTMLElement>;
            del                        : DOMProps<HTMLElement>;
            details                    : DOMProps<HTMLElement>;
            dfn                        : DOMProps<HTMLElement>;
            dir                        : DOMProps<HTMLElement>;
            div                        : DOMProps<HTMLDivElement>;
            dl                         : DOMProps<HTMLDListElement>;
            dt                         : DOMProps<HTMLElement>;
            em                         : DOMProps<HTMLElement>;
            embed                      : DOMProps<HTMLEmbedElement>;
            fieldset                   : DOMProps<HTMLFieldSetElement>;
            figcaption                 : DOMProps<HTMLElement>;
            figure                     : DOMProps<HTMLElement>;
            font                       : DOMProps<HTMLFontElement>;
            footer                     : DOMProps<HTMLElement>;
            form                       : DOMProps<HTMLFormElement>;
            frame                      : DOMProps<HTMLFrameElement>;
            frameset                   : DOMProps<HTMLElement>;
            h1                         : DOMProps<HTMLHeadingElement>;
            h2                         : DOMProps<HTMLHeadingElement>;
            h3                         : DOMProps<HTMLHeadingElement>;
            h4                         : DOMProps<HTMLHeadingElement>;
            h5                         : DOMProps<HTMLHeadingElement>;
            h6                         : DOMProps<HTMLHeadingElement>;
            head                       : DOMProps<HTMLHeadElement>;
            header                     : DOMProps<HTMLElement>;
            hgroup                     : DOMProps<HTMLElement>;
            hr                         : DOMProps<HTMLHRElement>;
            html                       : DOMProps<HTMLHtmlElement>;
            i                          : DOMProps<HTMLElement>;
            iframe                     : DOMProps<HTMLIFrameElement>;
            img                        : DOMProps<HTMLImageElement>;
            input                      : DOMProps<HTMLInputElement>;
            ins                        : DOMProps<HTMLModElement>;
            isindex                    : DOMProps<HTMLElement>;
            kbd                        : DOMProps<HTMLElement>;
            keygen                     : DOMProps<HTMLElement>;
            label                      : DOMProps<HTMLLabelElement>;
            legend                     : DOMProps<HTMLLegendElement>;
            li                         : DOMProps<HTMLLIElement>;
            link                       : DOMProps<HTMLLinkElement>;
            listing                    : DOMProps<HTMLElement>;
            main                       : DOMProps<HTMLElement>;
            map                        : DOMProps<HTMLMapElement>;
            mark                       : DOMProps<HTMLElement>;
            marquee                    : DOMProps<HTMLMarqueeElement>;
            menu                       : DOMProps<HTMLElement>;
            menuitem                   : DOMProps<HTMLElement>;
            meta                       : DOMProps<HTMLMetaElement>;
            meter                      : DOMProps<HTMLElement>;
            nav                        : DOMProps<HTMLElement>;
            nobr                       : DOMProps<HTMLElement>;
            noframes                   : DOMProps<HTMLElement>;
            noscript                   : DOMProps<HTMLElement>;
            object                     : DOMProps<HTMLObjectElement>;
            ol                         : DOMProps<HTMLOListElement>;
            optgroup                   : DOMProps<HTMLOptGroupElement>;
            option                     : DOMProps<HTMLOptionElement>;
            output                     : DOMProps<HTMLElement>;
            p                          : DOMProps<HTMLParagraphElement>;
            param                      : DOMProps<HTMLParamElement>;
            plaintext                  : DOMProps<HTMLElement>;
            pre                        : DOMProps<HTMLPreElement>;
            progress                   : DOMProps<HTMLProgressElement>;
            q                          : DOMProps<HTMLQuoteElement>;
            rp                         : DOMProps<HTMLElement>;
            rt                         : DOMProps<HTMLElement>;
            ruby                       : DOMProps<HTMLElement>;
            s                          : DOMProps<HTMLElement>;
            samp                       : DOMProps<HTMLElement>;
            script                     : DOMProps<HTMLScriptElement>;
            section                    : DOMProps<HTMLElement>;
            select                     : DOMProps<HTMLSelectElement>;
            shadow                     : DOMProps<HTMLElement>;
            small                      : DOMProps<HTMLElement>;
            source                     : DOMProps<HTMLSourceElement>;
            spacer                     : DOMProps<HTMLElement>;
            span                       : DOMProps<HTMLSpanElement>;
            strike                     : DOMProps<HTMLElement>;
            strong                     : DOMProps<HTMLElement>;
            style                      : DOMProps<HTMLStyleElement>;
            sub                        : DOMProps<HTMLElement>;
            summary                    : DOMProps<HTMLElement>;
            sup                        : DOMProps<HTMLElement>;
            table                      : DOMProps<HTMLTableElement>;
            tbody                      : DOMProps<HTMLTableSectionElement>;
            td                         : DOMProps<HTMLTableDataCellElement>;
            template                   : DOMProps<HTMLTemplateElement>;
            textarea                   : DOMProps<HTMLTextAreaElement>;
            tfoot                      : DOMProps<HTMLTableSectionElement>;
            th                         : DOMProps<HTMLTableHeaderCellElement>;
            thead                      : DOMProps<HTMLTableSectionElement>;
            time                       : DOMProps<HTMLElement>;
            title                      : DOMProps<HTMLTitleElement>;
            tr                         : DOMProps<HTMLTableRowElement>;
            track                      : DOMProps<HTMLTrackElement>;
            tt                         : DOMProps<HTMLElement>;
            u                          : DOMProps<HTMLElement>;
            ul                         : DOMProps<HTMLUListElement>;
            var                        : DOMProps<HTMLElement>;
            video                      : DOMProps<HTMLVideoElement>;
            wbr                        : DOMProps<HTMLElement>;
            xmp                        : DOMProps<HTMLElement>;
    
            // SVG Element
            altGlyph                   : SVGProps;
            altGlyphDef                : SVGProps;
            altGlyphItem               : SVGProps;
            animate                    : SVGProps;
            animateColor               : SVGProps;
            animateMotion              : SVGProps;
            animateTransform           : SVGProps;
            circle                     : SVGProps;
            clipPath                   : SVGProps;
            colorProfile               : SVGProps;
            cursor                     : SVGProps;
            defs                       : SVGProps;
            desc                       : SVGProps;
            ellipse                    : SVGProps;
            feBlend                    : SVGProps;
            feColorMatrix              : SVGProps;
            feComponentTransfer        : SVGProps;
            feComposite                : SVGProps;
            feConvolveMatrix           : SVGProps;
            feDiffuseLighting          : SVGProps;
            feDisplacementMap          : SVGProps;
            feDistantLight             : SVGProps;
            feFlood                    : SVGProps;
            feFuncA                    : SVGProps;
            feFuncB                    : SVGProps;
            feFuncG                    : SVGProps;
            feFuncR                    : SVGProps;
            feGaussianBlur             : SVGProps;
            feImage                    : SVGProps;
            feMerge                    : SVGProps;
            feMergeNode                : SVGProps;
            feMorphology               : SVGProps;
            feOffset                   : SVGProps;
            fePointLight               : SVGProps;
            feSpecularLighting         : SVGProps;
            feSpotLight                : SVGProps;
            feTile                     : SVGProps;
            feTurbulence               : SVGProps;
            filter                     : SVGProps;
            fontFace                   : SVGProps;
            fontFaceFormat             : SVGProps;
            fontFaceName               : SVGProps;
            fontFaceSrc                : SVGProps;
            fontFaceUri                : SVGProps;
            foreignObject              : SVGProps;
            g                          : SVGProps;
            glyph                      : SVGProps;
            glyphRef                   : SVGProps;
            hkern                      : SVGProps;
            image                      : SVGProps;
            line                       : SVGProps;
            linearGradient             : SVGProps;
            marker                     : SVGProps;
            mask                       : SVGProps;
            metadata                   : SVGProps;
            missingGlyph               : SVGProps;
            mpath                      : SVGProps;
            path                       : SVGProps;
            pattern                    : SVGProps;
            polygon                    : SVGProps;
            polyline                   : SVGProps;
            radialGradient             : SVGProps;
            rect                       : SVGProps;
            set                        : SVGProps;
            stop                       : SVGProps;
            svg                        : SVGProps;
            switch                     : SVGProps;
            symbol                     : SVGProps;
            text                       : SVGProps;
            textPath                   : SVGProps;
            tref                       : SVGProps;
            tspan                      : SVGProps;
            use                        : SVGProps;
            view                       : SVGProps;
            vkern                      : SVGProps;
    
            // MathML Element
            math                       : MathMLProps;
            maction                    : MathMLProps;
            maligngroup                : MathMLProps;
            malignmark                 : MathMLProps;
            menclose                   : MathMLProps;
            merror                     : MathMLProps;
            mfenced                    : MathMLProps;
            mfrac                      : MathMLProps;
            mglyph                     : MathMLProps;
            mi                         : MathMLProps;
            mlabeledtr                 : MathMLProps;
            mlongdiv                   : MathMLProps;
            mmultiscripts              : MathMLProps;
            mn                         : MathMLProps;
            mo                         : MathMLProps;
            mover                      : MathMLProps;
            mpadded                    : MathMLProps;
            mphantom                   : MathMLProps;
            mroot                      : MathMLProps;
            mrow                       : MathMLProps;
            ms                         : MathMLProps;
            mscarries                  : MathMLProps;
            mscarry                    : MathMLProps;
            msgroup                    : MathMLProps;
            mstack                     : MathMLProps;
            msline                     : MathMLProps;
            mspace                     : MathMLProps;
            msqrt                      : MathMLProps;
            msrow                      : MathMLProps;
            mstyle                     : MathMLProps;
            msub                       : MathMLProps;
            msup                       : MathMLProps;
            msubsup                    : MathMLProps;
            mtable                     : MathMLProps;
            mtd                        : MathMLProps;
            mtext                      : MathMLProps;
            mtr                        : MathMLProps;
            munder                     : MathMLProps;
            munderover                 : MathMLProps;
            semantics                  : MathMLProps;
            annotation                 : MathMLProps;
            annotationXml              : MathMLProps;
        }
    
        export interface CSSProps {
            alignContent?              : any;
            alignItems?                : any;
            alignSelf?                 : any;
            alignmentAdjust?           : any;
            alignmentBaseline?         : any;
            animationDelay?            : any;
            animationDirection?        : any;
            animationIterationCount?   : any;
            animationName?             : any;
            animationPlayState?        : any;
            appearance?                : any;
            backfaceVisibility?        : any;
            background?                : any;
            backgroundAttachment?      : "scroll" | "fixed" | "local";
            backgroundBlendMode?       : any;
            backgroundColor?           : any;
            backgroundComposite?       : any;
            backgroundImage?           : any;
            backgroundOrigin?          : any;
            backgroundPosition?        : any;
            backgroundRepeat?          : any;
            baselineShift?             : any;
            behavior?                  : any;
            border?                    : any;
            borderBottom?              : any;
            borderBottomColor?         : any;
            borderBottomLeftRadius?    : any;
            borderBottomRightRadius?   : any;
            borderBottomStyle?         : any;
            borderBottomWidth?         : any;
            borderCollapse?            : any;
            borderColor?               : any;
            borderCornerShape?         : any;
            borderImageSource?         : any;
            borderImageWidth?          : any;
            borderLeft?                : any;
            borderLeftColor?           : any;
            borderLeftStyle?           : any;
            borderLeftWidth?           : any;
            borderRight?               : any;
            borderRightColor?          : any;
            borderRightStyle?          : any;
            borderRightWidth?          : any;
            borderSpacing?             : any;
            borderStyle?               : any;
            borderTop?                 : any;
            borderTopColor?            : any;
            borderTopLeftRadius?       : any;
            borderTopRightRadius?      : any;
            borderTopStyle?            : any;
            borderTopWidth?            : any;
            borderWidth?               : any;
            bottom?                    : any;
            boxAlign?                  : any;
            boxDecorationBreak?        : any;
            boxDirection?              : any;
            boxLineProgression?        : any;
            boxLines?                  : any;
            boxOrdinalGroup?           : any;
            boxFlex?                   : number;
            boxFlexGroup?              : number;
            breakAfter?                : any;
            breakBefore?               : any;
            breakInside?               : any;
            clear?                     : any;
            clip?                      : any;
            clipRule?                  : any;
            color?                     : any;
            columnCount?               : number;
            columnFill?                : any;
            columnGap?                 : any;
            columnRule?                : any;
            columnRuleColor?           : any;
            columnRuleWidth?           : any;
            columnSpan?                : any;
            columnWidth?               : any;
            columns?                   : any;
            counterIncrement?          : any;
            counterReset?              : any;
            cue?                       : any;
            cueAfter?                  : any;
            cursor?                    : any;
            direction?                 : any;
            display?                   : any;
            fill?                      : any;
            fillOpacity?               : number;
            fillRule?                  : any;
            filter?                    : any;
            flex?                      : number | string;
            flexAlign?                 : any;
            flexBasis?                 : any;
            flexDirection?             : any;
            flexFlow?                  : any;
            flexGrow?                  : number;
            flexItemAlign?             : any;
            flexLinePack?              : any;
            flexOrder?                 : any;
            flexShrink?                : number;
            float?                     : any;
            flowFrom?                  : any;
            font?                      : any;
            fontFamily?                : any;
            fontKerning?               : any;
            fontSize?                  : number | string;
            fontSizeAdjust?            : any;
            fontStretch?               : any;
            fontStyle?                 : any;
            fontSynthesis?             : any;
            fontVariant?               : any;
            fontVariantAlternates?     : any;
            fontWeight?                : "normal" | "bold" | "lighter" | "bolder" | number;
            gridArea?                  : any;
            gridColumn?                : any;
            gridColumnEnd?             : any;
            gridColumnStart?           : any;
            gridRow?                   : any;
            gridRowEnd?                : any;
            gridRowPosition?           : any;
            gridRowSpan?               : any;
            gridTemplateAreas?         : any;
            gridTemplateColumns?       : any;
            gridTemplateRows?          : any;
            height?                    : any;
            hyphenateLimitChars?       : any;
            hyphenateLimitLines?       : any;
            hyphenateLimitZone?        : any;
            hyphens?                   : any;
            imeMode?                   : any;
            layoutGrid?                : any;
            layoutGridChar?            : any;
            layoutGridLine?            : any;
            layoutGridMode?            : any;
            layoutGridType?            : any;
            left?                      : any;
            letterSpacing?             : any;
            lineBreak?                 : any;
            lineClamp?                 : number;
            lineHeight?                : number | string;
            listStyle?                 : any;
            listStyleImage?            : any;
            listStylePosition?         : any;
            listStyleType?             : any;
            margin?                    : any;
            marginBottom?              : any;
            marginLeft?                : any;
            marginRight?               : any;
            marginTop?                 : any;
            marqueeDirection?          : any;
            marqueeStyle?              : any;
            mask?                      : any;
            maskBorder?                : any;
            maskBorderRepeat?          : any;
            maskBorderSlice?           : any;
            maskBorderSource?          : any;
            maskBorderWidth?           : any;
            maskClip?                  : any;
            maskOrigin?                : any;
            maxFontSize?               : any;
            maxHeight?                 : any;
            maxWidth?                  : any;
            minHeight?                 : any;
            minWidth?                  : any;
            opacity?                   : number;
            order?                     : number;
            orphans?                   : number;
            outline?                   : any;
            outlineColor?              : any;
            outlineOffset?             : any;
            overflow?                  : any;
            overflowStyle?             : any;
            overflowX?                 : any;
            overflowY?                 : any;
            padding?                   : any;
            paddingBottom?             : any;
            paddingLeft?               : any;
            paddingRight?              : any;
            paddingTop?                : any;
            pageBreakAfter?            : any;
            pageBreakBefore?           : any;
            pageBreakInside?           : any;
            pause?                     : any;
            pauseAfter?                : any;
            pauseBefore?               : any;
            perspective?               : any;
            perspectiveOrigin?         : any;
            pointerEvents?             : any;
            position?                  : any;
            punctuationTrim?           : any;
            quotes?                    : any;
            regionFragment?            : any;
            restAfter?                 : any;
            restBefore?                : any;
            right?                     : any;
            rubyAlign?                 : any;
            rubyPosition?              : any;
            shapeImageThreshold?       : any;
            shapeInside?               : any;
            shapeMargin?               : any;
            shapeOutside?              : any;
            speak?                     : any;
            speakAs?                   : any;
            strokeOpacity?             : number;
            strokeWidth?               : number;
            tabSize?                   : any;
            tableLayout?               : any;
            textAlign?                 : any;
            textAlignLast?             : any;
            textDecoration?            : any;
            textDecorationColor?       : any;
            textDecorationLine?        : any;
            textDecorationLineThrough? : any;
            textDecorationNone?        : any;
            textDecorationOverline?    : any;
            textDecorationSkip?        : any;
            textDecorationStyle?       : any;
            textDecorationUnderline?   : any;
            textEmphasis?              : any;
            textEmphasisColor?         : any;
            textEmphasisStyle?         : any;
            textHeight?                : any;
            textIndent?                : any;
            textJustifyTrim?           : any;
            textKashidaSpace?          : any;
            textLineThrough?           : any;
            textLineThroughColor?      : any;
            textLineThroughMode?       : any;
            textLineThroughStyle?      : any;
            textLineThroughWidth?      : any;
            textOverflow?              : any;
            textOverline?              : any;
            textOverlineColor?         : any;
            textOverlineMode?          : any;
            textOverlineStyle?         : any;
            textOverlineWidth?         : any;
            textRendering?             : any;
            textScript?                : any;
            textShadow?                : any;
            textTransform?             : any;
            textUnderlinePosition?     : any;
            textUnderlineStyle?        : any;
            top?                       : any;
            touchAction?               : any;
            transform?                 : any;
            transformOrigin?           : any;
            transformOriginZ?          : any;
            transformStyle?            : any;
            transition?                : any;
            transitionDelay?           : any;
            transitionDuration?        : any;
            transitionProperty?        : any;
            transitionTimingFunction?  : any;
            unicodeBidi?               : any;
            unicodeRange?              : any;
            userFocus?                 : any;
            userInput?                 : any;
            verticalAlign?             : any;
            visibility?                : any;
            voiceBalance?              : any;
            voiceDuration?             : any;
            voiceFamily?               : any;
            voicePitch?                : any;
            voiceRange?                : any;
            voiceRate?                 : any;
            voiceStress?               : any;
            voiceVolume?               : any;
            whiteSpace?                : any;
            whiteSpaceTreatment?       : any;
            widows?                    : number;
            width?                     : any;
            wordBreak?                 : any;
            wordSpacing?               : any;
            wordWrap?                  : any;
            wrapFlow?                  : any;
            wrapMargin?                : any;
            wrapOption?                : any;
            writingMode?               : any;
            zIndex?                    : "auto" | number;
            zoom?                      : "auto" | number;
            [key: string]              : any;
        }
    
        export interface SVGProps {
            clipPath?                  : string;
            cx?                        : number | string;
            cy?                        : number | string;
            d?                         : string;
            dx?                        : number | string;
            dy?                        : number | string;
            fill?                      : string;
            fillOpacity?               : number | string;
            fontFamily?                : string;
            fontSize?                  : number | string;
            fx?                        : number | string;
            fy?                        : number | string;
            gradientTransform?         : string;
            gradientUnits?             : string;
            markerEnd?                 : string;
            markerMid?                 : string;
            markerStart?               : string;
            offset?                    : number | string;
            opacity?                   : number | string;
            patternContentUnits?       : string;
            patternUnits?              : string;
            points?                    : string;
            preserveAspectRatio?       : string;
            r?                         : number | string;
            rx?                        : number | string;
            ry?                        : number | string;
            spreadMethod?              : string;
            stopColor?                 : string;
            stopOpacity?               : number | string;
            stroke?                    : string;
            strokeDasharray?           : string;
            strokeLinecap?             : string;
            strokeMiterlimit?          : string;
            strokeOpacity?             : number | string;
            strokeWidth?               : number | string;
            textAnchor?                : string;
            transform?                 : string;
            version?                   : string;
            viewBox?                   : string;
            x1?                        : number | string;
            x2?                        : number | string;
            x?                         : number | string;
            xlinkActuate?              : string;
            xlinkArcrole?              : string;
            xlinkHref?                 : string;
            xlinkRole?                 : string;
            xlinkShow?                 : string;
            xlinkTitle?                : string;
            xlinkType?                 : string;
            xmlBase?                   : string;
            xmlLang?                   : string;
            xmlSpace?                  : string;
            y1?                        : number | string;
            y2?                        : number | string;
            y?                         : number | string;
            [key: string]              : any;
        }
    
        export interface MathMLProps {
            accent?                    : any;
            accentunder?               : any;
            actiontype?                : any;
            align?                     : any;
            alignmentscope?            : any;
            altimg?                    : any;
            altimgWidth?               : any;
            altimgHeight?              : any;
            altimgValign?              : any;
            alttext?                   : any;
            bevelled?                  : any;
            charalign?                 : any;
            close?                     : any;
            columnalign?               : any;
            columnlines?               : any;
            columnspacing?             : any;
            columnspan?                : any;
            columnwidth?               : any;
            crossout?                  : any;
            decimalpoint?              : any;
            denomalign?                : any;
            depth?                     : any;
            dir?                       : any;
            display?                   : any;
            displaystyle?              : any;
            edge?                      : any;
            equalcolumns?              : any;
            equalrows?                 : any;
            fence?                     : any;
            form?                      : any;
            frame?                     : any;
            framespacing?              : any;
            groupalign?                : any;
            height?                    : any;
            href?                      : any;
            id?                        : any;
            indentalign?               : any;
            indentalignfirst?          : any;
            indentalignlast?           : any;
            indentshift?               : any;
            indentshiftfirst?          : any;
            indentshiftlast?           : any;
            indenttarget?              : any;
            infixlinebreakstyle?       : any;
            largeop?                   : any;
            length?                    : any;
            linebreak?                 : any;
            linebreakmultchar?         : any;
            linebreakstyle?            : any;
            lineleading?               : any;
            linethickness?             : any;
            location?                  : any;
            longdivstyle?              : any;
            lspace?                    : any;
            lquote?                    : any;
            mathbackground?            : any;
            mathcolor?                 : any;
            mathsize?                  : any;
            mathvariant?               : any;
            maxsize?                   : any;
            minlabelspacing?           : any;
            minsize?                   : any;
            movablelimits?             : any;
            notation?                  : any;
            numalign?                  : any;
            open?                      : any;
            overflow?                  : any;
            position?                  : any;
            rowalign?                  : any;
            rowlines?                  : any;
            rowspacing?                : any;
            rowspan?                   : any;
            rspace?                    : any;
            rquote?                    : any;
            scriptlevel?               : any;
            scriptminsize?             : any;
            scriptsizemultiplier?      : any;
            selection?                 : any;
            separator?                 : any;
            separators?                : any;
            shift?                     : any;
            side?                      : any;
            src?                       : any;
            stackalign?                : any;
            stretchy?                  : any;
            subscriptshift?            : any;
            supscriptshift?            : any;
            symmetric?                 : any;
            voffset?                   : any;
            width?                     : any;
            xlinkHref?                 : any;
            xmlns?                     : any;
            [key: string]              : any;
        }
        interface DOMProps<T> extends DOMEvent<T>, Props {
            accept?                    : string;
            acceptCharset?             : string;
            accesskey?                 : string;
            action?                    : string;
            allowFullScreen?           : boolean;
            allowTransparency?         : boolean;
            align?                     : string;
            alt?                       : string;
            async?                     : boolean;
            autocomplete?              : "on" | "off";
            autofocus?                 : boolean;
            autoplay?                  : boolean;
            autosave?                  : boolean;
            bgcolor?                   : string;
            border?                    : string;
            capture?                   : boolean;
            cellpadding?               : number | string;
            cellspacing?               : number | string;
            challenge?                 : string;
            charset?                   : string;
            checked?                   : boolean;
            cite?                      : string;
            classid?                   : string;
            className?                 : string | object;
            code?                      : string;
            codebase?                  : string;
            color?                     : string;
            cols?                      : number;
            colspan?                   : number;
            content?                   : string;
            contenteditable?           : boolean;
            contextmenu?               : string;
            controls?                  : boolean;
            coords?                    : string;
            crossorigin?               : "anonymous" | "use-credentials";
            data?                      : string;
            datetime?                  : string;
            default?                   : boolean;
            defer?                     : boolean;
            dir?                       : string;
            dirname?                   : string;
            disabled?                  : boolean;
            download?                  : any;
            draggable?                 : boolean;
            dropzone?                  : boolean;
            enctype?                   : string;
            form?                      : string;
            formaction?                : string;
            headers?                   : string;
            height?                    : string | 0;
            hidden?                    : boolean;
            high?                      : number;
            href?                      : string;
            hreflang?                  : string;
            htmlFor?                   : string;
            httpEquiv?                 : string;
            icon?                      : string;
            id?                        : string;
            isMap?                     : boolean;
            itemprop?                  : string;
            keytype?                   : string;
            kind?                      : string;
            label?                     : string;
            lang?                      : string;
            language?                  : string;
            list?                      : string;
            loop?                      : boolean;
            low?                       : number;
            manifest?                  : string;
            max?                       : string | number;
            maxlength?                 : number;
            media?                     : string;
            method?                    : string;
            min?                       : string | number;
            multiple?                  : boolean;
            muted?                     : boolean;
            name?                      : string;
            novalidate?                : boolean;
            open?                      : boolean;
            optimum?                   : number;
            pattern?                   : string;
            ping?                      : string;
            placeholder?               : string;
            poster?                    : string;
            preload?                   : string;
            radiogroup?                : string;
            readonly?                  : boolean;
            rel?                       : string;
            required?                  : boolean;
            reversed?                  : boolean;
            rows?                      : number;
            rowspan?                   : number;
            sandbox?                   : string;
            scope?                     : string;
            scoped?                    : string;
            seamless?                  : boolean;
            selected?                  : boolean;
            shape?                     : string;
            size?                      : number;
            sizes?                     : string;
            span?                      : number;
            spellcheck?                : boolean;
            src?                       : string;
            srcdoc?                    : string;
            srclang?                   : string;
            srcset?                    : string;
            start?                     : number;
            step?                      : string | number;
            style?                     : string | CSSProps;
            summary?                   : string;
            tabindex?                  : number;
            target?                    : string;
            title?                     : string;
            type?                      : string;
            usemap?                    : string;
            value?                     : string | number;
            width?                     : string | number;
            wrap?                      : string;
            [key: string]              : any;
        }
        interface DOMEvent<T> {
            
            // Composition Events
            onCompositionEnd?          : Listener<CompositionEvent<T>>;
            onCompositionStart?        : Listener<CompositionEvent<T>>;
            onCompositionUpdate?       : Listener<CompositionEvent<T>>;
    
            // Transition Events
            onTransitionEnd?           : Listener<TransitionEvent<T>>;
    
            // Animation Events
            onAnimationStart?          : Listener<AnimationEvent<T>>;
            onAnimationEnd?            : Listener<AnimationEvent<T>>;
            onAnimationIteration?      : Listener<AnimationEvent<T>>;
            
            // Clipboard Events
            onCopy?                    : Listener<ClipboardEvent<T>>;
            onCut?                     : Listener<ClipboardEvent<T>>;
            onPaste?                   : Listener<ClipboardEvent<T>>;
    
            // Selection Events
            onSelect?                  : Listener<Event<T>>;
    
            // Keyboard Events
            onKeyDown?                 : Listener<KeyboardEvent<T>>;
            onKeyPress?                : Listener<KeyboardEvent<T>>;
            onKeyUp?                   : Listener<KeyboardEvent<T>>;
    
            // Image Events
            onLoad?                    : Listener<Event<T>>;
            onError?                   : Listener<Event<T>>; // also a Media Event
            // Media Events
            onAbort?                   : Listener<Event<T>>;
            onCanPlay?                 : Listener<Event<T>>;
            onCanPlayThrough?          : Listener<Event<T>>;
            onDurationChange?          : Listener<Event<T>>;
            onEmptied?                 : Listener<Event<T>>;
            onEncrypted?               : Listener<Event<T>>;
            onEnded?                   : Listener<Event<T>>;
            onLoadedData?              : Listener<Event<T>>;
            onLoadedMetadata?          : Listener<Event<T>>;
            onLoadStart?               : Listener<Event<T>>;
            onPause?                   : Listener<Event<T>>;
            onPlay?                    : Listener<Event<T>>;
            onPlaying?                 : Listener<Event<T>>;
            onProgress?                : Listener<Event<T>>;
            onRateChange?              : Listener<Event<T>>;
            onSeeked?                  : Listener<Event<T>>;
            onSeeking?                 : Listener<Event<T>>;
            onStalled?                 : Listener<Event<T>>;
            onSuspend?                 : Listener<Event<T>>;
            onTimeUpdate?              : Listener<Event<T>>;
            onVolumeChange?            : Listener<Event<T>>;
            onWaiting?                 : Listener<Event<T>>;
    
            // Focus Events
            onFocus?                   : Listener<FocusEvent<T>>;
            onBlur?                    : Listener<FocusEvent<T>>;
    
            // MouseEvents
            onClick?                   : Listener<MouseEvent<T>>;
            onContextMenu?             : Listener<MouseEvent<T>>;
            onDoubleClick?             : Listener<MouseEvent<T>>;
            onMouseDown?               : Listener<MouseEvent<T>>;
            onMouseEnter?              : Listener<MouseEvent<T>>;
            onMouseLeave?              : Listener<MouseEvent<T>>;
            onMouseMove?               : Listener<MouseEvent<T>>;
            onMouseOut?                : Listener<MouseEvent<T>>;
            onMouseOver?               : Listener<MouseEvent<T>>;
            onMouseUp?                 : Listener<MouseEvent<T>>;
    
            // Wheel Events
            onWheel?                   : Listener<WheelEvent<T>>;
    
            // Touch Events
            onTouchCancel?             : Listener<TouchEvent<T>>;
            onTouchEnd?                : Listener<TouchEvent<T>>;
            onTouchMove?               : Listener<TouchEvent<T>>;
            onTouchStart?              : Listener<TouchEvent<T>>;
    
            // Drag Event
            onDrag?                    : Listener<DragEvent<T>>;
            onDragEnd?                 : Listener<DragEvent<T>>;
            onDragEnter?               : Listener<DragEvent<T>>;
            onDragExit?                : Listener<DragEvent<T>>;
            onDragLeave?               : Listener<DragEvent<T>>;
            onDragOver?                : Listener<DragEvent<T>>;
            onDragStart?               : Listener<DragEvent<T>>;
            onDrop?                    : Listener<DragEvent<T>>;
    
            // Form Events
            onChange?                  : Listener<FormEvent<T>>;
            onInput?                   : Listener<FormEvent<T>>;
            onSubmit?                  : Listener<FormEvent<T>>;
    
            // UI Events
            onScroll?                  : Listener<UIEvent<T>>;
        }
        interface CompositionEvent<T> extends Event<T> {
            readonly data              : string;
        }
        interface TransitionEvent<T> extends Event<T> {
            readonly propertyName      : string;
            readonly elapsedTime       : number;
        }
        interface AnimationEvent<T> extends Event<T> {
            readonly animationName     : string;
            readonly elapsedTime       : number;
        }
        interface ClipboardEvent<T> extends Event<T> {
            readonly clipboardData     : DataTransfer;
        }
        interface KeyboardEvent<T> extends Event<T> {
            readonly altKey            : boolean;
            readonly charCode          : number;
            readonly ctrlKey           : boolean;
            readonly key               : string;
            readonly keyCode           : number;
            readonly locale            : string;
            readonly location          : number;
            readonly metaKey           : boolean;
            readonly repeat            : boolean;
            readonly shiftKey          : boolean;
            readonly which             : number;
        }
        interface FocusEvent <T> extends Event<T> {
            readonly relatedTarget     : EventTarget;
        }
        interface TouchEvent <T> extends Event<T> {
            readonly altKey            : boolean;
            readonly changedTouches    : TouchList;
            readonly ctrlKey           : boolean;
            readonly metaKey           : boolean;
            readonly shiftKey          : boolean;
            readonly targetTouches     : TouchList;
            readonly touches           : TouchList;
        }
        interface MouseEvent <T> extends Event<T> {
            readonly altKey            : boolean;
            readonly button            : number;
            readonly buttons           : number;
            readonly clientX           : number;
            readonly clientY           : number;
            readonly ctrlKey           : boolean;
            readonly metaKey           : boolean;
            readonly pageX             : number;
            readonly pageY             : number;
            readonly relatedTarget     : EventTarget;
            readonly screenX           : number;
            readonly screenY           : number;
            readonly shiftKey          : boolean;
        }
        interface WheelEvent <T> extends MouseEvent<T> {
            readonly deltaMode         : number;
            readonly deltaX            : number;
            readonly deltaY            : number;
            readonly deltaZ            : number;
        }
        interface DragEvent <T> extends MouseEvent<T> {
            readonly dataTransfer      : DataTransfer;
        }
        interface FormEvent <T> extends Event<T> {

        }
        interface UIEvent <T> extends Event<T> {
            readonly detail            : number;
        }
        type Listener<T> = ({
            handleEvent (event: T): void;
        } & Partial<any>) | ((event: T) => void);
    }
}