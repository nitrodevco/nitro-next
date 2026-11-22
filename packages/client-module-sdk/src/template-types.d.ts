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
    /** Merged into the element's `<variables>` by key (`asset_uri`, `text_color`, `resize_on_item_update`, ...). */
    vars?: Record<string, ClientModuleTemplateValue>;
    /** Merged into the element's layout flags by key, as `vars` are. */
    params?: ClientModuleTemplateParams;
    /**
     * Its size limits - the layout's `width_min`, `width_max`, `height_min`, `height_max` in that
     * order, `null` for none - replaced whole: a window its layout pins to one width takes another
     * only with its limits.
     */
    limits?: [ number | null, number | null, number | null, number | null ];
    /**
     * The window itself (`''`) only, when it is a frame: where it first opens, in whole pixels
     * from the desktop's top left. A root `style`, `color` and `position` go over what the window's
     * code sets and over `frame.overrides`.
     */
    position?: { x: number; y: number };
}

/**
 * An element's layout flags (Flash's window params) a patch may set: how it follows its parent's
 * resize and what it does when its own size changes - so a window follows what a patch adds without
 * the patch doing height sums.
 */
export interface ClientModuleTemplateParams {
    /** How the element follows its parent's resize, per axis (x, y). */
    scale?: [ 'fixed' | 'move' | 'stretch' | 'center', 'fixed' | 'move' | 'stretch' | 'center' ];
    /** Grows (`expand`) or grows and shrinks (`resize`) to hold its children. */
    accommodate?: 'expand' | 'resize';
    /** The edge kept when the element changes size. */
    align?: [ 'left' | 'right' | 'center', 'top' | 'bottom' | 'middle' ];
    /** Its own change of size is made to its parent too, per axis (x, y). */
    reflectToParent?: [ boolean, boolean ];
    /** Kept inside its parent's rect. */
    boundToParent?: boolean;
}

/**
 * An element a patch adds. With `like` it starts as a copy of an element the template has (named as
 * an op's `element` is: `'help_button'`, `'help_button/@0'`) and the fields given replace the copy's;
 * without `like` it is built from the fields alone, `tag` then needed.
 */
export type ClientModuleTemplateElementInput = ClientModuleTemplateElementFields & (
    | { name: string; bindAs?: string }
    /**
     * A name the window's code fills that the template lacks (the catalogue's `ctlg_txt1`, a page
     * text its layout has no field for): the element takes it, so the code's binding (the page's
     * text) reaches it. One the template already has is a conflict in `report`, and the element is
     * named `<key>:<name>` (`name`, or `bindAs` without one).
     */
    | { name?: string; bindAs: string }
);

export interface ClientModuleTemplateElementFields {
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
    /** A `frame`'s content area from its edges (left, top, right, bottom): where what it holds is placed. */
    margins?: readonly [ number, number, number, number ];
    children?: ClientModuleTemplateElementInput[];
}

export type ClientModuleTemplateInsertPosition = 'before' | 'after' | 'first' | 'last';

/**
 * One change: `element` named as the window's code names it (`'name'`, `'panel/name'`, `'@N'`, `''` for
 * the window). `move` takes the element `before` / `after` the one `to` names, or `first` / `last`
 * inside it, keeping its name - so the window's code still finds and binds it. `wrap` puts a new
 * element in the element's place, at its rect unless given, and the element inside it at (0, 0):
 * wrapped in a `frame`, a part of a window becomes a separately framed pane of it (the window itself,
 * `''`, is not wrapped; `set: { style: 'none' }` on it leaves only its panes framed). `bind`
 * binds the element as `templates.bind` does, its values data: `${ctx.<key>}`, `${item.<key>}` (with
 * `items`), `${text.<key>}` filled as it is drawn, a relative `asset` read from the module's base - the
 * op a theme with no code writes in its `template-patches.json`. `arrange` moves and sizes the element
 * after the window's layout as `templates.arrange` does, each of `x`, `y`, `width`, `height` a number or a
 * formula over `${<element>.<measure>}`, `${window.<measure>}` and `${ctx.<key>}` (nitro-next
 * `docs/template-patches.md`, "An arrangement as data").
 */
export type ClientModuleTemplatePatchOp
    = | { element: string; set: ClientModuleTemplateElementChanges }
        | { element: string; remove: true }
        | { element: string; insert: ClientModuleTemplateInsertPosition; add: ClientModuleTemplateElementInput }
        | { element: string; move: ClientModuleTemplateInsertPosition; to: string }
        | { element: string; wrap: ClientModuleTemplateElementInput }
        | { element: string; bind: ClientModuleTemplateBindValues; items?: boolean; override?: boolean }
        | { element: string; arrange: { x?: number | string; y?: number | string; width?: number | string; height?: number | string } };

/** What a `bind` op gives: binding fields, each a value of its type or text with placeholders (`'icons/${item.index}.png'`). */
export interface ClientModuleTemplateBindValues {
    caption?: string;
    htmlText?: string;
    tooltip?: string;
    asset?: string;
    helpPage?: string;
    visible?: boolean | string;
    background?: boolean | string;
    greyscale?: boolean | string;
    disabled?: boolean | string;
    selected?: boolean | string;
    italic?: boolean | string;
    underline?: boolean | string;
    crop?: boolean | string;
    color?: number | string;
    backgroundColor?: number | string;
    etchingColor?: number | string;
    alpha?: number | string;
    blend?: number | string;
    rotation?: number | string;
}

/**
 * What a window tells extensions about what it shows, read-only, flat values (the infostand: the
 * user's `userId`, `figure`, `isOwnUser`, ...; nitro-next `docs/template-patches.md` lists each window's keys).
 */
export type ClientModuleTemplateContext = Readonly<Record<string, string | number | boolean | null | undefined>>;

/** Which clone of its list an item binding (`bind(..., { items: true })`) is drawing. */
export interface ClientModuleTemplateItem {
    /** The item's key, as the window's code gives it (a room's id). */
    key: string;
    /** Its place in its list, from 0. */
    index: number;
    /** The name of the window that holds it, `''` for an unnamed one. */
    list: string;
}

/** One laid-out element of a window, as a post-layout hook moves and sizes it (Flash's `IWindow` rect). */
export interface ClientModuleTemplateWindow {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    /** A text's text size. */
    readonly textWidth: number;
    readonly textHeight: number;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setRectangle: (x: number, y: number, width: number, height: number) => void;
}

/** A laid-out window: an element by name or path (`find`), and the window itself (`root`). */
export interface ClientModuleTemplateWindows {
    find: (key: string) => ClientModuleTemplateWindow | undefined;
    root: () => ClientModuleTemplateWindow | undefined;
}

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
    /** The ops each owner's patches gave the template (what a function of the context gave), by owner. */
    ops: Record<string, number>;
    /** Two owners set one property of one element: the last one's value is kept. */
    conflicts: { template: string; element: string; property: string; owners: string[] }[];
    /** Elements a patch names that the template does not have (a renamed element in a new release). */
    unmatched: { template: string; owner: string; element: string }[];
    /** Extension code that threw - ops or a binding made for a context, a post-layout hook - and was skipped. */
    errors: { template: string; owner: string; message: string }[];
    /**
     * `set` fields that matched but change nothing the window draws - its code binds that
     * field of the element (a caption it sets) - once the window has been drawn; not counted in `applied`.
     */
    ineffective?: { template: string; owner: string; element: string; property: string }[];
}
