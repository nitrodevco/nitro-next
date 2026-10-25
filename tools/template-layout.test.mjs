/**
 * Window template layout (`nitro-theme/src/template/templateLayout.ts`) against the AS3 it ports:
 * `WindowController` (`setRectangle`, `update`, `_Str_10618`, `_Str_14067`, `_Str_9294`),
 * `TextLabelController.refresh`, `TextController.refreshTextImage`, `ItemListController` and
 * `WindowParser.parseSingleWindowEntity` (2020 dump, `com/sulake/core/window`).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { LayoutWindow, buildTemplateWindows, layoutTemplate, linkTemplateScrollbars } = await import('../packages/nitro-theme/src/template/templateLayout.ts');

const element = (tag, rect, extra = {}) => ({ tag, x: rect[0], y: rect[1], width: rect[2], height: rect[3], vars: {}, children: [], ...extra });
const rectOf = window => ({ x: window.x, y: window.y, width: window.width, height: window.height });

/** A layout whose every text measures `size`. */
const input = (size, caption = 'text') => ({ captionOf: () => caption, measure: () => size });

// WindowParam bits, for windows made directly.
const ALIGN_CENTER = 786432;
const ALIGN_RIGHT = 262144;
const ALIGN_BOTTOM = 1048576;
const BOUND = 32;

await test('a resize with no move keeps the left edge by default', () => {
    const window = new LayoutWindow(undefined, { x: 10, y: 5, width: 40, height: 20 }, 0);

    window.setRectangle(10, 5, 60, 30);
    assert.deepEqual(rectOf(window), { x: 10, y: 5, width: 60, height: 30 });
});

await test('on_resize_align_center moves by half the change, truncated as the int argument is', () => {
    const shrink = new LayoutWindow(undefined, { x: 0, y: 1, width: 71, height: 17 }, ALIGN_CENTER);
    const grow = new LayoutWindow(undefined, { x: 10, y: 1, width: 10, height: 17 }, ALIGN_CENTER);

    // `WindowController.setRectangle`: the half is an int (truncated towards zero) added to x, and
    // the pixel it could not split (`_hCenterRem2`) is owed to the next width change.
    shrink.setRectangle(0, 1, 24, 17); // 0 + int((71 - 24) / 2) = 0 + int(23.5) = 23, 1 owed
    grow.setRectangle(10, 1, 15, 17); // 10 + int((10 - 15) / 2) = 10 + int(-2.5) = 8, -1 owed
    assert.equal(shrink.x, 23);
    assert.equal(shrink.hCenterRemainder, 1);
    assert.equal(grow.x, 8);
    assert.equal(grow.hCenterRemainder, -1);
    shrink.setRectangle(23, 1, 71, 17); // 23 + int((1 - 47) / 2) = 0: grown back to where it was
    assert.equal(shrink.x, 0);
    assert.equal(shrink.hCenterRemainder, 0);
});

await test('on_resize_align_right and bottom keep that edge; a move skips the alignment', () => {
    const aligned = new LayoutWindow(undefined, { x: 25, y: 2, width: 10, height: 17 }, ALIGN_RIGHT | ALIGN_BOTTOM);
    const moved = new LayoutWindow(undefined, { x: 25, y: 2, width: 10, height: 17 }, ALIGN_RIGHT);

    aligned.setRectangle(25, 2, 22, 20);
    moved.setRectangle(30, 2, 22, 17);
    assert.deepEqual(rectOf(aligned), { x: 13, y: -1, width: 22, height: 20 });
    assert.deepEqual(rectOf(moved), { x: 30, y: 2, width: 22, height: 17 });
});

await test('the limits clamp the size before it is compared', () => {
    const window = new LayoutWindow(undefined, { x: 0, y: 0, width: 50, height: 19 }, 0);

    window.minWidth = 50;
    window.maxWidth = 50;
    window.setRectangle(0, 0, 71, 19);
    assert.deepEqual(rectOf(window), { x: 0, y: 0, width: 50, height: 19 });
});

await test('bound_to_parent_rect keeps a moved window inside and shrinks a resized one', () => {
    const parent = new LayoutWindow(undefined, { x: 0, y: 0, width: 100, height: 50 }, 0);
    const movedChild = new LayoutWindow(undefined, { x: 90, y: 10, width: 20, height: 10 }, BOUND, parent);
    const resizedChild = new LayoutWindow(undefined, { x: 90, y: 10, width: 20, height: 10 }, BOUND, parent);

    movedChild.setRectangle(95, 10, 20, 10);
    resizedChild.setRectangle(90, 10, 30, 10);
    assert.deepEqual(rectOf(movedChild), { x: 80, y: 10, width: 20, height: 10 });
    assert.deepEqual(rectOf(resizedChild), { x: 90, y: 10, width: 10, height: 10 });
});

// params 1838288: relative_scale_center, on_resize_align_center + bottom, use_parent_graphic_context.
const helpParams = { parentGraphics: true, scale: [ 'center', 'center' ], align: [ 'center', 'bottom' ] };

await test('the purse Help label: auto-sized, then centred when pushed onto its container_button', () => {
    const help = element('label', [ 0, 1, 71, 17 ], { params: helpParams });
    const button = element('container_button', [ 0, 0, 50, 19 ], { children: [ help ] });

    // floor(50 / 2) - floor(26 / 2) = 12; floor(19 / 2) - floor(17 / 2) = 1
    assert.deepEqual(layoutTemplate([ button ], input({ width: 26.4, height: 17 })).get(help), { x: 12, y: 1, width: 26, height: 17 });
});

await test('a label takes its text and its margins, whether given as a map or as margin_* properties', () => {
    // `TextLabelController.refresh`: the field's size plus the margins - a `margins` map (`setTextMarginMap`) or
    // `margin_left` / `_top` / `_right` / `_bottom` (the inventory's tab titles).
    const flat = element('label', [ 0, 0, 107, 34 ], { vars: { margin_left: 10, margin_top: 7, margin_right: 10, margin_bottom: 10 } });
    const map = element('label', [ 0, 0, 107, 34 ], { vars: { margins: { left: 8, top: 2, right: 8, bottom: 4 } } });

    assert.deepEqual(layoutTemplate([ flat ], input({ width: 60, height: 17 })).get(flat), { x: 0, y: 0, width: 80, height: 34 });
    assert.deepEqual(layoutTemplate([ map ], input({ width: 60, height: 17 })).get(map), { x: 0, y: 0, width: 76, height: 23 });
});

await test('a caption the code sets after the build reaches the parent: the unseen counter follows its count', () => {
    // `unseen_item_counter_xml`: the border keeps its right edge, its `count` text reflects its width onto it.
    const count = element('text', [ 4, 0, 21, 16 ], { vars: { auto_size: 'left' }, params: { parentGraphics: true, reflectToParent: [ true, false ] }, caption: '999' });
    const border = element('border', [ 3, 0, 29, 18 ], { params: { parentGraphics: true, align: [ 'right', 'top' ] }, children: [ count ] });
    const measure = (e, text) => ({ width: (text.length * 6) + 4, height: 16 });

    // Built with the count: the text takes its width there and the border keeps the layout's.
    assert.equal(layoutTemplate([ border ], { captionOf: () => '2', measure }).get(border).width, 29);
    // Built with the layout's `999`, then set: the border shrinks by what the text did (22 -> 10), right edge kept.
    assert.deepEqual(layoutTemplate([ border ], { captionOf: () => '2', builtCaptionOf: () => '999', measure }).get(border), { x: 15, y: 0, width: 17, height: 18 });
});

await test('under a window with no iterator the child is made with its parent: no centring on add', () => {
    // `button` has no iterator, so the label never hears PARENT_ADDED - only its own resize's alignment moves it.
    const help = element('label', [ 0, 1, 71, 17 ], { params: { ...helpParams, scale: [ 'fixed', 'fixed' ] } });
    const button = element('button', [ 0, 0, 50, 19 ], { children: [ help ] });

    assert.deepEqual(layoutTemplate([ button ], input({ width: 26, height: 17 })).get(help), { x: 22, y: 1, width: 26, height: 17 });
});

await test('a centre-scaled window re-centres when its own size changes, even under a window with no iterator', () => {
    const help = element('label', [ 0, 1, 71, 17 ], { params: helpParams });
    const button = element('button', [ 0, 0, 50, 19 ], { children: [ help ] });

    // The label's resize fires RESIZED, and a centre-scaled window re-runs its relative scale then.
    assert.equal(layoutTemplate([ button ], input({ width: 26, height: 17 })).get(help).x, 12);
});

await test('a centred window wider than a parent it draws into sits at 0, else it is still centred', () => {
    const into = element('container', [ 5, 0, 80, 10 ], { params: { parentGraphics: true, scale: [ 'center', 'fixed' ] } });
    const own = element('container', [ 5, 0, 80, 10 ], { params: { scale: [ 'center', 'fixed' ] } });
    const rects = layoutTemplate([ element('container', [ 0, 0, 50, 10 ], { children: [ into, own ] }) ], input(undefined));

    assert.equal(rects.get(into).x, 0);
    assert.equal(rects.get(own).x, -15);
});

await test('a left auto-sized text takes the field width, growing leftwards when right-aligned', () => {
    const count = element('text', [ 25, 2, 10, 17 ], { vars: { auto_size: 'left' }, params: { align: [ 'right', 'top' ] } });

    assert.deepEqual(layoutTemplate([ count ], input({ width: 31, height: 17 })).get(count), { x: 4, y: 2, width: 31, height: 17 });
});

await test('a formatted text auto-sizes as a text does', () => {
    const formatted = element('formatted_text', [ 5, 0, 280, 40 ], { vars: { auto_size: 'left' } });

    assert.deepEqual(layoutTemplate([ formatted ], input({ width: 31, height: 17 })).get(formatted), { x: 5, y: 0, width: 31, height: 17 });
});

await test('an auto-sized html field takes its text\'s size, keeping the edge or centre its auto size names', () => {
    const left = element('html', [ 10, 5, 100, 40 ], { vars: { auto_size: 'left' } });
    const centred = element('html', [ 10, 5, 100, 40 ], { vars: { auto_size: 'center' } });
    const right = element('html', [ 10, 5, 100, 40 ], { vars: { auto_size: 'right' } });
    const rects = layoutTemplate([ left, centred, right ], input({ width: 31, height: 17 }));

    assert.deepEqual(rects.get(left), { x: 10, y: 5, width: 31, height: 17 });
    // (100 - 31) / 2 = 34.5 to the right, truncated as the int argument is.
    assert.deepEqual(rects.get(centred), { x: 44, y: 5, width: 31, height: 17 });
    assert.deepEqual(rects.get(right), { x: 79, y: 5, width: 31, height: 17 });
});

await test('a wrapped auto-sized html field keeps its width and takes its text\'s height; no auto size keeps its rect', () => {
    const wrapped = element('html', [ 10, 5, 100, 40 ], { vars: { auto_size: 'center', word_wrap: true } });
    const fixed = element('html', [ 10, 5, 100, 40 ]);
    const rects = layoutTemplate([ wrapped, fixed ], input({ width: 100, height: 30 }));

    assert.deepEqual(rects.get(wrapped), { x: 10, y: 5, width: 100, height: 30 });
    assert.deepEqual(rects.get(fixed), { x: 10, y: 5, width: 100, height: 40 });
});

await test('a centre auto-sized text keeps its width and takes the field height; no auto size keeps its rect', () => {
    const centred = element('text', [ 0, 0, 80, 30 ], { vars: { auto_size: 'center' } });
    const fixed = element('text', [ 0, 0, 80, 30 ]);
    const rects = layoutTemplate([ centred, fixed ], input({ width: 20, height: 17 }));

    assert.deepEqual(rects.get(centred), { x: 0, y: 0, width: 80, height: 17 });
    assert.deepEqual(rects.get(fixed), { x: 0, y: 0, width: 80, height: 30 });
});

await test('a wrapping text is measured at its field width, inside its margins', () => {
    const text = element('text', [ 0, 0, 80, 30 ], { vars: { auto_size: 'left', word_wrap: true, margins: { left: 3, right: 5, top: 1, bottom: 1 } } });
    let wrapWidth;
    const rects = layoutTemplate([ text ], { captionOf: () => 'text', measure: (_, __, width) => {
        wrapWidth = width;

        return { width: 72, height: 40 };
    } });

    assert.equal(wrapWidth, 72);
    assert.deepEqual(rects.get(text), { x: 0, y: 0, width: 80, height: 42 });
});

await test('an auto-sized text resized from outside takes its field size again', () => {
    const text = element('text', [ 0, 0, 10, 17 ], { vars: { auto_size: 'left' } });
    const window = buildTemplateWindows([ text ], input({ width: 31, height: 17 })).get(text);

    window.setRectangle(0, 0, 100, 40);
    assert.deepEqual(rectOf(window), { x: 0, y: 0, width: 31, height: 17 });
});

await test('children follow their parent\'s resize: moved, stretched, centred, fixed', () => {
    const moved = element('container', [ 80, 0, 10, 10 ], { params: { scale: [ 'move', 'fixed' ] } });
    const stretched = element('container', [ 10, 0, 80, 10 ], { params: { scale: [ 'stretch', 'fixed' ] } });
    const centred = element('container', [ 45, 0, 10, 10 ], { params: { scale: [ 'center', 'fixed' ] } });
    const fixed = element('container', [ 5, 0, 10, 10 ]);
    const root = element('container', [ 0, 0, 100, 50 ], { children: [ moved, stretched, centred, fixed ] });
    const windows = buildTemplateWindows([ root ], input(undefined));

    windows.get(root).setRectangle(0, 0, 160, 50);
    assert.equal(windows.get(moved).x, 140);
    assert.equal(windows.get(stretched).width, 140);
    assert.equal(windows.get(centred).x, 75);
    assert.equal(windows.get(fixed).x, 5);
});

await test('resize_to_accommodate_children takes the children\'s extent, shrinking too', () => {
    const child = element('container', [ 4, 6, 20, 10 ]);
    const parent = element('container', [ 0, 0, 100, 100 ], { params: { accommodate: 'resize' }, children: [ child ] });

    assert.deepEqual(layoutTemplate([ parent ], input(undefined)).get(parent), { x: 0, y: 0, width: 24, height: 16 });
});

await test('expand_to_accommodate_children only grows', () => {
    const inside = element('container', [ 4, 6, 20, 10 ]);
    const outside = element('container', [ 90, 6, 30, 10 ]);
    const small = element('container', [ 0, 0, 100, 100 ], { params: { accommodate: 'expand' }, children: [ inside ] });
    const large = element('container', [ 0, 0, 100, 100 ], { params: { accommodate: 'expand' }, children: [ outside ] });
    const rects = layoutTemplate([ small, large ], input(undefined));

    assert.deepEqual(rects.get(small), { x: 0, y: 0, width: 100, height: 100 });
    assert.deepEqual(rects.get(large), { x: 0, y: 0, width: 120, height: 100 });
});

await test('an item list stacks its items with spacing, whatever their own y', () => {
    const a = element('container', [ 0, 40, 50, 19 ]);
    const b = element('container', [ 3, 0, 50, 17 ]);
    const list = element('itemlist_vertical', [ 0, 0, 60, 62 ], { vars: { spacing: 2 }, children: [ a, b ] });
    const rects = layoutTemplate([ list ], input(undefined));

    assert.deepEqual(rects.get(a), { x: 0, y: 0, width: 50, height: 19 });
    assert.deepEqual(rects.get(b), { x: 3, y: 21, width: 50, height: 17 });
});

await test('a horizontal item list places its items along x', () => {
    const a = element('container', [ 0, 0, 20, 10 ]);
    const b = element('container', [ 0, 0, 30, 10 ]);
    const list = element('itemlist_horizontal', [ 0, 0, 100, 10 ], { vars: { spacing: 4 }, children: [ a, b ] });
    const rects = layoutTemplate([ list ], input(undefined));

    assert.equal(rects.get(a).x, 0);
    assert.equal(rects.get(b).x, 24);
});

await test('hiding an item re-arranges the list, and resize_on_item_update shrinks it', () => {
    const a = element('container', [ 0, 0, 50, 19 ], { name: 'a' });
    const b = element('container', [ 0, 0, 50, 19 ], { name: 'b' });
    const c = element('container', [ 0, 0, 50, 17 ], { name: 'c' });
    const list = element('itemlist_vertical', [ 0, 0, 60, 55 ], { vars: { resize_on_item_update: true }, children: [ a, b, c ] });
    const rects = layoutTemplate([ list ], { ...input(undefined), visibleOf: e => e !== b });

    assert.equal(rects.get(c).y, 19);
    assert.equal(rects.get(list).height, 36);
});

await test('bound list items are placed within the container\'s height so far; captions set after the build re-flow them', () => {
    // `craftingwidget_xml`'s info texts: bound_to_parent, bottom-aligned, word-wrapped and auto-sized, in an
    // itemlist_vertical with spacing 8; `CraftingInfoController.setState` sets their captions on the built window.
    const params = { parentGraphics: true, boundToParent: true, align: [ 'left', 'bottom' ], reflectToParent: [ false, true ] };
    const vars = { auto_size: 'left', word_wrap: true };
    const text1 = element('text', [ 0, 0, 134, 43 ], { name: 'info_text1', vars, params: { ...params, accommodate: 'resize' }, caption: 'This spell will produce yy yy yyyyyyyy yyyyyy yy yyy xxxxxx xxx xxxxx' });
    const text2 = element('text', [ 0, 15, 134, 28 ], { name: 'info_text2', vars, params, caption: 'This spell will produce xxxxxx xxx xxxxx' });
    const list = element('itemlist_vertical', [ 304, 180, 134, 79 ], { vars: { spacing: 8 }, children: [ text1, text2 ] });
    const captions = new Map([ [ text1, 'This recipe will produce:' ], [ text2, 'Small Coffee Table' ] ]);
    // One line 18 high, each more 14.
    const measure = (e, text) => ({ width: 130, height: 4 + (14 * Math.ceil(text.length / 26)) });
    const captionOf = e => captions.get(e) ?? e.caption ?? '';

    // Built with its caption, text2 goes in while the container is text1's 18 high: `WindowController.setRectangle`
    // keeps a bound window inside its parent, so it is pulled from 18 + 8 up onto text1.
    assert.equal(layoutTemplate([ list ], { captionOf, measure }).get(text2).y, 0);

    // Built with the layout's captions (the container ends 86 high) and then set: each resize re-arranges the
    // list (`WE_CHILD_RESIZED`, `updateScrollAreaRegion`) inside the container the last arrange left.
    const rects = layoutTemplate([ list ], { captionOf, measure, builtCaptionOf: e => (captions.has(e) ? e.caption : undefined) });

    assert.deepEqual(rects.get(text1), { x: 0, y: 0, width: 134, height: 18 });
    assert.deepEqual(rects.get(text2), { x: 0, y: 26, width: 134, height: 18 });
});

await test('a list item centre-scaled is centred across the list when it is added', () => {
    const item = element('container', [ 0, 0, 20, 10 ], { params: { scale: [ 'center', 'fixed' ] } });
    const list = element('itemlist_vertical', [ 0, 0, 60, 60 ], { children: [ item ] });

    assert.equal(layoutTemplate([ list ], input(undefined)).get(item).x, 20);
});

await test('a frame places its children in its content area, which stretches with it', () => {
    const child = element('container', [ 0, 0, 20, 10 ], { params: { scale: [ 'center', 'fixed' ] } });
    const frame = element('frame', [ 0, 0, 120, 100 ], { margins: [ 10, 30, 10, 10 ], children: [ child ] });
    const windows = buildTemplateWindows([ frame ], input(undefined));

    // Content 100 wide: floor(50) - floor(10) = 40, in content coordinates.
    assert.equal(windows.get(child).x, 40);

    windows.get(frame).setRectangle(0, 0, 220, 100);
    assert.equal(windows.get(child).x, 90);
});

await test('an item grid fills its first row with columns while the next item fits, then wraps to the first column', () => {
    const items = [ 0, 1, 2, 3, 4 ].map(index => element('container', [ 0, 0, 40, 30 ], { name: `item${index}` }));
    const grid = element('itemgrid_vertical', [ 0, 0, 130, 100 ], { vars: { spacing: 5 }, children: items });
    const rects = layoutTemplate([ grid ], input(undefined));

    // Columns at 0, 45, 90: a fourth would end at 90 + 40 + 40 = 170, past 130.
    assert.deepEqual([ 0, 1, 2 ].map(index => [ rects.get(items[index]).x, rects.get(items[index]).y ]), [ [ 0, 0 ], [ 45, 0 ], [ 90, 0 ] ]);
    // The second row, 30 + 5 down.
    assert.deepEqual([ 3, 4 ].map(index => [ rects.get(items[index]).x, rects.get(items[index]).y ]), [ [ 0, 35 ], [ 45, 35 ] ]);
});

await test('a resized item grid is rebuilt at its new width, its items in the order they were added', () => {
    // `ItemGridController.update`'s `WE_RESIZED` -> `rebuildGridStructure` - the avatar editor's one palette widened to the parts grid's width.
    const items = [ 0, 1, 2, 3, 4 ].map(index => element('container', [ 0, 0, 40, 30 ], { name: `item${index}` }));
    const grid = element('itemgrid_vertical', [ 0, 0, 85, 100 ], { vars: { spacing: 5 }, children: items });
    const rects = layoutTemplate([ grid ], input(undefined), undefined, windowOf => windowOf(grid).setWidth(130));

    // Two columns at 85 wide; at 130, three - the items row by row in their first order.
    assert.deepEqual(items.map(item => [ rects.get(item).x, rects.get(item).y ]), [ [ 0, 0 ], [ 45, 0 ], [ 90, 0 ], [ 0, 35 ], [ 45, 35 ] ]);
});

await test('the grid\'s new-column test leaves out the spacing, as the client\'s does', () => {
    const items = [ 0, 1, 2 ].map(index => element('container', [ 0, 0, 40, 30 ], { name: `item${index}` }));
    const grid = element('itemgrid_vertical', [ 0, 0, 125, 100 ], { vars: { spacing: 5 }, children: items });
    const rects = layoutTemplate([ grid ], input(undefined));

    // 45 + 40 + 40 = 125 fits, though the third column then ends at 130.
    assert.equal(rects.get(items[2]).x, 90);
    assert.equal(rects.get(items[2]).y, 0);
});

await test('a grid with resize_on_item_update takes its rows\' height', () => {
    const items = [ 0, 1, 2 ].map(index => element('container', [ 0, 0, 40, 30 ], { name: `item${index}` }));
    const grid = element('itemgrid_vertical', [ 0, 0, 90, 10 ], { vars: { spacing: 5, resize_on_item_update: true }, children: items });

    // Two columns (0, 45); the third item a second row: 30 + 5 + 30.
    assert.equal(layoutTemplate([ grid ], input(undefined)).get(grid).height, 65);
});

const { layoutToTemplate } = await import('../packages/nitro-theme/src/template/layoutToTemplate.ts');
const { existsSync, readFileSync } = await import('node:fs');

/**
 * A layout from the git-ignored local reference bundles (`scripts/habbo-js-resources`, docs/development.md),
 * read when a test first needs it. `skip` is the reason to skip the tests that use it on a machine without
 * the folder (false where it is there); the rest of the file runs either way.
 */
const reference = (path) => {
    const url = new URL(`../scripts/habbo-js-resources/${path}`, import.meta.url);
    let template;
    const read = () => (template ??= layoutToTemplate(readFileSync(url, 'utf8')));

    read.skip = !existsSync(url) && `Local habbo-js-resources layout unavailable (scripts/habbo-js-resources/${path})`;

    return read;
};

/** The client's own window layout of a scrollable list, style 0: a 23 wide `_ITEMLIST` and a 17 wide `_SCROLLBAR` in 40 x 40. */
const listSkin = reference('habbo-window-manager-com/habbo_window_layout_scrollable_itemlist_vertical.xml');
const skinned = { ...input(undefined), skinOf: e => (e.tag === 'scrollable_itemlist_vertical' ? listSkin() : undefined) };

await test('a scrollable list whose items fit hides its scrollbar and gives the list the whole width', { skip: listSkin.skip }, () => {
    const items = [ 0, 1 ].map(index => element('container', [ 0, 0, 180, 30 ], { name: `row${index}`, params: { scale: [ 'stretch', 'fixed' ] } }));
    const list = element('scrollable_itemlist_vertical', [ 0, 0, 200, 100 ], { children: items });
    const windows = buildTemplateWindows([ list ], skinned);
    const scrollable = windows.get(list);

    assert.equal(scrollable.scrollbar.visible, false);
    assert.equal(scrollable.list.width, 200);
    assert.equal(windows.get(items[1]).y, 30);
});

await test('a scrollable list whose items overflow shows its scrollbar at its right edge and narrows the list, stretched items with it', { skip: listSkin.skip }, () => {
    const items = [ 0, 1, 2, 3, 4 ].map(index => element('container', [ 0, 0, 180, 30 ], { name: `row${index}`, params: { scale: [ 'stretch', 'fixed' ] } }));
    const list = element('scrollable_itemlist_vertical', [ 0, 0, 200, 100 ], { children: items });
    const windows = buildTemplateWindows([ list ], skinned);
    const scrollable = windows.get(list);

    // The skin at 200 wide: the list 23 + 160, the scrollbar moved to 23 + 160.
    assert.equal(scrollable.scrollbar.visible, true);
    assert.equal(scrollable.list.width, 183);
    assert.equal(scrollable.scrollbar.x, 183);
    assert.equal(scrollable.scrollbar.width, 17);
    // Stretched with the list's container: 180 - 17 - the items already in it when the scrollbar came.
    assert.equal(windows.get(items[0]).width, 163);
    // The scrollbar enables the moment the list's content grows past it (`ScrollBarController` re-checks
    // on the list's RESIZED, which the list sends as its container grows): items added after keep their width.
    assert.deepEqual(layoutTemplate([ list ], skinned).get(items[4]), { x: 0, y: 120, width: 180, height: 30 });
});

await test('a scrollable list reports its viewport, its scrollbar and its content, and its items in the content', { skip: listSkin.skip }, () => {
    const items = [ 0, 1, 2, 3, 4 ].map(index => element('container', [ 0, 0, 180, 30 ], { name: `row${index}` }));
    const list = element('scrollable_itemlist_vertical', [ 10, 20, 200, 100 ], { children: items });
    const rects = layoutTemplate([ list ], skinned);

    assert.deepEqual(rects.get(list).scroll, {
        viewport: { x: 0, y: 0, width: 183, height: 100 },
        scrollbar: { x: 183, y: 0, width: 17, height: 100, style: undefined },
        content: { width: 183, height: 150 },
    });
    assert.deepEqual(rects.get(items[3]), { x: 0, y: 90, width: 180, height: 30 });
});

await test('a scrollable list that keeps its scrollbar has it before its items go in, so stretched items keep their width', { skip: listSkin.skip }, () => {
    // The navigator's `block_results` (`createMainWindow`: `autoHideScrollBar = false` before any
    // category is added): the category container is not narrowed when the scrollbar shows.
    const items = [ element('container', [ 2, 0, 196, 30 ], { name: 'category', params: { scale: [ 'stretch', 'fixed' ] } }) ];
    const list = element('scrollable_itemlist_vertical', [ 0, 0, 200, 100 ], { children: items });
    const windows = buildTemplateWindows([ list ], { ...skinned, autoHideScrollBarOf: e => e !== list });
    const scrollable = windows.get(list);

    assert.equal(scrollable.scrollbar.visible, true);
    assert.equal(scrollable.list.width, 183);
    assert.equal(windows.get(items[0]).width, 196);
});

await test('a scrollable list resized smaller than its items shows its scrollbar, and hides it again resized to fit them', { skip: listSkin.skip }, () => {
    const items = [ 0, 1, 2 ].map(index => element('container', [ 0, 0, 180, 30 ], { name: `row${index}` }));
    const list = element('scrollable_itemlist_vertical', [ 0, 0, 200, 100 ], { params: { scale: [ 'stretch', 'stretch' ] }, children: items });
    const root = element('container', [ 0, 0, 200, 100 ], { children: [ list ] });
    const windows = buildTemplateWindows([ root ], skinned);
    const scrollable = windows.get(list);

    assert.equal(scrollable.scrollbar.visible, false);

    // The window's code fitting the view to a shorter container (`ItemGridCatalogWidget`'s `fitWidgetView`).
    windows.get(root).setRectangle(0, 0, 200, 60);
    assert.equal(scrollable.height, 60);
    assert.equal(scrollable.scrollbar.visible, true);
    assert.equal(scrollable.list.width, 183);

    windows.get(root).setRectangle(0, 0, 200, 100);
    assert.equal(scrollable.scrollbar.visible, false);
    assert.equal(scrollable.list.width, 200);
});

/** The client's tab context layout, style 3: a `_SELECTOR` inset 8 at either end, a `_CONTENT` under it. */
const tabSkin = reference('habbo-window-manager-com/habbo_window_layout_tab_context_3.xml');

await test('a tab context puts its buttons in its selector, packed from the selector\'s inset whatever the layout placed them at', { skip: tabSkin.skip }, () => {
    const tabs = [ [ 0, 70 ], [ 75, 74 ], [ 144, 82 ] ].map(([ x, width ], index) => element('tab_button', [ x, 0, width, 32 ], { name: `tab${index}` }));
    const context = element('tab_context', [ 0, 2, 500, 30 ], { style: '3', children: tabs });
    const rects = layoutTemplate([ context ], { ...input(undefined), skinOf: e => (e.tag === 'tab_context' ? tabSkin() : undefined) });

    assert.deepEqual(tabs.map(tab => rects.get(tab).x), [ 8, 78, 152 ]);
});

await test('hiding items so the rest fit hides the scrollbar again', { skip: listSkin.skip }, () => {
    const items = [ 0, 1, 2, 3, 4 ].map(index => element('container', [ 0, 0, 180, 30 ], { name: `row${index}` }));
    const list = element('scrollable_itemlist_vertical', [ 0, 0, 200, 100 ], { children: items });
    const windows = buildTemplateWindows([ list ], { ...skinned, visibleOf: e => e === list || e === items[0] || e === items[1] });

    assert.equal(windows.get(list).scrollbar.visible, false);
    assert.equal(windows.get(list).list.width, 200);
});

await test('an item the layout hides takes no room while the list is built (ItemListIterator adds with addListItemAt, which re-arranges)', () => {
    // The avatar menu in small: the list reflects its height to the border; `minimize`, built after it, moves with the border's bottom.
    const rows = [ 0, 1, 2 ].map(index => element('container', [ 0, 0, 100, 26 ], { name: `row${index}`, hidden: index === 1 }));
    const list = element('itemlist_vertical', [ 0, 10, 100, 53 ], { vars: { spacing: 1, resize_on_item_update: true }, params: { reflectToParent: [ false, true ] }, children: rows });
    const minimize = element('region', [ 0, 70, 100, 18 ], { name: 'minimize', params: { scale: [ 'fixed', 'move' ] } });
    const border = element('container', [ 0, 0, 100, 90 ], { children: [ list, minimize ] });
    const rects = layoutTemplate([ border ], { ...input(undefined), visibleOf: e => e !== rows[0] && !e.hidden });

    // Built: the list 53 (two visible rows) and the border 90 as the layout has them, `minimize` at 70.
    // Then row 0 hidden: the list 26, the border 63, `minimize` 27 up.
    assert.equal(rects.get(list).height, 26);
    assert.equal(rects.get(border).height, 63);
    assert.equal(rects.get(minimize).y, 43);
});

await test('arrange runs once the layout is built: it reads a text\'s width and moves windows through setRectangle', () => {
    const label = element('text', [ 3, 9, 137, 16 ], { name: 'label', vars: { auto_size: 'center' } });
    const icon = element('icon', [ 128, 12, 5, 10 ], { name: 'icon', tags: [ 'arrow_right' ] });
    const button = element('container', [ 0, 0, 143, 35 ], { name: 'button', params: { accommodate: 'expand' }, children: [ label, icon ] });
    let textWidth;
    const rects = layoutTemplate([ button ], { captionOf: e => (e === label ? 'Moderate' : ''), measure: () => ({ width: 52, height: 16, textWidth: 48 }) }, undefined, (windowOf) => {
        const labelWindow = windowOf(label);
        const iconWindow = windowOf(icon);

        textWidth = labelWindow.textWidth;
        // ButtonMenuView: 3 + (137 + 48) / 2 + 8 = 103.5 -> 103.
        iconWindow.setX(labelWindow.x + ((labelWindow.width + labelWindow.textWidth) / 2) + 8);
        // Past the button's right edge: the button, expanding to its children, follows.
        iconWindow.setX(150);
    });

    assert.equal(textWidth, 48);
    assert.equal(rects.get(icon).x, 150);
    assert.equal(rects.get(button).width, 155);
});

await test('a standalone scrollbar scrolls the window its scrollable var names, found under its parent', () => {
    const list = element('itemlist_vertical', [ 0, 0, 367, 10 ], { name: 'achievements_scrollarea' });
    const bar = element('scrollbar_vertical', [ 350, 0, 18, 50 ], { name: 'achievements_scrollbar', vars: { scrollable: 'achievements_scrollarea' } });
    const other = element('itemlist_vertical', [ 0, 0, 10, 10 ], { name: 'first' });
    const root = element('container', [ 0, 0, 367, 100 ], { children: [ other, list, bar ] });

    assert.equal(linkTemplateScrollbars([ root ]).get(bar), list);
});

await test('without a name it scrolls its parent when that scrolls, else the parent\'s first scrollable child', () => {
    const inner = element('scrollbar_vertical', [ 0, 0, 18, 50 ]);
    const parentList = element('itemlist', [ 0, 0, 100, 100 ], { children: [ inner ] });
    const sibling = element('scrollbar_vertical', [ 0, 0, 18, 50 ]);
    const firstList = element('itemgrid_vertical', [ 0, 0, 100, 100 ]);
    const root = element('container', [ 0, 0, 200, 200 ], { children: [ parentList, sibling, firstList ] });
    const links = linkTemplateScrollbars([ root ]);

    assert.equal(links.get(inner), parentList);
    // The parent's first scrollable child is `parentList`, before `firstList`.
    assert.equal(links.get(sibling), parentList);
});

await test('a scrollbar scrolls the text field it names (floor_plan_export_import\'s data)', () => {
    const field = element('input', [ 0, 1, 347, 266 ], { name: 'data', vars: { multiline: true } });
    const border = element('border', [ 8, 12, 348, 269 ], { children: [ field ] });
    const vertical = element('scrollbar_vertical', [ 356, 12, 17, 268 ], { vars: { scrollable: 'data' } });
    const horizontal = element('scrollbar_horizontal', [ 8, 280, 349, 18 ], { vars: { scrollable: 'data' } });
    const links = linkTemplateScrollbars([ element('frame', [ 0, 0, 379, 374 ], { children: [ border, vertical, horizontal ] }) ]);

    assert.equal(links.get(vertical), field);
    assert.equal(links.get(horizontal), field);
});

await test('a scrollbar whose target is a text that is not a field is linked to nothing (it is not scrolled yet)', () => {
    const text = element('text', [ 0, 0, 100, 100 ], { name: 'data' });
    const bar = element('scrollbar_vertical', [ 100, 0, 18, 100 ], { vars: { scrollable: 'data' } });
    const list = element('itemlist', [ 0, 0, 100, 100 ]);

    assert.equal(linkTemplateScrollbars([ element('container', [ 0, 0, 200, 100 ], { children: [ text, bar, list ] }) ]).size, 0);
});

await test('a scrolled list keeps its own rect and carries its items\' extent', () => {
    const items = element('container', [ 0, 0, 367, 10 ], { name: 'achievements_cont' });
    const list = element('itemlist_vertical', [ 0, 0, 367, 10 ], { name: 'achievements_scrollarea', limits: [ null, null, null, 245 ], children: [ items ] });
    const bar = element('scrollbar_vertical', [ 350, 0, 18, 50 ], { vars: { scrollable: 'achievements_scrollarea' } });
    const root = element('container', [ 0, 0, 367, 100 ], { children: [ list, bar ] });
    const rects = layoutTemplate([ root ], { ...input(undefined), scrollTargets: new Set([ list ]) }, undefined, (windowOf) => {
        // `refreshAchievementList`: five rows of slots, the list as tall as they are, to its limit.
        windowOf(items).setHeight(303);
        windowOf(list).setHeight(304);
    });

    assert.deepEqual(rects.get(list).scrollContent, { width: 367, height: 303 });
    assert.equal(rects.get(list).height, 245);
    assert.equal(rects.get(list).clip, undefined);
    assert.equal(rects.get(bar).scrollContent, undefined);
});

await test('a clone is set up before its own clones are added, so an accommodating window grows round them', () => {
    // `getOpenCategoryElement`: `container.height = 16 + rows`, then the rooms added to `roomList`.
    const row = element('container', [ 0, 0, 100, 40 ], { itemKey: 'r' });
    const list = element('itemlist', [ 0, 30, 100, 10 ], { name: 'content', vars: { resize_on_item_update: true }, params: { accommodate: 'resize' }, children: [ { ...row, itemKey: 'a' }, { ...row, itemKey: 'b' } ] });
    const block = element('container', [ 0, 0, 100, 200 ], { name: 'block', params: { accommodate: 'resize' }, itemKey: 'block', children: [ list ] });
    const results = element('itemlist', [ 0, 0, 100, 500 ], { name: 'results', children: [ block ] });
    let contentAtSetup;
    const rects = layoutTemplate([ results ], {
        ...input(undefined),
        setupOf: element => (element === block
            ? (windowOf) => {
                    contentAtSetup = windowOf(list).height;
                    windowOf(block).setHeight(56);
                }
            : undefined),
    });

    assert.equal(contentAtSetup, 10, 'the rows are not in the list yet when the block is set up');
    assert.equal(rects.get(list).height, 80);
    assert.equal(rects.get(block).height, 110, 'the block grows round its rows after being set to 56');
});

await test('a list\'s spacing as the code sets it goes over the layout\'s', () => {
    const items = [ 0, 1, 2 ].map(index => element('container', [ 0, 0, 50, 20 ], { itemKey: String(index) }));
    const list = element('itemlist', [ 0, 0, 50, 100 ], { vars: { spacing: 5 }, children: items });

    assert.deepEqual(items.map(item => layoutTemplate([ list ], input(undefined)).get(item).y), [ 0, 25, 50 ]);
    assert.deepEqual(items.map(item => layoutTemplate([ list ], { ...input(undefined), spacingOf: () => 0 }).get(item).y), [ 0, 20, 40 ]);
});

/** `habbo_window_layout_button_shiny`: a 20 x 22 layout whose `_BTN_TEXT` has 8 / 2 / 8 / 3 margins. */
const buttonInput = textWidth => ({
    ...input(undefined),
    captionOf: element => element.caption ?? '',
    measure: (element, text) => (element.tag === 'label' ? { width: text.length * textWidth, height: 15 } : undefined),
    buttonLabelOf: () => ({ width: 20, height: 22, textStyle: 'button_shiny_regular', margins: { left: 8, top: 2, right: 8, bottom: 3 } }),
});

await test('a button takes its caption\'s width, keeping the edge its resize alignment names', () => {
    // `club_buy_hc_item`'s `item_buy`: 151 wide at -8, aligned right, `width_min` 40.
    const button = element('button', [ -8, 38, 151, 22 ], { caption: 'Buy', limits: [ 40, null, null, null ], params: { accommodate: 'expand', align: [ 'right', 'top' ] } });
    const item = element('border', [ 0, 0, 151, 67 ], { children: [ button ] });

    // "Buy" at 10 a character: 30 + 16 = 46 wide, its right edge still at 143.
    assert.deepEqual(layoutTemplate([ item ], buttonInput(10)).get(button), { x: 97, y: 38, width: 46, height: 22 });
    // A shorter caption stops at `width_min`.
    assert.deepEqual(layoutTemplate([ item ], buttonInput(4)).get(button), { x: 103, y: 38, width: 40, height: 22 });
});

await test('a button without its window layout keeps its layout rect', () => {
    const button = element('button', [ 10, 5, 151, 22 ], { caption: 'Buy' });

    assert.deepEqual(layoutTemplate([ button ], { ...buttonInput(10), buttonLabelOf: undefined }).get(button), { x: 10, y: 5, width: 151, height: 22 });
});

await test('a bitmap that fits its contents takes its bitmap\'s size times its zoom, once the bitmap is loaded', () => {
    const fitted = element('static_bitmap', [ 5, 5, 100, 100 ], { vars: { fit_size_to_contents: true, zoom_x: -2 } });
    const unfitted = element('static_bitmap', [ 5, 5, 100, 100 ]);
    const loaded = { ...input(undefined), bitmapSizeOf: () => ({ width: 13, height: 22 }) };
    const rects = layoutTemplate([ fitted, unfitted ], loaded);

    assert.deepEqual(rects.get(fitted), { x: 5, y: 5, width: 26, height: 22 });
    assert.deepEqual(rects.get(unfitted), { x: 5, y: 5, width: 100, height: 100 });
    // Not loaded yet: the layout's rect.
    assert.deepEqual(layoutTemplate([ fitted ], input(undefined)).get(fitted), { x: 5, y: 5, width: 100, height: 100 });
});

await test('a fitted bitmap in a list takes its room at its own size', () => {
    const icons = [ 0, 1 ].map(index => element('static_bitmap', [ 0, 0, 40, 40 ], { name: `icon${index}`, vars: { fit_size_to_contents: true } }));
    const list = element('itemlist_horizontal', [ 0, 0, 200, 40 ], { vars: { spacing: 2 }, children: icons });
    const rects = layoutTemplate([ list ], { ...input(undefined), bitmapSizeOf: () => ({ width: 13, height: 22 }) });

    assert.deepEqual(icons.map(icon => rects.get(icon).x), [ 0, 15 ]);
});

await test('a button group button takes its caption\'s width as a button does', () => {
    const left = element('button_group_left', [ 0, 0, 120, 22 ], { caption: 'Buy' });

    // 30 + 8 + 8, from its own left edge.
    assert.deepEqual(layoutTemplate([ left ], buttonInput(10)).get(left), { x: 0, y: 0, width: 46, height: 22 });
});

await test('a tab button resizes to its title\'s extent from its own origin, the title re-centred first', () => {
    const tab = element('tab_button', [ 0, 0, 110, 22 ], { caption: 'Furniture' });
    const short = element('tab_button', [ 0, 0, 110, 22 ], { caption: 'A' });

    // A 90 + 16 wide title, re-centred in the 110 wide tab (55 - 53 = 2): the tab ends at 2 + 106; the
    // 22 high container keeps the height.
    assert.deepEqual(layoutTemplate([ tab ], buttonInput(10)).get(tab), { x: 0, y: 0, width: 108, height: 22 });
    // A 2 + 16 wide title centred at 55 - 9 = 46: the tab shrinks to 46 + 18.
    assert.equal(layoutTemplate([ short ], buttonInput(2)).get(short).width, 64);
});

await test('a box sizer lays its visible children across it, padded and spaced, then takes their extent', () => {
    const cells = [ 0, 1, 2 ].map(index => element('region', [ 0, 0, 50, 48 ], { name: `cell${index}`, hidden: index === 1 }));
    // `me_menu_new_view`'s box: resize to accommodate, the defaults' 8 padding and 5 spacing.
    const box = element('boxsizer', [ 3, 3, 543, 50 ], { params: { parentGraphics: true, accommodate: 'resize' }, children: cells });
    const rects = layoutTemplate([ box ], input(undefined));

    assert.deepEqual([ 0, 2 ].map(index => [ rects.get(cells[index]).x, rects.get(cells[index]).y ]), [ [ 8, 8 ], [ 63, 8 ] ]);
    // The children's extent from its own origin: 63 + 50 across, 8 + 48 down.
    assert.deepEqual(rects.get(box), { x: 3, y: 3, width: 113, height: 56 });
});

await test('a vertical box sizer stacks its children down it, and shares what is left among its relative ones', () => {
    const fixed = element('container', [ 0, 0, 40, 20 ], { name: 'fixed' });
    const one = element('container', [ 0, 0, 40, 10 ], { name: 'one', tags: [ 'relative(1)' ] });
    const three = element('container', [ 0, 0, 40, 10 ], { name: 'three', tags: [ 'relative(3)' ] });
    const box = element('boxsizer', [ 0, 0, 60, 200 ], { vars: { vertical: true, spacing: 4, padding_horizontal: 2, padding_vertical: 6 }, children: [ fixed, one, three ] });
    const rects = layoutTemplate([ box ], input(undefined));

    // 200 - 12 padding - (20 + 4) - 4 - 4 + 4 = 160 shared one to three.
    assert.deepEqual([ fixed, one, three ].map(child => [ rects.get(child).x, rects.get(child).y, rects.get(child).height ]), [ [ 2, 6, 20 ], [ 2, 30, 40 ], [ 2, 74, 120 ] ]);
});

await test('a window clips the children drawn into its graphic context, not those with a context of their own', () => {
    // The VIP page's `hccenter_link`: 13px above its 17px container, with no `use_parent_graphic_context`.
    const link = element('html', [ 40, -13, 236, 30 ], { name: 'hccenter_link' });
    const container = element('container', [ 19, 434, 316, 17 ], { children: [ link ] });
    // The avatar menu's 143 x 35 button in its 137 x 26 row draws into the row's context.
    const button = element('container_button', [ -3, -4, 143, 35 ], { params: { parentGraphics: true } });
    const row = element('container', [ 0, 0, 137, 26 ], { children: [ button ] });
    const rects = layoutTemplate([ container, row ], input(undefined));

    assert.equal(rects.get(container).clip, undefined);
    assert.equal(rects.get(row).clip, true);
});

await test('_Str_14067: only the children that show count when a window takes its children\'s extent', () => {
    const parent = new LayoutWindow(undefined, { x: 0, y: 0, width: 10, height: 10 }, 0);
    const shown = new LayoutWindow(undefined, { x: 0, y: 0, width: 43, height: 20 }, 0, parent);
    const hidden = new LayoutWindow(undefined, { x: 0, y: 0, width: 52, height: 30 }, 0, parent);

    hidden.visible = false;
    parent.resizeToAccommodateChildren();

    assert.equal(shown.visible, true);
    assert.deepEqual([ parent.width, parent.height ], [ 43, 20 ]);
});

const nestBreedingSuccess = reference('habbo-room-ui-com/nestBreedingSuccess.xml');

await test('WindowParser: a layout\'s outer DropShadowFilter, with its defaults for what it leaves out', { skip: nestBreedingSuccess.skip }, () => {
    const template = nestBreedingSuccess();

    assert.deepEqual(template.elements[0].dropShadow, { distance: 0, angle: 0, color: 0, alpha: 0.34901960784313724, blur: 20 });
});

const { localizeCaption } = await import('../packages/nitro-theme/src/template/localizeCaption.ts');

await test('TextController.set text: only a caption starting with ${ is a text key', () => {
    const texts = { 'a.b': 'Read', 'mannequin.widget.savetext': 'Saved' };
    const resolve = text => text.replace(/\$\{([^}]+)\}/g, (whole, key) => texts[key] ?? whole);

    assert.equal(localizeCaption('${a.b}', resolve), 'Read');
    // An unclosed key loses its last character, as `slice(2, indexOf("}"))` does with -1.
    assert.equal(localizeCaption('${mannequin.widget.savetext ', resolve), 'Saved');
    // A player's text is shown as typed, a ${key} inside it included.
    assert.equal(localizeCaption('my note ${a.b}', resolve), 'my note ${a.b}');
    assert.equal(localizeCaption(undefined, resolve), '');
});

await test('the static resizeToAccommodateChildren: as far as the shown children reach from the origin', () => {
    const content = new LayoutWindow(undefined, { x: 6, y: 30, width: 300, height: 300 }, 0);
    const list = new LayoutWindow(undefined, { x: 4, y: 2, width: 274, height: 180 }, 0, content);
    const hidden = new LayoutWindow(undefined, { x: 0, y: 0, width: 400, height: 400 }, 0, content);

    hidden.visible = false;
    content.sizeToChildren();

    assert.equal(list.x, 4);
    assert.deepEqual([ content.x, content.y, content.width, content.height ], [ 6, 30, 278, 182 ]);
});
