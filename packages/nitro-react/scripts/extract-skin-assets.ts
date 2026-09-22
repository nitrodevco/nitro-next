/**
 * Renders theme chrome PNGs out of the Flash client's skin definitions.
 *
 * A skin XML (`scripts/binaryData/*_habbo_skin_<name>_xml$*.bin`, `illumina_*_skin_*`) maps each
 * render state to a `<template>` (regions of a shared sheet PNG in `scripts/images`) plus a
 * `<layout>` (where each region sits in the assembled piece). This composes every state of the
 * skins listed in `JOBS` into one PNG - `public/assets/theme/<component>/<style>-<state>.png` -
 * the way the client's `BitmapSkinRenderer` would draw it at its natural size, so the result
 * is a nine-slice sheet the theme's `NineSlice(...)` layers can use directly. `hsv_layer`
 * entities (the recolorable borders 15/16 stack dark/mid/light copies with a `shade`) are
 * pre-darkened by `1 - shade` and composited in order into `<style>-<state>.png` (only exact for
 * a white tint). Because the client's `HsvLayerColor` derives a *different* tint per layer from
 * the window colour (grey tints: `v -= shade`; coloured tints: `s += shade`, `v -= shade / 2`),
 * those skins additionally get one raw PNG per shade - `<style>-<state>-shade-<shade>.png` -
 * which the theme stacks and tints per layer at runtime (`HsvNineSlice` in NineSliceLayer.tsx).
 *
 * A layout entity marked `colorize="false"` is never tinted by the client: the window's colour
 * multiplies the colorizing entities only. Baked into the one sheet it would take the tint with
 * everything else, which is what turned the illumina segmented button's neutral etch into a
 * coloured block around its rounded corners. A job with `plainOverlay` therefore keeps those
 * entities out of `<style>-<state>.png` and writes them separately, so the theme can draw them
 * as an untinted `overlay` over the tinted `layer` (`ThemeWithStatesVariant.overlays`):
 *
 * - `'sheet'` - one `<style>-<state>-plain.png` of the same size and nine-slice metrics as the
 *   tinted sheet, for pieces that sit under the same nine-slice as the face.
 * - `'pieces'` - one `<style>-<state>-<entity name>.png` per entity, at the template's own size,
 *   for pieces a nine-slice cannot carry because the layout moves or centres them (the plain
 *   button's etch follows the bottom edge). The theme places them with `CompositePiece`, the way
 *   the illumina button's face and the light frame's border already are.
 *
 * `exclude` is the same idea for a *colorizing* entity the theme places itself, and `center`
 * scaling is why it exists: the client re-centres such an entity as the window grows, so a sheet
 * cut at its layout rect is wrong at every size - the segmented button's side gradient landed on
 * its rounded bottom corner and squared it off. Either the job excludes it and the theme centres
 * the piece, or `centeredInSheet` keeps it in the sheet, centred for the sheet's own size; baking
 * one at its layout rect throws.
 *
 * Prints the nine-slice metrics (left/top/right/bottom, from the corner entities) for each
 * output so the matching `ThemeVariants` entry can be written by hand.
 *
 *   node scripts/extract-skin-assets.ts [<component>[:<style>] ...]
 *
 * With no argument every job runs. An argument restricts it to the jobs of that component (and
 * style), so one skin can be re-cut without rewriting every other theme PNG.
 */
import { createCanvas, loadImage } from 'canvas';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * The skin XML and the sheets they cut from are the window manager's own assets, so both come
 * from that one component bundle of `scripts/flash-js-resources`.
 */
const SKIN_DIR = join(__dirname, 'flash-js-resources', 'habbo-window-manager-com');
/**
 * `SKIN_OUT_DIR` writes somewhere else - a scratch folder the shipped art can be diffed against,
 * which is how a hand-cut sheet is checked before the cut replaces it.
 */
const OUT_DIR = process.env.SKIN_OUT_DIR ?? join(__dirname, '../public/assets/theme');

interface Job {
    /** Theme component folder under public/assets/theme. */
    component: string;
    style: string;
    /** Skin asset name as the manifest (`habbo_element_description_xml`) references it. */
    skin: string;
    /** Only these states (default: every state the skin defines). */
    states?: string[];
    /**
     * Only the states drawn with this `<layout>`. A skin that serves several window types at
     * once (`habbo_skin_scrollbar` holds the track, the bar and all four step buttons) repeats
     * `default` / `pressed` / `disabled` once per layout, so the layout is what picks the piece.
     */
    layout?: string;
    /**
     * File name stem, when `<style>` alone would not say which piece this is: the four bubble
     * pointers are one theme component (`BubblePointer`) and four Flash types, so they are
     * `<direction>-<style>` (`down-7-default.png`). Defaults to `style`.
     */
    name?: string;
    /**
     * Keep the layout's `colorize="false"` entities out of the tinted sheet and write them as
     * one same-size `-plain` sheet or one PNG per entity - see the module docblock.
     */
    plainOverlay?: 'sheet' | 'pieces';
    /**
     * Colorizing layout entities left out of the sheet because the theme places them itself
     * (a `center`-scaled decoration a nine-slice would stretch) - see the module docblock.
     * They are written as pieces, exactly as `plainOverlay: 'pieces'` writes the untintable ones.
     */
    exclude?: string[];
    /**
     * `center`-scaled entities the sheet keeps, centred for the sheet's own size - exact wherever
     * the theme draws the skin at that size, an approximation at any other. The guard below asks
     * for this deliberately, because the alternative (`exclude`) needs the theme to place the
     * piece, and an `overlay` is a single layer that cannot hold both a nine-slice and pieces.
     */
    centeredInSheet?: string[];
}

/** `button_etching_left` -> `button-etching-left`, the suffix a piece's file and theme key carry. */
const pieceName = (entity: string) => entity.replace(/_/g, '-');

/**
 * The gradient patches every illumina button skin puts halfway up its left and right edges,
 * carrying the face's light-to-dark transition down the outer edge. They are `vertical="center"`,
 * so the client places them by the rendered height - which a sheet can only hold for one height.
 */
const CURVES = [ 'button_center_left_curve', 'button_center_right_curve' ];

/**
 * The scrollbar lift's `grd` - the grip - is a 7px column the layout tiles down (or across) the
 * middle of the bar, so it cannot sit in the bar's nine-slice: it is cut as a piece and the theme
 * tiles it (`Tiled`).
 */
const GRIP = [ 'grd' ];


const JOBS: Job[] = [
    // The classic buttons. Their `pressed` template is its own art - white on the black skin, the
    // inverted face on the default one - and a state with no file draws nothing at all, which is
    // how the black button went dark with no border while it was held.
    { component: 'button', style: '0', skin: 'habbo_skin_button_default' },
    { component: 'button', style: '1', skin: 'habbo_skin_button_default_black' },
    { component: 'button', style: '3', skin: 'habbo_skin_button_shiny_default' },
    { component: 'button', style: '4', skin: 'habbo_skin_button_shiny_black' },
    // Not the classic thick buttons (styles 0-2): their layout puts the right column at x 4, over
    // the 1px centre, so the natural-size composite has no centre column to stretch. Their sheets
    // are the nine templates laid side by side (4+1+4), which `theme_skin.py` holds to the skin.
    { component: 'buttonthick', style: '3', skin: 'habbo_skin_button_shiny_thick' },
    { component: 'buttonthick', style: '4', skin: 'habbo_skin_button_shiny_thick_black' },
    { component: 'containerbutton', style: '4', skin: 'habbo_skin_button_shiny_large' },
    // A group skin's `pressed` state is its `selected` template, so `selected` is the one file.
    // The `_white` group skins (style 2) cut exactly the style 0 regions, so they have no files.
    { component: 'buttongroupleft', style: '0', skin: 'habbo_skin_button_group_left', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    { component: 'buttongroupleft', style: '1', skin: 'habbo_skin_button_group_left_black', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    { component: 'buttongroupcenter', style: '0', skin: 'habbo_skin_button_group_center', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    { component: 'buttongroupcenter', style: '1', skin: 'habbo_skin_button_group_center_black', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    { component: 'buttongroupright', style: '0', skin: 'habbo_skin_button_group_right', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    { component: 'buttongroupright', style: '1', skin: 'habbo_skin_button_group_right_black', states: [ 'default', 'selected', 'disabled', 'hovering' ] },
    // The tracks: a stretched strip, drawn `pressed` while the pointer is held on it and
    // `disabled` (the `passive` template) while the scrollbar is disabled.
    { component: 'scrollbarslidertrackvertical', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_track_vertical' },
    { component: 'scrollbarslidertrackvertical', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_track_vertical_black' },
    { component: 'scrollbarslidertrackvertical', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_track_vertical_3' },
    { component: 'scrollbarslidertrackhorizontal', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_track_horizontal' },
    { component: 'scrollbarslidertrackhorizontal', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_track_horizontal_black' },
    { component: 'scrollbarslidertrackhorizontal', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_track_horizontal_3' },
    // Not the ubuntu lift (style 3): its 16px `grd` tiles over the 20px band the middle stretches
    // over, so the natural-size composite repeats every 20px where the client repeats every 16.
    // Its sheets are cap + one grip tile + cap (5 + 16 + 5), which the theme tiles (`repeat 'y'`),
    // and its `disabled` template is empty - the lift is not drawn at all.
    { component: 'scrollbarsliderbarvertical', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_lift_vertical', exclude: GRIP },
    { component: 'scrollbarsliderbarvertical', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_lift_vertical_black', exclude: GRIP },
    { component: 'scrollbarsliderbarhorizontal', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_lift_horizontal', exclude: GRIP },
    { component: 'scrollbarsliderbarhorizontal', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_lift_horizontal_black', exclude: GRIP },
    // A border skin also carries an `active` state - the focused window's. `Border` has no such
    // state (`ThemeVariant` is one layer, not a state map), so only `default` is cut.
    { component: 'border', style: '11', skin: 'habbo_skin_border_slot_2' },
    { component: 'border', style: '12', skin: 'habbo_skin_border_12', states: [ 'default' ] },
    { component: 'border', style: '13', skin: 'habbo_skin_border_13', states: [ 'default' ] },
    { component: 'border', style: '14', skin: 'habbo_skin_border_14', states: [ 'default' ] },
    { component: 'border', style: '15', skin: 'habbo_skin_border_15', states: [ 'default' ] },
    { component: 'border', style: '16', skin: 'habbo_skin_border_16', states: [ 'default' ] },
    { component: 'button', style: '2', skin: 'habbo_skin_button_default_white' },
    // Eleven of the purple button's nineteen entities - the whole face, curves included - are
    // `colorize="false"`; only its glow colorizes. Cut apart, or the window's colour paints the face.
    // Its curves stay in the `-plain` sheet, centred for the sheet's own 50px: they are
    // untintable, so nothing bleeds through them, and the face they sit on is one nine-sliced
    // overlay layer that cannot also carry pieces. See `BUTTON_104_VARIANT`.
    { component: 'button', style: '104', skin: 'illumina_purple_skin_button', plainOverlay: 'sheet', centeredInSheet: CURVES },
    { component: 'button', style: '105', skin: 'illumina_purple_skin_button_plain', exclude: CURVES },
    { component: 'button', style: '106', skin: 'illumina_light_skin_button_dark_recolorable', exclude: CURVES },
    // The segmented source type picker's three pieces. Their `button_etch_*` entities are
    // `colorize="false"` - the neutral shadow under the rounded bottom corners - so they are cut
    // as a separate overlay; tinted with the rest they read as a coloured square over the curve.
    { component: 'containerbutton', style: '104', skin: 'illumina_light_skin_button_multi_left', plainOverlay: 'sheet', centeredInSheet: CURVES },
    { component: 'containerbutton', style: '105', skin: 'illumina_light_skin_button_multi_right', plainOverlay: 'sheet', centeredInSheet: CURVES },
    // The middle piece has no outer edge, so no curve of its own.
    { component: 'containerbutton', style: '106', skin: 'illumina_light_skin_button_multi_middle', plainOverlay: 'sheet' },
    /*
     * The illumina plain button (button / container_button style 102 - the wired dialog's
     * steppers and its Ready / Cancel row). Its three `button_etching_*` entities are
     * `colorize="false"` and `vertical="move"`: the faint (alpha 196) white line that rounds the
     * bottom off, following the button's lower edge. Flattened into the tinted sheet they read as
     * a hard white rim. The `*_curve` decorations are `vertical="center"`, which a nine-slice
     * cannot carry either, so they are pieces too.
     */
    {
        component: 'button', style: '102', skin: 'illumina_light_skin_button_plain', states: [ 'default', 'pressed' ],
        plainOverlay: 'pieces', exclude: [ 'button_center_left_curve', 'button_center_right_curve' ],
    },
    { component: 'iconbutton', style: '3', skin: 'habbo_skin_button_plus_3' },
    { component: 'iconbutton', style: '4', skin: 'habbo_skin_button_minus_3' },
    { component: 'closebutton', style: '5', skin: 'habbo_skin_button_menu' },
    { component: 'closebutton', style: '101', skin: 'illumina_light_skin_button_frame_menu' },
    { component: 'closebutton', style: '103', skin: 'illumina_purple_skin_button_frame_close' },
    { component: 'closebutton', style: '10000', skin: 'habbo_skin_button_close_leaderboard' },
    { component: 'frame', style: '103', skin: 'illumina_purple_skin_frame' },
    // Every leaderboard frame is a tintable border around six `colorize="false"` panel pieces
    // (`bottom_*` / `center_*`, the light body the badge list sits on).
    { component: 'frame', style: '10000', skin: 'habbo_skin_frame_leaderboard_all', plainOverlay: 'sheet' },
    { component: 'frame', style: '10001', skin: 'habbo_skin_frame_leaderboard_ach', plainOverlay: 'sheet' },
    { component: 'frame', style: '10002', skin: 'habbo_skin_frame_leaderboard_rarity_1', plainOverlay: 'sheet' },
    { component: 'frame', style: '10003', skin: 'habbo_skin_frame_leaderboard_rarity_2', plainOverlay: 'sheet' },
    { component: 'frame', style: '10004', skin: 'habbo_skin_frame_leaderboard_rarity_3', plainOverlay: 'sheet' },
    { component: 'frame', style: '10005', skin: 'habbo_skin_frame_leaderboard_rarity_4', plainOverlay: 'sheet' },
    { component: 'frame', style: '10006', skin: 'habbo_skin_frame_leaderboard_rarity_5', plainOverlay: 'sheet' },
    { component: 'frame', style: '10007', skin: 'habbo_skin_frame_leaderboard_rarity_uncommon', plainOverlay: 'sheet' },
    { component: 'closebutton', style: '102', skin: 'illumina_light_skin_button_frame_minimize' },
    // The classic (habbo/ubuntu/illumina) skins whose art used to sit in one hand-packed strip
    // per component (`assets/images/closebutton.png`, `checkbox.png`, ...) that the variant
    // tables addressed by pixel rect. One PNG per piece instead, cut here from the same skin
    // XMLs - a strip read a pixel wide of its tile drew a column of the neighbouring state.
    { component: 'closebutton', style: '0', skin: 'habbo_skin_button_close' },
    // default/active/pressed are one rect: one file, which the variant names for all three.
    { component: 'closebutton', style: '1', skin: 'habbo_skin_button_close_black', states: [ 'default' ] },
    { component: 'closebutton', style: '2', skin: 'habbo_skin_button_close_white', states: [ 'default' ] },
    { component: 'closebutton', style: '3', skin: 'habbo_skin_button_close_3' },
    { component: 'closebutton', style: '4', skin: 'habbo_skin_button_help_3' },
    { component: 'closebutton', style: '100', skin: 'illumina_light_skin_button_frame_close' },
    { component: 'checkbox', style: '0', skin: 'habbo_skin_button_checkbox', states: [ 'default', 'selected' ] },
    { component: 'checkbox', style: '1', skin: 'habbo_skin_button_checkbox_black', states: [ 'default', 'selected' ] },
    { component: 'checkbox', style: '2', skin: 'habbo_skin_button_checkbox_white', states: [ 'default', 'selected' ] },
    { component: 'radiobutton', style: '0', skin: 'habbo_skin_button_radio' },
    { component: 'radiobutton', style: '1', skin: 'habbo_skin_button_radio_black' },
    { component: 'radiobutton', style: '2', skin: 'habbo_skin_button_radio_white' },
    // Styles 3 and 4 are both `habbo_skin_scaler_3`, as 0/1/2 are all `habbo_skin_scaler`: one
    // file, named for the lowest style that draws it.
    { component: 'scaler', style: '3', skin: 'habbo_skin_scaler_3' },
    { component: 'framepointer', style: '7', name: 'down-7', skin: 'habbo_skin_frame_pointer_down' },
    { component: 'bubblepointer', style: '0', name: 'down-0', skin: 'habbo_skin_bubble_pointer_down' },
    { component: 'bubblepointer', style: '7', name: 'down-7', skin: 'habbo_skin_bubble_pointer_down_7' },
    { component: 'bubblepointer', style: '0', name: 'left-0', skin: 'habbo_skin_bubble_pointer_left' },
    { component: 'bubblepointer', style: '7', name: 'left-7', skin: 'habbo_skin_bubble_pointer_left_7' },
    { component: 'bubblepointer', style: '0', name: 'right-0', skin: 'habbo_skin_bubble_pointer_right' },
    { component: 'bubblepointer', style: '7', name: 'right-7', skin: 'habbo_skin_bubble_pointer_right_7' },
    { component: 'bubblepointer', style: '0', name: 'up-0', skin: 'habbo_skin_bubble_pointer_up' },
    { component: 'bubblepointer', style: '7', name: 'up-7', skin: 'habbo_skin_bubble_pointer_up_7' },
    { component: 'scrollbarsliderbuttonup', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_button_up' },
    { component: 'scrollbarsliderbuttonup', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_button_up_black' },
    { component: 'scrollbarsliderbuttonup', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_button_up_3' },
    { component: 'scrollbarsliderbuttondown', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_button_down' },
    { component: 'scrollbarsliderbuttondown', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_button_down_black' },
    { component: 'scrollbarsliderbuttondown', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_button_down_3' },
    { component: 'scrollbarsliderbuttonleft', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_button_left' },
    { component: 'scrollbarsliderbuttonleft', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_button_left_black' },
    { component: 'scrollbarsliderbuttonleft', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_button_left_3' },
    { component: 'scrollbarsliderbuttonright', style: '0', skin: 'habbo_skin_scrollbar', layout: 'scrollbar_button_right' },
    { component: 'scrollbarsliderbuttonright', style: '1', skin: 'habbo_skin_scrollbar_black', layout: 'scrollbar_button_right_black' },
    { component: 'scrollbarsliderbuttonright', style: '3', skin: 'habbo_skin_scrollbar_3', layout: 'scrollbar_button_right_3' },
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

/**
 * A rect attribute is a number or a `$variable` of the skin's own `<variables>` block - the
 * scrollbar skins size all four step buttons that way (`width="$button_up_width"`).
 */
const number = (value: string | undefined, variables: Record<string, string>): number =>
    Number(/^\$(\w+)$/.test(value ?? '') ? variables[(value ?? '').slice(1)] : value);

const rectOf = (entity: XmlNode, variables: Record<string, string>): Rect | undefined => {
    const rect = find(entity, 'region') ? find(find(entity, 'region')!, 'Rectangle') : undefined;

    if (!rect) return undefined;

    return { x: number(rect.attrs.x, variables), y: number(rect.attrs.y, variables), width: number(rect.attrs.width, variables), height: number(rect.attrs.height, variables) };
};

/**
 * Whether a layout entity's bitmap is drawn at the layout rect's size on this axis.
 * `BitmapSkinRenderer.draw` scales a region only where its `<scale>` is `strech` or `tiled`; a
 * `fixed` axis copies the template's own pixels, so a layout rect that is larger than the region
 * leaves the rest empty - `scrollbar_button_left_3` puts a 16px-wide button in a 17px-wide
 * layout, and the 17th column is transparent rather than the art being stretched a pixel wider.
 * `move` and `center` are copies too, but they also re-place the region as the window grows,
 * which a static nine-slice PNG cannot carry; those keep the layout's size, as the rendered
 * piece has to stand for every size the client draws it at.
 */
const scaleOf = (entity: XmlNode, axis: 'horizontal' | 'vertical'): string =>
    (find(entity, 'scale')?.attrs[axis] ?? 'fixed').toLowerCase();

/**
 * Whether `BitmapSkinRenderer.draw` resizes this region on the axis. Only `strech` and `tiled`
 * do: `fixed` copies the template's pixels, and `move` / `center` copy them too - they re-place
 * the region as the window grows rather than resizing it. Taking the layout rect's size for those
 * two stretched the segmented button's pressed side gradient, whose template maps it to a 1x1
 * region while the layout rect stays 3x5.
 */
const stretches = (entity: XmlNode, axis: 'horizontal' | 'vertical'): boolean => [ 'strech', 'tiled' ].includes(scaleOf(entity, axis));

/** `habbo_skin_button_xml` -> `habbo_skin_button.xml`: a bundle file is its asset name with the type token as the extension. */
const fileFor = (dir: string, name: string, ext: string): string => {
    const file = join(dir, name.replace(/_(xml|png|gif|jpg)$/i, '') + ext);

    if (!existsSync(file)) throw new Error(`No ${ext} for ${name} in ${dir}`);

    return file;
};

const sheets = new Map<string, Awaited<ReturnType<typeof loadImage>>>();

/**
 * A sheet whose bundle file is not its asset name. None today: the component bundles carry the
 * classic sheet under the `habbo_blue_skin_png` the skins name (the old image dump's
 * `habbo_skin_blue_png` spelling is gone with the dump).
 */
const SHEET_ALIASES: Record<string, string> = {};

const sheetFor = async (asset: string) => {
    let sheet = sheets.get(asset);

    if (!sheet) sheets.set(asset, sheet = await loadImage(fileFor(SKIN_DIR, SHEET_ALIASES[asset] ?? asset, '.png')));

    return sheet;
};

/** `<component>` or `<component>:<style>` arguments; with none, every job runs. */
const filters = process.argv.slice(2);
const selected = JOBS.filter(job => !filters.length || filters.some(filter => filter === job.component || filter === `${job.component}:${job.style}`));

if (filters.length && !selected.length) throw new Error(`No job matches ${filters.join(', ')}`);

for (const job of selected) {
    const skin = parseXml(readFileSync(fileFor(SKIN_DIR, `${job.skin}_xml`, '.xml'), 'utf8'));
    const variables = Object.fromEntries(findAll(find(skin, 'variables') ?? { tag: '', attrs: {}, children: [] }, 'variable').map(v => [ v.attrs.key, v.attrs.value ]));
    const templates = Object.fromEntries(findAll(find(skin, 'templates')!, 'template').map(t => [ t.attrs.name, t ]));
    const layouts = Object.fromEntries(findAll(find(skin, 'layouts')!, 'layout').map(l => [ l.attrs.name, l ]));
    const states = findAll(find(skin, 'states')!, 'state')
        .filter(state => (!job.states || job.states.includes(state.attrs.name)) && (!job.layout || state.attrs.layout === job.layout));
    const stem = job.name ?? job.style;
    const outDir = join(OUT_DIR, job.component);

    mkdirSync(outDir, { recursive: true });

    for (const state of states) {
        const template = templates[state.attrs.template];
        const layout = layouts[state.attrs.layout];

        if (!template || !layout) throw new Error(`${job.skin}: state ${state.attrs.name} has no template/layout`);

        const assetName = (template.attrs.asset ?? '').replace(/^\$(\w+)$/, (_, key: string) => variables[key] ?? '');
        const sheet = await sheetFor(assetName);
        const regions = Object.fromEntries(findAll(find(template, 'entities')!, 'entity').map(e => [ e.attrs.name, rectOf(e, variables) ]));
        const placements = findAll(find(layout, 'entities')!, 'entity');

        let width = 0, height = 0;

        for (const entity of placements) {
            const at = rectOf(entity, variables);

            if (!at) continue;

            width = Math.max(width, at.x + at.width);
            height = Math.max(height, at.y + at.height);
        }

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        // The `colorize="false"` entities of a `plainOverlay: 'sheet'` job, on their own canvas
        // of the same size, so they keep the layout's geometry and nine-slice metrics.
        const plainCanvas = (job.plainOverlay === 'sheet') ? createCanvas(width, height) : undefined;
        const plainCtx = plainCanvas?.getContext('2d');
        /** Entities written on their own instead of into either sheet. */
        const asPiece = (entity: XmlNode) =>
            (job.exclude?.includes(entity.attrs.name) ?? false) || ((job.plainOverlay === 'pieces') && (entity.attrs.colorize === 'false'));

        ctx.imageSmoothingEnabled = false;

        if (plainCtx) plainCtx.imageSmoothingEnabled = false;

        for (const entity of placements) {
            const at = rectOf(entity, variables);
            const from = regions[entity.attrs.name];

            if (!at || !from) continue;

            /*
             * A `center`-scaled entity sits where the *rendered* size puts it, not where its
             * layout rect does - the client re-centres it as the window grows. A sheet cut at the
             * layout rect is therefore wrong at every size, the natural one included: the
             * segmented button's side gradient ended up over its rounded bottom corner and
             * squared it off. The sheet can only hold such an entity centred for its own size,
             * which is exact wherever the theme draws the skin at that size and an approximation
             * otherwise - so a job has to say `centeredInSheet` for it, or `exclude` it and let
             * the theme place it with `CompositePiece`'s `alignSelf: 'center'`.
             */
            const centred = (axis: 'horizontal' | 'vertical') => scaleOf(entity, axis) === 'center';
            const isCentred = centred('horizontal') || centred('vertical');
            const atNaturalSize = (!centred('horizontal') || (at.x === ((width - from.width) >> 1)))
                && (!centred('vertical') || (at.y === ((height - from.height) >> 1)));

            if (isCentred && !asPiece(entity) && !atNaturalSize && !job.centeredInSheet?.includes(entity.attrs.name)) {
                throw new Error(`${job.skin}: ${entity.attrs.name} is scaled "center" but its layout rect is ${at.x},${at.y}, not the ${(width - from.width) >> 1},${(height - from.height) >> 1} the client centres it at - exclude it so the theme places it, or list it in centeredInSheet with the reason the sheet may hold it`);
            }

            if (asPiece(entity)) {
                // At the template's own size: the layout's `move` / `center` placement is the
                // theme's `CompositePiece` to make, not something a sheet can hold.
                const piece = createCanvas(from.width, from.height);
                const pieceCtx = piece.getContext('2d');

                pieceCtx.imageSmoothingEnabled = false;
                pieceCtx.drawImage(sheet, from.x, from.y, from.width, from.height, 0, 0, from.width, from.height);
                writeFileSync(join(outDir, `${stem}-${state.attrs.name}-${pieceName(entity.attrs.name)}.png`), piece.toBuffer('image/png'));
                console.log(`${job.component}/${stem}-${state.attrs.name}-${pieceName(entity.attrs.name)}.png  ${from.width}x${from.height}  piece at ${at.x},${at.y} ${find(entity, 'scale')?.attrs.horizontal ?? 'fixed'}/${find(entity, 'scale')?.attrs.vertical ?? 'fixed'}`);

                continue;
            }

            const target = (plainCtx && (entity.attrs.colorize === 'false')) ? plainCtx : ctx;
            const shade = entity.attrs.colorizeMethod === 'hsv_layer' ? Number(entity.attrs.shade ?? 0) : 0;
            const to = {
                // `center` puts the piece in the middle of the sheet, which is where the client
                // draws it whenever the skin is rendered at its own size (see the guard above).
                x: centred('horizontal') ? ((width - from.width) >> 1) : at.x,
                y: centred('vertical') ? ((height - from.height) >> 1) : at.y,
                width: stretches(entity, 'horizontal') ? at.width : from.width,
                height: stretches(entity, 'vertical') ? at.height : from.height,
            };

            if (!shade) {
                target.drawImage(sheet, from.x, from.y, from.width, from.height, to.x, to.y, to.width, to.height);

                continue;
            }

            // Pre-shade the layer: the client lowers this layer's HSV value by `shade` after
            // tinting; tinting is a uniform multiply, so darkening the source first is equivalent.
            const piece = createCanvas(to.width, to.height);
            const pieceCtx = piece.getContext('2d');

            pieceCtx.imageSmoothingEnabled = false;
            pieceCtx.drawImage(sheet, from.x, from.y, from.width, from.height, 0, 0, to.width, to.height);

            const pixels = pieceCtx.getImageData(0, 0, to.width, to.height);

            for (let i = 0; i < pixels.data.length; i += 4) {
                pixels.data[i] = Math.round(pixels.data[i] * (1 - shade));
                pixels.data[i + 1] = Math.round(pixels.data[i + 1] * (1 - shade));
                pixels.data[i + 2] = Math.round(pixels.data[i + 2] * (1 - shade));
            }

            pieceCtx.putImageData(pixels, 0, 0);
            target.drawImage(piece, to.x, to.y);
        }

        const file = join(outDir, `${stem}-${state.attrs.name}.png`);

        writeFileSync(file, canvas.toBuffer('image/png'));

        if (plainCanvas) writeFileSync(join(outDir, `${stem}-${state.attrs.name}-plain.png`), plainCanvas.toBuffer('image/png'));

        // hsv_layer skins: one raw (un-shaded) sheet per shade group, drawn in layout order, so
        // the theme can apply the client's per-layer derived tint at runtime.
        const shades = [ ...new Set(placements.filter(e => e.attrs.colorizeMethod === 'hsv_layer').map(e => Number(e.attrs.shade ?? 0))) ];

        for (const shade of shades) {
            const layerCanvas = createCanvas(width, height);
            const layerCtx = layerCanvas.getContext('2d');

            layerCtx.imageSmoothingEnabled = false;

            for (const entity of placements) {
                if (entity.attrs.colorizeMethod !== 'hsv_layer' || Number(entity.attrs.shade ?? 0) !== shade) continue;

                const at = rectOf(entity, variables);
                const from = regions[entity.attrs.name];

                if (!at || !from) continue;

                layerCtx.drawImage(sheet, from.x, from.y, from.width, from.height, at.x, at.y, stretches(entity, 'horizontal') ? at.width : from.width, stretches(entity, 'vertical') ? at.height : from.height);
            }

            writeFileSync(join(outDir, `${stem}-${state.attrs.name}-shade-${shade}.png`), layerCanvas.toBuffer('image/png'));
        }

        if (shades.length) console.log(`  hsv_layer shades (layout order): ${shades.join(', ')}`);

        // Nine-slice metrics from whichever corner/edge entities the layout has.
        const byName = (suffix: string) => placements.map(e => ({ name: e.attrs.name, at: rectOf(e, variables) })).find(e => e.name.endsWith(suffix) && e.at)?.at;
        const left = byName('top_left')?.width ?? byName('center_left')?.width ?? byName('mid_left')?.width ?? 0;
        const top = byName('top_left')?.height ?? byName('top_center')?.height ?? 0;
        const right = byName('top_right')?.width ?? byName('center_right')?.width ?? byName('mid_right')?.width ?? 0;
        const bottom = byName('bottom_left')?.height ?? byName('btm_left')?.height ?? byName('bottom_center')?.height ?? byName('btm_center')?.height ?? 0;

        console.log(`${job.component}/${stem}-${state.attrs.name}.png  ${width}x${height}  slice L${left} T${top} R${right} B${bottom}  (${assetName})`);
    }
}
