/**
 * A Flash window template as data: the `<layout>` XML a `WindowParser` builds, converted once where
 * it is published (`layoutToTemplate`) and drawn by `TemplateView`. Nitro Studio's template preview
 * builds the same shape from its own reading of the XML, with its variables left as strings.
 *
 * Kept free of imports so a build script can load it under Node as it stands.
 */

/** A `<var>` value: typed by its declared `type` when converted, the raw string otherwise. */
export type TemplateValue = string | number | boolean | TemplateValue[] | { [key: string]: TemplateValue };

/** What the `WindowParam` layout flags set, per axis. */
export type TemplateScale = 'fixed' | 'move' | 'stretch' | 'center';
export type TemplateAlignH = 'left' | 'right' | 'center';
export type TemplateAlignV = 'top' | 'bottom' | 'middle';

/**
 * An element's `params` - the attribute's bits and every `<param name>` child ORed together, as
 * `WindowParser` does - split by what each part decides. Absent parts are Flash's defaults.
 */
export interface TemplateParams {
    /** The input bits: `input` (1), `routeToParent` (1 << 1), `observeParent`, `internal`, the drag and scale triggers and targets. */
    events?: string[];
    /** `use_parent_graphic_context` (1 << 4). */
    parentGraphics?: boolean;
    /** `bound_to_parent_rect` (1 << 5). */
    boundToParent?: boolean;
    /** `relative_{horizontal,vertical}_scale_*`: how the element follows its parent's resize, per axis. */
    scale?: [ TemplateScale, TemplateScale ];
    /** `expand_to_accommodate_children` (grow only) or `resize_to_accommodate_children` (grow and shrink). */
    accommodate?: 'expand' | 'resize';
    /** `on_resize_align_*` / `on_accommodate_align_*`: the edge kept when the element changes size. */
    align?: [ TemplateAlignH, TemplateAlignV ];
    /** `reflect_{horizontal,vertical}_resize_to_parent`. */
    reflectToParent?: [ boolean, boolean ];
    /** `force_clipping` (1 << 30). */
    forceClipping?: boolean;
    /** `inherit_caption` (1 << 31). */
    inheritCaption?: boolean;
    /** Bits set that no `WindowParam` name covers alone (bit 14 without 17, ...): kept, not guessed. */
    unnamedBits?: number[];
}

/**
 * A window's outer drop shadow - the first `<DropShadowFilter>` of its `<filters>` that is not `inner`,
 * the one `GraphicContext` draws - with `WindowParser`'s defaults for what the layout leaves out.
 */
export interface TemplateDropShadow {
    distance: number;
    /** Degrees, Flash's: 45 is down and right. */
    angle: number;
    /** `0xRRGGBB`. */
    color: number;
    alpha: number;
    /** `max(blurX, blurY)`, as `GraphicContext` blurs it. */
    blur: number;
}

/** One element of a template, as its `<layout>` XML has it. */
export interface TemplateElement {
    /** The Flash window type (`container`, `text`, `button`, ...). */
    tag: string;
    name?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    /** `width_min`, `width_max`, `height_min`, `height_max`; `null` where the layout sets none. */
    limits?: [ number | null, number | null, number | null, number | null ];
    /** Its `style` - the theme variant. */
    style?: string;
    /** Its `dynamic_style` (`brightness_and_shadow_under`, ...). */
    dynamicStyle?: string;
    params?: TemplateParams;
    /** Its caption, `${key}`s unresolved. */
    caption?: string;
    /** `visible="false"`: built, and not drawn until its window's code shows it. */
    hidden?: boolean;
    /** Its `color` attribute: `0xAARRGGBB` as a number once converted, the attribute's text in Studio's preview. */
    color?: string | number;
    /** `background="true"`: the window fills its rect with `color`. */
    background?: boolean;
    /** Its `blend`: its opacity. */
    blend?: number;
    /** `clipping="false"`. */
    clipping?: boolean;
    /** Its `treshold` (sic): the alpha a pixel needs to take the mouse, when not the default 10. */
    mouseThreshold?: number;
    /** Its `tags` (`#icon`, `#bg`, ...). */
    tags?: string[];
    /** Its outer drop shadow, from its `<filters>`. */
    dropShadow?: TemplateDropShadow;
    /** Its `<variables>`, by key. */
    vars: Record<string, TemplateValue>;
    /** A frame's content area, from its edges (`FrameController.margins`): where its children are placed. */
    margins?: readonly [ number, number, number, number ];
    children: TemplateElement[];
    /** A clone's key (`TemplateItem.key`): which of its list's items it is, across renders. */
    itemKey?: string;
    /** A clone its code adds to a list with `addListItem` (`TemplateItem.append`). */
    appended?: boolean;
}

export interface Template {
    /** The `<layout name>`. */
    name: string;
    width: number;
    height: number;
    /** The `<window>`'s elements. */
    elements: TemplateElement[];
    /**
     * The window layouts its composite windows are built from (`WindowFactory`'s element description:
     * a `scrollable_itemlist_vertical`'s `_ITEMLIST` and `_SCROLLBAR`), by `templateSkinKey` - only
     * those its elements use. The publisher, holding the window manager's library, adds them.
     */
    skins?: Record<string, Template>;
}

/** A skin's key: the window type and style it lays out (`scrollable_itemlist_vertical:0`). */
export const templateSkinKey = (tag: string, style: string | undefined) => `${tag}:${style ?? '0'}`;

/**
 * One Flash library's templates, as its bundle (named after the library) carries them: by id,
 * `<library>/<asset>` - the asset the client's code builds the window from
 * (`getAssetByName("purse_xml")` is `habbo-toolbar-com/purse_xml`).
 */
export interface TemplateLibrary {
    library: string;
    /** The client release they were read from. */
    version?: string;
    templates: Record<string, Template>;
}
