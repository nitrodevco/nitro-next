/**
 * Renders theme chrome PNGs out of the Flash client's skin definitions.
 *
 * A skin XML (`scripts/binaryData/*_habbo_skin_<name>_xml$*.bin`, `illumina_*_skin_*`) maps each
 * render state to a `<template>` (regions of a shared sheet PNG in `scripts/images`) plus a
 * `<layout>` (where each region sits in the assembled piece). This composes every state of the
 * skins listed in `JOBS` into one PNG - `public/assets/images/<component>/<style>-<state>.png` -
 * the way the client's `BitmapSkinRenderer` would draw it at its natural size, so the result
 * is a nine-slice sheet the theme's `NineSlice(...)` layers can use directly. `hsv_layer`
 * entities (the recolorable borders 15/16 stack dark/mid/light copies with a `shade`) are
 * pre-darkened by `1 - shade` and composited in order, which is what the client's
 * value-shading amounts to once a uniform tint is applied on top.
 *
 * Prints the nine-slice metrics (left/top/right/bottom, from the corner entities) for each
 * output so the matching `ThemeVariants` entry can be written by hand.
 *
 *   node scripts/extract-skin-assets.ts
 */
import { createCanvas, loadImage } from 'canvas';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XML_DIR = join(__dirname, 'binaryData');
const IMAGE_DIR = join(__dirname, 'images');
const OUT_DIR = join(__dirname, '../public/assets/images');

interface Job {
    /** Theme component folder under public/assets/images. */
    component: string;
    style: string;
    /** Skin asset name as the manifest (`habbo_element_description_xml`) references it. */
    skin: string;
    /** Only these states (default: every state the skin defines). */
    states?: string[];
}

const JOBS: Job[] = [
    { component: 'border', style: '11', skin: 'habbo_skin_border_slot_2' },
    { component: 'border', style: '12', skin: 'habbo_skin_border_12' },
    { component: 'border', style: '13', skin: 'habbo_skin_border_13' },
    { component: 'border', style: '14', skin: 'habbo_skin_border_14' },
    { component: 'border', style: '15', skin: 'habbo_skin_border_15' },
    { component: 'border', style: '16', skin: 'habbo_skin_border_16' },
    { component: 'button', style: '2', skin: 'habbo_skin_button_default_white' },
    { component: 'button', style: '104', skin: 'illumina_purple_skin_button' },
    { component: 'button', style: '105', skin: 'illumina_purple_skin_button_plain' },
    { component: 'button', style: '106', skin: 'illumina_light_skin_button_dark_recolorable' },
    { component: 'containerbutton', style: '104', skin: 'illumina_light_skin_button_multi_left' },
    { component: 'containerbutton', style: '105', skin: 'illumina_light_skin_button_multi_right' },
    { component: 'containerbutton', style: '106', skin: 'illumina_light_skin_button_multi_middle' },
    { component: 'closebutton', style: '5', skin: 'habbo_skin_button_menu' },
    { component: 'closebutton', style: '101', skin: 'illumina_light_skin_button_frame_menu' },
    { component: 'closebutton', style: '103', skin: 'illumina_purple_skin_button_frame_close' },
    { component: 'closebutton', style: '10000', skin: 'habbo_skin_button_close_leaderboard' },
    { component: 'frame', style: '103', skin: 'illumina_purple_skin_frame' },
    { component: 'frame', style: '10000', skin: 'habbo_skin_frame_leaderboard_all' },
];

// --- tiny XML reader (same attribute-only subset generate-layout-views.ts parses) ---

interface XmlNode { tag: string; attrs: Record<string, string>; children: XmlNode[] }

const parseXml = (text: string): XmlNode => {
    const root: XmlNode = { tag: '#root', attrs: {}, children: [] };
    const stack: XmlNode[] = [ root ];
    const tagPattern = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<\/([\w:-]+)\s*>|<([\w:-]+)((?:\s+[\w:.-]+\s*=\s*"[^"]*")*)\s*(\/?)>/g;
    let match: RegExpExecArray | null;

    while ((match = tagPattern.exec(text))) {
        if (match[0].startsWith('<!--') || match[0].startsWith('<?')) continue;
        if (match[1]) { if (stack.length > 1) stack.pop(); continue; }

        const attrs: Record<string, string> = {};

        for (const attr of (match[3] ?? '').matchAll(/([\w:.-]+)\s*=\s*"([^"]*)"/g)) attrs[attr[1]] = attr[2];

        const node: XmlNode = { tag: match[2], attrs, children: [] };

        stack[stack.length - 1].children.push(node);
        if (!match[4]) stack.push(node);
    }

    return root.children[0];
};

const find = (node: XmlNode, tag: string) => node.children.find(child => child.tag === tag);
const findAll = (node: XmlNode, tag: string) => node.children.filter(child => child.tag === tag);

interface Rect { x: number; y: number; width: number; height: number }

const rectOf = (entity: XmlNode): Rect | undefined => {
    const rect = find(entity, 'region') ? find(find(entity, 'region')!, 'Rectangle') : undefined;

    if (!rect) return undefined;

    return { x: Number(rect.attrs.x), y: Number(rect.attrs.y), width: Number(rect.attrs.width), height: Number(rect.attrs.height) };
};

const fileFor = (dir: string, name: string, ext: string): string => {
    const file = readdirSync(dir).find(entry => entry.includes(`_${name}$`) && entry.endsWith(ext));

    if (!file) throw new Error(`No ${ext} for ${name} in ${dir}`);

    return join(dir, file);
};

const sheets = new Map<string, Awaited<ReturnType<typeof loadImage>>>();

/** The skins name the classic sheet `habbo_blue_skin_png`; the image dump has it as `habbo_skin_blue_png`. */
const SHEET_ALIASES: Record<string, string> = { habbo_blue_skin_png: 'habbo_skin_blue_png' };

const sheetFor = async (asset: string) => {
    let sheet = sheets.get(asset);

    if (!sheet) sheets.set(asset, sheet = await loadImage(fileFor(IMAGE_DIR, SHEET_ALIASES[asset] ?? asset, '.png')));

    return sheet;
};

for (const job of JOBS) {
    const skin = parseXml(readFileSync(fileFor(XML_DIR, `${job.skin}_xml`, '.bin'), 'utf8'));
    const variables = Object.fromEntries(findAll(find(skin, 'variables') ?? { tag: '', attrs: {}, children: [] }, 'variable').map(v => [ v.attrs.key, v.attrs.value ]));
    const templates = Object.fromEntries(findAll(find(skin, 'templates')!, 'template').map(t => [ t.attrs.name, t ]));
    const layouts = Object.fromEntries(findAll(find(skin, 'layouts')!, 'layout').map(l => [ l.attrs.name, l ]));
    const states = findAll(find(skin, 'states')!, 'state').filter(state => !job.states || job.states.includes(state.attrs.name));
    const outDir = join(OUT_DIR, job.component);

    mkdirSync(outDir, { recursive: true });

    for (const state of states) {
        const template = templates[state.attrs.template];
        const layout = layouts[state.attrs.layout];

        if (!template || !layout) throw new Error(`${job.skin}: state ${state.attrs.name} has no template/layout`);

        const assetName = (template.attrs.asset ?? '').replace(/^\$(\w+)$/, (_, key: string) => variables[key] ?? '');
        const sheet = await sheetFor(assetName);
        const regions = Object.fromEntries(findAll(find(template, 'entities')!, 'entity').map(e => [ e.attrs.name, rectOf(e) ]));
        const placements = findAll(find(layout, 'entities')!, 'entity');

        let width = 0, height = 0;

        for (const entity of placements) {
            const at = rectOf(entity);

            if (!at) continue;

            width = Math.max(width, at.x + at.width);
            height = Math.max(height, at.y + at.height);
        }

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;

        for (const entity of placements) {
            const at = rectOf(entity);
            const from = regions[entity.attrs.name];

            if (!at || !from) continue;

            const shade = entity.attrs.colorizeMethod === 'hsv_layer' ? Number(entity.attrs.shade ?? 0) : 0;

            if (!shade) {
                ctx.drawImage(sheet, from.x, from.y, from.width, from.height, at.x, at.y, at.width, at.height);

                continue;
            }

            // Pre-shade the layer: the client lowers this layer's HSV value by `shade` after
            // tinting; tinting is a uniform multiply, so darkening the source first is equivalent.
            const piece = createCanvas(at.width, at.height);
            const pieceCtx = piece.getContext('2d');

            pieceCtx.imageSmoothingEnabled = false;
            pieceCtx.drawImage(sheet, from.x, from.y, from.width, from.height, 0, 0, at.width, at.height);

            const pixels = pieceCtx.getImageData(0, 0, at.width, at.height);

            for (let i = 0; i < pixels.data.length; i += 4) {
                pixels.data[i] = Math.round(pixels.data[i] * (1 - shade));
                pixels.data[i + 1] = Math.round(pixels.data[i + 1] * (1 - shade));
                pixels.data[i + 2] = Math.round(pixels.data[i + 2] * (1 - shade));
            }

            pieceCtx.putImageData(pixels, 0, 0);
            ctx.drawImage(piece, at.x, at.y);
        }

        const file = join(outDir, `${job.style}-${state.attrs.name}.png`);

        writeFileSync(file, canvas.toBuffer('image/png'));

        // Nine-slice metrics from whichever corner/edge entities the layout has.
        const byName = (suffix: string) => placements.map(e => ({ name: e.attrs.name, at: rectOf(e) })).find(e => e.name.endsWith(suffix) && e.at)?.at;
        const left = byName('top_left')?.width ?? byName('center_left')?.width ?? byName('mid_left')?.width ?? 0;
        const top = byName('top_left')?.height ?? byName('top_center')?.height ?? 0;
        const right = byName('top_right')?.width ?? byName('center_right')?.width ?? byName('mid_right')?.width ?? 0;
        const bottom = byName('bottom_left')?.height ?? byName('btm_left')?.height ?? byName('bottom_center')?.height ?? byName('btm_center')?.height ?? 0;

        console.log(`${job.component}/${job.style}-${state.attrs.name}.png  ${width}x${height}  slice L${left} T${top} R${right} B${bottom}  (${assetName})`);
    }
}
