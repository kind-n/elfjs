/**
 * elf.d.ts
 * 
 * @copyright http://www.elfjs.org
 * 
 * @version 0.0.4
 * @license MIT
 * 
 */

declare namespace Elf {

    export const Trustor: any;

    export class Promise <T> implements Elf.Disposable {

        static when <R1, R2, R3, R4, R5, R6, R7, R8, R9> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>,
            R4 | Elf.Promise<R4>,
            R5 | Elf.Promise<R5>,
            R6 | Elf.Promise<R6>,
            R7 | Elf.Promise<R7>,
            R8 | Elf.Promise<R8>,
            R9 | Elf.Promise<R9>
        ]): Elf.Promise<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
        static when <R1, R2, R3, R4, R5, R6, R7, R8> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>,
            R4 | Elf.Promise<R4>,
            R5 | Elf.Promise<R5>,
            R6 | Elf.Promise<R6>,
            R7 | Elf.Promise<R7>,
            R8 | Elf.Promise<R8>
        ]): Elf.Promise<[R1, R2, R3, R4, R5, R6, R7, R8]>;
        static when <R1, R2, R3, R4, R5, R6, R7> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>,
            R4 | Elf.Promise<R4>,
            R5 | Elf.Promise<R5>,
            R6 | Elf.Promise<R6>,
            R7 | Elf.Promise<R7>
        ]): Elf.Promise<[R1, R2, R3, R4, R5, R6, R7]>;
        static when <R1, R2, R3, R4, R5> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>,
            R4 | Elf.Promise<R4>,
            R5 | Elf.Promise<R5>
        ]): Elf.Promise<[R1, R2, R3, R4, R5]>;
        static when <R1, R2, R3, R4> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>,
            R4 | Elf.Promise<R4>
        ]): Elf.Promise<[R1, R2, R3, R4]>;
        static when <R1, R2, R3> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>,
            R3 | Elf.Promise<R3>
        ]): Elf.Promise<[R1, R2, R3]>;
        static when <R1, R2> (values: [
            R1 | Elf.Promise<R1>,
            R2 | Elf.Promise<R2>
        ]): Elf.Promise<[R1, R2]>;

        static when <R> (values: R[] | Elf.Promise<R>[]): Elf.Promise<R[]>;
        static race <R> (values: R[] | Elf.Promise<R>[]): Elf.Promise<R>;
        static ajax (request: Elf.Request): Elf.Promise<Elf.Response>;
        static next <R> (value: R): Elf.Promise<R>;
        static loss (error: any): Elf.Promise<any>;

        then <R> (fn: (value: T) => R | Elf.Promise<R>): Elf.Promise<R>;
        fail <R> (fn: (value: T) => R | Elf.Promise<R>): Elf.Promise<R>;

        dispose (): void;
    }

    export function require <T> (name: string): Elf.Promise<T>;

    export function setTimeout   (fn: (() => boolean | void), duration?: number): Elf.Disposable;
    export function setInterval  (fn: (() => boolean | void), duration?: number): Elf.Disposable;
    export function setImmediate (fn: (() => boolean | void)): Elf.Disposable;

    /**
     * 
     * @deprecated Please use es6 'class'. 
     */
    export function createClass (proto: any): Function;

    export function createEvent   <T extends HTMLElement | JSX.ElementClass> (type: string, bubbles?: boolean, value?: any): Elf.Event<T>;
    export function attachEvent   <T extends HTMLElement | JSX.ElementClass> (node: T, type: string, fn: ((event: Elf.Event<T>) => any)): void;
    export function detachEvent   <T extends HTMLElement | JSX.ElementClass> (node: T, type: string, fn: ((event: Elf.Event<T>) => any)): void;
    export function dispatchEvent <T extends HTMLElement | JSX.ElementClass> (node: T, event: Elf.Event<T>): void;

    export function createElement (type: string | Function, props?: any, ...children: any[]): JSX.Element;
    export function redactElement (temp: string, ...depends: any[]): () => JSX.Element;

    export function forceUpdate   (duplex?: boolean): void;

    export function Component (name: string, redactor?: (() => JSX.Element)): Elf.ClassDecorator;
    export function Directive (name: string): Elf.ClassDecorator;
    export function Transform (name: string): Elf.ClassDecorator;

    export function depend (...depends: any[]): void;
    export function render (element: JSX.Element, container: HTMLElement, duplex?: boolean): Elf.Radical;

    export function config (options: Elf.Options): void;
    export function set (name: string, value: any): void;

    export interface Radical extends Elf.Disposable {

        forceUpdate(props?: any): void;
    }

    export interface Options {
        baseURL?: string;
        mapping?: {
            [name: string]: string;
        };
        routing?: (name: string) => string;
        defaultExtension?: string;
    }

    export interface Request {
        url: string;
        body?: string;
        method?: "GET" | "PUT" | "POST" | "HEAD" | "DELETE" | "OPTIONS",
        headers?: any;
    }

    export interface Response {
        status: number;
        headers: any;
        text(): string;
        json(): any;
    }

    export interface DOMProps {
        key?: string;
        ref?: string;
        cmd?: any[];
    }

    export interface ILifeCycle {

        onInitial? (...args: any[]): void;
        onDispose? (...args: any[]): void;
    }

    export interface IDirective extends ILifeCycle {

    }

    export interface IComponent <T> extends ILifeCycle {
        props: T;
    }

    export interface ITransform {

        transform (...args: any[]): any;
    }

    export interface Disposable {

        dispose (): void;
    }

    export interface Event <T> {
        readonly type: string;
        readonly value: any;
        readonly bubbles: boolean;
        readonly refresh: boolean;
        readonly cancelable: boolean;
        readonly defaultPrevented: boolean;
        readonly target: T;
        preventDefault (): void;
        preventRefresh (): void;
        stopPropagation(): void;
    }

    export type ClassDecorator = <T extends Function> (target: T) => T;
}


declare namespace JSX {

    export interface Element {
        type: string | Function;
        props: any;
        ref: string;
        key: string;
        cmd: any[];
    }

    export interface ElementClass { }

    export interface ElementAttributesProperty { props: { } }

    export interface IntrinsicAttributes      extends Elf.DOMProps { }

    export interface IntrinsicClassAttributes extends Elf.DOMProps { }

    export interface IntrinsicElements {
        // HTML Element
        a                  : JSX.DOMProps<HTMLAnchorElement>;
        abbr               : JSX.DOMProps<HTMLElement>;
        acronym            : JSX.DOMProps<HTMLElement>;
        address            : JSX.DOMProps<HTMLElement>;
        applet             : JSX.DOMProps<HTMLAppletElement>;
        area               : JSX.DOMProps<HTMLAreaElement>;
        article            : JSX.DOMProps<HTMLElement>;
        aside              : JSX.DOMProps<HTMLElement>;
        audio              : JSX.DOMProps<HTMLAudioElement>;
        b                  : JSX.DOMProps<HTMLElement>;
        base               : JSX.DOMProps<HTMLBaseElement>;
        basefont           : JSX.DOMProps<HTMLBaseFontElement>;
        bdi                : JSX.DOMProps<HTMLElement>;
        bdo                : JSX.DOMProps<HTMLElement>;
        bgsound            : JSX.DOMProps<HTMLElement>;
        big                : JSX.DOMProps<HTMLElement>;
        blink              : JSX.DOMProps<HTMLElement>;
        blockquote         : JSX.DOMProps<HTMLElement>;
        body               : JSX.DOMProps<HTMLBodyElement>;
        br                 : JSX.DOMProps<HTMLBRElement>;
        button             : JSX.DOMProps<HTMLButtonElement>;
        canvas             : JSX.DOMProps<HTMLCanvasElement>;
        caption            : JSX.DOMProps<HTMLElement>;
        center             : JSX.DOMProps<HTMLElement>;
        cite               : JSX.DOMProps<HTMLElement>;
        code               : JSX.DOMProps<HTMLElement>;
        col                : JSX.DOMProps<HTMLTableColElement>;
        colgroup           : JSX.DOMProps<HTMLTableColElement>;
        content            : JSX.DOMProps<HTMLElement>;
        data               : JSX.DOMProps<HTMLElement>;
        datalist           : JSX.DOMProps<HTMLDataListElement>;
        dd                 : JSX.DOMProps<HTMLElement>;
        del                : JSX.DOMProps<HTMLElement>;
        details            : JSX.DOMProps<HTMLElement>;
        dfn                : JSX.DOMProps<HTMLElement>;
        dir                : JSX.DOMProps<HTMLElement>;
        div                : JSX.DOMProps<HTMLDivElement>;
        dl                 : JSX.DOMProps<HTMLDListElement>;
        dt                 : JSX.DOMProps<HTMLElement>;
        em                 : JSX.DOMProps<HTMLElement>;
        embed              : JSX.DOMProps<HTMLEmbedElement>;
        fieldset           : JSX.DOMProps<HTMLFieldSetElement>;
        figcaption         : JSX.DOMProps<HTMLElement>;
        figure             : JSX.DOMProps<HTMLElement>;
        font               : JSX.DOMProps<HTMLFontElement>;
        footer             : JSX.DOMProps<HTMLElement>;
        form               : JSX.DOMProps<HTMLFormElement>;
        frame              : JSX.DOMProps<HTMLFrameElement>;
        frameset           : JSX.DOMProps<HTMLElement>;
        h1                 : JSX.DOMProps<HTMLHeadingElement>;
        h2                 : JSX.DOMProps<HTMLHeadingElement>;
        h3                 : JSX.DOMProps<HTMLHeadingElement>;
        h4                 : JSX.DOMProps<HTMLHeadingElement>;
        h5                 : JSX.DOMProps<HTMLHeadingElement>;
        h6                 : JSX.DOMProps<HTMLHeadingElement>;
        head               : JSX.DOMProps<HTMLHeadElement>;
        header             : JSX.DOMProps<HTMLElement>;
        hgroup             : JSX.DOMProps<HTMLElement>;
        hr                 : JSX.DOMProps<HTMLHRElement>;
        html               : JSX.DOMProps<HTMLHtmlElement>;
        i                  : JSX.DOMProps<HTMLElement>;
        iframe             : JSX.DOMProps<HTMLIFrameElement>;
        img                : JSX.DOMProps<HTMLImageElement>;
        input              : JSX.DOMProps<HTMLInputElement>;
        ins                : JSX.DOMProps<HTMLModElement>;
        isindex            : JSX.DOMProps<HTMLElement>;
        kbd                : JSX.DOMProps<HTMLElement>;
        keygen             : JSX.DOMProps<HTMLElement>;
        label              : JSX.DOMProps<HTMLLabelElement>;
        legend             : JSX.DOMProps<HTMLLegendElement>;
        li                 : JSX.DOMProps<HTMLLIElement>;
        link               : JSX.DOMProps<HTMLLinkElement>;
        listing            : JSX.DOMProps<HTMLElement>;
        main               : JSX.DOMProps<HTMLElement>;
        map                : JSX.DOMProps<HTMLMapElement>;
        mark               : JSX.DOMProps<HTMLElement>;
        marquee            : JSX.DOMProps<HTMLMarqueeElement>;
        menu               : JSX.DOMProps<HTMLElement>;
        menuitem           : JSX.DOMProps<HTMLElement>;
        meta               : JSX.DOMProps<HTMLMetaElement>;
        meter              : JSX.DOMProps<HTMLElement>;
        nav                : JSX.DOMProps<HTMLElement>;
        nobr               : JSX.DOMProps<HTMLElement>;
        noframes           : JSX.DOMProps<HTMLElement>;
        noscript           : JSX.DOMProps<HTMLElement>;
        object             : JSX.DOMProps<HTMLObjectElement>;
        ol                 : JSX.DOMProps<HTMLOListElement>;
        optgroup           : JSX.DOMProps<HTMLOptGroupElement>;
        option             : JSX.DOMProps<HTMLOptionElement>;
        output             : JSX.DOMProps<HTMLElement>;
        p                  : JSX.DOMProps<HTMLParagraphElement>;
        param              : JSX.DOMProps<HTMLParamElement>;
        plaintext          : JSX.DOMProps<HTMLElement>;
        pre                : JSX.DOMProps<HTMLPreElement>;
        progress           : JSX.DOMProps<HTMLProgressElement>;
        q                  : JSX.DOMProps<HTMLQuoteElement>;
        rp                 : JSX.DOMProps<HTMLElement>;
        rt                 : JSX.DOMProps<HTMLElement>;
        ruby               : JSX.DOMProps<HTMLElement>;
        s                  : JSX.DOMProps<HTMLElement>;
        samp               : JSX.DOMProps<HTMLElement>;
        script             : JSX.DOMProps<HTMLScriptElement>;
        section            : JSX.DOMProps<HTMLElement>;
        select             : JSX.DOMProps<HTMLSelectElement>;
        shadow             : JSX.DOMProps<HTMLElement>;
        small              : JSX.DOMProps<HTMLElement>;
        source             : JSX.DOMProps<HTMLSourceElement>;
        spacer             : JSX.DOMProps<HTMLElement>;
        span               : JSX.DOMProps<HTMLSpanElement>;
        strike             : JSX.DOMProps<HTMLElement>;
        strong             : JSX.DOMProps<HTMLElement>;
        style              : JSX.DOMProps<HTMLStyleElement>;
        sub                : JSX.DOMProps<HTMLElement>;
        summary            : JSX.DOMProps<HTMLElement>;
        sup                : JSX.DOMProps<HTMLElement>;
        table              : JSX.DOMProps<HTMLTableElement>;
        tbody              : JSX.DOMProps<HTMLTableSectionElement>;
        td                 : JSX.DOMProps<HTMLTableDataCellElement>;
        template           : JSX.DOMProps<HTMLTemplateElement>;
        textarea           : JSX.DOMProps<HTMLTextAreaElement>;
        tfoot              : JSX.DOMProps<HTMLTableSectionElement>;
        th                 : JSX.DOMProps<HTMLTableHeaderCellElement>;
        thead              : JSX.DOMProps<HTMLTableSectionElement>;
        time               : JSX.DOMProps<HTMLElement>;
        title              : JSX.DOMProps<HTMLTitleElement>;
        tr                 : JSX.DOMProps<HTMLTableRowElement>;
        track              : JSX.DOMProps<HTMLTrackElement>;
        tt                 : JSX.DOMProps<HTMLElement>;
        u                  : JSX.DOMProps<HTMLElement>;
        ul                 : JSX.DOMProps<HTMLUListElement>;
        var                : JSX.DOMProps<HTMLElement>;
        video              : JSX.DOMProps<HTMLVideoElement>;
        wbr                : JSX.DOMProps<HTMLElement>;
        xmp                : JSX.DOMProps<HTMLElement>;

        // SVG Element
        altGlyph           : JSX.SVGProps;
        altGlyphDef        : JSX.SVGProps;
        altGlyphItem       : JSX.SVGProps;
        animate            : JSX.SVGProps;
        animateColor       : JSX.SVGProps;
        animateMotion      : JSX.SVGProps;
        animateTransform   : JSX.SVGProps;
        circle             : JSX.SVGProps;
        clipPath           : JSX.SVGProps;
        colorProfile       : JSX.SVGProps;
        cursor             : JSX.SVGProps;
        defs               : JSX.SVGProps;
        desc               : JSX.SVGProps;
        ellipse            : JSX.SVGProps;
        feBlend            : JSX.SVGProps;
        feColorMatrix      : JSX.SVGProps;
        feComponentTransfer: JSX.SVGProps;
        feComposite        : JSX.SVGProps;
        feConvolveMatrix   : JSX.SVGProps;
        feDiffuseLighting  : JSX.SVGProps;
        feDisplacementMap  : JSX.SVGProps;
        feDistantLight     : JSX.SVGProps;
        feFlood            : JSX.SVGProps;
        feFuncA            : JSX.SVGProps;
        feFuncB            : JSX.SVGProps;
        feFuncG            : JSX.SVGProps;
        feFuncR            : JSX.SVGProps;
        feGaussianBlur     : JSX.SVGProps;
        feImage            : JSX.SVGProps;
        feMerge            : JSX.SVGProps;
        feMergeNode        : JSX.SVGProps;
        feMorphology       : JSX.SVGProps;
        feOffset           : JSX.SVGProps;
        fePointLight       : JSX.SVGProps;
        feSpecularLighting : JSX.SVGProps;
        feSpotLight        : JSX.SVGProps;
        feTile             : JSX.SVGProps;
        feTurbulence       : JSX.SVGProps;
        filter             : JSX.SVGProps;
        fontFace           : JSX.SVGProps;
        fontFaceFormat     : JSX.SVGProps;
        fontFaceName       : JSX.SVGProps;
        fontFaceSrc        : JSX.SVGProps;
        fontFaceUri        : JSX.SVGProps;
        foreignObject      : JSX.SVGProps;
        g                  : JSX.SVGProps;
        glyph              : JSX.SVGProps;
        glyphRef           : JSX.SVGProps;
        hkern              : JSX.SVGProps;
        image              : JSX.SVGProps;
        line               : JSX.SVGProps;
        linearGradient     : JSX.SVGProps;
        marker             : JSX.SVGProps;
        mask               : JSX.SVGProps;
        metadata           : JSX.SVGProps;
        missingGlyph       : JSX.SVGProps;
        mpath              : JSX.SVGProps;
        path               : JSX.SVGProps;
        pattern            : JSX.SVGProps;
        polygon            : JSX.SVGProps;
        polyline           : JSX.SVGProps;
        radialGradient     : JSX.SVGProps;
        rect               : JSX.SVGProps;
        set                : JSX.SVGProps;
        stop               : JSX.SVGProps;
        svg                : JSX.SVGProps;
        switch             : JSX.SVGProps;
        symbol             : JSX.SVGProps;
        text               : JSX.SVGProps;
        textPath           : JSX.SVGProps;
        tref               : JSX.SVGProps;
        tspan              : JSX.SVGProps;
        use                : JSX.SVGProps;
        view               : JSX.SVGProps;
        vkern              : JSX.SVGProps;

        // MathML Element
        math               : JSX.MathMLProps;
        maction            : JSX.MathMLProps;
        maligngroup        : JSX.MathMLProps;
        malignmark         : JSX.MathMLProps;
        menclose           : JSX.MathMLProps;
        merror             : JSX.MathMLProps;
        mfenced            : JSX.MathMLProps;
        mfrac              : JSX.MathMLProps;
        mglyph             : JSX.MathMLProps;
        mi                 : JSX.MathMLProps;
        mlabeledtr         : JSX.MathMLProps;
        mlongdiv           : JSX.MathMLProps;
        mmultiscripts      : JSX.MathMLProps;
        mn                 : JSX.MathMLProps;
        mo                 : JSX.MathMLProps;
        mover              : JSX.MathMLProps;
        mpadded            : JSX.MathMLProps;
        mphantom           : JSX.MathMLProps;
        mroot              : JSX.MathMLProps;
        mrow               : JSX.MathMLProps;
        ms                 : JSX.MathMLProps;
        mscarries          : JSX.MathMLProps;
        mscarry            : JSX.MathMLProps;
        msgroup            : JSX.MathMLProps;
        mstack             : JSX.MathMLProps;
        msline             : JSX.MathMLProps;
        mspace             : JSX.MathMLProps;
        msqrt              : JSX.MathMLProps;
        msrow              : JSX.MathMLProps;
        mstyle             : JSX.MathMLProps;
        msub               : JSX.MathMLProps;
        msup               : JSX.MathMLProps;
        msubsup            : JSX.MathMLProps;
        mtable             : JSX.MathMLProps;
        mtd                : JSX.MathMLProps;
        mtext              : JSX.MathMLProps;
        mtr                : JSX.MathMLProps;
        munder             : JSX.MathMLProps;
        munderover         : JSX.MathMLProps;
        semantics          : JSX.MathMLProps;
        annotation         : JSX.MathMLProps;
        annotationXml      : JSX.MathMLProps;
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

    export interface DOMProps <T> extends JSX.DOMEvent<T>, Elf.DOMProps {
        accept?              : string;
        acceptCharset?       : string;
        accesskey?           : string;
        action?              : string;
        allowFullScreen?     : boolean;
        allowTransparency?   : boolean;
        align?               : string;
        alt?                 : string;
        async?               : boolean;
        autocomplete?        : "on" | "off";
        autofocus?           : boolean;
        autoplay?            : boolean;
        autosave?            : boolean;
        bgcolor?             : string;
        border?              : string;
        capture?             : boolean;
        cellpadding?         : number | string;
        cellspacing?         : number | string;
        challenge?           : string;
        charset?             : string;
        checked?             : boolean;
        cite?                : string;
        classid?             : string;
        className?           : string;
        code?                : string;
        codebase?            : string;
        color?               : string;
        cols?                : number;
        colspan?             : number;
        content?             : string;
        contenteditable?     : boolean;
        contextmenu?         : string;
        controls?            : boolean;
        coords?              : string;
        crossorigin?         : "anonymous" | "use-credentials";
        data?                : string;
        datetime?            : string;
        default?             : boolean;
        defer?               : boolean;
        dir?                 : string;
        dirname?             : string;
        disabled?            : boolean;
        download?            : any;
        draggable?           : boolean;
        dropzone?            : boolean;
        enctype?             : string;
        form?                : string;
        formaction?          : string;
        headers?             : string;
        height?              : string | 0;
        hidden?              : boolean;
        high?                : number;
        href?                : string;
        hreflang?            : string;
        htmlFor?             : string;
        httpEquiv?           : string;
        icon?                : string;
        id?                  : string;
        isMap?               : boolean;
        itemprop?            : string;
        keytype?             : string;
        kind?                : string;
        label?               : string;
        lang?                : string;
        language?            : string;
        list?                : string;
        loop?                : boolean;
        low?                 : number;
        manifest?            : string;
        max?                 : string | number;
        maxlength?           : number;
        media?               : string;
        method?              : string;
        min?                 : string | number;
        multiple?            : boolean;
        muted?               : boolean;
        name?                : string;
        novalidate?          : boolean;
        open?                : boolean;
        optimum?             : number;
        pattern?             : string;
        ping?                : string;
        placeholder?         : string;
        poster?              : string;
        preload?             : string;
        radiogroup?          : string;
        readonly?            : boolean;
        rel?                 : string;
        required?            : boolean;
        reversed?            : boolean;
        rows?                : number;
        rowspan?             : number;
        sandbox?             : string;
        scope?               : string;
        scoped?              : string;
        seamless?            : boolean;
        selected?            : boolean;
        shape?               : string;
        size?                : number;
        sizes?               : string;
        span?                : number;
        spellcheck?          : boolean;
        src?                 : string;
        srcdoc?              : string;
        srclang?             : string;
        srcset?              : string;
        start?               : number;
        step?                : string | number;
        style?               : JSX.CSSProps;
        summary?             : string;
        tabindex?            : number;
        target?              : string;
        title?               : string;
        type?                : string;
        usemap?              : string;
        value?               : string | number;
        width?               : string | number;
        wrap?                : string;
        [key: string]        : any;
    }

    export interface DOMEvent <T> {
        
        // Composition Events
        onCompositionEnd?    : JSX.Listener<JSX.CompositionEvent<T>>;
        onCompositionStart?  : JSX.Listener<JSX.CompositionEvent<T>>;
        onCompositionUpdate? : JSX.Listener<JSX.CompositionEvent<T>>;

        // Transition Events
        onTransitionEnd?     : JSX.Listener<JSX.TransitionEvent<T>>;

        // Animation Events
        onAnimationStart?    : JSX.Listener<JSX.AnimationEvent<T>>;
        onAnimationEnd?      : JSX.Listener<JSX.AnimationEvent<T>>;
        onAnimationIteration?: JSX.Listener<JSX.AnimationEvent<T>>;
        
        // Clipboard Events
        onCopy?              : JSX.Listener<JSX.ClipboardEvent<T>>;
        onCut?               : JSX.Listener<JSX.ClipboardEvent<T>>;
        onPaste?             : JSX.Listener<JSX.ClipboardEvent<T>>;

        // Selection Events
        onSelect?            : JSX.Listener<JSX.Event<T>>;

        // Keyboard Events
        onKeyDown?           : JSX.Listener<JSX.KeyboardEvent<T>>;
        onKeyPress?          : JSX.Listener<JSX.KeyboardEvent<T>>;
        onKeyUp?             : JSX.Listener<JSX.KeyboardEvent<T>>;

        // Image Events
        onLoad?              : JSX.Listener<JSX.Event<T>>;
        onError?             : JSX.Listener<JSX.Event<T>>; // also a Media Event

        // Media Events
        onAbort?             : JSX.Listener<JSX.Event<T>>;
        onCanPlay?           : JSX.Listener<JSX.Event<T>>;
        onCanPlayThrough?    : JSX.Listener<JSX.Event<T>>;
        onDurationChange?    : JSX.Listener<JSX.Event<T>>;
        onEmptied?           : JSX.Listener<JSX.Event<T>>;
        onEncrypted?         : JSX.Listener<JSX.Event<T>>;
        onEnded?             : JSX.Listener<JSX.Event<T>>;
        onLoadedData?        : JSX.Listener<JSX.Event<T>>;
        onLoadedMetadata?    : JSX.Listener<JSX.Event<T>>;
        onLoadStart?         : JSX.Listener<JSX.Event<T>>;
        onPause?             : JSX.Listener<JSX.Event<T>>;
        onPlay?              : JSX.Listener<JSX.Event<T>>;
        onPlaying?           : JSX.Listener<JSX.Event<T>>;
        onProgress?          : JSX.Listener<JSX.Event<T>>;
        onRateChange?        : JSX.Listener<JSX.Event<T>>;
        onSeeked?            : JSX.Listener<JSX.Event<T>>;
        onSeeking?           : JSX.Listener<JSX.Event<T>>;
        onStalled?           : JSX.Listener<JSX.Event<T>>;
        onSuspend?           : JSX.Listener<JSX.Event<T>>;
        onTimeUpdate?        : JSX.Listener<JSX.Event<T>>;
        onVolumeChange?      : JSX.Listener<JSX.Event<T>>;
        onWaiting?           : JSX.Listener<JSX.Event<T>>;

        // Focus Events
        onFocus?             : JSX.Listener<JSX.FocusEvent<T>>;
        onBlur?              : JSX.Listener<JSX.FocusEvent<T>>;

        // MouseEvents
        onClick?             : JSX.Listener<JSX.MouseEvent<T>>;
        onContextMenu?       : JSX.Listener<JSX.MouseEvent<T>>;
        onDoubleClick?       : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseDown?         : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseEnter?        : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseLeave?        : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseMove?         : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseOut?          : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseOver?         : JSX.Listener<JSX.MouseEvent<T>>;
        onMouseUp?           : JSX.Listener<JSX.MouseEvent<T>>;

        // Wheel Events
        onWheel?             : JSX.Listener<JSX.WheelEvent<T>>;

        // Touch Events
        onTouchCancel?       : JSX.Listener<JSX.TouchEvent<T>>;
        onTouchEnd?          : JSX.Listener<JSX.TouchEvent<T>>;
        onTouchMove?         : JSX.Listener<JSX.TouchEvent<T>>;
        onTouchStart?        : JSX.Listener<JSX.TouchEvent<T>>;

        // Drag Event
        onDrag?              : JSX.Listener<JSX.DragEvent<T>>;
        onDragEnd?           : JSX.Listener<JSX.DragEvent<T>>;
        onDragEnter?         : JSX.Listener<JSX.DragEvent<T>>;
        onDragExit?          : JSX.Listener<JSX.DragEvent<T>>;
        onDragLeave?         : JSX.Listener<JSX.DragEvent<T>>;
        onDragOver?          : JSX.Listener<JSX.DragEvent<T>>;
        onDragStart?         : JSX.Listener<JSX.DragEvent<T>>;
        onDrop?              : JSX.Listener<JSX.DragEvent<T>>;

        // Form Events
        onChange?            : JSX.Listener<JSX.FormEvent<T>>;
        onInput?             : JSX.Listener<JSX.FormEvent<T>>;
        onSubmit?            : JSX.Listener<JSX.FormEvent<T>>;

        // UI Events
        onScroll?            : JSX.Listener<JSX.UIEvent<T>>;
    }

    export interface CompositionEvent <T> extends JSX.Event<T> {
        readonly data              : string;
    }
    export interface TransitionEvent <T> extends JSX.Event<T> {
        readonly propertyName      : string;
        readonly pseudoElement     : string;
        readonly elapsedTime       : number;
    }
    export interface AnimationEvent <T> extends JSX.Event<T> {
        readonly animationName     : string;
        readonly pseudoElement     : string;
        readonly elapsedTime       : number;
    }
    export interface ClipboardEvent <T> extends JSX.Event<T> {
        readonly clipboardData     : DataTransfer;
    }
    export interface KeyboardEvent <T> extends JSX.Event<T> {
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
    export interface FocusEvent <T> extends JSX.Event<T> {
        readonly relatedTarget     : EventTarget;
    }
    export interface TouchEvent <T> extends JSX.Event<T> {
        readonly altKey            : boolean;
        readonly changedTouches    : TouchList;
        readonly ctrlKey           : boolean;
        readonly metaKey           : boolean;
        readonly shiftKey          : boolean;
        readonly targetTouches     : TouchList;
        readonly touches           : TouchList;
    }
    export interface MouseEvent <T> extends JSX.Event<T> {
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
    export interface WheelEvent <T> extends JSX.MouseEvent<T> {
        readonly deltaMode         : number;
        readonly deltaX            : number;
        readonly deltaY            : number;
        readonly deltaZ            : number;
    }
    export interface DragEvent <T> extends JSX.MouseEvent<T> {
        readonly dataTransfer      : DataTransfer;
    }
    export interface FormEvent <T> extends JSX.Event<T> {

    }
    export interface UIEvent <T> extends JSX.Event<T> {
        readonly detail            : number;
    }
    export interface Event <T> extends Elf.Event<T> {
        readonly eventPhase        : number;
        readonly isTrusted         : boolean;
        readonly timeStamp         : number;
    }

    export type Listener <T> = (event: T) => void;
}