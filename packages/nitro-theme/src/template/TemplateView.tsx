/**
 * A Flash window template drawn with the theme: the `<layout>` a `WindowParser` builds, as data
 * (`TemplateElement`), each element the theme component its type is - a `frame` a `Frame`, a `button` a
 * `Button`, a `text` a `ThemeText`, a `static_bitmap` a `ThemeImage` - at the rect the template gives
 * it, its `style` the variant, its `color` the tint.
 *
 * A template's one root window is drawn at its origin: its own `x`/`y` are where the designer left it
 * on screen, and the window's code places it.
 *
 * It draws a template at its own size, which is where every element's rect is exact: the scale
 * params (`relative_*_scale_*`) only say where an element goes when its parent is resized, and a
 * template drawn as it stands is not. What a window's code does with its named elements
 * (`findChildByName`) comes in as `bindings` (`templateBindings`): a caption, whether it shows, a
 * click. Its texts (`${key}`) are read through `resolveText`, and its bitmaps (`asset_uri`) through
 * `imageUrl`.
 *
 * Takes a template converted by `layoutToTemplate` (variables typed, colours numbers) or Studio's
 * preview of one (everything the XML's text).
 *
 * Mirrors `scripts/generate-layout-views.ts`, which turns the same XML into TSX: the same element
 * types onto the same components, a text's style, colour, wrap and alignment read from its vars the
 * same way.
 */
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, Graphics as PixiGraphics, RenderLayer } from 'pixi.js';
import { createContext, memo, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore } from 'react';

import { Border } from '../Border';
import { Box, BoxLayout } from '../Box';
import { Bubble, PointerDirection } from '../Bubble';
import { Button } from '../Button';
import { ButtonGroupCenter } from '../ButtonGroupCenter';
import { ButtonGroupLeft } from '../ButtonGroupLeft';
import { ButtonGroupRight } from '../ButtonGroupRight';
import { ButtonThick } from '../ButtonThick';
import { CheckBox } from '../CheckBox';
import { CloseButton } from '../CloseButton';
import { ContainerButton } from '../ContainerButton';
import { Droplist } from '../Droplist';
import { Dropmenu } from '../Dropmenu';
import { Frame, FrameProps } from '../Frame';
import { Gradient, GradientDirection } from '../Gradient';
import { Header } from '../Header';
import { loadTexture, useTextureFromUrl } from '../hooks/usePixiTexture';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { RadioButton } from '../RadioButton';
import { Region, RegionProps } from '../Region';
import { Scaler } from '../Scaler';
import { ScrollArea } from '../ScrollArea';
import { Shape, ShapeKind } from '../Shape';
import { TabButton } from '../TabButton';
import { TabContent } from '../TabContent';
import { TabContext } from '../TabContext';
import { TextInput } from '../TextInput';
import { ImageProps, ThemeImage } from '../ThemeImage';
import { ThemeText } from '../ThemeText';
import { ButtonVariant, FLASH_INVERT_COLOR, FlashBitmapVars, flashBlendMode, themeVariantOf, WindowPlacedContext } from '../utils';
import { localizeCaption } from './localizeCaption';
import { isMarkupTemplateText, measureTemplateText, templateFontSize, templateTextFormat, templateTextStyle, templateWrapWidth } from './measureTemplateText';
import { resolveTemplateNames, TemplateBinding, TemplateBindings, TemplateBindingStore, TemplateExpander, TemplateWindows } from './templateBindings';
import { Template, TemplateElement, templateSkinKey, TemplateValue } from './templateData';
import { layoutTemplate, LayoutWindow, linkTemplateScrollbars, TEMPLATE_LISTS, TEMPLATE_SCROLLBAR_TAGS, TemplateArrange, TemplateButtonLabel, TemplateRect, templateTextMargins, templateUsesParentGraphics } from './templateLayout';
import { TemplateScrollbar, TemplateScrollTarget } from './TemplateScroll';
import { TemplateScrollAxis, TemplateScrollStore } from './templateScrollStore';

export type { Template, TemplateElement } from './templateData';

export interface TemplateViewProps {
    template: Template;
    /** A caption's `${key}`: the text it names, or `undefined` to show the key. */
    resolveText?: (key: string) => string | undefined;
    /** Where a bitmap the template names (`asset_uri`) is. */
    imageUrl?: (asset: string) => string;
    /** What the window's code does with its named elements. */
    bindings?: TemplateBindings;
    /** Draws the `visible="false"` elements too, faded. */
    showHidden?: boolean;
    /** Gives each frame an id of its own, for the window layer. */
    idPrefix?: string;
    /**
     * The window's size, when its code or its scaler sets one: the root window is resized to it and
     * its children follow by their relative scale. Its layout size otherwise.
     */
    width?: number;
    height?: number;
    /**
     * What the window's code does once the layout is built: moves and sizes windows by what it measures,
     * through the window model (`LayoutWindow.setRectangle`, `textWidth`). Runs on every layout.
     */
    arrange?: (windows: TemplateWindows) => void;
    /**
     * How the window manager opens the root frame, when the template is a window of its own
     * (`buildFromXML(xml, 1)`): its id on the desktop, where it opens, and what its close button
     * does (`findChildByTag("close").procedure`). It is dragged like any window. Without it, a root
     * frame is drawn where the template is, fixed. Its `onHelp` is the window manager's
     * `helpButtonAction` (`openHelpPage`), which `buildFromXML` gives the root frame.
     */
    frame?: TemplateFrameOptions;
}

export type TemplateFrameOptions = Required<Pick<FrameProps, 'id'>> & Pick<FrameProps, 'defaultPosition' | 'centered' | 'onPositionChange' | 'onClose' | 'resizeDirection' | 'rememberPosition' | 'rememberSize' | 'closeButtonVisible' | 'onHelp'> & {
    /**
     * The frame is a modal dialog's (`buildModalDialogFromXML`), drawn inside a `ModalDialog`: it stays
     * in the modal's layer, which centres it, rather than going onto the window desktop under the
     * modal's backdrop. Its close and its drag work as a window's.
     */
    modal?: boolean;
    /**
     * Whether the user can drag the window (on by default). Off for a frame Flash does not move: a
     * modal dialog's, or one whose layout is no drag target (`nestBreedingSuccess`).
     */
    draggable?: boolean;
};

type FrameSize = { width: number; height: number };

export type { TemplateItem, TemplateWindows } from './templateBindings';

/**
 * A Flash colour as `#rrggbb` and its alpha: a converted `0xAARRGGBB` number, or the attribute's text
 * (`0xAARRGGBB`, `0xRRGGBB`).
 */
const flashColor = (value: TemplateValue | undefined): { hex: string; alpha: number } | undefined => {
    if (typeof value === 'number') return { hex: `#${(value & 0xffffff).toString(16).padStart(6, '0')}`, alpha: (value >>> 24) / 255 };
    if (typeof value !== 'string') return undefined;

    const digits = value.replace(/^0x/i, '').replace(/^#/, '');

    if (!digits || !/^[0-9a-f]{1,8}$/i.test(digits)) return undefined;

    const padded = digits.padStart(digits.length > 6 ? 8 : 6, '0');
    const alpha = padded.length === 8 ? Number.parseInt(padded.slice(0, 2), 16) / 255 : 1;

    return { hex: `#${padded.slice(-6).toLowerCase()}`, alpha };
};

/** `ShapeController.normalizeShape`'s kinds; any other is a rectangle. */
const SHAPE_KINDS = new Set([ 'rectangle', 'round_rectangle', 'ellipse', 'rhombus' ]);

/** A colour as the `0xAARRGGBB` number Flash's `uint(...)` makes of it. */
const flashUint = (value: TemplateValue | undefined): number | undefined => {
    if (typeof value === 'number') return value >>> 0;
    if (typeof value !== 'string' || !/^0x[0-9a-f]+$/i.test(value)) return undefined;

    return Number(BigInt.asUintN(32, BigInt(value)));
};

const flashBool = (value: TemplateValue | undefined) => value === true || value === 'true' || value === '1';

const flashString = (value: TemplateValue | undefined) => (typeof value === 'string' ? value : undefined);

/** The Flash blend mode a window's `BLEND_<mode>` tag names (`WindowRendererItem.render`: the last such tag, lower-cased). */
const flashBlendTag = (element: TemplateElement): string | undefined => element.tags?.findLast(each => each.startsWith('BLEND_'))?.slice(6).toLowerCase();

const GRADIENT_DIRECTIONS = new Set<GradientDirection>([ 'up', 'down', 'left', 'right', 'up_left', 'up_right', 'down_left', 'down_right' ]);

/** A tint: a colour that changes anything (white, and none, leave a skin as it is). */
const tintOf = (element: TemplateElement, binding?: TemplateBinding) => {
    const color = flashColor(binding?.color ?? element.color);

    return color && color.hex !== '#ffffff' ? color.hex : undefined;
};

/** How a list places its items: along its axis, or in rows. */
type Flow = { direction: 'column' | 'row'; wrap: boolean };

/**
 * The flow of each list the layout does not arrange (grids, selectors), made once: a memoised item
 * compares it by identity. An arranged list's items are drawn at the rects the layout gives them.
 */
const FLOWS: Record<string, Flow> = Object.fromEntries(Object.entries(TEMPLATE_LISTS)
    .filter(([ , list ]) => !list.arranged)
    .map(([ tag, list ]) => [ tag, { direction: list.direction, wrap: !!list.wrap } ]));

const TEXT_TAGS = new Set([ 'text', 'label', 'formatted_text', 'html', 'link' ]);
const BITMAP_TAGS = new Set([ 'bitmap', 'static_bitmap' ]);

/** The flag a bitmap var turns from its default, as `FlashBitmapVars` takes it. */
const bitmapVars = (vars: Record<string, TemplateValue>): FlashBitmapVars => {
    const bitmap: Record<string, unknown> = {};
    const flag = (key: string, field: string, fallback: boolean) => {
        if (vars[key] !== undefined && flashBool(vars[key]) !== fallback) bitmap[field] = !fallback;
    };
    const number = (key: string, field: string, fallback: number) => {
        if (vars[key] !== undefined && Number.isFinite(Number(vars[key])) && Number(vars[key]) !== fallback) bitmap[field] = Number(vars[key]);
    };

    flag('stretched_x', 'stretchedX', true);
    flag('stretched_y', 'stretchedY', true);
    number('zoom_x', 'zoomX', 1);
    number('zoom_y', 'zoomY', 1);
    flag('wrap_x', 'wrapX', false);
    flag('wrap_y', 'wrapY', false);
    flag('flip_x', 'flipX', false);
    flag('flip_y', 'flipY', false);
    number('rotation', 'rotation', 0);
    flag('fit_size_to_contents', 'fitSizeToContents', false);

    const etching = flashUint(vars.etching_color);

    if (etching) bitmap.etchingColor = etching;
    if (flashString(vars.pivot_point)) bitmap.pivot = vars.pivot_point;

    return bitmap;
};

/**
 * What a bitmap window draws: the asset its code sets, else its layout's, as `imageUrl` finds it. A
 * `${key}` in the name is the client's to fill (`${image.library.questing.url}`); any other `$` is an
 * embedded asset's hashed name, which no bundle carries.
 */
const bitmapSourceOf = (element: TemplateElement, binding: TemplateBinding | undefined, imageUrl: ((asset: string) => string) | undefined): string | undefined => {
    const name = binding?.asset ?? (flashString(element.vars.asset_uri) || flashString(element.vars.bitmap_asset_name));

    return (name && !/\$(?!\{)/.test(name) && imageUrl) ? imageUrl(name) : undefined;
};

/**
 * The bitmaps that take their own size (`fit_size_to_contents`) - what the layout reads their size
 * from - with a redraw as each one loads, so the layout runs again with it.
 */
const useFittedBitmapSizes = (elements: readonly TemplateElement[], byElement: ReadonlyMap<TemplateElement, TemplateBinding>, imageUrl: ((asset: string) => string) | undefined) => {
    const sources = new Map<TemplateElement, string>();
    const walk = (element: TemplateElement) => {
        if (BITMAP_TAGS.has(element.tag) && flashBool(element.vars.fit_size_to_contents)) {
            const src = bitmapSourceOf(element, byElement.get(element), imageUrl);

            if (src) sources.set(element, src);
        }

        element.children.forEach(walk);
    };

    elements.forEach(walk);

    const missing = [ ...new Set(sources.values()) ].filter(src => !GetAssetManager().getTexture(src)).sort().join('\n');
    const [ , setLoaded ] = useState(0);

    useEffect(() => {
        if (!missing) return;

        let cancelled = false;

        for (const src of missing.split('\n')) {
            void loadTexture(src).then((texture) => {
                if (texture && !cancelled) setLoaded(count => count + 1);
            });
        }

        return () => {
            cancelled = true;
        };
    }, [ missing ]);

    return (element: TemplateElement) => {
        const src = sources.get(element);
        const texture = src ? GetAssetManager().getTexture(src) : undefined;

        return texture ? { width: texture.width, height: texture.height } : undefined;
    };
};

/** A widget's own vars, `<type>:`-prefixed in the layout (`badge_image:zoom_x`), without the prefix. */
const widgetVars = (vars: Record<string, TemplateValue>, type: string): Record<string, TemplateValue> => {
    const prefix = `${type}:`;

    return Object.fromEntries(Object.entries(vars).filter(([ key ]) => key.startsWith(prefix)).map(([ key, value ]) => [ key.slice(prefix.length), value ]));
};

/**
 * What every element of one `TemplateView` shares. Kept the same object while its inputs are, so a
 * memoised element only redraws when its own binding changes - or when this does (the texts changed
 * language), which redraws them all.
 */
interface Context {
    resolveText: (caption: string | undefined) => string;
    imageUrl?: (asset: string) => string;
    store: TemplateBindingStore;
    showHidden: boolean;
    idPrefix: string;
    frame?: TemplateFrameOptions;
    /** The scroll each standalone scrollbar shares with its target. */
    scroll: TemplateScrollStore;
    /** The window's frame resized by the user, which the template is laid out at. */
    onFrameResize: (size: FrameSize | null) => void;
    /** The template's window layouts (`Template.skins`), by `templateSkinKey`. */
    skins?: Template['skins'];
}

/** Each standalone scrollbar's target (`linkTemplateScrollbars`), each target's axes, and the targets. */
interface ScrollLinks {
    scrollbars: ReadonlyMap<TemplateElement, TemplateElement>;
    scrollAxes: ReadonlyMap<TemplateElement, ReadonlySet<TemplateScrollAxis>>;
    scrollTargets: ReadonlySet<TemplateElement>;
}

/**
 * The scroll links of the elements drawn, handed to them apart from `Context`: they change with the
 * elements - when clones come or go - which `Context` does not.
 */
const ScrollLinksContext = createContext<ScrollLinks>({ scrollbars: new Map(), scrollAxes: new Map(), scrollTargets: new Set() });

/** Whether nothing in a window's subtree is a display object of its own: all of it draws into its parent's graphic context. */
const drawsIntoParentOnly = (element: TemplateElement): boolean => templateUsesParentGraphics(element) && element.children.every(drawsIntoParentOnly);

type DisplayRect = { x: number; y: number; width: number; height: number };

const displayRects = new WeakMap<TemplateElement, DisplayRect[]>();

/**
 * Where a window has display objects of its own, in its parent's space: all of it when it has its
 * own graphic context, else its descendants that do - its face goes into the parent's context.
 */
const displayRectsOf = (element: TemplateElement): DisplayRect[] => {
    let rects = displayRects.get(element);

    if (rects) return rects;

    const collect = (window: TemplateElement, x: number, y: number, out: DisplayRect[]) => {
        for (const child of window.children) {
            if (templateUsesParentGraphics(child)) collect(child, x + child.x, y + child.y, out);
            else out.push({ x: x + child.x, y: y + child.y, width: child.width, height: child.height });
        }

        return out;
    };

    rects = templateUsesParentGraphics(element) ? collect(element, element.x, element.y, []) : [ { x: element.x, y: element.y, width: element.width, height: element.height } ];
    displayRects.set(element, rects);

    return rects;
};

const overlaps = (element: TemplateElement, rects: DisplayRect[]) => rects.some(rect => (element.x < (rect.x + rect.width)) && (rect.x < (element.x + element.width)) && (element.y < (rect.y + rect.height)) && (rect.y < (element.y + element.height)));

/**
 * The order a window's children draw in. What draws into the window's own graphic context lies
 * under every display object over it, so a child whose whole subtree draws into the context goes
 * under an earlier sibling's display objects where it meets them - a later sibling's border
 * cannot cover a region inside an earlier container (`bottom_bar_left`'s border over its arrows'
 * regions). Elsewhere it keeps its place, over the earlier sibling's face drawn into the same
 * context (the badges page's `filter.rarity` over `options_container`).
 *
 * A child drawn into the context with windows of their own under it goes there too, `split`: only
 * what it draws into the context moves, while those windows - child contexts nested in its own
 * (`WindowController.addChild`) - stay over the earlier sibling's. The reward track's `rewards`
 * panel lies under `cutout`'s profile and curve, its prizes and bar over them.
 *
 * Only a sibling with a context of its own is a display object to go under. One drawn into the
 * context itself stays under the later child, as the one bitmap draws them in tree order, and its
 * own-context windows are `lifted` over it instead: drawn after the last such child they meet.
 */
const childDrawOrder = (element: TemplateElement): { order: number[]; moved: Set<number>; split: Set<number>; lifted: Map<number, number> } => {
    const order: number[] = [];
    const moved = new Set<number>();
    const split = new Set<number>();
    const lifted = new Map<number, number>();

    element.children.forEach((child, index) => {
        if (!templateUsesParentGraphics(child)) {
            order.push(index);

            return;
        }

        // An earlier sibling drawn into the context itself, with windows of their own under it: its
        // face stays under this child, in tree order in the one bitmap, and only those windows rise
        // over it - `club_center_xml`'s post-it over the blue box, under its link.
        element.children.forEach((earlier, earlierIndex) => {
            if ((earlierIndex < index) && templateUsesParentGraphics(earlier) && !drawsIntoParentOnly(earlier) && overlaps(child, displayRectsOf(earlier))) lifted.set(earlierIndex, index);
        });

        const under = order.findIndex(earlier => !templateUsesParentGraphics(element.children[earlier]) && overlaps(child, displayRectsOf(element.children[earlier])));

        if (under < 0) {
            order.push(index);
        } else {
            order.splice(under, 0, index);
            moved.add(index);

            if (!drawsIntoParentOnly(child)) split.add(index);
        }
    });

    return { order, moved, split, lifted };
};

/**
 * Where a press lands is the window tree's business, not the drawing's: `MouseEventProcessor` takes
 * the windows under the point that process input (`groupParameterFilteredChildrenUnderPoint(point,
 * list, 1)`, in tree order) and tries the last first, so a later sibling takes the press over an
 * earlier one wherever they meet - whichever of them draws on top. Pixi hits in the order it draws,
 * so the children stay in tree order and a child `childDrawOrder` moves under an earlier sibling is
 * only drawn there, through a `RenderLayer` placed before that sibling (which hit testing ignores):
 * `sanction_info_xml`'s `ok_button` draws under `faq_link`'s display object and still takes the
 * press where the link's box covers it.
 *
 * `drawOrder` is the order of `indices` (a subset of the children) as they draw. A moved child that
 * still draws after every child before it in the tree is in place and needs no layer. A `split` one's
 * windows with a context of their own draw at its place in the tree, through a layer of their own
 * (`ClipEscapeContext`) - or through `escape`, the one a clipping ancestor's mask gives, past it.
 */
const treeOrderedChildren = (drawOrder: number[], moved: Set<number>, views: Map<number, ReactNode>, layers: (slot: number) => RenderLayer, split: Set<number>, escape: RenderLayer | undefined, lifted: ReadonlyMap<number, number> = NO_LIFTS): ReactNode[] => {
    const slots = new Map<number, number[]>();
    const relayered = new Map<number, number>();

    drawOrder.forEach((index, position) => {
        if (!moved.has(index)) return;

        const next = drawOrder.slice(position + 1).find(later => !moved.has(later));

        if ((next === undefined) || (next > index)) return;

        slots.set(next, [ ...(slots.get(next) ?? []), index ]);
        relayered.set(index, next);
    });

    const liftedHere = [ ...lifted ].filter(([ index, after ]) => drawOrder.includes(index) && drawOrder.includes(after));

    if (!relayered.size && !liftedHere.length) return drawOrder.map(index => views.get(index));

    // A lifted child's windows with a context of their own draw through a layer placed after the
    // last sibling drawn into the context over it (or through `escape`, past a clipping mask).
    const liftLayers = new Map(liftedHere.map(([ index ]) => [ index, escape ?? layers(liftSlot(index)) ]));
    const liftSlots = new Map<number, number[]>();

    if (!escape) liftedHere.forEach(([ index, after ]) => liftSlots.set(after, [ ...(liftSlots.get(after) ?? []), index ]));

    const viewOf = (index: number) => {
        const layer = liftLayers.get(index);

        return layer
            ? (
                    <ClipEscapeContext.Provider
                        key={`lifted:${index}`}
                        value={layer}
                    >
                        {views.get(index)}
                    </ClipEscapeContext.Provider>
                )
            : views.get(index);
    };
    const out: ReactNode[] = [];
    const pushLiftSlots = (after: number) => liftSlots.get(after)?.forEach(index => out.push(
        <DrawSlot
            key={`lift-slot:${index}`}
            layer={layers(liftSlot(index))}
        />,
    ));

    for (const index of [ ...drawOrder ].sort((a, b) => a - b)) {
        if (slots.has(index)) {
            out.push(
                <DrawSlot
                    key={`draw-slot:${index}`}
                    layer={layers(index)}
                />,
            );
        }

        const slot = relayered.get(index);

        if (slot === undefined) {
            out.push(viewOf(index));
            pushLiftSlots(index);
            continue;
        }

        // A lifted child's own-context windows go through its lift layer, after this split one's place.
        const ownContexts = (split.has(index) && !liftLayers.has(index)) ? (escape ?? layers(splitSlot(index))) : undefined;

        out.push(
            <DrawnIn
                key={`drawn-in:${index}`}
                layer={layers(slot)}
            >
                {ownContexts ? <ClipEscapeContext.Provider value={ownContexts}>{views.get(index)}</ClipEscapeContext.Provider> : viewOf(index)}
            </DrawnIn>,
        );

        if (ownContexts && !escape) {
            out.push(
                <DrawSlot
                    key={`split-slot:${index}`}
                    layer={ownContexts}
                />,
            );
        }

        pushLiftSlots(index);
    }

    return out;
};

/** A `RenderLayer` at its place among its siblings: what is attached to it draws here. */
const DrawSlot = ({ layer }: { layer: RenderLayer }) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);

    useEffect(() => {
        if (!node) return;

        node.addChild(layer);

        return () => {
            node.removeChild(layer);
        };
    }, [ node, layer ]);

    return (
        <Box
            ref={setNode}
            pointerTransparent
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        />
    );
};

/** A child at its place in the tree, for hit testing, drawn through `layer`. */
const DrawnIn = ({ layer, children }: { layer: RenderLayer; children: ReactNode }) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);

    useEffect(() => {
        if (!node) return;

        layer.attach(node);

        return () => {
            layer.detach(node);
        };
    }, [ node, layer ]);

    return (
        <Box
            ref={setNode}
            pointerTransparent
            layout={FILL}
        >
            {children}
        </Box>
    );
};

/**
 * The layer a clipping window draws its escaping descendants through, for the windows under its mask.
 * Flash masks only what is drawn into a window's own graphic context: `GraphicContext.setDrawRegion`
 * puts the clip on `getDisplayObject()` (its drawn bitmap), while each child context is added beside
 * it (`addChildContext`), unmasked, and `WindowRenderer.childRectToClippedDrawRegion` clips a window's
 * drawing by its ancestors only while each draws into its parent's (`use_parent_graphic_context`). So a
 * window with a context of its own anywhere under a clipping window - its direct children and those
 * deeper down - draws uncut: the HC tab's `chat_flood_sensitivity`
 * drop menu, inside `tab_container_4` (which draws into `content_container`'s context and reaches
 * 26 px past it). Such a window stays in the tree, where hit testing finds it, and draws through this
 * layer, which sits after the mask; below it the context is cleared, as its subtree is in its own.
 */
const ClipEscapeContext = createContext<RenderLayer | undefined>(undefined);

/** The key of a clipping window's escape layer among its draw layers, apart from every child slot. */
const ESCAPE_SLOT = -1;

/** The key of a `split` child's own-context layer among its parent's draw layers. */
const splitSlot = (index: number) => -2 - index;

/** The key of a lifted child's own-context layer, apart from the split ones. */
const liftSlot = (index: number) => -1000000 - index;

const NO_LIFTS: ReadonlyMap<number, number> = new Map();

/** The render layers of one window's children, by the sibling they draw before; made once each. */
const useDrawLayers = () => {
    const [ layers ] = useState(() => new Map<number, RenderLayer>());

    return (slot: number) => {
        let layer = layers.get(slot);

        if (!layer) {
            layer = new RenderLayer();
            layers.set(slot, layer);
        }

        return layer;
    };
};

/**
 * The checkbox and radio button styles whose `habbo_element_description` entry has a `window_layout`
 * with a `_CAPTION_TEXT` field (`CheckBoxController.set caption` writes the caption there): the
 * illumina switch (100) and basic checkbox (101), and the illumina radio button (100). The Habbo
 * styles (0-2) are only their skin, so their caption is not drawn.
 */
const CAPTIONED_CHECKBOX_STYLES = new Set([ 100, 101 ]);
const CAPTIONED_RADIO_STYLES = new Set([ 100 ]);

/** A `#icon` / `#bg` tag: the part of its `dynamicStyle` host's look it takes. */
const dynamicRoleOf = (element: TemplateElement) => (element.tags?.includes('#icon') ? 'icon' : element.tags?.includes('#bg') ? 'bg' : undefined);

/** Its caption: the binding's over the layout's. */
const captionOf = (element: TemplateElement, context: Context, binding: TemplateBinding | undefined) => binding?.htmlText ?? localizeCaption(binding?.caption ?? element.caption, context.resolveText);

/** Its tooltip: the binding's over the layout's `tool_tip_caption`. */
const tooltipOf = (element: TemplateElement, context: Context, binding: TemplateBinding | undefined) => {
    const tooltip = binding?.tooltip ?? flashString(element.vars.tool_tip_caption);

    return tooltip ? context.resolveText(tooltip) : undefined;
};

/**
 * An element's box in its parent: at its rect - or, an item of a list, in the list's flow at its own
 * size, only its cross-axis coordinate kept (`ItemListController.updateScrollAreaRegion` sets the other).
 */
const rectOf = (rect: TemplateRect, flow?: Flow): BoxLayout => (flow
    ? {
            position: 'relative',
            width: rect.width,
            height: rect.height,
            flexShrink: 0,
            ...(!flow.wrap && flow.direction === 'column' && rect.x ? { marginLeft: rect.x } : {}),
            ...(!flow.wrap && flow.direction === 'row' && rect.y ? { marginTop: rect.y } : {}),
        }
    : { position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height });

/**
 * Where a part of a window layout ends up once the window built from it is resized from the layout's
 * size to `rect`: by its `relative_*_scale` params, a stretched side keeping its inset from the far
 * edge, a moved one its distance, a centred one its centre, a fixed one where it is.
 */
const skinPartRect = (part: TemplateElement, skin: Template, rect: TemplateRect): TemplateRect => {
    const axis = (scale: string | undefined, position: number, size: number, from: number, to: number) => {
        const delta = to - from;

        switch (scale) {
            case 'stretch': return [ position, size + delta ];
            case 'move': return [ position + delta, size ];
            case 'center': return [ Math.trunc(position + (delta / 2)), size ];
            default: return [ position, size ];
        }
    };
    const [ x, width ] = axis(part.params?.scale?.[0], part.x, part.width, skin.width, rect.width);
    const [ y, height ] = axis(part.params?.scale?.[1], part.y, part.height, skin.height, rect.height);

    return { x, y, width, height };
};

/** The box an element's own face fills: the whole of its rect. */
const FILL: BoxLayout = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' };

const textOf = (element: TemplateElement, rect: TemplateRect, context: Context, binding: TemplateBinding | undefined): ReactNode => {
    const label = element.tag === 'label';
    const style = templateTextStyle(element);
    const textColor = binding?.color ?? element.vars.text_color;
    // An inverting text inverts what is behind it whatever its colour: drawn white under `difference`.
    const inverts = (flashBlendTag(element) === 'invert') && !!flashBlendMode('invert');
    const color = inverts ? FLASH_INVERT_COLOR : (label ? textColor !== undefined : !!flashColor(textColor)?.hex && textColor !== '0x0' && textColor !== 0) ? flashColor(textColor)?.hex : undefined;
    const wordWrap = !label && flashBool(element.vars.word_wrap);
    const autoSize = flashString(element.vars.auto_size) ?? (label ? 'left' : 'none');
    const align = autoSize === 'center' || autoSize === 'right' ? autoSize : undefined;
    const { fontFamily, flash: layoutFlash } = templateTextFormat(element);
    const etched = binding?.etchingColor === undefined ? layoutFlash : { ...layoutFlash, etchingColor: binding.etchingColor || undefined };
    const positioned = binding?.etchingPosition === undefined ? etched : { ...etched, etchingPosition: binding.etchingPosition };
    const flash = binding?.underline === undefined ? positioned : { ...positioned, underline: binding.underline };
    const text = captionOf(element, context, binding);

    if (!text) return null;

    // `TextLabelController`: a label draws its text inside its margins. A text's field goes at its
    // margins too (`TextSkinRenderer.draw`: `tx = margins.left`, `ty = margins.top`), the field as
    // wide as the window less them - but a centred one is centred on the whole window.
    const ownMargins = templateTextMargins(element);
    const margins = (!label && autoSize === 'center') ? { ...ownMargins, left: 0, right: 0 } : ownMargins;
    const fieldWidth = Math.max(0, rect.width - margins.left - margins.right);
    const markup = (binding?.htmlText !== undefined) || isMarkupTemplateText(element);
    // Each window draws into a buffer of its own size (`WindowRendererItem.render`), so a field wider
    // than its window - a centred or right-aligned one, which keeps its window's width
    // (`TextController.refreshTextImage`) - is cut at the window's edges: the effects widget's
    // centred one-line `no_effects` text. Masked only when it overflows, to keep masks few.
    const clipped = !label && ((autoSize === 'none') || ((measureTemplateText(element, text, wordWrap ? fieldWidth : undefined, markup)?.width ?? 0) > fieldWidth));
    // `TextController.background`: the `TextField` fills its rect in its `backgroundColor` - the
    // window's colour (`set color`), white when it has none. A label has no field background.
    // A binding's `color` is the text's colour (`textColor` above), so it fills the field only when
    // the binding itself asks for a background: the infostand's white name over its dark `color`. A
    // binding's `backgroundColor` is the window's colour apart from the text's (`roc_room_thumbnail`'s
    // `tile_size_txt`, whose code sets both), and fills the field whatever the layout says: also a
    // forum quote's grey field (`MessageListView.addTextBlock`: `color = 0xFFCCCCCC`, `background = true`).
    const background = label
        ? undefined
        : (binding?.backgroundColor !== undefined)
                ? flashColor(binding.backgroundColor)
                : ((binding?.background ?? element.background) ? (flashColor(binding?.background ? (binding.color ?? element.color) : element.color) ?? { hex: '#ffffff', alpha: 1 }) : undefined);

    const themeText = (
        <ThemeText
            text={text}
            textStyle={style}
            textOptions={{ fill: color, fontFamily, fontSize: templateFontSize(element), wordWrap: wordWrap || undefined, wordWrapWidth: wordWrap ? templateWrapWidth(fieldWidth) : undefined, align }}
            flashFormat={flash.etchingColor ? { ...flash, etchingPosition: flash.etchingPosition ?? 'bottom' } : flash}
            markup={markup || undefined}
            onLink={binding?.onLink}
            clip={clipped || undefined}
            crop={binding?.crop ? fieldWidth : undefined}
            dynamicRole={dynamicRoleOf(element)}
            verticalAlign="top"
            layout={{ position: 'absolute', left: margins.left, top: margins.top, width: fieldWidth, height: Math.max(0, rect.height - margins.top - margins.bottom) }}
        />
    );

    if (!background) return themeText;

    return (
        <>
            <Region
                backgroundColor={background.hex}
                layout={FILL}
            />
            {themeText}
        </>
    );
};

/** A drop menu's entries: the code's, or the layout's `item_array` (`DropMenuController` populates from it). */
const optionsOf = (element: TemplateElement, binding: TemplateBinding | undefined): readonly string[] | undefined => binding?.options
    ?? (Array.isArray(element.vars.item_array) ? element.vars.item_array.filter((item): item is string => typeof item === 'string') : undefined);

/**
 * What an element draws of its own, filling its rect, under its children. `content` is the children
 * of a face that holds them itself (`container_button`). A window's `BLEND_<mode>` tag blends what it
 * draws into what is behind it (`flashBlendMode`).
 */
const faceOf = (element: TemplateElement, rect: TemplateRect, context: Context, binding: TemplateBinding | undefined, content?: ReactNode): ReactNode => {
    const face = ownFaceOf(element, rect, context, binding, content);
    const blendMode = face ? flashBlendMode(flashBlendTag(element)) : undefined;

    return blendMode
        ? (
                <Box
                    pointerTransparent
                    blendMode={blendMode}
                    layout={FILL}
                >
                    {face}
                </Box>
            )
        : face;
};

const ownFaceOf = (element: TemplateElement, rect: TemplateRect, context: Context, binding: TemplateBinding | undefined, content?: ReactNode): ReactNode => {
    const variant = binding?.style ?? element.style;
    const tintColor = tintOf(element, binding);
    const caption = captionOf(element, context, binding);
    // A caption as plain text: the component draws it in its variant's text style (`wrapTextChildren`).
    const text = caption || undefined;

    if (TEXT_TAGS.has(element.tag)) return textOf(element, rect, context, binding);

    // `TextFieldController`: the field its code reads and writes - its caption the text, its colour
    // and italic the code's (a search field's grey italic placeholder). A `password` window is the
    // same field with `displayAsPassword` on.
    if (element.tag === 'input' || element.tag === 'password') {
        const color = flashColor(binding?.color ?? element.vars.text_color);
        const { fontFamily, flash } = templateTextFormat(element);
        const layoutMaxChars = Number(element.vars.max_chars) > 0 ? Number(element.vars.max_chars) : undefined;
        const maxChars = (binding?.maxChars !== undefined) ? (binding.maxChars > 0 ? binding.maxChars : undefined) : layoutMaxChars;
        // `TextController.background` / `color`: the field filled in the window's colour - white when it
        // has none - when the layout or the code gives it a background, or in the colour the code sets.
        const fill = (binding?.backgroundColor !== undefined)
            ? flashColor(binding.backgroundColor)
            : ((binding?.background ?? element.background) ? (flashColor(element.color) ?? { hex: '#ffffff', alpha: 1 }) : undefined);

        return (
            <TextInput
                value={caption}
                onChange={text => binding?.onChange?.(text)}
                onEnter={() => binding?.onEnter?.()}
                onKeyDown={(event) => {
                    binding?.onKeyDown?.(event.key);
                }}
                onFocusChange={focused => (focused ? binding?.onFocus?.() : binding?.onBlur?.())}
                restrict={binding?.restrict ?? (flashString(element.vars.restrict) || undefined)}
                // `TextFieldController`'s `max_chars`, `word_wrap` / `multiline`, `display_as_password` and `always_show_selection`.
                maxLength={maxChars}
                multiline={flashBool(element.vars.multiline) || flashBool(element.vars.word_wrap) || undefined}
                // `word_wrap` alone wraps the text; only `multiline` takes Enter as a new line.
                lineBreaks={flashBool(element.vars.multiline)}
                password={(element.tag === 'password') || flashBool(element.vars.display_as_password) || undefined}
                alwaysShowSelection={flashBool(element.vars.always_show_selection) || undefined}
                // Focus the code gives or takes (`ITextFieldWindow.focus()`); left alone, the user's.
                focused={binding?.focused}
                // A disabled field (`Util.disableSection`) shows its text and takes no typing.
                editable={binding?.disabled ? false : undefined}
                textStyle={templateTextStyle(element)}
                fontFamily={fontFamily}
                fontSize={templateFontSize(element)}
                textColor={color?.hex ?? '#000000'}
                flashFormat={{ ...flash, ...(binding?.italic !== undefined && { italic: binding.italic }) }}
                flashPlacement
                backgroundColor={fill?.hex ?? null}
                focusedBackgroundColor={fill?.hex ?? null}
                // `TextController`'s `border`: the `TextField`'s one-pixel border, in `border_color` (black by default).
                border={flashBool(element.vars.border) ? (flashColor(element.vars.border_color)?.hex ?? '#000000') : undefined}
                layout={FILL}
            />
        );
    }

    if (BITMAP_TAGS.has(element.tag)) {
        const src = bitmapSourceOf(element, binding, context.imageUrl);

        if (!src) return null;

        return (
            <TemplateBitmap
                src={src}
                previous={bitmapSourceOf(element, undefined, context.imageUrl)}
                // A colour the code sets (`IWindow.color`); the layout's own is not drawn on a bitmap.
                tint={binding?.color !== undefined ? flashColor(binding.color)?.hex : undefined}
                bitmap={{ ...bitmapVars(element.vars), ...(binding?.pivot !== undefined && { pivot: binding.pivot }), ...(binding?.rotation !== undefined && { rotation: binding.rotation }) }}
                // `IBitmapWrapperWindow.greyscale` - the layout's `greyscale` var (a sub menu's `<name>_icon_grey`), or its code's.
                greyscale={binding?.greyscale ?? flashBool(element.vars.greyscale)}
                dynamicRole={dynamicRoleOf(element)}
                layout={{ ...FILL, width: rect.width, height: rect.height }}
            />
        );
    }

    // `BadgeImageWidget`: the badge the code names, drawn with the widget's `badge_image:` bitmap vars.
    if (element.tag === 'widget' && element.vars.widget_type === 'badge_image') {
        if (!binding?.asset || !context.imageUrl) return null;

        return (
            <ThemeImage
                eventMode="none"
                src={context.imageUrl(binding.asset)}
                greyscale={binding.greyscale}
                bitmap={bitmapVars(widgetVars(element.vars, 'badge_image'))}
                layout={{ ...FILL, width: rect.width, height: rect.height }}
            />
        );
    }

    // `SeparatorWidget.refresh`: `illumina_light_separator_horizontal` (a habbo-window-manager-com
    // bitmap, named with its library as every template bitmap is) tiled along the widget at
    // `height / 2 - 1` - or `_vertical` down it at `width / 2 - 1` (`separator:vertical`).
    if (element.tag === 'widget' && element.vars.widget_type === 'separator') {
        if (!context.imageUrl) return null;

        const vertical = flashBool(element.vars['separator:vertical']);
        const offset = Math.trunc((vertical ? rect.width : rect.height) / 2) - 1;

        return (
            <ThemeImage
                eventMode="none"
                src={context.imageUrl(vertical ? 'habbo-window-manager-com-illumina_light_separator_vertical' : 'habbo-window-manager-com-illumina_light_separator_horizontal')}
                bitmap={{ stretchedX: false, stretchedY: false, ...(vertical ? { wrapY: true } : { wrapX: true }) }}
                layout={vertical
                    ? { position: 'absolute', left: offset, top: 0, width: rect.width - offset, height: rect.height }
                    : { position: 'absolute', left: 0, top: offset, width: rect.width, height: rect.height - offset }}
            />
        );
    }

    switch (element.tag) {
        case 'border': return (
            <Border
                variant={variant}
                tintColor={tintColor}
                layout={FILL}
            />
        );
        case 'header': return (
            <Header
                variant={variant}
                caption={caption}
                layout={FILL}
            />
        );
        case 'button': return (
            <Button
                variant={variant}
                tintColor={tintColor}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                disabled={binding?.disabled}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {text}
            </Button>
        );
        case 'button_thick': return (
            <ButtonThick
                variant={variant}
                tintColor={tintColor}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                disabled={binding?.disabled}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {text}
            </ButtonThick>
        );
        case 'button_group_left': return (
            <ButtonGroupLeft
                variant={variant}
                selected={binding?.selected}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {text}
            </ButtonGroupLeft>
        );
        case 'button_group_center': return (
            <ButtonGroupCenter
                variant={variant}
                selected={binding?.selected}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {text}
            </ButtonGroupCenter>
        );
        case 'button_group_right': return (
            <ButtonGroupRight
                variant={variant}
                selected={binding?.selected}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {text}
            </ButtonGroupRight>
        );
        case 'container_button': return (
            <ContainerButton
                variant={variant}
                tintColor={tintColor}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                disabled={binding?.disabled || binding?.disableSection}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {binding?.disableSection
                    ? (
                            <Box
                                pointerTransparent
                                alpha={0.5}
                                layout={FILL}
                            >
                                {content}
                            </Box>
                        )
                    : content}
            </ContainerButton>
        );
        case 'iconbutton': return (
            <IconButton
                variant={variant}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                disabled={binding?.disabled}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            />
        );
        case 'closebutton': return (
            <CloseButton
                variant={variant}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
        );
        // `ISelectableWindow`: selected and disabled as its code sets them; a click is its code's to
        // handle (`WE_SELECT` / `WE_UNSELECT`), which decides whether it changes.
        case 'checkbox': return (
            <CheckBox
                variant={variant}
                selected={binding?.selected}
                disabled={binding?.disabled}
                onPointerTap={binding?.onPointerTap}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            >
                {CAPTIONED_CHECKBOX_STYLES.has(Number(element.style)) ? text : undefined}
            </CheckBox>
        );
        case 'radiobutton': return (
            <RadioButton
                variant={variant}
                selected={binding?.selected}
                disabled={binding?.disabled}
                onPointerTap={binding?.onPointerTap}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            >
                {CAPTIONED_RADIO_STYLES.has(Number(element.style)) ? text : undefined}
            </RadioButton>
        );
        // A `tab_container_button` is only its skin (no window layout, so no title of its own): its
        // children - a label, a bitmap - draw what it shows.
        case 'tab_button':
        case 'tab_container_button': return (
            <TabButton
                variant={variant}
                selected={binding?.selected}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                onPointerTap={binding?.onPointerTap}
                layout={FILL}
            >
                {(element.tag === 'tab_button') ? text : undefined}
            </TabButton>
        );
        case 'tab_content': return (
            <TabContent
                variant={variant}
                // The layout places it: none of the theme's own margin or padding for a laid-out one.
                layout={{ ...FILL, marginTop: 0, padding: 0 }}
            />
        );
        case 'droplist':
        case 'dropmenu': {
            const options = optionsOf(element, binding);
            const selection = binding?.selection ?? 0;

            return options
                ? (
                        // `DropMenuController`: the entries its code populates, the selected one its caption.
                        <Dropmenu
                            variant={variant}
                            tooltip={tooltipOf(element, context, binding)}
                            disabled={binding?.disabled}
                            caption={context.resolveText(options[selection])}
                            options={options.map((option, index) => ({
                                key: index,
                                label: context.resolveText(option),
                                selected: index === selection,
                                onSelect: () => binding?.onSelect?.(index),
                            }))}
                            openRequest={binding?.openRequest}
                            layout={FILL}
                        />
                    )
                : (
                        <Droplist
                            variant={variant}
                            layout={FILL}
                        >
                            {text}
                        </Droplist>
                    );
        }
        case 'scaler': return (
            <Scaler
                variant={variant}
                layout={{ position: 'absolute', right: 0, bottom: 0 }}
            />
        );
        case 'icon': return (
            <Icon
                variant={variant ?? '0'}
                tintColor={tintColor}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
        );
        // `GradientController`: its `color1` / `color2`, `mode` and `direction` vars, drawn by `GradientSkinRenderer`.
        case 'gradient': {
            const direction = flashString(element.vars.direction);

            return (
                <Gradient
                    color1={flashUint(element.vars.color1)}
                    color2={flashUint(element.vars.color2)}
                    mode={element.vars.mode === 'radial' ? 'radial' : 'linear'}
                    direction={direction && GRADIENT_DIRECTIONS.has(direction as GradientDirection) ? direction as GradientDirection : undefined}
                    layout={FILL}
                />
            );
        }
        // `ShapeController`, drawn by `ShapeSkinRenderer`: its `shape`, `radius` and stroke vars in its
        // colour - the code's over the layout's - where a colour with no alpha byte draws opaque.
        case 'shape': {
            const color = flashUint(binding?.color ?? element.color);
            const strokeColor = flashUint(element.vars.stroke_color);
            const kind = flashString(element.vars.shape);

            return (
                <Shape
                    shape={(kind && SHAPE_KINDS.has(kind)) ? kind as ShapeKind : undefined}
                    color={(color === undefined) ? undefined : `#${color.toString(16).padStart(8, '0')}`}
                    strokeColor={(strokeColor === undefined) ? undefined : `#${strokeColor.toString(16).padStart(8, '0')}`}
                    strokeThickness={Number(element.vars.stroke_thickness ?? 0) || 0}
                    strokeHsvShade={Number(element.vars.stroke_hsv_shade ?? 0) || 0}
                    radius={Number(element.vars.radius ?? 0) || 0}
                    layout={FILL}
                />
            );
        }
        default: {
            // A plain window: its rect filled with its colour where it asks for a background.
            const color = (binding?.background ?? element.background) || element.tag === 'background' ? flashColor(binding?.color ?? element.color) : undefined;

            return color
                ? (
                        <Region
                            backgroundColor={color.hex}
                            backgroundAlpha={color.alpha}
                            layout={FILL}
                        />
                    )
                : null;
        }
    }
};

/**
 * A window drawn as a `Region` rather than a plain box: one with a look that follows the pointer
 * (`dynamic_style`), a tooltip, or a click its window's code handles.
 */
/**
 * The windows drawn by a view of their own rather than as a plain region: a frame (which drags by its
 * header, `useFrameDrag`) and a bubble, which is one; a tab context, a container button, an item list.
 * Their drag params do not make them a `Region` - that would draw them without their skin.
 */
const OWN_VIEW_TAGS = new Set([ 'frame', 'bubble', 'tab_context', 'container_button' ]);
const draggableAsRegion = (element: TemplateElement) => !OWN_VIEW_TAGS.has(element.tag) && !TEMPLATE_LISTS[element.tag];

/**
 * `WindowMouseDragger`'s params: a `mouse_dragging_target` moves when a `mouse_dragging_trigger` in it
 * (or itself) is pressed - a card, a note, a plaque.
 */
const dragTargetOf = (element: TemplateElement) => draggableAsRegion(element) && !!element.params?.events?.includes('dragTarget');
const dragTriggerOf = (element: TemplateElement) => draggableAsRegion(element) && !!element.params?.events?.includes('dragTrigger');

const isRegion = (element: TemplateElement, binding: TemplateBinding | undefined) => element.tag === 'region'
    || dragTargetOf(element)
    || dragTriggerOf(element)
    || !!element.dynamicStyle
    || !!binding?.onPointerOver
    || !!binding?.onPointerOut
    || !!binding?.onPointerDown
    || !!binding?.onPointerUp
    || (!!binding?.onPointerTap && !CLICKABLE_FACES.has(element.tag));

const CLICKABLE_FACES = new Set([ 'button', 'button_thick', 'container_button', 'tab_button', 'tab_container_button', 'button_group_left', 'button_group_center', 'button_group_right', 'checkbox', 'radiobutton', 'iconbutton' ]);

/** Each standalone scrollbar's target, each target's axes, and the targets - by the elements, which stay the same array while nothing changes. */
const SCROLL_LINKS = new WeakMap<readonly TemplateElement[], ScrollLinks>();

const scrollLinksOf = (elements: readonly TemplateElement[]): ScrollLinks => {
    let links = SCROLL_LINKS.get(elements);

    if (!links) {
        const scrollbars = linkTemplateScrollbars(elements);
        const scrollAxes = new Map<TemplateElement, Set<TemplateScrollAxis>>();

        for (const [ scrollbar, target ] of scrollbars) scrollAxes.set(target, new Set([ ...(scrollAxes.get(target) ?? []), TEMPLATE_SCROLLBAR_TAGS[scrollbar.tag] ]));

        links = { scrollbars, scrollAxes, scrollTargets: new Set(scrollAxes.keys()) };
        SCROLL_LINKS.set(elements, links);
    }

    return links;
};

const isUrl = (src: string) => /^(https?:)?\/\//.test(src);

/**
 * `StaticBitmapWrapperController.assetUri`: a new asset is asked for, and the bitmap shows what it
 * had until it arrives - for good when it never does (a room with no camera thumbnail keeps the
 * layout's `newnavigator_default_room`). What it had is the layout's own asset.
 */
const TemplateBitmap = ({ src, previous, ...image }: ImageProps & { src: string; previous: string | undefined }) => {
    const texture = useTextureFromUrl(isUrl(src) ? src : undefined);
    const shown = (!isUrl(src) || texture) ? src : previous;

    return shown
        ? (
                <ThemeImage
                    src={shown}
                    eventMode="none"
                    {...image}
                />
            )
        : null;
};

/** A bubble's `direction` var: the side its pointer is on. */
const POINTER_DIRECTIONS = new Set<PointerDirection>([ 'up', 'down', 'left', 'right' ]);

/** The frame's own outline, which nothing of its content draws over. */
const FRAME_OUTLINE = 1;

interface FrameContentClipProps {
    /** The frame's size and its content area's insets (`margins`). */
    width: number;
    height: number;
    margins: readonly [ number, number, number, number ];
    children: ReactNode;
}

/**
 * A frame's children, cut as the client shows them: to the content area at its sides and bottom -
 * `navigator_frame_2`'s pale border at (-3, -3) stops there rather than covering the frame's edge
 * columns - and, above the content area, out to the frame's one-pixel outline, where that layout's
 * white strip and tabs run up to the title bar and across to the edge.
 */
const FrameContentClip = ({ width, height, margins, children }: FrameContentClipProps) => {
    const [ mask, setMask ] = useState<PixiGraphics | null>(null);
    const [ left, top, right, bottom ] = margins;
    const contentWidth = Math.max(0, width - left - right);
    const contentHeight = Math.max(0, height - top - bottom);
    const toOutline = (margin: number) => Math.max(0, margin - FRAME_OUTLINE);

    return (
        <pixiContainer
            mask={mask ?? undefined}
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        >
            <pixiGraphics
                ref={setMask}
                eventMode="none"
                draw={(g) => {
                    g.clear();
                    g.rect(-toOutline(left), -top, contentWidth + toOutline(left) + toOutline(right), top).fill(0xFFFFFF);
                    g.rect(0, 0, contentWidth, contentHeight).fill(0xFFFFFF);
                }}
            />
            {children}
        </pixiContainer>
    );
};

/** The view id of a template's (first) root element - the window, when it is a frame. */
const ROOT_ID = '0';

interface ElementViewProps {
    element: TemplateElement;
    context: Context;
    id: string;
    flow?: Flow;
    /** A list's `show` over this item: whether it is one of the names shown. */
    shown?: boolean;
    /** Drawn as shown whatever it is: an element kept mounted (`keepMounted`), inside the box that shows or hides it. */
    reveal?: boolean;
}

/**
 * One element and its subtree. Memoised: every prop is the template's own data or stable, and the
 * element reads its binding and laid-out rect from the store itself - so a changed caption redraws
 * that text alone, not its parent or its siblings.
 */
const ElementContent = ({ element, context, id, flow, shown, reveal }: ElementViewProps) => {
    const state = useSyncExternalStore(context.store.subscribe, () => context.store.get(element));
    const scrollLinks = useContext(ScrollLinksContext);
    const drawLayers = useDrawLayers();
    const clipEscape = useContext(ClipEscapeContext);
    const binding = state?.binding;
    const rect: TemplateRect = state?.rect ?? element;
    // A list's `show` decides for its items; otherwise the binding, over the layout.
    const hidden = !reveal && !(shown ?? binding?.visible ?? !element.hidden);

    const concealed = hidden && !context.showHidden;

    if (concealed && !binding?.keepMounted) return null;

    // Kept mounted: drawn as shown inside a box that only stops drawing it while hidden, so hiding
    // and showing it keeps what it holds. The box sits at the parent's origin, so the element is
    // placed as it would be - outside a list's flow.
    if (binding?.keepMounted && !reveal) {
        return (
            <Box
                pointerTransparent
                // Not drawn and not hit while hidden, and still laid out: what it holds keeps its size.
                renderable={!concealed}
                eventMode={concealed ? 'none' : undefined}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            >
                <ElementContent
                    element={element}
                    context={context}
                    id={id}
                    flow={flow}
                    shown={shown}
                    reveal
                />
            </Box>
        );
    }

    const blend = binding?.alpha ?? element.blend ?? 1;
    const ownAlpha = (hidden ? 0.4 : 1) * blend;
    /*
     * A window drawn into its parent's graphic context blends only what it draws itself
     * (`WindowRendererItem.render` copies its bitmap in at `alphaMultiplier = blend`); its children
     * draw on their own, unfaded - `colourGridWidget` at `blend="0"` still shows its swatches. A
     * window with a context of its own fades the context, children and all. A binding's `alpha`
     * fades the whole subtree, as Flash's code does by blending each child too (`enableWindow`).
     */
    const faceOnlyBlend = (binding?.alpha === undefined) && (blend !== 1) && templateUsesParentGraphics(element) && ((element.children.length > 0) || !!binding?.children);
    const alpha = faceOnlyBlend ? (hidden ? 0.4 : 1) : ownAlpha;
    const fade = (face: ReactNode) => ((faceOnlyBlend && face)
        ? (
                <Box
                    pointerTransparent
                    alpha={blend}
                    layout={FILL}
                >
                    {face}
                </Box>
            )
        : face);
    const list = TEMPLATE_LISTS[element.tag];
    const childFlow = FLOWS[element.tag];
    const show = list ? binding?.show : undefined;
    // The order the children draw in (`childDrawOrder`). A flow lays its children out in their order, so its children keep it.
    const { order: drawOrder, moved, split, lifted } = (!childFlow && (element.tag !== 'selector')) ? childDrawOrder(element) : { order: element.children.map((_, index) => index), moved: new Set<number>(), split: new Set<number>(), lifted: new Map<number, number>() };

    const childViews = drawOrder.map((index) => {
        const child = element.children[index];

        return (
            <ElementView
                key={child.itemKey ?? String(index)}
                element={child}
                context={context}
                id={`${id}.${child.itemKey ?? index}`}
                flow={childFlow}
                shown={show ? show.includes(child.name ?? '') : undefined}
            />
        );
    });
    const children = (
        <>
            {element.tag === 'selector'
                ? (
                        <Box
                            pointerTransparent
                            sortableChildren
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        >
                            {childViews.map((view, index) => (
                                <SelectorItem
                                    key={view.key}
                                    element={element.children[index]}
                                    context={context}
                                >
                                    {view}
                                </SelectorItem>
                            ))}
                        </Box>
                    )
                : treeOrderedChildren(drawOrder, moved, new Map(drawOrder.map((index, position) => [ index, childViews[position] ])), drawLayers, split, clipEscape, lifted)}
            {binding?.children}
        </>
    );

    /**
     * The face and the children, as a window that clips draws them: its mask cuts only what is drawn
     * into its own graphic context - its face, the children with `use_parent_graphic_context`, and
     * what its code adds - while a child with a context of its own lies over all of that, uncut
     * (`templateUsesParentGraphics`), drawn through the escape layer (`ClipEscapeContext`). Every
     * child stays under the mask in the tree, which cuts presses as Flash's clipping window does:
     * `groupParameterFilteredChildrenUnderPoint` looks at no child of a clipping window outside it.
     */
    const drawn = (face: ReactNode) => {
        if (!rect.clip || element.tag === 'selector') {
            return (
                <>
                    {face}
                    {children}
                </>
            );
        }

        const views = new Map(drawOrder.map((index, position) => [ index, childViews[position] ]));
        // Under an outer mask already, its escaping windows draw through the outer one's layer, past both.
        const escapeLayer = clipEscape ?? drawLayers(ESCAPE_SLOT);

        return (
            <>
                <Box
                    pointerTransparent
                    layout={{ ...FILL, overflow: 'hidden' }}
                >
                    <ClipEscapeContext.Provider value={escapeLayer}>
                        {face}
                        {treeOrderedChildren(drawOrder, moved, views, drawLayers, split, escapeLayer, lifted)}
                        {binding?.children}
                    </ClipEscapeContext.Provider>
                </Box>
                {!clipEscape && <DrawSlot layer={escapeLayer} />}
            </>
        );
    };

    // A layout's own scrollbar, and the list it scrolls (`ScrollBarController.resolveScrollTarget`).
    const scrollTarget = scrollLinks.scrollbars.get(element);

    if (scrollTarget) {
        return (
            <TemplateScrollbar
                element={element}
                target={scrollTarget}
                axis={TEMPLATE_SCROLLBAR_TAGS[element.tag]}
                store={context.scroll}
                layout={rectOf(rect, flow)}
                alpha={ownAlpha}
            />
        );
    }

    const scrollAxes = scrollLinks.scrollAxes.get(element);

    if (scrollAxes && rect.scrollContent) {
        return (
            <TemplateScrollTarget
                element={element}
                rect={rect}
                content={rect.scrollContent}
                axes={scrollAxes}
                store={context.scroll}
                layout={rectOf(rect, flow)}
                alpha={alpha}
                face={fade(faceOf(element, rect, context, binding))}
            >
                {children}
            </TemplateScrollTarget>
        );
    }

    if (isRegion(element, binding)) {
        return (
            <Region
                name={element.name}
                tooltip={tooltipOf(element, context, binding)}
                tooltipDelay={binding?.tooltipDelay}
                dynamicStyle={element.dynamicStyle as RegionProps['dynamicStyle']}
                interactive={element.params?.events?.includes('input') || undefined}
                dragTarget={dragTargetOf(element) || undefined}
                dragTrigger={dragTriggerOf(element) || undefined}
                boundToParentRect={element.params?.boundToParent || undefined}
                disabled={binding?.disabled}
                // A clickable face takes the tap itself; the region around it holding the same
                // handler would run it again as the tap bubbles.
                onPointerTap={CLICKABLE_FACES.has(element.tag) ? undefined : binding?.onPointerTap}
                onPointerOver={binding?.onPointerOver}
                onPointerOut={binding?.onPointerOut}
                onPointerDown={binding?.onPointerDown}
                onPointerUp={binding?.onPointerUp}
                alpha={alpha}
                layout={rectOf(rect, flow)}
            >
                {drawn(fade(faceOf(element, rect, context, binding)))}
            </Region>
        );
    }

    // A frame is a window: its skin and title, and its children in its content area - placed from there,
    // as the client adds a frame's children to its `_CONTENT` container. The root one opens as the
    // window `frame` describes, when there is one.
    if (element.tag === 'frame') {
        const window = id === ROOT_ID ? context.frame : undefined;
        const resizeDirection = window?.resizeDirection ?? 'none';
        const [ minWidth, maxWidth, minHeight, maxHeight ] = element.limits ?? [ null, null, null, null ];
        // The axis the user resizes takes the layout's limits; the other is the template's size, which
        // the window's code sets (`width` while it hides a pane).
        const axisLayout = (resizes: boolean, size: number, min: number | null, max: number | null) => (resizes
            ? { min: min ?? undefined, max: max ?? undefined }
            : { min: size, max: size });
        const horizontal = axisLayout(resizeDirection === 'x' || resizeDirection === 'all', rect.width, minWidth, maxWidth);
        const vertical = axisLayout(resizeDirection === 'y' || resizeDirection === 'all', rect.height, minHeight, maxHeight);
        const frame = (
            <Frame
                id={window?.id ?? `${context.idPrefix}${id}`}
                // `IFrameWindow.style`, as its code sets it (`BadgeLeaderboardView.setFrameStyle`).
                variant={binding?.style ?? element.style}
                caption={captionOf(element, context, binding)}
                tintColor={tintOf(element, binding)}
                margins={element.margins ?? [ 0, 0, 0, 0 ]}
                dropShadow={element.dropShadow && {
                    distance: element.dropShadow.distance,
                    angle: element.dropShadow.angle,
                    color: `#${element.dropShadow.color.toString(16).padStart(6, '0')}`,
                    alpha: element.dropShadow.alpha,
                    blur: element.dropShadow.blur,
                }}
                defaultPosition={window ? window.defaultPosition : { x: 0, y: 0 }}
                centered={window?.centered}
                onPositionChange={window?.onPositionChange}
                rememberPosition={!!window && (window.rememberPosition ?? true)}
                rememberSize={window?.rememberSize ?? true}
                draggable={!!window && (window.draggable ?? true)}
                onClose={window?.onClose}
                closeButtonVisible={window?.closeButtonVisible}
                // `FrameController`'s `help_page` property, or the `helpPage` its code sets: a page shows the header's help button.
                helpPage={binding?.helpPage ?? flashString(element.vars.help_page)}
                onHelp={window?.onHelp}
                resizeDirection={resizeDirection}
                onResize={resizeDirection !== 'none' ? context.onFrameResize : undefined}
                layout={{ width: rect.width, height: rect.height, minWidth: horizontal.min, maxWidth: horizontal.max, minHeight: vertical.min, maxHeight: vertical.max }}
            >
                <FrameContentClip
                    width={rect.width}
                    height={rect.height}
                    margins={element.margins ?? [ 0, 0, 0, 0 ]}
                >
                    {children}
                </FrameContentClip>
            </Frame>
        );

        return (
            <Box
                pointerTransparent
                layout={rectOf(rect, flow)}
                alpha={ownAlpha}
            >
                {/* A window is the desktop's own child, sorted among the others as it is activated: not
                    placed here, so the frame moves its container onto the desktop. A modal's dialog is
                    the modal layer's, where `ModalDialog` has already put it. */}
                {(window && !window.modal) ? <WindowPlacedContext.Provider value={false}>{frame}</WindowPlacedContext.Provider> : frame}
            </Box>
        );
    }

    // A tab context holds its tab buttons (`TabContextController`'s selector): drawn in it, which
    // crops them - not beside it, where its art would lie over them and take their clicks. Under them
    // is its window layout's `_CONTENT` part (a `tab_content`), made at the layout's size and resized
    // with the context, so it keeps its insets from the edges it stretches to.
    if (element.tag === 'tab_context') {
        const skin = context.skins?.[templateSkinKey(element.tag, element.style)];
        const content = skin?.elements.find(part => part.tags?.includes('_CONTENT'));
        const contentRect = (skin && content) ? skinPartRect(content, skin, rect) : undefined;

        return (
            <Box
                pointerTransparent
                layout={rectOf(rect, flow)}
                alpha={ownAlpha}
            >
                {content && contentRect && (contentRect.width > 0) && (contentRect.height > 0) && (
                    <TabContent
                        variant={content.style ?? element.style}
                        layout={{ position: 'absolute', left: contentRect.x, top: contentRect.y, width: contentRect.width, height: contentRect.height, marginTop: 0, padding: 0 }}
                    />
                )}
                <TabContext
                    variant={element.style}
                    layout={FILL}
                >
                    {children}
                </TabContext>
            </Box>
        );
    }

    // A bubble is a frame (`BubbleController` extends `FrameController`): its children in its content area.
    if (element.tag === 'bubble') {
        return (
            <Bubble
                variant={element.style}
                pointer={binding?.direction ?? (POINTER_DIRECTIONS.has(element.vars.direction as PointerDirection) ? element.vars.direction as PointerDirection : undefined)}
                tintColor={tintOf(element, binding)}
                margins={element.margins ?? [ 0, 0, 0, 0 ]}
                alpha={ownAlpha}
                layout={rectOf(rect, flow)}
            >
                {children}
            </Bubble>
        );
    }

    // A scrollable list or grid (`ScrollableItemListWindow`): its items in its inner list, which
    // scrolls, the scrollbar beside it while there is more than fits - each where its window layout
    // put it (`TemplateScroll`); the scroll itself, the wheel and the thumb are the theme's.
    if (rect.scroll) {
        const { viewport, scrollbar, content } = rect.scroll;

        return (
            <Box
                pointerTransparent
                layout={rectOf(rect, flow)}
                alpha={alpha}
            >
                {fade(faceOf(element, rect, context, binding))}
                <ScrollArea
                    orientation="vertical"
                    variant={scrollbar?.style}
                    hideDisabledScrollbar={binding?.autoHideScrollBar ?? true}
                    scrollV={binding?.scrollV}
                    layout={{ position: 'absolute', left: 0, top: 0, width: rect.width, height: rect.height, gap: 0 }}
                    viewportLayout={{ position: 'absolute', left: viewport.x, top: viewport.y, width: viewport.width, height: viewport.height }}
                    scrollbarLayout={scrollbar
                        ? { position: 'absolute', left: scrollbar.x, top: scrollbar.y, width: scrollbar.width, height: scrollbar.height }
                        : { position: 'absolute', left: rect.width, top: 0, width: 0, height: rect.height }}
                    contentLayout={{ position: 'relative', width: content.width, height: content.height }}
                >
                    {children}
                </ScrollArea>
            </Box>
        );
    }

    // A list's items in its flow, `spacing` apart; a scrollable one shows what fits.
    if (list) {
        const spacing = Number(binding?.spacing ?? element.vars.spacing);

        return (
            <Box
                pointerTransparent
                layout={{ ...rectOf(rect, flow), flexDirection: list.direction, flexWrap: list.wrap ? 'wrap' : undefined, gap: Number.isFinite(spacing) && spacing > 0 ? spacing : undefined, overflow: (list.scroll || rect.clip) ? 'hidden' : undefined }}
                alpha={alpha}
            >
                {fade(faceOf(element, rect, context, binding))}
                {children}
            </Box>
        );
    }

    // A container button's windows are its children (`ContainerButtonController`): drawn in the button,
    // where a press on them - an arrow icon over most of the button - is the button's.
    if (element.tag === 'container_button') {
        return (
            <Box
                pointerTransparent
                layout={{ ...rectOf(rect, flow), overflow: rect.clip ? 'hidden' : undefined }}
                alpha={ownAlpha}
            >
                {faceOf(element, rect, context, binding, children)}
            </Box>
        );
    }

    return (
        <Box
            pointerTransparent
            layout={rectOf(rect, flow)}
            alpha={alpha}
        >
            {drawn(fade(faceOf(element, rect, context, binding)))}
        </Box>
    );
};

/**
 * An element as its parent holds it: drawn through the clip escape layer when it has a graphic
 * context of its own under a clipping window's mask (`ClipEscapeContext`). An item of a list's flow
 * keeps its place in the flow.
 */
const ElementEscape = (props: ElementViewProps) => {
    const clipEscape = useContext(ClipEscapeContext);

    if (!clipEscape || props.flow || templateUsesParentGraphics(props.element)) return <ElementContent {...props} />;

    return (
        <DrawnIn layer={clipEscape}>
            <ClipEscapeContext.Provider value={undefined}>
                <ElementContent {...props} />
            </ClipEscapeContext.Provider>
        </DrawnIn>
    );
};

const ElementView = memo(ElementEscape);

/**
 * A `selector`'s child: `SelectorController.select` moves the window it selects to the top of its
 * children, so it draws over the siblings it overlaps (a button group's shared edges). Here the child
 * its code selects (`selected`) draws over the rest while it is; the box sits at the selector's
 * origin, so the child is placed as it would be.
 */
const SelectorItem = ({ element, context, children }: { element: TemplateElement; context: Context; children: ReactNode }) => {
    const selected = useSyncExternalStore(context.store.subscribe, () => !!context.store.get(element)?.binding?.selected);

    return (
        <Box
            pointerTransparent
            zIndex={selected ? 1 : 0}
            layout={{ position: 'absolute', left: 0, top: 0 }}
        >
            {children}
        </Box>
    );
};

/** The theme component each caption-sized button type draws as. */
const BUTTON_CASCADE_KEYS: Readonly<Record<string, string>> = {
    button: 'button',
    button_thick: 'buttonThick',
    button_group_left: 'buttonGroupLeft',
    button_group_center: 'buttonGroupCenter',
    button_group_right: 'buttonGroupRight',
    tab_button: 'tabButton',
};

/**
 * A button's window layout as the theme's variant of it carries it: the layout's size its minimum, its
 * `_BTN_TEXT` label's `margins` its padding and the label's style its text style.
 */
const buttonLabelOf = (element: TemplateElement): TemplateButtonLabel | undefined => {
    const variant = themeVariantOf<ButtonVariant>(BUTTON_CASCADE_KEYS[element.tag] ?? 'button', element.style ?? '0');
    const layout = variant?.layout;

    if (!variant?.textStyle || !layout || typeof layout !== 'object') return undefined;

    const size = (value: unknown) => (typeof value === 'number' ? value : 0);

    return {
        width: size(layout.minWidth),
        height: size(layout.minHeight),
        textStyle: variant.textStyle,
        margins: { left: size(layout.paddingLeft), top: size(layout.paddingTop), right: size(layout.paddingRight), bottom: size(layout.paddingBottom) },
    };
};

ElementView.displayName = 'TemplateElementView';

/**
 * A template drawn with the theme, at its own size.
 *
 * `bindings` may be a new object every render - an inline literal is the expected use. Its keys are
 * resolved to elements once per set of keys (`resolveTemplateNames`), and only the elements whose
 * binding draws differently redraw (`TemplateBindingStore`). `resolveText` and `imageUrl` should be
 * stable: a new one redraws every element, which is what a change of language needs.
 */
export const TemplateView = ({ template, resolveText, imageUrl, bindings, showHidden = false, idPrefix = 'template-', width, height, arrange, frame }: TemplateViewProps) => {
    const [ store ] = useState(() => new TemplateBindingStore());
    // The size the user dragged the window to; the template is laid out at it.
    const [ frameSize, setFrameSize ] = useState<FrameSize | null>(null);
    // A template's one root window is drawn at its origin; the copy is made once, so it stays the
    // element bindings resolve to and a memoised view keeps.
    const sources = useMemo(() => (template.elements.length === 1 ? [ { ...template.elements[0], x: 0, y: 0 } ] : template.elements), [ template ]);
    // The clones the code adds, made into elements of their own; the rest are the template's.
    const [ expander ] = useState(() => new TemplateExpander());
    const { elements, byElement, missing: missingKeys, arranges, skins } = expander.expand(sources, bindings);
    const [ scroll ] = useState(() => new TemplateScrollStore());
    const scrollLinks = scrollLinksOf(elements);
    const bitmapSizeOf = useFittedBitmapSizes(elements, byElement, imageUrl);
    const missing = missingKeys.join('\n');

    const context = useMemo<Context>(() => ({
        // A text may name another (`${key}` in its value): read through, a few levels deep.
        resolveText: (caption) => {
            let text = caption ?? '';

            for (let depth = 0; depth < 4 && text.includes('${'); depth++) text = text.replace(/\$\{([^}]+)\}/g, (whole, key: string) => resolveText?.(key) ?? whole);

            return text;
        },
        imageUrl,
        store,
        showHidden,
        idPrefix,
        frame,
        scroll,
        onFrameResize: setFrameSize,
        skins: template.skins,
    }), [ resolveText, imageUrl, store, showHidden, idPrefix, frame, scroll, template.skins ]);

    // A list's `show` over its items; otherwise the binding, over the layout.
    const shownBy = new Map<TemplateElement, boolean>();

    for (const [ element, binding ] of byElement) {
        if (binding.show && TEMPLATE_LISTS[element.tag]) {
            for (const child of element.children) shownBy.set(child, binding.show.includes(child.name ?? ''));
        }
    }

    // The window's size: the user's along the axis they resize, else the code's.
    const resizes = frame?.resizeDirection ?? 'none';
    const layoutWidth = ((resizes === 'x' || resizes === 'all') ? frameSize?.width : undefined) ?? width;
    const layoutHeight = ((resizes === 'y' || resizes === 'all') ? frameSize?.height : undefined) ?? height;

    const windowsIn = (scope: readonly TemplateElement[], windowOf: (element: TemplateElement) => LayoutWindow | undefined): TemplateWindows => ({
        find: (key) => {
            const element = resolveTemplateNames(scope, [ key ]).targets.get(key);

            return element ? windowOf(element) : undefined;
        },
        root: () => windowOf(scope[0]),
    });
    // Each clone as its code sets it up, before its own clones are added to it; once the layout is
    // built, the window's own code.
    const setups = new Map(arranges.map(({ scope, arrange: setup }) => [ scope, (windowOf: (element: TemplateElement) => LayoutWindow | undefined) => setup(windowsIn([ scope ], windowOf)) ]));
    const arrangeAll: TemplateArrange | undefined = arrange ? windowOf => arrange(windowsIn(elements, windowOf)) : undefined;

    // The rects the window's rules settle on, the texts measured as they will draw (cached by text).
    const rects = layoutTemplate(elements, {
        captionOf: element => byElement.get(element)?.htmlText ?? localizeCaption(byElement.get(element)?.caption ?? element.caption, context.resolveText),
        builtCaptionOf: element => (byElement.get(element)?.setCaptionAfterBuild ? localizeCaption(element.caption, context.resolveText) : undefined),
        // A text whose code set its `htmlText` is sized as markup, as it is drawn.
        measure: (element, text, wrapWidth) => measureTemplateText(element, text, wrapWidth, (byElement.get(element)?.htmlText !== undefined) || isMarkupTemplateText(element)),
        visibleOf: element => shownBy.get(element) ?? byElement.get(element)?.visible ?? !element.hidden,
        // A clone made from another template - a catalogue widget's view - brings that template's skins.
        skinOf: (element) => {
            const key = templateSkinKey(element.tag, element.style);

            return template.skins?.[key] ?? skins[key];
        },
        scrollTargets: scrollLinks.scrollTargets,
        autoHideScrollBarOf: element => byElement.get(element)?.autoHideScrollBar ?? true,
        spacingOf: element => byElement.get(element)?.spacing,
        verticalSpacingOf: element => byElement.get(element)?.verticalSpacing,
        setupOf: element => setups.get(element),
        buttonLabelOf,
        bitmapSizeOf,
    }, (layoutWidth !== undefined || layoutHeight !== undefined) ? { width: layoutWidth ?? template.width, height: layoutHeight ?? template.height } : undefined, arrangeAll);
    const rootRect = elements.length === 1 ? rects.get(elements[0]) : undefined;

    // The root window is where its code puts it: drawn at its origin whatever its resize alignment did.
    if (rootRect) rects.set(elements[0], { ...rootRect, x: 0, y: 0 });

    // During render, so the elements that draw in this pass read this render's state; the ones
    // memoised past it are told in the layout effect, before the frame is shown.
    store.update(byElement, rects);

    useLayoutEffect(() => store.commit());

    // A bound name the loaded template does not have: the layout changed under the code that binds it.
    useEffect(() => {
        if (missing) console.warn(`Template "${template.name}" has no element for binding ${missing.split('\n').map(key => `"${key}"`).join(', ')}`);
    }, [ template.name, missing ]);

    return (
        // Opened as a window, the frame is on the desktop and this box holds nothing in its flow.
        <Box
            pointerTransparent
            layout={{ position: frame ? 'absolute' : 'relative', width: rootRect?.width ?? template.width, height: rootRect?.height ?? template.height }}
        >
            <ScrollLinksContext.Provider value={scrollLinks}>
                {elements.map((element, index) => (
                    <ElementView
                        key={String(index)}
                        element={element}
                        context={context}
                        id={String(index)}
                    />
                ))}
            </ScrollLinksContext.Provider>
        </Box>
    );
};
