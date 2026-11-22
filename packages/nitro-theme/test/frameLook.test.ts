import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { Template, TemplateElement } from '../src/template/templateData';
import type { TemplatePatch } from '../src/template/templatePatch';
import { ineffectiveTemplateSets } from '../src/template/templatePatchEffect';
import { frameOverrideOf, layerFrameOverrides, rootFrameOverride, templatePatchSets } from '../src/utils/frameOverrides';

const element = (tag: string, name: string, children: TemplateElement[] = [], extra: Partial<TemplateElement> = {}): TemplateElement => ({ tag, name, x: 0, y: 0, width: 10, height: 10, vars: {}, children, ...extra });

// The catalogue's window as its layout has it: a frame whose colour and caption the window's code sets
// (`refreshCatalogWindowChrome`, `catalog.title`) - the window a stranger's root `color` patch did nothing to (S2).
const CATALOG = 'habbo-catalog-com/catalog_ubuntu_with_tabs';
const catalog = (): Template => ({
    name: 'catalog_ubuntu_with_tabs',
    width: 570,
    height: 635,
    elements: [ element('frame', 'catalog_main_container', [ element('background', 'catalog.header.background.border') ], { color: 0xff418db0, style: '3' }) ],
});
const CODE_BINDINGS = { '': { caption: 'Shop', color: 4296112 } };

void test('a root patch\'s style, colour and position are the frame\'s look, the later patch over the earlier', () => {
    const patches: TemplatePatch[] = [
        { owner: 'theme', template: CATALOG, order: -1, ops: [ { element: '', set: { color: 0xffa03030, style: '0' } } ] },
        { owner: 'addon', template: 'habbo-catalog-com/*', ops: [ { element: '', set: { position: { x: 84, y: 153 } } }, { element: '', set: { color: 0xff00ff00 } } ] },
        { owner: 'other', template: 'habbo-toolbar-com/purse_xml', ops: [ { element: '', set: { color: 0xff0000ff } } ] },
    ];

    assert.deepEqual(rootFrameOverride(templatePatchSets(patches, CATALOG)), { color: '#00ff00', variant: '0', position: { x: 84, y: 153 } });
    assert.equal(rootFrameOverride(templatePatchSets(patches, 'habbo-friend-list-com/friend_list_xml')), undefined);
});

void test('a patch\'s look goes over frame.overrides, which goes over what the code passes (the precedence Frame draws)', () => {
    const hotel = frameOverrideOf({ catalog: { variant: '102', color: '#336699', position: { x: 1, y: 2 } } }, 'catalog');

    assert.deepEqual(layerFrameOverrides(hotel, { color: '#a03030' }), { variant: '102', color: '#a03030', position: { x: 1, y: 2 } });
    assert.deepEqual(layerFrameOverrides(undefined, { color: '#a03030' }), { color: '#a03030' });
    assert.equal(layerFrameOverrides(undefined, undefined), undefined);
});

void test('S2: a root colour on a framed window is drawn; a root caption its code sets is reported ineffective', () => {
    const sets = templatePatchSets([ { owner: 'hotel', template: CATALOG, ops: [ { element: '', set: { color: 0xffa03030 } }, { element: '', set: { caption: 'Mine' } } ] } ], CATALOG);

    assert.deepEqual(ineffectiveTemplateSets(CATALOG, catalog(), sets, CODE_BINDINGS), [ { template: CATALOG, owner: 'hotel', element: '', property: 'caption' } ]);
});

void test('a field the code binds on an element, named by any of its keys, is ineffective; a field it does not bind is drawn', () => {
    const sets = templatePatchSets([ { owner: 'hotel', template: CATALOG, ops: [ { element: '@0', set: { color: 0xff000000, blend: 0.5 } }, { element: 'catalog.header.background.border', set: { hidden: true } } ] } ], CATALOG);
    const bindings = { 'catalog.header.background.border': { color: 0xff376275, visible: true } };

    assert.deepEqual(ineffectiveTemplateSets(CATALOG, catalog(), sets, bindings).map(miss => `${miss.element}.${miss.property}`), [ '@0.color', 'catalog.header.background.border.hidden' ]);
});

void test('a position anywhere but a framed window\'s root is ineffective: nothing opens there', () => {
    const purse: Template = { name: 'purse', width: 230, height: 77, elements: [ element('container', 'purse', [ element('border', 'b') ]) ] };
    const sets = templatePatchSets([ { owner: 'hotel', template: 'habbo-toolbar-com/purse_xml', ops: [ { element: '', set: { position: { x: 1, y: 1 } } }, { element: 'b', set: { position: { x: 1, y: 1 } } } ] } ], 'habbo-toolbar-com/purse_xml');

    assert.deepEqual(ineffectiveTemplateSets('habbo-toolbar-com/purse_xml', purse, sets, undefined).map(miss => `${miss.element}.${miss.property}`), [ '.position', 'b.position' ]);
});

void test('a frame of Nitro\'s own is addressed by its id as a patch\'s template', () => {
    const patches: TemplatePatch[] = [ { owner: 'theme', template: 'wired-setup', ops: [ { element: '', set: { style: '102', color: 0xff3a6ea5 } } ] } ];

    assert.deepEqual(rootFrameOverride(templatePatchSets(patches, 'wired-setup')), { variant: '102', color: '#3a6ea5' });
    assert.equal(rootFrameOverride(templatePatchSets(patches, 'wired-message-editor')), undefined);
});
