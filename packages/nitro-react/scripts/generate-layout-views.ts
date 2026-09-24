/**
 * Turns the Flash client's window layout XMLs (`scripts/binaryData/*_xml$*.bin`, one `<layout>`
 * root each) into React view components built from the theme components in `src/theme`, one
 * file per layout under `scripts/layouts/`, plus `layoutRegistry.ts` and `layoutAssets.ts`.
 *
 * The output is reference material, not app code: a view under `src/views` is written by hand
 * from the layout it ports (see AGENTS.md, "Widget views from Flash layouts"). The whole output
 * folder is rewritten on every run, so nothing there survives a hand edit - only the layout
 * bitmaps a hand-written view names are protected (`protectHandWrittenImages`).
 *
 * Every XML element tag maps to the theme component of the same role (`frame` -> `Frame`,
 * `border` -> `Border`, `button` -> `Button`, `text` -> `ThemeText`, ...), its `style` attribute
 * becomes that component's `variant` (the theme variant tables are keyed by the same skin ids),
 * `color` becomes `tintColor`, `${key}` captions become `t('key')` calls, and the `x/y/width/
 * height` + `<scale>` anchoring becomes an absolute `layout`. Elements the client filled at
 * runtime (`widget`) become `WidgetSlot` placeholders; interactive elements get an `on<Name>`
 * callback prop; text inputs get local state. Bitmaps referenced by `asset_uri`/
 * `bitmap_asset_name` are copied out of `scripts/images` into `public/assets/<component>/`, the
 * component being the client library/package the layout that names the bitmap belongs to
 * (`ASSET_FOLDERS`); a bitmap two components name goes to `public/assets/shared/`. An asset name
 * is not unique across the client's libraries, so which file a name means is decided - never
 * guessed - by `resolveImage`/`pickImage`, and `public/assets/layout-images.json` records the
 * source file of every bitmap written.
 *
 *   yarn workspace @nitrodevco/nitro-react generate-layout-views
 */
import { createHash } from 'node:crypto';
import { createCanvas, loadImage } from 'canvas';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESOURCE_DIR = join(__dirname, 'flash-js-resources');

/**
 * `scripts/flash-js-resources/<component>/` - one client library's asset bundle as `flash-js`
 * loads it, unpacked. A file is its Flash asset name with the type token turned into the
 * extension (`habbo_element_description_xml` -> `habbo_element_description.xml`, `zoom_in_png` ->
 * `zoom_in.png`), so the folder a file sits in *is* the library that embeds it - the question a
 * library table and a size comparison used to have to answer.
 */
const RESOURCE_COMPONENTS: string[] = existsSync(RESOURCE_DIR)
    ? readdirSync(RESOURCE_DIR, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
    : [];

/** `habbo_element_description.xml` -> `habbo_element_description_xml`, the name the client asks for. */
const assetNameOf = (file: string): string => file.replace(/\.(\w+)$/, '_$1');

/** Every file of a component, as the `<component>/<file>` path the rest of this script passes around. */
const resourceFiles = (component: string): string[] =>
    readdirSync(join(RESOURCE_DIR, component)).map(file => `${component}/${file}`);

const resourcePath = (file: string): string => join(RESOURCE_DIR, file);

/**
 * The decompiled AS3 client of the revision the config names - the same root
 * `scripts/drift/known.py` derives, so a revision bump moves both together. The generator reads
 * two things from it: each library's `public static var <name>:Class = <file>$<hash>;` table (the
 * alias a layout's `asset_uri` may use), and which class builds a layout, which is what files the
 * layout's art under the right component.
 */
const REVISION = JSON.parse(readFileSync(join(__dirname, '../public/config/nitro-config.json'), 'utf8'))['production.version'];
const AS3_ROOT = join('D:', 'Habbo', REVISION, 'scripts-deob');
/**
 * The converted layouts, beside the XML they come from. They are read while a view is written
 * by hand, never imported by the app, so they stay out of `src` (and out of the typecheck).
 * Their emitted imports still spell `#base/views/layouts/...`, which is where a layout would be
 * if one were ever moved into the app.
 */
const OUT_DIR = join(__dirname, 'layouts');
/** Hand-written views live here, and they use `LayoutImage()` too - see `protectHandWrittenImages`. */
const HAND_WRITTEN_DIR = join(__dirname, '../src');
/** Layout bitmaps land under `public/assets/<component>/` - one folder per client component, beside the theme's own. */
const IMAGE_OUT_DIR = join(__dirname, '../public/assets');
/** Which bitmaps under `IMAGE_OUT_DIR` this script owns, by `<component>/<file>` - the rest were hand-placed and are never pruned. */
const IMAGE_MANIFEST = join(IMAGE_OUT_DIR, 'layout-images.json');

/**
 * The component folder a layout's bitmaps are filed under, by the head of the layout's own output
 * folder (`layoutFolder`: the client library that embeds it, then its driving class' package).
 * Kebab-case, one per client component, and the client's own name for it: `roomui/widget/infostand`
 * -> `room-ui`, `userdefinedroomevents` -> `wired` (the client's name for the same feature in every
 * text key and in `views/wired-*`). `navigator` and `newnavigator` are one navigator, and the
 * `window/utils/*` layouts (habbopedia, floor plan editor, profiler) belong to the same
 * `com.sulake.habbo.window` library as `windowmanager`.
 */
const ASSET_FOLDERS: Record<string, string> = {
    avatareditor: 'avatar-editor',
    catalog: 'catalog',
    communicationdemo: 'communication-demo',
    discord: 'discord',
    friendbar: 'friend-bar',
    friendlist: 'friend-list',
    games: 'games',
    groups: 'groups',
    help: 'help',
    inventory: 'inventory',
    messenger: 'messenger',
    moderation: 'moderation',
    navigator: 'navigator',
    newnavigator: 'navigator',
    notifications: 'notifications',
    questengine: 'quest-engine',
    roomui: 'room-ui',
    toolbar: 'toolbar',
    userdefinedroomevents: 'wired',
    window: 'window-manager',
    windowmanager: 'window-manager',
};

/**
 * The `flash-js-resources` folder(s) holding the library behind each art folder - the inverse of
 * `ASSET_FOLDERS`. This is what makes a bitmap name unambiguous: `zoom_in` asked for by a
 * `room-ui` layout is the one in `habbo-room-ui-com`, whatever else exports that name.
 */
const RESOURCE_FOR_FOLDER: Record<string, string[]> = {
    'avatar-editor': [ 'habbo-avatar-editor-com' ],
    catalog: [ 'habbo-catalog-com' ],
    'communication-demo': [ 'habbo-communication-demo-com' ],
    'friend-bar': [ 'habbo-friend-bar-com' ],
    'friend-list': [ 'habbo-friend-list-com' ],
    games: [ 'habbo-games-com' ],
    groups: [ 'habbo-groups-com' ],
    help: [ 'habbo-help-com' ],
    inventory: [ 'habbo-inventory-com' ],
    messenger: [ 'habbo-messenger-com' ],
    moderation: [ 'habbo-moderation-com' ],
    navigator: [ 'habbo-navigator-com', 'habbo-new-navigator' ],
    notifications: [ 'habbo-notifications-com' ],
    'quest-engine': [ 'habbo-quest-engine-com' ],
    'room-ui': [ 'habbo-room-ui-com' ],
    toolbar: [ 'habbo-toolbar-com' ],
    wired: [ 'habbo-user-defined-room-events-com' ],
    'window-manager': [ 'habbo-window-manager-com' ],
};

/** The resource folders a call site's `component` (an art folder, or a `<component>/<file>` pin) points at. */
const preferredComponents = (component: string | undefined): string[] =>
    (component ? RESOURCE_FOR_FOLDER[component.split('/')[0]] ?? [] : []);

/** Bitmaps two components name have no owner - one copy, here, referenced by both. */
const SHARED_FOLDER = 'shared';

/**
 * Where a layout with no library and no driving class (`unassigned`) would file its art. None of
 * the six does today - they are the feed, list-tester, room-settings and raid-protection layouts,
 * and not one names a bitmap - so this is a fallback, not a folder: the window manager is where
 * a layout nothing embeds is built from.
 */
const UNASSIGNED_FOLDER = 'window-manager';

const assetFolder = (layoutFolder: string): string => ASSET_FOLDERS[layoutFolder.split('/')[0]] ?? UNASSIGNED_FOLDER;
const HABBO_TEXT_STYLES_FILE = join(__dirname, '../src/theme/font/flash-text/habboTextStyles.ts');

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
    /** `<var key><value><Array>` vars (a dropmenu's `item_array`), their strings in order. */
    arrays: Record<string, string[]>;
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

/**
 * `WindowParser.parseSingleWindowEntity`: a window with no `style` of its own takes its parent's
 * (`parent ? parent.style : 0`), so the text and skin defaults of a child follow the window it
 * sits in. The inherited id is written into the element's attributes, which is what every later
 * reader of `style` - the variant, the default text style - then sees.
 */
const toElement = (node: XmlNode, parentStyle?: string): Element => {
    const vars: Record<string, string> = {};
    const attrs = (node.attrs.style === undefined && parentStyle !== undefined) ? { ...node.attrs, style: parentStyle } : node.attrs;
    const variables = node.children.find(child => child.tag === 'variables');

    const arrays: Record<string, string[]> = {};

    for (const variable of variables?.children ?? []) {
        if (variable.tag !== 'var' || !variable.attrs.key) continue;

        vars[variable.attrs.key] = variable.attrs.value ?? '';

        const array = variable.children.find(child => child.tag === 'value')?.children.find(child => child.tag === 'Array');

        if (array) arrays[variable.attrs.key] = array.children.filter(child => child.tag === 'var').map(child => child.attrs.value ?? '');
    }

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
        attrs,
        vars,
        scale,
        params,
        dropShadow: parseDropShadow(node.children.find(child => child.tag === 'filters')),
        arrays,
        children: (childrenNode?.children ?? []).map(child => toElement(child, attrs.style)),
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

/**
 * A colour attribute as `WindowParser` reads it: `0x...` through `parseInt(value, 16)`, anything
 * else through `uint()`, both wrapped to 32 bits. `0x0999999` is therefore `0x00999999`, and a
 * ten-digit `0xffff000000` is `0xff000000`.
 */
const flashColor = (value: string): number => {
    const parsed = (value.charAt(1) === 'x') ? parseInt(value, 16) : Number(value);

    return Number.isFinite(parsed) ? (parsed % 0x100000000) >>> 0 : 0;
};

/** The windows that draw through a `TextField` of their own - every text type but `label`. */
const TEXT_FIELD_TAGS = new Set([ 'text', 'formatted_text', 'html', 'link', 'input', 'password' ]);

/**
 * The solid fill `WindowRendererItem.render` puts behind a window, or nothing. A window fills
 * only with `background` on, and then in its *whole* ARGB colour (`set color`: `_fillColor =
 * background ? color : color & 0xFFFFFF`) - so a six-digit colour, whose alpha byte is 0, fills
 * nothing at all, and `background="true" color="0x00"` is transparent, not black. A `background`
 * window is the one type that fills by default: `BackgroundController` sets `background = true`
 * and `color = 0xFFFFFFFF` before the XML's attributes land.
 */
const fillOf = (el: Element): { color: string; alpha: number } | undefined => {
    const background = (el.attrs.background !== undefined) ? el.attrs.background === 'true' : el.tag === 'background';

    if (!background) return undefined;

    // A text field (`TextController` / `TextFieldController`) also turns on its `TextField`'s own
    // background, drawn opaque in the RGB of `color` - white when the layout names no colour.
    if (TEXT_FIELD_TAGS.has(el.tag)) {
        const rgb = (el.attrs.color !== undefined) ? (flashColor(el.attrs.color) & 0xFFFFFF) : 0xFFFFFF;

        return { color: `#${rgb.toString(16).padStart(6, '0')}`, alpha: 1 };
    }

    const argb = (el.attrs.color !== undefined) ? flashColor(el.attrs.color) : ((el.tag === 'background') ? 0xFFFFFFFF : 0x00FFFFFF);
    const alpha = argb >>> 24;

    if (!alpha) return undefined;

    return { color: `#${(argb & 0xFFFFFF).toString(16).padStart(6, '0')}`, alpha: Math.round((alpha / 255) * 1000) / 1000 };
};

/**
 * AS3 `unescape`, which `WindowParser` runs over every caption, name and tag list: `%XX` is one
 * Latin-1 code unit and `%uXXXX` one UTF-16 unit, anything malformed stays as written, and `+`
 * is a plus - `decodeURIComponent` turned the sixteen `"+"` captions into spaces and gave up on
 * `%F6` and `%u2019` altogether.
 */
const decode = (value: string): string => value
    .replace(/%u([0-9a-f]{4})|%([0-9a-f]{2})/gi, (_, wide: string | undefined, narrow: string | undefined) => String.fromCharCode(parseInt(wide ?? narrow ?? '0', 16)))
    .replace(/\r/g, '');

const quote = (value: string): string => `'${value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '')}'`;

/** The ordering eslint's simple-import-sort expects (case-insensitive, natural numbers). */
const IMPORT_ORDER = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
const importSort = (a: string, b: string): number => IMPORT_ORDER.compare(a, b);

/** A JSX string attribute value: plain double-quoted text where possible, an expression otherwise. */
const jsxStr = (value: string): string => (/["\\\n]/.test(value) ? `{${quote(value)}}` : `"${value}"`);

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
// Text style lookup - the XML's `text_style` variable is the client's own style name, which is
// also the theme's `textStyle` key, so this only has to know which names exist. They come from
// `habboTextStyles.ts`, generated from the same `styles_css` the layouts name.
// ---------------------------------------------------------------------------------------------

const HABBO_TEXT_STYLE_ROWS = [ ...readFileSync(HABBO_TEXT_STYLES_FILE, 'utf8').matchAll(/^ {4}(\w+):\s*\{([^}]*)\}/gm) ];
const HABBO_TEXT_STYLE_NAMES = new Set(HABBO_TEXT_STYLE_ROWS.map(match => match[1]));

/** The styles whose own `antiAliasType` is `advanced` - which decides whether `setTextFormatting`
 *  puts a `grid_fit_type` var back to `pixel`, see `textFormatVars`. */
const ADVANCED_TEXT_STYLES = new Set(HABBO_TEXT_STYLE_ROWS.filter(match => match[2].includes("antiAliasType: 'advanced'")).map(match => match[1]));

if (!HABBO_TEXT_STYLE_NAMES.size) throw new Error(`No text styles read from ${HABBO_TEXT_STYLES_FILE} - its HABBO_TEXT_STYLES table is written in a shape this script does not know.`);

/**
 * Every style in the client's `styles.css` is a theme style, the `_white` ones included - they
 * are not the black styles recoloured (no etching). A name that is in no layout's vocabulary
 * means the generated `habboTextStyles.ts` is behind the revision, so it is dropped rather than
 * emitted as a key that does not typecheck.
 */
const resolveTextStyle = (name: string | undefined): string | undefined => ((name && HABBO_TEXT_STYLE_NAMES.has(name)) ? name : undefined);

/**
 * The style a text starts from when it declares no `text_style` var of its own. Every window
 * carries a `style` id, and `TextController`'s constructor takes its style name from
 * `ThemeManager.getPropertyDefaults(style)` - the property defaults of the first real theme
 * covering that id, and three of those name a different `text_style`: Volter (ids 0-2)
 * `regular`, Ubuntu (3-7) and Misc (10000-10007) `u_regular`, Illumina Light and Dark (100-199,
 * 200-299) `il_regular`.
 *
 * `windowToXMLString` writes a var out only where it differs from those defaults, so an element
 * with no `text_style` is not `regular` - it is whatever its own theme says. Reading it as
 * `regular` put Volter 9 under the 1,708 texts the Ubuntu and Illumina themes cover.
 */
const themeTextStyle = (el: Element): string => {
    const style = num(el.attrs.style);

    if ((style >= 3 && style < 8) || (style >= 10000 && style < 10008)) return 'u_regular';

    if (style >= 100 && style < 300) return 'il_regular';

    return 'regular';
};

// ---------------------------------------------------------------------------------------------
// Image lookup - `scripts/images` files are `<id>_<asset_name>$<hash>.<ext>`; the XML refers
// to them by `<asset_name>` (with or without the `_png` suffix).
//
// An asset name is NOT unique: every client library embeds its own art, and a dozen of them
// export a `heart_png`, a `close_png`, a `logo_png`, a `zoom_in_png`. The id prefix is the
// decompiler's running number over the whole SWF, so it says nothing about which library a file
// came from - the `roomui` bitmaps alone are scattered over ids 1749-2856. Picking "the last one
// readdir yielded" therefore picked a different library's art at random: the room tools toolbar
// drew the 43x44 camera-mode `zoom_in` beside the 18x18 `zoom_out`. Every name keeps all its
// files here, and `resolveImage` chooses between them - see `pickImage`.
// ---------------------------------------------------------------------------------------------

/** Every `<component>/<file>` a bitmap name answers to, across every library that embeds one. */
const imageFiles = new Map<string, string[]>();

/** `<component>/<file>` -> the component folder it came from, which is the library that embeds it. */
const imageComponent = new Map<string, string>();

for (const component of RESOURCE_COMPONENTS) {
    for (const file of resourceFiles(component)) {
        if (!/\.(png|gif|jpg)$/i.test(file)) continue;

        const name = assetNameOf(file.slice(component.length + 1));

        imageComponent.set(file, component);

        // A layout names a bitmap with or without its type token, so both keys answer.
        for (const key of new Set([ name, name.replace(/_(png|gif|jpg)$/i, '') ])) {
            const files = imageFiles.get(key);

            if (files) files.push(file);
            else imageFiles.set(key, [ file ]);
        }
    }
}

/** Content hash of a `scripts/images` file - what tells two ids holding the same art from two different bitmaps. */
const imageHashes = new Map<string, string>();
const imageHash = (file: string): string => {
    let hash = imageHashes.get(file);

    if (hash === undefined) {
        hash = createHash('sha1').update(readFileSync(resourcePath(file))).digest('hex');
        imageHashes.set(file, hash);
    }

    return hash;
};

/** A bitmap's pixel size, read out of its own header - no decoding, and `canvas` is async. */
const imageSizes = new Map<string, { width: number; height: number } | undefined>();
const imageSize = (file: string): { width: number; height: number } | undefined => {
    if (imageSizes.has(file)) return imageSizes.get(file);

    const data = readFileSync(resourcePath(file));
    let size: { width: number; height: number } | undefined;

    if (data.length > 24 && data.readUInt32BE(0) === 0x89504e47) size = { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
    else if (data.length > 10 && data.toString('latin1', 0, 3) === 'GIF') size = { width: data.readUInt16LE(6), height: data.readUInt16LE(8) };
    else if (data.length > 4 && data.readUInt16BE(0) === 0xffd8) {
        // JPEG: walk the markers to the start-of-frame, which carries the dimensions.
        for (let at = 2; at + 9 < data.length;) {
            if (data[at] !== 0xff) { at++; continue; }

            const marker = data[at + 1];

            if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
                size = { width: data.readUInt16BE(at + 7), height: data.readUInt16BE(at + 5) };
                break;
            }

            at += 2 + data.readUInt16BE(at + 2);
        }
    }

    imageSizes.set(file, size);

    return size;
};

/** The distinct arts among these files, each as the files that hold it - several ids often hold identical bytes, which is harmless. */
const distinctArts = (files: string[]): string[][] => {
    const arts = new Map<string, string[]>();

    for (const file of files) {
        const art = arts.get(imageHash(file));

        if (art) art.push(file);
        else arts.set(imageHash(file), [ file ]);
    }

    return [ ...arts.values() ];
};

const copiedImages = new Map<string, string>();
const unresolvedImages = new Set<string>();

/**
 * Where each bitmap comes from and which components name it. Nothing is copied while the layouts
 * are generated: the second component that names a bitmap is what turns it into a `shared/` one,
 * and that is only known once every layout has been read (`placeImages`).
 */
interface ImageJob {
    /** File in `scripts/images` to copy, or to crop `region` out of. */
    source: string;
    region?: NonNullable<ManifestAsset['region']>;
    components: Set<string>;
    /** A bitmap a hand-written view names by path decides its own folder - no layout speaks for it. */
    pinned?: string;
}

const imageJobs = new Map<string, ImageJob>();

/** Marks an emitted `layoutImage()` argument whose component folder is filled in by `resolveTokens`. */
const IMAGE_TOKEN = '__LAYOUT_IMAGE__';

/**
 * A family whose members a hand-written view builds names inside (`mysterybox_${type}_base.png`)
 * has to stay in one folder, or the template points at a folder the file is not in. Each of these
 * is a bitmap the layouts alone would file elsewhere - the pin names the view that builds it.
 */
const PINNED_IMAGES: Record<string, string> = {
    // views/avatar-editor/AvatarEditor.tsx: `avatar_editor_tabs_ae_tabs_${category}.png`, and a catalog layout draws the generic tab too.
    'avatar_editor_tabs_ae_tabs_generic.png': 'avatar-editor',
    // views/room-widgets/furniture/FurnitureMysteryBoxView.tsx: `mysterybox_${box|key}_base|overlay.png`; the key pair is in a notifications layout as well.
    'mysterybox_key_base.png': 'room-ui',
    'mysterybox_key_overlay.png': 'room-ui',
    // views/wired-trading/trade/WiredTradeView.tsx: `wired_chests_images_${layoutType}_payments.png`; the generic one is in an inventory layout.
    'wired_chests_images_generic_payments.png': 'wired',
};

/**
 * The asset manifests (`*_manifest_xml`) publish named sub-regions of a sheet:
 * `<asset name="progress_disk_etched_off" ref="illumina_light_progress_indicator_etched_png"><param key="region" value="0,0,10,11"/></asset>`.
 * The region is cropped out of the referenced file into its own PNG (see `cropJobs`).
 */
interface ManifestAsset {
    ref: string;
    region?: { x: number; y: number; width: number; height: number };
}

const manifestAssets = new Map<string, ManifestAsset>();

for (const component of RESOURCE_COMPONENTS) {
    const manifest = join(RESOURCE_DIR, component, '_manifest.xml');

    if (!existsSync(manifest)) continue;

    const source = readFileSync(manifest, 'utf8');
    const pattern = /<asset [^>]*name="([^"]+)"[^>]*ref="([^"]+)"[^>]*(?:\/>|>([\s\S]*?)<\/asset>)/g;

    for (let match = pattern.exec(source); match; match = pattern.exec(source)) {
        const [ , name, ref, body ] = match;
        const region = body && /<param key="region" value="(\d+),(\d+),(\d+),(\d+)"/.exec(body);

        if (!manifestAssets.has(name)) {
            manifestAssets.set(name, region ? { ref, region: { x: num(region[1]), y: num(region[2]), width: num(region[3]), height: num(region[4]) } } : { ref });
        }
    }
}


/**
 * The client's asset-library classes (`HabboWindowManagerCom.as`, `HabboInventoryCom.as`, ...)
 * publish their embedded bitmaps by name, often a different one than the embedded file's:
 * `public static var roomtools_zoom_in:Class = zoom_in_png$1d108f3d…;`. A layout's `asset_uri`
 * is that published name, and the right-hand side is `<embedded name>$<hash>` - the whole
 * identity, not just the name, so it picks one `zoom_in_png` out of the several the SWF holds.
 *
 * This is the client's own answer to "which file does this name mean", so `resolveImage` asks it
 * first. Entries where the published name equals the embedded one are kept too: they carry no
 * renaming, but they still name an exact file.
 */
const imageIdentities = new Map<string, Set<string>>();

const AS3_LIBRARY_DIR = AS3_ROOT;

if (existsSync(AS3_LIBRARY_DIR)) {
    for (const file of readdirSync(AS3_LIBRARY_DIR)) {
        if (!file.endsWith('.as')) continue;

        const source = readFileSync(join(AS3_LIBRARY_DIR, file), 'utf8');
        const pattern = /public static var (\w+):Class = §?([\w-]+?_(?:png|gif|jpg)\$[\w-]+)§?;/g;

        for (let match = pattern.exec(source); match; match = pattern.exec(source)) {
            const [ , alias, identity ] = match;
            const identities = imageIdentities.get(alias);

            if (identities) identities.add(identity);
            else imageIdentities.set(alias, new Set([ identity ]));
        }
    }
}

/**
 * A bitmap name several libraries export different art under, where neither the library table nor
 * the layout's declared size settled which one this output is. The pick is then the one this
 * script has always made (the last file readdir yielded) - arbitrary, so it is printed at the end
 * beside the candidates, the way `unresolvedImages` is: wrong art does not fail, it just draws.
 */
interface AmbiguousImage {
    key: string;
    chosen: string;
    declared: string;
    candidates: string[];
}

const ambiguousImages = new Map<string, AmbiguousImage>();

/**
 * Which of `files` is the art `name` means. All the same bytes - the usual case, one asset
 * exported under several ids - and it does not matter; otherwise the layout's declared size
 * decides, and where that matches several candidates or none (a 9-slice, a stretched bar, a
 * bitmap no layout names) the pick is recorded as ambiguous rather than guessed at silently.
 */
const pickImage = (name: string, key: string, files: string[], declared: { width: number; height: number } | undefined, prefer: string[] = []): string => {
    // The library that embeds the bitmap answers first: a name several components export is one
    // file per component, and the layout asking for it belongs to exactly one of them.
    const owned = prefer.length ? files.filter(file => prefer.includes(imageComponent.get(file) ?? '')) : [];

    if (owned.length) files = owned;

    const fallback = files[files.length - 1];
    const arts = distinctArts(files);

    if (arts.length < 2) return fallback;

    const matching = declared ? arts.filter(art => imageSize(art[0])?.width === declared.width && imageSize(art[0])?.height === declared.height) : [];

    if (matching.length === 1) return matching[0][matching[0].length - 1];

    const describe = (file: string): string => {
        const size = imageSize(file);

        return `${file.split('_')[0]} (${size ? `${size.width}x${size.height}` : 'unread'})`;
    };

    // First claim wins, the way `claimImage` does - the layout that names a bitmap is read before
    // the hand-written views, so what is reported is the verdict of the call that fixed the source.
    if (!ambiguousImages.has(name)) {
        ambiguousImages.set(name, {
            key,
            chosen: describe(fallback),
            declared: declared ? `${declared.width}x${declared.height}` : 'nothing',
            candidates: arts.map(art => describe(art[0])),
        });
    }

    return fallback;
};

/**
 * Bitmaps no layout names statically but the client assigned at runtime - MeMenuMainView.as's
 * `_icons` table (`<name>_white` default / `<name>_color` hover per me-menu tile). Copied so the
 * wired views can reference them through `layoutImage()` like everything else.
 */
const RUNTIME_IMAGES: { name: string; component: string }[] = [
    'gohome', 'dance', 'clothes', 'effects', 'badges', 'wave', 'settings', 'credits', 'minimail', 'profile', 'achievements', 'compass', 'lighthouse',
].flatMap(name => [ `${name}_white`, `${name}_color` ]).map(name => ({ name, component: 'room-ui' })).concat([
    // The dimmer and background colour widgets draw these from code (`DimmerFurniWidget` /
    // `BackgroundColorFurniWidget`): the slider base and button, the colour grid's frame, button
    // and selection, and the picture the dimmer shows while it is off.
    'dimmer_slider_base', 'dimmer_slider_button', 'dimmer_color_frame', 'dimmer_color_button', 'dimmer_color_selected', 'dimmer_info',
    // The pet infostand's respect button and skill levels (`InfoStandPetView`).
    'icon_petrespect', 'pet_skill_level_0', 'pet_skill_level_1', 'pet_skill_level_2', 'pet_skill_level_3', 'pet_skill_level_4',
    // The plant breeding window's backdrop (`PlantBreedingView`) and the effects list's hover art
    // (`EffectView`), both set from code.
    'breed_pets_preview_bg', 'memenu_fx_play', 'memenu_fx_pause',
].map(name => ({ name, component: 'room-ui' }))).concat([
    // The room info card's buttons and tag chips - `HabboNavigator.prepareButton` and the tag
    // renderer take them from the navigator's own library, so they file under it.
    'remove_rights', 'make_home', 'home', 'favourite', 'make_favourite', 'thumb_up', 'tag_l', 'tag_m', 'tag_r',
    'tag_l_reactive', 'tag_m_reactive', 'tag_r_reactive',
].map(name => ({ name, component: 'navigator' }))).concat([
    // `FriendListTabsView.refreshHeader` draws the white arrows on every tab header but the
    // friends tab's (the black pair is named by the layouts).
    'friendlist_arrow_down_white', 'friendlist_arrow_right_white',
].map(name => ({ name, component: 'friend-list' }))).concat([
    // AvatarEditor tab icons: the layouts reference the `_off` state, TabUtils.setElementImage()
    // strips `_off` for the active one; plus the runtime-only swatch/slot art the editor code loads.
    'avatar_editor_tabs_gender_male', 'avatar_editor_tabs_gender_female', 'avatar_editor_tabs_head_hair', 'avatar_editor_tabs_head_hats',
    'avatar_editor_tabs_head_accessories', 'avatar_editor_tabs_head_eyewear', 'avatar_editor_tabs_head_face_accessories', 'avatar_editor_tabs_top_shirt',
    'avatar_editor_tabs_top_jacket', 'avatar_editor_tabs_top_prints', 'avatar_editor_tabs_top_accessories', 'avatar_editor_tabs_bottom_trousers',
    'avatar_editor_tabs_bottom_shoes', 'avatar_editor_tabs_bottom_accessories', 'avatar_editor_tabs_icon_misc_pets', 'avatar_editor_tabs_icon_misc_misc',
    // `WardrobeSlot.updateView` asks for `avatar_editor_wardrobe_empty_slot`, which no library
    // publishes: HabboWindowManagerCom files that bitmap under its own prefix, as
    // `avatar_editor_wardrobe_wardrobe_empty_slot`, so the client's own lookup finds nothing and
    // an empty slot draws its border alone. Not copied, because nothing can draw it.
    'avatar_editor_editor_clr_13x21_2', 'avatar_editor_editor_clr_13x21_3',
].map(name => ({ name, component: 'avatar-editor' }))).concat([
    // `SoundSettingsItem.updateSoundIcons` swaps each volume row's mute and full-volume icons
    // between the white and the coloured pair as the row's volume reaches zero; the layout names
    // only the white ones, so the coloured pair has nothing naming it statically.
    'toolbar_memenu_settings_sounds_on_color', 'toolbar_memenu_settings_sounds_off_color',
].map(name => ({ name, component: 'toolbar' }))).concat([
    // The placeholder every badge draws while it loads: `AchievementController`,
    // `AchievementsResolutionController` and the two resolution views all set
    // `assetUri = "common_loading_icon"`, and the room logics send it as the `loading_icon`
    // asset name (`FurnitureGuildCustomizedLogic`). Only the friend bar's layout names it
    // statically, so without this row it would sit in that one component's folder.
    { name: 'common_loading_icon', component: 'quest-engine' },
    // The floor plan editor's five tool bitmaps. Its own layout (`floor_plan_editor_bc_xml`) is
    // one the component bundles do not carry, so nothing names them statically, but the art is
    // the window manager's and `FloorPlanEditorView` draws all five.
]).concat([
    'floor_plan_editor_add_tile', 'floor_plan_editor_remove_tile', 'floor_plan_editor_raise_tile',
    'floor_plan_editor_sink_tile', 'floor_plan_editor_enter_tile',
    // The hotel broadcast's `simpleAlert` illustration (`IncomingMessages.onBroadcastMessageEvent`
    // and `HotelAlertTool` pass it as the `illustration` bitmap's `assetUri`).
    'illumina_alert_illustrations_frank_neutral',
].map(name => ({ name, component: 'window-manager' }))).concat([
    // `HabboCatalog.getSubscriptionProductIcon`: the club product's icon, drawn from code by
    // `HabboCatalogUtils.displayProductIcon` (the offer centre's reward rows).
    { name: 'icon_hc', component: 'catalog' },
]).concat([
    // `BuilderCatalogWidget.updateButtons`: the placement strip's error icon per refusing status
    // (`builderWidget` names only `icons_builder_error_full`, which the others replace from code).
    'icons_builder_error_furnilimit', 'icons_builder_error_notroom', 'icons_builder_error_room',
    'icons_builder_error_grouproom', 'icons_builder_error_userinroom',
].map(name => ({ name, component: 'catalog' }))).concat([
    // `ClubExtendConfirmationDialog`: the credit icon of the normal price and the saving, and the
    // seven frames of your price's spinning coin (`icon_credit_0` .. `icon_credit_6`).
    'icon_credit_0', 'icon_credit_1', 'icon_credit_2', 'icon_credit_3', 'icon_credit_4', 'icon_credit_5', 'icon_credit_6',
    // `BundleProductContainer`'s icon, which a bundle offer's product container draws (the club gifts).
    'ctlg_pic_deal_icon_narrow',
    // `club_center`'s `special_amount_icon` names `hc_center_icon_credits`, the embedded file of the
    // published `hc_center_hc_center_icon_credits` (`HabboWindowManagerCom`), which the view draws.
    'hc_center_hc_center_icon_credits',
].map(name => ({ name, component: 'catalog' }))).concat([
    // `PurchaseConfirmationDialog.updateUnknownSenderAvatarImage`: the head a moderator's gift
    // shows when they hide their face, and `PRODUCT_IMAGES`' one picture the catalogue library
    // ships (`showConfirmationDialog` draws it for the snowwar token offers).
    'gift_incognito', 'snowwar_tokens_10',
].map(name => ({ name, component: 'catalog' }))).concat([
    // `ItemGridCatalogWidget.select` / the pets' colour events: the colour grid's cell art
    // (`ColourGridCatalogWidget.createColorContainer`), the product view's bundle picture
    // (`ctlg_dyndeal_background`) and the grid items' badge add-on (`ProductContainer.setAddOnIcon`).
    'ctlg_clr_27x22_1', 'ctlg_clr_27x22_2', 'ctlg_clr_27x22_3', 'ctlg_clr_40x32_1', 'ctlg_clr_40x32_2', 'ctlg_clr_40x32_3',
    'ctlg_dyndeal_background', 'catalog_icon_badge_included',
    // `ProductContainer.setAddOnIcon`'s other add-on: a two-product offer carrying the ninja disappear effect.
    'catalog_icon_ninja_effect_included',
    // `HabboCatalogUtils.showExtraOnProduct`'s chat style background, set from code over `badgeDisplayWidget`.
    'catalogue_chatstyle_background',
].map(name => ({ name, component: 'catalog' }))).concat([
    // The recycler: `RecyclerCatalogWidget.renderSlotGraphics`' slot art, the blush
    // `FrankRecyclerEmotion` picks besides the template's heart, and the level stars
    // `RecyclerPrizesCatalogWidget` sets by level (`star_small_<STAR_LEVELS>`; its layout names gold).
    'ctlg_recycler_slot_bg', 'franks_emotions_blush',
    'star_small_bronze', 'star_small_silver', 'star_small_diamond', 'star_small_ruby', 'star_small_pink', 'star_small_green', 'star_small_grey',
].map(name => ({ name, component: 'catalog' }))).concat([
    // `LimitedItemGridOverlayWidget`: the metal plaque behind a limited item's number, set from code.
    { name: 'unique_item_label_plaque_metal', component: 'window-manager' },
]).concat([
    // `HabboCatalog.getMintTokenProductIcon`: the picture the purchase confirmation of a mint
    // token pack shows (`PurchaseConfirmationDialog.showConfirmationDialog`, product type `MINT_TOKEN`).
    { name: 'minting_token_large', component: 'catalog' },
]).concat([
    // The badge editor's own art, which its controllers load by name through
    // `HabboGroupsManager.getButtonImage` rather than from a layout: the empty and add-a-part
    // placeholders and the selection frame (`BadgeEditorPartItem`, `BadgeSelectPartCtrl`), the
    // position picker and its grid (`BadgeLayerCtrl.createWindow`) and the colour swatch's three
    // pieces (`ColorGridCtrl.createAndAttach`).
    'badge_part_add', 'badge_part_empty', 'badge_part_picker', 'position_grid', 'position_picker',
    'color_chooser_bg', 'color_chooser_fg', 'color_chooser_selected',
].map(name => ({ name, component: 'groups' })));

/**
 * Records that `component` draws `outName`, which the `scripts/images` file `source` holds (a
 * `region` of it, for a manifest sub-asset). The folder follows in `placeImages`.
 */
const claimImage = (outName: string, source: string, component: string | undefined, region?: NonNullable<ManifestAsset['region']>): void => {
    const job = imageJobs.get(outName) ?? { source, region, components: new Set<string>() };

    if (component) {
        if (component.includes('/')) job.pinned = component.slice(0, component.lastIndexOf('/'));
        else job.components.add(component);
    }

    imageJobs.set(outName, job);
};

/**
 * `component` is the asset folder of the layout that names the bitmap, or - for a hand-written
 * view - the `<component>/<file>` path it names, which pins the folder itself. `declared` is the
 * size the layout gives the element drawing it, which is what tells one library's `zoom_in_png`
 * from another's when the library table has no entry for the name (see `pickImage`).
 */
const resolveImage = (name: string, component?: string, declared?: { width: number; height: number }): string | undefined => {
    let file: string | undefined;
    const prefer = preferredComponents(component);
    // A bundle file *is* the published asset name (`newnavigator_create_room.png`), so the name the
    // layout asks for is looked up as-is first. That is the client's own answer, and it is exact.
    const exact = imageFiles.get(name) ?? imageFiles.get(name.replace(/_(png|gif|jpg)$/i, ''));

    if (exact) file = pickImage(name, name, exact, declared, prefer);

    // Only a name no bundle carries goes through the library's alias table. Its right-hand side
    // names the *embedded* file (`roomtools_zoom_in` -> `zoom_in_png$1d108f3d`), and without the
    // hash - which the bundles do not carry - an embedded name is shared by several libraries'
    // art, so trying it first picked a 23x23 icon for the 187x59 `newnavigator_create_room`.
    if (!file) {
        const identities = imageIdentities.get(name) ?? imageIdentities.get(`${name}_png`);
        const named = [ ...identities ?? [] ]
            .map(identity => identity.slice(0, identity.indexOf('$')))
            .flatMap(embedded => imageFiles.get(embedded) ?? imageFiles.get(embedded.replace(/_(png|gif|jpg)$/i, '')) ?? []);

        if (named.length) file = pickImage(name, `library alias -> ${named.length} file(s)`, named, declared, prefer);
    }

    // `asset_uri` names carry their library/folder as leading tokens (`avatar_editor_tabs_ae_tabs_head`
    // is the file `ae_tabs_head`; `icons_hc_icon_small` is `hc_icon_small`) - strip tokens until one matches.
    const tokens = name.split('_');

    for (let skip = 0; skip < Math.min(4, tokens.length) && !file; skip++) {
        const candidate = tokens.slice(skip).join('_');
        const key = imageFiles.has(candidate) ? candidate : imageFiles.has(`${candidate}_png`) ? `${candidate}_png` : undefined;

        if (key) file = pickImage(name, key, imageFiles.get(key)!, declared, prefer);
    }

    if (!file) {
        const manifest = manifestAssets.get(name);
        const refKey = manifest && (imageFiles.has(manifest.ref) ? manifest.ref : imageFiles.has(manifest.ref.replace(/_(png|gif|jpg)$/i, '')) ? manifest.ref.replace(/_(png|gif|jpg)$/i, '') : undefined);
        // The region's own size is the crop, not the sheet's, so it cannot pick between sheets.
        const refFile = refKey && pickImage(name, refKey, imageFiles.get(refKey)!, manifest?.region ? undefined : declared, prefer);

        if (manifest && refFile && manifest.region) {
            const outName = `${name}.png`;

            claimImage(outName, refFile, component, manifest.region);

            return outName;
        }

        file = refFile || undefined;
    }

    if (!file) {
        unresolvedImages.add(name);

        return undefined;
    }

    const ext = file.slice(file.lastIndexOf('.'));
    const outName = `${name.replace(/_(png|gif|jpg)$/i, '')}${ext}`;

    claimImage(outName, file, component);

    return outName;
};

/**
 * Every claimed bitmap's folder, once every layout and every hand-written view has been read: the
 * one component that names it, `shared/` when two or more do, and the pin where a hand-written
 * view's template needs a family kept together.
 */
const imageFolder = new Map<string, string>();

const placeImages = (): void => {
    for (const [ outName, job ] of imageJobs) {
        // The layouts decide: a hand-written view's own path only speaks for art no layout names,
        // so a view that points at the wrong folder reads as a missing file (scripts/drift/assets.py)
        // instead of silently moving a bitmap out from under the layouts that share it.
        const named = job.components.size === 1 ? [ ...job.components ][0] : job.components.size ? SHARED_FOLDER : undefined;

        imageFolder.set(outName, PINNED_IMAGES[outName] ?? named ?? job.pinned ?? UNASSIGNED_FOLDER);
    }
};

/** The `<component>/<file>` path of a claimed bitmap - only valid after `placeImages`. */
const imagePath = (outName: string): string => `${imageFolder.get(outName) ?? UNASSIGNED_FOLDER}/${outName}`;

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
    scrollTargets: Map<string, ScrollTarget>;
    warnings: string[];
    /** The extracted sub-components (row templates, complex named regions) - each becomes its own file. */
    subComponents: { name: string; code: string }[];
    subComponentNames: string[];
    /** Each sub-component's own props / nested sub-components, for the registry. */
    subComponentProps: Record<string, { props: string[]; nested: Record<string, string> }>;
}

interface EmitContext {
    file: FileContext;
    /** While a tab context's children are emitted: the prop naming the selected tab. */
    tabSelectedProp?: string;
    /** While a row template's body is emitted: every named child gets a `visible<Name>` prop (rows are data-driven). */
    rowTemplate?: boolean;
    /** Set by `emit` when it re-enters itself for the element it has just wrapped in a `{cond && (...)}`. */
    conditionalDone?: boolean;
    imports: Set<string>;
    usesTranslation: boolean;
    props: Map<string, string>;
    states: { name: string; initial?: string }[];
    propCounts: Map<string, number>;
    scrollTargets: Map<string, ScrollTarget>;
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
    /** The flow direction of a list parent - rows spanning the cross axis stretch with it. */
    direction?: 'row' | 'column';
    /** A wrapping grid - its cells keep both sizes. */
    wrap?: boolean;
    /** A `boxsizer`: children sit at its padding on the cross axis, and a `relative(N)` tag shares the free space. */
    sizer?: boolean;
    /** The root of a row-template sub-component also merges the caller's own `layout` prop. */
    spreadLayout?: boolean;
    /** The root of a shared widget: placement comes entirely from the caller's `layout`, only the flex/clipping extras stay. */
    omitPlacement?: boolean;
    /** The parent element's name - qualifies override prop names when siblings share a name. */
    name?: string;
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

    if (!/\$\{[^}]+\}/.test(text)) return quote(text);

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
    /** `use_parent_graphic_context`: the window draws into its parent's bitmap (its `blend` then only applies to a skin). */
    PARENT_GC: 16,
    H_MOVE: 64, H_STRECH: 128, H_CENTER: 192, H_MASK: 192,
    V_MOVE: 1024, V_STRECH: 2048, V_CENTER: 3072, V_MASK: 3072,
    SHRINK_TO_CHILDREN: 16384, EXPAND_TO_CHILDREN: 131072,
    ALIGN_RIGHT: 262144, ALIGN_H_CENTER: 786432, ALIGN_H_MASK: 786432,
    ALIGN_BOTTOM: 1048576, ALIGN_V_MIDDLE: 3145728, ALIGN_V_MASK: 3145728,
    SCALING_H: 4096, SCALING_V: 8192, SCALING_TARGET: 65536,
    REFLECT_H: 4194304, REFLECT_V: 8388608,
    FORCE_CLIPPING: 1073741824,
    DRAG_TRIGGER: 256, DRAG_TARGET: 32768, BOUND_TO_PARENT: 32,
} as const;

/**
 * `WindowController.update` on a press: a window with `mouse_dragging_trigger` walks up to the
 * first ancestor-or-self with `mouse_dragging_target` and drags it. A frame does that through
 * its own header already, so only the other windows need the props.
 */
const dragProps = (el: Element, options: { target: boolean }): string[] => [
    ...((options.target && el.tag !== 'frame' && (el.params & PARAM.DRAG_TARGET)) ? [ 'dragTarget' ] : []),
    // `setRectangle`'s `bound_to_parent_rect` clamp keeps a dragged window inside its parent.
    ...((options.target && el.tag !== 'frame' && (el.params & PARAM.DRAG_TARGET) && (el.params & PARAM.BOUND_TO_PARENT)) ? [ 'boundToParentRect' ] : []),
    ...(((el.params & PARAM.DRAG_TRIGGER) && (el.params & PARAM.INPUT)) ? [ 'dragTrigger' ] : []),
];

/**
 * `treshold`: a window with a graphic hit-tests its own rendered pixels, taking the press only
 * where alpha reaches it (`validateLocalPointIntersection`); 0 is the plain rect. A missing
 * attribute is the element row's default, 10 for a bitmap. Only a window that takes input
 * (`input_event_processor`) is ever a target, so only those need it.
 */
const hitThresholdProp = (el: Element): string[] => {
    if (!(el.params & PARAM.INPUT)) return [];

    const threshold = Math.min(255, (el.attrs.treshold !== undefined) ? num(el.attrs.treshold) : 10);

    return threshold > 0 ? [ `hitThreshold={${threshold}}` ] : [];
};

type Anchor = 'fixed' | 'move' | 'strech' | 'center';

/**
 * How an element follows its parent's resize on one axis (`WindowController.updateScaleRelativeToParent`):
 * the `<scale>` a skin template writes, else the `relative_*_scale_*` bits - `strech` grows with
 * the parent, `move` keeps its distance from the far edge, `center` re-centres. Nothing else
 * anchors a window: the `on_resize_align_*` bits only say which edge stays put when the element
 * resizes *itself* (see `resizeAlign`), and an element with no bits is `fixed`, whatever its
 * geometry suggests.
 */
const anchor = (el: Element, _parent: ParentBox, axis: 'h' | 'v'): Anchor => {
    const explicit = axis === 'h' ? el.scale?.horizontal : el.scale?.vertical;

    if (explicit === 'strech' || explicit === 'move' || explicit === 'center') return explicit;
    if (explicit === 'fixed') return 'fixed';

    const scale = el.params & (axis === 'h' ? PARAM.H_MASK : PARAM.V_MASK);

    if (scale === (axis === 'h' ? PARAM.H_CENTER : PARAM.V_CENTER)) return 'center';
    if (scale === (axis === 'h' ? PARAM.H_STRECH : PARAM.V_STRECH)) return 'strech';
    if (scale === (axis === 'h' ? PARAM.H_MOVE : PARAM.V_MOVE)) return 'move';

    return 'fixed';
};

/**
 * `WindowController.setRectangle`'s `on_resize_align_*`: when a window changes size without
 * moving - a text fitting its caption, a bitmap fitting its asset - `right` keeps its right edge
 * where it was (`x -= dw`), `center` its centre (`x += dw / 2`), and the default its left edge.
 */
const resizeAlign = (el: Element, axis: 'h' | 'v'): 'start' | 'center' | 'end' => {
    const align = el.params & (axis === 'h' ? PARAM.ALIGN_H_MASK : PARAM.ALIGN_V_MASK);

    if (align === (axis === 'h' ? PARAM.ALIGN_H_CENTER : PARAM.ALIGN_V_MIDDLE)) return 'center';
    if (align === (axis === 'h' ? PARAM.ALIGN_RIGHT : PARAM.ALIGN_BOTTOM)) return 'end';

    return 'start';
};

/**
 * The axes a root frame can be resized on. `FrameController.setupScaling` shows its scaler only
 * with a scaling flag - `mouse_scaling_target` for both axes, the horizontal or vertical trigger
 * for one - so a frame without one is the size the layout gives it, and nothing drags it larger.
 */
const rootSizing = (el: Element): { fields: Record<string, string | number | undefined>; resizeDirection: string } => {
    const width = num(el.attrs.width);
    const height = num(el.attrs.height);
    const both = !!(el.params & PARAM.SCALING_TARGET);
    const horizontal = both || !!(el.params & PARAM.SCALING_H);
    const vertical = both || !!(el.params & PARAM.SCALING_V);
    const fields = {
        width,
        height,
        minWidth: el.attrs.width_min ? num(el.attrs.width_min) : undefined,
        maxWidth: el.attrs.width_max ? num(el.attrs.width_max) : undefined,
        minHeight: el.attrs.height_min ? num(el.attrs.height_min) : undefined,
        maxHeight: el.attrs.height_max ? num(el.attrs.height_max) : undefined,
    };

    return { fields, resizeDirection: (horizontal && vertical) ? 'all' : horizontal ? 'x' : vertical ? 'y' : 'none' };
};

/**
 * Each frame style's content margins - `left, top, right, bottom` of the `_CONTENT` container in
 * the window layout its `habbo_element_description` row names (`FrameController.margins`). A
 * frame's `margin_*` vars override them one by one (`FrameController.set properties`), and its
 * children are placed from that content box.
 */
const FRAME_MARGINS: Map<string, [ number, number, number, number ]> = (() => {
    const margins = new Map<string, [ number, number, number, number ]>();
    const dir = join(RESOURCE_DIR, 'habbo-window-manager-com');
    const description = existsSync(join(dir, 'habbo_element_description.xml')) ? parseXml(readFileSync(join(dir, 'habbo_element_description.xml'), 'utf8')) : undefined;
    const rows: XmlNode[] = [];
    const collect = (node: XmlNode) => {
        if (node.tag === 'window' && node.attrs.type === 'frame') rows.push(node);
        node.children.forEach(collect);
    };

    if (description) collect(description);

    for (const row of rows) {
        const file = join(dir, (row.attrs.window_layout ?? '').replace(/_xml$/, '.xml'));

        if (!row.attrs.window_layout || !existsSync(file)) continue;

        const layout = parseXml(readFileSync(file, 'utf8'));
        let content: XmlNode | undefined;
        const find = (node: XmlNode) => {
            if (!content && /(^|,)\s*_CONTENT\s*(,|$)/.test(node.attrs.tags ?? '')) content = node;
            node.children.forEach(find);
        };

        if (!layout) continue;

        find(layout);

        if (!content) continue;

        const x = num(content.attrs.x);
        const y = num(content.attrs.y);

        margins.set(row.attrs.style, [ x, y, num(layout.attrs.width) - x - num(content.attrs.width), num(layout.attrs.height) - y - num(content.attrs.height) ]);
    }

    return margins;
})();

/** A frame's content margins: its style's, with any `margin_*` var of its own over them. */
const frameMargins = (el: Element): [ number, number, number, number ] => {
    const [ left, top, right, bottom ] = FRAME_MARGINS.get(el.attrs.style ?? '0') ?? FRAME_MARGINS.get('0') ?? [ 0, 0, 0, 0 ];
    const own = (key: string, fallback: number) => ((el.vars[key] !== undefined) ? num(el.vars[key]) : fallback);

    return [ own('margin_left', left), own('margin_top', top), own('margin_right', right), own('margin_bottom', bottom) ];
};

/** The box a frame's children are placed in (the XML positions them from the content edge, not the frame edge). */
const frameContentBox = (el: Element): ParentBox => {
    const [ left, top, right, bottom ] = frameMargins(el);

    return { width: num(el.attrs.width) - left - right, height: num(el.attrs.height) - top - bottom, flow: false, name: el.attrs.name };
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
const centersHChild = (el: Element, box: ParentBox = selfBox(el)): boolean => box.width > 0
    && el.children.some(child => anchor(child, box, 'h') === 'center' || (sizesItself(child, 'h') && anchor(child, box, 'h') === 'fixed' && resizeAlign(child, 'h') === 'center'));

/**
 * A leaf whose own size follows its content on this axis - a text or bitmap flagged to reflect
 * its resize to its parent - the one kind of window `on_resize_align_*` re-places.
 */
const sizesItself = (el: Element, axis: 'h' | 'v'): boolean => ownSizeAxes(el)[axis];

/**
 * The axes a window resizes itself on, which is what `on_resize_align_*` then re-places:
 *
 * - a `label` always fits its text (`TextLabelController.refreshTextImage`);
 * - a text with `auto_size` other than `none` fits its text: `left` on both axes, `center` and
 *   `right` on the height only (`TextController.refreshTextImage`), and a wrapping field keeps its
 *   width and grows down;
 * - a bitmap with `fit_size_to_contents` takes its bitmap's size.
 */
const ownSizeAxes = (el: Element): { h: boolean; v: boolean } => {
    if (el.tag === 'label') return { h: true, v: true };
    if (TEXT_TAGS.has(el.tag)) {
        const autoSize = el.vars.auto_size ?? 'none';

        if (autoSize === 'none') return { h: false, v: false };

        return { h: autoSize === 'left' && !flashBool(el.vars.word_wrap), v: true };
    }
    if (el.tag === 'bitmap' || el.tag === 'static_bitmap') {
        const fits = flashBool(el.vars.fit_size_to_contents);

        return { h: fits, v: fits };
    }

    return { h: false, v: false };
};

/** A `relative(N)` tag's N - the child's share of a box sizer's free space - or 0. */
const relativeShare = (el: Element): number => {
    const tag = [ ...tagSet(el) ].map(value => /^relative\((\d+(?:\.\d+)?)\)$/.exec(value)).find(Boolean);

    return tag ? Number(tag[1]) : 0;
};

/**
 * A `boxsizer` (`BoxSizerController.arrangeChildren`): its visible children in a row (a column
 * with `vertical`), the first at the padding, each next one `spacing` after the last, all at the
 * cross-axis padding. It never sizes itself or a child's cross axis. Defaults are the
 * controller's own fields (spacing 5, padding 8) - every layout writes all three anyway.
 */
const boxSizerLayout = (el: Element): { direction: 'row' | 'column'; fields: Record<string, string | number | undefined> } => {
    const direction = flashBool(el.vars.vertical) ? 'column' : 'row';
    const spacing = num(el.vars.spacing, 5);
    const paddingH = num(el.vars.padding_horizontal, 8);
    const paddingV = num(el.vars.padding_vertical, 8);

    return {
        direction,
        fields: {
            flexDirection: `'${direction}'`,
            alignItems: '\'flex-start\'',
            gap: spacing || undefined,
            paddingLeft: paddingH || undefined,
            paddingRight: paddingH || undefined,
            paddingTop: paddingV || undefined,
            paddingBottom: paddingV || undefined,
        },
    };
};

/** A child's XML rect reaches outside `box`. */
const overflowsBox = (child: Element, box: ParentBox): boolean => {
    const x = num(child.attrs.x);
    const y = num(child.attrs.y);

    return x < 0 || y < 0 || (x + num(child.attrs.width)) > box.width || (y + num(child.attrs.height)) > box.height;
};

/**
 * Whether a window cuts off what its children draw past its edges. `clipping` is on for every
 * window unless the XML says `false` (`WindowModel`), and `WindowRenderer.childRectToClippedDrawRegion`
 * clips each child drawing into a shared graphic context (`use_parent_graphic_context`) to every
 * clipping ancestor; a child with its own context escapes it unless it is `force_clipping`. So the
 * box clips when a child it would clip actually reaches outside it - measured on the XML geometry,
 * since a clip nothing crosses changes no pixel and costs a mask. An item list's items fill its
 * internal container, which the list clips the same way unless it grows to fit them.
 */
const clipsChildren = (el: Element): boolean => {
    if (el.attrs.clipping === 'false') return false;

    const box = selfBox(el);
    const list = LIST_TAGS[el.tag] ? listDirection(el) : undefined;

    if (list) {
        if (list.scroll || bool(el.vars.resize_on_item_update)) return false;

        const spacing = num(el.vars.spacing);
        const items = el.children.filter(child => child.attrs.visible !== 'false' && !SKIPPED_TAGS.has(child.tag));
        const main = list.direction === 'column' ? 'height' : 'width';
        const extent = items.reduce((sum, child) => sum + num(child.attrs[main]), 0) + (Math.max(0, items.length - 1) * spacing);

        return !list.wrap && extent > box[main];
    }

    return el.children.some(child => !!(child.params & (PARAM.PARENT_GC | PARAM.FORCE_CLIPPING)) && child.attrs.visible !== 'false' && overflowsBox(child, box));
};

const centerExtra = (el: Element, box?: ParentBox): Record<string, string | undefined> => ({ justifyContent: centersHChild(el, box) ? '\'center\'' : undefined });

interface BoxLayoutOptions {
    /** A leaf (text or bitmap) placed at its own box: the axes it sizes itself on (`ownSizeAxes`) drop the XML size. */
    autoSize?: boolean;
    /** The element lays its children out in flow (a list), so `expand/resize_to_accommodate_children` can be honoured. */
    growsWithChildren?: boolean;
    /** The axis a list sizes to its items on (`resize_on_item_update`), so the XML size is dropped there. */
    contentAxis?: 'width' | 'height';
}

/** Absolute placement from x/y/width/height + the anchoring bits, or flow sizing in a list. */
const boxLayout = (el: Element, parent: ParentBox, extra: Record<string, string | number | undefined> = {}, options: BoxLayoutOptions = {}): string => {
    const x = num(el.attrs.x);
    const y = num(el.attrs.y);
    const width = num(el.attrs.width);
    const height = num(el.attrs.height);
    const fields: Record<string, string | number | undefined> = {};
    // A window that sizes itself (`ownSizeAxes`) takes no XML size on that axis.
    const autoWidth = !!options.autoSize && ownSizeAxes(el).h;
    const autoHeight = !!options.autoSize && ownSizeAxes(el).v;
    // `expand_to_accommodate_children` only ever grows, so the XML box becomes a minimum;
    // `resize_to_accommodate_children` (expand + shrink) frees the size entirely. Only
    // meaningful where children actually contribute to the flex size (a list's rows) - a box
    // of absolutely-positioned children can't be measured, so it keeps its fixed size.
    const expands = !!options.growsWithChildren && !!(el.params & PARAM.EXPAND_TO_CHILDREN);
    const shrinks = expands && !!(el.params & PARAM.SHRINK_TO_CHILDREN);
    const sizeField = (axis: 'width' | 'height', value: number, auto: boolean) => {
        if (auto || shrinks || options.contentAxis === axis) return;

        if (expands) fields[axis === 'width' ? 'minWidth' : 'minHeight'] = value;
        else fields[axis] = value;
    };

    if (parent.omitPlacement) {
        fields.position = '\'absolute\'';
    } else if (parent.flow) {
        // `ItemListController.updateScrollAreaRegion` sets only an item's main-axis coordinate
        // (`y` down a vertical list, `x` along a horizontal one); the other stays the item's own,
        // so a row the layout puts at x 1 sits one pixel in. A grid places both.
        // `BoxSizerController.calculateSpaceForRelatives`: a `relative(N)` child takes N shares of
        // what the fixed children and the spacing leave, on the sizer's axis.
        const share = parent.sizer ? relativeShare(el) : 0;
        const mainAxis = parent.direction === 'column' ? 'height' : 'width';

        if (share) {
            fields.flexGrow = share;
            fields.flexBasis = 0;
        } else {
            sizeField(mainAxis, mainAxis === 'width' ? width : height, mainAxis === 'width' ? autoWidth : autoHeight);
        }

        if (mainAxis === 'width') sizeField('height', height, autoHeight);
        else sizeField('width', width, autoWidth);
        if (!parent.wrap && !parent.sizer && parent.direction === 'column' && x) fields.marginLeft = x;
        if (!parent.wrap && !parent.sizer && parent.direction === 'row' && y) fields.marginTop = y;
        fields.flexShrink = 0;
    } else {
        fields.position = '\'absolute\'';

        const horizontal = anchor(el, parent, 'h');
        const vertical = anchor(el, parent, 'v');

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
        } else if (autoWidth && resizeAlign(el, 'h') === 'end' && parent.width > 0) {
            fields.right = parent.width - x - width;
        } else if (autoWidth && resizeAlign(el, 'h') === 'center' && parent.width > 0) {
            // The parent centres it (`centersHChild`), shifted by its design offset.
            const offset = x + width / 2 - parent.width / 2;

            if (offset) {
                fields.marginLeft = offset;
                fields.marginRight = -offset;
            }
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
        } else if (autoHeight && resizeAlign(el, 'v') === 'end' && parent.height > 0) {
            fields.bottom = parent.height - y - height;
        } else if (autoHeight && resizeAlign(el, 'v') === 'center' && parent.height > 0) {
            const offset = y + height / 2 - parent.height / 2;

            fields.alignSelf = '\'center\'';

            if (offset) {
                fields.marginTop = offset;
                fields.marginBottom = -offset;
            }
        } else {
            fields.top = y;
            sizeField('height', height, autoHeight);
        }
    }

    if (el.attrs.width_min) fields.minWidth = num(el.attrs.width_min);
    if (el.attrs.width_max) fields.maxWidth = num(el.attrs.width_max);
    if (el.attrs.height_min) fields.minHeight = num(el.attrs.height_min);
    if (el.attrs.height_max) fields.maxHeight = num(el.attrs.height_max);
    if (clipsChildren(el)) fields.overflow = '\'hidden\'';

    const literal = layoutLiteral({ ...fields, ...extra });

    return parent.spreadLayout ? literal.replace(/ \}$/, ', ...layout }') : literal;
};

/**
 * A named element's value can be overridden through a prop (`captionTitle`, `srcIcon`, ...).
 * When several siblings share a name (every tab's icon is `bitmap`), later ones are qualified
 * by their parent (`srcHeadBitmap`) rather than numbered.
 */
const overrideProp = (ctx: EmitContext, el: Element, prefix: string, type: string, parentName?: string): string | undefined => {
    if (!el.attrs.name) return undefined;

    const base = `${prefix}${pascal(el.attrs.name)}`;
    const taken = ctx.props.has(base) || (ctx.propCounts.get(base) ?? 0) > 0;
    const name = uniqueProp(ctx, taken && parentName ? `${prefix}${pascal(parentName)}${pascal(el.attrs.name)}` : base);

    ctx.props.set(name, type);

    return name;
};

/** The `ThemeLayoutMeta` props shared by every themed component. */
const metaProps = (ctx: EmitContext, el: Element): string[] => {
    const props: string[] = [];

    if (el.attrs.name) props.push(`name=${jsxStr(el.attrs.name)}`);

    const tooltip = captionExpr(ctx, el.vars.tool_tip_caption);

    if (tooltip) props.push(jsxAttr('tooltip', tooltip));
    // `WindowToolTipAgent.begin` waits the window's own `tool_tip_delay` (500 by default).
    if (tooltip && el.vars.tool_tip_delay !== undefined && num(el.vars.tool_tip_delay, 500) !== 500) props.push(`tooltipDelay={${num(el.vars.tool_tip_delay)}}`);
    // A name `DynamicStyleManager` does not define resolves to a bare `DynamicStyle` with no rules,
    // so only its five (`DYNAMIC_STYLES` in theme/utils/dynamicStyles.ts) are emitted.
    if (el.attrs.dynamic_style && DYNAMIC_STYLE_NAMES.has(el.attrs.dynamic_style)) props.push(`dynamicStyle=${jsxStr(el.attrs.dynamic_style)}`);

    return props;
};

const DYNAMIC_STYLE_NAMES = new Set([ 'lifted_hover', 'brightness_and_shadow_under', 'brightness_and_shadow_under_gentle', 'reward_track_item', 'button' ]);

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

/**
 * The Flash window `blend` (`WindowRendererItem.render`) as an `alpha` prop: a bitmap, icon or
 * text field composites itself at that opacity, and so does a container/bubble with its own
 * graphic context - the caller checks that (`PARAM.PARENT_GC`), since a container drawing
 * into its parent's context ignores `blend` altogether. Borders take `blend` themselves.
 */
const alphaProp = (el: Element): string[] => (el.attrs.blend !== undefined ? [ `alpha={${num(el.attrs.blend)}}` ] : []);

/** A `#icon` / `#bg` tag: the child role under a `dynamic_style` host (`DynamicStyle.getChildStyle`) -> `dynamicRole` prop. */
const dynamicRoleProp = (el: Element): string[] => {
    const role = [ ...tagSet(el) ].find(tag => tag === '#icon' || tag === '#bg');

    return role ? [ `dynamicRole="${role.slice(1)}"` ] : [];
};

/** Boolean configuration flags a page puts on a catalog widget slot. */
const widgetFlagProps = (el: Element): string[] => [ ...tagSet(el) ].map(tag => WIDGET_FLAGS[tag]).filter(Boolean);

/**
 * `WindowController.set filters` applies a filter only to a window with a graphic context of its
 * own (`if(hasGraphicsContext())`): on one drawing into its parent's (`use_parent_graphic_context`)
 * the `<DropShadowFilter>` is dropped. A frame always has its own (`FrameController` clears the flag).
 */
const dropShadowProp = (el: Element): string[] => ((el.dropShadow && (el.tag === 'frame' || !(el.params & PARAM.PARENT_GC))) ? [ `dropShadow={${layoutLiteral({ ...el.dropShadow, color: el.dropShadow.color ? quote(el.dropShadow.color) : undefined })}}` ] : []);

const variantProp = (el: Element): string[] => (el.attrs.style !== undefined ? [ `variant="${el.attrs.style}"` ] : []);

/** A JSX attribute from an expression - a plain string literal becomes `name="..."`, anything else `name={expr}`. */
const jsxAttr = (name: string, expr: string): string => (/^'[^'"\\]*'$/.test(expr) ? `${name}="${expr.slice(1, -1)}"` : `${name}={${expr}}`);

const tintProp = (ctx: EmitContext, el: Element): string[] => {
    const expr = recolorExpr(ctx, el, hexColor(el.attrs.color));

    return expr ? [ jsxAttr('tintColor', expr) ] : [];
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
    // `SelectorListController.updateSelectableRegion`: a row unless `vertical`; see `listDirection`.
    selector_list: { direction: 'row' },
};

const AUTO_SIZE_JUSTIFY: Record<string, string> = { left: '\'flex-start\'', center: '\'center\'', right: '\'flex-end\'' };

const emitChildren = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] =>
    el.children.flatMap(child => emit(ctx, child, parent, indent));

const selfBox = (el: Element, flow = false): ParentBox => ({ width: num(el.attrs.width), height: num(el.attrs.height), flow, name: el.attrs.name });

/**
 * A layout's `font_face` spelling as the theme names that face - the alias `browserFace` hands
 * Pixi's canvas text, which `flashFaceOverride` reads back into a Flash family, weight and slant.
 * `UbuntuThick` is the client's own `UbuntuThick-Bold.ttf`, which the port has captured neither
 * an AIR bundle nor a `.ttf` for; it is emitted all the same, and reported at the end of a run.
 */
const FONT_FACES: Record<string, string> = {
    'Ubuntu': 'Ubuntu',
    'Ubuntu bold': 'UbuntuBold',
    'Ubuntu condensed': 'UbuntuCondensed',
    'UbuntuCondensed': 'UbuntuCondensed',
    'UbuntuThick': 'UbuntuThick',
    'Volter': 'Volter',
    'Volter Bold': 'VolterBold',
};

/** The faces `flashFaceOverride` knows; anything else renders in whatever the browser substitutes. */
const PORTED_FACES = new Set([ 'Ubuntu', 'UbuntuBold', 'UbuntuItalics', 'UbuntuBoldItalics', 'UbuntuCondensed', 'Volter', 'VolterBold' ]);

/** Faces a run met that the theme has no captured font for - printed with the missing images. */
const unportedFaces = new Map<string, number>();

/**
 * Whether a declared var actually reaches the `TextField`.
 *
 * `TextController.setTextFormatting` re-applies the style over every property whose recorded
 * value is falsy (`if(!_loc2_.sharpness) _loc3_.sharpness = int(_loc5_.sharpness)`), so a
 * `sharpness="0"` or `leading="0"` - which the layout editor writes on almost every text - is
 * the style's own value, not zero. The setters that record a *string* escape that: `setBold`
 * writes `fontWeight = "bold"` whether the var is true or false, `setItalic` writes
 * `"italic"`/`"normal"` and `setUnderline` `"underline"`/`"none"`, so those three count either
 * way. `setEtchingColor` is guarded by `== null` rather than falsiness, so `0x0` counts too.
 */
const VAR_COUNTS_WHEN_FALSY = new Set([ 'bold', 'italic', 'underline', 'font_face', 'antialias_type', 'grid_fit_type', 'etching_color', 'etching_position' ]);

const varApplies = (key: string, raw: string | undefined): boolean => {
    if (raw === undefined) return false;
    if (VAR_COUNTS_WHEN_FALSY.has(key)) return true;

    return raw !== 'false' && raw !== '0' && Number(raw) !== 0;
};

/** `0xff000000` / `0x0` -> the `0xAARRGGBB` literal `FlashTextFormat.etchingColor` takes. */
const argbLiteral = (value: string): string | undefined => {
    const digits = value.replace(/^0x/i, '').replace(/[^0-9a-f]/gi, '');

    return digits.length ? `0x${digits.slice(-8).padStart(8, '0').toUpperCase()}` : undefined;
};

/**
 * The `TextField` vars an element declares over its style, split the way `ThemeText` takes them:
 * `font_face`, `font_size` and `text_color` into `textOptions` (Pixi's own vocabulary, which the
 * canvas-text fallback reads), the rest into `flashFormat`. Every key of
 * `TextController.createPropertySetterTable` that decides the format is here; the ones that do
 * not (`margins`, `max_chars`, `restrict`, `mouse_wheel_enabled`, ...) are window behaviour and
 * stay out.
 */
const textFormatVars = (el: Element): { options: Record<string, string | number | undefined>; flash: Record<string, string | number | undefined> } => {
    const v = el.vars;
    const face = varApplies('font_face', v.font_face) ? v.font_face : undefined;

    const resolvedFace = face ? (FONT_FACES[face] ?? face) : undefined;

    if (resolvedFace && !PORTED_FACES.has(resolvedFace)) unportedFaces.set(resolvedFace, (unportedFaces.get(resolvedFace) ?? 0) + 1);

    // `setGridFitType` is the one setter that records nothing of its own, so a later
    // `text_style` - which re-runs `setTextFormatting` - puts an advanced style's grid fit back
    // to `pixel` over it, unless an `antialias_type` was recorded before that point. Vars are
    // applied in document order (`XMLPropertyArrayParser.parse` of the `<variables>` children),
    // so the order they are listed in decides it.
    const order = Object.keys(v);
    const at = (key: string): number => (order.includes(key) ? order.indexOf(key) : Infinity);
    const gridFitReset = order.includes('text_style')
        && ADVANCED_TEXT_STYLES.has(v.text_style)
        && at('text_style') > at('grid_fit_type')
        && at('antialias_type') > at('text_style');

    return {
        options: {
            fontFamily: resolvedFace ? quote(resolvedFace) : undefined,
            fontSize: varApplies('font_size', v.font_size) ? num(v.font_size) : undefined,
        },
        flash: {
            bold: varApplies('bold', v.bold) ? String(bool(v.bold)) : undefined,
            italic: varApplies('italic', v.italic) ? String(bool(v.italic)) : undefined,
            underline: varApplies('underline', v.underline) ? String(bool(v.underline)) : undefined,
            letterSpacing: varApplies('spacing', v.spacing) ? num(v.spacing) : undefined,
            leading: varApplies('leading', v.leading) ? num(v.leading) : undefined,
            antiAliasType: varApplies('antialias_type', v.antialias_type) ? quote(v.antialias_type === 'normal' ? 'normal' : 'advanced') : undefined,
            gridFitType: (varApplies('grid_fit_type', v.grid_fit_type) && !gridFitReset) ? quote(v.grid_fit_type!) : undefined,
            thickness: varApplies('thickness', v.thickness) ? num(v.thickness) : undefined,
            sharpness: varApplies('sharpness', v.sharpness) ? num(v.sharpness) : undefined,
            kerning: varApplies('kerning', v.kerning) ? String(bool(v.kerning)) : undefined,
            etchingColor: varApplies('etching_color', v.etching_color) ? argbLiteral(v.etching_color!) : undefined,
            etchingPosition: varApplies('etching_position', v.etching_position) ? quote(v.etching_position!) : undefined,
        },
    };
};

/** Just the `<ThemeText>` for a text element - used where the parent already lays its caption out (a button). */
const textElement = (ctx: EmitContext, el: Element, parentName?: string): { props: string[]; hasText: boolean; wordWrap: boolean; autoSize: string } => {
    const caption = captionExpr(ctx, el.attrs.caption);
    const textStyle = resolveTextStyle(el.vars.text_style) ?? themeTextStyle(el);
    // A `label` (`TextLabelController`) reads only its style, colour and margins, draws through
    // one cached single-line field per style, and sizes itself to the text in both directions.
    const label = el.tag === 'label';
    const autoSizeVar = label ? 'left' : (el.vars.auto_size ?? 'none');
    // `setTextColor` records the colour and `setTextFormatting` re-applies the style over it
    // whenever that record is falsy, so `text_color="0x0"` is the style's colour, not black.
    // A label sets its colour whenever the var is there (`0x0` is black); a text re-applies its
    // style over a falsy one.
    const fill = (label ? el.vars.text_color !== undefined : varApplies('text_color', el.vars.text_color)) ? hexColor(el.vars.text_color) : undefined;
    // `word_wrap` alone wraps; `multiline` only lets an input take Enter (a Flash `TextField`
    // breaks at an explicit line break either way).
    const wordWrap = !label && flashBool(el.vars.word_wrap);
    const autoSize = el.vars.auto_size && AUTO_SIZE_JUSTIFY[el.vars.auto_size] ? el.vars.auto_size : 'left';
    const format = label ? { options: {}, flash: {} } : textFormatVars(el);
    const textOptions: Record<string, string | number | undefined> = {
        fill: textColorExpr(ctx, el, fill),
        ...format.options,
        wordWrap: wordWrap ? 'true' : undefined,
        // A `TextField` wraps inside its 2px gutter on either side, so at the field's width less 4.
        wordWrapWidth: wordWrap ? num(el.attrs.width) - textMargins(el)[0] - textMargins(el)[2] - 4 : undefined,
        align: autoSize !== 'left' ? quote(autoSize) : undefined,
    };
    const props: string[] = [];
    const override = overrideProp(ctx, el, 'caption', 'string', parentName);
    const hasText = !!(caption || override);

    if (override && caption) props.push(`text={${override} ?? ${caption}}`);
    else if (override) props.push(`text={${override} ?? ''}`);
    else if (caption) props.push(`text=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);

    if (textStyle !== 'regular') props.push(`textStyle="${textStyle}"`);
    if (Object.values(textOptions).some(value => value !== undefined)) props.push(`textOptions={${layoutLiteral(textOptions)}}`);
    if (Object.values(format.flash).some(value => value !== undefined)) props.push(`flashFormat={${layoutLiteral(format.flash)}}`);
    // `formatted_text` and `html` put their caption into `htmlText`.
    if (el.tag === 'formatted_text' || el.tag === 'html') props.push('markup');
    // `auto_size="none"` (the default) forces the field to the window's box, so what does not
    // fit is cut off; with `overflow_replace` the caption is shortened to fit instead, which
    // `refreshTextImage` does for `none` and `right` only.
    if (!label && autoSizeVar === 'none') props.push('clip');
    if (!label && el.vars.overflow_replace && (autoSizeVar === 'none' || autoSizeVar === 'right')) {
        const [ left, top, right, bottom ] = textMargins(el);

        props.push(`overflowReplace={${layoutLiteral({
            replace: quote(decode(el.vars.overflow_replace)),
            width: num(el.attrs.width) - left - right,
            height: num(el.attrs.height) - top - bottom,
            marginX: left + right,
            marginY: top + bottom,
        })}}`);
    }
    props.push(...dynamicRoleProp(el));
    if (hasText) ctx.imports.add('ThemeText');

    return { props, hasText, wordWrap, autoSize };
};

/** `text="..."` / `text={expr}` -> the bare JSX child a Region/Button wraps in its own ThemeText. */
const bareText = (textProp: string, indent: string): string[] => {
    const value = textProp.slice(5);

    return [ `${indent}${value.startsWith('{') ? value : jsxText(quote(value.slice(1, -1)))}` ];
};

/**
 * A text as a button's caption: no positioning wrapper, the button's own flex centring places
 * it. When the text brings nothing the button doesn't already apply (its variant's text style,
 * or the same `text_style` the button itself declares) it's emitted as a plain child - the
 * button wraps bare text in a `ThemeText` with its own style.
 */
const emitInlineText = (ctx: EmitContext, el: Element, button: Element, indent: string): string[] => {
    const { props, hasText } = textElement(ctx, el, button.attrs.name);

    if (!hasText) return [];

    const textProp = props.find(prop => prop.startsWith('text='))!;
    const styleProp = props.find(prop => prop.startsWith('textStyle='));
    const buttonStyle = resolveTextStyle(button.vars.text_style) ?? themeTextStyle(button);
    const redundantStyle = !styleProp || styleProp === `textStyle="${buttonStyle}"`;
    const plain = props.length === 1 + (styleProp ? 1 : 0) && redundantStyle;

    return plain ? bareText(textProp, indent) : openTag('ThemeText', props, indent, true);
};

/** A single text child that covers its container exactly - the container's box can hold the text directly. */
const fillsHost = (child: Element, host: Element): boolean =>
    num(child.attrs.x) === 0 && num(child.attrs.y) === 0 && num(child.attrs.width) === num(host.attrs.width) && num(child.attrs.height) === num(host.attrs.height);

/**
 * A text element: one `Region` (the positioned, aligning box) holding the `ThemeText`. With a
 * `host` - a container whose only child is this text, filling it - the host's own Region carries
 * the text instead of nesting two boxes.
 */
/** Does a text/bitmap box need a `Region` of its own (something only a container can carry)? */
const needsRegion = (ctx: EmitContext, box: Element, el: Element, host: Element | undefined): boolean => {
    if (dropShadowProp(box).length || box.attrs.blend) return true;
    if (el.tag === 'link') return true;
    if (host && (host.tag === 'region' || host.tag === 'container') && host.attrs.name && (host.params & PARAM.INPUT)) return true;
    if (textMargins(el).some(Boolean)) return true;

    return !!fillOf(box);
};

/** A text's `textMargins` as the padding of the box that holds it - only the sides that have one. */
const marginPadding = (el: Element): Record<string, number | undefined> => {
    const [ left, top, right, bottom ] = textMargins(el);

    return { paddingLeft: left || undefined, paddingTop: top || undefined, paddingRight: right || undefined, paddingBottom: bottom || undefined };
};

/** A window's `fillOf` as `Region` props, the colour overridable where a `RECOLORABLE_*` tag says so. */
const fillProps = (ctx: EmitContext, el: Element): string[] => {
    const fill = fillOf(el);

    if (!fill) return [];

    return [ jsxAttr('backgroundColor', recolorExpr(ctx, el, fill.color)!), ...(fill.alpha < 1 ? [ `backgroundAlpha={${fill.alpha}}` ] : []) ];
};

/**
 * A text's `margins` (`TextController`'s `margin_left/top/right/bottom`, all 0 by default): the
 * `TextField` sits that far inside the window. Left, top, right, bottom.
 */
const textMargins = (el: Element): [ number, number, number, number ] =>
    [ num(el.vars.margin_left), num(el.vars.margin_top), num(el.vars.margin_right), num(el.vars.margin_bottom) ];

const emitText = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string, host?: Element): string[] => {
    const box = host ?? el;
    const { props: textProps, hasText, wordWrap, autoSize } = textElement(ctx, el, parent.name);

    // The common case: the text IS the box. `ThemeText` positions itself with `layout` and
    // aligns the rendered text inside it (`textOptions.align` / `verticalAlign`), so the
    // Region that used to hold it is one container fewer per label.
    if (hasText && !needsRegion(ctx, box, el, host)) {
        const props = [
            ...textProps,
            ...metaProps(ctx, box),
            // `TextSkinRenderer` / `LabelRenderer` draw the field at the top margin, never centred.
            'verticalAlign="top"',
            `layout={${boxLayout(box, parent, {}, { autoSize: !host })}}`,
        ];

        return openTag('ThemeText', props, indent, true);
    }

    ctx.imports.add('Region');

    // A text field has its own graphic context, so its `blend` always applies; a host
    // container's only when it has its own too.
    const regionProps = [
        ...metaProps(ctx, box),
        ...dropShadowProp(box),
        ...(host ? blendProp(host) : []),
        ...((!host || !(host.params & PARAM.PARENT_GC)) ? alphaProp(box) : []),
        `layout={${boxLayout(box, parent, { flexDirection: '\'row\'', alignItems: '\'flex-start\'', justifyContent: AUTO_SIZE_JUSTIFY[autoSize], ...marginPadding(el) }, { autoSize: !host })}}`,
    ];

    if (el.tag === 'link') {
        regionProps.push(`onPointerTap={${handlerProp(ctx, el, 'link')}}`);
        regionProps.push('cursor="pointer"');
    } else if (host && (host.tag === 'region' || host.tag === 'container') && host.attrs.name && (host.params & PARAM.INPUT)) {
        regionProps.push(`onPointerTap={${handlerProp(ctx, host, 'region')}}`);
        regionProps.push('cursor="pointer"');
    }

    regionProps.push(...fillProps(ctx, box));

    // A text with no style/options of its own is a bare child - the Region wraps it in a
    // default-styled ThemeText itself.
    const child = !hasText ? [] : textProps.length === 1 ? bareText(textProps[0], indent + INDENT) : openTag('ThemeText', textProps, indent + INDENT, true);

    return wrap('Region', regionProps, indent, child);
};

/**
 * The bitmap's own pixel size as the layout declares it - the discriminator between two libraries'
 * art of the same name (`resolveImage`). A stretched element (a 9-slice, a bar pulled across a
 * window) is drawn at a size that is not the art's, so it declares nothing.
 */
const declaredBitmapSize = (el: Element): { width: number; height: number } | undefined => {
    if (bool(el.vars.stretched_x) || bool(el.vars.stretched_y) || bool(el.vars.fit_size_to_contents) === false) return undefined;

    const width = num(el.attrs.width);
    const height = num(el.attrs.height);

    return width > 0 && height > 0 ? { width, height } : undefined;
};

/** A `Boolean` var as `XMLPropertyArrayParser` reads one: `"true"`, or an integer above 0. */
const flashBool = (value: string | undefined): boolean => value !== undefined && (value === 'true' || Math.trunc(Number(value)) > 0);

const PIVOT_NAMES = new Set([ 'top left', 'top center', 'top right', 'center left', 'center', 'center right', 'bottom left', 'bottom center', 'bottom right' ]);

/**
 * A bitmap window's `BitmapDataController` vars as `ThemeImage`'s `bitmap` object - only the ones
 * that differ from the defaults every theme gives (`ThemeManager`: stretched on both axes, zoom 1,
 * `top left`, no wrap, flip, turn or etching), since `FlashBitmap` fills in the same defaults. An
 * unknown pivot name is left out: the client's `PivotPoint` lookup finds nothing for it.
 */
const bitmapVars = (el: Element): string => {
    const v = el.vars;
    const fields: Record<string, string | number | undefined> = {};
    const flag = (key: string, field: string, fallback: boolean) => {
        if (v[key] !== undefined && flashBool(v[key]) !== fallback) fields[field] = String(!fallback);
    };
    const number = (key: string, field: string, fallback: number) => {
        if (v[key] !== undefined && Number.isFinite(Number(v[key])) && Number(v[key]) !== fallback) fields[field] = Number(v[key]);
    };

    flag('stretched_x', 'stretchedX', true);
    flag('stretched_y', 'stretchedY', true);
    number('zoom_x', 'zoomX', 1);
    number('zoom_y', 'zoomY', 1);
    if (v.pivot_point && PIVOT_NAMES.has(v.pivot_point) && v.pivot_point !== 'top left') fields.pivot = quote(v.pivot_point);
    flag('wrap_x', 'wrapX', false);
    flag('wrap_y', 'wrapY', false);
    flag('flip_x', 'flipX', false);
    flag('flip_y', 'flipY', false);
    number('rotation', 'rotation', 0);
    if (v.etching_color !== undefined && flashColor(v.etching_color)) fields.etchingColor = `0x${flashColor(v.etching_color).toString(16).toUpperCase().padStart(8, '0')}`;
    flag('fit_size_to_contents', 'fitSizeToContents', false);

    return Object.keys(fields).length ? layoutLiteral(fields) : '{}';
};

const emitBitmap = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string, host?: Element): string[] => {
    const assetName = el.vars.asset_uri ?? el.vars.bitmap_asset_name ?? '';
    const props = [ ...metaProps(ctx, host ?? el) ];
    let src: string | undefined;

    if (assetName.startsWith('${')) {
        // `${image.library.url}catalogue/icon_1.png` - resolved from config at runtime by the client.
        src = quote(assetName);
        ctx.warnings.push(`external image ${assetName}`);
    } else if (assetName) {
        const folder = assetFolder(ctx.file.folder);
        const file = resolveImage(assetName, folder, declaredBitmapSize(el));

        ctx.imports.add('layoutImage');
        // The component folder of a bitmap two layouts share is only known once every layout has
        // been read, so the call is written as a token and resolved in `resolveTokens`.
        src = `layoutImage(${quote(file ? `${IMAGE_TOKEN}${file}` : `${folder}/${assetName}.png`)})`;
    }

    const override = overrideProp(ctx, el, 'src', 'string', parent.name);

    if (override && src) props.push(`src={${override} ?? ${src}}`);
    else props.push(jsxAttr('src', override ?? src ?? 'undefined'));

    props.push(`bitmap={${bitmapVars(el)}}`);
    // `BitmapDataRenderer`: the bitmap drawn as luminance, then multiplied by the window colour.
    if (flashBool(el.vars.greyscale)) props.push('greyscale');

    const tint = hexColor(el.attrs.color);

    const tintOverride = el.tag === 'bitmap' ? overrideProp(ctx, el, 'tint', 'string', parent.name) : undefined;
    const tintExpr = recolorExpr(ctx, el, tint && tint !== '#ffffff' ? tint : undefined);

    if (tintOverride && tintExpr) props.push(`tint={${tintOverride} ?? ${tintExpr}}`);
    else if (tintOverride) props.push(`tint={${tintOverride}}`);
    else if (tintExpr) props.push(jsxAttr('tint', tintExpr));
    props.push(...blendProp(el), ...alphaProp(el), ...dynamicRoleProp(el), ...hitThresholdProp(el), ...dragProps(el, { target: false }));

    ctx.imports.add('ThemeImage');
    // `fit_size_to_contents` gives the window the bitmap's size (`FlashBitmap` sets it from the
    // texture); a reflect bit then carries that resize to the parent, and the resize alignment
    // decides which edge stays put.
    props.push(`layout={${boxLayout(host ?? el, parent, {}, { autoSize: !host })}}`);

    // Only a drop shadow needs a Region around the image.
    const image = openTag('ThemeImage', props, el.dropShadow ? indent + INDENT : indent, true);

    if (!el.dropShadow) return image;

    ctx.imports.add('Region');

    return wrap('Region', [ ...dropShadowProp(el), `layout={${boxLayout(el, parent)}}` ], indent, image);
};

/** A list's flow, with a selector list's `vertical` var turning it into a column. */
const listDirection = (el: Element): { direction: 'row' | 'column'; wrap?: boolean; scroll?: 'vertical' | 'horizontal' } => {
    const list = LIST_TAGS[el.tag];

    return (el.tag === 'selector_list' && flashBool(el.vars.vertical)) ? { ...list, direction: 'column' } : list;
};

const emitList = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const list = listDirection(el);
    const target = el.attrs.name ? ctx.scrollTargets.get(el.attrs.name) : undefined;
    const scroll = list.scroll ?? target?.orientation;
    const spacing = num(el.vars.spacing);
    const flowLayout: Record<string, string | number | undefined> = {
        flexDirection: `'${list.direction}'`,
        flexWrap: list.wrap ? '\'wrap\'' : undefined,
        gap: spacing || undefined,
    };

    ctx.imports.add('Region');

    const innerParent: ParentBox = { ...selfBox(el, true), direction: list.direction, wrap: !!list.wrap };
    const meta = [ ...metaProps(ctx, el), ...dropShadowProp(el) ];
    const background = fillProps(ctx, el);
    const contentIndent = scroll ? indent + INDENT : indent;
    const children = emitListChildren(ctx, el, innerParent, contentIndent + INDENT);

    if (!scroll) {
        // `resize_on_item_update` sets the reflect flag of the list's internal container on the
        // main axis, and the container is sized to its items on every arrange - so the list
        // takes exactly its items' extent, larger or smaller than the layout drew it.
        const fitsItems = flashBool(el.vars.resize_on_item_update);
        const layout = boxLayout(el, parent, flowLayout, { growsWithChildren: true, contentAxis: fitsItems ? (list.direction === 'column' ? 'height' : 'width') : undefined });

        return wrap('Region', [ ...meta, ...background, `layout={${layout}}` ], indent, children);
    }

    ctx.imports.add('ScrollArea');

    const content = wrap(
        'Region',
        [ ...meta, ...background, `layout={${layoutLiteral({ ...flowLayout, width: '\'100%\'' })}}` ],
        contentIndent,
        children,
    );

    // A `scrollable_*` list hides its bar while the items fit; a list a layout's own `scrollbar_*`
    // window drives keeps that window, disabled (`ScrollBarController.updateLiftSizeAndPosition`).
    const keepsDisabledBar = !list.scroll ? [ 'hideDisabledScrollbar={false}' ] : [];

    // A layout's own scrollbar beside the list: the ScrollArea spans both rects, the list's
    // viewport and the bar each placed at its own inside it, and the bar takes its window's style.
    if (target && target.parent?.children.includes(el) && !parent.flow) {
        const rect = (item: Element) => ({ x: num(item.attrs.x), y: num(item.attrs.y), width: num(item.attrs.width), height: num(item.attrs.height) });
        const own = rect(el);
        const bar = rect(target.bar);
        const union = { x: Math.min(own.x, bar.x), y: Math.min(own.y, bar.y) };
        const span = {
            ...union,
            width: Math.max(own.x + own.width, bar.x + bar.width) - union.x,
            height: Math.max(own.y + own.height, bar.y + bar.height) - union.y,
        };
        const spanEl: Element = { ...el, attrs: { ...el.attrs, x: String(span.x), y: String(span.y), width: String(span.width), height: String(span.height) } };
        const at = (box: { x: number; y: number; width: number; height: number }) => layoutLiteral({ position: '\'absolute\'', left: box.x - span.x, top: box.y - span.y, width: box.width, height: box.height });

        return wrap('ScrollArea', [
            `orientation="${scroll}"`,
            ...(target.bar.attrs.style !== undefined ? [ `variant="${target.bar.attrs.style}"` ] : []),
            ...keepsDisabledBar,
            `layout={${boxLayout(spanEl, parent)}}`,
            `viewportLayout={${at(own)}}`,
            `scrollbarLayout={${at(bar)}}`,
        ], indent, content);
    }

    // A `scrollable_*` list's own `style` is its scrollbar's skin (`ScrollableItemListWindow` builds
    // the bar in the list's style).
    const listVariant = (list.scroll && el.attrs.style !== undefined) ? [ `variant="${el.attrs.style}"` ] : [];

    return wrap('ScrollArea', [ `orientation="${scroll}"`, ...listVariant, ...keepsDisabledBar, `layout={${boxLayout(el, parent)}}` ], indent, content);
};

/**
 * A list's *named* children are the row templates the Flash code cloned per data item
 * (`removeListItemAt(0)` then `clone()` per entry - see e.g. FriendRequestsTab.as). Each becomes
 * its own exported sub-component, and the list gets an `items<ListName>` slot that replaces the
 * template rows with real data; unnamed children stay inline as plain static content.
 */
const emitListChildren = (ctx: EmitContext, list: Element, parent: ParentBox, indent: string): string[] => {
    const named = list.children.filter(child => child.attrs.name && !SKIPPED_TAGS.has(child.tag));

    if (!list.attrs.name) return emitChildren(ctx, list, parent, indent);

    // A named list with nothing in it was filled at runtime (`palette1`, `nfts`, ...) - it still
    // gets its `items<Name>` slot, just with no template rows to fall back on.
    if (!named.length) {
        if (list.children.length) return emitChildren(ctx, list, parent, indent);

        const slot = uniqueProp(ctx, `items${pascal(list.attrs.name)}`);

        ctx.props.set(slot, 'ReactNode');
        ctx.imports.add('ReactNode');

        return [ `${indent}{${slot}}` ];
    }

    const slot = uniqueProp(ctx, `items${pascal(list.attrs.name)}`);

    ctx.props.set(slot, 'ReactNode');
    ctx.imports.add('ReactNode');

    const templates = named.map(child => generateSubComponent(ctx.file, child, parent));
    const fallback = templates.map(name => `${indent}${INDENT}<${name} />`);
    const slotLines = [ `${indent}{${slot} ?? (`, ...(fallback.length === 1 ? fallback : [ `${indent}${INDENT}<>`, ...fallback.map(line => INDENT + line), `${indent}${INDENT}</>` ]), `${indent})}` ];
    const first = list.children.indexOf(named[0]);

    // The list keeps its XML order (a list draws and flows its children in that order): the
    // unnamed children before the first template stay before the slot, the rest after it.
    return list.children.flatMap((child, index) => {
        if (index === first) return slotLines;
        if (named.includes(child)) return [];

        return emit(ctx, child, parent, indent);
    });
};

const emitFrame = (ctx: EmitContext, el: Element, parent: ParentBox | undefined, indent: string): string[] => {
    ctx.imports.add('Frame');
    ctx.imports.add('Region');

    const caption = captionExpr(ctx, el.attrs.caption);
    const props = [ ...variantProp(el), ...(el.attrs.name ? [ `id=${jsxStr(el.attrs.name)}` ] : []), ...metaProps(ctx, el) ];

    if (caption) props.push(`caption=${caption.startsWith('\'') ? jsxStr(decode(el.attrs.caption ?? '')) : `{${caption}}`}`);

    props.push(...tintProp(ctx, el));
    // A frame only has a shadow when its layout gives it a `<DropShadowFilter>` - about half do.
    props.push(...(el.dropShadow ? dropShadowProp(el) : [ 'dropShadow={false}' ]));

    if (!parent) {
        ctx.props.set('onClose', '() => void');
        ctx.props.set('layout', 'BoxLayout');
        ctx.imports.add('BoxLayout');
        props.push('onClose={onClose}');

        const sizing = rootSizing(el);

        if (sizing.resizeDirection !== 'all') props.push(`resizeDirection="${sizing.resizeDirection}"`);
        props.push(`layout={${layoutLiteral(sizing.fields).replace(/ \}$/, ', ...layout }')}}`);
    } else {
        props.push(`onClose={${handlerProp(ctx, el, 'frameClose')}}`);
        props.push(`layout={${boxLayout(el, parent)}}`);
    }

    props.push(`margins={[ ${frameMargins(el).join(', ')} ]}`);
    // A frame is dragged by its header only when it is a `mouse_dragging_target`.
    if (!(el.params & PARAM.DRAG_TARGET)) props.push('draggable={false}');

    // Children go straight into the Frame's ContentArea: an absolutely positioned child is
    // placed from its parent's padding edge in both Yoga and CSS, so no relative wrapper is
    // needed - unless a child centres itself, which needs a flex parent of its own.
    const contentBox = frameContentBox(el);
    const content = centersHChild(el, contentBox)
        ? wrap('Region', [ `layout={${layoutLiteral({ position: '\'relative\'', flex: 1, width: '\'100%\'', ...centerExtra(el, contentBox) })}}` ], indent + INDENT, emitChildren(ctx, el, contentBox, indent + INDENT + INDENT))
        : emitChildren(ctx, el, contentBox, indent + INDENT);

    return wrap('Frame', props, indent, content);
};

const emitInput = (ctx: EmitContext, el: Element, parent: ParentBox, indent: string): string[] => {
    const stateName = uniqueProp(ctx, `${camel(el.attrs.name || 'input')}Value`);
    // The caption is the field's initial text (`WindowParser` -> `caption` -> `text`), localized.
    const initial = captionExpr(ctx, el.attrs.caption);

    ctx.states.push({ name: stateName, initial });
    ctx.imports.add('TextInput');

    const props = [
        `value={${stateName}}`,
        `onChange={set${pascal(stateName)}}`,
    ];

    if (el.vars.max_chars) props.push(`maxLength={${num(el.vars.max_chars)}}`);
    if (flashBool(el.vars.multiline)) props.push('multiline');
    // `password` windows show bullets (`display_as_password`, on by default for the type).
    if (el.tag === 'password' || flashBool(el.vars.display_as_password)) props.push('password');

    const textStyle = resolveTextStyle(el.vars.text_style) ?? themeTextStyle(el);
    const textColor = varApplies('text_color', el.vars.text_color) ? hexColor(el.vars.text_color) : undefined;
    const format = textFormatVars(el);

    if (textStyle !== 'regular') props.push(`textStyle="${textStyle}"`);
    if (format.options.fontFamily) props.push(`fontFamily={${format.options.fontFamily}}`);
    if (format.options.fontSize) props.push(`fontSize={${format.options.fontSize}}`);
    if (textColor) props.push(`textColor="${textColor}"`);
    // The `TextField` vars Pixi has no vocabulary for, exactly as a `<text>` carries them. An
    // input drops them at its peril: `chat_input`'s `antialias_type="advanced"` left out put the
    // field on `regular`'s `normal`, which is exact for the Volter faces alone, so its Ubuntu 17
    // fell all the way back to the browser's canvas text.
    if (Object.values(format.flash).some(value => value !== undefined)) props.push(`flashFormat={${layoutLiteral(format.flash)}}`);

    // The TextField is the whole window: text at its 2px gutter, never centred.
    props.push('flashPlacement');
    if (flashBool(el.vars.border)) props.push(`border="${hexColor(el.vars.border_color ?? '0x0')}"`);
    if (el.vars.restrict) props.push(`restrict=${jsxStr(decode(el.vars.restrict))}`);
    if (el.vars.editable !== undefined && !flashBool(el.vars.editable)) props.push('editable={false}');
    if (flashBool(el.vars.always_show_selection)) props.push('alwaysShowSelection');

    // An input fills only as any window does (`fillOf`), and the same with or without focus.
    const fill = fillOf(el);

    if (fill) props.push(`backgroundColor="${fill.color}"`, `focusedBackgroundColor="${fill.color}"`);
    else props.push('backgroundColor={null}', 'focusedBackgroundColor={null}');

    props.push(`layout={${boxLayout(el, parent)}}`);

    return openTag('TextInput', props, indent, true);
};

/** Components whose root Box takes `visible` directly (kept for hand-written views; generated code renders conditionally instead). */
export const VISIBLE_AWARE = new Set([ 'Border', 'Button', 'ButtonThick', 'CheckBox', 'RadioButton', 'TabButton', 'TabContent', 'TabContext', 'Dropmenu', 'Droplist', 'Bubble', 'CloseButton', 'ContainerButton', 'Scaler', 'Header', 'Tooltip' ]);

const emitThemed = (ctx: EmitContext, component: string, el: Element, parent: ParentBox, indent: string, extraProps: string[], children: (childIndent: string) => string[], options: { tint?: boolean } = {}): string[] => {
    ctx.imports.add(component);

    const props = [ ...variantProp(el), ...metaProps(ctx, el), ...(options.tint === false ? [] : tintProp(ctx, el)), ...extraProps ];
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
    /** The widget's components (root first) with `token` standing in for the final name. */
    parts: { name: string; code: string }[];
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
        file.subComponents.push({ name: draft, code: [
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
        ].join('\n') });
    } else {
        file.imports.add('CatalogWidgetFlags');
        generateSubComponent(file, el, { ...parent, omitPlacement: true }, 'region', draft, 'CatalogWidgetFlags');
    }

    const code = file.subComponents.map(part => part.code).join('\n');
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

        // The root part is the widget itself; it comes last (nested parts are pushed first) - put it first.
        const parts = file.subComponents.map(part => ({ name: part.name.split(draft).join(token), code: part.code.split(draft).join(token) }));
        const rootIndex = parts.findIndex(part => part.name === token);

        if (rootIndex > 0) parts.unshift(...parts.splice(rootIndex, 1));

        variants.set(hash, variant = { token, parts, uses: 0, imports: file.imports, sharedImports: file.sharedImports, subComponentProps, pages: [], wraps });
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
        const override = el.attrs.name && (hidden || tag === 'bubble' || (ctx.rowTemplate && !asRoot)) ? overrideProp(ctx, el, 'visible', 'boolean', parent.name) : undefined;
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
    const buttonChildren = (ci: string) => (allTexts ? el.children.flatMap(child => emitInlineText(ctx, child, el, ci)) : childrenOnly(ci));
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

            // Likewise a container holding only a bitmap that fills it: the image is the box.
            if (el.children.length === 1 && (el.children[0].tag === 'bitmap' || el.children[0].tag === 'static_bitmap') && fillsHost(el.children[0], el)
                && el.children[0].attrs.visible !== 'false' && !el.children[0].dropShadow && !needsRegion(ctx, el, el.children[0], el) && !(el.attrs.name && (el.params & PARAM.INPUT))) {
                return emitBitmap(ctx, el.children[0], parent, indent, el);
            }

            // An empty named container was a runtime mount point (`maincontent`, `sideContainer`,
            // `figureContainer`) - expose it as a children slot named after it.
            let slotChild: string[] = [];

            if (el.attrs.name && el.children.length === 0) {
                const slot = uniqueProp(ctx, camel(el.attrs.name));

                ctx.props.set(slot, 'ReactNode');
                ctx.imports.add('ReactNode');
                slotChild = [ `${childIndent}{${slot}}` ];
            }

            // `GradientController`: two ARGB stops along `direction`, drawn over the whole window.
            if (tag === 'gradient') {
                ctx.imports.add('Gradient');

                const gradientProps = [
                    ...metaProps(ctx, el),
                    ...(el.vars.color1 !== undefined ? [ `color1={0x${flashColor(el.vars.color1).toString(16).toUpperCase().padStart(8, '0')}}` ] : []),
                    ...(el.vars.color2 !== undefined ? [ `color2={0x${flashColor(el.vars.color2).toString(16).toUpperCase().padStart(8, '0')}}` ] : []),
                    ...(el.vars.mode === 'radial' ? [ 'mode="radial"' ] : []),
                    ...(el.vars.direction && el.vars.direction !== 'down' ? [ `direction="${el.vars.direction}"` ] : []),
                    ...alphaProp(el),
                    ...blendProp(el),
                    `layout={${boxLayout(el, parent, centerExtra(el))}}`,
                ];

                return wrap('Gradient', gradientProps, indent, emitChildren(ctx, el, selfBox(el), childIndent));
            }

            ctx.imports.add('Region');

            const props = [ ...metaProps(ctx, el), ...dropShadowProp(el), ...blendProp(el), ...dynamicRoleProp(el), ...dragProps(el, { target: true }) ];

            if (tag === 'boxsizer') {
                const sizer = boxSizerLayout(el);
                const sizerParent: ParentBox = { ...selfBox(el, true), direction: sizer.direction, sizer: true };

                props.push(...fillProps(ctx, el));

                return wrap('Region', [ ...props, `layout={${boxLayout(el, parent, sizer.fields)}}` ], indent, el.children.flatMap(child => emit(ctx, child, sizerParent, childIndent)));
            }
            props.push(...fillProps(ctx, el));
            // Only a container with its own graphic context composites at its `blend`.
            if (!(el.params & PARAM.PARENT_GC)) props.push(...alphaProp(el));

            // A named `region` with the low `params` bit set is a click target in the Flash client
            // (the me-menu tiles, `click_area_discard`, `region_profile`, ...) - see e.g.
            // MeMenuMainView.as/FriendRequestsTab.as listening for WME_CLICK on them by name.
            if ((tag === 'region' || tag === 'container') && el.attrs.name && (el.params & PARAM.INPUT)) {
                props.push(`onPointerTap={${handlerProp(ctx, el, 'region')}}`);
                // `MouseEventProcessor` shows an interactive window's state cursor unless `interactive_cursor_disabled`.
                props.push(flashBool(el.vars.interactive_cursor_disabled) ? 'cursor="default"' : 'cursor="pointer"');
            }

            return wrap('Region', [ ...props, `layout={${boxLayout(el, parent, centerExtra(el))}}` ], indent, [ ...slotChild, ...emitChildren(ctx, el, selfBox(el), childIndent) ]);
        }
        case 'border': {
            // The skin's buffer is filled with the window's colour before the skin draws over it
            // (`WindowRendererItem.render`), which is the ARGB colour only with `background` on.
            const fill = fillOf(el);
            const extra = [
                ...(el.attrs.blend ? [ `blend={${num(el.attrs.blend)}}` ] : []),
                ...(fill ? [ `backgroundColor="${fill.color}"` ] : []),
                ...(fill && fill.alpha < 1 ? [ `backgroundAlpha={${fill.alpha}}` ] : []),
            ];

            // `background="true"` turns the client's skin colourising off (`BitmapSkinRenderer.draw`): the colour then only fills.
            return emitThemed(ctx, 'Border', el, parent, indent, extra, childrenOnly, { tint: el.attrs.background !== 'true' });
        }
        case 'button':
        case 'button_thick':
        case 'button_group_left':
        case 'button_group_center':
        case 'button_group_right': {
            const component = { button: 'Button', button_thick: 'ButtonThick', button_group_left: 'ButtonGroupLeft', button_group_center: 'ButtonGroupCenter', button_group_right: 'ButtonGroupRight' }[tag]!;
            const textStyle = resolveTextStyle(el.vars.text_style);
            const extra = [ `onPointerTap={${handlerProp(ctx, el, tag)}}`, ...(textStyle ? [ `textStyle="${textStyle}"` ] : []) ];

            return emitThemed(ctx, component, el, parent, indent, extra, captionAndButtonChildren);
        }
        // A container button's face is its children - the client never rendered its own
        // `caption` (the skin has no label), so only the children are emitted.
        case 'container_button':
            return emitThemed(ctx, 'ContainerButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], buttonChildren);
        // `iconbutton` has its own skin per intent (style 3 plus, 4 minus) and draws no children.
        case 'iconbutton':
            return emitThemed(ctx, 'IconButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], none);
        case 'closebutton':
            return emitThemed(ctx, 'CloseButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'close')}}` ], none);
        // Only the illumina checkboxes and radio button have a `window_layout` - a label beside the
        // box. The classic ones (styles 0-2) are the 15px box alone and draw no caption.
        case 'checkbox':
        case 'radiobutton': {
            const labelled = num(el.attrs.style) >= 100 && num(el.attrs.style) < 200;

            return emitThemed(ctx, tag === 'checkbox' ? 'CheckBox' : 'RadioButton', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, tag)}}` ], labelled ? captionOnly : none);
        }
        case 'tab_button':
        case 'tab_container_button': {
            const selected = ctx.tabSelectedProp && el.attrs.name ? [ `selected={${ctx.tabSelectedProp} === ${quote(el.attrs.name)}}` ] : [];

            // A tab_container_button's face is its children (like container_button).
            return emitThemed(ctx, 'TabButton', el, parent, indent, [ ...selected, `onPointerTap={${handlerProp(ctx, el, 'tab')}}` ], tag === 'tab_button' ? captionAndButtonChildren : buttonChildren);
        }
        case 'tab_context': {
            // The selected tab is state the caller owns: `selected<Context>` names it, each tab
            // button compares its own name against it (the client's TabContext selector).
            const selectedProp = uniqueProp(ctx, `selected${pascal(el.attrs.name || 'tab')}`);

            ctx.props.set(selectedProp, 'string');

            const previous = ctx.tabSelectedProp;

            ctx.tabSelectedProp = selectedProp;

            const lines = emitThemed(ctx, 'TabContext', el, parent, indent, [], childrenOnly);

            ctx.tabSelectedProp = previous;

            return lines;
        }
        case 'tab_content':
            return emitThemed(ctx, 'TabContent', el, parent, indent, [], childrenOnly);
        case 'dropmenu': {
            // `item_array` populates the menu (`DropMenuController.populate`): one item per string,
            // its index the item id, and nothing selected.
            const items = el.arrays.item_array;

            if (!items?.length) return emitThemed(ctx, 'Dropmenu', el, parent, indent, [ `onPointerTap={${handlerProp(ctx, el, 'dropmenu')}}` ], captionOnly);

            const selectProp = uniqueProp(ctx, `onSelect${pascal(el.attrs.name || 'dropmenu')}`);

            ctx.props.set(selectProp, '(index: number) => void');

            const labels = items.map(item => captionExpr(ctx, item) ?? '\'\'');

            return emitThemed(ctx, 'Dropmenu', el, parent, indent, [
                `options={[ ${labels.join(', ')} ].map((label, index) => ({ key: index, label, onSelect: () => ${selectProp}?.(index) }))}`,
            ], captionOnly);
        }
        case 'droplist':
            return emitThemed(ctx, 'Droplist', el, parent, indent, [], captionOnly);
        case 'bubble': {
            const direction = el.vars.direction?.split('_')[0];
            const pointer = direction && [ 'up', 'down', 'left', 'right' ].includes(direction) ? [ `pointer="${direction}"` ] : [];

            // `margin_*` place the content (`FrameController.margins`), `pointer_offset` the pointer.
            // The content box is `habbo_window_layout_bubble(_7)`'s `_CONTENT` rect (8 all round,
            // 8/8/10/10 for style 7) under any `margin_*` of the bubble's own - always passed, so the
            // bubble is laid out as the Flash window rather than around its content.
            const defaults = el.attrs.style === '7' ? [ 8, 8, 10, 10 ] : [ 8, 8, 8, 8 ];
            const [ left, top, right, bottom ] = [ 'margin_left', 'margin_top', 'margin_right', 'margin_bottom' ].map((key, index) => num(el.vars[key], defaults[index]));
            const bubbleMargins = [ `margins={[ ${[ left, top, right, bottom ].join(', ')} ]}` ];
            const offset = num(el.vars.pointer_offset) ? [ `pointerOffset={${num(el.vars.pointer_offset)}}` ] : [];
            // The children sit in the content box, as a frame's do.
            const contentBox: ParentBox = { width: num(el.attrs.width) - left - right, height: num(el.attrs.height) - top - bottom, flow: false, name: el.attrs.name };

            // A bubble has its own graphic context: its `blend` fades the whole bubble.
            return emitThemed(ctx, 'Bubble', el, parent, indent, [ ...pointer, ...bubbleMargins, ...offset, ...alphaProp(el) ], ci => emitChildren(ctx, el, contentBox, ci));
        }
        case 'icon':
            return emitThemed(ctx, 'Icon', el, parent, indent, [ ...alphaProp(el), ...dynamicRoleProp(el) ], none);
        case 'widget': {
            ctx.imports.add('WidgetSlot');

            const { widget_type: widgetType, ...rest } = el.vars;
            const props = [ `widgetType=${jsxStr(widgetType ?? '')}`, ...metaProps(ctx, el) ];
            const options = Object.entries(rest);

            if (options.length) props.push(`options={{ ${options.map(([ key, value ]) => `${/^[A-Za-z_$][\w$]*$/.test(key) ? key : quote(key)}: ${quote(value)}`).join(', ')} }}`);

            props.push(`layout={${boxLayout(el, parent, centerExtra(el))}}`);

            // The client filled the widget at runtime - the caller renders it through a slot named after it.
            const slot = uniqueProp(ctx, camel(el.attrs.name || `${widgetType ?? 'widget'}Widget`));

            ctx.props.set(slot, 'ReactNode');
            ctx.imports.add('ReactNode');

            return wrap('WidgetSlot', props, indent, [ `${childIndent}{${slot}}`, ...emitChildren(ctx, el, selfBox(el), childIndent) ]);
        }
        case 'shape': {
            ctx.imports.add('Shape');

            const props = [ ...metaProps(ctx, el) ];

            if (el.vars.shape) props.push(`shape="${el.vars.shape}"`);

            const color = hexColor(el.attrs.color);
            const stroke = hexColor(el.vars.stroke_color);

            if (color) props.push(jsxAttr('color', recolorExpr(ctx, el, color)!));
            if (stroke) props.push(`strokeColor="${stroke}"`);
            if (el.vars.stroke_thickness) props.push(`strokeThickness={${num(el.vars.stroke_thickness)}}`);
            if (el.vars.radius) props.push(`radius={${num(el.vars.radius)}}`);
            // `ShapeSkinRenderer`: a non-zero shade derives the stroke from the fill (`HsvLayerColor`).
            if (num(el.vars.stroke_hsv_shade)) props.push(`strokeHsvShade={${num(el.vars.stroke_hsv_shade)}}`);
            props.push(...alphaProp(el), ...blendProp(el));

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

/** A layout's `scrollbar_*` window, by the name of the list its `scrollable` var drives. */
interface ScrollTarget {
    orientation: 'vertical' | 'horizontal';
    bar: Element;
    /** The window holding the bar - the list shares it when the two can be placed side by side. */
    parent?: Element;
}

const collectScrollTargets = (el: Element, targets: Map<string, ScrollTarget>, parent?: Element) => {
    if ((el.tag === 'scrollbar_vertical' || el.tag === 'scrollbar_horizontal') && el.vars.scrollable) {
        targets.set(el.vars.scrollable, { orientation: el.tag === 'scrollbar_vertical' ? 'vertical' : 'horizontal', bar: el, parent });
    }

    for (const child of el.children) collectScrollTargets(child, targets, el);
};

const THEME_IMPORTS = new Set([
    'Border', 'BoxLayout', 'Bubble', 'BubblePointer', 'Button', 'ButtonGroupCenter', 'ButtonGroupLeft', 'ButtonGroupRight', 'ButtonThick', 'CheckBox', 'CloseButton',
    'ContainerButton', 'Droplist', 'Dropmenu', 'Frame', 'FramePointerDown', 'Gradient', 'Header', 'Icon', 'RadioButton', 'Region', 'Scaler', 'ScrollArea',
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
    for (const state of ctx.states) lines.push(`${INDENT}const [ ${state.name}, set${pascal(state.name)} ] = useState(${state.initial ?? '\'\''});`);
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

    ctx.rowTemplate = kind === 'item';

    const body = emit(ctx, el, { ...parent, spreadLayout: true }, INDENT + INDENT, true);
    const doc = kind === 'item'
        ? `/** Row template \`${el.attrs.name ?? el.tag}\` of ${file.componentName} - pass real rows through its \`items…\` slot. */`
        : `/** Named region \`${el.attrs.name}\` of ${file.componentName} - configured through the parent's \`${camel(el.attrs.name ?? '')}\` prop. */`;

    const assembled = assembleComponent(ctx, name, doc, body, extendsType);

    file.subComponents.push({ name, code: assembled.lines.join('\n') });
    file.subComponentProps[name] = { props: assembled.props, nested: assembled.nested };

    return name;
};

interface GeneratedComponent {
    /** The layout's components, main first - written as one file, or one file each under a folder when there are sub-components. */
    parts: { name: string; code: string }[];
    imports: Set<string>;
    sharedImports: Set<string>;
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

    const themeImports = [ ...imports ].filter(name => THEME_IMPORTS.has(name)).sort(importSort);

    if (themeImports.length) lines.push(`import { ${themeImports.join(', ')} } from '#base/theme';`);
    const assetImports = [ 'CatalogWidgetFlags', 'layoutImage' ].filter(name => imports.has(name));

    if (assetImports.length) lines.push(`import { ${assetImports.join(', ')} } from '#base/views/layouts/layoutAssets';`);
    for (const token of [ ...sharedImports ].sort(importSort)) lines.push(`import { ${token}, ${token}Props } from '#base/views/layouts/${WIDGETS_FOLDER}/${token}';`);

    return lines;
};

const generateComponent = (componentName: string, sourceFile: string, root: XmlNode, folder: string): GeneratedComponent => {
    const windows = root.children.filter(child => child.tag === 'window');
    const elements = windows.flatMap(window => window.children.flatMap((child) => {
        if (child.tag === 'children') return child.children.map(node => toElement(node));
        if (child.tag === 'filters' || child.tag === 'variables' || child.tag === 'scale') return [];

        return [ toElement(child) ];
    }));
    const file: FileContext = { componentName, folder, imports: new Set(), sharedImports: new Set(), scrollTargets: new Map<string, ScrollTarget>(), warnings: [], subComponents: [], subComponentNames: [], subComponentProps: {} };
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
            [ ...rootProps, `layout={${layoutLiteral({ position: '\'relative\'', width, height, minWidth: root.attrs.width_min ? num(root.attrs.width_min) : undefined, maxWidth: root.attrs.width_max ? num(root.attrs.width_max) : undefined, minHeight: root.attrs.height_min ? num(root.attrs.height_min) : undefined, maxHeight: root.attrs.height_max ? num(root.attrs.height_max) : undefined }).replace(/ \}$/, ', ...layout }')}}` ],
            bodyIndent,
            elements.flatMap(el => emit(ctx, el, { width, height, flow: false }, bodyIndent + INDENT)),
        );
    }

    const doc = `/** Generated from \`${sourceFile}\` (layout "${root.attrs.name ?? ''}", ${width}x${height}) by scripts/generate-layout-views.ts - do not edit by hand. */`;
    const main = assembleComponent(ctx, componentName, doc, body);
    const parts = [ { name: componentName, code: main.lines.join('\n') }, ...file.subComponents ];

    return { parts, imports: file.imports, sharedImports: file.sharedImports, props: main.props, nested: main.nested, subComponentProps: file.subComponentProps, rootIsFrame, subComponents: file.subComponentNames, warnings: file.warnings };
};

// ---------------------------------------------------------------------------------------------
// AS3 cross-reference - which decompiled client classes build each layout (`buildFromXML` of a
// `<name>_xml` asset, or `getAssetByName("<name>")`), for the registry / layout browser.
// ---------------------------------------------------------------------------------------------

const AS3_DIR = AS3_ROOT;

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

for (const { name, component } of RUNTIME_IMAGES) resolveImage(name, component);

interface Source { library: string; base: string; file: string; root: XmlNode; xml: string }

/** `habbo-room-ui-com` -> `roomui` - the short tag that tells two libraries' same-named layouts apart. */
const libraryTag = (component: string): string => component.replace(/^habbo-/, '').replace(/-com$/, '').replace(/-/g, '');

const sources: Source[] = [];

for (const component of RESOURCE_COMPONENTS) {
    for (const file of resourceFiles(component)) {
        if (!file.endsWith('.xml') || file.endsWith('/_manifest.xml')) continue;

        const text = readFileSync(resourcePath(file), 'utf8');
        const root = parseXml(text);

        if (root?.tag !== 'layout') continue;

        // The XML this layout was generated from, recorded in the registry so
        // `scripts/drift/layouts.py` can tell a conversion that is in step with the reference
        // material from one a client refresh left behind.
        sources.push({
            library: component,
            base: assetNameOf(file.slice(component.length + 1)).replace(/_xml$/, ''),
            file,
            root,
            xml: createHash('sha1').update(text).digest('hex').slice(0, 12),
        });
    }
}

sources.sort((a, b) => a.base.localeCompare(b.base) || a.library.localeCompare(b.library));

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
/** Import path (under views/layouts, no extension) of every written component, for cross-file imports. */
const componentPath = new Map<string, string>();
/** Final name of each shared-widget placeholder token, filled in once every page has been generated. */
const tokenNames = new Map<string, string>();
/** Import path of each widget token (`catalog/widgets/PurchaseWidget`, or `.../PurchaseWidget2/PurchaseWidget2` when it has sub-components). */
const tokenPaths = new Map<string, string>();

/**
 * Writes a layout (or shared widget) as one file per component: a layout with no
 * sub-components is `<dir>/<Main>.tsx`; one with sub-components gets its own folder,
 * `<dir>/<Main minus 'Layout'>/<Main>.tsx` + one file per sub-component, each importing the
 * siblings it references. Every file starts from the layout's full import set - eslint's
 * unused-import fixer prunes what a given file doesn't use. Returns the main component's path.
 */
const writeComponentFiles = (dir: string, parts: { name: string; code: string }[], imports: Set<string>, sharedImports: Set<string>, extraImports: string[], doc: string[] = []): string => {
    const main = parts[0].name;
    const subdir = parts.length > 1 ? `${dir}/${main.replace(/Layout$/, '') || main}` : dir;

    for (const part of parts) {
        const path = `${subdir}/${part.name}`;
        // Comments mention components they don't render (`rendered by that list's ScrollArea`) - match code only.
        const codeOnly = part.code.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/\/\*\*[\s\S]*?\*\//g, '');
        const uses = (name: string) => new RegExp(`\\b${name}\\b`).test(codeOnly);
        // Each file imports only what its own code references (the layout-wide sets are a superset).
        const partImports = new Set([ ...imports ].filter(name => uses(name) || (name === 'useTranslation' && uses('t'))));
        const partShared = new Set([ ...sharedImports ].filter(token => uses(token) || uses(tokenNames.get(token) ?? token)));
        // Only real usage counts (a JSX tag or the Props type) - doc comments mention the parent layout by name too.
        const siblings = parts.filter(other => other !== part && new RegExp(`<${other.name}\\b|\\b${other.name}Props\\b`).test(part.code));
        const header = [
            ...assembleImports(partImports, partShared),
            ...extraImports.filter((line) => {
                const imported = /import \{ (\w+)/.exec(line)?.[1];

                return imported ? uses(imported) : true;
            }),
        ];
        // Every `#base/...` import forms one group, ordered by module path the way simple-import-sort wants.
        const modulePath = (line: string) => /from '([^']+)'/.exec(line)?.[1] ?? '';
        const baseImports = header.filter(line => modulePath(line).startsWith('#base/')).sort((a, b) => importSort(modulePath(a), modulePath(b)));
        const lines = [
            ...header.filter(line => !baseImports.includes(line)),
            ...baseImports,
            ...(siblings.length ? [ '' ] : []),
            ...siblings.map(other => other.name).sort(importSort).map((name) => {
                const named = [ new RegExp(`<${name}\\b`).test(codeOnly) ? name : '', uses(`${name}Props`) ? `${name}Props` : '' ].filter(Boolean);

                return `import { ${named.join(', ')} } from './${name}';`;
            }),
            '',
            ...(part === parts[0] ? doc : []),
            part.code,
        ];

        pendingFiles.push({ path: join(OUT_DIR, `${path}.tsx`), code: lines.join('\n') });
        exports.push(path);
        componentPath.set(part.name, path);
    }

    return `${subdir}/${main}`;
};
const as3Usage = collectAs3Usage(new Set(sources.map(source => source.base)));
const registry: string[] = [];

const planned = sources.map((source) => {
    const suffix = (baseCounts.get(nameKey(source)) ?? 0) > 1 ? `_${libraryTag(source.library)}` : '';
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
    const { parts, imports, sharedImports, props, nested, subComponentProps, rootIsFrame, subComponents, warnings } = generateComponent(componentName, source.file, source.root, folder);

    generatedInfo.set(componentName, { props, nested, subComponentProps });

    const mainPath = writeComponentFiles(folder, parts, imports, sharedImports, []);

    const as3 = [ ...(usage?.classes ?? []) ].sort();
    const libraries = [ ...(usage?.libraries ?? []) ].sort();
    const size = `${num(source.root.attrs.width)}x${num(source.root.attrs.height)}`;

    registry.push([
        `${INDENT}{`,
        `${INDENT}${INDENT}name: ${quote(source.base)}, library: ${quote(source.library)}, xml: ${quote(source.xml)}, component: ${quote(componentName)}, size: ${quote(size)}, rootIsFrame: ${rootIsFrame},`,
        `${INDENT}${INDENT}props: [ ${props.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}nested: { ${Object.entries(nested).map(([ prop, component ]) => `${prop}: ${quote(component)}`).join(', ')} },`,
        `${INDENT}${INDENT}subComponents: [ ${subComponents.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}subComponentProps: { ${Object.entries(subComponentProps).map(([ name, info ]) => `${name}: { props: [ ${info.props.map(quote).join(', ')} ], nested: { ${Object.entries(info.nested).map(([ prop, component ]) => `${prop}: ${quote(component)}`).join(', ')} } }`).join(', ')} },`,
        `${INDENT}${INDENT}folder: ${quote(folder)}, libraries: [ ${libraries.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}as3: [ ${as3.map(quote).join(', ')} ],`,
        `${INDENT}${INDENT}load: () => import(${quote(`./${mainPath}`)}).then(module => module.${componentName}),`,
        `${INDENT}},`,
    ].join('\n'));

    for (const warning of warnings) warningCounts.set(warning, (warningCounts.get(warning) ?? 0) + 1);
}

// Every layout has been read, so which components name each bitmap - and with that its folder -
// is settled, and `resolveTokens` can fill the folder into the emitted `layoutImage()` calls.
placeImages();

// Name the shared widget variants - the most-used markup of a widget id gets the plain name
// (`PurchaseWidget`), the rest are numbered - then write their files and resolve the tokens.

/** LAYOUT_WIDGET_PROPS entries keyed by component name - several wrapper variants forward the same layout, so entries repeat. */
const widgetProps = new Map<string, string>();

for (const [ widgetName, variants ] of [ ...sharedWidgets.entries() ].sort(([ a ], [ b ]) => a.localeCompare(b))) {
    const ordered = [ ...variants.values() ].sort((a, b) => b.uses - a.uses || a.token.localeCompare(b.token));

    ordered.forEach((variant, index) => {
        const name = index === 0 ? widgetName : `${widgetName}${index + 1}`;

        tokenNames.set(variant.token, name);
        tokenPaths.set(variant.token, variant.parts.length > 1 ? `${WIDGETS_FOLDER}/${name}/${name}` : `${WIDGETS_FOLDER}/${name}`);
    });
}

const resolveTokens = (text: string): string => text
    .replace(/catalog\/widgets\/(__SHARED_\w+?_[0-9a-f]{8}__)'/g, (_, token: string) => `${tokenPaths.get(token) ?? `${WIDGETS_FOLDER}/${tokenNames.get(token)}`}'`)
    .replace(/__SHARED_\w+?_[0-9a-f]{8}__/g, token => tokenNames.get(token) ?? token)
    .replace(new RegExp(`${IMAGE_TOKEN}([^']+)`, 'g'), (_, file: string) => imagePath(file));

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
        const extraImports = variant.wraps
            ? [ `import { ${variant.wraps.componentName}, ${variant.wraps.componentName}Props } from '#base/views/layouts/${componentPath.get(variant.wraps.componentName) ?? `${variant.wraps.folder}/${variant.wraps.componentName}`}';` ]
            : [];
        const parts = variant.parts.map(part => ({ name: resolveTokens(part.name), code: resolveTokens(part.code) }));

        writeComponentFiles(WIDGETS_FOLDER, parts, variant.imports, variant.sharedImports, extraImports, doc);

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


writeFileSync(join(OUT_DIR, 'layoutAssets.ts'), [
    '/** Bitmaps referenced by the generated layouts - copied out of `scripts/images` by scripts/generate-layout-views.ts. */',
    '/** `file` is `<component>/<asset name>`, the way `src/theme/LayoutImage.ts` takes it. */',
    'export const layoutImage = (file: string): string => `./assets/${file}`;',
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
    `${INDENT}/** The \`flash-js-resources\` folder the layout came from - the client library that embeds it. */`,
    `${INDENT}library: string;`,
    `${INDENT}/** sha1 (12 hex) of the \`flash-js-resources\` XML this was converted from - \`scripts/drift/layouts.py\` compares it, so a refreshed client asset reads as drift until the layouts are regenerated. */`,
    `${INDENT}xml: string;`,
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
].join('\n').replace(/\{  \}/g, '{}').replace(/\[  \]/g, '[]'));

// Deliberately NO barrel index.ts: an `export *` over ~800 layout files puts every one of
// them into the static module graph of whoever imports it - none are side-effect-free as far
// as the bundler can prove, so tree-shaking keeps them all, and one convenience import once
// turned the entire lazily-registered catalogue into ~800 eagerly-fetched entry chunks
// (794 modulepreload links in the built index.html). Import a layout by its own path;
// everything else goes through `layoutRegistry`'s per-entry dynamic `load()`.

console.log(`Generated ${exports.length} layout components into ${OUT_DIR}`);

/** The bitmaps a previous run of this script copied, as `<component>/<file>` - everything else under the component folders is hand-placed. */
const owned = new Set<string>(Object.keys(existsSync(IMAGE_MANIFEST) ? JSON.parse(readFileSync(IMAGE_MANIFEST, 'utf8')).files ?? {} : {}));

/**
 * Every bitmap under the component folders right now, as `<component>/<file>`. Only those folders
 * are read: `public/assets` also holds the theme atlas, the fonts, the chat styles and the
 * currency art, none of which this script has any business listing - let alone pruning.
 */
const placedImages: string[] = [ ...new Set([ ...Object.values(ASSET_FOLDERS), SHARED_FOLDER, UNASSIGNED_FOLDER ]) ]
    .filter(folder => existsSync(join(IMAGE_OUT_DIR, folder)))
    .flatMap(folder => readdirSync(join(IMAGE_OUT_DIR, folder)).filter(file => /\.(png|gif|jpg)$/i.test(file)).map(file => `${folder}/${file}`));

/**
 * The bitmap already placed under this `<component>/<name>` (whatever its extension), or - for a
 * bare name, which is how the notification, trophy and variable-picker tables hold one - the first
 * component folder that has it.
 */
const placedImage = (name: string): string | undefined => (name.includes('/')
    ? [ 'png', 'gif', 'jpg' ].map(ext => `${name}.${ext}`).find(file => existsSync(join(IMAGE_OUT_DIR, file)))
    : placedImages.find(file => /^[^/]+\/(.+)\.(?:png|gif|jpg)$/i.exec(file)?.[1] === name));

/**
 * A bitmap the app names but this script did not write: it stays exactly as it is, and the prune
 * skips it. One this run did copy keeps its source, or the manifest would forget it owns the file.
 */
const keepPlaced = (file: string): void => { if (!copiedImages.has(file)) copiedImages.set(file, '(hand-placed)'); };

/**
 * Views written by hand draw these bitmaps as well, through the same `LayoutImage()` helper, and
 * no layout speaks for them - a room widget drawn against a Flash layout often needs a bitmap the
 * generated version of that layout never asked for. A name that resolves to a `scripts/images`
 * asset is copied if it is missing, into the component folder the call itself names; one already
 * placed that this script did not put there is left untouched, because its name may equally well
 * find an unrelated asset (token stripping makes `notifications_treasure_hunt_key_base` find
 * `treasure_hunt_key_base`) and the hand-placed file is the one the view was drawn against.
 *
 * Three shapes are read, because a bitmap is as often named away from the call: the literal call
 * (`LayoutImage('room-ui/icon_nft.png')`), any string literal that names a placed file (the
 * notification, trophy and variable-picker tables, which hold the bare Flash asset name), and the
 * literal head of a template (`LayoutImage(`wired/wired_misc_directional_system_${id}.png`)`),
 * which keeps every file that starts with it. The last is deliberately broad: keeping a stale
 * bitmap costs a few KB, deleting a live one breaks a view with no error anywhere.
 */
const protectHandWrittenImages = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);

        if (entry.isDirectory()) {
            protectHandWrittenImages(path);

            continue;
        }

        if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;

        const text = readFileSync(path, 'utf8');

        for (const match of text.matchAll(/\bLayoutImage\('([^']+)'\)/g)) {
            const path = match[1].replace(/\.(png|gif|jpg)$/i, '');
            const placed = placedImage(path);

            if (placed && !owned.has(placed)) keepPlaced(placed);
            // The call names `<component>/<file>`; `resolveImage` looks the asset up by its name
            // and takes the folder from the path it was asked for.
            else if (!resolveImage(path.slice(path.lastIndexOf('/') + 1), path)) unresolvedImages.add(path);
        }

        for (const match of text.matchAll(/['"`]([\w-]{4,}?)(?:\.(?:png|gif|jpg))?['"`]/g)) {
            const placed = placedImage(match[1]);

            if (placed && !owned.has(placed)) keepPlaced(placed);
        }

        // A template's head is `<component>/<stem>` in a hand-written view and a bare stem in a
        // table of asset names, so both the path and the file name are tried.
        for (const match of text.matchAll(/['"`]([\w/-]{6,})\$\{/g)) {
            for (const file of placedImages) {
                if ((file.startsWith(match[1]) || file.slice(file.indexOf('/') + 1).startsWith(match[1])) && !owned.has(file)) keepPlaced(file);
            }
        }
    }
};

protectHandWrittenImages(HAND_WRITTEN_DIR);

// A hand-written view may have claimed a bitmap no layout names; it decides its own folder.
placeImages();

let crops = 0;

for (const [ outName, job ] of imageJobs) {
    const out = join(IMAGE_OUT_DIR, imagePath(outName));

    mkdirSync(dirname(out), { recursive: true });

    if (job.region) {
        const image = await loadImage(resourcePath(job.source));
        const canvas = createCanvas(job.region.width, job.region.height);

        canvas.getContext('2d').drawImage(image, job.region.x, job.region.y, job.region.width, job.region.height, 0, 0, job.region.width, job.region.height);
        writeFileSync(out, canvas.toBuffer('image/png'));
        crops++;
    } else {
        copyFileSync(resourcePath(job.source), out);
    }

    copiedImages.set(imagePath(outName), job.source);
}

// Only what a previous run of this script put there is pruned, by the `<component>/<file>` path
// the manifest records. A hand-placed bitmap (the notification icons, the wired style sheets'
// crops, the stickie and trophy art - named at runtime out of a table, so no literal names them)
// is left alone: the earlier rule, "anything this run did not copy", deleted 111 of those the
// first time the prune actually ran. A file this run wrote to a different folder than last run's
// manifest names is stale under its old path and fresh under the new one.
const stale = [ ...owned ].filter(file => !copiedImages.has(file));
const handPlaced = placedImages.filter(file => !owned.has(file) && !copiedImages.has(file));

for (const file of stale) rmSync(join(IMAGE_OUT_DIR, file), { force: true });
if (stale.length) console.log(`Removed ${stale.length} stale images: ${stale.join(', ')}`);
if (handPlaced.length) console.log(`Kept ${handPlaced.length} hand-placed images no layout names (not in ${IMAGE_MANIFEST})`);

// `(hand-placed)` entries are in `copiedImages` to survive the prune, not because this script
// wrote them - listing one here would hand it to the next run to overwrite and then delete.
writeFileSync(IMAGE_MANIFEST, `${JSON.stringify({
    note: 'Written by scripts/generate-layout-views.ts: the layout bitmaps under public/assets/<component>/ that the generator owns, and may replace or prune, each with the scripts/images file it was copied (or cropped) from. Anything under those folders that this file does not list was placed by hand and the generator leaves it alone.',
    files: Object.fromEntries([ ...copiedImages ].filter(([ , source ]) => source !== '(hand-placed)').sort(([ a ], [ b ]) => a.localeCompare(b))),
}, null, 4)}\n`);

console.log(`Copied ${imageJobs.size} images into ${IMAGE_OUT_DIR} (${crops} cropped from manifest regions, ${unresolvedImages.size} referenced assets not found in scripts/images)`);
for (const name of [ ...unresolvedImages ].sort()) console.log(`  missing image: ${name}`);

// A name several libraries export different art under, that neither the client's own library
// table nor the layout's declared size settled. The pick is then arbitrary, and a wrong bitmap
// never fails - it just draws wrong - so every one of them is named here, and `scripts/drift/
// layout_images.py` holds them against `known.LAYOUT_IMAGES_AMBIGUOUS`.
if (ambiguousImages.size) console.log(`${ambiguousImages.size} ambiguous image name(s) - several libraries export different art under the name and neither the library table nor the declared size chose:`);
for (const [ name, info ] of [ ...ambiguousImages ].sort(([ a ], [ b ]) => a.localeCompare(b))) {
    console.log(`  ambiguous image: ${name} [${info.key}] declares ${info.declared}, candidates ${info.candidates.join(', ')} - kept ${info.chosen}`);
}

// A `font_face` the theme has no captured AIR bundle and no `.ttf` for. The var is emitted all
// the same - dropping it is the silent drift this table exists to stop - but the text renders in
// whatever face the browser substitutes, so the gap has to be visible.
for (const [ face, count ] of [ ...unportedFaces ].sort(([ a ], [ b ]) => a.localeCompare(b))) {
    console.log(`  unported font face: ${face} (${count} element(s)) - no captured bundle or .ttf in public/assets/fonts`);
}

for (const [ warning, count ] of [ ...warningCounts.entries() ].sort((a, b) => b[1] - a[1])) console.log(`  ${count}x ${warning}`);
