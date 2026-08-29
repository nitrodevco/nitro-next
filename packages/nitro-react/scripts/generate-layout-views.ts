/**
 * Turns the Flash client's window layout XMLs (`scripts/binaryData/*_xml$*.bin`, one `<layout>`
 * root each) into React view components built from the theme components in `src/theme`, one
 * file per layout under `src/views/layouts/`, plus a barrel `index.ts`.
 *
 * Every XML element tag maps to the theme component of the same role (`frame` -> `Frame`,
 * `border` -> `Border`, `button` -> `Button`, `text` -> `ThemeText`, ...), its `style` attribute
 * becomes that component's `variant` (the theme variant tables are keyed by the same skin ids),
 * `color` becomes `tintColor`, `${key}` captions become `t('key')` calls, and the `x/y/width/
 * height` + `<scale>` anchoring becomes an absolute `layout`. Elements the client filled at
 * runtime (`widget`) become `WidgetSlot` placeholders; interactive elements get an `on<Name>`
 * callback prop; text inputs get local state. Bitmaps referenced by `asset_uri`/
 * `bitmap_asset_name` are copied out of `scripts/images` into `public/assets/images/layouts/`.
 *
 *   yarn workspace @nitrodevco/nitro-react generate-layout-views
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XML_DIR = join(__dirname, 'binaryData');
const IMAGE_DIR = join(__dirname, 'images');
const OUT_DIR = join(__dirname, '../src/views/layouts');
const IMAGE_OUT_DIR = join(__dirname, '../public/assets/images/layouts');
const TEXT_STYLES_FILE = join(__dirname, '../src/theme/utils/textStyles.ts');

// ---------------------------------------------------------------------------------------------
// Minimal XML reader - the layouts are machine-exported, attribute-only trees (no text nodes,
// no namespaces, no CDATA), so a small tokenizer beats pulling in a DOM implementation.
// ---------------------------------------------------------------------------------------------

interface XmlNode {
    tag: string;
    attrs: Record<string, string>;
    children: XmlNode[];
}

const ENTITY_MAP: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': '\'' };

const unescapeXml = (value: string): string => value.replace(/&(amp|lt|gt|quot|apos);/g, m => ENTITY_MAP[m] ?? m);

const parseXml = (text: string): XmlNode | undefined => {
    const root: XmlNode = { tag: '#root', attrs: {}, children: [] };
    const stack: XmlNode[] = [ root ];
    const tagPattern = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<\/([\w:-]+)\s*>|<([\w:-]+)((?:\s+[\w:.-]+\s*=\s*"[^"]*")*)\s*(\/?)>/g;
    const attrPattern = /([\w:.-]+)\s*=\s*"([^"]*)"/g;

    let match: RegExpExecArray | null;

    while ((match = tagPattern.exec(text))) {
        if (match[0].startsWith('<!--') || match[0].startsWith('<?')) continue;

        if (match[1]) {
            if (stack.length > 1) stack.pop();

            continue;
        }

        const attrs: Record<string, string> = {};
        let attr: RegExpExecArray | null;

        while ((attr = attrPattern.exec(match[3] ?? ''))) attrs[attr[1]] = unescapeXml(attr[2]);

        const node: XmlNode = { tag: match[2], attrs, children: [] };

        stack[stack.length - 1].children.push(node);

        if (!match[4]) stack.push(node);
    }

    return root.children[0];
};

// ---------------------------------------------------------------------------------------------
// Layout element model
// ---------------------------------------------------------------------------------------------

interface DropShadow {
    distance?: number;
    angle?: number;
    color?: string;
    alpha?: number;
    blur?: number;
}

interface Element {
    tag: string;
    attrs: Record<string, string>;
    vars: Record<string, string>;
    scale: { horizontal: string; vertical: string } | undefined;
    /** The `WindowParam` bit-field - the numeric `params` attribute OR'd with any `<params><param name/></params>` names. */
    params: number;
    dropShadow: DropShadow | undefined;
    children: Element[];
}

/**
 * `WindowParam` names -> bits, transcribed from the client's
 * com/sulake/core/window/utils `fillTables()`. The hand-written skin templates (`frame_3`,
 * `button`, `dropmenu`, ...) list params by name; the tool-exported layouts bake the sum.
 */
const PARAM_BITS: Record<string, number> = {
    null: 0, bound_to_parent_rect: 32, child_window: 33, embedded_controller: 51, expand_to_accommodate_children: 131072,
    input_event_processor: 1, internal_event_handling: 9, mouse_dragging_target: 32768, mouse_dragging_trigger: 257,
    mouse_scaling_target: 65536, mouse_scaling_trigger: 12288, horizontal_mouse_scaling_trigger: 4096, vertical_mouse_scaling_trigger: 8192,
    observe_parent_input_events: 5, parent_window: 1, resize_to_accommodate_children: 147456,
    relative_horizontal_scale_center: 192, relative_horizontal_scale_fixed: 0, relative_horizontal_scale_move: 64, relative_horizontal_scale_strech: 128,
    relative_scale_center: 3264, relative_scale_fixed: 0, relative_scale_move: 1088, relative_scale_strech: 2176,
    relative_vertical_scale_center: 3072, relative_vertical_scale_fixed: 0, relative_vertical_scale_move: 1024, relative_vertical_scale_strech: 2048,
    on_resize_align_left: 0, on_resize_align_right: 262144, on_resize_align_center: 786432, on_resize_align_top: 0, on_resize_align_bottom: 1048576, on_resize_align_middle: 3145728,
    on_accommodate_align_left: 0, on_accommodate_align_right: 262144, on_accommodate_align_center: 786432, on_accommodate_align_top: 0, on_accommodate_align_bottom: 1048576, on_accommodate_align_middle: 3145728,
    route_input_events_to_parent: 3, use_parent_graphic_context: 16, draggable_with_mouse: 33025, scalable_with_mouse: 77824,
    reflect_horizontal_resize_to_parent: 4194304, reflect_vertical_resize_to_parent: 8388608, reflect_resize_to_parent: 12582912,
    force_clipping: 1073741824, inherit_caption: 2147483648,
};

const parseDropShadow = (node: XmlNode | undefined): DropShadow | undefined => {
    const filter = node?.children.find(child => child.tag === 'DropShadowFilter');

    if (!filter) return undefined;

    const shadow: DropShadow = {};

    if (filter.attrs.distance !== undefined) shadow.distance = num(filter.attrs.distance);
    if (filter.attrs.angle !== undefined) shadow.angle = num(filter.attrs.angle);
    if (filter.attrs.color !== undefined) shadow.color = hexColor(filter.attrs.color);
    if (filter.attrs.alpha !== undefined) shadow.alpha = Math.round(num(filter.attrs.alpha) * 100) / 100;
    if (filter.attrs.blurX !== undefined) shadow.blur = num(filter.attrs.blurX);

    return shadow;
};

const toElement = (node: XmlNode): Element => {
    const vars: Record<string, string> = {};
    const variables = node.children.find(child => child.tag === 'variables');

    for (const variable of variables?.children ?? []) if (variable.tag === 'var' && variable.attrs.key) vars[variable.attrs.key] = variable.attrs.value ?? '';

    const scaleNode = node.children.find(child => child.tag === 'scale');
    const childrenNode = node.children.find(child => child.tag === 'children');
    const paramsNode = node.children.find(child => child.tag === 'params');
    let params = num(node.attrs.params) >>> 0;

    for (const param of paramsNode?.children ?? []) if (param.tag === 'param' && param.attrs.name) params = (params | (PARAM_BITS[param.attrs.name] ?? 0)) >>> 0;

    // Without a `<scale>` child the anchoring comes from the `relative_*_scale_*` bits in
    // `params` - see `anchor()`.
    const scale = scaleNode ? { horizontal: scaleNode.attrs.horizontal ?? 'fixed', vertical: scaleNode.attrs.vertical ?? 'fixed' } : undefined;

    return {
        tag: node.tag,
        attrs: node.attrs,
        vars,
        scale,
        params,
        dropShadow: parseDropShadow(node.children.find(child => child.tag === 'filters')),
        children: (childrenNode?.children ?? []).map(toElement),
    };
};

const num = (value: string | undefined, fallback = 0): number => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
};

const bool = (value: string | undefined): boolean | undefined => (value === undefined ? undefined : value === 'true');

/** `0x0fac919` / `0xff4f8e38` / `0x0` -> `#fac919` / `#4f8e38` / `#000000` (alpha digits dropped). */
const hexColor = (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    const digits = value.replace(/^0x/i, '').replace(/[^0-9a-f]/gi, '');

    if (!digits.length) return undefined;

    return `#${digits.slice(-6).padStart(6, '0').toLowerCase()}`;
};

const decode = (value: string): string => {
    try {
        return decodeURIComponent(value.replace(/\+/g, ' ')).replace(/\r/g, '');
    } catch {
        return value;
    }
};

const quote = (value: string): string => `'${value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '')}'`;

/** A JSX string attribute value: plain double-quoted text where possible, an expression otherwise. */
const jsxStr = (value: string): string => (/["\\\n{}<>]/.test(value) ? `{${quote(value)}}` : `"${value}"`);

/** JSX text content: bare text where it's safe, a braced string expression otherwise. */
const jsxText = (expr: string): string => {
    const literal = /^'(.*)'$/s.exec(expr);

    if (!literal) return `{${expr}}`;

    const raw = literal[1];

    return /["'\\{}<>]|^\s|\s$|^$/.test(raw) ? `{${expr}}` : raw;
};

const pascal = (value: string): string => {
    const parts = value.replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
    const joined = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

    return /^[0-9]/.test(joined) ? `_${joined}` : joined;
};

const camel = (value: string): string => {
    const upper = pascal(value);

    return upper.charAt(0).toLowerCase() + upper.slice(1);
};

// ---------------------------------------------------------------------------------------------
// Text style lookup - the XML's `text_style` variable is the truffle `habboKey`; the theme
// keys those by `TextStyleKey`, so read that table straight out of textStyles.ts.
// ---------------------------------------------------------------------------------------------

const TEXT_STYLE_BY_HABBO_KEY: Record<string, string> = {};

for (const match of readFileSync(TEXT_STYLES_FILE, 'utf8').matchAll(/'(text-style-[\w-]+)':\s*\{[^}]*habboKey:\s*'(\w+)'/g)) {
    TEXT_STYLE_BY_HABBO_KEY[match[2]] ??= match[1];
}

const resolveTextStyle = (habboKey: string | undefined): { textStyle?: string; fill?: string } => {
    if (!habboKey) return {};

    if (TEXT_STYLE_BY_HABBO_KEY[habboKey]) return { textStyle: TEXT_STYLE_BY_HABBO_KEY[habboKey] };

    if (habboKey.endsWith('_white')) {
        const base = TEXT_STYLE_BY_HABBO_KEY[habboKey.slice(0, -6)];

        if (base) return { textStyle: base, fill: '#ffffff' };
    }

    return {};
};

// ---------------------------------------------------------------------------------------------
// Image lookup - `scripts/images` files are `<id>_<asset_name>$<hash>.<ext>`; the XML refers
// to them by `<asset_name>` (with or without the `_png` suffix).
// ---------------------------------------------------------------------------------------------

const imageFiles = new Map<string, string>();

for (const file of readdirSync(IMAGE_DIR)) {
    const match = /^\d+_(.+?)\$[^$]*\.(png|gif|jpg)$/i.exec(file);

    if (!match) continue;

    const name = match[1];

    // Later ids are newer exports of the same asset - keep the highest.
    imageFiles.set(name, file);
    imageFiles.set(name.replace(/_(png|gif|jpg)$/i, ''), file);
}

const copiedImages = new Map<string, string>();
const unresolvedImages = new Set<string>();

/**
 * Bitmaps no layout names statically but the client assigned at runtime - MeMenuMainView.as's
 * `_icons` table (`<name>_white` default / `<name>_color` hover per me-menu tile). Copied so the
 * wired views can reference them through `layoutImage()` like everything else.
 */
const RUNTIME_IMAGES = [
    'gohome', 'dance', 'clothes', 'effects', 'badges', 'wave', 'settings', 'credits', 'minimail', 'profile', 'achievements', 'compass', 'lighthouse',
].flatMap(name => [ `${name}_white`, `${name}_color` ]);

const resolveImage = (name: string): string | undefined => {
    const file = imageFiles.get(name) ?? imageFiles.get(`${name}_png`);

    if (!file) {
        unresolvedImages.add(name);

        return undefined;
    }

    const ext = file.slice(file.lastIndexOf('.'));
    const outName = `${name.replace(/_(png|gif|jpg)$/i, '')}${ext}`;

    if (!copiedImages.has(outName)) {
        copyFileSync(join(IMAGE_DIR, file), join(IMAGE_OUT_DIR, outName));
        copiedImages.set(outName, file);
    }

    return outName;
};

// ---------------------------------------------------------------------------------------------
// Emitter
// ---------------------------------------------------------------------------------------------

/** State shared by every component emitted into one file (the layout plus its list-row sub-components). */
interface FileContext {
    componentName: string;
    /** Output folder under views/layouts (see `layoutFolder`). */
    folder: string;
    imports: Set<string>;
    /** Placeholder tokens of shared catalog widgets this file renders (resolved to real names after every layout is generated). */
    sharedImports: Set<string>;
    scrollTargets: Map<string, 'vertical' | 'horizontal'>;
    warnings: string[];
    /** Source of the row-template sub-components, appended after the main component. */
    subComponents: string[];
    subComponentNames: string[];
    /** Each sub-component's own props / nested sub-components, for the registry. */
    subComponentProps: Record<string, { props: string[]; nested: Record<string, string> }>;
}

interface EmitContext {
    file: FileContext;
    /** Set by `emit` when it re-enters itself for the element it has just wrapped in a `{cond && (...)}`. */
    conditionalDone?: boolean;
    imports: Set<string>;
    usesTranslation: boolean;
    props: Map<string, string>;
    states: { name: string }[];
    propCounts: Map<string, number>;
    scrollTargets: Map<string, 'vertical' | 'horizontal'>;
    warnings: string[];
}

const createEmitContext = (file: FileContext): EmitContext => ({
    file, imports: file.imports, usesTranslation: false, props: new Map(), states: [], propCounts: new Map(), scrollTargets: file.scrollTargets, warnings: file.warnings,
});

interface ParentBox {
    width: number;
    height: number;
    /** Children of an item list flow in a flex row/column instead of being absolutely placed. */
    flow: boolean;
    /** The root of a row-template sub-component also merges the caller's own `layout` prop. */
    spreadLayout?: boolean;
    /** The root of a shared widget: placement comes entirely from the caller's `layout`, only the flex/clipping extras stay. */
    omitPlacement?: boolean;
}

const INDENT = '    ';

/** `${friendbar.requests.title}` -> `t('friendbar.requests.title')`; plain text stays a literal. */
const captionExpr = (ctx: EmitContext, raw: string | undefined): string | undefined => {
    if (raw === undefined) return undefined;

    const text = decode(raw);

    if (!text.length) return undefined;

    const whole = /^\$\{([^}]+)\}$/.exec(text);

    if (whole) {
        ctx.usesTranslation = true;

        return `t(${quote(whole[1])})`;
    }

    if (!text.includes('${')) return quote(text);

    ctx.usesTranslation = true;

    const parts = text.split(/(\$\{[^}]+\})/).filter(Boolean).map((part) => {
        const key = /^\$\{([^}]+)\}$/.exec(part);

        return key ? `\${t(${quote(key[1])})}` : part.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    });

    return `\`${parts.join('')}\``;
};

const uniqueProp = (ctx: EmitContext, base: string): string => {
    // `layout`/`tags` are set directly on `ctx.props` rather than through here - a region that
    // happens to be named `tags` must not collide with them.
    const count = ctx.propCounts.get(base) ?? (ctx.props.has(base) ? 1 : 0);

    ctx.propCounts.set(base, count + 1);

    return count === 0 ? base : `${base}${count + 1}`;
};

const handlerProp = (ctx: EmitContext, el: Element, fallback: string): string => {
    const name = uniqueProp(ctx, `on${pascal(el.attrs.name || fallback)}`);

    ctx.props.set(name, '() => void');

    return name;
};

const layoutLiteral = (fields: Record<string, string | number | undefined>): string => {
    const entries = Object.entries(fields).filter(([ , value ]) => value !== undefined);

    return `{ ${entries.map(([ key, value ]) => `${key}: ${typeof value === 'number' ? value : value}`).join(', ')} }`;
};

// `WindowParam` bits the port acts on (the rest - graphic context, event routing, drag/scale
// triggers - are engine internals carried through as the `params` prop only). Values from the
// client's com/sulake/core/window/utils `fillTables()`.
const PARAM = {
    INPUT: 1,
    H_MOVE: 64, H_STRECH: 128, H_CENTER: 192, H_MASK: 192,
    V_MOVE: 1024, V_STRECH: 2048, V_CENTER: 3072, V_MASK: 3072,
    SHRINK_TO_CHILDREN: 16384, EXPAND_TO_CHILDREN: 131072,
    ALIGN_RIGHT: 262144, ALIGN_H_CENTER: 786432, ALIGN_H_MASK: 786432,
    ALIGN_BOTTOM: 1048576, ALIGN_V_MIDDLE: 3145728, ALIGN_V_MASK: 3145728,
    REFLECT_H: 4194304, REFLECT_V: 8388608,
    FORCE_CLIPPING: 1073741824,
} as const;

type Anchor = 'fixed' | 'move' | 'strech' | 'center';

/**
 * How an element follows its parent's resize on one axis. `<scale>` (the tool-exported form)
 * wins where present; otherwise the `relative_*_scale_*` bits, then the `on_resize_align_*`
 * bits (right/bottom == move, center/middle == center) - both of which the Flash window
 * manager treated as "keep this edge/centre at the same distance".
 */
const anchor = (explicit: string | undefined, params: number, axis: 'h' | 'v'): Anchor => {
    if (explicit === 'strech' || explicit === 'move' || explicit === 'center') return explicit;
    if (explicit === 'fixed') return 'fixed';

    const scale = params & (axis === 'h' ? PARAM.H_MASK : PARAM.V_MASK);

    if (scale === (axis === 'h' ? PARAM.H_CENTER : PARAM.V_CENTER)) return 'center';
    if (scale === (axis === 'h' ? PARAM.H_STRECH : PARAM.V_STRECH)) return 'strech';
    if (scale === (axis === 'h' ? PARAM.H_MOVE : PARAM.V_MOVE)) return 'move';

    const align = params & (axis === 'h' ? PARAM.ALIGN_H_MASK : PARAM.ALIGN_V_MASK);

    if (align === (axis === 'h' ? PARAM.ALIGN_H_CENTER : PARAM.ALIGN_V_MIDDLE)) return 'center';
    if (align === (axis === 'h' ? PARAM.ALIGN_RIGHT : PARAM.ALIGN_BOTTOM)) return 'move';

    return 'fixed';
};

/**
 * True when this element's own box will hold an absolutely-positioned child whose horizontal
 * anchor is `center`. Such a child carries no horizontal inset (see `boxLayout`'s centre
 * branch), so the parent centres it through its own `justifyContent` - the main axis of the
 * default `row` direction (both `@pixi/layout`'s `Layout.defaultStyle` and CSS default to
 * `row`; no generated non-flow container sets its own direction). Harmless to every sibling:
 * all other anchors always emit at least one inset per axis, and an inset always wins over
 * alignment. Vertical centring never needs the parent - it's the cross axis, so the child's
 * own `alignSelf` covers it.
 */
const centersHChild = (el: Element): boolean => num(el.attrs.width) > 0
    && el.children.some(child => anchor(child.scale?.horizontal, child.params, 'h') === 'center');

const centerExtra = (el: Element): Record<string, string | undefined> => ({ justifyContent: centersHChild(el) ? '\'center\'' : undefined });

interface BoxLayoutOptions {
    /** `reflect_*_resize_to_parent` leaf (a text or bitmap): size to content on that axis instead of the XML box. */
    autoSize?: boolean;
    /** The element lays its children out in flow (a list), so `expand/resize_to_accommodate_children` can be honoured. */
    growsWithChildren?: boolean;
}

/** Absolute placement from x/y/width/height + the anchoring bits, or flow sizing in a list. */
const boxLayout = (el: Element, parent: ParentBox, extra: Record<string, string | number | undefined> = {}, options: BoxLayoutOptions = {}): string => {
    const x = num(el.attrs.x);
    const y = num(el.attrs.y);
    const width = num(el.attrs.width);
    const height = num(el.attrs.height);
    const fields: Record<string, string | number | undefined> = {};
    const autoWidth = !!options.autoSize && !!(el.params & PARAM.REFLECT_H);
    const autoHeight = !!options.autoSize && !!(el.params & PARAM.REFLECT_V);
    // `expand_to_accommodate_children` only ever grows, so the XML box becomes a minimum;
    // `resize_to_accommodate_children` (expand + shrink) frees the size entirely. Only
    // meaningful where children actually contribute to the flex size (a list's rows) - a box
    // of absolutely-positioned children can't be measured, so it keeps its fixed size.
    const expands = !!options.growsWithChildren && !!(el.params & PARAM.EXPAND_TO_CHILDREN);
    const shrinks = expands && !!(el.params & PARAM.SHRINK_TO_CHILDREN);
    const sizeField = (axis: 'width' | 'height', value: number, auto: boolean) => {
        if (auto || shrinks) return;

        if (expands) fields[axis === 'width' ? 'minWidth' : 'minHeight'] = value;
        else fields[axis] = value;
    };

    if (parent.omitPlacement) {
        fields.position = '\'absolute\'';
    } else if (parent.flow) {
        sizeField('width', width, autoWidth);
        sizeField('height', height, autoHeight);
        fields.flexShrink = 0;
    } else {
        fields.position = '\'absolute\'';

        const horizontal = anchor(el.scale?.horizontal, el.params, 'h');
        const vertical = anchor(el.scale?.vertical, el.params, 'v');

        if (horizontal === 'strech' && parent.width > 0 && !autoWidth) {
            fields.left = x;
            fields.right = parent.width - x - width;
        } else if (horizontal === 'move' && parent.width > 0) {
            fields.right = parent.width - x - width;
            sizeField('width', width, autoWidth);
        } else if (horizontal === 'center' && parent.width > 0) {
            // Keep the element's centre at the same offset from the parent's centre - as real
            // flex centring, not a `left: '50%'` + negative-pixel-margin hack: the parent box
            // gets `justifyContent: 'center'` (see `centersHChild`), which centres this child
            // because it deliberately carries no horizontal inset (both Yoga and CSS resolve an
            // absolutely-positioned child's inset-less axis to its static position - centred,
            // per the "as if it were the sole flex item" rule). A non-zero design offset rides
            // along as an equal-and-opposite margin pair, which shifts the centred box without
            // changing its margin-box size - so, unlike the old 50% form, an auto-sized child
            // (a translated label, a template row) stays centred at whatever width it renders.
            const offset = x + width / 2 - parent.width / 2;

            if (offset) {
                fields.marginLeft = offset;
                fields.marginRight = -offset;
            }

            sizeField('width', width, autoWidth);
        } else {
            fields.left = x;
            sizeField('width', width, autoWidth);
        }

        if (vertical === 'strech' && parent.height > 0 && !autoHeight) {
            fields.top = y;
            fields.bottom = parent.height - y - height;
        } else if (vertical === 'move' && parent.height > 0) {
            fields.bottom = parent.height - y - height;
            sizeField('height', height, autoHeight);
        } else if (vertical === 'center' && parent.height > 0) {
            // Vertical is the cross axis of the (default) row direction, so this centring is
            // fully child-local: `alignSelf: 'center'` needs nothing from the parent. Same
            // margin-pair offset scheme as the horizontal branch above.
            const offset = y + height / 2 - parent.height / 2;

            fields.alignSelf = '\'center\'';

            if (offset) {
                fields.marginTop = offset;
                fields.marginBottom = -offset;
            }

            sizeField('height', height, autoHeight);
        } else {
            fields.top = y;
            sizeField('height', height, autoHeight);
        }
    }

    if (el.attrs.width_min) fields.minWidth = num(el.attrs.width_min);
    if (el.attrs.width_max) fields.maxWidth = num(el.attrs.width_max);
    if (el.attrs.height_min) fields.minHeight = num(el.attrs.height_min);
    if (el.attrs.height_max) fields.maxHeight = num(el.attrs.height_max);
    if (el.attrs.clipping === 'true' || (el.params & PARAM.FORCE_CLIPPING)) fields.overflow = '\'hidden\'';

    const literal = layoutLiteral({ ...fields, ...extra });

    return parent.spreadLayout ? literal.replace(/ \}$/, ', ...layout }') : literal;
};

/** A named element's value can be overridden through a prop (`captionTitle`, `srcIcon`, ...). */
const overrideProp = (ctx: EmitContext, el: Element, prefix: string, type: string): string | undefined => {
    if (!el.attrs.name) return undefined;

    const name = uniqueProp(ctx, `${prefix}${pascal(el.attrs.name)}`);

    ctx.props.set(name, type);

    return name;
};

/** The `ThemeLayoutMeta` props shared by every themed component. */
const metaProps = (ctx: EmitContext, el: Element): string[] => {
    const props: string[] = [];

    if (el.attrs.name) props.push(`name=${jsxStr(el.attrs.name)}`);

    const tooltip = captionExpr(ctx, el.vars.tool_tip_caption);

    if (tooltip) props.push(`tooltip={${tooltip}}`);
    if (el.attrs.dynamic_style) props.push(`dynamicStyle=${jsxStr(el.attrs.dynamic_style)}`);

    return props;
};

// ---------------------------------------------------------------------------------------------
// Tags. The Flash `tags` attribute was mostly a lookup handle (`findChildByTag("close")`) or a
// window-framework marker (`_INTERNAL`, `_EXCLUDE`, `_HEADER`, ...) - none of which means
// anything to a React tree, so tags are never emitted as data. The handful that changed
// behaviour in the client are turned into real props here:
//   - `VISIBLE_HOTEL/ROOM/GAME_CENTER/NOOB/COLLAPSED` (ToolbarView.as / BottomBarLeft.as): an
//     element shows only in the listed toolbar context  -> `context` prop
//   - `action` / `moderate` / `ambassador` (AvatarMenuView.showButton): a menu group toggled
//     as a whole                                          -> `visibleGroups` prop
//   - `RECOLORABLE_LIGHT/MEDIUM/DARK` (RewardTrackTheme.applyColor): colour comes from the
//     active theme                                        -> `recolorLight/Medium/Dark` props
//   - `COLORABLE` (landing view WidgetContainerLayout) / `stroke` (snow war WindowUtils
//     .colorStrokes): text colour set by the owner        -> `colorableTextColor` / `strokeTextColor`
//   - `BLEND_<mode>` (WindowRendererItem): a blend mode    -> `blendMode` prop
//   - `FIXED`, `2X`, `NO_GIFT_OPTION`, ... on a catalog widget slot (the *CatalogWidget classes
//     read them as configuration)                         -> boolean flags on the shared widget
// ---------------------------------------------------------------------------------------------

const tagSet = (el: Element): Set<string> => new Set(el.attrs.tags ? decode(el.attrs.tags).split(',').map(tag => tag.trim()).filter(Boolean) : []);

const TOOLBAR_CONTEXTS: Record<string, string> = { VISIBLE_HOTEL: 'hotel', VISIBLE_ROOM: 'room', VISIBLE_GAME_CENTER: 'gameCenter', VISIBLE_NOOB: 'noob', VISIBLE_COLLAPSED: 'collapsed' };
const TOOLBAR_CONTEXT_TYPE = '\'hotel\' | \'room\' | \'gameCenter\' | \'noob\' | \'collapsed\'';
const MENU_GROUPS = [ 'action', 'moderate', 'ambassador' ];
const MENU_GROUPS_TYPE = '{ action?: boolean; moderate?: boolean; ambassador?: boolean }';
const RECOLORABLE: Record<string, string> = { RECOLORABLE_LIGHT: 'recolorLight', RECOLORABLE_MEDIUM: 'recolorMedium', RECOLORABLE_DARK: 'recolorDark' };
const TEXT_COLOR_TAGS: Record<string, string> = { COLORABLE: 'colorableTextColor', stroke: 'strokeTextColor' };
const WIDGET_FLAGS: Record<string, string> = { FIXED: 'fixed', '2X': 'doubleSize', NO_ROOM_CANVAS: 'noRoomCanvas', ROOM_INITIATE_PURCHASE: 'roomInitiatePurchase', NO_GIFT_OPTION: 'noGiftOption', TOP_STORY: 'topStory', NEW: 'isNew' };

/** The `visible={...}` expression for an element, or undefined when it's unconditionally visible. */
const visibilityExpr = (ctx: EmitContext, el: Element, { defaultHidden, override }: { defaultHidden: boolean; override?: string }): string | undefined => {
    const tags = tagSet(el);
    const conditions: string[] = [];
    const contexts = [ ...tags ].filter(tag => TOOLBAR_CONTEXTS[tag]).map(tag => TOOLBAR_CONTEXTS[tag]);

    if (contexts.length) {
        ctx.props.set('context', TOOLBAR_CONTEXT_TYPE);
        conditions.push(`(context === undefined || [ ${contexts.map(quote).join(', ')} ].includes(context))`);
    }

    for (const group of MENU_GROUPS.filter(group => tags.has(group))) {
        ctx.props.set('visibleGroups', MENU_GROUPS_TYPE);
        conditions.push(`(visibleGroups?.${group} ?? true)`);
    }

    if (override) conditions.push(`(${override} ?? ${!defaultHidden})`);
    else if (defaultHidden) conditions.push('false');

    if (!conditions.length) return undefined;

    // Each condition keeps its own parentheses: the result is the left operand of the
    // `cond && (...)` render guard, and `a ?? b && c` would bind the wrong way.
    return conditions.join(' && ');
};

/** A colour that a `RECOLORABLE_*` tag lets the theme override: `recolorDark ?? '#3576b9'`. */
const recolorExpr = (ctx: EmitContext, el: Element, own: string | undefined): string | undefined => {
    const prop = [ ...tagSet(el) ].map(tag => RECOLORABLE[tag]).find(Boolean);

    if (!prop) return own ? quote(own) : undefined;

    ctx.props.set(prop, 'string');

    return own ? `${prop} ?? ${quote(own)}` : prop;
};

/** A text colour that a `COLORABLE`/`stroke` (or `RECOLORABLE_*`) tag lets the owner override. */
const textColorExpr = (ctx: EmitContext, el: Element, own: string | undefined): string | undefined => {
    const prop = [ ...tagSet(el) ].map(tag => TEXT_COLOR_TAGS[tag] ?? RECOLORABLE[tag]).find(Boolean);

    if (!prop) return own ? quote(own) : undefined;

    ctx.props.set(prop, 'string');

    return own ? `${prop} ?? ${quote(own)}` : prop;
};

const blendProp = (el: Element): string[] => {
    const mode = [ ...tagSet(el) ].find(tag => tag.startsWith('BLEND_'))?.slice(6).toLowerCase();

    return mode ? [ `blendMode="${mode}"` ] : [];
};

/** Boolean configuration flags a page puts on a catalog widget slot. */
const widgetFlagProps = (el: Element): string[] => [ ...tagSet(el) ].map(tag => WIDGET_FLAGS[tag]).filter(Boolean);

const dropShadowProp = (el: Element): string[] => (el.dropShadow ? [ `dropShadow={${layoutLiteral({ ...el.dropShadow, color: el.dropShadow.color ? quote(el.dropShadow.color) : undefined })}}` ] : []);

const variantProp = (el: Element): string[] => (el.attrs.style !== undefined ? [ `variant="${el.attrs.style}"` ] : []);

const tintProp = (ctx: EmitContext, el: Element): string[] => {
    const expr = recolorExpr(ctx, el, hexColor(el.attrs.color));

    return expr ? [ `tintColor={${expr}}` ] : [];
};

const openTag = (name: string, props: string[], indent: string, selfClose: boolean): string[] => {
    if (props.length <= 1) return [ `${indent}<${name}${props.length ? ` ${props[0]}` : ''}${selfClose ? ' />' : '>'}` ];

    return [ `${indent}<${name}`, ...props.map(prop => `${indent}${INDENT}${prop}`), `${indent}${selfClose ? '/>' : '>'}` ];
};

const wrap = (name: string, props: string[], indent: string, children: string[]): string[] => {
    if (!children.length) return openTag(name, props, indent, true);

    return [ ...openTag(name, props, indent, false), ...children, `${indent}</${name}>` ];
};

/**
 * `scrollbar_vertical`/`scrollbar_horizontal` aren't emitted where they stand: their
 * `scrollable` variable names the list they drive, and that list is wrapped in a `ScrollArea`
 * (which renders the themed scrollbar itself) - see `emitList`.
 */
const SKIPPED_TAGS = new Set([ 'scrollbar_vertical', 'scrollbar_horizontal' ]);

/**
 * The window chrome pieces a skin template lays out by hand (`frame_3`, `bubble_7`, the
 * `illumina_*_scrollbar` skins, ...). Each has a themed component of the same role that draws
 * its own art, so the element becomes that component at the template's position/size.
 */
const CHROME_TAGS: Record<string, { component: string; props?: string[]; meta?: boolean }> = {
    header: { component: 'Header', meta: true },
    scaler: { component: 'Scaler', meta: true },
    bubble_pointer_up: { component: 'BubblePointer', props: [ 'direction="up"' ], meta: true },
    bubble_pointer_down: { component: 'BubblePointer', props: [ 'direction="down"' ], meta: true },
    bubble_pointer_left: { component: 'BubblePointer', props: [ 'direction="left"' ], meta: true },
    bubble_pointer_right: { component: 'BubblePointer', props: [ 'direction="right"' ], meta: true },
    frame_pointer_down: { component: 'FramePointerDown', meta: true },
    scrollbar_slider_track_horizontal: { component: 'ScrollbarSliderTrackHorizontal' },
    scrollbar_slider_bar_horizontal: { component: 'ScrollbarSliderBarHorizontal' },
    scrollbar_slider_track_vertical: { component: 'ScrollbarSliderTrackVertical', meta: true },
    scrollbar_slider_bar_vertical: { component: 'ScrollbarSliderBarVertical', meta: true },
    scrollbar_slider_button_left: { component: 'ScrollbarSliderButtonLeft' },
    scrollbar_slider_button_right: { component: 'ScrollbarSliderButtonRight' },
    scrollbar_slider_button_up: { component: 'ScrollbarSliderButtonUp' },
    scrollbar_slider_button_down: { component: 'ScrollbarSliderButtonDown' },
};

const TEXT_TAGS = new Set([ 'text', 'label', 'formatted_text', 'html', 'link' ]);
const LIST_TAGS: Record<string, { direction: 'row' | 'column'; wrap?: boolean; scroll?: 'vertical' | 'horizontal' }> = {
    itemlist: { direction: 'column' },
    itemlist_vertical: { direction: 'column' },
    itemlist_horizontal: { direction: 'row' },
    itemgrid_vertical: { direction: 'row', wrap: true },
    scrollable_itemlist_vertical: { direction: 'column', scroll: 'vertical' },
    scrollable_itemgrid_vertical: { direction: 'row', wrap: true, scroll: 'vertical' },
    selector_list: { direction: 'column' },
};

const AUTO_SIZE_JUSTIFY: Record<string, string> = { left: '\'flex-start\'', center: '\'center\'', right: '\'flex-end\'' };

const emitChildren = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] =>
    el.children.flatMap(child => emit(ctx, child, parent, indent));

const selfBox = (el: Element, flow = false): ParentBox => ({ width: num(el.attrs.width), height: num(el.attrs.height), flow });

/** Just the `<ThemeText>` for a text element - used where the parent already lays its caption out (a button). */
const textElement = (ctx: EmitContext, el: Element): { props: string[]; hasText: boolean; wordWrap: boolean; autoSize: string } => {
    const caption = captionExpr(ctx, el.attrs.caption);
    const { textStyle, fill: styleFill } = resolveTextStyle(el.vars.text_style);
    const fill = hexColor(el.vars.text_color) ?? styleFill;
    const wordWrap = !!(bool(el.vars.word_wrap) || bool(el.vars.multiline));
    const autoSize = el.vars.auto_size && AUTO_SIZE_JUSTIFY[el.vars.auto_size] ? el.vars.auto_size : 'left';
    const textOptions: Record<string, string | number | undefined> = {
        fill: textColorExpr(ctx, el, fill),
        wordWrap: wordWrap ? 'true' : undefined,
        wordWrapWidth: wordWrap && !(el.params & PARAM.REFLECT_H) ? num(el.attrs.width) : undefined,
        align: autoSize !== 'left' ? quote(autoSize) : undefined,
    };
    const props: string[] = [];
    const override = overrideProp(ctx, el, 'caption', 'string');
    const hasText = !!(caption || override);

    if (override && caption) props.push(`text={${override} ?? ${caption}}`);
    else if (override) props.push(`text={${override} ?? ''}`);
    else if (caption) props.push(`text=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);

    if (textStyle) props.push(`textStyle="${textStyle}"`);
    if (Object.values(textOptions).some(value => value !== undefined)) props.push(`textOptions={${layoutLiteral(textOptions)}}`);
    if (hasText) ctx.imports.add('ThemeText');

    return { props, hasText, wordWrap, autoSize };
};

/** A text as a button's caption: no positioning wrapper, the button's own flex centring places it. */
const emitInlineText = (ctx: EmitContext, el: Element, indent: string): string[] => {
    const { props, hasText } = textElement(ctx, el);

    return hasText ? openTag('ThemeText', props, indent, true) : [];
};

/** A single text child that covers its container exactly - the container's box can hold the text directly. */
const fillsHost = (child: Element, host: Element): boolean =>
    num(child.attrs.x) === 0 && num(child.attrs.y) === 0 && num(child.attrs.width) === num(host.attrs.width) && num(child.attrs.height) === num(host.attrs.height);

/**
 * A text element: one `Region` (the positioned, aligning box) holding the `ThemeText`. With a
 * `host` - a container whose only child is this text, filling it - the host's own Region carries
 * the text instead of nesting two boxes.
 */
const emitText = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string, host?: Element): string[] => {
    const box = host ?? el;
    const { props: textProps, hasText, wordWrap, autoSize } = textElement(ctx, el);

    ctx.imports.add('Region');

    const regionProps = [
        ...metaProps(ctx, box),
        ...dropShadowProp(box),
        ...(host ? blendProp(host) : []),
        `layout={${boxLayout(box, parent, { flexDirection: '\'row\'', alignItems: wordWrap ? '\'flex-start\'' : '\'center\'', justifyContent: AUTO_SIZE_JUSTIFY[autoSize] }, { autoSize: !host })}}`,
    ];

    if (el.tag === 'link') {
        regionProps.push(`onPointerTap={${handlerProp(ctx, el, 'link')}}`);
        regionProps.push('cursor="pointer"');
    } else if (host && (host.tag === 'region' || host.tag === 'container') && host.attrs.name && (host.params & PARAM.INPUT)) {
        regionProps.push(`onPointerTap={${handlerProp(ctx, host, 'region')}}`);
        regionProps.push('cursor="pointer"');
    }

    const bgColor = hexColor(box.attrs.color);

    if (bgColor && (box.attrs.background === 'true' || box.tag === 'background' || box.tag === 'gradient')) regionProps.push(`backgroundColor={${recolorExpr(ctx, box, bgColor)}}`);

    return wrap('Region', regionProps, indent, hasText ? openTag('ThemeText', textProps, indent + INDENT, true) : []);
};

const emitBitmap = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const assetName = el.vars.asset_uri ?? el.vars.bitmap_asset_name ?? '';
    const props = [ ...metaProps(ctx, el) ];
    let src: string | undefined;

    if (assetName.startsWith('${')) {
        // `${image.library.url}catalogue/icon_1.png` - resolved from config at runtime by the client.
        src = quote(assetName);
        ctx.warnings.push(`external image ${assetName}`);
    } else if (assetName) {
        const file = resolveImage(assetName);

        if (file) {
            ctx.imports.add('layoutImage');
            src = `layoutImage(${quote(file)})`;
        } else {
            ctx.imports.add('layoutImage');
            src = `layoutImage(${quote(`${assetName}.png`)})`;
        }
    }

    const override = overrideProp(ctx, el, 'src', 'string');

    if (override && src) props.push(`src={${override} ?? ${src}}`);
    else props.push(`src={${override ?? src ?? 'undefined'}}`);

    if (bool(el.vars.stretched_x) || bool(el.vars.fit_size_to_contents) === false) props.push(`width={${num(el.attrs.width)}}`);
    if (bool(el.vars.stretched_y) || bool(el.vars.fit_size_to_contents) === false) props.push(`height={${num(el.attrs.height)}}`);

    const tint = hexColor(el.attrs.color);

    const tintExpr = recolorExpr(ctx, el, tint && tint !== '#ffffff' ? tint : undefined);

    if (tintExpr) props.push(`tint={${tintExpr}}`);
    props.push(...blendProp(el));

    ctx.imports.add('ThemeImage');
    props.push(`layout={${boxLayout(el, parent, {}, { autoSize: true })}}`);

    // Only a drop shadow needs a Region around the image.
    const image = openTag('ThemeImage', props, el.dropShadow ? indent + INDENT : indent, true);

    if (!el.dropShadow) return image;

    ctx.imports.add('Region');

    return wrap('Region', [ ...dropShadowProp(el), `layout={${boxLayout(el, parent)}}` ], indent, image);
};

const emitList = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const list = LIST_TAGS[el.tag];
    const scroll = list.scroll ?? (el.attrs.name ? ctx.scrollTargets.get(el.attrs.name) : undefined);
    const spacing = num(el.vars.spacing);
    const flowLayout: Record<string, string | number | undefined> = {
        flexDirection: `'${list.direction}'`,
        flexWrap: list.wrap ? '\'wrap\'' : undefined,
        gap: spacing || undefined,
    };

    ctx.imports.add('Region');

    const innerParent = selfBox(el, true);
    const meta = [ ...metaProps(ctx, el), ...dropShadowProp(el) ];
    const background = el.attrs.background === 'true' && hexColor(el.attrs.color) ? [ `backgroundColor="${hexColor(el.attrs.color)!}"` ] : [];
    const contentIndent = scroll ? indent + INDENT : indent;
    const children = emitListChildren(ctx, el, innerParent, contentIndent + INDENT);

    if (!scroll) {
        return wrap('Region', [ ...meta, ...background, `layout={${boxLayout(el, parent, flowLayout, { growsWithChildren: true })}}` ], indent, children);
    }

    ctx.imports.add('ScrollArea');

    const content = wrap(
        'Region',
        [ ...meta, ...background, `layout={${layoutLiteral({ ...flowLayout, width: '\'100%\'' })}}` ],
        contentIndent,
        children,
    );

    return wrap('ScrollArea', [ `orientation="${scroll}"`, `layout={${boxLayout(el, parent)}}` ], indent, content);
};

/**
 * A list's *named* children are the row templates the Flash code cloned per data item
 * (`removeListItemAt(0)` then `clone()` per entry - see e.g. FriendRequestsTab.as). Each becomes
 * its own exported sub-component, and the list gets an `items<ListName>` slot that replaces the
 * template rows with real data; unnamed children stay inline as plain static content.
 */
const emitListChildren = (ctx: EmitContext, list: Element, parent: ParentBox, indent: string): string[] => {
    const named = list.children.filter(child => child.attrs.name && !SKIPPED_TAGS.has(child.tag));

    if (!named.length || !list.attrs.name) return emitChildren(ctx, list, parent, indent);

    const slot = uniqueProp(ctx, `items${pascal(list.attrs.name)}`);

    ctx.props.set(slot, 'ReactNode');
    ctx.imports.add('ReactNode');

    const templates = named.map(child => generateSubComponent(ctx.file, child, parent));
    const fallback = templates.map(name => `${indent}${INDENT}<${name} />`);
    const rest = list.children.filter(child => !named.includes(child)).flatMap(child => emit(ctx, child, parent, indent));

    return [ `${indent}{${slot} ?? (`, ...(fallback.length === 1 ? fallback : [ `${indent}${INDENT}<>`, ...fallback.map(line => INDENT + line), `${indent}${INDENT}</>` ]), `${indent})}`, ...rest ];
};

const emitFrame = (ctx: EmitContext, el: Element, parent: ParentBox | undefined, indent: string): string[] => {
    ctx.imports.add('Frame');
    ctx.imports.add('Region');

    const caption = captionExpr(ctx, el.attrs.caption);
    const props = [ ...variantProp(el), ...(el.attrs.name ? [ `id=${jsxStr(el.attrs.name)}` ] : []), ...metaProps(ctx, el) ];

    if (caption) props.push(`caption=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);

    props.push(...tintProp(ctx, el));

    if (!parent) {
        ctx.props.set('onClose', '() => void');
        ctx.props.set('layout', 'BoxLayout');
        ctx.imports.add('BoxLayout');
        props.push('onClose={onClose}');
        props.push(`layout={{ width: ${num(el.attrs.width)}, height: ${num(el.attrs.height)}, ...layout }}`);
    } else {
        props.push(`onClose={${handlerProp(ctx, el, 'frameClose')}}`);
        props.push(`layout={${boxLayout(el, parent)}}`);
    }

    // Children go straight into the Frame's ContentArea: an absolutely positioned child is
    // placed from its parent's padding edge in both Yoga and CSS, so no relative wrapper is
    // needed - unless a child centres itself, which needs a flex parent of its own.
    const content = centersHChild(el)
        ? wrap('Region', [ `layout={${layoutLiteral({ position: '\'relative\'', flex: 1, width: '\'100%\'', ...centerExtra(el) })}}` ], indent + INDENT, emitChildren(ctx, el, selfBox(el), indent + INDENT + INDENT))
        : emitChildren(ctx, el, selfBox(el), indent + INDENT);

    return wrap('Frame', props, indent, content);
};

const emitInput = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const stateName = uniqueProp(ctx, `${camel(el.attrs.name || 'input')}Value`);

    ctx.states.push({ name: stateName });
    ctx.imports.add('TextInput');

    const props = [
        `value={${stateName}}`,
        `onChange={set${pascal(stateName)}}`,
    ];

    if (el.vars.max_chars) props.push(`maxLength={${num(el.vars.max_chars)}}`);
    if (bool(el.vars.multiline)) props.push('multiline');

    const textColor = hexColor(el.vars.text_color);

    if (textColor) props.push(`textColor="${textColor}"`);
    if (el.attrs.background === 'true' && hexColor(el.attrs.color)) props.push(`backgroundColor="${hexColor(el.attrs.color)!}"`);

    props.push(`layout={${boxLayout(el, parent)}}`);

    return openTag('TextInput', props, indent, true);
};

/** Components whose root Box takes `visible` directly (kept for hand-written views; generated code renders conditionally instead). */
export const VISIBLE_AWARE = new Set([ 'Border', 'Button', 'ButtonThick', 'CheckBox', 'RadioButton', 'TabButton', 'TabContent', 'TabContext', 'Dropmenu', 'Droplist', 'Bubble', 'CloseButton', 'ContainerButton', 'Scaler', 'Header', 'Tooltip' ]);

const emitThemed = (ctx: EmitContext, component: string, el: Element, parent: ParentBox, indent: string, extraProps: string[], children: (childIndent: string) => string[]): string[] => {
    ctx.imports.add(component);

    const props = [ ...variantProp(el), ...metaProps(ctx, el), ...tintProp(ctx, el), ...extraProps ];
    const blend = blendProp(el);

    if (!el.dropShadow && !blend.length) return wrap(component, [ ...props, `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, children(indent + INDENT));

    // Components don't take `dropShadow`/`blendMode` themselves - a Region wrapper carries them.
    ctx.imports.add('Region');

    // The children render inside the component, not the wrapper - a centred child's
    // `justifyContent` belongs on the inner layout here, never on the wrapper's.
    const inner = wrap(component, [ ...props, `layout={${layoutLiteral({ width: '\'100%\'', height: '\'100%\'', ...centerExtra(el) })}}` ], indent + INDENT, children(indent + INDENT + INDENT));

    return wrap('Region', [ ...dropShadowProp(el), ...blend, `layout={${boxLayout(el, parent)}}` ], indent, inner);
};

const REGION_TAGS = new Set([ 'container', 'region', 'background', 'boxsizer', 'display_object_wrapper', 'selector', 'gradient' ]);

// ---------------------------------------------------------------------------------------------
// Shared catalog widgets. The catalog pages embed the same widget markup over and over (23
// `purchaseWidget`s, 11 `specialInfoWidget`s, ...) under the ids in the client's
// CatalogWidgetEnum.as - the page layout just reserves a named container and
// `CatalogPage.as`/`*CatalogWidget.attachWidgetView()` attaches the widget to it by name. Those
// become one component per widget id (per distinct markup) under `catalog/widgets/`, and the
// pages render that component at their own placement instead of a private copy.
// ---------------------------------------------------------------------------------------------

const CATALOG_WIDGET_IDS = new Set([
    'activityPointDisplayWidget', 'addOnBadgeViewWidget', 'builderWidget', 'builderAddonsWidget', 'builderLoyaltyWidget', 'builderSubscriptionWidget',
    'bundleGridScrollWidget', 'bundlePurchaseExtraInfoWidget', 'buyGuildWidget', 'clubBuyWidget', 'clubGiftWidget', 'colourGridWidget', 'featuredItemsWidget',
    'guildBadgeViewWidget', 'guildSelectorWidget', 'guildForumSelectorWidget', 'itemGridWidget', 'loyaltyVipBuyWidget', 'madMoneyWidget', 'marketPlaceWidget',
    'marketPlaceOwnItemsWidget', 'newPetsWidget', 'petsWidget', 'petPreviewWidget', 'productViewWidget', 'purchaseWidget', 'recyclerWidget', 'recyclerPrizesWidget',
    'redeemItemCodeWidget', 'roomAdsCatalogWidget', 'roomPreviewWidget', 'simplePriceWidget', 'singleViewWidget', 'soldLtdItemsWidget', 'songDiskProductViewWidget',
    'spacesNewWidget', 'specialInfoWidget', 'spinnerWidget', 'textInputWidget', 'totalPriceWidget', 'traxPreviewWidget', 'trophyWidget', 'limitedItemWidget',
    'userBadgeSelectorWidget', 'vipBuyWidget', 'vipGiftWidget', 'warningWidget', 'firstProductAutoSelectorWidget',
]);

const WIDGETS_FOLDER = 'catalog/widgets';

interface SharedWidgetVariant {
    /** Placeholder used in every file until all variants are known and can be numbered. */
    token: string;
    /** The widget file's component source with `token` standing in for the final name. */
    code: string;
    uses: number;
    imports: Set<string>;
    sharedImports: Set<string>;
    subComponentProps: Record<string, { props: string[]; nested: Record<string, string> }>;
    pages: string[];
    /** An empty slot the client filled with the widget's own layout (`attachWidgetView` builds the `<id>_xml` asset) - this variant wraps that layout component. */
    wraps?: { componentName: string; folder: string };
}

/** widget id -> markup hash -> variant */
const sharedWidgets = new Map<string, Map<string, SharedWidgetVariant>>();

/** Every layout by its Flash asset name, filled in before generation starts (so widget slots can find the layout they attach). */
const layoutByBase = new Map<string, { componentName: string; folder: string }>();

const isSharedWidget = (file: FileContext, el: Element): boolean =>
    file.folder.startsWith('catalog') && !!el.attrs.name && CATALOG_WIDGET_IDS.has(el.attrs.name) && (REGION_TAGS.has(el.tag) || !!LIST_TAGS[el.tag]);

/**
 * Generates the widget into its own file context (so its nested regions become that file's
 * sub-components), dedupes by markup, and returns the placeholder token the page refers to it by.
 */
const sharedWidget = (page: FileContext, el: Element, parent: ParentBox): string => {
    const widgetName = pascal(el.attrs.name!);
    const draft = `__SHARED_${widgetName}_DRAFT__`;
    const file: FileContext = {
        componentName: draft, folder: WIDGETS_FOLDER, imports: new Set(), sharedImports: new Set(), scrollTargets: page.scrollTargets, warnings: page.warnings,
        subComponents: [], subComponentNames: [], subComponentProps: {},
    };

    // A slot with no children of its own is what `CatalogWidget.attachWidgetView()` filled at
    // runtime with the widget's own `<id>_xml` layout - render that layout inside the slot.
    const wraps = el.children.length === 0 ? layoutByBase.get(el.attrs.name!) : undefined;

    if (wraps) {
        const ctx = createEmitContext(file);

        file.imports.add('Region');
        file.imports.add('BoxLayout');
        file.imports.add('CatalogWidgetFlags');
        file.subComponents.push([
            `export type ${draft}Props = Omit<${wraps.componentName}Props, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };`,
            '',
            `export const ${draft} = ({ layout, ...widget }: ${draft}Props) => {`,
            `${INDENT}return (`,
            ...wrap('Region', [ ...metaProps(ctx, el), ...dropShadowProp(el), 'layout={{ position: \'absolute\', ...layout }}' ], INDENT + INDENT, [
                `${INDENT}${INDENT}${INDENT}<${wraps.componentName}`,
                `${INDENT}${INDENT}${INDENT}${INDENT}{...widget}`,
                `${INDENT}${INDENT}${INDENT}${INDENT}layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}`,
                `${INDENT}${INDENT}${INDENT}/>`,
            ]),
            `${INDENT});`,
            '};',
            '',
        ].join('\n'));
    } else {
        file.imports.add('CatalogWidgetFlags');
        generateSubComponent(file, el, { ...parent, omitPlacement: true }, 'region', draft, 'CatalogWidgetFlags');
    }

    const code = file.subComponents.join('\n');
    const hash = createHash('md5').update(code.split(draft).join('X')).digest('hex').slice(0, 8);
    let variants = sharedWidgets.get(widgetName);

    if (!variants) sharedWidgets.set(widgetName, variants = new Map());

    let variant = variants.get(hash);

    if (!variant) {
        const token = `__SHARED_${widgetName}_${hash}__`;
        const subComponentProps: SharedWidgetVariant['subComponentProps'] = {};

        for (const [ name, info ] of Object.entries(file.subComponentProps)) {
            subComponentProps[name.split(draft).join(token)] = { props: info.props, nested: Object.fromEntries(Object.entries(info.nested).map(([ prop, component ]) => [ prop, component.split(draft).join(token) ])) };
        }

        variants.set(hash, variant = { token, code: code.split(draft).join(token), uses: 0, imports: file.imports, sharedImports: file.sharedImports, subComponentProps, pages: [], wraps });
    }

    variant.uses++;
    // A widget used inside another widget reports that widget's (final) name, not its draft token.
    variant.pages.push(page.componentName.replace(/^__SHARED_(\w+)_DRAFT__$/, '$1'));

    return variant.token;
};

/**
 * `asRoot` marks the element a sub-component is being generated *for* - it renders inline
 * there instead of being extracted again (which would recurse forever).
 */
/** How big a named region has to be (elements in its subtree) before it's worth its own component. */
const COMPLEX_REGION_SIZE = 8;

const subtreeSize = (el: Element): number => 1 + el.children.reduce((sum, child) => sum + subtreeSize(child), 0);

const emit = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string, asRoot = false): string[] => {
    const { tag } = el;

    // Visibility is a render condition, not a prop: a hidden element (or one gated by a toolbar
    // context / menu group) is wrapped in `{cond && (...)}` so it isn't mounted at all. Named
    // hidden elements (and every named bubble - see FriendRequestsTab.as showing its `bubble` on
    // select) get a `visible<Name>` prop to flip that condition.
    const conditionalDone = ctx.conditionalDone;

    ctx.conditionalDone = false;

    if (!conditionalDone && !SKIPPED_TAGS.has(tag)) {
        const hidden = el.attrs.visible === 'false';
        const override = el.attrs.name && (hidden || tag === 'bubble') ? overrideProp(ctx, el, 'visible', 'boolean') : undefined;
        const condition = visibilityExpr(ctx, el, { defaultHidden: hidden, override });

        if (condition === 'false') return [ `${indent}{/* \`${el.attrs.name || tag}\` is hidden and has no name to show it by */}` ];

        if (condition) {
            ctx.conditionalDone = true;

            const lines = emit(ctx, el, parent, indent + INDENT, asRoot);

            // A sub-component's root is already the `return (...)` expression - no braces there.
            return asRoot ? [ `${indent}${condition} && (`, ...lines, `${indent})` ] : [ `${indent}{${condition} && (`, ...lines, `${indent})}` ];
        }
    }

    // Every named structural node (a `container`/`region`/list the Flash code addressed by
    // name) becomes its own component; the parent renders it and exposes one prop, named after
    // it, that forwards that component's props (handlers, caption/src/visible overrides, layout).
    if (!asRoot && isSharedWidget(ctx.file, el)) {
        const token = sharedWidget(ctx.file, el, parent);
        const prop = uniqueProp(ctx, camel(el.attrs.name!));

        ctx.props.set(prop, `${token}Props`);
        ctx.file.sharedImports.add(token);

        return [ `${indent}<${token}`, ...widgetFlagProps(el).map(flag => `${indent}${INDENT}${flag}`), `${indent}${INDENT}layout={${boxLayout(el, parent)}}`, `${indent}${INDENT}{...${prop}}`, `${indent}/>` ];
    }

    // Only a region big enough to be worth reading on its own becomes a component; a small
    // named container stays inline and its props (handlers, overrides) land on the parent.
    if (!asRoot && el.attrs.name && (REGION_TAGS.has(tag) || LIST_TAGS[tag]) && subtreeSize(el) >= COMPLEX_REGION_SIZE) {
        const component = generateSubComponent(ctx.file, el, parent, 'region');
        const prop = uniqueProp(ctx, camel(el.attrs.name));

        ctx.props.set(prop, `${component}Props`);

        return [ `${indent}<${component} {...${prop}} />` ];
    }

    if (SKIPPED_TAGS.has(tag)) return [ `${indent}{/* <${tag}> for ${el.vars.scrollable ?? '?'} - rendered by that list's ScrollArea */}` ];

    if (CHROME_TAGS[tag]) {
        const { component, props: chromeProps, meta } = CHROME_TAGS[tag];

        ctx.imports.add(component);

        // Not every chrome component takes the full ThemeProps surface (the horizontal slider
        // pieces and the buttons are plain PointerHandlerProps + variant/layout) - `meta` marks
        // the ones that do, so name/tags/params are only passed where they type-check.
        const props = [ ...variantProp(el), ...(meta ? [ ...metaProps(ctx, el), ...tintProp(ctx, el) ] : []), ...(chromeProps ?? []) ];

        if (tag === 'header' && el.attrs.caption) props.push(`caption=${jsxStr(decode(el.attrs.caption))}`);

        props.push(`layout={${boxLayout(el, parent)}}`);

        return openTag(component, props, indent, true);
    }

    if (tag === 'tab_selector') {
        ctx.imports.add('Region');

        return wrap('Region', [ ...metaProps(ctx, el), `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, emitChildren(ctx, el, selfBox(el), indent + INDENT));
    }
    if (TEXT_TAGS.has(tag)) return emitText(ctx, el, parent, indent);
    if (tag === 'static_bitmap' || tag === 'bitmap') return emitBitmap(ctx, el, parent, indent);
    if (LIST_TAGS[tag]) return emitList(ctx, el, parent, indent);
    if (tag === 'frame') return emitFrame(ctx, el, parent, indent);
    if (tag === 'input' || tag === 'password') return emitInput(ctx, el, parent, indent);

    const childIndent = indent + INDENT;
    const caption = captionExpr(ctx, el.attrs.caption);
    const captionOnly = (ci: string) => (caption ? [ `${ci}${jsxText(caption)}` ] : []);
    const childrenOnly = (ci: string) => emitChildren(ctx, el, selfBox(el), ci);
    const captionAndChildren = (ci: string) => [ ...captionOnly(ci), ...childrenOnly(ci) ];
    // A button whose children are all texts: they're its caption, and the button already
    // centres its content, so they go in bare instead of each in a positioned Region.
    const allTexts = el.children.length > 0 && el.children.every(child => TEXT_TAGS.has(child.tag) && child.attrs.visible !== 'false');
    const buttonChildren = (ci: string) => (allTexts ? el.children.flatMap(child => emitInlineText(ctx, child, ci)) : childrenOnly(ci));
    const captionAndButtonChildren = (ci: string) => [ ...captionOnly(ci), ...buttonChildren(ci) ];
    const none = () => [] as string[];

    switch (tag) {
        case 'container':
        case 'region':
        case 'background':
        case 'boxsizer':
        case 'display_object_wrapper':
        case 'selector':
        case 'gradient': {
            if (el.children.length === 1 && TEXT_TAGS.has(el.children[0].tag) && el.children[0].tag !== 'link' && fillsHost(el.children[0], el) && el.children[0].attrs.visible !== 'false') {
                return emitText(ctx, el.children[0], parent, indent, el);
            }

            ctx.imports.add('Region');

            const props = [ ...metaProps(ctx, el), ...dropShadowProp(el), ...blendProp(el) ];
            const color = hexColor(el.attrs.color);
            if (color && (el.attrs.background === 'true' || tag === 'background' || tag === 'gradient')) props.push(`backgroundColor={${recolorExpr(ctx, el, color)}}`);

            // A named `region` with the low `params` bit set is a click target in the Flash client
            // (the me-menu tiles, `click_area_discard`, `region_profile`, ...) - see e.g.
            // MeMenuMainView.as/FriendRequestsTab.as listening for WME_CLICK on them by name.
            if ((tag === 'region' || tag === 'container') && el.attrs.name && (el.params & PARAM.INPUT)) {
                props.push(`onPointerTap={${handlerProp(ctx, el, 'region')}}`);
                props.push('cursor="pointer"');
            }

            return wrap('Region', [ ...props, `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, emitChildren(ctx, el, selfBox(el), childIndent));
        }
        case 'border': {
            const blend = el.attrs.blend ? [ `blend={${num(el.attrs.blend)}}` ] : [];

            return emitThemed(ctx, 'Border', el, parent, indent, blend, childrenOnly);
        }
        case 'button':
        case 'button_thick':
        case 'button_group_left':
        case 'button_group_center':
        case 'button_group_right': {
            const component = { button: 'Button', button_thick: 'ButtonThick', button_group_left: 'ButtonGroupLeft', button_group_center: 'ButtonGroupCenter', button_group_right: 'ButtonGroupRight' }[tag]!;
            const { textStyle } = resolveTextStyle(el.vars.text_style);
            const extra = [ `onPointerTap={${handlerProp(ctx, el, tag)}}`, ...(textStyle ? [ `textStyle="${textStyle}"` ] : []) ];

            return emitThemed(ctx, component, el, parent, indent, extra, captionAndButtonChildren);
        }
        // A container button's face is its children - the client never rendered its own
        // `caption` (the skin has no label), so only the children are emitted.
        case 'container_button':
        case 'iconbutton':
            return emitThemed(ctx, 'ContainerButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], buttonChildren);
        case 'closebutton':
            return emitThemed(ctx, 'CloseButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'close')}}` ], none);
        case 'checkbox':
        case 'radiobutton':
            return emitThemed(ctx, tag === 'checkbox' ? 'CheckBox' : 'RadioButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], captionOnly);
        case 'tab_button':
            return emitThemed(ctx, 'TabButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'tab')}}` ], captionAndButtonChildren);
        // Same as container_button: the tab's face is its children.
        case 'tab_container_button':
            return emitThemed(ctx, 'TabButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'tab')}}` ], buttonChildren);
        case 'tab_context':
            return emitThemed(ctx, 'TabContext', el, parent, indent, [], childrenOnly);
        case 'tab_content':
            return emitThemed(ctx, 'TabContent', el, parent, indent, [], childrenOnly);
        case 'dropmenu':
            return emitThemed(ctx, 'Dropmenu', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'dropmenu')}}` ], captionOnly);
        case 'droplist':
            return emitThemed(ctx, 'Droplist', el, parent, indent, [], captionOnly);
        case 'bubble': {
            const direction = el.vars.direction?.split('_')[0];
            const pointer = direction && [ 'up', 'down', 'left', 'right' ].includes(direction) ? [ `pointer="${direction}"` ] : [];

            return emitThemed(ctx, 'Bubble', el, parent, indent, pointer, childrenOnly);
        }
        case 'icon':
            return emitThemed(ctx, 'Icon', el, parent, indent, [], none);
        case 'widget': {
            ctx.imports.add('WidgetSlot');

            const { widget_type: widgetType, ...rest } = el.vars;
            const props = [ `widgetType=${jsxStr(widgetType ?? '')}`, ...metaProps(ctx, el) ];
            const options = Object.entries(rest);

            if (options.length) props.push(`options={{ ${options.map(([ key, value ]) => `${quote(key)}: ${quote(value)}`).join(', ')} }}`);

            props.push(`layout={${boxLayout(el, parent, centerExtra(el))}}`);

            return wrap('WidgetSlot', props, indent, emitChildren(ctx, el, selfBox(el), childIndent));
        }
        case 'shape': {
            ctx.imports.add('Shape');

            const props = [ ...metaProps(ctx, el) ];

            if (el.vars.shape) props.push(`shape="${el.vars.shape}"`);

            const color = hexColor(el.attrs.color);
            const stroke = hexColor(el.vars.stroke_color);

            if (color) props.push(`color={${recolorExpr(ctx, el, color)}}`);
            if (stroke) props.push(`strokeColor="${stroke}"`);
            if (el.vars.stroke_thickness) props.push(`strokeThickness={${num(el.vars.stroke_thickness)}}`);
            if (el.vars.radius) props.push(`radius={${num(el.vars.radius)}}`);

            props.push(`layout={${boxLayout(el, parent)}}`);

            return openTag('Shape', props, indent, true);
        }
        default: {
            ctx.warnings.push(`unmapped tag <${tag}>`);
            ctx.imports.add('Region');

            return [ `${indent}{/* unmapped <${tag}> */}`, ...wrap('Region', [ ...metaProps(ctx, el), `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, emitChildren(ctx, el, selfBox(el), childIndent)) ];
        }
    }
};

// ---------------------------------------------------------------------------------------------
// File assembly
// ---------------------------------------------------------------------------------------------

const collectScrollTargets = (el: Element, targets: Map<string, 'vertical' | 'horizontal'>) => {
    if ((el.tag === 'scrollbar_vertical' || el.tag === 'scrollbar_horizontal') && el.vars.scrollable) {
        targets.set(el.vars.scrollable, el.tag === 'scrollbar_vertical' ? 'vertical' : 'horizontal');
    }

    for (const child of el.children) collectScrollTargets(child, targets);
};

const THEME_IMPORTS = new Set([
    'Border', 'BoxLayout', 'Bubble', 'BubblePointer', 'Button', 'ButtonGroupCenter', 'ButtonGroupLeft', 'ButtonGroupRight', 'ButtonThick', 'CheckBox', 'CloseButton',
    'ContainerButton', 'Droplist', 'Dropmenu', 'Frame', 'FramePointerDown', 'Header', 'Icon', 'RadioButton', 'Region', 'Scaler', 'ScrollArea',
    'ScrollbarSliderBarHorizontal', 'ScrollbarSliderBarVertical', 'ScrollbarSliderButtonDown', 'ScrollbarSliderButtonLeft', 'ScrollbarSliderButtonRight',
    'ScrollbarSliderButtonUp', 'ScrollbarSliderTrackHorizontal', 'ScrollbarSliderTrackVertical', 'Shape', 'TabButton', 'TabContent', 'TabContext',
    'TextInput', 'ThemeImage', 'ThemeText', 'WidgetSlot',
]);

interface AssembledComponent {
    lines: string[];
    props: string[];
    /** Props that forward a nested sub-component's props: prop name -> sub-component name. */
    nested: Record<string, string>;
}

/** The `export interface XProps` + `export const X = (...) => {...}` pair for one emitted body. */
const assembleComponent = (ctx: EmitContext, componentName: string, doc: string, body: string[], extendsType?: string): AssembledComponent => {
    // A caption may be decoded for an element that ends up not rendering it (a Border's own
    // caption, say) - only import `t` when the emitted body actually calls it.
    ctx.usesTranslation = body.some(line => line.includes('t('));

    if (ctx.usesTranslation) ctx.imports.add('useTranslation');
    if (ctx.states.length) ctx.imports.add('useState');

    const propsName = `${componentName}Props`;
    const propEntries = [ ...ctx.props.entries() ].sort(([ a ], [ b ]) => a.localeCompare(b));
    const lines: string[] = [ doc ];

    if (propEntries.length || extendsType) {
        lines.push(`export interface ${propsName}${extendsType ? ` extends ${extendsType}` : ''} {`);
        for (const [ name, type ] of propEntries) lines.push(`${INDENT}${name}?: ${type};`);
        lines.push('}', '');
    }

    const destructured = propEntries.map(([ name ]) => name).join(', ');

    lines.push(`export const ${componentName} = (${propEntries.length ? `{ ${destructured} }: ${propsName}` : ''}) => {`);

    if (ctx.usesTranslation) lines.push(`${INDENT}const t = useTranslation();`);
    for (const state of ctx.states) lines.push(`${INDENT}const [ ${state.name}, set${pascal(state.name)} ] = useState('');`);
    if (ctx.usesTranslation || ctx.states.length) lines.push('');

    lines.push(`${INDENT}return (`, ...body, `${INDENT});`, '};', '');

    const nested: Record<string, string> = {};

    for (const [ name, type ] of propEntries) if (type.endsWith('Props') && type !== 'BoxLayout') nested[name] = type.slice(0, -5);

    return { lines, props: propEntries.map(([ name ]) => name), nested };
};

const generateSubComponent = (file: FileContext, el: Element, parent: ParentBox, kind: 'item' | 'region' = 'item', rootName?: string, extendsType?: string): string => {
    const base = rootName ?? `${file.componentName}${pascal(el.attrs.name ?? el.tag)}${kind === 'item' ? 'Item' : ''}`;
    let name = base;

    for (let i = 2; file.subComponentNames.includes(name); i++) name = `${base}${i}`;

    file.subComponentNames.push(name);

    const ctx = createEmitContext(file);

    ctx.props.set('layout', 'BoxLayout');
    ctx.imports.add('BoxLayout');

    const body = emit(ctx, el, { ...parent, spreadLayout: true }, INDENT + INDENT, true);
    const doc = kind === 'item'
        ? `/** Row template \`${el.attrs.name ?? el.tag}\` of ${file.componentName} - pass real rows through its \`items…\` slot. */`
        : `/** Named region \`${el.attrs.name}\` of ${file.componentName} - configured through the parent's \`${camel(el.attrs.name ?? '')}\` prop. */`;

    const assembled = assembleComponent(ctx, name, doc, body, extendsType);

    file.subComponents.push(assembled.lines.join('\n'));
    file.subComponentProps[name] = { props: assembled.props, nested: assembled.nested };

    return name;
};

interface GeneratedComponent {
    code: string;
    props: string[];
    nested: Record<string, string>;
    subComponentProps: Record<string, { props: string[]; nested: Record<string, string> }>;
    rootIsFrame: boolean;
    subComponents: string[];
    warnings: string[];
}

/** The import block every generated file starts with, from what its components ended up using. */
const assembleImports = (imports: Set<string>, sharedImports: Set<string>): string[] => {
    const lines: string[] = [];
    const reactImports = [ 'ReactNode', 'useState' ].filter(name => imports.has(name));

    if (reactImports.length) lines.push(`import { ${reactImports.join(', ')} } from 'react';`, '');
    if (imports.has('useTranslation')) lines.push('import { useTranslation } from \'#base/context\';');

    const themeImports = [ ...imports ].filter(name => THEME_IMPORTS.has(name)).sort();

    if (themeImports.length) lines.push(`import { ${themeImports.join(', ')} } from '#base/theme';`);
    const assetImports = [ 'CatalogWidgetFlags', 'layoutImage' ].filter(name => imports.has(name));

    if (assetImports.length) lines.push(`import { ${assetImports.join(', ')} } from '#base/views/layouts/layoutAssets';`);
    for (const token of [ ...sharedImports ].sort()) lines.push(`import { ${token}, ${token}Props } from '#base/views/layouts/${WIDGETS_FOLDER}/${token}';`);

    return lines;
};

const generateComponent = (componentName: string, sourceFile: string, root: XmlNode, folder: string): GeneratedComponent => {
    const windows = root.children.filter(child => child.tag === 'window');
    const elements = windows.flatMap(window => window.children.flatMap((child) => {
        if (child.tag === 'children') return child.children.map(toElement);
        if (child.tag === 'filters' || child.tag === 'variables' || child.tag === 'scale') return [];

        return [ toElement(child) ];
    }));
    const file: FileContext = { componentName, folder, imports: new Set(), sharedImports: new Set(), scrollTargets: new Map(), warnings: [], subComponents: [], subComponentNames: [], subComponentProps: {} };
    const ctx = createEmitContext(file);

    for (const el of elements) collectScrollTargets(el, ctx.scrollTargets);

    const width = num(root.attrs.width);
    const height = num(root.attrs.height);
    const bodyIndent = INDENT + INDENT;
    const rootIsFrame = elements.length === 1 && elements[0].tag === 'frame';
    let body: string[];

    if (rootIsFrame) {
        body = emitFrame(ctx, elements[0], undefined, bodyIndent);
    } else {
        ctx.imports.add('Region');
        ctx.imports.add('BoxLayout');
        ctx.props.set('layout', 'BoxLayout');

        const rootShadow = parseDropShadow(root.children.find(child => child.tag === 'filters'));
        const rootProps = rootShadow ? [ `dropShadow={${layoutLiteral({ ...rootShadow, color: rootShadow.color ? quote(rootShadow.color) : undefined })}}` ] : [];

        body = wrap(
            'Region',
            [ ...rootProps, `layout={{ position: 'relative', width: ${width}, height: ${height}, ...layout }}` ],
            bodyIndent,
            elements.flatMap(el => emit(ctx, el, { width, height, flow: false }, bodyIndent + INDENT)),
        );
    }

    const doc = `/** Generated from \`${sourceFile}\` (layout "${root.attrs.name ?? ''}", ${width}x${height}) by scripts/generate-layout-views.ts - do not edit by hand. */`;
    const main = assembleComponent(ctx, componentName, doc, body);
    const lines = assembleImports(file.imports, file.sharedImports);

    lines.push('', ...main.lines, ...file.subComponents);

    return { code: lines.join('\n'), props: main.props, nested: main.nested, subComponentProps: file.subComponentProps, rootIsFrame, subComponents: file.subComponentNames, warnings: file.warnings };
};

// ---------------------------------------------------------------------------------------------
// AS3 cross-reference - which decompiled client classes build each layout (`buildFromXML` of a
// `<name>_xml` asset, or `getAssetByName("<name>")`), for the registry / layout browser.
// ---------------------------------------------------------------------------------------------

const AS3_DIR = join(__dirname, 'scripts');

interface As3Usage {
    /** Root library classes (`HabboFriendBarCom`, `HabboRoomUICom`, ...) that embed the layout's XML asset. */
    libraries: Set<string>;
    /** `com/...` classes that build the layout (`buildFromXML` of its asset, or a direct `getAssetByName`). */
    classes: Set<string>;
}

const collectAs3Usage = (layoutNames: Set<string>): Map<string, As3Usage> => {
    const usage = new Map<string, As3Usage>();

    if (!existsSync(AS3_DIR)) return usage;

    // `friend_requests_tab_xml$<hash>` - the embedded-asset class name every library/embedding
    // class references; `<name>_xml` / `getAssetByName("<name>")` - runtime lookups by asset name.
    const pattern = /([A-Za-z0-9_]+)_xml(?:\$|\b)|getAssetByName\("([A-Za-z0-9_]+)"\)/g;
    const record = (name: string): As3Usage => {
        let entry = usage.get(name);

        if (!entry) usage.set(name, entry = { libraries: new Set(), classes: new Set() });

        return entry;
    };
    const walk = (dir: string) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const path = join(dir, entry.name);

            if (entry.isDirectory()) {
                if (entry.name !== '_assets') walk(path);

                continue;
            }

            if (!entry.name.endsWith('.as')) continue;

            const relative = path.slice(AS3_DIR.length + 1).replace(/\\/g, '/');
            const library = /^(?:Habbo)?(\w+?)(?:Com|Lib)\.as$/.exec(relative)?.[1].toLowerCase();

            if (!library && !relative.startsWith('com/')) continue;

            for (const match of readFileSync(path, 'utf8').matchAll(pattern)) {
                const name = match[1] ?? match[2];

                if (!layoutNames.has(name)) continue;

                if (library) record(name).libraries.add(library);
                else record(name).classes.add(relative.slice(0, -3));
            }
        }
    };

    walk(AS3_DIR);

    return usage;
};

/**
 * Output folder for a layout, mirroring how the decompiled client is organised: the library
 * that embeds it (`HabboFriendBarCom` -> `friendbar/`), then the tail of the package of the
 * class that drives it (`com/sulake/habbo/friendbar/view/tabs/FriendRequestsTab` ->
 * `friendbar/view/tabs/`). Layouts nothing embeds or builds directly land in `unassigned/`.
 */
const layoutFolder = (usage: As3Usage | undefined): string => {
    const cls = usage?.classes.size ? [ ...usage.classes ].sort()[0] : undefined;
    const pkg = cls ? cls.replace(/^com\/sulake\/(?:habbo|core)\//, '').split('/').slice(0, -1) : [];
    const library = usage?.libraries.size ? [ ...usage.libraries ].sort()[0] : pkg[0];

    if (!library) return 'unassigned';

    const tail = pkg.filter(segment => segment !== library).slice(-2);

    return [ library, ...tail ].join('/');
};

// ---------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(IMAGE_OUT_DIR, { recursive: true });

for (const name of RUNTIME_IMAGES) resolveImage(name);

interface Source { id: number; base: string; file: string; root: XmlNode }

const sources: Source[] = [];

for (const file of readdirSync(XML_DIR)) {
    const match = /^(\d+)_(.+)_xml\$/.exec(file);

    if (!match) continue;

    const root = parseXml(readFileSync(join(XML_DIR, file), 'utf8'));

    if (root?.tag !== 'layout') continue;

    sources.push({ id: num(match[1]), base: match[2], file, root });
}

sources.sort((a, b) => a.base.localeCompare(b.base) || a.id - b.id);

// Keyed by the lower-cased component name, not the raw base: `memenu_settings_menu` and
// `me_menu_settings_menu` are distinct layouts whose PascalCase names differ only in case,
// which a case-insensitive filesystem (Windows/macOS) would silently collapse into one file.
const baseCounts = new Map<string, number>();
const nameKey = (source: Source) => pascal(source.base).toLowerCase();

for (const source of sources) baseCounts.set(nameKey(source), (baseCounts.get(nameKey(source)) ?? 0) + 1);

const exports: string[] = [];
const warningCounts = new Map<string, number>();
/** Layout files are written only after every page has been generated, once the shared widgets can be named. */
const pendingFiles: { path: string; code: string }[] = [];
const as3Usage = collectAs3Usage(new Set(sources.map(source => source.base)));
const registry: string[] = [];

const planned = sources.map((source) => {
    const suffix = (baseCounts.get(nameKey(source)) ?? 0) > 1 ? `_${source.id}` : '';
    const componentName = `${pascal(source.base)}${suffix ? pascal(suffix) : ''}Layout`;
    const usage = as3Usage.get(source.base);

    return { source, componentName, usage, folder: layoutFolder(usage) };
});

// Sub-group the flat library folders (`catalog`, `windowmanager`, `roomui`, ... - anything with
// no driving-class package to split it): the hand-written window/skin templates go to
// `templates/`, the catalog's `layout_*` page layouts to `pages/`, the widget layouts next to
// the shared widgets, and whatever else shares a leading name token in 3+ layouts gets a folder
// for it (`club_*` -> `club/`, `memenu_*` -> `memenu/`, `wired_*` -> `wired/`).
const hasNamedParams = (node: XmlNode): boolean => node.tag === 'params' || node.children.some(hasNamedParams);
const leadingToken = (base: string): string => {
    const cleaned = base.replace(/^_+/, '');
    const snake = /^([a-z0-9]+)_/i.exec(cleaned);

    if (snake) return snake[1].toLowerCase();

    const camel = /^([a-z]+)[A-Z]/.exec(cleaned);

    return (camel ? camel[1] : cleaned).toLowerCase();
};
const flatFolders = new Map<string, typeof planned>();

for (const entry of planned) if (!entry.folder.includes('/') && entry.folder !== 'unassigned') (flatFolders.get(entry.folder) ?? flatFolders.set(entry.folder, []).get(entry.folder)!).push(entry);

for (const [ folder, entries ] of flatFolders) {
    if (entries.length < 20) continue;

    const tokenCounts = new Map<string, number>();

    for (const entry of entries) tokenCounts.set(leadingToken(entry.source.base), (tokenCounts.get(leadingToken(entry.source.base)) ?? 0) + 1);

    // Leading tokens too generic to name a folder after.
    const stopTokens = new Set([ 'habbo', 'new', 'main', 'use', 'catalog', 'layout', 'illumina', 'default', 'simple' ]);
    // Package-tail folders that already exist under this library (`catalog/targetedoffers`,
    // `toolbar/memenu`) absorb the token that abbreviates them (`targeted_*`, `me_menu_*`).
    const existing = [ ...new Set(planned.map(entry => entry.folder).filter(other => other.startsWith(`${folder}/`)).map(other => other.split('/')[1])) ];

    for (const entry of entries) {
        const base = entry.source.base;
        const token = leadingToken(base);
        const merged = existing.find(name => name.startsWith(token) && name !== token);

        if (folder === 'catalog' && CATALOG_WIDGET_IDS.has(base)) entry.folder = WIDGETS_FOLDER;
        else if (folder === 'catalog' && /^layout_/i.test(base)) entry.folder = 'catalog/pages';
        else if (hasNamedParams(entry.source.root)) entry.folder = `${folder}/templates`;
        else if (merged && (tokenCounts.get(token) ?? 0) >= 2) entry.folder = `${folder}/${merged}`;
        else if (!stopTokens.has(token) && (tokenCounts.get(token) ?? 0) >= 3) entry.folder = `${folder}/${token}`;
    }
}

for (const { source, componentName, folder } of planned) if (!layoutByBase.has(source.base)) layoutByBase.set(source.base, { componentName, folder });

/** Each generated layout's prop tree, for the widget wrappers that forward another layout's props. */
const generatedInfo = new Map<string, Pick<GeneratedComponent, 'props' | 'nested' | 'subComponentProps'>>();

for (const { source, componentName, usage, folder } of planned) {
    const { code, props, nested, subComponentProps, rootIsFrame, subComponents, warnings } = generateComponent(componentName, source.file.replace(/\$.*$/, ''), source.root, folder);

    generatedInfo.set(componentName, { props, nested, subComponentProps });

    pendingFiles.push({ path: join(OUT_DIR, folder, `${componentName}.tsx`), code });
    exports.push(`${folder}/${componentName}`);

    const as3 = [ ...(usage?.classes ?? []) ].sort();
    const libraries = [ ...(usage?.libraries ?? []) ].sort();
    const size = `${num(source.root.attrs.width)}x${num(source.root.attrs.height)}`;

    registry.push([
        `${INDENT}{`,
        `${INDENT}${INDENT}name: ${quote(source.base)}, id: ${source.id}, component: ${quote(componentName)}, size: ${quote(size)}, rootIsFrame: ${rootIsFrame},`,
        `${INDENT}${INDENT}props: [ ${props.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}nested: { ${Object.entries(nested).map(([ prop, component ]) => `${prop}: ${quote(component)}`).join(', ')} },`,
        `${INDENT}${INDENT}subComponents: [ ${subComponents.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}subComponentProps: { ${Object.entries(subComponentProps).map(([ name, info ]) => `${name}: { props: [ ${info.props.map(quote).join(', ')} ], nested: { ${Object.entries(info.nested).map(([ prop, component ]) => `${prop}: ${quote(component)}`).join(', ')} } }`).join(', ')} },`,
        `${INDENT}${INDENT}folder: ${quote(folder)}, libraries: [ ${libraries.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}as3: [ ${as3.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}load: () => import(${quote(`./${folder}/${componentName}`)}).then(module => module.${componentName}),`,
        `${INDENT}},`,
    ].join('\n'));

    for (const warning of warnings) warningCounts.set(warning, (warningCounts.get(warning) ?? 0) + 1);
}

// Name the shared widget variants - the most-used markup of a widget id gets the plain name
// (`PurchaseWidget`), the rest are numbered - then write their files and resolve the tokens.
const tokenNames = new Map<string, string>();
/** LAYOUT_WIDGET_PROPS entries keyed by component name - several wrapper variants forward the same layout, so entries repeat. */
const widgetProps = new Map<string, string>();
const widgetExports: string[] = [];

for (const [ widgetName, variants ] of [ ...sharedWidgets.entries() ].sort(([ a ], [ b ]) => a.localeCompare(b))) {
    const ordered = [ ...variants.values() ].sort((a, b) => b.uses - a.uses || a.token.localeCompare(b.token));

    ordered.forEach((variant, index) => tokenNames.set(variant.token, index === 0 ? widgetName : `${widgetName}${index + 1}`));
}

const resolveTokens = (text: string): string => text.replace(/__SHARED_\w+?_[0-9a-f]{8}__/g, token => tokenNames.get(token) ?? token);

for (const variants of sharedWidgets.values()) {
    for (const variant of variants.values()) {
        const name = tokenNames.get(variant.token)!;
        const pages = [ ...new Set(variant.pages) ].sort();
        const doc = [
            '/**',
            ` * Catalog widget \`${camel(name.replace(/\d+$/, ''))}\` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page`,
            ` * layout reserves a container by that name and the client attaches the widget to it. Shared by ${pages.length} page${pages.length === 1 ? '' : 's'}`,
            ` * (${pages.slice(0, 6).join(', ')}${pages.length > 6 ? ', …' : ''}); each passes its own placement through \`layout\`.`,
            ' */',
        ];
        const imports = assembleImports(variant.imports, variant.sharedImports);

        if (variant.wraps) imports.push(`import { ${variant.wraps.componentName}, ${variant.wraps.componentName}Props } from '#base/views/layouts/${variant.wraps.folder}/${variant.wraps.componentName}';`);

        const lines = [ ...imports, '', ...doc, variant.code ];

        pendingFiles.push({ path: join(OUT_DIR, WIDGETS_FOLDER, `${name}.tsx`), code: lines.join('\n') });
        widgetExports.push(`${WIDGETS_FOLDER}/${name}`);

        const propsEntry = (subName: string, info: { props: string[]; nested: Record<string, string> }) =>
            widgetProps.set(resolveTokens(subName), `${INDENT}${resolveTokens(subName)}: { props: [ ${info.props.map(quote).join(', ')} ], nested: { ${Object.entries(info.nested).map(([ prop, component ]) => `${prop}: ${quote(resolveTokens(component))}`).join(', ')} } },`);

        if (variant.wraps) {
            // The wrapper forwards the wrapped layout's props - expose that layout's whole prop tree under the widget's name.
            const wrapped = generatedInfo.get(variant.wraps.componentName);

            if (wrapped) {
                propsEntry(name, { props: wrapped.props, nested: wrapped.nested });
                for (const [ subName, info ] of Object.entries(wrapped.subComponentProps)) propsEntry(subName, info);
            }
        }

        for (const [ subName, info ] of Object.entries(variant.subComponentProps)) propsEntry(subName, info);
    }
}

for (const file of pendingFiles) {
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, resolveTokens(file.code));
}

exports.push(...widgetExports);

writeFileSync(join(OUT_DIR, 'layoutAssets.ts'), [
    '/** Bitmaps referenced by the generated layouts - copied out of `scripts/images` by scripts/generate-layout-views.ts. */',
    'export const layoutImage = (file: string): string => `./assets/images/layouts/${file}`;',
    '',
    '/**',
    ' * Configuration a catalog page put on a widget slot as tags, read by the widget classes',
    ' * (`ItemGridCatalogWidget` -> `FIXED`, `ProductViewCatalogWidget` -> `2X`/`NO_ROOM_CANVAS`,',
    ' * `PurchaseCatalogWidget` -> `ROOM_INITIATE_PURCHASE`/`NO_GIFT_OPTION`, `LocalizationCatalogWidget`',
    ' * -> `TOP_STORY`, `SourceTypeSelectorPreset` -> `NEW`). Carried as props for the widget logic to act on.',
    ' */',
    'export interface CatalogWidgetFlags {',
    '    fixed?: boolean;',
    '    doubleSize?: boolean;',
    '    noRoomCanvas?: boolean;',
    '    roomInitiatePurchase?: boolean;',
    '    noGiftOption?: boolean;',
    '    topStory?: boolean;',
    '    isNew?: boolean;',
    '}',
    '',
].join('\n'));

writeFileSync(join(OUT_DIR, 'layoutRegistry.ts'), [
    'import { ComponentType } from \'react\';',
    '',
    '/** One entry per generated layout - what it is, which decompiled AS3 classes drove it, and a lazy loader for the component. */',
    'export interface LayoutRegistryEntry {',
    `${INDENT}/** The Flash asset name (\`<name>_xml\`). */`,
    `${INDENT}name: string;`,
    `${INDENT}id: number;`,
    `${INDENT}component: string;`,
    `${INDENT}size: string;`,
    `${INDENT}/** Whether the component renders its own \`Frame\` (window chrome) at the root. */`,
    `${INDENT}rootIsFrame: boolean;`,
    `${INDENT}/** The component's prop names - \`on*\` handlers, \`caption*\`/\`src*\` overrides, \`items*\` row slots, \`layout\`. */`,
    `${INDENT}props: string[];`,
    `${INDENT}/** Props of the main component that forward a sub-component's props: prop name -> sub-component name. */`,
    `${INDENT}nested: Record<string, string>;`,
    `${INDENT}subComponents: string[];`,
    `${INDENT}/** Every sub-component's own props and nested sub-components, so a caller can walk the whole prop tree. */`,
    `${INDENT}subComponentProps: Record<string, { props: string[]; nested: Record<string, string> }>;`,
    `${INDENT}/** Output folder under views/layouts - embedding client library + driving class package (see \`layoutFolder\` in the generator). */`,
    `${INDENT}folder: string;`,
    `${INDENT}/** Client libraries (\`HabboFriendBarCom\` -> \`friendbar\`) whose SWF embedded this layout's XML. */`,
    `${INDENT}libraries: string[];`,
    `${INDENT}/** Decompiled client classes (under scripts/scripts) that build this layout, e.g. \`com/sulake/habbo/friendbar/view/tabs/FriendRequestsTab\`. */`,
    `${INDENT}as3: string[];`,
    `${INDENT}// eslint-disable-next-line @typescript-eslint/no-explicit-any -- every layout has its own props interface; the browser only ever passes generic handlers.`,
    `${INDENT}load: () => Promise<ComponentType<any>>;`,
    '}',
    '',
    'export const LAYOUT_REGISTRY: LayoutRegistryEntry[] = [',
    ...registry.map(resolveTokens),
    '];',
    '',
    '/** Props of the shared catalog widgets (views/layouts/catalog/widgets) and their nested sub-components, keyed by component name. */',
    'export const LAYOUT_WIDGET_PROPS: Record<string, { props: string[]; nested: Record<string, string> }> = {',
    ...[ ...widgetProps.keys() ].sort().map(key => widgetProps.get(key)!),
    '};',
    '',
].join('\n'));

// Deliberately NO barrel index.ts: an `export *` over ~800 layout files puts every one of
// them into the static module graph of whoever imports it - none are side-effect-free as far
// as the bundler can prove, so tree-shaking keeps them all, and one convenience import once
// turned the entire lazily-registered catalogue into ~800 eagerly-fetched entry chunks
// (794 modulepreload links in the built index.html). Import a layout by its own path;
// everything else goes through `layoutRegistry`'s per-entry dynamic `load()`.

console.log(`Generated ${exports.length} layout components into ${OUT_DIR}`);
console.log(`Copied ${copiedImages.size} images into ${IMAGE_OUT_DIR} (${unresolvedImages.size} referenced assets not found in scripts/images)`);

if (!existsSync(join(IMAGE_OUT_DIR, 'README.md'))) {
    writeFileSync(join(IMAGE_OUT_DIR, 'README.md'), '# Generated - populated by `yarn workspace @nitrodevco/nitro-react generate-layout-views`.\n');
}

for (const [ warning, count ] of [ ...warningCounts.entries() ].sort((a, b) => b[1] - a[1])) console.log(`  ${count}x ${warning}`);
