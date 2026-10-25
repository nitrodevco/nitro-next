import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { Template, TemplateElement } from '../src/template/templateData';
import { applyTemplatePatches, TemplatePatch } from '../src/template/templatePatch';

const element = (tag: string, name: string, children: TemplateElement[] = [], extra: Partial<TemplateElement> = {}): TemplateElement => ({ tag, name, x: 0, y: 0, width: 10, height: 10, vars: {}, children, ...extra });

const friendList = (): Template => ({
    name: 'friend_list',
    width: 200,
    height: 300,
    elements: [
        element('frame', 'friend_list', [
            element('container', 'header', [ element('text', 'title', [], { caption: '${friendlist.title}' }) ]),
            element('itemlist_vertical', 'friends', []),
            element('button', 'search', [], { caption: '${friendlist.search}' }),
        ], { color: 0xff336699 }),
    ],
});

const ID = 'habbo-friend-list-com/friend_list_xml';

test('a theme recolours a window without touching the source template', () => {
    const source = friendList();
    const { template, report } = applyTemplatePatches(source, ID, [ { owner: 'classic', template: ID, ops: [ { element: '', set: { color: 0xffffcc00 } } ] } ]);

    assert.equal(template.elements[0].color, 0xffffcc00);
    assert.equal(source.elements[0].color, 0xff336699);
    assert.deepEqual(report, { applied: 1, conflicts: [], unmatched: [] });
});

test('patches for other templates leave the template as it is (same object)', () => {
    const source = friendList();
    const { template } = applyTemplatePatches(source, ID, [ { owner: 'a', template: 'habbo-catalog-com/catalog_xml', ops: [ { element: '', remove: true } ] } ]);

    assert.equal(template, source);
});

test('two add-ons add to one window side by side, each element named after its owner', () => {
    const notes: TemplatePatch = { owner: 'notes', template: ID, ops: [ { element: 'search', insert: 'before', add: { tag: 'button', name: 'notes', caption: 'Notes', width: 40, height: 20 } } ] };
    const status: TemplatePatch = { owner: 'status', template: ID, ops: [ { element: 'friend_list', insert: 'last', add: { tag: 'icon', name: 'online' } } ] };
    const { template, report } = applyTemplatePatches(friendList(), ID, [ status, notes ]);
    const names = template.elements[0].children.map(child => child.name);

    assert.deepEqual(names, [ 'header', 'friends', 'notes:notes', 'search', 'status:online' ]);
    assert.equal(report.conflicts.length, 0);
});

test('an owner reaches the elements it added by their short name', () => {
    const { template } = applyTemplatePatches(friendList(), ID, [ {
        owner: 'notes',
        template: ID,
        ops: [
            { element: 'friend_list', insert: 'last', add: { tag: 'container', name: 'panel', children: [ { tag: 'text', name: 'label' } ] } },
            { element: 'panel/label', set: { caption: 'Hi' } },
        ],
    } ]);

    const panel = template.elements[0].children.at(-1)!;

    assert.equal(panel.name, 'notes:panel');
    assert.equal(panel.children[0].name, 'notes:label');
    assert.equal(panel.children[0].caption, 'Hi');
});

test('two owners setting one property is reported, and the later in order wins', () => {
    const patches: TemplatePatch[] = [
        { owner: 'zeta', template: ID, ops: [ { element: 'title', set: { caption: 'Z' } } ] },
        { owner: 'alpha', template: ID, ops: [ { element: 'title', set: { caption: 'A', hidden: false } } ] },
    ];
    const { template, report } = applyTemplatePatches(friendList(), ID, patches);
    const title = template.elements[0].children[0].children[0];

    // Same order: by owner key, so alpha runs first and zeta's caption is kept - whatever order they loaded in.
    assert.equal(title.caption, 'Z');
    assert.deepEqual(report.conflicts, [ { template: ID, element: 'title', property: 'caption', owners: [ 'alpha', 'zeta' ] } ]);
});

test('order puts a base theme under the add-ons that build on it', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [
        { owner: 'addon', template: ID, ops: [ { element: '', set: { color: 1 } } ] },
        { owner: 'theme', template: ID, order: -10, ops: [ { element: '', set: { color: 2 } } ] },
    ]);

    assert.equal(template.elements[0].color, 1);
    assert.deepEqual(report.conflicts[0].owners, [ 'theme', 'addon' ]);
});

test('vars merge by key and conflict per key', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [
        { owner: 'a', template: ID, ops: [ { element: 'search', set: { vars: { asset_uri: 'a.png', text_color: 1 } } } ] },
        { owner: 'b', template: ID, ops: [ { element: 'search', set: { vars: { asset_uri: 'b.png' } } } ] },
    ]);

    assert.deepEqual(template.elements[0].children[2].vars, { asset_uri: 'b.png', text_color: 1 });
    assert.deepEqual(report.conflicts.map(conflict => conflict.property), [ 'vars.asset_uri' ]);
});

test('an element the template no longer has is reported, the rest still applies', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [ { owner: 'old', template: ID, ops: [ { element: 'renamed_in_2027', set: { hidden: true } }, { element: 'search', remove: true } ] } ]);

    assert.deepEqual(report.unmatched, [ { template: ID, owner: 'old', element: 'renamed_in_2027' } ]);
    assert.equal(report.applied, 1);
    assert.deepEqual(template.elements[0].children.map(child => child.name), [ 'header', 'friends' ]);
});

test('an owner cannot reach another owner\'s added element by its short name', () => {
    const { report } = applyTemplatePatches(friendList(), ID, [
        { owner: 'a', template: ID, ops: [ { element: 'friend_list', insert: 'last', add: { tag: 'text', name: 'label' } } ] },
        { owner: 'b', template: ID, ops: [ { element: 'label', set: { caption: 'stolen' } } ] },
    ]);

    assert.deepEqual(report.unmatched, [ { template: ID, owner: 'b', element: 'label' } ]);
});

test('an element added like another starts as its copy: input flags, look and children, with the given fields over them', () => {
    const source = friendList();
    const search = source.elements[0].children[2];

    search.params = { events: [ 'input' ] };
    search.children = [ element('label', 'search_label', [], { caption: '${friendlist.search}', vars: { text_color: 0xffffff } }) ];

    const { template, report } = applyTemplatePatches(source, ID, [ {
        owner: 'notes',
        template: ID,
        ops: [ { element: 'search', insert: 'after', add: { like: 'search', name: 'notes', caption: 'Notes', vars: { tool_tip_caption: 'Your notes' } } } ],
    } ]);
    const added = template.elements[0].children[3];

    assert.equal(report.unmatched.length, 0);
    assert.equal(added.name, 'notes:notes');
    assert.equal(added.tag, 'button');
    assert.equal(added.caption, 'Notes');
    assert.deepEqual(added.params, { events: [ 'input' ] });
    assert.deepEqual(added.vars, { tool_tip_caption: 'Your notes' });
    // The copy's named child is the owner's now; the template's own is untouched.
    assert.equal(added.children[0].name, 'notes:search_label');
    assert.equal(template.elements[0].children[2].children[0].name, 'search_label');
});

test('an added element like one the template lacks is reported and not added', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [ { owner: 'notes', template: ID, ops: [ { element: 'search', insert: 'after', add: { like: 'gone', name: 'notes' } } ] } ]);

    assert.deepEqual(report.unmatched, [ { template: ID, owner: 'notes', element: 'gone' } ]);
    assert.equal(template.elements[0].children.length, 3);
});

test('resizing the window resizes its layout by as much, so it is drawn and hit at its new size', () => {
    const { template } = applyTemplatePatches(friendList(), ID, [ { owner: 'a', template: ID, ops: [ { element: '', set: { height: 330 } } ] } ]);

    assert.equal(template.elements[0].height, 330);
    assert.equal(template.height, 620);
});
