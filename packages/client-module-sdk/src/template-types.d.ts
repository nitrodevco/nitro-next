/**
 * Template patches as a module writes them (nitro-next `docs/template-patches.md`): changes to a core
 * window's layout as data, and what an element the module added does. The client takes more (a
 * ported window's every binding); these are the fields a module's patch needs, and
 * `clientModuleSdk.check.ts` in nitro-react checks the client still takes each of them.
 */
/** A value in a layout's `<variables>`. */
export type ClientModuleTemplateValue = string | number | boolean | ClientModuleTemplateValue[] | { [key: string]: ClientModuleTemplateValue };

/** What a patch may change on an element: its layout's own attributes, never its code's behaviour. */
export interface ClientModuleTemplateElementChanges {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    style?: string;
    dynamicStyle?: string;
    caption?: string;
    hidden?: boolean;
    /** `0xAARRGGBB`. */
    color?: number;
    background?: boolean;
    blend?: number;
    /** Merged into the element's `<variables>` by key (`asset_uri`, `text_color`, ...). */
    vars?: Record<string, ClientModuleTemplateValue>;
}

/**
 * An element a patch adds. With `like` it starts as a copy of an element the template has (named as
 * an op's `element` is: `'help_button'`, `'help_button/@0'`) and the fields given replace the copy's;
 * without `like` it is built from the fields alone, `tag` then needed.
 */
export interface ClientModuleTemplateElementInput {
    name: string;
    tag?: string;
    like?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    style?: string;
    dynamicStyle?: string;
    caption?: string;
    hidden?: boolean;
    color?: number;
    background?: boolean;
    blend?: number;
    vars?: Record<string, ClientModuleTemplateValue>;
    children?: ClientModuleTemplateElementInput[];
}

export type ClientModuleTemplateInsertPosition = 'before' | 'after' | 'first' | 'last';

/** One change: `element` named as the window's code names it (`'name'`, `'panel/name'`, `'@N'`, `''` for the window). */
export type ClientModuleTemplatePatchOp
    = | { element: string; set: ClientModuleTemplateElementChanges }
        | { element: string; remove: true }
        | { element: string; insert: ClientModuleTemplateInsertPosition; add: ClientModuleTemplateElementInput };

/** What the window's code would do to an element the module added. */
export interface ClientModuleTemplateBinding {
    visible?: boolean;
    caption?: string;
    /** Markup (`<b>`, `<font>`, `<br>`) over the caption. */
    htmlText?: string;
    tooltip?: string;
    /** A text's `0xRRGGBB`; anything else's `0xAARRGGBB`. */
    color?: number;
    /** A bitmap's asset name or URL. */
    asset?: string;
    style?: string;
    alpha?: number;
    disabled?: boolean;
    selected?: boolean;
    onPointerTap?: (event: never) => void;
    onDoubleClick?: (event: never) => void;
    onPointerDown?: (event: never) => void;
    onPointerUp?: (event: never) => void;
    onPointerOver?: (event: never) => void;
    onPointerOut?: (event: never) => void;
    /** A markup text's link was clicked. */
    onLink?: (link: string) => void;
    /** An input's text changed. */
    onChange?: (text: string) => void;
    onEnter?: () => void;
    maxChars?: number;
}

export interface ClientModuleTemplatePatchReport {
    applied: number;
    /** Two owners set one property of one element: the last one's value is kept. */
    conflicts: { template: string; element: string; property: string; owners: string[] }[];
    /** Elements a patch names that the template does not have (a renamed element in a new release). */
    unmatched: { template: string; owner: string; element: string }[];
}
