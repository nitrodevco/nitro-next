/**
 * Not Flash's: the skin map - which skin of the theme (a component's variant: `border` style `9`) a
 * template element draws, which sprites of the window manager library's theme sheet that skin is cut
 * from (their names, sizes and nine-slice), and which windows draw it. A theme author restyling a
 * frame finds the sprite to overlay (`asset.overlays`) and its size here instead of in the bundles,
 * and sees that the overlay re-skins every window drawing that skin, not only the one they looked at.
 *
 * The extension inspector reads one element's skins (`templateElementSkins`, `themeSkinSprites`) out
 * of the theme the client loaded; `tools/skin-map.mjs` writes the whole map (`buildSkinMap`) from the
 * published bundles to the client's `skins.json`. Pure and free of Pixi, so the tool loads it under Node.
 *
 * A skin is resolved as the components resolve their variant (`useResolvedVariant`): the element's
 * own `style`, else what the components around it cascade (`theme-variants.json`'s `cascade`), else
 * `0` - a tab's own `0` without one (`TemplateView`'s `TAB_TAGS`). A window's code may set another
 * style as it draws (`TemplateBinding.style`): the map has the template's.
 */
import type { VariantCascadeMap } from '../cascade/VariantCascadeMap';
import type { ThemeVariantsData } from '../utils/themeRegistry';
import { type Template, type TemplateElement, templateSkinKey } from './templateData';
import { templateElementKey } from './templateElementKey';

/** The library whose bundle carries the theme sheet: a sprite's `asset.overlays` key is `<this>/<sprite>`. */
export const THEME_SKIN_LIBRARY = 'habbo-window-manager-com';

/** The theme components (cascade keys) each template element type draws as `TemplateView` draws it. */
export const TEMPLATE_SKIN_COMPONENTS: Readonly<Record<string, readonly string[]>> = {
    frame: [ 'frame' ],
    header: [ 'header' ],
    border: [ 'border' ],
    bubble: [ 'bubble' ],
    button: [ 'button' ],
    button_thick: [ 'buttonThick' ],
    button_group_left: [ 'buttonGroupLeft' ],
    button_group_center: [ 'buttonGroupCenter' ],
    button_group_right: [ 'buttonGroupRight' ],
    container_button: [ 'containerButton' ],
    iconbutton: [ 'iconButton' ],
    closebutton: [ 'closeButton' ],
    checkbox: [ 'checkBox' ],
    radiobutton: [ 'radioButton' ],
    tab_button: [ 'tabButton' ],
    tab_container_button: [ 'tabButton' ],
    tab_content: [ 'tabContent' ],
    tab_context: [ 'tabContext' ],
    droplist: [ 'droplist' ],
    dropmenu: [ 'dropmenu' ],
    scaler: [ 'scaler' ],
    icon: [ 'icon' ],
    scrollbar_vertical: [ 'scrollbarSliderTrackVertical', 'scrollbarSliderBarVertical', 'scrollbarSliderButtonUp', 'scrollbarSliderButtonDown' ],
    scrollbar_horizontal: [ 'scrollbarSliderTrackHorizontal', 'scrollbarSliderBarHorizontal', 'scrollbarSliderButtonLeft', 'scrollbarSliderButtonRight' ],
    scrollbar_slider_track_vertical: [ 'scrollbarSliderTrackVertical' ],
    scrollbar_slider_bar_vertical: [ 'scrollbarSliderBarVertical' ],
    scrollbar_slider_track_horizontal: [ 'scrollbarSliderTrackHorizontal' ],
    scrollbar_slider_bar_horizontal: [ 'scrollbarSliderBarHorizontal' ],
    scrollbar_slider_button_up: [ 'scrollbarSliderButtonUp' ],
    scrollbar_slider_button_down: [ 'scrollbarSliderButtonDown' ],
    scrollbar_slider_button_left: [ 'scrollbarSliderButtonLeft' ],
    scrollbar_slider_button_right: [ 'scrollbarSliderButtonRight' ],
    bubble_pointer_up: [ 'bubblePointerUp' ],
    bubble_pointer_down: [ 'bubblePointerDown' ],
    bubble_pointer_left: [ 'bubblePointerLeft' ],
    bubble_pointer_right: [ 'bubblePointerRight' ],
    frame_pointer_down: [ 'framePointerDown' ],
};

/** The tab types, whose skin is their own style's, `0` without one - not one cascaded (`TemplateView`'s `TAB_TAGS`). */
const TAB_TAGS = new Set([ 'tab_context', 'tab_button' ]);

/** What a component draws inside itself, in its own cascade: a frame its header, content area and scaler (`Frame`), a header its close button (`Header`). */
const DRAWN_INSIDE: Readonly<Record<string, readonly string[]>> = {
    frame: [ 'header', 'contentArea', 'scaler' ],
    header: [ 'closeButton' ],
};

/** The frame style that draws no frame (`FRAMELESS_VARIANT`). */
const FRAMELESS = 'none';

/** One skin: a theme component's variant. */
export interface TemplateSkinRef {
    component: string;
    style: string;
    /** The skin that draws this one inside itself (`frame:3` for its `header:3`); none for the element's own. */
    via?: string;
}

/** A skin's id in the map: `<component>:<style>` (`border:9`). */
export const skinId = (component: string, style: string) => `${component}:${style}`;

/** The nine-slice insets a sprite is drawn with. */
export interface SkinSlice {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

/** One sprite of the theme sheet a skin draws. */
export interface SkinSprite {
    /** Where in the skin: `layer`, `plain`, `states.hovering`, `states.default.pieces.1`, `icons.13`. */
    part: string;
    /** The sheet's sprite name (`theme-habbo-border-9-border-9-default`). */
    sprite: string;
    /** The `asset.overlays` key that replaces it (`habbo-window-manager-com/theme-...`). */
    overlay: string;
    /** The sprite's size in the sheet: an overlay keeps it. Missing when the sheet has no such sprite. */
    width?: number;
    height?: number;
    slice?: SkinSlice;
    /** For an icon: its rect in the icon set sprite, the part of it the icon draws. */
    rect?: { x: number; y: number; width: number; height: number };
}

/** The theme sheet's manifest frames (`theme_spritesheet.json`'s `frames`), by sprite name. */
export type SkinSheetFrames = Readonly<Record<string, { frame: { w: number; h: number } }>>;

/** The sprite a texture key is cut from: the theme's `textures` alias, else `theme-<key less -src>`. */
export const skinSpriteOf = (textureKey: string, aliases: Readonly<Record<string, string>> = {}): string | undefined => aliases[textureKey]
    ?? (textureKey.endsWith('-src') ? `theme-${textureKey.slice(0, -'-src'.length)}` : undefined);

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && (typeof value === 'object') && !Array.isArray(value);

/**
 * Every sprite one skin draws, each part once, in the variant's order - its layer, its untintable
 * `plain`, each interaction state's and each composite piece's. Empty for a skin with no art (a
 * content area's margins) or one the theme does not have.
 */
export const themeSkinSprites = (theme: Pick<ThemeVariantsData, 'variants' | 'icons' | 'textures'>, component: string, style: string, frames?: SkinSheetFrames): SkinSprite[] => {
    const sprites: SkinSprite[] = [];
    const aliases = theme.textures ?? {};
    const add = (part: string, textureKey: string, extra: Partial<SkinSprite> = {}) => {
        const sprite = skinSpriteOf(textureKey, aliases);

        if (!sprite) return;

        const size = frames?.[sprite]?.frame;

        sprites.push({ part, sprite, overlay: `${THEME_SKIN_LIBRARY}/${sprite}`, ...(size ? { width: size.w, height: size.h } : {}), ...extra });
    };

    if (component === 'icon') {
        const rect = theme.icons?.[style];

        if (rect) add(`icons.${style}`, 'icon-set-src', { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });

        return sprites;
    }

    const walk = (value: unknown, path: string[]) => {
        if (Array.isArray(value)) {
            value.forEach((each, index) => walk(each, [ ...path, String(index) ]));

            return;
        }

        if (!isRecord(value)) return;

        if (typeof value.textureKey === 'string') {
            const slice = [ value.leftWidth, value.topHeight, value.rightWidth, value.bottomHeight ].every(each => typeof each === 'number')
                ? { slice: { left: value.leftWidth as number, top: value.topHeight as number, right: value.rightWidth as number, bottom: value.bottomHeight as number } }
                : {};

            add(path.join('.'), value.textureKey, slice);
        }

        for (const [ key, child ] of Object.entries(value)) {
            // A variant's own settings, which name no art.
            if ((path.length === 0) && ((key === 'layout') || (key === 'dropShadow'))) continue;

            walk(child, [ ...path, key ]);
        }
    };

    walk(theme.variants[component]?.[style], []);

    return sprites;
};

/** Every skin of the theme that draws a sprite, by sprite name: each one an overlay of that sprite re-skins. */
export const themeSpriteSkins = (theme: Pick<ThemeVariantsData, 'variants' | 'icons' | 'textures'>): Map<string, string[]> => {
    const bySprite = new Map<string, string[]>();
    const skins: [ string, string ][] = [
        ...Object.entries(theme.variants).flatMap(([ component, variants ]) => Object.keys(variants).map(style => [ component, style ] as [ string, string ])),
        ...Object.keys(theme.icons ?? {}).map(style => [ 'icon', style ] as [ string, string ]),
    ];

    for (const [ component, style ] of skins) {
        for (const { sprite } of themeSkinSprites(theme, component, style)) {
            const ids = bySprite.get(sprite) ?? [];

            if (!ids.includes(skinId(component, style))) ids.push(skinId(component, style));

            bySprite.set(sprite, ids);
        }
    }

    return bySprite;
};

/** The skins a component draws inside itself, each in its own cascade over the one around it. */
const insideSkins = (theme: Pick<ThemeVariantsData, 'cascade'>, ref: TemplateSkinRef, around: VariantCascadeMap, into: TemplateSkinRef[]) => {
    const own = { ...around, ...theme.cascade[ref.component]?.[ref.style] };

    for (const component of DRAWN_INSIDE[ref.component] ?? []) {
        const inner = { component, style: own[component] ?? '0', via: ref.via ?? skinId(ref.component, ref.style) };

        into.push(inner);
        insideSkins(theme, inner, own, into);
    }
};

/** The skins one element draws, given what the components around it cascade. */
const ownSkins = (theme: Pick<ThemeVariantsData, 'cascade'>, element: TemplateElement, cascade: VariantCascadeMap): TemplateSkinRef[] => {
    const refs: TemplateSkinRef[] = [];

    if ((element.tag === 'frame') && (element.style === FRAMELESS)) return refs;

    for (const component of TEMPLATE_SKIN_COMPONENTS[element.tag] ?? []) {
        const ref = { component, style: element.style ?? (TAB_TAGS.has(element.tag) ? '0' : (cascade[component] ?? '0')) };

        refs.push(ref);
        insideSkins(theme, ref, cascade, refs);
    }

    return refs;
};

/** The cascade the children of an element drawing `refs` see: each skin's own over the one around it. */
const cascadeUnder = (theme: Pick<ThemeVariantsData, 'cascade'>, refs: readonly TemplateSkinRef[], around: VariantCascadeMap): VariantCascadeMap => refs
    .filter(ref => !ref.via)
    .reduce<VariantCascadeMap>((cascade, ref) => ({ ...cascade, ...theme.cascade[ref.component]?.[ref.style] }), around);

/**
 * The skins the last element of `chain` (from the window's root down) draws: its own and those it
 * draws inside itself (a frame's header), each with the variant the components around it cascade.
 */
export const templateElementSkins = (chain: readonly TemplateElement[], theme: Pick<ThemeVariantsData, 'cascade'>): TemplateSkinRef[] => {
    let cascade: VariantCascadeMap = {};

    for (let at = 0; at < chain.length; at++) {
        const refs = ownSkins(theme, chain[at], cascade);

        if (at === chain.length - 1) return refs;

        cascade = cascadeUnder(theme, refs, cascade);
    }

    return [];
};

/** A skin in the map. */
export interface SkinMapEntry {
    component: string;
    style: string;
    /** The colour its art is tinted with when the window sets none (`#rrggbb`). */
    tintColor?: string;
    sprites: SkinSprite[];
    /**
     * The windows that draw it: template windows by template id, the keys of the elements that do
     * (`''` the window's root), and the frames of windows Nitro draws without a template by their frame
     * id (`wired-setup`: `['']`) - what a patch names them by.
     */
    windows: Record<string, string[]>;
}

/** `skins.json`: every skin with art, and every sprite they draw. */
export interface SkinMap {
    version: 1;
    /** By `skinId` (`border:9`). */
    skins: Record<string, SkinMapEntry>;
    /** By sprite name: its size and the skins drawing it - every one of which an overlay of it re-skins. */
    sprites: Record<string, { width?: number; height?: number; skins: string[] }>;
}

const sorted = <T>(record: Record<string, T>): Record<string, T> => Object.fromEntries(Object.entries(record).sort(([ a ], [ b ]) => a.localeCompare(b)));

/**
 * The skin map of a theme and the templates drawn with it: every skin of the theme that draws a sprite
 * (React-drawn windows use those no template names), each with the template elements that draw it - a
 * composite element's (`scrollable_itemlist_vertical`) inner window layout's skins its own - and the
 * frames of Nitro's own windows (`nitroFrames`: frame id to the frame styles it is drawn in), and every
 * sprite with the skins it is in. Keys are sorted, so the same input writes the same file.
 */
export const buildSkinMap = (theme: ThemeVariantsData, frames: SkinSheetFrames, templates: Readonly<Record<string, Template>>, nitroFrames: Readonly<Record<string, readonly string[]>> = {}): SkinMap => {
    const skins: Record<string, SkinMapEntry> = {};

    for (const [ component, variants ] of Object.entries(theme.variants)) {
        for (const [ style, variant ] of Object.entries(variants)) {
            const sprites = themeSkinSprites(theme, component, style, frames);

            if (!sprites.length) continue;

            skins[skinId(component, style)] = { component, style, ...(variant.tintColor ? { tintColor: variant.tintColor } : {}), sprites, windows: {} };
        }
    }

    for (const style of Object.keys(theme.icons ?? {})) {
        skins[skinId('icon', style)] = { component: 'icon', style, sprites: themeSkinSprites(theme, 'icon', style, frames), windows: {} };
    }

    const note = (ref: TemplateSkinRef, id: string, key: string) => {
        const entry = skins[skinId(ref.component, ref.style)];

        if (!entry) return;

        const keys = (entry.windows[id] ??= []);

        if (!keys.includes(key)) keys.push(key);
    };

    for (const [ id, template ] of Object.entries(templates)) {
        // `key` names the element a composite's inner layout is drawn for: its own elements are no template's.
        const walk = (elements: readonly TemplateElement[], chain: readonly TemplateElement[], cascade: VariantCascadeMap, key?: string) => {
            for (const element of elements) {
                const at = [ ...chain, element ];
                const refs = ownSkins(theme, element, cascade);
                const elementKey = key ?? templateElementKey(at);

                if (elementKey !== undefined) refs.forEach(ref => note(ref, id, elementKey));

                const under = cascadeUnder(theme, refs, cascade);
                const composite = template.skins?.[templateSkinKey(element.tag, element.style)];

                if (composite && (elementKey !== undefined)) walk(composite.elements, at, under, elementKey);

                walk(element.children, at, under, key);
            }
        };

        // The window's root is its first element: the chain a key is counted from starts there.
        for (const root of template.elements) {
            const refs = ownSkins(theme, root, {});

            refs.forEach(ref => note(ref, id, ''));
            walk(root.children, [ root ], cascadeUnder(theme, refs, {}));
        }
    }

    for (const [ id, styles ] of Object.entries(nitroFrames)) {
        for (const style of styles) note({ component: 'frame', style }, id, '');
    }

    const sprites: SkinMap['sprites'] = {};

    for (const [ id, entry ] of Object.entries(skins)) {
        entry.windows = sorted(entry.windows);

        for (const sprite of entry.sprites) {
            const indexed = (sprites[sprite.sprite] ??= { ...(sprite.width !== undefined ? { width: sprite.width, height: sprite.height } : {}), skins: [] });

            if (!indexed.skins.includes(id)) indexed.skins.push(id);
        }
    }

    return { version: 1, skins: sorted(skins), sprites: sorted(sprites) };
};

/** A sprite's alpha channel, one byte per pixel, row by row (`getTextureAlpha`). */
export interface SkinSpriteAlpha {
    width: number;
    height: number;
    data: ArrayLike<number>;
}

/**
 * How much of a skin's tinted art (its `layer` sprite) its `plain` twin covers with opaque pixels, 0
 * to 1: the untinted pieces are drawn over the tinted layer, so the window's colour shows only where
 * the plain sprite is transparent. 0 when the layer paints nothing.
 */
export const plainCoverOfTint = (layer: SkinSpriteAlpha, plain: SkinSpriteAlpha): number => {
    let painted = 0;
    let covered = 0;

    for (let y = 0; y < layer.height; y++) {
        for (let x = 0; x < layer.width; x++) {
            if (!layer.data[(y * layer.width) + x]) continue;

            painted++;

            if ((x < plain.width) && (y < plain.height) && (plain.data[(y * plain.width) + x] === 255)) covered++;
        }
    }

    return painted ? (covered / painted) : 0;
};
