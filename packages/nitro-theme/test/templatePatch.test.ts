import assert from 'node:assert/strict';
import { test } from 'node:test';

import { resolveTemplateNames, TemplateWindows } from '../src/template/templateBindings';
import type { Template, TemplateElement } from '../src/template/templateData';
import { layoutTemplate } from '../src/template/templateLayout';
import { applyTemplatePatches, chainTemplateArranges, mergeTemplateBindings, templateContextKey, TemplatePatch, templatePatchesUseContext, WINDOW_CODE_OWNER } from '../src/template/templatePatch';

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
    assert.deepEqual(report, { applied: 1, ops: { classic: 1 }, conflicts: [], unmatched: [], errors: [] });
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

test('a move takes an element and its children to another parent, keeping its name for the window code', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [ { owner: 'skin', template: ID, ops: [ { element: 'title', move: 'before', to: 'friends' } ] } ]);
    const root = template.elements[0];

    assert.deepEqual(report.unmatched, []);
    assert.deepEqual(root.children.map(child => child.name), [ 'header', 'title', 'friends', 'search' ]);
    assert.deepEqual(root.children[0].children, []);
    // Found by its own name, where it is now.
    assert.equal(resolveTemplateNames(template.elements, [ 'title' ]).targets.get('title'), root.children[1]);
});

test('a move first or last puts the element inside the one named', () => {
    const { template } = applyTemplatePatches(friendList(), ID, [ { owner: 'skin', template: ID, ops: [ { element: 'search', move: 'first', to: 'header' } ] } ]);

    assert.deepEqual(template.elements[0].children[0].children.map(child => child.name), [ 'search', 'title' ]);
});

test('a move into the element itself, or to an element the template lacks, is reported and moves nothing', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [ { owner: 'skin', template: ID, ops: [
        { element: 'header', move: 'last', to: 'title' },
        { element: 'search', move: 'after', to: 'gone' },
    ] } ]);

    assert.deepEqual(report.unmatched.map(miss => miss.element), [ 'title', 'gone' ]);
    assert.deepEqual(template.elements[0].children.map(child => child.name), [ 'header', 'friends', 'search' ]);
});

test('params merge by key like vars, and conflict per key', () => {
    const source = friendList();

    source.elements[0].children[2].params = { events: [ 'input' ], scale: [ 'stretch', 'move' ], align: [ 'left', 'top' ] };

    const { template, report } = applyTemplatePatches(source, ID, [
        { owner: 'a', template: ID, ops: [ { element: 'search', set: { params: { scale: [ 'fixed', 'fixed' ] } } } ] },
        { owner: 'b', template: ID, ops: [ { element: 'search', set: { params: { scale: [ 'fixed', 'move' ], align: [ 'right', 'top' ] } } } ] },
    ]);

    assert.deepEqual(template.elements[0].children[2].params, { events: [ 'input' ], scale: [ 'fixed', 'move' ], align: [ 'right', 'top' ] });
    assert.deepEqual(report.conflicts.map(conflict => conflict.property), [ 'params.scale' ]);
    assert.deepEqual(source.elements[0].children[2].params?.scale, [ 'stretch', 'move' ]);
});

test('ops given as a function of the window context are made for that context', () => {
    const patch: TemplatePatch = { owner: 'skin', template: ID, ops: context => (context.isOwnUser ? [ { element: '', set: { color: 0xff00ff00 } } ] : []) };

    assert.equal(templatePatchesUseContext([ patch ], ID), true);
    assert.equal(applyTemplatePatches(friendList(), ID, [ patch ], { isOwnUser: true }).template.elements[0].color, 0xff00ff00);
    assert.equal(applyTemplatePatches(friendList(), ID, [ patch ], { isOwnUser: false }).template.elements[0].color, 0xff336699);
    // Without a context, the empty one.
    assert.equal(applyTemplatePatches(friendList(), ID, [ patch ]).template.elements[0].color, 0xff336699);
});

test('ops that throw are reported as an error and skipped; the other patches still apply', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [
        { owner: 'broken', template: ID, ops: () => { throw new Error('no figure'); } },
        { owner: 'fine', template: ID, ops: [ { element: 'search', set: { caption: 'Find' } } ] },
    ], { figure: null });

    assert.deepEqual(report.errors, [ { template: ID, owner: 'broken', message: 'no figure' } ]);
    // The op counts the server's inspector shows per owner: none for the one that threw.
    assert.deepEqual(report.ops, { fine: 1 });
    assert.equal(template.elements[0].children[2].caption, 'Find');
});

test('two contexts with the same values have one key, whatever order they were built in', () => {
    assert.equal(templateContextKey({ userId: 1, isOwnUser: true }), templateContextKey({ isOwnUser: true, userId: 1 }));
    assert.notEqual(templateContextKey({ userId: 1 }), templateContextKey({ userId: 2 }));
});

/**
 * The purse (`habbo-toolbar-com/purse_xml`) as its layout has it, the parts a button added to its
 * button list touches (`dumps/purse.xml`, WIN63-202610201032): the window 230 x 77, its outer border
 * 230 x 76 (`params="16"`), and at 174, 8 the unnamed 63 x 62 list of help, logout and settings
 * (spacing 2, as the bundle has it), 50 x 19 each.
 */
const purse = (): Template => {
    const unnamed = (tag: string, children: TemplateElement[], extra: Partial<TemplateElement>): TemplateElement => ({ tag, x: 0, y: 0, width: 10, height: 10, vars: {}, children, ...extra });
    const button = (name: string, y: number) => element('container_button', name, [ unnamed('label', [], { y: 1, width: 71, height: 17 }) ], { y, width: 50, height: 19, params: { events: [ 'input' ] } });

    return {
        name: 'grid_purse',
        width: 230,
        height: 77,
        elements: [
            unnamed('container', [
                unnamed('border', [], { width: 230, height: 76, params: { parentGraphics: true } }),
                unnamed('itemlist_vertical', [ button('help_button', 0), button('logout_button', 21), button('settings_button', 42) ], { x: 174, y: 8, width: 63, height: 62, vars: { spacing: 2 } }),
            ], { x: -38, width: 230, height: 77 }),
        ],
    };
};

const PURSE = 'habbo-toolbar-com/purse_xml';
const ADD_BUTTON = { element: 'settings_button', insert: 'after', add: { like: 'help_button', name: 'skills' } } as const;

const laidOut = (template: Template) => {
    const rects = layoutTemplate(template.elements, { captionOf: () => '', measure: () => ({ width: 10, height: 10 }) });
    const [ root ] = template.elements;
    const [ border, list ] = root.children;

    return { window: rects.get(root)?.height, border: rects.get(border)?.height, list: rects.get(list)?.height, items: list.children.map(item => rects.get(item)?.y) };
};

test('a list told to follow its items grows the window it reflects to, and a border told to stretch follows: no heights in the patch', () => {
    // Added alone, the button is placed after settings by the list, and the purse keeps its size.
    assert.deepEqual(laidOut(applyTemplatePatches(purse(), PURSE, [ { owner: 'skills', template: PURSE, ops: [ ADD_BUTTON ] } ]).template), { window: 77, border: 76, list: 62, items: [ 0, 21, 42, 63 ] });

    const { template, report } = applyTemplatePatches(purse(), PURSE, [ { owner: 'skills', template: PURSE, ops: [
        ADD_BUTTON,
        // Flash's own flags: the list resizes to its items and reflects that to the window...
        { element: '@1', set: { vars: { resize_on_item_update: true }, params: { reflectToParent: [ false, true ] } } },
        // ...whose border stretches with it.
        { element: '@0', set: { params: { scale: [ 'fixed', 'stretch' ] } } },
    ] } ]);

    assert.deepEqual(report.unmatched, []);
    // The list fits its 4 items (4 x 19 + 3 x 2), the window and its border grow by as much.
    assert.deepEqual(laidOut(template), { window: 97, border: 96, list: 82, items: [ 0, 21, 42, 63 ] });
});

test('an override binding wins for the fields it sets over the window code, each one reported; a plain binding only reaches added elements', () => {
    const own = { name_text: { caption: 'Alice', color: 0xffffff }, motto: { caption: 'hi' } };
    const entries = [
        { owner: 'skin', element: 'name_text', override: true, binding: { color: 0xffd54f, alpha: 0.5 } },
        { owner: 'gold', element: 'name_text', override: true, binding: { color: 0x00ff00 } },
        { owner: 'skin', element: 'motto', override: false, binding: { caption: 'ignored' } },
        { owner: 'skin', element: 'skin:badge', override: false, binding: { caption: 'new' } },
    ];
    const { bindings, conflicts } = mergeTemplateBindings('t', own, entries, entry => entry.binding);

    assert.deepEqual(bindings, { name_text: { caption: 'Alice', color: 0x00ff00, alpha: 0.5 }, motto: { caption: 'hi' }, 'skin:badge': { caption: 'new' } });
    // Alpha only the skin sets: no conflict. Colour: the window's code, then both overrides, the last one used.
    assert.deepEqual(conflicts, [ { template: 't', element: 'name_text', property: 'binding.color', owners: [ WINDOW_CODE_OWNER, 'skin', 'gold' ] } ]);
    assert.equal(own.name_text.color, 0xffffff);
    // No extension binds the template: the window's own, as it is.
    assert.equal(mergeTemplateBindings('t', own, [], () => undefined).bindings, own);
});

test('post-layout hooks run after the window code in the order added; one that throws is reported and the others still run', () => {
    const ran: string[] = [];
    const errors: string[] = [];
    const windows: TemplateWindows = { find: () => undefined, root: () => undefined };
    const own = () => {
        ran.push('window');
    };
    const chained = chainTemplateArranges(own, [
        { owner: 'a', arrange: (_: TemplateWindows, context) => ran.push(`a:${String(context.userId)}`) },
        { owner: 'broken', arrange: () => {
            throw new Error('no list');
        } },
        { owner: 'b', arrange: () => ran.push('b') },
    ], { userId: 7 }, (hook, error) => errors.push(`${hook.owner}: ${(error as Error).message}`));

    chained?.(windows);

    assert.deepEqual(ran, [ 'window', 'a:7', 'b' ]);
    assert.deepEqual(errors, [ 'broken: no list' ]);
    assert.equal(chainTemplateArranges(own, [], {}, () => undefined), own);
});

test('a wrap puts a part of the window in a framed pane of its own, in its place: the window code still finds it by name', () => {
    const source = friendList();

    source.elements[0].children[1] = { ...source.elements[0].children[1], x: 6, y: 30, width: 120, height: 200 };

    const { template, report } = applyTemplatePatches(source, ID, [ {
        owner: 'theme',
        template: ID,
        ops: [
            { element: '', set: { style: 'none' } },
            { element: 'friends', wrap: { tag: 'frame', name: 'pane', style: '0', caption: 'Friends', margins: [ 5, 28, 5, 5 ] } },
            { element: 'pane', set: { x: 210 } },
        ],
    } ]);
    const root = template.elements[0];
    const pane = root.children[1];

    assert.deepEqual(report.unmatched, []);
    assert.equal(root.style, 'none');
    assert.deepEqual([ pane.name, pane.tag, pane.x, pane.y, pane.width, pane.height ], [ 'theme:pane', 'frame', 210, 30, 120, 200 ]);
    assert.deepEqual(pane.children.map(child => [ child.name, child.x, child.y ]), [ [ 'friends', 0, 0 ] ]);
    assert.equal(resolveTemplateNames(template.elements, [ 'friends' ]).targets.get('friends'), pane.children[0]);
});

test('the window itself is not wrapped, and a wrap like an element the template lacks is reported', () => {
    const { template, report } = applyTemplatePatches(friendList(), ID, [ {
        owner: 'theme',
        template: ID,
        ops: [
            { element: '', wrap: { tag: 'container', name: 'outer' } },
            { element: 'search', wrap: { like: 'nope', name: 'box' } },
        ],
    } ]);

    assert.deepEqual(report.unmatched.map(miss => miss.element), [ '', 'nope' ]);
    assert.equal(template.elements[0].name, 'friend_list');
    assert.equal(template.elements[0].children.at(-1)!.name, 'search');
});
