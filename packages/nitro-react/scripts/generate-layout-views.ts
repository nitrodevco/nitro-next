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

interface Element {
    tag: string;
    attrs: Record<string, string>;
    vars: Record<string, string>;
    scale: { horizontal: string; vertical: string } | undefined;
    children: Element[];
}

const toElement = (node: XmlNode): Element => {
    const vars: Record<string, string> = {};
    const variables = node.children.find(child => child.tag === 'variables');

    for (const variable of variables?.children ?? []) if (variable.tag === 'var' && variable.attrs.key) vars[variable.attrs.key] = variable.attrs.value ?? '';

    const scaleNode = node.children.find(child => child.tag === 'scale');
    const childrenNode = node.children.find(child => child.tag === 'children');

    return {
        tag: node.tag,
        attrs: node.attrs,
        vars,
        scale: scaleNode ? { horizontal: scaleNode.attrs.horizontal ?? 'fixed', vertical: scaleNode.attrs.vertical ?? 'fixed' } : undefined,
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

interface EmitContext {
    imports: Set<string>;
    usesTranslation: boolean;
    props: Map<string, string>;
    states: { name: string }[];
    propCounts: Map<string, number>;
    scrollTargets: Map<string, 'vertical' | 'horizontal'>;
    warnings: string[];
}

interface ParentBox {
    width: number;
    height: number;
    /** Children of an item list flow in a flex row/column instead of being absolutely placed. */
    flow: boolean;
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

/** Absolute placement from x/y/width/height + the `<scale>` anchoring, or flow sizing in a list. */
const boxLayout = (el: Element, parent: ParentBox, extra: Record<string, string | number | undefined> = {}): string => {
    const x = num(el.attrs.x);
    const y = num(el.attrs.y);
    const width = num(el.attrs.width);
    const height = num(el.attrs.height);
    const fields: Record<string, string | number | undefined> = {};

    if (parent.flow) {
        fields.width = width;
        fields.height = height;
        fields.flexShrink = 0;
    } else {
        fields.position = '\'absolute\'';

        const horizontal = el.scale?.horizontal ?? 'fixed';
        const vertical = el.scale?.vertical ?? 'fixed';

        if (horizontal === 'strech' && parent.width > 0) {
            fields.left = x;
            fields.right = parent.width - x - width;
        } else if (horizontal === 'move' && parent.width > 0) {
            fields.right = parent.width - x - width;
            fields.width = width;
        } else {
            fields.left = x;
            fields.width = width;
        }

        if (vertical === 'strech' && parent.height > 0) {
            fields.top = y;
            fields.bottom = parent.height - y - height;
        } else if (vertical === 'move' && parent.height > 0) {
            fields.bottom = parent.height - y - height;
            fields.height = height;
        } else {
            fields.top = y;
            fields.height = height;
        }
    }

    if (el.attrs.width_min) fields.minWidth = num(el.attrs.width_min);
    if (el.attrs.width_max) fields.maxWidth = num(el.attrs.width_max);
    if (el.attrs.height_min) fields.minHeight = num(el.attrs.height_min);
    if (el.attrs.height_max) fields.maxHeight = num(el.attrs.height_max);

    return layoutLiteral({ ...fields, ...extra });
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
    if (el.attrs.params && el.attrs.params !== '0') props.push(`params={${num(el.attrs.params)}}`);
    if (el.attrs.dynamic_style) props.push(`dynamicStyle=${jsxStr(el.attrs.dynamic_style)}`);
    if (includeVisible && el.attrs.visible === 'false') props.push('visible={false}');

    return props;
};

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

const SKIPPED_TAGS = new Set([
    'header', 'scaler', 'bubble_pointer_up', 'bubble_pointer_down', 'bubble_pointer_left', 'bubble_pointer_right',
    'frame_pointer_down', 'scrollbar_slider_track_horizontal', 'scrollbar_slider_bar_horizontal', 'scrollbar_slider_track_vertical',
    'scrollbar_slider_bar_vertical', 'scrollbar_slider_button_left', 'scrollbar_slider_button_right', 'scrollbar_slider_button_up',
    'scrollbar_slider_button_down', 'tab_selector', 'scrollbar_vertical', 'scrollbar_horizontal',
]);

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
        wordWrapWidth: wordWrap ? num(el.attrs.width) : undefined,
        align: autoSize !== 'left' ? quote(autoSize) : undefined,
    };
    const textProps: string[] = [];

    if (caption) textProps.push(`text=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);
    if (textStyle) textProps.push(`textStyle="${textStyle}"`);
    if (Object.values(textOptions).some(value => value !== undefined)) textProps.push(`textOptions={${layoutLiteral(textOptions)}}`);

    if (caption) ctx.imports.add('ThemeText');
    ctx.imports.add('Region');

    const regionProps = [
        ...metaProps(ctx, el),
        `layout={${boxLayout(el, parent, { flexDirection: '\'row\'', alignItems: wordWrap ? '\'flex-start\'' : '\'center\'', justifyContent: AUTO_SIZE_JUSTIFY[autoSize] })}}`,
    ];

    if (el.tag === 'link') {
        regionProps.push(`onPointerTap={${handlerProp(ctx, el, 'link')}}`);
        regionProps.push('cursor="pointer"');
    }

    if (el.attrs.background === 'true' && hexColor(el.attrs.color)) regionProps.push(`backgroundColor=${quote(hexColor(el.attrs.color)!)}`);

    return wrap('Region', regionProps, indent, caption ? openTag('ThemeText', textProps, indent + INDENT, true) : []);
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

    props.push(`src={${src ?? 'undefined'}}`);

    if (bool(el.vars.stretched_x) || bool(el.vars.fit_size_to_contents) === false) props.push(`width={${num(el.attrs.width)}}`);
    if (bool(el.vars.stretched_y) || bool(el.vars.fit_size_to_contents) === false) props.push(`height={${num(el.attrs.height)}}`);

    const tint = hexColor(el.attrs.color);

    if (tint && tint !== '#ffffff') props.push(`tint="${tint}"`);

    ctx.imports.add('ThemeImage');
    props.push(`layout={${boxLayout(el, parent)}}`);

    const image = openTag('ThemeImage', props, el.attrs.visible === 'false' ? indent + INDENT : indent, true);

    if (el.attrs.visible !== 'false') return image;

    ctx.imports.add('Region');

    return wrap('Region', [ 'visible={false}', `layout={${boxLayout(el, parent)}}` ], indent, image);
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
    const meta = metaProps(ctx, el);
    const background = el.attrs.background === 'true' && hexColor(el.attrs.color) ? [ `backgroundColor="${hexColor(el.attrs.color)!}"` ] : [];

    if (!scroll) {
        return wrap('Region', [ ...meta, ...background, `layout={${boxLayout(el, parent, flowLayout)}}` ], indent, emitChildren(ctx, el, innerParent, indent + INDENT));
    }

    ctx.imports.add('ScrollArea');

    const content = wrap(
        'Region',
        [ ...meta, ...background, `layout={${layoutLiteral({ ...flowLayout, width: '\'100%\'' })}}` ],
        indent + INDENT,
        emitChildren(ctx, el, innerParent, indent + INDENT + INDENT),
    );

    return wrap('ScrollArea', [ `orientation="${scroll}"`, `layout={${boxLayout(el, parent)}}` ], indent, content);
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
        [ 'layout={{ position: \'relative\', flex: 1, width: \'100%\' }}' ],
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

    if (!hidden) return wrap(component, [ ...props, `layout={${boxLayout(el, parent)}}` ], indent, children(indent + INDENT));

    // Components that don't forward `visible` to their Box get a hidden Region wrapper instead.
    ctx.imports.add('Region');

    const inner = wrap(component, [ ...props, 'layout={{ width: \'100%\', height: \'100%\' }}' ], indent + INDENT, children(indent + INDENT + INDENT));

    return wrap('Region', [ 'visible={false}', `layout={${boxLayout(el, parent)}}` ], indent, inner);
};

const emit = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const { tag } = el;

    if (SKIPPED_TAGS.has(tag)) return [];
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

            const props = [ ...metaProps(ctx, el) ];
            const color = hexColor(el.attrs.color);

            if (color && (el.attrs.background === 'true' || tag === 'background' || tag === 'gradient')) props.push(`backgroundColor="${color}"`);

            if (el.attrs.clipping === 'true') return wrap('Region', [ ...props, `layout={${boxLayout(el, parent, { overflow: '\'hidden\'' })}}` ], indent, emitChildren(ctx, el, selfBox(el), childIndent));

            return wrap('Region', [ ...props, `layout={${boxLayout(el, parent)}}` ], indent, emitChildren(ctx, el, selfBox(el), childIndent));
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

            props.push(`layout={${boxLayout(el, parent)}}`);

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

            return [ `${indent}{/* unmapped <${tag}> */}`, ...wrap('Region', [ ...metaProps(ctx, el), `layout={${boxLayout(el, parent)}}` ], indent, emitChildren(ctx, el, selfBox(el), childIndent)) ];
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
    'Border', 'BoxLayout', 'Bubble', 'Button', 'ButtonGroupCenter', 'ButtonGroupLeft', 'ButtonGroupRight', 'ButtonThick', 'CheckBox', 'CloseButton',
    'ContainerButton', 'Droplist', 'Dropmenu', 'Frame', 'Icon', 'RadioButton', 'Region', 'ScrollArea', 'Shape', 'TabButton', 'TabContent', 'TabContext',
    'TextInput', 'ThemeImage', 'ThemeText', 'WidgetSlot',
]);

const generateComponent = (componentName: string, sourceFile: string, root: XmlNode): { code: string; warnings: string[] } => {
    const windows = root.children.filter(child => child.tag === 'window');
    const elements = windows.flatMap(window => window.children.flatMap((child) => {
        if (child.tag === 'children') return child.children.map(toElement);
        if (child.tag === 'filters' || child.tag === 'variables' || child.tag === 'scale') return [];

        return [ toElement(child) ];
    }));
    const ctx: EmitContext = {
        imports: new Set(), usesTranslation: false, props: new Map(), states: [], propCounts: new Map(), scrollTargets: new Map(), warnings: [],
    };

    for (const el of elements) collectScrollTargets(el, ctx.scrollTargets);

    const width = num(root.attrs.width);
    const height = num(root.attrs.height);
    const bodyIndent = INDENT + INDENT;
    let body: string[];

    if (elements.length === 1 && elements[0].tag === 'frame') {
        body = emitFrame(ctx, elements[0], undefined, bodyIndent);
    } else {
        ctx.imports.add('Region');
        ctx.imports.add('BoxLayout');
        ctx.props.set('layout', 'BoxLayout');

        body = wrap(
            'Region',
            [ `layout={{ position: 'relative', width: ${width}, height: ${height}, ...layout }}` ],
            bodyIndent,
            elements.flatMap(el => emit(ctx, el, { width, height, flow: false }, bodyIndent + INDENT)),
        );
    }

    // A caption may be decoded for an element that ends up not rendering it (a Border's own
    // caption, say) - only import `t` when the emitted body actually calls it.
    ctx.usesTranslation = body.some(line => line.includes('t('));

    const propsName = `${componentName}Props`;
    const propEntries = [ ...ctx.props.entries() ].sort(([ a ], [ b ]) => a.localeCompare(b));
    const lines: string[] = [];

    if (ctx.states.length) lines.push('import { useState } from \'react\';', '');

    const contextImports: string[] = [];

    if (ctx.usesTranslation) contextImports.push('useTranslation');
    if (contextImports.length) lines.push(`import { ${contextImports.join(', ')} } from '#base/context';`);

    const themeImports = [ ...ctx.imports ].filter(name => THEME_IMPORTS.has(name)).sort();

    if (themeImports.length) lines.push(`import { ${themeImports.join(', ')} } from '#base/theme';`);
    if (ctx.imports.has('layoutImage')) lines.push('', 'import { layoutImage } from \'./layoutAssets\';');

    lines.push('');
    lines.push(`/** Generated from \`${sourceFile}\` (layout "${root.attrs.name ?? ''}", ${width}x${height}) by scripts/generate-layout-views.ts - do not edit by hand. */`);

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

    return { code: lines.join('\n'), warnings: ctx.warnings };
};

// ---------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(IMAGE_OUT_DIR, { recursive: true });

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

for (const source of sources) {
    const suffix = (baseCounts.get(nameKey(source)) ?? 0) > 1 ? `_${source.id}` : '';
    const componentName = `${pascal(source.base)}${suffix ? pascal(suffix) : ''}Layout`;
    const { code, warnings } = generateComponent(componentName, source.file.replace(/\$.*$/, ''), source.root);

    writeFileSync(join(OUT_DIR, `${componentName}.tsx`), code);
    exports.push(componentName);

    for (const warning of warnings) warningCounts.set(warning, (warningCounts.get(warning) ?? 0) + 1);
}

writeFileSync(join(OUT_DIR, 'layoutAssets.ts'), [
    '/** Bitmaps referenced by the generated layouts - copied out of `scripts/images` by scripts/generate-layout-views.ts. */',
    'export const layoutImage = (file: string): string => `./assets/images/layouts/${file}`;',
    '',
].join('\n'));

writeFileSync(join(OUT_DIR, 'index.ts'), [ ...exports.map(name => `export * from './${name}';`), 'export * from \'./layoutAssets\';', '' ].join('\n'));

console.log(`Generated ${exports.length} layout components into ${OUT_DIR}`);
console.log(`Copied ${copiedImages.size} images into ${IMAGE_OUT_DIR} (${unresolvedImages.size} referenced assets not found in scripts/images)`);

if (!existsSync(join(IMAGE_OUT_DIR, 'README.md'))) {
    writeFileSync(join(IMAGE_OUT_DIR, 'README.md'), '# Generated - populated by `yarn workspace @nitrodevco/nitro-react generate-layout-views`.\n');
}

for (const [ warning, count ] of [ ...warningCounts.entries() ].sort((a, b) => b[1] - a[1])) console.log(`  ${count}x ${warning}`);
