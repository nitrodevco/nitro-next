/**
 * What a window's code does to its template's named elements - its caption, whether it shows, what a
 * click on it does - handed to `TemplateView` as props by element name, the way Flash window code
 * reaches them with `findChildByName`.
 */
import type { FederatedPointerEvent } from 'pixi.js';
import type { ReactNode } from 'react';

import type { EtchingPosition } from '../font/flash-text';
import type { PivotPoint } from '../utils/flashBitmap';
import type { Template, TemplateElement } from './templateData';
import type { LayoutWindow, TemplateRect } from './templateLayout';

/** A header's button as its window's code reaches it: shown or hidden, and its click. */
export interface TemplateHeaderButton {
    visible?: boolean;
    onPointerTap?: () => void;
}

/**
 * The windows a header's own layout holds (`habbo_window_layout_header_3`'s `_CONTROLS` list), by
 * name, and the binding field each one's binding goes to on the `header` element - a `header` is
 * drawn with its buttons, not from elements of its own.
 */
type HeaderButtonField = 'headerClose' | 'headerHelp';
const HEADER_BUTTONS: Record<string, HeaderButtonField> = { header_button_close: 'headerClose', header_button_help: 'headerHelp' };
const HEADER_BUTTON_FIELDS = [ 'headerClose', 'headerHelp' ] as const;

const sameTemplateRect = (a: TemplateRect | undefined, b: TemplateRect | undefined) => a === b
    || (!!a && !!b && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height && a.clip === b.clip
        && JSON.stringify(a.scroll) === JSON.stringify(b.scroll)
        && a.scrollContent?.width === b.scrollContent?.width && a.scrollContent?.height === b.scrollContent?.height);

export interface TemplateBinding {
    /** Over the layout's `visible`. */
    visible?: boolean;
    /** Over the layout's caption; a `${key}` in it is still read through the texts. */
    caption?: string;
    /**
     * A text's `ITextWindow.htmlText`, over its caption: drawn and sized as markup (`<b>`, `<font>`,
     * `<br>`) whatever the window's type, and never read as a text key.
     */
    htmlText?: string;
    /**
     * The window is built with its layout caption and `caption` set once it is built, as code that
     * finds the text after `buildFromXML` does (`InventoryMainView.updateCounter`'s `count`): the
     * text's resize then reaches its parent - a `reflect_horizontal_resize_to_parent` border follows
     * its text from the layout's `999` to the count's width.
     */
    setCaptionAfterBuild?: boolean;
    /** Over the layout's `tool_tip_caption`. */
    tooltip?: string;
    /** `IInteractiveWindow.toolTipDelay`: how long, in ms, the pointer rests before the tooltip shows. */
    tooltipDelay?: number;
    /**
     * A text's colour (`ITextWindow.textColor`, `0xRRGGBB`) over its `text_color`; anything else's
     * `IWindow.color` over its `color`. That is `0xAARRGGBB`: a window that fills its background (a
     * `background` container, a `title_bg`) takes its alpha from the top byte, so `0xRRGGBB` there
     * draws nothing - pass `0xFF` in front, as the AS3's colours have it.
     */
    color?: number;
    /**
     * A bitmap's asset, over the layout's `asset_uri` - what code sets with `IBitmapWrapperWindow.bitmap` or `assetUri`;
     * a `badge_image` widget's badge (`BadgeImageWidget.badgeId`), as its image's url.
     */
    asset?: string;
    /** `IWindow.background`: a plain window fills its rect with its colour. */
    background?: boolean;
    /** A bitmap's `pivotPoint` (`IBitmapWrapperWindow.pivotPoint`), over its `pivot_point`: `'center'`, `'bottom center'`... */
    pivot?: PivotPoint;
    /** A bubble's pointer side (`IBubbleWindow.direction`), over its `direction` var. */
    direction?: 'up' | 'down' | 'left' | 'right';
    /** A bitmap's `rotation` in degrees, over its `rotation` var. */
    rotation?: number;
    /** A bitmap's `greyscale`, over its layout's; a `badge_image` widget's `greyscale`. */
    greyscale?: boolean;
    /** Over the layout's `style` (`IWindow.style`) - an icon's icon-set style. */
    style?: string;
    /** `IWindow.blend`, over the layout's - fading the window's children too, where the layout's own blend may not. */
    alpha?: number;
    disabled?: boolean;
    /**
     * `Util.disableSection(window, true)`: disabled, and what it holds drawn at half its blend - a
     * container button's arrows fade with it (`PagedTableView`'s page buttons). Implies `disabled`.
     */
    disableSection?: boolean;
    /** A tab button's or a checkbox's `ISelectableWindow.select()` / `unselect()`. */
    selected?: boolean;
    /** A frame's `helpPage` as its code sets it, over the layout's `help_page` var: a page shows the help button. */
    helpPage?: string;
    /**
     * A template's own `header` window's buttons - a captioned container's header, not a frame's -
     * bound by the names its header layout gives them, `header_button_close` and `header_button_help`
     * (`habbo_window_layout_header_3`), as the window's code handles their clicks by name
     * (`CameraViewFinder`'s `WME_CLICK` on `header_button_close` hides, on `header_button_help` opens
     * `habbopages/camera`). Whether each shows, and its click.
     */
    headerClose?: TemplateHeaderButton;
    headerHelp?: TemplateHeaderButton;
    /** `WME_CLICK`; the event's `currentTarget` is the element's window (`getGlobalRectangle`). */
    onPointerTap?: (event: FederatedPointerEvent) => void;
    /**
     * A markup text's click on an `<a href>`'s glyphs, and only there, with the link (`HTMLTextController.immediateClickHandler`'s
     * `WindowLinkEvent.link`: an `event:` link without its prefix).
     */
    onLink?: (link: string) => void;
    /**
     * `WME_DOUBLE_CLICK`: a second click on the element within `DOUBLE_CLICK_MS` of the first. Both
     * clicks are still `onPointerTap`s, as Flash sends `WME_CLICK` for each before the double click.
     */
    onDoubleClick?: (event: FederatedPointerEvent) => void;
    /** `WME_OVER` / `WME_OUT` on the element. */
    onPointerOver?: (event: FederatedPointerEvent) => void;
    onPointerOut?: (event: FederatedPointerEvent) => void;
    /** `WME_DOWN` / `WME_UP` on the element. */
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    /** An input's text as typed (`WE_CHANGE`); its `caption` is the text it holds. */
    onChange?: (text: string) => void;
    /** An input's Enter (`WKE_KEY_UP` with key code 13). */
    onEnter?: () => void;
    /** A key pressed in an input (`WKE_KEY_DOWN`), by its `KeyboardEvent.key` (`'Escape'`). */
    onKeyDown?: (key: string) => void;
    /** An input losing the focus - a click outside it (`WME_CLICK_AWAY`). */
    onBlur?: () => void;
    /**
     * An input's focus held by its code (`ITextFieldWindow.focus()`): focused exactly while true, and
     * the user's own when left undefined - so code that sets it follows `onFocus` / `onBlur`.
     */
    focused?: boolean;
    /** An input's `ITextFieldWindow.restrict`: the characters it takes (`'0-9'`). */
    restrict?: string;
    /** An input's `ITextFieldWindow.maxChars`, over the layout's `max_chars`; 0 for no limit. */
    maxChars?: number;
    /**
     * `0xRRGGBB`: a text field's background colour - `IWindow.color` on a text or an input, which
     * Flash hands to its `TextField.backgroundColor` (`TextFieldManager.displayError`'s refused field).
     * It fills the field whether or not the layout gives it a `background`.
     */
    backgroundColor?: number;
    /** An item list's `spacing` between its items, over the layout's (`IItemListWindow.spacing`). */
    spacing?: number;
    /** An item grid's `verticalSpacing` between its rows, over its `spacing` (`IItemGridWindow.verticalSpacing`). */
    verticalSpacing?: number;
    /** A scrollable list's `autoHideScrollBar`: `false` keeps its scrollbar, disabled, while its items fit. */
    autoHideScrollBar?: boolean;
    /**
     * A scrollable list's `IScrollableWindow.scrollV`: where its vertical scroll is, 0 at the top to
     * 1 at the bottom (`RewardTrackTaskDetailsView.scrollActiveLevelIntoView`). Applied each time it
     * changes, once the list has laid out the items bound with it.
     */
    scrollV?: number;
    /** An input taking the focus (`WE_FOCUSED`). */
    onFocus?: () => void;
    /** A text's etching colour (`ITextWindow.etchingColor`), `0xAARRGGBB`; 0 for none. */
    etchingColor?: number;
    /** A text's `ITextWindow.etchingPosition`, the side its etching falls on, over its layout's. */
    etchingPosition?: EtchingPosition;
    /** An input's `ITextFieldWindow.italic`. */
    italic?: boolean;
    /** A text's `ITextWindow.underline`, over its layout's. */
    underline?: boolean;
    /**
     * A text cut to its window by the friend bar's `TextCropper.crop`: `...` near its right edge
     * when its first line is wider than the window.
     */
    crop?: boolean;
    /** A drop menu's entries (`IDropMenuWindow.populate`), shown in it as its caption is. */
    options?: readonly string[];
    /** A drop menu's `selection`: the index of the entry it shows. */
    selection?: number;
    /** A drop menu's entry picked (`WE_SELECTED`). */
    onSelect?: (index: number) => void;
    /** A drop menu's `openMenu()`: a new value opens its list, as its code opens it. */
    openRequest?: number;
    /**
     * A list's items that show, by name; every other item of the list is hidden. The AS3 pattern of
     * hiding every list item and showing some (`AvatarMenuView.updateButtons`).
     */
    show?: readonly string[];
    /**
     * The windows the code adds to it (`addChild`) - other templates built with `buildFromXML` and
     * placed by their own `x`/`y` - drawn over its own children.
     */
    children?: ReactNode;
    /**
     * Its children replaced by clones (`destroyListItems`, then `addListItem(template.clone())` for
     * each): laid out as its own, so a list arranges and sizes them. See `TemplateItem`.
     */
    items?: readonly TemplateItem[];
    /**
     * While hidden, still built - drawn invisible - so what the code put in it stays: Flash keeps a
     * hidden window and its children (a room canvas the code keeps feeding while it is hidden).
     * For a window outside a list's flow.
     */
    keepMounted?: boolean;
    /**
     * Clones added after its own children (`addChild` of a window built with `buildFromXML` or
     * cloned), laid out with them - placed by their own rects and their `arrange`.
     */
    added?: readonly TemplateItem[];
}

/** The windows of a laid-out template, found as bindings find elements (a name, or a `/` path). */
export interface TemplateWindows {
    find: (key: string) => LayoutWindow | undefined;
    /** The window itself: the template's root, or the clone. */
    root: () => LayoutWindow | undefined;
}

/**
 * One clone a window's code adds to a list (`IWindow.clone()` of a prototype it took out of the
 * layout, or of another layout's window): `navigator_entry_row_container` once per room.
 */
export interface TemplateItem {
    /** Which item it is, unique in its list: the clone keeps its identity while its key does. */
    key: string;
    /**
     * The prototype: an element of this template, by name or `/` path (found as a binding is, so the
     * first of that name), another template's root window, or a window of another template (what
     * code takes out of a layout it built: `tag_xml`'s `tag_region`).
     */
    from: string | Template | TemplateElement;
    /** What the code sets on the clone, by names found inside it (`clone.findChildByName`). */
    bindings?: TemplateBindings;
    /** What the code sizes and moves on the clone once it is laid out, found inside it. */
    arrange?: (windows: TemplateWindows) => void;
}

/**
 * Bindings by element name, or by a `/`-separated path of names for a lookup scoped to a parent
 * (`panel.findChildByName("name")` is `'panel/name'`), a `#TAG` part for `findChildByTag` (`#bg` finds the `#bg` role tag too); `''` is the window itself - the template's
 * root, or a clone - which code holds rather than finds (`_window.caption`).
 */
export type TemplateBindings = Record<string, TemplateBinding>;

/**
 * Flash `WindowController.findChildByName`: the direct children first, then each child's subtree in
 * turn - the first match wins, so a name used twice finds the one this order reaches first.
 */
export const findTemplateChild = (children: readonly TemplateElement[], name: string): TemplateElement | undefined => findTemplateChildWhere(children, child => child.name === name);

/** `findChildByTag`: the first element, in `findChildByName`'s order, carrying the tag. */
export const findTemplateChildByTag = (children: readonly TemplateElement[], tag: string): TemplateElement | undefined => findTemplateChildWhere(children, child => !!child.tags?.includes(tag));

const findTemplateChildWhere = (children: readonly TemplateElement[], test: (child: TemplateElement) => boolean): TemplateElement | undefined => {
    const direct = children.find(test);

    if (direct) return direct;

    for (const child of children) {
        const found = findTemplateChildWhere(child.children, test);

        if (found) return found;
    }

    return undefined;
};

/**
 * A binding key's element: each `/`-separated name looked up inside the last one's children - a
 * `#TAG` part by its tag (`findChildByTag`), an `@N` part as the N-th child of the last one
 * (`IItemListWindow.getListItemAt(N)`, for the unnamed items a controller reaches by position);
 * `''` the first root.
 */
const findByKey = (elements: readonly TemplateElement[], key: string): TemplateElement | undefined => {
    if (key === '') return elements[0];

    let scope: readonly TemplateElement[] = elements;
    let found: TemplateElement | undefined;

    for (const name of key.split('/')) {
        if (name.startsWith('#')) found = findTemplateChildByTag(scope, name.slice(1)) ?? findTemplateChildByTag(scope, name);
        else if (name.startsWith('@') && (found !== undefined)) found = scope[Number(name.slice(1))];
        // A header's own button, which no element is: the `header` window holding it (`findChildByName`
        // reaches into a header's layout as into any child).
        else found = findTemplateChild(scope, name) ?? (HEADER_BUTTONS[name] ? findTemplateChildWhere(scope, child => child.tag === 'header') : undefined);

        if (!found) return undefined;

        scope = found.children;
    }

    return found;
};

/**
 * Each key's element, and the keys that name none. Depends only on the template and the keys, not
 * on what is bound - so a caller memoises it on the key set and a changed caption walks no tree.
 */
export const resolveTemplateNames = (elements: readonly TemplateElement[], keys: readonly string[]) => {
    const targets = new Map<string, TemplateElement>();
    const missing: string[] = [];

    for (const key of keys) {
        const found = findByKey(elements, key);

        if (found) targets.set(key, found);
        else missing.push(key);
    }

    return { targets, missing };
};

/** A template with its clones made (`TemplateExpander.expand`). */
export interface TemplateExpansion {
    /** The elements with every bound list's children replaced by its clones. */
    elements: TemplateElement[];
    /** Every binding by its element, the clones' included. */
    byElement: Map<TemplateElement, TemplateBinding>;
    /** The keys that name nothing, a clone's prefixed with its path. */
    missing: string[];
    /** Each clone's `arrange` and the clone it finds in, a parent's before its children's. */
    arranges: { scope: TemplateElement; arrange: (windows: TemplateWindows) => void }[];
    /**
     * The window layouts (`Template.skins`) of the templates clones were made from - a catalogue
     * widget's view built into its page - which the page's own template need not carry.
     */
    skins: Record<string, Template>;
}

interface ExpandedNode {
    source: TemplateElement;
    children: TemplateElement[];
    itemKey: string | undefined;
    node: TemplateElement;
}

const sameElements = (a: readonly TemplateElement[], b: readonly TemplateElement[]) => a.length === b.length && a.every((element, index) => element === b[index]);

/**
 * Makes a template's clones and resolves its bindings, each clone's in the clone itself. Keeps what it
 * made between calls: an element is the same object while its source, key and children are, so a
 * memoised view of it and its binding state stay - and the template's own elements are returned as
 * they are wherever nothing under them was cloned.
 */
export class TemplateExpander {
    private _cache = new Map<string, ExpandedNode>();
    private _next = new Map<string, ExpandedNode>();
    private _roots: TemplateElement[] = [];

    public expand(elements: readonly TemplateElement[], bindings: TemplateBindings | undefined): TemplateExpansion {
        const expansion: TemplateExpansion = { elements: [], byElement: new Map(), missing: [], arranges: [], skins: {} };

        this._next = new Map();

        const roots = this.scope(elements, bindings, '', false, undefined, elements, expansion);

        this._cache = this._next;
        this._roots = sameElements(roots, this._roots) ? this._roots : roots;
        expansion.elements = this._roots;

        return expansion;
    }

    /**
     * One scope - the template, or a clone - built from its sources with its bindings: a bound list's
     * children are its items' clones, each a scope of its own. A clone's every element is a new one
     * (`fresh`), as `clone()` copies the window.
     */
    private scope(sources: readonly TemplateElement[], bindings: TemplateBindings | undefined, path: string, fresh: boolean, itemKey: string | undefined, prototypes: readonly TemplateElement[], expansion: TemplateExpansion): TemplateElement[] {
        const { targets, missing } = resolveTemplateNames(sources, Object.keys(bindings ?? {}));
        const bound = bindElements(targets, bindings);

        for (const key of missing) expansion.missing.push(path ? `${path}: ${key}` : key);

        const build = (source: TemplateElement, nodePath: string, key: string | undefined): TemplateElement => {
            const { items, added, ...binding } = bound.get(source) ?? {};
            const clone = (item: TemplateItem): TemplateElement[] => {
                const prototype = typeof item.from === 'string' ? findByKey(prototypes, item.from) : 'tag' in item.from ? item.from : item.from.elements[0];

                if (!prototype) {
                    expansion.missing.push(`${nodePath}#${item.key}: ${typeof item.from === 'string' ? item.from : (item.from.name ?? '')}`);

                    return [];
                }

                if (typeof item.from !== 'string' && !('tag' in item.from) && item.from.skins) Object.assign(expansion.skins, item.from.skins);

                const entry = item.arrange ? { scope: prototype, arrange: item.arrange } : undefined;

                if (entry) expansion.arranges.push(entry);

                const [ made ] = this.scope([ prototype ], item.bindings, `${nodePath}#${item.key}`, true, item.key, prototypes, expansion);

                if (entry) entry.scope = made;

                return [ made ];
            };
            const children = items
                ? items.flatMap(clone)
                : source.children.map((child, index) => build(child, `${nodePath}/${index}`, undefined));

            if (added) children.push(...added.flatMap(clone));
            const node = this.node(nodePath, source, children, fresh, key);

            if (bound.has(source)) expansion.byElement.set(node, binding);

            return node;
        };

        return sources.map((source, index) => build(source, `${path}/${index}`, itemKey));
    }

    private node(path: string, source: TemplateElement, children: TemplateElement[], fresh: boolean, itemKey: string | undefined): TemplateElement {
        if (!fresh && sameElements(children, source.children)) return source;

        const cached = this._cache.get(path);
        const node = cached && cached.source === source && cached.itemKey === itemKey && sameElements(cached.children, children)
            ? cached.node
            : { ...source, children, ...(itemKey !== undefined && { itemKey }) };

        this._next.set(path, { source, children, itemKey, node });

        return node;
    }
}

/** Each binding's element, and the keys that name none. */
export const resolveTemplateBindings = (elements: readonly TemplateElement[], bindings: TemplateBindings | undefined) => {
    const { targets, missing } = resolveTemplateNames(elements, Object.keys(bindings ?? {}));

    return { byElement: bindElements(targets, bindings), missing };
};

/** The bindings by element, from keys already resolved; two keys naming one element are merged. */
export const bindElements = (targets: ReadonlyMap<string, TemplateElement>, bindings: TemplateBindings | undefined) => {
    const byElement = new Map<TemplateElement, TemplateBinding>();

    for (const [ key, binding ] of Object.entries(bindings ?? {})) {
        const element = targets.get(key);

        if (!element) continue;

        // A header's button, bound on the header: its own field, not merged into the header's binding.
        const headerButton = (element.tag === 'header') ? HEADER_BUTTONS[key.split('/').pop() ?? ''] : undefined;

        byElement.set(element, headerButton ? { ...byElement.get(element), [headerButton]: binding } : { ...byElement.get(element), ...binding });
    }

    return byElement;
};

/** The handlers a binding carries: each is handed to the element as one stable function that calls the latest. */
const HANDLERS = [ 'onPointerTap', 'onDoubleClick', 'onPointerOver', 'onPointerOut', 'onPointerDown', 'onPointerUp', 'onChange', 'onEnter', 'onKeyDown', 'onBlur', 'onFocus', 'onSelect', 'onLink' ] as const;

type TemplateHandler = typeof HANDLERS[number];

/**
 * Whether two bindings draw the same: every value equal, `show` by its names, a handler only by
 * whether there is one - the store hands elements a stable handler that calls the latest.
 */
const sameHeaderButton = (a: TemplateHeaderButton | undefined, b: TemplateHeaderButton | undefined): boolean => (a === b) || (!!a && !!b && (a.visible === b.visible) && (!a.onPointerTap === !b.onPointerTap));

export const sameTemplateBinding = (a: TemplateBinding | undefined, b: TemplateBinding | undefined): boolean => {
    if (a === b) return true;
    if (!a || !b) return false;

    return a.visible === b.visible
        && a.caption === b.caption
        && a.htmlText === b.htmlText
        && a.setCaptionAfterBuild === b.setCaptionAfterBuild
        && a.tooltip === b.tooltip
        && a.tooltipDelay === b.tooltipDelay
        && a.asset === b.asset
        && a.greyscale === b.greyscale
        && a.style === b.style
        && a.alpha === b.alpha
        && a.color === b.color
        && a.disabled === b.disabled
        && a.disableSection === b.disableSection
        && a.selected === b.selected
        && a.helpPage === b.helpPage
        && sameHeaderButton(a.headerClose, b.headerClose)
        && sameHeaderButton(a.headerHelp, b.headerHelp)
        && a.autoHideScrollBar === b.autoHideScrollBar
        && a.scrollV === b.scrollV
        && a.spacing === b.spacing
        && a.verticalSpacing === b.verticalSpacing
        && a.italic === b.italic
        && a.underline === b.underline
        && a.crop === b.crop
        && a.restrict === b.restrict
        && a.maxChars === b.maxChars
        && a.backgroundColor === b.backgroundColor
        && a.focused === b.focused
        && a.etchingColor === b.etchingColor
        && a.etchingPosition === b.etchingPosition
        && a.selection === b.selection
        && a.openRequest === b.openRequest
        && (a.options === b.options || (!!a.options && !!b.options && a.options.length === b.options.length && a.options.every((option, index) => option === b.options?.[index])))
        && a.children === b.children
        && a.keepMounted === b.keepMounted
        && a.background === b.background
        && a.pivot === b.pivot
        && a.rotation === b.rotation
        && a.direction === b.direction
        && HANDLERS.every(handler => !a[handler] === !b[handler])
        && (a.show === b.show || (!!a.show && !!b.show && a.show.length === b.show.length && a.show.every((name, index) => name === b.show?.[index])));
};

/** The longest gap between two clicks that makes them a double click (the Windows default Flash Player follows). */
export const DOUBLE_CLICK_MS = 500;

/** What one element of a drawn template reads: its binding, and the rect its window's rules gave it. */
export interface TemplateElementState {
    binding?: TemplateBinding;
    rect?: TemplateRect;
}

/**
 * What a `TemplateView` hands its elements - each one's binding and laid-out rect - each element
 * reading only its own (`useSyncExternalStore`), so a changed caption redraws that one text and not
 * the template.
 *
 * `update` takes a render's bindings and rects: an element whose state draws the same keeps the
 * object it had, and a handler is replaced by one stable function per element that calls the latest
 * - an inline arrow in the caller is new every render and would otherwise count as a change.
 * `commit` tells the elements whose state did change.
 */
export class TemplateBindingStore {
    private _current = new Map<TemplateElement, TemplateElementState>();
    private _latest = new Map<TemplateElement, TemplateBinding>();
    private _handlers = new Map<TemplateElement, Partial<Record<TemplateHandler | HeaderButtonField, (...args: never[]) => void>>>();
    /** When each element was last tapped, for its double click. */
    private _lastTaps = new Map<TemplateElement, number>();
    private _listeners = new Set<() => void>();
    private _changed = false;

    public readonly subscribe = (listener: () => void) => {
        this._listeners.add(listener);

        return () => {
            this._listeners.delete(listener);
        };
    };

    public get(element: TemplateElement): TemplateElementState | undefined {
        return this._current.get(element);
    }

    public update(byElement: ReadonlyMap<TemplateElement, TemplateBinding>, rects: ReadonlyMap<TemplateElement, TemplateRect> = new Map()): void {
        const next = new Map<TemplateElement, TemplateElementState>();

        this._latest = new Map(byElement);

        for (const element of new Set([ ...byElement.keys(), ...rects.keys() ])) {
            const previous = this._current.get(element);
            const binding = byElement.get(element);
            const stableBinding = binding && (HANDLERS.some(handler => binding[handler]) || HEADER_BUTTON_FIELDS.some(field => binding[field]?.onPointerTap)) ? this.stabilise(element, binding) : binding;
            const rect = rects.get(element);
            const keptBinding = sameTemplateBinding(previous?.binding, stableBinding) ? previous?.binding : stableBinding;
            const keptRect = sameTemplateRect(previous?.rect, rect) ? previous?.rect : rect;

            next.set(element, previous && previous.binding === keptBinding && previous.rect === keptRect ? previous : { binding: keptBinding, rect: keptRect });
        }

        this._changed ||= next.size !== this._current.size || [ ...next ].some(([ element, state ]) => this._current.get(element) !== state);
        this._current = next;
    }

    /** Tells the elements to read again, when `update` changed anything since the last commit. */
    public commit(): void {
        if (!this._changed) return;

        this._changed = false;

        for (const listener of this._listeners) listener();
    }

    /** The binding with each of its handlers swapped for the element's stable one. */
    private stabilise(element: TemplateElement, binding: TemplateBinding): TemplateBinding {
        const stable = { ...binding };

        for (const handler of HANDLERS) {
            if (binding[handler]) Object.assign(stable, { [handler]: this.handlerFor(element, handler) });
        }

        // A double click is told by the element's taps, so an element that only double-clicks taps too.
        if (binding.onDoubleClick) stable.onPointerTap = this.handlerFor(element, 'onPointerTap');

        // A header's buttons: each click one stable function too, calling the latest.
        for (const field of HEADER_BUTTON_FIELDS) {
            const button = binding[field];

            if (button?.onPointerTap) stable[field] = { ...button, onPointerTap: this.headerHandlerFor(element, field) };
        }

        return stable;
    }

    private headerHandlerFor(element: TemplateElement, field: HeaderButtonField): () => void {
        let handlers = this._handlers.get(element);

        if (!handlers) {
            handlers = {};
            this._handlers.set(element, handlers);
        }

        return handlers[field] ??= () => this._latest.get(element)?.[field]?.onPointerTap?.();
    }

    private handlerFor(element: TemplateElement, kind: TemplateHandler): (...args: never[]) => void {
        let handlers = this._handlers.get(element);

        if (!handlers) {
            handlers = {};
            this._handlers.set(element, handlers);
        }

        if (kind === 'onPointerTap') return handlers[kind] ??= (event: FederatedPointerEvent) => this.tap(element, event);

        return handlers[kind] ??= (...args: never[]) => {
            const handler: ((...latest: never[]) => void) | undefined = this._latest.get(element)?.[kind];

            handler?.(...args);
        };
    }

    /** The element's click, and its double click when it is the second within `DOUBLE_CLICK_MS`. */
    private tap(element: TemplateElement, event: FederatedPointerEvent): void {
        const latest = this._latest.get(element);

        latest?.onPointerTap?.(event);

        if (!latest?.onDoubleClick) {
            this._lastTaps.delete(element);

            return;
        }

        const now = performance.now();
        const last = this._lastTaps.get(element);

        if ((last !== undefined) && ((now - last) <= DOUBLE_CLICK_MS)) {
            this._lastTaps.delete(element);
            latest.onDoubleClick(event);

            return;
        }

        this._lastTaps.set(element, now);
    }
}
