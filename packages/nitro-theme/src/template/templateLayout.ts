/**
 * Where each element of a template ends up once its window's rules have run: the rect a
 * `WindowController` settles on after `WindowParser` builds it, rather than the rect its XML gives.
 *
 * It ports the part of Flash's window system that decides where windows end up, so a template is
 * laid out by the same rules and in the same order: `WindowController`'s rectangle, parent/child
 * and resize events, the text controllers' auto sizing, `ItemListController`'s arrangement and a
 * frame's content area - built the way `WindowParser.parseSingleWindowEntity` builds a layout.
 *
 * Only what moves or sizes a window is kept: no drawing, graphics contexts, mouse or dynamic
 * styles. The "pre" events (`WINDOW_EVENT_RESIZE`, `RELOCATE`) are left out, as nothing here
 * prevents them. Each window type's own skin layout (`WindowFactory` element descriptions) is left
 * to the theme's components, except a frame's content area, which children are placed in.
 *
 * Not yet: a selector list's items (the renderer flows them), a text's layout while its caption is
 * still empty, and a standalone scrollbar scrolling a text.
 *
 * Kept free of runtime imports so it runs under Node as it stands.
 */
import type { TemplateElement, TemplateValue } from './templateData';

export interface TemplateRect {
    x: number;
    y: number;
    width: number;
    height: number;
    /** The window clips its children (`clipping`, true by default) and one reaches outside it: the renderer masks it. */
    clip?: boolean;
    /** A scrollable list's or grid's parts, which the renderer scrolls its items in. */
    scroll?: TemplateScroll;
    /**
     * An item list or grid a standalone scrollbar scrolls (`linkTemplateScrollbars`): its items' extent
     * (`scrollableRegion`), which the renderer scrolls in the list's own rect (`visibleRegion`).
     */
    scrollContent?: { width: number; height: number };
}

/**
 * A scrollable window's parts as its window layout placed them, in its own coordinates: the inner list
 * its items scroll in, the scrollbar while it shows, and the items' extent - the list's content.
 */
export interface TemplateScroll {
    viewport: { x: number; y: number; width: number; height: number };
    scrollbar?: { x: number; y: number; width: number; height: number; style?: string };
    content: { width: number; height: number };
}

/** A text field's size as Flash lays it out: `TextField.width` / `height`, gutters included. */
export interface TemplateTextSize {
    width: number;
    height: number;
    /** `TextField.textWidth`: the text alone, without the gutters. */
    textWidth?: number;
    /** `TextField.textHeight`: the text's lines alone, without the gutters. */
    textHeight?: number;
}

export interface TemplateLayoutInput {
    /** The text an element shows: its bound or layout caption, texts resolved. */
    captionOf: (element: TemplateElement) => string;
    /**
     * The caption an element is built with when its code sets `captionOf`'s only once the window is
     * built (`TemplateBinding.setCaptionAfterBuild`): its layout caption. The change then reaches its
     * parents as any later resize does - a reflected width, a list re-arranged.
     */
    builtCaptionOf?: (element: TemplateElement) => string | undefined;
    /** The text field of `text` in `element`'s style; `wrapWidth` is the field's width when it wraps. */
    measure: (element: TemplateElement, text: string, wrapWidth: number | undefined) => TemplateTextSize | undefined;
    /** Whether the element shows: its binding or list `show` over the layout's `visible`. */
    visibleOf?: (element: TemplateElement) => boolean;
    /** A composite window's window layout (`Template.skins`, by `<type>:<style>` - `templateSkinKey`); without one it is laid out as its plain kind. */
    skinOf?: (element: TemplateElement) => { width: number; height: number; elements: TemplateElement[] } | undefined;
    /** The lists a standalone scrollbar scrolls, whose content extent their rects carry (`scrollContent`). */
    scrollTargets?: ReadonlySet<TemplateElement>;
    /**
     * What a clone's code does once the clone is built and before its own clones are added to it
     * (`container.height = ...`, then `roomList.addListItem(...)`): run as each clone is made.
     */
    setupOf?: (element: TemplateElement) => ((windowOf: (element: TemplateElement) => LayoutWindow | undefined) => void) | undefined;
    /** An item list's `IItemListWindow.spacing` as its code sets it, over the layout's `spacing`. */
    spacingOf?: (element: TemplateElement) => number | undefined;
    /** An item grid's `IItemGridWindow.verticalSpacing` as its code sets it: the gap between its rows. */
    verticalSpacingOf?: (element: TemplateElement) => number | undefined;
    /** A scrollable list's `IScrollableListWindow.autoHideScrollBar`: `false` keeps its scrollbar while its items fit. */
    autoHideScrollBarOf?: (element: TemplateElement) => boolean;
    /**
     * A button's window layout (`habbo_window_layout_button*`): its size and its `_BTN_TEXT` label's
     * text style and `margins`. Without one the button keeps its layout rect.
     */
    buttonLabelOf?: (element: TemplateElement) => TemplateButtonLabel | undefined;
    /** A bitmap window's bitmap size, once it is loaded; `undefined` while it is not. */
    bitmapSizeOf?: (element: TemplateElement) => { width: number; height: number } | undefined;
}

/** A button's `_BTN_TEXT` label as its window layout gives it, in a layout of `width` x `height`. */
export interface TemplateButtonLabel {
    width: number;
    height: number;
    textStyle: string;
    margins: { left: number; top: number; right: number; bottom: number };
}

/** `WindowParam`'s layout bits. */
const P = {
    parentGraphics: 16,
    boundToParent: 32,
    hMove: 64,
    hStretch: 128,
    hCenter: 192,
    vMove: 1024,
    vStretch: 2048,
    vCenter: 3072,
    resizeShrink: 16384,
    expandToAccommodate: 131072,
    resizeToAccommodate: 147456,
    alignRight: 262144,
    alignCenter: 786432,
    alignBottom: 1048576,
    alignMiddle: 3145728,
    reflectH: 4194304,
    reflectV: 8388608,
    reflect: 12582912,
} as const;

/**
 * `use_parent_graphic_context`: the window draws into its parent's graphic context - under the
 * parent's clip - rather than a display object of its own.
 */
export const templateUsesParentGraphics = (element: TemplateElement): boolean => !!element.params?.parentGraphics;

/** An element's layout params as the `uint` `WindowParser` read, rebuilt from its decoded `params`. */
export const templateParamBits = (element: TemplateElement): number => {
    const params = element.params;

    if (!params) return 0;

    let bits = 0;
    const scale = { fixed: 0, move: 1, stretch: 2, center: 3 };

    if (params.parentGraphics) bits |= P.parentGraphics;
    if (params.boundToParent) bits |= P.boundToParent;
    if (params.scale) bits |= (scale[params.scale[0]] << 6) | (scale[params.scale[1]] << 10);
    if (params.accommodate) bits |= params.accommodate === 'resize' ? P.resizeToAccommodate : P.expandToAccommodate;
    if (params.unnamedBits?.includes(14)) bits |= P.resizeShrink;
    if (params.align?.[0] === 'right') bits |= P.alignRight;
    if (params.align?.[0] === 'center') bits |= P.alignCenter;
    if (params.align?.[1] === 'bottom') bits |= P.alignBottom;
    if (params.align?.[1] === 'middle') bits |= P.alignMiddle;
    if (params.reflectToParent?.[0]) bits |= P.reflectH;
    if (params.reflectToParent?.[1]) bits |= P.reflectV;

    return bits >>> 0;
};

type WindowEventType = 'RESIZED' | 'RELOCATED' | 'PARENT_ADDED' | 'PARENT_RESIZED' | 'CHILD_ADDED' | 'CHILD_REMOVED' | 'CHILD_RESIZED' | 'CHILD_RELOCATED';

/** AS3's `int(...)` of a coordinate: towards zero. */
const int = (value: number) => Math.trunc(value);

/** `WindowController`: a window's rect, its parent and children, and the events that move them. */
export class LayoutWindow {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    /** `_previousRect`: the rect before the last move or resize. */
    public previous: TemplateRect;
    /** `_Str_5110`: the parent's rect a relative scale measures its change from. */
    public parentRect: TemplateRect = { x: 0, y: 0, width: 0, height: 0 };
    public param: number;
    public parent: LayoutWindow | undefined;
    public children: LayoutWindow[] = [];
    public visible = true;
    public minWidth = -Infinity;
    public maxWidth = Infinity;
    public minHeight = -Infinity;
    public maxHeight = Infinity;
    public readonly element: TemplateElement | undefined;
    /** A frame's content area: the `Frame` component places its children in it, so a rect is given within it. */
    public frameContent = false;
    /** A part of a composite window's window layout (a scrollable list's `_ITEMLIST`): no element of the template. */
    public skinPart = false;
    /** A scrollable window's content: its items' rects are given within it, which the renderer scrolls. */
    public scrollContent = false;

    /**
     * The constructor with a parent sets `_parent` first, so the `addChild` it makes finds the
     * parent already set and no `WINDOW_EVENT_PARENT_ADDED` follows - only the parent's
     * `WINDOW_EVENT_CHILD_ADDED`.
     */
    constructor(element: TemplateElement | undefined, rect: TemplateRect, param: number, parent?: LayoutWindow) {
        this.element = element;
        this.x = int(rect.x);
        this.y = int(rect.y);
        this.width = int(rect.width);
        this.height = int(rect.height);
        this.previous = { x: this.x, y: this.y, width: this.width, height: this.height };
        this.param = param;

        if (parent) {
            this.parent = parent;
            parent.addChild(this);
        }
    }

    /** Whether the type has an `iterator` (`ContainerController` and its kin): its XML children are pushed onto it. */
    public get iterable(): boolean {
        return !!this.element && ITERABLE_TAGS.has(this.element.tag);
    }

    public get rect(): TemplateRect {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    /** `testParamFlag(flag, mask)`: every bit of `flag` set - within `mask`, exactly `flag`. */
    public testParam(flag: number, mask = 0): boolean {
        return mask > 0 ? ((this.param & mask) ^ flag) === 0 : (this.param & flag) === flag;
    }

    public setParamFlag(flag: number, on: boolean): void {
        this.param = (on ? (this.param | flag) : (this.param & ~flag)) >>> 0;
    }

    /** `ContainerIterator`: an XML child pushed onto this window - added as its child. */
    public push(child: LayoutWindow): void {
        this.addChildAt(child, this.children.length);
    }

    public addChild(child: LayoutWindow): LayoutWindow {
        return this.addChildAt(child, this.children.length);
    }

    public addChildAt(child: LayoutWindow, index: number): LayoutWindow {
        if (child.parent) child.parent.removeChild(child);

        this.children.splice(index, 0, child);
        child.setParent(this);
        this.update(this, 'CHILD_ADDED', child);

        return child;
    }

    public removeChild(child: LayoutWindow): LayoutWindow | undefined {
        const index = this.children.indexOf(child);

        if (index < 0) return undefined;

        this.children.splice(index, 1);
        child.setParent(undefined);
        this.update(this, 'CHILD_REMOVED', child);

        return child;
    }

    /** `set parent`: a new parent is remembered with its rect, and the window hears it was added. */
    public setParent(parent: LayoutWindow | undefined): void {
        if (this.parent === parent) return;

        this.parent = parent;

        if (parent) {
            this.parentRect = parent.rect;
            this.previous = this.rect;
            this.update(this, 'PARENT_ADDED');
        } else {
            this.parentRect = { x: 0, y: 0, width: 0, height: 0 };
        }
    }

    public setX(x: number): void {
        if (int(x) !== this.x) this.setRectangle(x, this.y, this.width, this.height);
    }

    public setY(y: number): void {
        if (int(y) !== this.y) this.setRectangle(this.x, y, this.width, this.height);
    }

    public setWidth(width: number): void {
        if (int(width) !== this.width) this.setRectangle(this.x, this.y, width, this.height);
    }

    public setHeight(height: number): void {
        if (int(height) !== this.height) this.setRectangle(this.x, this.y, this.width, height);
    }

    public offset(dx: number, dy: number): void {
        this.setRectangle(this.x + dx, this.y + dy, this.width, this.height);
    }

    /** `WindowRectLimits.limit`: the window's size clamped to its limits. */
    public limit(): void {
        if (this.width < this.minWidth) this.setWidth(this.minWidth);
        else if (this.width > this.maxWidth) this.setWidth(this.maxWidth);

        if (this.height < this.minHeight) this.setHeight(this.minHeight);
        else if (this.height > this.maxHeight) this.setHeight(this.maxHeight);
    }

    /**
     * `WindowController.setRectangle`: the limits; then, when the size changes and the position does
     * not, the `on_resize_align_*` params keeping the edge they name; then `bound_to_parent_rect`;
     * then the move and resize, and their events.
     */
    public setRectangle(x: number, y: number, width: number, height: number): void {
        x = int(x);
        y = int(y);
        width = int(width);
        height = int(height);
        height = Math.min(this.maxHeight, Math.max(this.minHeight, height));
        width = Math.min(this.maxWidth, Math.max(this.minWidth, width));

        let moved = x !== this.x || y !== this.y;
        let resized = width !== this.width || height !== this.height;

        if (resized && !moved) {
            const alignH = this.param & P.alignCenter;
            const alignV = this.param & P.alignMiddle;

            if (alignH === P.alignCenter) {
                x = int(x - ((width - this.width) / 2));
                moved = true;
            } else if (alignH === P.alignRight) {
                x = x - (width - this.width);
                moved = true;
            }

            if (alignV === P.alignMiddle) {
                y = int(y - ((height - this.height) / 2));
                moved = true;
            } else if (alignV === P.alignBottom) {
                y = y - (height - this.height);
                moved = true;
            }
        }

        if (this.testParam(P.boundToParent) && this.parent) {
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;

            if (moved) {
                x -= (x + width) > this.parent.width ? (x + width) - this.parent.width : 0;
                y -= (y + height) > this.parent.height ? (y + height) - this.parent.height : 0;
                moved = x !== this.x || y !== this.y;
            } else {
                width -= (x + width) > this.parent.width ? (x + width) - this.parent.width : 0;
                height -= (y + height) > this.parent.height ? (y + height) - this.parent.height : 0;
                resized = width !== this.width || height !== this.height;
            }
        }

        if (!moved && !resized) return;

        if (moved) {
            this.previous = this.rect;
            this.x = x;
            this.y = y;
        }

        if (resized) {
            this.previous = { ...this.previous, width: this.width, height: this.height };
            this.width = width;
            this.height = height;
        }

        if (moved) this.update(this, 'RELOCATED');
        if (resized) this.update(this, 'RESIZED');
    }

    /** `WindowController.update`: the events that move and size windows. */
    public update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        switch (type) {
            case 'RESIZED': {
                if (source !== this) return;

                for (const child of [ ...this.children ]) child.update(this, 'PARENT_RESIZED');

                if (this.testParam(P.hCenter, P.hCenter) || this.testParam(P.vCenter, P.vCenter)) this.relativeScale();

                if (this.parent) {
                    const saved = this.param;

                    this.param = (this.param & ~(P.hCenter | P.vCenter)) >>> 0;

                    if (this.testParam(P.reflectH)) this.parent.setWidth(this.parent.width + (this.width - this.previous.width));
                    if (this.testParam(P.reflectV)) this.parent.setHeight(this.parent.height + (this.height - this.previous.height));

                    this.param = saved;
                    this.parent.update(this, 'CHILD_RESIZED', this);
                }

                return;
            }
            case 'RELOCATED':
                if (source === this && this.parent) this.parent.update(this, 'CHILD_RELOCATED', this);

                return;
            case 'PARENT_ADDED':
                if (this.testParam(P.hCenter, P.hCenter) || this.testParam(P.vCenter, P.vCenter)) this.relativeScale();

                return;
            case 'PARENT_RESIZED':
                if (this.parent) this.parentRect = { ...this.parent.previous };

                this.relativeScale();

                return;
            case 'CHILD_ADDED':
            case 'CHILD_RESIZED':
            case 'CHILD_RELOCATED':
                if (this.testParam(P.resizeToAccommodate)) this.resizeToAccommodateChildren();
                else if (this.testParam(P.expandToAccommodate) && related) this.expandToAccommodate(related);

                return;
            case 'CHILD_REMOVED':
                if (this.testParam(P.resizeToAccommodate)) this.resizeToAccommodateChildren();
        }
    }

    /**
     * `WindowController._Str_10618`: a window following its parent's change of size since
     * `parentRect` - moved or stretched by it, or centred in the parent - with the centring and
     * reflect params cleared for the `setRectangle` it makes; or, with no relative scale, kept
     * inside a parent it is bound to.
     */
    public relativeScale(): void {
        if (!this.parent) return;

        const horizontal = !this.testParam(0, P.hCenter);
        const vertical = !this.testParam(0, P.vCenter);
        let { x, y, width, height } = this;

        if (horizontal || vertical) {
            if (horizontal) {
                const change = this.parent.width - this.parentRect.width;
                const scale = this.param & P.hCenter;

                if (scale === P.hStretch) width += change;
                else if (scale === P.hMove) x += change;
                else if (scale === P.hCenter) x = (this.parent.width < width && this.testParam(P.parentGraphics)) ? 0 : Math.floor(this.parent.width / 2) - Math.floor(width / 2);
            }

            if (vertical) {
                const change = this.parent.height - this.parentRect.height;
                const scale = this.param & P.vCenter;

                if (scale === P.vStretch) height += change;
                else if (scale === P.vMove) y += change;
                else if (scale === P.vCenter) y = (this.parent.height < height && this.testParam(P.parentGraphics)) ? 0 : Math.floor(this.parent.height / 2) - Math.floor(height / 2);
            }

            const saved = this.param;

            this.param = (this.param & ~(P.reflect | P.hCenter | P.vCenter)) >>> 0;
            this.setRectangle(x, y, width, height);
            this.param = saved;

            return;
        }

        if (this.testParam(P.boundToParent)) {
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            x -= (x + width) > this.parent.width ? (x + width) - this.parent.width : 0;
            y -= (y + height) > this.parent.height ? (y + height) - this.parent.height : 0;
            width -= (x + width) > this.parent.width ? (x + width) - this.parent.width : 0;
            height -= (y + height) > this.parent.height ? (y + height) - this.parent.height : 0;

            if (x !== this.x || y !== this.y || width !== this.width || height !== this.height) {
                const saved = this.param;

                this.param = (this.param & ~(P.reflect | P.hCenter | P.vCenter)) >>> 0;
                this.setRectangle(x, y, width, height);
                this.param = saved;
            }
        }
    }

    /**
     * `WindowController._Str_14067` (`resize_to_accommodate_children`): the window takes its
     * children's extent from its own origin - growing or shrinking - moved by any child left or above
     * it, the children offset back, their centring held off meanwhile. Only the children that show
     * count (`scaleToAccommodateChildren`'s `visible` checks): a hidden button takes no room.
     */
    public resizeToAccommodateChildren(): void {
        if (!this.children.length) return;

        let left = 0;
        let top = 0;
        let right = 0;
        let bottom = 0;
        let changed = false;

        for (const child of this.children) {
            if (child.visible && (child.x < left)) {
                right -= child.x - left;
                left = child.x;
                changed = true;
            }

            if (child.visible && (child.x + child.width > right)) {
                right = child.x + child.width;
                changed = true;
            }

            if (child.visible && (child.y < top)) {
                bottom -= child.y - top;
                top = child.y;
                changed = true;
            }

            if (child.visible && (child.y + child.height > bottom)) {
                bottom = child.y + child.height;
                changed = true;
            }
        }

        if (!changed) return;

        const own = this.param & (P.expandToAccommodate | P.resizeToAccommodate);
        const centring = this.children.map((child) => {
            const bits = child.param & (P.hCenter | P.vCenter);

            child.setParamFlag(bits, false);

            return bits;
        });

        if (own) this.setParamFlag(own, false);

        this.setRectangle(this.x + left, this.y + top, right, bottom);

        for (const [ index, child ] of [ ...this.children ].entries()) {
            child.offset(-left, -top);
            child.setParamFlag(centring[index] ?? 0, true);
        }

        if (own) this.setParamFlag(own, true);
    }

    /**
     * The static `WindowController.resizeToAccommodateChildren`: the window as wide and as high as its
     * shown children's right and bottom edges reach from its own origin - growing or shrinking, never
     * moved - its own accommodate params held off meanwhile.
     */
    public sizeToChildren(): void {
        let right = Number.MIN_SAFE_INTEGER;
        let bottom = Number.MIN_SAFE_INTEGER;
        let changed = false;

        for (const child of this.children) {
            if (child.visible && ((child.x + child.width) > right)) {
                right = child.x + child.width;
                changed = true;
            }

            if (child.visible && ((child.y + child.height) > bottom)) {
                bottom = child.y + child.height;
                changed = true;
            }
        }

        if (!changed) return;

        const own = this.param & (P.expandToAccommodate | P.resizeToAccommodate);

        if (own) this.setParamFlag(own, false);

        this.setWidth(right);
        this.setHeight(bottom);

        if (own) this.setParamFlag(own, true);
    }

    /**
     * `FrameController.resizeToFitContent`: the frame's content area sized to its children
     * (`sizeToChildren`), which the content's reflect params pass on to the frame, within its limits.
     */
    public resizeToFitContent(): void {
        this.children.find(child => child.frameContent)?.sizeToChildren();
    }

    /**
     * `WindowController._Str_9294` (`expand_to_accommodate_children`): the window grows - never
     * shrinks - to take in `child`, moved by any part of it left or above, the children offset back.
     */
    public expandToAccommodate(child: LayoutWindow): void {
        let dx = 0;
        let dy = 0;
        let width = this.width;
        let height = this.height;
        let changed = false;

        if (child.x < 0) {
            dx = child.x;
            width -= dx;
            child.x = 0;
            changed = true;
        }

        if (child.x + child.width > width) {
            width = child.x + child.width;
            changed = true;
        }

        if (child.y < 0) {
            dy = child.y;
            height -= dy;
            child.y = 0;
            changed = true;
        }

        if (child.y + child.height > height) {
            height = child.y + child.height;
            changed = true;
        }

        if (!changed) return;

        const own = this.param & (P.expandToAccommodate | P.resizeToAccommodate);

        if (own) this.setParamFlag(own, false);

        this.setRectangle(this.x + dx, this.y + dy, width, height);

        if (dx !== 0 || dy !== 0) {
            for (const other of [ ...this.children ]) {
                if (other !== child) other.offset(-dx, -dy);
            }
        }

        if (own) this.setParamFlag(own, true);
    }

    /** `ITextWindow.textWidth`: the width of a text window's text; 0 for any other window. */
    public get textWidth(): number {
        return 0;
    }

    /**
     * `IItemListWindow.scrollableRegion`: the extent of a list's items - its inner container, which it
     * sizes to the items it places. Any other window's is its own size.
     */
    public get scrollableRegion(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    /** `ITextWindow.textHeight`: the height of a text window's text; 0 for any other window. */
    public get textHeight(): number {
        return 0;
    }

    /** A caption set on the window (`WindowController.caption`): the text controllers lay theirs out. */
    public setCaption(_caption: string, _input: TemplateLayoutInput): void {}

    /**
     * `IBoxSizerWindow.setAutoRearrange`: whether a box sizer lays its children out again as they
     * change. Off, its children stay where its code puts them; on again, it lays them out at once.
     * Nothing for any other window.
     */
    public setAutoRearrange(_on: boolean): void {}
}

/** The window types that have an `iterator` - `ContainerController` and those built on it. */
const ITERABLE_TAGS = new Set([
    'background', 'border', 'boxsizer', 'bubble', 'container', 'container_button', 'droplist', 'droplist_item', 'frame', 'header',
    'itemlist', 'itemlist_horizontal', 'itemlist_vertical', 'itemgrid', 'itemgrid_horizontal', 'itemgrid_vertical', 'region',
    'scrollable_itemlist_vertical', 'scrollable_itemgrid_vertical', 'selector', 'selector_list', 'tab_container_button', 'tab_content',
    'tab_context', 'tab_selector', 'widget',
]);

const flashBool = (value: TemplateValue | undefined) => value === true || value === 'true';

/**
 * A text window's margins (`TextLabelController.margins`, `TextController`'s): its `margins` map
 * (`setTextMarginMap`) and its `margin_left` / `_top` / `_right` / `_bottom` properties, each side
 * as `int(...)`.
 */
export const templateTextMargins = (element: TemplateElement): { left: number; top: number; right: number; bottom: number } => {
    const margins = element.vars.margins;
    const side = (key: 'left' | 'top' | 'right' | 'bottom') => {
        const own = element.vars[`margin_${key}`];

        if (own !== undefined) return int(Number(own) || 0);

        return (margins && typeof margins === 'object' && !Array.isArray(margins)) ? int(Number(margins[key]) || 0) : 0;
    };

    return { left: side('left'), top: side('top'), right: side('right'), bottom: side('bottom') };
};

const marginsOf = (element: TemplateElement) => {
    const { left, top, right, bottom } = templateTextMargins(element);

    return { horizontal: left + right, vertical: top + bottom };
};

/** A text's width as its field lays it out: `textWidth`, or the field less its two 2px gutters. */
const measuredTextWidth = (element: TemplateElement | undefined, caption: string, input: TemplateLayoutInput | undefined, wrapWidth: number | undefined): number => {
    const field = element && input && caption ? input.measure(element, caption, wrapWidth) : undefined;

    return field ? (field.textWidth ?? Math.max(0, field.width - 4)) : 0;
};

/** A text's height as its field lays it out: `textHeight`, or the field less its two 2px gutters. */
const measuredTextHeight = (element: TemplateElement | undefined, caption: string, input: TemplateLayoutInput | undefined, wrapWidth: number | undefined): number => {
    const field = element && input && caption ? input.measure(element, caption, wrapWidth) : undefined;

    return field ? (field.textHeight ?? Math.max(0, field.height - 4)) : 0;
};

/** `TextLabelController`: the window takes its text field's size on every `refresh`. */
class LabelWindow extends LayoutWindow {
    private _caption = '';
    private _input: TemplateLayoutInput | undefined;
    private _refreshing = false;

    public override setCaption(caption: string, input: TemplateLayoutInput): void {
        this._caption = caption;
        this._input = input;
        this.refresh();
    }

    public override get textWidth(): number {
        return measuredTextWidth(this.element, this._caption, this._input, undefined);
    }

    public override get textHeight(): number {
        return measuredTextHeight(this.element, this._caption, this._input, undefined);
    }

    /** `TextLabelController.refresh`. */
    public refresh(): void {
        if (this._refreshing || !this.element || !this._input || !this._caption) return;

        const field = this._input.measure(this.element, this._caption, undefined);

        if (!field) return;

        this._refreshing = true;

        const margins = marginsOf(this.element);
        const fieldWidth = Math.floor(field.width);
        const fieldHeight = Math.floor(field.height);
        const innerWidth = this.width - margins.horizontal;
        const innerHeight = this.height - margins.vertical;

        if (fieldWidth !== innerWidth) this.setRectangle(this.x, this.y, fieldWidth + margins.horizontal, fieldHeight + margins.vertical);
        if (fieldHeight > innerHeight) this.setRectangle(this.x, this.y, fieldWidth + margins.horizontal, fieldHeight + margins.vertical);

        this._refreshing = false;
    }
}

/**
 * `TextController`: with an `auto_size` other than `none` the field follows the text - `left` takes
 * its width (unless it wraps) and height, `center` and `right` its height - and a resize from outside is followed by
 * one (`setRectangle` sets `autoSize` to `none` and back, which refreshes).
 */
class TextWindow extends LayoutWindow {
    private _caption = '';
    private _input: TemplateLayoutInput | undefined;
    private _refreshing = false;

    private get autoSize(): string {
        const value = this.element?.vars.auto_size;

        return typeof value === 'string' ? value : 'none';
    }

    public override setCaption(caption: string, input: TemplateLayoutInput): void {
        this._caption = caption;
        this._input = input;
        this.refreshTextImage();
    }

    public override get textWidth(): number {
        const element = this.element;
        const wraps = !!element && flashBool(element.vars.word_wrap);

        return measuredTextWidth(element, this._caption, this._input, wraps && element ? Math.max(1, this.width - marginsOf(element).horizontal) : undefined);
    }

    public override get textHeight(): number {
        const element = this.element;
        const wraps = !!element && flashBool(element.vars.word_wrap);

        return measuredTextHeight(element, this._caption, this._input, wraps && element ? Math.max(1, this.width - marginsOf(element).horizontal) : undefined);
    }

    public override setRectangle(x: number, y: number, width: number, height: number): void {
        super.setRectangle(x, y, width, height);

        if (!this._refreshing && this.autoSize !== 'none') this.refreshTextImage();
    }

    /** `TextController.refreshTextImage`. */
    public refreshTextImage(): void {
        const autoSize = this.autoSize;

        if (this._refreshing || !this.element || !this._input || !this._caption || autoSize === 'none') return;

        const margins = marginsOf(this.element);
        const wraps = flashBool(this.element.vars.word_wrap);
        const field = this._input.measure(this.element, this._caption, wraps ? Math.max(1, this.width - margins.horizontal) : undefined);

        if (!field) return;

        this._refreshing = true;

        const innerWidth = this.width - margins.horizontal;
        const innerHeight = this.height - margins.vertical;
        // A word-wrapped `TextField` keeps its width under `autoSize`, only its height follows the text.
        const fieldWidth = wraps ? innerWidth : Math.floor(field.width);
        const fieldHeight = Math.floor(field.height);

        if (fieldWidth !== innerWidth && autoSize === 'left') this.setRectangle(this.x, this.y, fieldWidth + margins.horizontal, fieldHeight + margins.vertical);
        if (fieldHeight !== innerHeight) this.setHeight(fieldHeight + margins.vertical);

        this._refreshing = false;
    }
}

/** The `TextFieldController` types: `html` (`HTMLTextController`), `input`, `password`. */
const FIELD_TAGS = new Set([ 'html', 'input', 'password' ]);

/**
 * `TextFieldController`: the window is its text field, with no margins. With an `auto_size` other than
 * `none` the field follows the text as a Flash `TextField` does - unwrapped, its width and height,
 * keeping its left edge, centre or right edge as `auto_size` names; wrapped, its height - and the
 * window takes the field's rect (`_Str_18556`, `refreshTextImage`). A resize from outside sets the
 * field's size, which it then fits to its text again.
 */
class TextFieldWindow extends LayoutWindow {
    private _caption = '';
    private _input: TemplateLayoutInput | undefined;
    private _refreshing = false;

    private get autoSize(): string {
        const value = this.element?.vars.auto_size;

        return typeof value === 'string' ? value : 'none';
    }

    private get wraps(): boolean {
        return !!this.element && flashBool(this.element.vars.word_wrap);
    }

    public override setCaption(caption: string, input: TemplateLayoutInput): void {
        this._caption = caption;
        this._input = input;
        this.refreshTextImage();
    }

    public override get textWidth(): number {
        return measuredTextWidth(this.element, this._caption, this._input, this.wraps ? Math.max(1, this.width) : undefined);
    }

    public override get textHeight(): number {
        return measuredTextHeight(this.element, this._caption, this._input, this.wraps ? Math.max(1, this.width) : undefined);
    }

    public override setRectangle(x: number, y: number, width: number, height: number): void {
        super.setRectangle(x, y, width, height);

        if (!this._refreshing && this.autoSize !== 'none') this.refreshTextImage();
    }

    /** The field fitted to its text, the window to the field. */
    public refreshTextImage(): void {
        const autoSize = this.autoSize;

        if (this._refreshing || !this.element || !this._input || !this._caption || autoSize === 'none') return;

        const wraps = this.wraps;
        const field = this._input.measure(this.element, this._caption, wraps ? Math.max(1, this.width) : undefined);

        if (!field) return;

        const width = wraps ? this.width : Math.floor(field.width);
        const height = Math.floor(field.height);

        if (width === this.width && height === this.height) return;

        // An unwrapped field keeps the edge, or the centre, its `autoSize` names.
        const shift = wraps ? 0 : autoSize === 'center' ? (this.width - width) / 2 : autoSize === 'right' ? this.width - width : 0;

        this._refreshing = true;
        this.setRectangle(this.x + shift, this.y, width, height);
        this._refreshing = false;
    }
}

/**
 * `ItemListController`: its items in an inner `_CONTAINER`, one after another along the list with
 * `spacing` between, only the visible ones placed; with `resize_on_item_update` the container's
 * change of length is reflected to the list.
 */
/** What an item list is made with, over what its element's variables and type give. */
interface ListOptions {
    horizontal?: boolean;
    spacing?: number;
    scaleToFit?: boolean;
    /**
     * The axis `resize_on_item_update` reflects the container's change on: the list's own as the
     * `ItemListController` constructor sets it - which `ItemGridController` only makes horizontal after.
     */
    reflectHorizontal?: boolean;
}

class ListWindow extends LayoutWindow {
    public readonly container: LayoutWindow;
    protected readonly _horizontal: boolean;
    protected _spacing: number;
    private readonly _autoArrange: boolean;
    private _scaleToFit: boolean;
    private _length = 0;
    private _breadth = 0;
    private _arranging = false;
    private _resizing = false;

    constructor(element: TemplateElement | undefined, rect: TemplateRect, param: number, parent?: LayoutWindow, options: ListOptions = {}) {
        super(element, rect, param, parent);

        const vars = element?.vars ?? {};

        this._horizontal = options.horizontal ?? element?.tag === 'itemlist_horizontal';
        // `ThemeManager`'s defaults, over which the layout's variables go.
        this._spacing = options.spacing ?? (typeof vars.spacing === 'number' ? int(vars.spacing) : 0);
        this._autoArrange = vars.auto_arrange_items === undefined ? true : flashBool(vars.auto_arrange_items);
        this._scaleToFit = options.scaleToFit ?? flashBool(vars.scale_to_fit_items);

        const reflectHorizontal = options.reflectHorizontal ?? this._horizontal;
        const reflect = flashBool(vars.resize_on_item_update) ? (reflectHorizontal ? P.reflectH : P.reflectV) : 0;

        this.container = new ListContainer(this, { x: 0, y: 0, width: this.width, height: this.height }, (P.parentGraphics | reflect) >>> 0);
    }

    /**
     * `ItemListIterator`: an XML child is added at the end - `addListItemAt`, which re-arranges the whole
     * list (`updateScrollAreaRegion`), so an item the layout hides takes no room from the start. Code
     * adding an item calls `addListItem`, which places it after the last whatever it shows.
     */
    public override push(child: LayoutWindow): void {
        this.addListItemAt(child, this.container.children.length);
    }

    public override get scrollableRegion(): { width: number; height: number } {
        return { width: this.container.width, height: this.container.height };
    }

    /** `IItemListWindow.spacing`: the gap between items, for the items placed from now on. */
    public set spacing(spacing: number) {
        this._spacing = spacing;
    }

    /** `IItemListWindow.scaleToFitItems`: whether the list's breadth grows to its widest item. */
    public set scaleToFitItems(scaleToFit: boolean) {
        this._scaleToFit = scaleToFit;
    }

    /** `ItemListController.addListItemAt`. */
    public addListItemAt(item: LayoutWindow, index: number): void {
        this.container.addChildAt(item, index);
        this.arrange();
    }

    /** `ItemListController.addListItem`. */
    public addListItem(item: LayoutWindow): void {
        this._arranging = true;

        const count = this.container.children.length;

        if (this._horizontal) {
            item.setX(this._length + (count > 0 ? this._spacing : 0));
            this._length = item.x + item.width;
            this.container.setWidth(this._length);
        } else {
            if (this._autoArrange) {
                item.setY(this._breadth + (count > 0 ? this._spacing : 0));
                this._breadth = item.y + item.height;
            } else {
                this._breadth = Math.max(this._breadth, item.y + item.height);
            }

            this.container.setHeight(this._breadth);
        }

        this.container.addChild(item);
        this._arranging = false;
    }

    public override setRectangle(x: number, y: number, width: number, height: number): void {
        this._resizing = int(width) !== this.width || int(height) !== this.height;
        super.setRectangle(x, y, width, height);
        this._resizing = false;
    }

    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        super.update(source, type, related);

        if (type === 'RESIZED' && source === this) {
            if (!this._scaleToFit) {
                if (this._horizontal) this.container.setHeight(this.height);
                else this.container.setWidth(this.width);
            }

            this.arrange();
        }
    }

    /** The container's events, heard before its own handling (`_Str_6611`). */
    public containerEvent(type: WindowEventType): void {
        if (type === 'CHILD_REMOVED' || type === 'CHILD_RELOCATED' || (type === 'CHILD_RESIZED' && !this._resizing)) this.arrange();
    }

    /** `ItemListController._Str_4024`: the visible items placed along the list, the container sized to them. */
    public arrange(): void {
        if (!this._autoArrange || this._arranging) return;

        this._arranging = true;

        const items = this.container.children;

        if (this._horizontal) {
            this._length = 0;
            this._breadth = this.height;

            for (const item of items) {
                if (!item.visible) continue;

                item.setX(this._length);
                this._length += item.width + this._spacing;

                if (this._scaleToFit) this._breadth = Math.max(this._breadth, item.height + item.y);
            }

            if (items.length > 0) this._length -= this._spacing;
        } else {
            this._length = this.width;
            this._breadth = 0;

            for (const item of items) {
                if (!item.visible) continue;

                item.setY(this._breadth);
                this._breadth += item.height + this._spacing;

                if (this._scaleToFit) this._length = Math.max(this._length, item.width + item.x);
            }

            if (items.length > 0) this._breadth -= this._spacing;
        }

        this.container.setHeight(this._breadth);
        this.container.setWidth(this._length);
        this._arranging = false;
    }
}

/** An `ItemListController`'s `_CONTAINER`: its events reach the list first, as its listeners do. */
class ListContainer extends LayoutWindow {
    private _list: ListWindow | undefined;

    constructor(list: ListWindow, rect: TemplateRect, param: number) {
        super(undefined, rect, param, list);
        this._list = list;
    }

    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        if (source === this || type.startsWith('CHILD_')) this._list?.containerEvent(type);

        super.update(source, type, related);
    }
}

/**
 * `ItemGridController` (`itemgrid`, `itemgrid_vertical`): a horizontal item list of vertical item
 * lists, its columns - fitted to their items (`scale_to_fit_items`) - its items filled in row by row.
 * The first row makes a column for each item while the next still fits the grid's width; after it,
 * item `n` goes into column `n % columns`.
 */
class GridWindow extends ListWindow {
    private _rebuilding = false;
    private _verticalSpacing: number | undefined;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent?: LayoutWindow, spacing?: number) {
        super(element, rect, param, parent, { horizontal: true, scaleToFit: true, reflectHorizontal: false, spacing });
    }

    /** `ItemGridController.verticalSpacing`: the columns' own spacing, the rows' gap, from then on over `spacing`. */
    public set verticalSpacing(spacing: number) {
        this._verticalSpacing = spacing;

        for (const column of this.columns) column.spacing = spacing;
    }

    /** `ItemGridController.update`: resized, the grid is rebuilt at its new width (`shouldRebuildGridOnResize`, on by default). */
    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        super.update(source, type, related);

        if (type === 'RESIZED' && source === this) this.rebuildGridStructure();
    }

    /**
     * `rebuildGridStructure`: the items taken out a row at a time - the first of each column in turn,
     * which is the order they were added in - the columns dropped, and the items added again.
     */
    private rebuildGridStructure(): void {
        const columns = this.columns;

        if (this._rebuilding || !columns.length) return;

        this._rebuilding = true;

        const items: LayoutWindow[] = [];
        const rows = Math.max(...columns.map(column => column.container.children.length));

        for (let row = 0; row < rows; row++) {
            for (const column of columns) {
                const item = column.container.children[row];

                if (item) items.push(item);
            }
        }

        for (const column of columns) this.container.removeChild(column);

        for (const item of items) this.push(item);

        this._rebuilding = false;
    }

    /**
     * `ItemGridIterator`: an XML child is added at the end - `addGridItemAt` (`_Str_22897`): placed as
     * `addGridItem` places it, then each column re-arranged and sized to its items, and the grid's
     * container to its tallest column.
     */
    public override push(child: LayoutWindow): void {
        this.addGridItem(child);

        let tallest = 0;

        for (const column of this.columns) {
            column.arrange();
            column.setHeight(column.container.height);
            tallest = Math.max(tallest, column.height);
        }

        this.container.setHeight(tallest);
    }

    private get columns(): ListWindow[] {
        return this.container.children.filter((child): child is ListWindow => child instanceof ListWindow);
    }

    /** `ItemGridController._Str_16044`. */
    public addGridItem(item: LayoutWindow): void {
        const columns = this.columns;

        if (!columns.length) {
            this.addColumn(item);

            return;
        }

        const count = columns.reduce((total, column) => total + column.container.children.length, 0);
        let target = columns[0];

        if (count > 0) {
            const last = columns[(count - 1) % columns.length];
            const index = columns.indexOf(last);
            const rowDone = index === columns.length - 1;

            // Still the first row, and room across for one more: a new column.
            if (rowDone && last.container.children.length === 1 && (last.x + last.width + item.width) <= this.width) {
                this.addColumn(item);

                return;
            }

            target = columns[rowDone ? 0 : index + 1];
        }

        target.addListItem(item);

        if (item.width > target.width) target.setWidth(item.width);
        if (item.y + item.height > target.height) target.setHeight(item.y + item.height);
    }

    /** `ItemGridController.addColumnForItem`: a column, sized to its first item, spaced by the grid's `verticalSpacing` if set, else its `spacing`. */
    private addColumn(item: LayoutWindow): void {
        const column = new ListWindow(undefined, { x: 0, y: 0, width: Math.max(item.width, 0), height: Math.max(item.height, 0) }, P.parentGraphics, undefined, { spacing: this._verticalSpacing ?? this._spacing });

        this.addListItem(column);
        column.addListItem(item);
    }
}

/**
 * `FrameController` (and `BubbleController`, which extends it): its XML children go into its
 * content area, which stretches with it - and whose own change of size is the frame's
 * (`reflect_resize_to_parent`), so a child growing its content area grows the frame. Every frame and
 * bubble window layout of the client gives its `content_area` those same params.
 */
class FrameWindow extends LayoutWindow {
    public readonly content: LayoutWindow;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent?: LayoutWindow) {
        super(element, rect, param, parent);

        const [ left, top, right, bottom ] = element.margins ?? [ 0, 0, 0, 0 ];

        this.content = new LayoutWindow(undefined, { x: left, y: top, width: this.width - left - right, height: this.height - top - bottom }, (P.hStretch | P.vStretch | P.parentGraphics | P.reflect) >>> 0, this);
        this.content.frameContent = true;
    }

    public override push(child: LayoutWindow): void {
        this.content.push(child);
    }
}

/**
 * `ScrollableItemListWindow` / `ScrollableItemGridWindow`: built from its window layout (`skin`) - an
 * inner list (`_ITEMLIST` / `_ITEMGRID`) and a scrollbar (`_SCROLLBAR`) made at the layout's size,
 * then resized to its own rect, which moves and stretches them by their params. Its XML children go
 * into the inner list. The scrollbar hides while the items fit, giving the list the whole width, and
 * shows - taking its width back - once they do not.
 */
class ScrollableWindow extends LayoutWindow {
    private _list: ListWindow | undefined;
    private _scrollbar: LayoutWindow | undefined;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent: LayoutWindow | undefined, skin: SkinTemplate, input: TemplateLayoutInput) {
        // The `WindowController` constructor: at the window layout's size, its parts built in it...
        super(element, { x: 0, y: 0, width: skin.width, height: skin.height }, param);

        for (const part of skin.elements) {
            const window = createWindow(part, { x: part.x, y: part.y, width: part.width, height: part.height }, templateParamBits(part), undefined, input);

            window.skinPart = true;
            this.addChild(window);

            if (window instanceof ListWindow && (part.tags?.includes('_ITEMLIST') || part.tags?.includes('_ITEMGRID'))) {
                this._list = window;
                window.container.scrollContent = true;

                // `ScrollableItemGridWindow` / `ScrollableItemListWindow.spacing`: the layout's (or the
                // code's) spacing is the inner list's.
                const spacing = input.spacingOf?.(element) ?? (typeof element.vars.spacing === 'number' ? int(element.vars.spacing) : undefined);

                if (spacing !== undefined) window.spacing = spacing;

                // `set properties` hands `scale_to_fit_items` on the same way (`_itemList.scaleToFitItems`).
                // Its other forwarded keys - `resize_on_item_update`, `inverse_resize_on_item_update`,
                // `auto_arrange_items` - are set on no scrollable list in the client's layouts.
                if (element.vars.scale_to_fit_items !== undefined) window.scaleToFitItems = flashBool(element.vars.scale_to_fit_items);

                // `ScrollableItemGridWindow.verticalSpacing` goes on to its grid (`_itemGrid.verticalSpacing`).
                const verticalSpacing = input.verticalSpacingOf?.(element);

                if ((verticalSpacing !== undefined) && (window instanceof GridWindow)) window.verticalSpacing = verticalSpacing;
            }
            if (part.tags?.includes('_SCROLLBAR')) this._scrollbar = window;
        }

        // ...then its own rect, the reflect params held off, and it is its previous rect.
        const saved = this.param;

        this.param = (this.param & ~P.reflect) >>> 0;
        this.setRectangle(rect.x, rect.y, rect.width, rect.height);
        this.param = saved;
        this.previous = this.rect;

        // Set by the window's code before it adds any items (`createMainWindow`'s
        // `block_results.autoHideScrollBar = false`), so they go into the list at its final width
        // rather than being stretched narrower when the scrollbar comes later.
        this.autoHideScrollBar = input.autoHideScrollBarOf?.(element) ?? true;

        // `scrollbar.scrollable = list`: disabled with nothing to scroll, so hidden.
        this.updateScrollbar();

        if (parent) {
            this.parent = parent;
            parent.addChild(this);
        }
    }

    public get list(): ListWindow | undefined {
        return this._list;
    }

    public get scrollbar(): LayoutWindow | undefined {
        return this._scrollbar;
    }

    /** `IScrollableListWindow.iterator`: the inner list's. */
    public override push(child: LayoutWindow): void {
        if (this._list) this._list.push(child);
        else super.push(child);

        this.updateScrollbar();
    }

    /**
     * Resized - by its parent, or by the window's code fitting it - its list has re-arranged to the new
     * size, so the scrollbar is checked again, as Flash's follows its scrollable's `WE_RESIZED`.
     */
    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        super.update(source, type, related);

        if (type === 'RESIZED' && source === this) this.updateScrollbar();
    }

    /**
     * `ScrollableItemListWindow._Str_6204` on the scrollbar's `ENABLED` / `DISABLED`: it is enabled
     * while the list's content is taller than the list.
     */
    /** `autoHideScrollBar`: off, the scrollbar keeps its width while the items fit, drawn disabled. */
    public autoHideScrollBar = true;

    public updateScrollbar(): void {
        const list = this._list;
        const scrollbar = this._scrollbar;

        if (!list || !scrollbar) return;

        const overflows = !this.autoHideScrollBar || list.container.height > list.height;
        // `ScrollableItemListWindow` widens its list into the scrollbar's place while it is hidden;
        // `ScrollableItemGridWindow` only hides it, the grid keeping its layout width.
        const resizesList = !(list instanceof GridWindow);

        if (overflows && !scrollbar.visible) {
            scrollbar.visible = true;
            if (resizesList) list.setWidth(this.width - scrollbar.width);
        } else if (!overflows && scrollbar.visible) {
            scrollbar.visible = false;
            if (resizesList) list.setWidth(this.width);
        }
    }
}

/**
 * `BoxSizerController` (`boxsizer`): on a child added, removed, moved or resized, a child shown or hidden,
 * or itself resized, its visible children are laid along it - across, or down when `vertical` - the
 * first `padding_horizontal` / `padding_vertical` in, each next `spacing` after the last, all at the
 * padding across. A child tagged `relative(n)` takes n shares of the length the others leave. Then the
 * window's own handling: the layouts' boxes resize to accommodate what they hold.
 */
class BoxSizerWindow extends LayoutWindow {
    private readonly _spacing: number;
    private readonly _horizontalPadding: number;
    private readonly _verticalPadding: number;
    private readonly _vertical: boolean;
    private _autoRearrange = true;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent?: LayoutWindow) {
        super(element, rect, param, parent);

        const own = (key: string, fallback: number) => (element.vars[key] !== undefined && Number.isFinite(Number(element.vars[key])) ? int(Number(element.vars[key])) : fallback);

        this._spacing = own('spacing', 5);
        this._horizontalPadding = own('padding_horizontal', 8);
        this._verticalPadding = own('padding_vertical', 8);
        this._vertical = flashBool(element.vars.vertical);
        this.arrange();
    }

    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        if (this._autoRearrange && (type === 'CHILD_RELOCATED' || type === 'CHILD_REMOVED' || type === 'CHILD_ADDED' || type === 'CHILD_RESIZED' || type === 'RESIZED')) this.arrange();

        super.update(source, type, related);
    }

    public override setAutoRearrange(on: boolean): void {
        this._autoRearrange = on;

        if (on) this.arrange();
    }

    /** `_Str_9056`: the n of a `relative(n)` tag - the last one, at least 0 - else 0. */
    private static share(child: LayoutWindow): number {
        let share = 0;

        for (const tag of child.element?.tags ?? []) {
            if (tag.includes('relative')) share = Math.max(0, int(Number(tag.slice(tag.indexOf('(') + 1, tag.indexOf(')'))) || 0));
        }

        return share;
    }

    /** `_Str_7516`. */
    public arrange(): void {
        // A field initialiser has not run while the constructor's `super` raises events.
        if (this._spacing === undefined) return;

        const visible = this.children.filter(child => child.visible);
        const shares = visible.reduce((sum, child) => sum + BoxSizerWindow.share(child), 0);
        // `_Str_22835`: the length less the padding, the fixed children and the spacing between them all.
        const free = visible.reduce((length, child) => length - (BoxSizerWindow.share(child) === 0 ? ((this._vertical ? child.height : child.width) + this._spacing) : this._spacing), (this._vertical ? this.height - (this._verticalPadding * 2) : this.width - (this._horizontalPadding * 2))) + this._spacing;
        let previous: LayoutWindow | undefined;

        for (const child of this.children) {
            if (!child.visible) continue;

            const share = BoxSizerWindow.share(child);

            if (this._vertical) {
                child.setY(previous ? previous.y + previous.height + this._spacing : this._verticalPadding);
                child.setX(this._horizontalPadding);

                if (share > 0) child.setHeight((free * share) / shares);
            } else {
                child.setX(previous ? previous.x + previous.width + this._spacing : this._horizontalPadding);
                child.setY(this._verticalPadding);

                if (share > 0) child.setWidth((free * share) / shares);
            }

            previous = child;
        }
    }
}

/** The window types whose caption sizes them (`ButtonController`, `ButtonGroupController`, `TabButtonController`). */
export const TEMPLATE_CAPTION_BUTTON_TAGS: ReadonlySet<string> = new Set([ 'button', 'button_thick', 'button_group_left', 'button_group_center', 'button_group_right', 'tab_button' ]);

/**
 * `ButtonController` (`button`, `button_thick`, and `ButtonGroupController`'s `button_group_*`): built
 * from its window layout - a `_BTN_TEXT` label centred in it, made at the layout's size and then
 * resized to its own rect - and always expanding to accommodate its children. Its caption goes to the
 * label, which takes its text's size (`TextLabelController.refresh`); on the label's `CHILD_RESIZED`
 * the button sets `width = 0` - its `width_min` holding it, its resize alignment keeping the edge it
 * names - and then expands round the label. A button is as wide as its caption, never under its
 * `width_min`.
 *
 * `TabButtonController` (`tab_button`): its layout's `TAB_BUTTON_TITLE` label beside a container at
 * the layout's size; on a child resized it resizes to accommodate its children
 * (`resizeToAccommodateChildren`) - growing or shrinking round the title, never under the container.
 */
class ButtonWindow extends LayoutWindow {
    private _label: LayoutWindow;
    private _skin: TemplateButtonLabel;
    private _tab: boolean;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent: LayoutWindow | undefined, skin: TemplateButtonLabel) {
        const tab = element.tag === 'tab_button';

        super(element, { x: 0, y: 0, width: skin.width, height: skin.height }, (tab ? param : (param | P.expandToAccommodate)) >>> 0);

        this._skin = skin;
        this._tab = tab;

        if (tab) {
            const container = new LayoutWindow(undefined, { x: 0, y: 0, width: skin.width, height: skin.height }, P.parentGraphics);

            container.skinPart = true;
            this.addChild(container);
        }

        this._label = new LayoutWindow(undefined, { x: 0, y: 0, width: skin.width, height: skin.height }, (P.hCenter | P.vCenter | P.parentGraphics) >>> 0);
        this._label.skinPart = true;
        this.addChild(this._label);

        const saved = this.param;

        this.param = (this.param & ~P.reflect) >>> 0;
        this.setRectangle(rect.x, rect.y, rect.width, rect.height);
        this.param = saved;
        this.previous = this.rect;

        if (parent) {
            this.parent = parent;
            parent.addChild(this);
        }
    }

    /** `ButtonController.caption`: the label's caption, which it lays out as `TextLabelController.refresh` does. */
    public override setCaption(caption: string, input: TemplateLayoutInput): void {
        if (!caption) return;

        const { textStyle, margins } = this._skin;
        const label: TemplateElement = { tag: 'label', x: 0, y: 0, width: 0, height: 0, vars: { text_style: textStyle }, children: [], style: this.element?.style };
        const field = input.measure(label, caption, undefined);

        if (!field) return;

        const width = Math.floor(field.width) + margins.left + margins.right;
        const height = Math.floor(field.height) + margins.top + margins.bottom;

        if (width !== this._label.width || height > this._label.height) this._label.setRectangle(this._label.x, this._label.y, width, height);
    }

    /**
     * On a child resized, before the window's own handling: `ButtonController.update`'s `width = 0`, or
     * `TabButtonController.update`'s `resizeToAccommodateChildren`.
     */
    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        if (type === 'CHILD_RESIZED') {
            if (this._tab) this.resizeToAccommodateChildren();
            else this.setWidth(0);
        }

        super.update(source, type, related);
    }
}

/** A window layout a composite window is built from - `Template` as the publisher gives it. */
interface SkinTemplate {
    width: number;
    height: number;
    elements: TemplateElement[];
}

/**
 * `SelectorListController` (`selector_list`, a tab context's `tab_selector`): on a child added,
 * resized or moved, every child is packed along it - `spacing` apart, across unless `vertical` -
 * whatever the layout placed it at.
 */
class SelectorListWindow extends LayoutWindow {
    private readonly _spacing: number;
    private readonly _vertical: boolean;
    private _packing = false;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent?: LayoutWindow) {
        super(element, rect, param, parent);
        this._spacing = typeof element.vars.spacing === 'number' ? int(element.vars.spacing) : 0;
        this._vertical = flashBool(element.vars.vertical);
    }

    public override update(source: LayoutWindow, type: WindowEventType, related?: LayoutWindow): void {
        if (type === 'CHILD_ADDED' || type === 'CHILD_RESIZED' || type === 'CHILD_RELOCATED') this.pack();

        super.update(source, type, related);
    }

    /** `_Str_11558`. */
    private pack(): void {
        if (this._packing) return;

        this._packing = true;

        let offset = 0;

        for (const child of this.children) {
            if (this._vertical) {
                child.setY(offset);
                offset += child.height + this._spacing;
            } else {
                child.setX(offset);
                offset += child.width + this._spacing;
            }
        }

        this._packing = false;
    }
}

/**
 * `TabContextController`: built from its window layout (`skin`) - a `_SELECTOR` the buttons go in and
 * a `_CONTENT` under it, made at the layout's size and then resized to its own rect, which stretches
 * them by their params. Its XML children go onto the selector (`iterator` is `selector.iterator`),
 * which packs them from its own inset, not the context's edge.
 */
class TabContextWindow extends LayoutWindow {
    private _selector: LayoutWindow | undefined;

    constructor(element: TemplateElement, rect: TemplateRect, param: number, parent: LayoutWindow | undefined, skin: SkinTemplate, input: TemplateLayoutInput) {
        super(element, { x: 0, y: 0, width: skin.width, height: skin.height }, param);

        for (const part of skin.elements) {
            const window = createWindow(part, { x: part.x, y: part.y, width: part.width, height: part.height }, templateParamBits(part), undefined, input);

            window.skinPart = true;
            this.addChild(window);

            if (part.tags?.includes('_SELECTOR')) this._selector = window;
        }

        const saved = this.param;

        this.param = (this.param & ~P.reflect) >>> 0;
        this.setRectangle(rect.x, rect.y, rect.width, rect.height);
        this.param = saved;
        this.previous = this.rect;

        if (parent) {
            this.parent = parent;
            parent.addChild(this);
        }
    }

    public override push(child: LayoutWindow): void {
        if (this._selector) this._selector.addChild(child);
        else super.push(child);
    }
}

const LIST_TAGS = new Set([ 'itemlist', 'itemlist_vertical', 'itemlist_horizontal', 'scrollable_itemlist_vertical' ]);
const GRID_TAGS = new Set([ 'itemgrid', 'itemgrid_vertical', 'scrollable_itemgrid_vertical' ]);
const SCROLLABLE_TAGS = new Set([ 'scrollable_itemlist_vertical', 'scrollable_itemgrid_vertical' ]);

/** `WindowController.findChildByName` - `findTemplateChild`, kept here so this module has no runtime imports. */
const findChildByName = (children: readonly TemplateElement[], name: string): TemplateElement | undefined => children.find(child => child.name === name)
    ?? children.reduce<TemplateElement | undefined>((found, child) => found ?? findChildByName(child.children, name), undefined);

/** The `IItemListWindow` / `IItemGridWindow`s a standalone scrollbar scrolls here. */
const ITEM_LIST_TAGS = new Set([ 'itemlist', 'itemlist_vertical', 'itemlist_horizontal', 'itemgrid', 'itemgrid_vertical' ]);

/** Every `IScrollableWindow`: the item lists and grids, the scrollable lists, and the texts (`ITextWindow`). */
const SCROLLABLE_WINDOW_TAGS = new Set([ ...ITEM_LIST_TAGS, ...SCROLLABLE_TAGS, 'text', 'input', 'html', 'formatted_text' ]);

/** A layout's own scrollbars (`ScrollBarController`). */
export const TEMPLATE_SCROLLBAR_TAGS: Readonly<Record<string, 'vertical' | 'horizontal'>> = {
    scrollbar_vertical: 'vertical',
    scrollbar_horizontal: 'horizontal',
};

/**
 * Each standalone scrollbar's target, as `ScrollBarController.resolveScrollTarget` finds it: the window
 * its `scrollable` var names - an ancestor of that name, else one under its parent
 * (`findChildByName`) - else its parent, when that scrolls, else the parent's first child that does.
 * Only an item list or grid is kept as a target: a text is not scrolled yet, and its scrollbar is
 * linked to nothing.
 */
export const linkTemplateScrollbars = (elements: readonly TemplateElement[]): Map<TemplateElement, TemplateElement> => {
    const links = new Map<TemplateElement, TemplateElement>();
    const resolve = (name: string | undefined, ancestors: readonly TemplateElement[]): TemplateElement | undefined => {
        const parent = ancestors[ancestors.length - 1];

        if (name) {
            const named = ancestors.findLast(ancestor => ancestor.name === name)
                ?? findChildByName(parent?.children ?? elements, name);

            if (named && SCROLLABLE_WINDOW_TAGS.has(named.tag)) return named;
        }

        if (parent && SCROLLABLE_WINDOW_TAGS.has(parent.tag)) return parent;

        return (parent?.children ?? elements).find(child => SCROLLABLE_WINDOW_TAGS.has(child.tag));
    };
    const walk = (element: TemplateElement, ancestors: TemplateElement[]) => {
        if (TEMPLATE_SCROLLBAR_TAGS[element.tag]) {
            const scrollable = element.vars.scrollable;
            const target = resolve(typeof scrollable === 'string' ? scrollable : undefined, ancestors);

            if (target && ITEM_LIST_TAGS.has(target.tag)) links.set(element, target);
        }

        ancestors.push(element);

        for (const child of element.children) walk(child, ancestors);

        ancestors.pop();
    };

    for (const element of elements) walk(element, []);

    return links;
};

const createWindow = (element: TemplateElement, rect: TemplateRect, param: number, parent: LayoutWindow | undefined, input: TemplateLayoutInput): LayoutWindow => {
    const skin = SCROLLABLE_TAGS.has(element.tag) ? input.skinOf?.(element) : undefined;

    if (skin) return new ScrollableWindow(element, rect, param, parent, skin, input);

    const tabSkin = element.tag === 'tab_context' ? input.skinOf?.(element) : undefined;

    if (tabSkin) return new TabContextWindow(element, rect, param, parent, tabSkin, input);
    if (element.tag === 'tab_selector' || element.tag === 'selector_list') return new SelectorListWindow(element, rect, param, parent);
    if (element.tag === 'label') return new LabelWindow(element, rect, param, parent);

    const buttonLabel = TEMPLATE_CAPTION_BUTTON_TAGS.has(element.tag) ? input.buttonLabelOf?.(element) : undefined;

    if (buttonLabel) return new ButtonWindow(element, rect, param, parent, buttonLabel);
    if (element.tag === 'text' || element.tag === 'link' || element.tag === 'formatted_text') return new TextWindow(element, rect, param, parent);
    if (FIELD_TAGS.has(element.tag)) return new TextFieldWindow(element, rect, param, parent);
    // Without its window layout, a scrollable list or grid is laid out as the plain one.
    if (LIST_TAGS.has(element.tag)) return new ListWindow(element, rect, param, parent, { spacing: input.spacingOf?.(element) });
    if (GRID_TAGS.has(element.tag)) return new GridWindow(element, rect, param, parent, input.spacingOf?.(element));
    // A bubble is a `FrameController` too (`BubbleController`).
    if (element.tag === 'frame' || element.tag === 'bubble') return new FrameWindow(element, rect, param, parent);
    if (element.tag === 'boxsizer') return new BoxSizerWindow(element, rect, param, parent);

    return new LayoutWindow(element, rect, param, parent);
};

const BITMAP_TAGS = new Set([ 'bitmap', 'static_bitmap' ]);

/**
 * `BitmapDataController._Str_8020` (`fit_size_to_contents`): once it has its bitmap, the window takes
 * the bitmap's size times its zoom - `width` and then `height`, each through `setRectangle`.
 */
const fitBitmapToContents = (window: LayoutWindow, element: TemplateElement, input: TemplateLayoutInput): void => {
    if (!BITMAP_TAGS.has(element.tag) || !flashBool(element.vars.fit_size_to_contents)) return;

    const size = input.bitmapSizeOf?.(element);

    if (!size) return;

    const zoom = (value: TemplateValue | undefined) => (value !== undefined && Number.isFinite(Number(value)) ? Number(value) : 1);

    window.setWidth(Math.abs(size.width * zoom(element.vars.zoom_x)));
    window.setHeight(Math.abs(size.height * zoom(element.vars.zoom_y)));
};

/**
 * `WindowParser.parseSingleWindowEntity`: the window made with no caption and - under an iterable
 * parent - no parent; its limits applied; its caption set; then, under an iterable parent, a
 * centred window that moved while it was made put back at its layout position and pushed onto the
 * parent; then its children, in order.
 */
const build = (element: TemplateElement, parent: LayoutWindow | undefined, input: TemplateLayoutInput, windows: Map<TemplateElement, LayoutWindow>, clones: { element: TemplateElement; parent: LayoutWindow }[], deferPush: boolean = false): LayoutWindow => {
    const layoutRect = { x: element.x, y: element.y, width: element.width, height: element.height };
    const param = templateParamBits(element);
    const underIterable = !!parent?.iterable;
    const window = createWindow(element, layoutRect, param, underIterable ? undefined : parent, input);
    const [ minWidth, maxWidth, minHeight, maxHeight ] = element.limits ?? [ null, null, null, null ];

    fitBitmapToContents(window, element, input);

    if (minWidth !== null) window.minWidth = minWidth;
    if (maxWidth !== null) window.maxWidth = maxWidth;
    if (minHeight !== null) window.minHeight = minHeight;
    if (maxHeight !== null) window.maxHeight = maxHeight;

    window.limit();
    window.setCaption(input.builtCaptionOf?.(element) ?? input.captionOf(element), input);
    window.visible = !element.hidden;

    if (parent && underIterable) {
        if (window.x !== layoutRect.x || window.y !== layoutRect.y || window.width !== layoutRect.width || window.height !== layoutRect.height) {
            if ((param & P.hCenter) === P.hCenter) window.setX(layoutRect.x);
            if ((param & P.vCenter) === P.vCenter) window.setY(layoutRect.y);
        }

        if (!deferPush) parent.push(window);
    }

    windows.set(element, window);

    // A clone the code adds (`itemKey`) comes after the window it goes into is built and set up.
    for (const child of element.children) {
        if (child.itemKey !== undefined) clones.push({ element: child, parent: window });
        else build(child, window, input, windows, clones);
    }

    return window;
};

/**
 * Every element's window, built as `WindowParser` builds a layout; then the visibility the window's
 * code gives (bindings, a list's `show`) applied and each list re-arranged, as code that hides and
 * shows list items does (`autoArrangeItems` off and on again).
 */
export const buildTemplateWindows = (elements: readonly TemplateElement[], input: TemplateLayoutInput): Map<TemplateElement, LayoutWindow> => {
    const windows = new Map<TemplateElement, LayoutWindow>();

    const windowOf = (element: TemplateElement) => windows.get(element);
    // A scope - the template, or a clone - built with its own windows, set up by its code, and only
    // then given its clones, each a scope in turn: the order a window's code makes them in. A clone
    // going into a list or grid is set up before the list takes it, as code builds an item, sizes it
    // and then adds it (`createColorContainer` then `addGridItem`): a grid sizes its columns by the
    // items it is given. A view attached to a container (`attachWidgetView`) is added first and then
    // sized against it.
    const buildScope = (element: TemplateElement, parent: LayoutWindow | undefined) => {
        const clones: { element: TemplateElement; parent: LayoutWindow }[] = [];
        const deferPush = (parent instanceof ListWindow) || (parent instanceof ScrollableWindow);
        const window = build(element, parent, input, windows, clones, deferPush);

        // The captions the code sets on the built window (`findChildByName("count").caption = ...`).
        if (input.builtCaptionOf) {
            const setCaptions = (scope: TemplateElement) => {
                const window = windows.get(scope);

                if (!window) return;

                if (input.builtCaptionOf?.(scope) !== undefined) window.setCaption(input.captionOf(scope), input);

                for (const child of scope.children) setCaptions(child);
            };

            setCaptions(element);
        }

        input.setupOf?.(element)?.(windowOf);

        if (deferPush) parent?.push(window);

        for (const clone of clones) buildScope(clone.element, clone.parent);
    };

    for (const element of elements) buildScope(element, undefined);

    if (input.visibleOf) {
        // `CHILD_VISIBILITY`: the lists and boxes whose items were shown or hidden arrange them again.
        const lists = new Set<ListWindow | BoxSizerWindow>();

        for (const [ element, window ] of windows) {
            const visible = input.visibleOf(element);

            if (visible === window.visible) continue;

            window.visible = visible;

            const list = window.parent instanceof ListContainer ? window.parent.parent : undefined;

            if (list instanceof ListWindow) lists.add(list);
            if (window.parent instanceof BoxSizerWindow) lists.add(window.parent);
        }

        for (const list of lists) list.arrange();
    }

    for (const window of windows.values()) {
        if (window instanceof ScrollableWindow) window.updateScrollbar();
    }

    return windows;
};

/**
 * The lists (`ItemListController`, `ItemGridController`, `SelectorListController`): they place
 * their items themselves, one after another down or along, or in rows - not at the items' own x/y.
 * `arranged` ones are placed by the window model; the others the renderer flows.
 */
export const TEMPLATE_LISTS: Readonly<Record<string, { direction: 'column' | 'row'; wrap?: boolean; scroll?: boolean; arranged?: boolean }>> = {
    itemlist: { direction: 'column', arranged: true },
    itemlist_vertical: { direction: 'column', arranged: true },
    itemlist_horizontal: { direction: 'row', arranged: true },
    itemgrid: { direction: 'row', wrap: true, arranged: true },
    itemgrid_vertical: { direction: 'row', wrap: true, arranged: true },
    scrollable_itemlist_vertical: { direction: 'column', scroll: true, arranged: true },
    scrollable_itemgrid_vertical: { direction: 'row', wrap: true, scroll: true, arranged: true },
    selector_list: { direction: 'row' },
};

/**
 * A window's rect in its parent element's: the windows between them that are no element of the
 * template - a list's container, a grid's columns - added in, but not a frame's content area, which
 * the `Frame` component places its children in itself.
 */
const rectInParentElement = (window: LayoutWindow): TemplateRect => {
    const rect = window.rect;

    for (let parent = window.parent; parent && (!parent.element || parent.skinPart) && !parent.frameContent && !parent.scrollContent; parent = parent.parent) {
        rect.x += parent.x;
        rect.y += parent.y;
    }

    return rect;
};

/**
 * What a window's code does once its layout is built (after `buildFromXML`): moves and sizes windows by
 * what it measures - a menu's arrow put after its label's text (`label.textWidth`) - through each
 * window's `setRectangle`, so its events run as the client's would. `windowOf` is an element's window.
 */
export type TemplateArrange = (windowOf: (element: TemplateElement) => LayoutWindow | undefined) => void;

/**
 * Every element's rect, by element: an arranged list's items in its content, a frame's children in
 * its content area. With `size`, each root window is then resized to it - the window's code setting
 * its size, or the user dragging its scaler - and its children follow by their relative scale.
 */
export const layoutTemplate = (elements: readonly TemplateElement[], input: TemplateLayoutInput, size?: { width: number; height: number }, arrange?: TemplateArrange): Map<TemplateElement, TemplateRect> => {
    const rects = new Map<TemplateElement, TemplateRect>();
    const windows = buildTemplateWindows(elements, input);

    if (size) {
        for (const element of elements) {
            const window = windows.get(element);

            window?.setRectangle(window.x, window.y, size.width, size.height);
        }
    }

    // The window's code, once it is built and sized: what it places by what it measures.
    arrange?.(element => windows.get(element));

    for (const [ element, window ] of windows) {
        const rect = rectInParentElement(window);

        if (window instanceof ScrollableWindow && window.list) {
            const { list, scrollbar } = window;

            rect.scroll = {
                viewport: list.rect,
                scrollbar: scrollbar?.visible ? { ...scrollbar.rect, style: scrollbar.element?.style } : undefined,
                content: { width: list.container.width, height: list.container.height },
            };
        }

        if (window instanceof ListWindow && input.scrollTargets?.has(element)) rect.scrollContent = { width: window.container.width, height: window.container.height };

        rects.set(element, rect);
    }

    // Clipping (`WindowController.clipping`, true unless the layout says otherwise) cuts what reaches
    // outside a window - an avatar menu row's 143 x 35 button in its 137 x 26 row. It cuts only what is
    // drawn into the window's own graphic context: its children with `use_parent_graphic_context`
    // (`WindowRenderer`'s clip walks up the parents only while each draws into its parent's). A child
    // with a context of its own is a display object over the parent's, which the parent's mask does
    // not reach - the VIP page's `hccenter_link` rises 13px out of its 17px container. Marked only
    // where something is cut, so the renderer masks no window it need not. A frame's and a bubble's
    // children are in their content area, which their components place and clip.
    for (const [ element, rect ] of rects) {
        if (element.clipping === false || element.tag === 'frame' || element.tag === 'bubble' || rect.scroll || rect.scrollContent) continue;

        const outside = element.children.some((child) => {
            if (!templateUsesParentGraphics(child)) return false;

            const inner = rects.get(child);

            return !!inner && (inner.x < 0 || inner.y < 0 || inner.x + inner.width > rect.width || inner.y + inner.height > rect.height);
        });

        if (outside) rect.clip = true;
    }

    return rects;
};
