/**
 * Converts a Flash `<layout>` XML into a `Template` once, where it is published, so the client draws
 * it without reading XML: `WindowParser.parseAndConstruct`'s reading of each element, with its
 * `params` decoded, its escapes undone and its variables typed.
 *
 * - `params`: the attribute's bits ORed with every `<params><param name/>` child, the names from
 *   `WindowParam`'s table (`fillTables`); an unknown name throws, as `WindowParser` does.
 * - Attributes are `unescape`d as the parser does (`%24%7Bkey%7D` -> `${key}`, `%23icon` -> `#icon`).
 * - A `<var>` is typed by its `type`: `hex` and `uint` are `uint(...)` (the low 32 bits), `int`,
 *   `Integer` and `Number` numbers, `Boolean` a boolean; an `<Array>` value a list.
 * - A `$name` value is a shared variable the calling code fills in when it builds the window
 *   (`buildFromXML`'s map): it is kept as it stands.
 * - `asset_uri` / `bitmap_asset_name` go through `resolveAsset`, which names the bitmap the way its
 *   reader finds it.
 *
 * Kept free of runtime imports so a build script can load it under Node as it stands.
 */
import type { Template, TemplateAlignH, TemplateAlignV, TemplateElement, TemplateParams, TemplateScale, TemplateValue } from './templateData';

/** An XML element as `parseLayoutXml` reads it. */
export interface LayoutXmlNode {
    tag: string;
    attrs: Record<string, string>;
    children: LayoutXmlNode[];
}

const ENTITIES: Record<string, string> = { quot: '"', apos: '\'', lt: '<', gt: '>', amp: '&' };

const decodeEntities = (value: string) => value.replace(/&(quot|apos|lt|gt|amp|#\d+|#x[0-9a-f]+);/gi, (whole, entity: string) => {
    if (entity[0] !== '#') return ENTITIES[entity.toLowerCase()] ?? whole;

    return String.fromCodePoint(entity[1].toLowerCase() === 'x' ? Number.parseInt(entity.slice(2), 16) : Number(entity.slice(1)));
});

/** Reads a layout's elements and attributes: text content, comments and declarations are skipped. */
export const parseLayoutXml = (text: string): LayoutXmlNode | undefined => {
    const root: LayoutXmlNode = { tag: '#root', attrs: {}, children: [] };
    const stack = [ root ];
    const tokens = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<[?!][\s\S]*?>|<\/([\w:.-]+)\s*>|<([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>/g;

    for (let match = tokens.exec(text); match; match = tokens.exec(text)) {
        const [ , closing, opening, attributes, selfClosing ] = match;

        if (closing) {
            if (stack.length > 1) stack.pop();

            continue;
        }

        if (!opening) continue;

        const node: LayoutXmlNode = { tag: opening, attrs: {}, children: [] };

        for (const attribute of attributes.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) node.attrs[attribute[1]] = decodeEntities(attribute[2] ?? attribute[3]);

        stack[stack.length - 1].children.push(node);

        if (!selfClosing) stack.push(node);
    }

    return root.children[0];
};

/** `WindowParam`'s names, as `WindowParser` reads a `<param name>` (`fillTables`, 2026 client). */
const WINDOW_PARAMS: Readonly<Record<string, number>> = {
    null: 0,
    bound_to_parent_rect: 32,
    child_window: 33,
    embedded_controller: 51,
    expand_to_accommodate_children: 131072,
    input_event_processor: 1,
    internal_event_handling: 9,
    mouse_dragging_target: 32768,
    mouse_dragging_trigger: 257,
    mouse_scaling_target: 65536,
    mouse_scaling_trigger: 12288,
    horizontal_mouse_scaling_trigger: 4096,
    vertical_mouse_scaling_trigger: 8192,
    observe_parent_input_events: 5,
    parent_window: 1,
    resize_to_accommodate_children: 147456,
    relative_horizontal_scale_center: 192,
    relative_horizontal_scale_fixed: 0,
    relative_horizontal_scale_move: 64,
    relative_horizontal_scale_strech: 128,
    relative_scale_center: 3264,
    relative_scale_fixed: 0,
    relative_scale_move: 1088,
    relative_scale_strech: 2176,
    relative_vertical_scale_center: 3072,
    relative_vertical_scale_fixed: 0,
    relative_vertical_scale_move: 1024,
    relative_vertical_scale_strech: 2048,
    on_resize_align_left: 0,
    on_resize_align_right: 262144,
    on_resize_align_center: 786432,
    on_resize_align_top: 0,
    on_resize_align_bottom: 1048576,
    on_resize_align_middle: 3145728,
    on_accommodate_align_left: 0,
    on_accommodate_align_right: 262144,
    on_accommodate_align_center: 786432,
    on_accommodate_align_top: 0,
    on_accommodate_align_bottom: 1048576,
    on_accommodate_align_middle: 3145728,
    route_input_events_to_parent: 3,
    use_parent_graphic_context: 16,
    draggable_with_mouse: 33025,
    scalable_with_mouse: 77824,
    reflect_horizontal_resize_to_parent: 4194304,
    reflect_vertical_resize_to_parent: 8388608,
    reflect_resize_to_parent: 12582912,
    force_clipping: 1073741824,
    inherit_caption: 2147483648,
};

/** The input bits, by the bit each one sets. */
const EVENT_BITS: [ bit: number, name: string ][] = [
    [ 0, 'input' ],
    [ 1, 'routeToParent' ],
    [ 2, 'observeParent' ],
    [ 3, 'internal' ],
    [ 8, 'dragTrigger' ],
    [ 12, 'scaleTriggerH' ],
    [ 13, 'scaleTriggerV' ],
    [ 15, 'dragTarget' ],
    [ 16, 'scaleTarget' ],
];

const SCALES: TemplateScale[] = [ 'fixed', 'move', 'stretch', 'center' ];
/** Bits 18-19 and 20-21: only 0, 1 and 3 are named (bit 19 or 21 alone is not). */
const ALIGN_H: (TemplateAlignH | undefined)[] = [ 'left', 'right', undefined, 'center' ];
const ALIGN_V: (TemplateAlignV | undefined)[] = [ 'top', 'bottom', undefined, 'middle' ];

/** A `params` value split by concern; `undefined` when it sets nothing. */
const decodeWindowParams = (value: number): TemplateParams | undefined => {
    const bit = (index: number) => ((value >>> index) & 1) === 1;
    const params: TemplateParams = {};
    const events = EVENT_BITS.filter(([ index ]) => bit(index)).map(([ , name ]) => name);
    const scale: [ TemplateScale, TemplateScale ] = [ SCALES[(value >>> 6) & 3], SCALES[(value >>> 10) & 3] ];
    const alignH = ALIGN_H[(value >>> 18) & 3];
    const alignV = ALIGN_V[(value >>> 20) & 3];
    const unnamed = [ 9, 24, 25, 26, 27, 28, 29 ].filter(bit);

    if (events.length) params.events = events;
    if (bit(4)) params.parentGraphics = true;
    if (bit(5)) params.boundToParent = true;
    if (scale[0] !== 'fixed' || scale[1] !== 'fixed') params.scale = scale;
    if (bit(17)) params.accommodate = bit(14) ? 'resize' : 'expand';
    else if (bit(14)) unnamed.push(14);
    if (!alignH) unnamed.push(19);
    if (!alignV) unnamed.push(21);
    if ((alignH && alignH !== 'left') || (alignV && alignV !== 'top')) params.align = [ alignH ?? 'left', alignV ?? 'top' ];
    if (bit(22) || bit(23)) params.reflectToParent = [ bit(22), bit(23) ];
    if (bit(30)) params.forceClipping = true;
    if (bit(31)) params.inheritCaption = true;
    if (unnamed.length) params.unnamedBits = unnamed.sort((a, b) => a - b);

    return Object.keys(params).length ? params : undefined;
};

/** Flash `unescape`: `%XX` and `%uXXXX` sequences. */
const unescapeAs3 = (value: string) => value.replace(/%u([0-9a-f]{4})|%([0-9a-f]{2})/gi, (_, wide: string | undefined, narrow: string | undefined) => String.fromCharCode(Number.parseInt(wide ?? narrow ?? '0', 16)));

/** Flash `uint("0x...")`: the low 32 bits. */
const flashUint = (value: string): number => {
    try {
        return Number(BigInt.asUintN(32, BigInt(value.trim())));
    } catch {
        return Number(value) >>> 0;
    }
};

const isSharedVariable = (value: string) => value.startsWith('$') && !value.startsWith('${');

export interface LayoutToTemplateOptions {
    /** A bitmap's asset name (`asset_uri`) as the reader will find it; `undefined` to keep the name as it stands. */
    resolveAsset?: (asset: string) => string | undefined;
    /**
     * A frame's content area, from its edges (`FrameController.margins`: left, top, right, bottom) -
     * its style's window layout's `content_area`, under its own `margin_*` variables. Only the
     * publisher, holding the window manager's element descriptions, knows it.
     */
    frameMargins?: (frame: TemplateElement) => readonly [ number, number, number, number ] | undefined;
}

const child = (node: LayoutXmlNode, tag: string) => node.children.find(entry => entry.tag === tag);

const varValue = (node: LayoutXmlNode, options: LayoutToTemplateOptions): TemplateValue => {
    const nested = child(node, 'value')?.children[0];

    if (nested) {
        const entries = nested.children.filter(entry => entry.tag === 'var');

        return nested.tag === 'Array'
            ? entries.map(entry => varValue(entry, options))
            : Object.fromEntries(entries.map(entry => [ entry.attrs.key, varValue(entry, options) ]));
    }

    const { key, value = '', type } = node.attrs;

    if (isSharedVariable(value)) return value;

    switch (type) {
        case 'Boolean': return value === 'true';
        case 'hex':
        case 'uint': return flashUint(value);
        case 'int':
        case 'Integer':
        case 'Number': return Number(value);
        default:
            if ((key === 'asset_uri' || key === 'bitmap_asset_name') && value) return options.resolveAsset?.(value) ?? value;

            return value;
    }
};

const readParams = (node: LayoutXmlNode): number => {
    let value = flashUint(node.attrs.params ?? '0');

    for (const param of child(node, 'params')?.children ?? []) {
        const flag = WINDOW_PARAMS[param.attrs.name];

        if (flag === undefined) throw new Error(`Unknown window parameter "${param.attrs.name}"!`);

        value = (value | flag) >>> 0;
    }

    return value;
};

const convertElement = (node: LayoutXmlNode, options: LayoutToTemplateOptions): TemplateElement => {
    const attrs = node.attrs;
    const number = (key: string) => (attrs[key] === undefined ? undefined : Number(attrs[key]));
    const limits = [ number('width_min'), number('width_max'), number('height_min'), number('height_max') ];
    const variables = child(node, 'variables')?.children.filter(entry => entry.tag === 'var') ?? [];
    const element: TemplateElement = {
        tag: node.tag,
        x: number('x') ?? 0,
        y: number('y') ?? 0,
        width: number('width') ?? 0,
        height: number('height') ?? 0,
        vars: Object.fromEntries(variables.map(entry => [ entry.attrs.key, varValue(entry, options) ])),
        children: (child(node, 'children')?.children ?? []).map(entry => convertElement(entry, options)),
    };

    if (attrs.name) element.name = unescapeAs3(attrs.name);
    if (limits.some(limit => limit !== undefined)) element.limits = limits.map(limit => limit ?? null) as TemplateElement['limits'];
    if (attrs.style && attrs.style !== '0') element.style = attrs.style;
    if (attrs.dynamic_style) element.dynamicStyle = attrs.dynamic_style;

    const params = decodeWindowParams(readParams(node));

    if (params) element.params = params;
    if (attrs.caption !== undefined) element.caption = unescapeAs3(attrs.caption);
    if (attrs.visible === 'false') element.hidden = true;
    if (attrs.color !== undefined) element.color = flashUint(attrs.color);
    if (attrs.background === 'true') element.background = true;
    if (attrs.blend !== undefined && Number(attrs.blend) !== 1) element.blend = Number(attrs.blend);
    if (attrs.clipping === 'false') element.clipping = false;
    if (attrs.treshold !== undefined && Number(attrs.treshold) !== 10) element.mouseThreshold = Number(attrs.treshold);
    if (attrs.tags) element.tags = unescapeAs3(attrs.tags).split(',').map(tag => tag.trim()).filter(Boolean);

    // `WindowParser`'s `DropShadowFilter`, with its defaults; `GraphicContext` draws the first outer one.
    const shadow = (child(node, 'filters')?.children ?? []).find(entry => (entry.tag === 'DropShadowFilter') && (entry.attrs.inner !== 'true'));

    if (shadow) {
        const value = (key: string, fallback: number) => (shadow.attrs[key] === undefined ? fallback : Number(shadow.attrs[key]));

        element.dropShadow = {
            distance: value('distance', 0),
            angle: value('angle', 45),
            color: value('color', 0),
            alpha: value('alpha', 1),
            blur: Math.max(0, value('blurX', 0), value('blurY', 0)),
        };
    }

    // `FrameController` and `BubbleController`, which extends it: children go into a content area.
    if (element.tag === 'frame' || element.tag === 'bubble') {
        const margins = options.frameMargins?.(element);

        if (margins) element.margins = margins;
    }

    return element;
};

/** What sits beside a window's elements in its XML rather than being one. */
const STRUCTURE = new Set([ 'variables', 'params', 'filters', 'children' ]);

/** A `<layout>` document as a `Template`; `undefined` when the text holds no layout window. */
export const layoutToTemplate = (xml: string, options: LayoutToTemplateOptions = {}): Template | undefined => {
    const layout = parseLayoutXml(xml);
    const windowNode = layout?.tag === 'layout' ? child(layout, 'window') : undefined;

    if (!layout || !windowNode) return undefined;

    return {
        name: layout.attrs.name ?? '',
        width: Number(layout.attrs.width ?? 0),
        height: Number(layout.attrs.height ?? 0),
        elements: windowNode.children.filter(entry => !STRUCTURE.has(entry.tag)).map(entry => convertElement(entry, options)),
    };
};
