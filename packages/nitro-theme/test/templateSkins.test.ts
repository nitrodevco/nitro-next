import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { TemplateElement } from '../src/template/templateData';
import { buildSkinMap, plainCoverOfTint, templateElementSkins, themeSkinSprites, themeSpriteSkins } from '../src/template/templateSkins';
import type { ThemeVariantsData } from '../src/utils/themeRegistry';

// Entries of the window manager bundle's `theme-variants.json` and `theme_spritesheet.json`, as published.
const slice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number) => ({ kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight });
const theme = {
    version: 1,
    variants: {
        border: { 9: { layer: slice('habbo-border-9-border-9-default-src', 7, 7, 7, 8), tintColor: '#686661' } },
        frame: {
            0: { layer: slice('habbo-frame-frame-default-src', 10, 33, 10, 10) },
            1: { layer: slice('habbo-frame-frame-default-src', 10, 33, 10, 10) },
            3: { layout: { minWidth: 64 }, layer: slice('habbo-frame-3-frame-3-default-src', 10, 33, 10, 10), plain: slice('habbo-frame-3-frame-3-default-plain-src', 10, 33, 10, 10) },
        },
        header: { 3: { layer: { kind: 'composite', pieces: [ { textureKey: 'habbo-header-3-header-3-default-src', left: 0, top: 0, width: 6, height: 20 } ] } } },
        closeButton: { 3: { states: { default: { kind: 'sprite', textureKey: 'habbo-button-close-3-button-close-3-default-src' } } } },
        contentArea: { 3: { layout: { marginLeft: 10 } } },
        tabButton: { 0: { layer: slice('habbo-button-tab-button-tab-default-src', 3, 3, 3, 3) }, 3: { layer: slice('habbo-button-tab-3-button-tab-3-default-src', 9, 0, 9, 0) } },
        scrollbarSliderBarVertical: { 3: { states: { default: { kind: 'sprite', textureKey: 'habbo-scrollbar-3-bar-src' } } } },
    },
    cascade: {
        frame: { 3: { header: '3', contentArea: '3', tabButton: '3' } },
        header: { 3: { closeButton: '3' } },
    },
    icons: { 5: { x: 18, y: 0, width: 9, height: 9 } },
} as unknown as ThemeVariantsData;
const frames = {
    'theme-habbo-border-9-border-9-default': { frame: { w: 15, h: 16 } },
    'theme-habbo-frame-frame-default': { frame: { w: 27, h: 46 } },
    'theme-habbo-frame-3-frame-3-default': { frame: { w: 64, h: 64 } },
    'theme-habbo-frame-3-frame-3-default-plain': { frame: { w: 64, h: 64 } },
    'theme-icon-set': { frame: { w: 400, h: 300 } },
};

const element = (tag: string, extra: Partial<TemplateElement> = {}, children: TemplateElement[] = []): TemplateElement => ({ tag, x: 0, y: 0, width: 10, height: 10, vars: {}, children, ...extra });

void test('an element draws its own style, else what the components around it cascade, else 0 - a tab its own 0 - and a frame its header and close button in its cascade', () => {
    const tab = element('tab_button');
    const frame = element('frame', { style: '3' }, [ tab ]);
    const border = element('border', { style: '9' });

    assert.deepEqual(templateElementSkins([ frame ], theme), [
        { component: 'frame', style: '3' },
        { component: 'header', style: '3', via: 'frame:3' },
        { component: 'closeButton', style: '3', via: 'frame:3' },
        { component: 'contentArea', style: '3', via: 'frame:3' },
        { component: 'scaler', style: '0', via: 'frame:3' },
    ]);
    assert.deepEqual(templateElementSkins([ frame, tab ], theme), [ { component: 'tabButton', style: '0' } ]);
    assert.deepEqual(templateElementSkins([ element('container', {}, [ border ]), border ], theme), [ { component: 'border', style: '9' } ]);
    assert.deepEqual(templateElementSkins([ element('frame', { style: 'none' }) ], theme), []);
});

void test('a skin\'s sprites carry their sheet size and nine-slice, an icon its rect in the icon set', () => {
    assert.deepEqual(themeSkinSprites(theme, 'border', '9', frames), [
        { part: 'layer', sprite: 'theme-habbo-border-9-border-9-default', overlay: 'habbo-window-manager-com/theme-habbo-border-9-border-9-default', width: 15, height: 16, slice: { left: 7, top: 7, right: 7, bottom: 8 } },
    ]);
    assert.deepEqual(themeSkinSprites(theme, 'frame', '3', frames).map(sprite => [ sprite.part, sprite.sprite, sprite.width, sprite.height ]), [
        [ 'layer', 'theme-habbo-frame-3-frame-3-default', 64, 64 ],
        [ 'plain', 'theme-habbo-frame-3-frame-3-default-plain', 64, 64 ],
    ]);
    assert.deepEqual(themeSkinSprites(theme, 'icon', '5', frames), [
        { part: 'icons.5', sprite: 'theme-icon-set', overlay: 'habbo-window-manager-com/theme-icon-set', width: 400, height: 300, rect: { x: 18, y: 0, width: 9, height: 9 } },
    ]);
    assert.deepEqual(themeSkinSprites(theme, 'contentArea', '3', frames), []);
});

void test('the map lists the windows and elements drawing each skin, a composite\'s inner layout as its element, and every skin a shared sprite re-skins', () => {
    const list = element('scrollable_itemlist_vertical', { name: 'navigationList', style: '3' });
    const catalog = { name: 'catalog', width: 10, height: 10, elements: [ element('frame', { style: '3' }, [ list ]) ], skins: {
        'scrollable_itemlist_vertical:3': { name: 'skin', width: 10, height: 10, elements: [ element('scrollbar_slider_bar_vertical', { style: '3' }) ] },
    } };
    const purse = { name: 'purse', width: 10, height: 10, elements: [ element('container', {}, [ element('border', { style: '9' }) ]) ] };
    const map = buildSkinMap(theme, frames, { 'lib/catalog_xml': catalog, 'lib/purse_xml': purse });

    assert.deepEqual(map.skins['border:9'].windows, { 'lib/purse_xml': [ '@0' ] });
    assert.deepEqual(map.skins['frame:3'].windows, { 'lib/catalog_xml': [ '' ] });
    assert.deepEqual(map.skins['closeButton:3'].windows, { 'lib/catalog_xml': [ '' ] });
    assert.deepEqual(map.skins['scrollbarSliderBarVertical:3'].windows, { 'lib/catalog_xml': [ 'navigationList' ] });
    assert.deepEqual(map.sprites['theme-habbo-frame-frame-default'], { width: 27, height: 46, skins: [ 'frame:0', 'frame:1' ] });
    assert.deepEqual(themeSpriteSkins(theme).get('theme-habbo-frame-frame-default'), [ 'frame:0', 'frame:1' ]);
    assert.equal(map.skins['contentArea:3'], undefined);
});

// Stranger test S3 (3.2 #3): an opaque copy of the frame as its -plain twin hid the window's colour
// (the plain pieces are drawn over the tinted layer), and nothing said so.
void test('a plain twin opaque over the tinted art covers it; one transparent there covers none of it', () => {
    const alpha = (rows: string[]) => ({ width: rows[0].length, height: rows.length, data: rows.join('').split('').map(c => (c === '#' ? 255 : c === '+' ? 128 : 0)) });
    const layer = alpha([ '####', '####', '....', '....' ]);

    assert.equal(plainCoverOfTint(layer, alpha([ '####', '####', '####', '####' ])), 1);
    assert.equal(plainCoverOfTint(layer, alpha([ '....', '....', '####', '####' ])), 0);
    assert.equal(plainCoverOfTint(layer, alpha([ '++++', '##..', '####', '####' ])), 0.25);
    assert.equal(plainCoverOfTint(alpha([ '....' ]), alpha([ '####' ])), 0);
});
