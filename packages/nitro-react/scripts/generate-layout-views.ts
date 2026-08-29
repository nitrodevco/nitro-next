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
    imports: Set<string>;
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
    const count = ctx.propCounts.get(base) ?? 0;

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

    if (parent.flow) {
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
const metaProps = (ctx: EmitContext, el: Element, includeVisible = true): string[] => {
    const props: string[] = [];

    if (el.attrs.name) props.push(`name=${jsxStr(el.attrs.name)}`);

    if (el.attrs.tags) {
        const tags = decode(el.attrs.tags).split(',').map(tag => tag.trim()).filter(Boolean);

        if (tags.length) props.push(`tags={[ ${tags.map(quote).join(', ')} ]}`);
    }

    const tooltip = captionExpr(ctx, el.vars.tool_tip_caption);

    if (tooltip) props.push(`tooltip={${tooltip}}`);
    if (el.params) props.push(`params={${el.params}}`);
    if (el.attrs.dynamic_style) props.push(`dynamicStyle=${jsxStr(el.attrs.dynamic_style)}`);
    if (includeVisible && el.attrs.visible === 'false') props.push('visible={false}');

    return props;
};

const dropShadowProp = (el: Element): string[] => (el.dropShadow ? [ `dropShadow={${layoutLiteral({ ...el.dropShadow, color: el.dropShadow.color ? quote(el.dropShadow.color) : undefined })}}` ] : []);

const variantProp = (el: Element): string[] => (el.attrs.style !== undefined ? [ `variant="${el.attrs.style}"` ] : []);

const tintProp = (el: Element): string[] => {
    const color = hexColor(el.attrs.color);

    return color ? [ `tintColor="${color}"` ] : [];
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

const emitText = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const caption = captionExpr(ctx, el.attrs.caption);
    const { textStyle, fill: styleFill } = resolveTextStyle(el.vars.text_style);
    const fill = hexColor(el.vars.text_color) ?? styleFill;
    const wordWrap = bool(el.vars.word_wrap) || bool(el.vars.multiline);
    const autoSize = el.vars.auto_size && AUTO_SIZE_JUSTIFY[el.vars.auto_size] ? el.vars.auto_size : 'left';
    const textOptions: Record<string, string | number | undefined> = {
        fill: fill ? quote(fill) : undefined,
        wordWrap: wordWrap ? 'true' : undefined,
        wordWrapWidth: wordWrap && !(el.params & PARAM.REFLECT_H) ? num(el.attrs.width) : undefined,
        align: autoSize !== 'left' ? quote(autoSize) : undefined,
    };
    const textProps: string[] = [];
    const override = overrideProp(ctx, el, 'caption', 'string');
    const hasText = !!(caption || override);

    if (override && caption) textProps.push(`text={${override} ?? ${caption}}`);
    else if (override) textProps.push(`text={${override} ?? ''}`);
    else if (caption) textProps.push(`text=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);

    if (textStyle) textProps.push(`textStyle="${textStyle}"`);
    if (Object.values(textOptions).some(value => value !== undefined)) textProps.push(`textOptions={${layoutLiteral(textOptions)}}`);

    if (hasText) ctx.imports.add('ThemeText');
    ctx.imports.add('Region');

    const regionProps = [
        ...metaProps(ctx, el),
        ...dropShadowProp(el),
        `layout={${boxLayout(el, parent, { flexDirection: '\'row\'', alignItems: wordWrap ? '\'flex-start\'' : '\'center\'', justifyContent: AUTO_SIZE_JUSTIFY[autoSize] }, { autoSize: true })}}`,
    ];

    if (el.tag === 'link') {
        regionProps.push(`onPointerTap={${handlerProp(ctx, el, 'link')}}`);
        regionProps.push('cursor="pointer"');
    }

    if (el.attrs.background === 'true' && hexColor(el.attrs.color)) regionProps.push(`backgroundColor=${quote(hexColor(el.attrs.color)!)}`);

    return wrap('Region', regionProps, indent, hasText ? openTag('ThemeText', textProps, indent + INDENT, true) : []);
};

const emitBitmap = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const assetName = el.vars.asset_uri ?? el.vars.bitmap_asset_name ?? '';
    const props = [ ...metaProps(ctx, el, false) ];
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

    if (tint && tint !== '#ffffff') props.push(`tint="${tint}"`);

    ctx.imports.add('ThemeImage');
    props.push(`layout={${boxLayout(el, parent, {}, { autoSize: true })}}`);

    const needsWrapper = el.attrs.visible === 'false' || !!el.dropShadow;
    const image = openTag('ThemeImage', props, needsWrapper ? indent + INDENT : indent, true);

    if (!needsWrapper) return image;

    ctx.imports.add('Region');

    return wrap('Region', [ ...(el.attrs.visible === 'false' ? [ 'visible={false}' ] : []), ...dropShadowProp(el), `layout={${boxLayout(el, parent)}}` ], indent, image);
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

    props.push(...tintProp(el));

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

    const content = wrap(
        'Region',
        [ `layout={${layoutLiteral({ position: '\'relative\'', flex: 1, width: '\'100%\'', ...centerExtra(el) })}}` ],
        indent + INDENT,
        emitChildren(ctx, el, selfBox(el), indent + INDENT + INDENT),
    );

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

const emitThemed = (ctx: EmitContext, component: string, el: Element, parent: ParentBox, indent: string, extraProps: string[], children: (childIndent: string) => string[]): string[] => {
    ctx.imports.add(component);

    const hidden = el.attrs.visible === 'false';
    const props = [ ...variantProp(el), ...metaProps(ctx, el, false), ...tintProp(el), ...extraProps ];
    // Elements the Flash code toggled at runtime (anything hidden by default, plus every named
    // bubble - see FriendRequestsTab.as showing its `bubble` on select) get a `visible<Name>` prop.
    const visibleOverride = el.attrs.name && (hidden || el.tag === 'bubble') ? overrideProp(ctx, el, 'visible', 'boolean') : undefined;

    if (!hidden && !visibleOverride && !el.dropShadow) return wrap(component, [ ...props, `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, children(indent + INDENT));

    // Components that don't forward `visible`/`dropShadow` to their Box get a Region wrapper carrying them instead.
    ctx.imports.add('Region');

    // The children render inside the component, not the wrapper - a centred child's
    // `justifyContent` belongs on the inner layout here, never on the wrapper's.
    const inner = wrap(component, [ ...props, `layout={${layoutLiteral({ width: '\'100%\'', height: '\'100%\'', ...centerExtra(el) })}}` ], indent + INDENT, children(indent + INDENT + INDENT));
    const wrapperProps = [ ...dropShadowProp(el) ];

    if (visibleOverride) wrapperProps.push(`visible={${visibleOverride} ?? ${!hidden}}`);
    else if (hidden) wrapperProps.push('visible={false}');

    return wrap('Region', [ ...wrapperProps, `layout={${boxLayout(el, parent)}}` ], indent, inner);
};

const REGION_TAGS = new Set([ 'container', 'region', 'background', 'boxsizer', 'display_object_wrapper', 'selector', 'gradient' ]);

/**
 * `asRoot` marks the element a sub-component is being generated *for* - it renders inline
 * there instead of being extracted again (which would recurse forever).
 */
const emit = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string, asRoot = false): string[] => {
    const { tag } = el;

    // Every named structural node (a `container`/`region`/list the Flash code addressed by
    // name) becomes its own component; the parent renders it and exposes one prop, named after
    // it, that forwards that component's props (handlers, caption/src/visible overrides, layout).
    if (!asRoot && el.attrs.name && (REGION_TAGS.has(tag) || LIST_TAGS[tag])) {
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
        const props = [ ...variantProp(el), ...(meta ? [ ...metaProps(ctx, el, false), ...tintProp(el) ] : []), ...(chromeProps ?? []) ];

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
    const none = () => [] as string[];

    switch (tag) {
        case 'container':
        case 'region':
        case 'background':
        case 'boxsizer':
        case 'display_object_wrapper':
        case 'selector':
        case 'gradient': {
            ctx.imports.add('Region');

            const props = [ ...metaProps(ctx, el, false), ...dropShadowProp(el) ];
            const color = hexColor(el.attrs.color);

            if (el.attrs.visible === 'false') {
                const visibleOverride = el.attrs.name ? overrideProp(ctx, el, 'visible', 'boolean') : undefined;

                props.push(visibleOverride ? `visible={${visibleOverride} ?? false}` : 'visible={false}');
            }

            if (color && (el.attrs.background === 'true' || tag === 'background' || tag === 'gradient')) props.push(`backgroundColor="${color}"`);

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

            return emitThemed(ctx, component, el, parent, indent, extra, captionAndChildren);
        }
        case 'container_button':
        case 'iconbutton':
            return emitThemed(ctx, 'ContainerButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], captionAndChildren);
        case 'closebutton':
            return emitThemed(ctx, 'CloseButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'close')}}` ], none);
        case 'checkbox':
        case 'radiobutton':
            return emitThemed(ctx, tag === 'checkbox' ? 'CheckBox' : 'RadioButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], captionOnly);
        case 'tab_button':
        case 'tab_container_button':
            return emitThemed(ctx, 'TabButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'tab')}}` ], captionAndChildren);
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

            if (color) props.push(`color="${color}"`);
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
const assembleComponent = (ctx: EmitContext, componentName: string, doc: string, body: string[]): AssembledComponent => {
    // A caption may be decoded for an element that ends up not rendering it (a Border's own
    // caption, say) - only import `t` when the emitted body actually calls it.
    ctx.usesTranslation = body.some(line => line.includes('t('));

    if (ctx.usesTranslation) ctx.imports.add('useTranslation');
    if (ctx.states.length) ctx.imports.add('useState');

    const propsName = `${componentName}Props`;
    const propEntries = [ ...ctx.props.entries() ].sort(([ a ], [ b ]) => a.localeCompare(b));
    const lines: string[] = [ doc ];

    if (propEntries.length) {
        lines.push(`export interface ${propsName} {`);
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

const generateSubComponent = (file: FileContext, el: Element, parent: ParentBox, kind: 'item' | 'region' = 'item'): string => {
    const base = `${file.componentName}${pascal(el.attrs.name ?? el.tag)}${kind === 'item' ? 'Item' : ''}`;
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

    const assembled = assembleComponent(ctx, name, doc, body);

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

const generateComponent = (componentName: string, sourceFile: string, root: XmlNode): GeneratedComponent => {
    const windows = root.children.filter(child => child.tag === 'window');
    const elements = windows.flatMap(window => window.children.flatMap((child) => {
        if (child.tag === 'children') return child.children.map(toElement);
        if (child.tag === 'filters' || child.tag === 'variables' || child.tag === 'scale') return [];

        return [ toElement(child) ];
    }));
    const file: FileContext = { componentName, imports: new Set(), scrollTargets: new Map(), warnings: [], subComponents: [], subComponentNames: [], subComponentProps: {} };
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
    const lines: string[] = [];
    const reactImports = [ 'ReactNode', 'useState' ].filter(name => file.imports.has(name));

    if (reactImports.length) lines.push(`import { ${reactImports.join(', ')} } from 'react';`, '');
    if (file.imports.has('useTranslation')) lines.push('import { useTranslation } from \'#base/context\';');

    const themeImports = [ ...file.imports ].filter(name => THEME_IMPORTS.has(name)).sort();

    if (themeImports.length) lines.push(`import { ${themeImports.join(', ')} } from '#base/theme';`);
    if (file.imports.has('layoutImage')) lines.push('import { layoutImage } from \'#base/views/layouts/layoutAssets\';');

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
const as3Usage = collectAs3Usage(new Set(sources.map(source => source.base)));
const registry: string[] = [];

for (const source of sources) {
    const suffix = (baseCounts.get(nameKey(source)) ?? 0) > 1 ? `_${source.id}` : '';
    const componentName = `${pascal(source.base)}${suffix ? pascal(suffix) : ''}Layout`;
    const { code, props, nested, subComponentProps, rootIsFrame, subComponents, warnings } = generateComponent(componentName, source.file.replace(/\$.*$/, ''), source.root);

    const usage = as3Usage.get(source.base);
    const folder = layoutFolder(usage);

    mkdirSync(join(OUT_DIR, folder), { recursive: true });
    writeFileSync(join(OUT_DIR, folder, `${componentName}.tsx`), code);
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

writeFileSync(join(OUT_DIR, 'layoutAssets.ts'), [
    '/** Bitmaps referenced by the generated layouts - copied out of `scripts/images` by scripts/generate-layout-views.ts. */',
    'export const layoutImage = (file: string): string => `./assets/images/layouts/${file}`;',
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
    ...registry,
    '];',
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
