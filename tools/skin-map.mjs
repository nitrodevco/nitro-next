/**
 * The skin map: writes `skins.json` (`buildSkinMap` in nitro-theme `template/templateSkins.ts`) from
 * the published template bundles - every frame, border, button ... skin of the window manager
 * library's theme, the theme sheet sprites it draws with their sizes and nine-slice, and the template
 * windows (and their elements) that draw it. The client's build runs it (`vite.config.ts`'s `skinMap`, the
 * output's `skins.json`) and its development server on the first request; run it again when other
 * bundles are published. The extension inspector and the development build's overlay check read it.
 *
 * Beside it, `template-index.json`: every template window with its element tree - each element's key (what a
 * patch's `element` or a binding names it by), tag, name, style, rect, caption and the text keys it shows -
 * and the frames of the windows Nitro draws itself - and the window map (`tools/window-map.mjs`): the windows a player
 * sees, by area and friendly name, and the parts each draws inside. The admin panel's windows browser and theme
 * studio read both through the server, so a theme author finds a window's names there rather than in the client.
 *
 * The bundles come from `asset.bundles.templates` (`%libname%` the library) of the client's
 * `nitro-config.json`, or `--from`: that url form, or a folder of `<library>.nitro` files. The libraries
 * are the ones the client's source names (`habbo-<x>-com`, `-lib`), or `--libraries a,b`; one the
 * bundles do not have is listed and skipped.
 *
 *   node tools/skin-map.mjs                                  (writes packages/nitro-react/dist/skins.json)
 *   node tools/skin-map.mjs --from https://cdn.example.com/bundled/templates/%libname%.nitro
 *   node tools/skin-map.mjs --from ./bundles --out skins.json            (and template-index.json beside it, or --index <file>)
 *   node tools/skin-map.mjs --texts ./external_flash_texts.txt           (the window names' texts; default the config's gamedata.urls.externalTexts)
 */
import fs from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import zlib from 'node:zlib';

// The bundler resolves the source's extensionless relative imports; Node's own TypeScript loading needs the file name.
registerHooks({ resolve: (specifier, context, next) => {
    if (specifier.startsWith('.') && context.parentURL?.endsWith('.ts') && !/\.[cm]?[jt]sx?$/.test(specifier)) {
        const url = new URL(`${specifier}.ts`, context.parentURL);

        if (fs.existsSync(url)) return next(url.href, context);
    }

    return next(specifier, context);
} });

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { buildSkinMap, THEME_SKIN_LIBRARY } = await import(pathToFileURL(path.join(root, 'packages/nitro-theme/src/template/templateSkins.ts')).href);
const { templateElementKey } = await import(pathToFileURL(path.join(root, 'packages/nitro-theme/src/template/templateElementKey.ts')).href);
const { buildWindowMap, readTexts } = await import(pathToFileURL(path.join(root, 'tools/window-map.mjs')).href);

const args = process.argv.slice(2);
const option = (name) => {
    const at = args.indexOf(name);

    return (at >= 0) ? args[at + 1] : undefined;
};
const out = path.resolve(option('--out') ?? path.join(root, 'packages/nitro-react/dist/skins.json'));
const indexOut = path.resolve(option('--index') ?? path.join(path.dirname(out), 'template-index.json'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'packages/nitro-react/public/config/nitro-config.json'), 'utf8'));
const from = option('--from') ?? config['asset.bundles.templates'];
// The window names: the hotel's English texts (`key=value` lines), a file or an address.
const textsFrom = option('--texts') ?? config['gamedata.urls.externalTexts'];

if (!from) {
    console.error('No bundles: pass --from <url with %libname% | folder>, or set asset.bundles.templates in nitro-config.json.');
    process.exit(1);
}

/** The template libraries the client's source names. */
const sourceLibraries = () => {
    const names = new Set();
    const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        if (entry.isDirectory()) return walk(path.join(dir, entry.name));

        if (!/\.tsx?$/.test(entry.name)) return;

        for (const match of fs.readFileSync(path.join(dir, entry.name), 'utf8').matchAll(/\bhabbo-[a-z0-9-]+?-(?:com|lib)\b|\bhabbo-new-navigator\b/g)) names.add(match[0]);
    });

    [ 'packages/nitro-react/src', 'packages/nitro-theme/src' ].forEach(dir => walk(path.join(root, dir)));
    names.add(THEME_SKIN_LIBRARY);

    return [ ...names ].sort();
};

const libraries = option('--libraries')?.split(',').filter(Boolean) ?? sourceLibraries();

/**
 * The windows nitro-react draws with a `Frame` of its own (no template), by frame id, with the frame
 * styles each is drawn in: a `<Frame>`'s (or `<WiredTradingFrame>`'s, a style 3 frame) literal `id`
 * and `variant`; a wired window's `variant={frame.variant}` is each wired style's frame variant. An id
 * built at run time (`wired-reward-${...}`) is the pattern a patch names them all by (`wired-reward-*`).
 */
const sourceFrames = () => {
    const src = path.join(root, 'packages/nitro-react/src');
    const read = file => fs.readFileSync(file, 'utf8');
    const files = [];
    const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : /\.tsx?$/.test(entry.name) && files.push(path.join(dir, entry.name))));

    walk(src);

    const wiredStyles = [ ...new Set(files.filter(file => file.includes(`${path.sep}wired${path.sep}styles${path.sep}`)).flatMap(file => [ ...read(file).matchAll(/\bframe:\s*\{\s*variant:\s*'([^']+)'/g) ].map(match => match[1]))) ].sort();
    const found = {};

    for (const file of files) {
        for (const match of read(file).matchAll(/<(Frame|WiredTradingFrame)\s([\s\S]{0,600})/g)) {
            const attributes = match[2];
            const id = /\bid=(?:"([^"]+)"|\{`([^`]+)`\})/.exec(attributes);
            const name = id?.[1] ?? id?.[2]?.replace(/\$\{[^}]*\}/g, '*');

            if (!name) continue;

            const variant = (match[1] === 'WiredTradingFrame') ? [ '3' ] : /\bvariant="([^"]+)"/.exec(attributes)?.slice(1) ?? (/\bvariant=\{frame\.variant\}/.test(attributes) ? wiredStyles : []);

            found[name] = [ ...new Set([ ...(found[name] ?? []), ...variant ]) ].sort();
        }
    }

    return found;
};

/** A bundle's bytes, or `undefined` when there is none. */
const fetchBundle = async (library) => {
    if (/^https?:/i.test(from)) {
        const response = await fetch(from.replace('%libname%', library));

        return response.ok ? Buffer.from(await response.arrayBuffer()) : undefined;
    }

    const file = path.join(from, `${library}.nitro`);

    return fs.existsSync(file) ? fs.readFileSync(file) : undefined;
};

/** The JSON entries of a zip (a `.nitro` bundle), by name: its central directory read, each entry inflated. */
const zipJson = (bytes) => {
    const end = bytes.lastIndexOf(Buffer.from([ 0x50, 0x4b, 0x05, 0x06 ]));
    const count = bytes.readUInt16LE(end + 10);
    const files = {};
    let at = bytes.readUInt32LE(end + 16);

    for (let index = 0; index < count; index++) {
        const method = bytes.readUInt16LE(at + 10);
        const size = bytes.readUInt32LE(at + 20);
        const nameLength = bytes.readUInt16LE(at + 28);
        const extraLength = bytes.readUInt16LE(at + 30);
        const commentLength = bytes.readUInt16LE(at + 32);
        const local = bytes.readUInt32LE(at + 42);
        const name = bytes.toString('utf8', at + 46, at + 46 + nameLength);

        if (name.endsWith('.json')) {
            const start = local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28);
            const data = bytes.subarray(start, start + size);

            files[name] = JSON.parse(((method === 8) ? zlib.inflateRawSync(data) : data).toString('utf8'));
        }

        at += 46 + nameLength + extraLength + commentLength;
    }

    return files;
};

const templates = {};
const missing = [];
let theme;
let frames;

for (const library of libraries) {
    const bytes = await fetchBundle(library);

    if (!bytes) {
        missing.push(library);
        continue;
    }

    const files = zipJson(bytes);

    Object.assign(templates, files['templates.json']?.templates ?? {});

    if (library === THEME_SKIN_LIBRARY) {
        theme = files['theme-variants.json'];
        frames = files['theme_spritesheet.json']?.frames;
    }
}

if (!theme || !frames) {
    console.error(`${THEME_SKIN_LIBRARY}'s bundle has no theme (theme-variants.json, theme_spritesheet.json): nothing to map.`);
    process.exit(1);
}

/** The text keys a caption or a variable shows (`${earnings.title}`), each once. */
const textKeys = (values) => {
    const keys = [];

    for (const value of values) {
        if (typeof value !== 'string') continue;

        for (const match of value.matchAll(/\$\{([^${}]+)\}/g)) {
            if (!keys.includes(match[1])) keys.push(match[1]);
        }
    }

    return keys;
};

/**
 * `template-index.json`: each template window's element tree as a patch names it - every element's key
 * (`templateElementKey`; missing for one no key reaches), tag, name, style, tags, rect, caption, `hidden` and the
 * text keys its caption and variables show - and the frames Nitro draws without a template (frame id to its
 * styles). Keys are sorted, so the same bundles write the same file.
 */
const buildTemplateIndex = (nitroFrames, windowMap) => {
    const node = (element, chain) => {
        const at = [ ...chain, element ];
        const key = templateElementKey(at);
        const texts = textKeys([ element.caption, ...Object.values(element.vars ?? {}) ]);
        const children = element.children.map(child => node(child, at));

        return {
            ...((key !== undefined) ? { key } : {}),
            tag: element.tag,
            ...(element.name ? { name: element.name } : {}),
            ...((element.style !== undefined) ? { style: element.style } : {}),
            ...(element.tags?.length ? { tags: element.tags } : {}),
            rect: [ element.x, element.y, element.width, element.height ],
            ...(element.caption ? { caption: element.caption } : {}),
            ...(texts.length ? { texts } : {}),
            ...(element.hidden ? { hidden: true } : {}),
            ...(children.length ? { children } : {}),
        };
    };
    const windows = {};

    for (const id of Object.keys(templates).sort()) {
        const template = templates[id];

        // The window's root is its first element: the chain a key is counted from starts there.
        windows[id] = { name: template.name, width: template.width, height: template.height, elements: template.elements.map(element => node(element, [])) };
    }

    return { version: 1, templates: windows, frames: Object.fromEntries(Object.entries(nitroFrames).sort(([ a ], [ b ]) => a.localeCompare(b))), ...windowMap };
};

const nitroFrames = sourceFrames();
const map = buildSkinMap(theme, frames, templates, nitroFrames);
const text = `${JSON.stringify(map)}\n`;
const windowMap = buildWindowMap({ templates, src: path.join(root, 'packages/nitro-react/src'), nitroFrames, texts: await readTexts(textsFrom) });
const index = `${JSON.stringify(buildTemplateIndex(nitroFrames, windowMap))}\n`;
const summary = `${Object.keys(map.skins).length} skins, ${Object.keys(map.sprites).length} sprites, ${Object.keys(templates).length} templates of ${libraries.length - missing.length} libraries${missing.length ? ` (no bundle: ${missing.join(', ')})` : ''}, ${Object.keys(nitroFrames).length} frames of Nitro's own; ${Object.keys(windowMap.windows).length} windows, ${Object.keys(windowMap.parts).length} parts, ${windowMap.orphans.length} orphans, ${windowMap.unused.length} not drawn`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text);
fs.mkdirSync(path.dirname(indexOut), { recursive: true });
fs.writeFileSync(indexOut, index);
console.log(`wrote ${path.relative(process.cwd(), out)} (${(text.length / 1024).toFixed(0)} KiB) and ${path.relative(process.cwd(), indexOut)} (${(index.length / 1024).toFixed(0)} KiB) - ${summary}`);
