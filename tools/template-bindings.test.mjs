/**
 * Window template bindings (`nitro-theme/src/template/templateBindings.ts`): names found the way
 * Flash's `WindowController.findChildByName` finds them, and the store that lets a template redraw
 * only the elements whose binding changed.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { findTemplateChild, resolveTemplateNames, bindElements, sameTemplateBinding, TemplateBindingStore, TemplateExpander } = await import('../packages/nitro-theme/src/template/templateBindings.ts');

const element = (name, children = []) => ({ tag: 'container', name, x: 0, y: 0, width: 0, height: 0, vars: {}, children });

// root
// ├─ panel_a
// │  └─ title        <- deeper, but under the first child
// ├─ title          <- a direct child: found first
// └─ panel_b
//    └─ label
const title = element('title');
const nestedTitle = element('title');
const label = element('label');
const panelA = element('panel_a', [ nestedTitle ]);
const panelB = element('panel_b', [ label ]);
const root = element('root', [ panelA, title, panelB ]);

await test('a direct child is found before a deeper one of the same name', () => {
    assert.equal(findTemplateChild([ root ], 'title'), title);
    assert.equal(findTemplateChild(root.children, 'title'), title);
});

await test('children are searched in order, each subtree whole before the next', () => {
    const first = element('dup');
    const second = element('dup');
    const tree = [ element('a', [ element('x', [ first ]) ]), element('b', [ second ]) ];

    assert.equal(findTemplateChild(tree, 'dup'), first);
});

await test('a path key looks each name up inside the last', () => {
    const { targets, missing } = resolveTemplateNames([ root ], [ 'panel_a/title', 'title', 'panel_b/label', 'panel_b/title' ]);

    assert.equal(targets.get('panel_a/title'), nestedTitle);
    assert.equal(targets.get('title'), title);
    assert.equal(targets.get('panel_b/label'), label);
    assert.deepEqual(missing, [ 'panel_b/title' ]);
});

await test('two keys naming one element are merged', () => {
    const { targets } = resolveTemplateNames([ root ], [ 'label', 'panel_b/label' ]);
    const byElement = bindElements(targets, { label: { caption: 'a' }, 'panel_b/label': { visible: false } });

    assert.deepEqual(byElement.get(label), { caption: 'a', visible: false });
});

await test('bindings are the same when every value is, show by its names and handlers by presence', () => {
    assert.ok(sameTemplateBinding({ caption: '1', show: [ 'a', 'b' ] }, { caption: '1', show: [ 'a', 'b' ] }));
    assert.ok(sameTemplateBinding({ onPointerTap: () => 1 }, { onPointerTap: () => 2 }));
    assert.ok(!sameTemplateBinding({ caption: '1' }, { caption: '2' }));
    assert.ok(!sameTemplateBinding({ show: [ 'a', 'b' ] }, { show: [ 'b', 'a' ] }));
    assert.ok(!sameTemplateBinding({ onPointerTap: () => 1 }, {}));
    assert.ok(!sameTemplateBinding({ visible: true }, undefined));
});

await test('the store keeps an unchanged binding the same object and does not notify', () => {
    const store = new TemplateBindingStore();
    let notified = 0;

    store.subscribe(() => notified++);
    store.update(new Map([ [ label, { caption: '1', show: [ 'a' ] } ] ]));
    store.commit();

    const first = store.get(label);

    store.update(new Map([ [ label, { caption: '1', show: [ 'a' ] } ] ]));
    store.commit();

    assert.equal(store.get(label), first);
    assert.equal(notified, 1);
});

await test('the store hands a changed binding a new object and notifies once per commit', () => {
    const store = new TemplateBindingStore();
    let notified = 0;

    store.subscribe(() => notified++);
    store.update(new Map([ [ label, { caption: '1' } ] ]));
    store.commit();

    const first = store.get(label);

    store.update(new Map([ [ label, { caption: '2' } ] ]));
    store.update(new Map([ [ label, { caption: '3' } ] ]));
    store.commit();

    assert.notEqual(store.get(label), first);
    assert.equal(store.get(label).binding.caption, '3');
    assert.equal(notified, 2);
});

await test('a handler is one stable function that calls the latest one bound', () => {
    const store = new TemplateBindingStore();
    const calls = [];

    store.update(new Map([ [ label, { onPointerTap: () => calls.push('first') } ] ]));

    const handler = store.get(label).binding.onPointerTap;

    store.update(new Map([ [ label, { onPointerTap: () => calls.push('second') } ] ]));

    assert.equal(store.get(label).binding.onPointerTap, handler);
    handler();
    assert.deepEqual(calls, [ 'second' ]);
});

await test('the hover handlers are stable each to their own latest, apart from the tap', () => {
    const store = new TemplateBindingStore();
    const calls = [];
    const bind = round => ({ onPointerTap: () => calls.push(`tap ${round}`), onPointerOver: () => calls.push(`over ${round}`), onPointerOut: () => calls.push(`out ${round}`) });

    store.update(new Map([ [ label, bind(1) ] ]));

    const { onPointerTap, onPointerOver, onPointerOut } = store.get(label).binding;

    store.update(new Map([ [ label, bind(2) ] ]));

    const binding = store.get(label).binding;

    assert.equal(binding.onPointerOver, onPointerOver);
    assert.equal(binding.onPointerOut, onPointerOut);
    onPointerOver();
    onPointerOut();
    onPointerTap();
    assert.deepEqual(calls, [ 'over 2', 'out 2', 'tap 2' ]);
});

await test('added children are compared by identity', () => {
    const children = {};

    assert.ok(sameTemplateBinding({ children }, { children }));
    assert.ok(!sameTemplateBinding({ children }, { children: {} }));
});

await test('a binding that goes away is a change', () => {
    const store = new TemplateBindingStore();
    let notified = 0;

    store.subscribe(() => notified++);
    store.update(new Map([ [ label, { visible: true } ] ]));
    store.commit();
    store.update(new Map());
    store.commit();

    assert.equal(store.get(label), undefined);
    assert.equal(notified, 2);
});

// A list with a prototype row in it, the way `navigator_frame_2` carries `navigator_entry_row_container`.
const rowName = element('room_name');
const row = element('row', [ rowName ]);
const list = { ...element('list', [ row ]), tag: 'itemlist' };
const header = element('header');
const window = element('window', [ header, list ]);

await test('items replace a list\'s children with clones, each bound inside itself', () => {
    const expander = new TemplateExpander();
    const { elements, byElement, missing } = expander.expand([ window ], {
        header: { caption: 'Rooms' },
        list: { items: [ { key: 'a', from: 'row', bindings: { room_name: { caption: 'A' } } }, { key: 'b', from: 'row', bindings: { room_name: { caption: 'B' } } } ] },
    });
    const [ expandedWindow ] = elements;
    const expandedList = expandedWindow.children[1];
    const [ cloneA, cloneB ] = expandedList.children;

    assert.deepEqual(missing, []);
    assert.equal(expandedWindow.children[0], header, 'an element nothing was cloned under is the template\'s own');
    assert.deepEqual(expandedList.children.map(clone => clone.itemKey), [ 'a', 'b' ]);
    assert.notEqual(cloneA, row);
    assert.notEqual(cloneA.children[0], cloneB.children[0]);
    assert.equal(byElement.get(cloneA.children[0]).caption, 'A');
    assert.equal(byElement.get(cloneB.children[0]).caption, 'B');
    assert.equal(byElement.get(header).caption, 'Rooms');
    assert.equal(byElement.get(expandedList).items, undefined, 'the items are made into elements, not handed on');
});

await test('a clone keeps its identity while its key does, and a new one comes for a new key', () => {
    const expander = new TemplateExpander();
    const bind = keys => ({ list: { items: keys.map(key => ({ key, from: 'row' })) } });
    const first = expander.expand([ window ], bind([ 'a', 'b' ]));
    const same = expander.expand([ window ], bind([ 'a', 'b' ]));
    const changed = expander.expand([ window ], bind([ 'a', 'c' ]));

    assert.equal(same.elements, first.elements, 'nothing changed: the same roots');
    assert.equal(changed.elements[0].children[1].children[0], first.elements[0].children[1].children[0]);
    assert.notEqual(changed.elements[0].children[1].children[1], first.elements[0].children[1].children[1]);
    assert.notEqual(changed.elements[0], first.elements[0], 'a changed list is a new window above it');
});

await test('clones nest, their arranges run parents first, and a missing prototype is reported', () => {
    const expander = new TemplateExpander();
    const order = [];
    const { elements, missing, arranges } = expander.expand([ window ], {
        list: {
            items: [
                {
                    key: 'outer',
                    from: 'window',
                    arrange: () => order.push('outer'),
                    bindings: { list: { items: [ { key: 'inner', from: 'row', arrange: () => order.push('inner') }, { key: 'lost', from: 'nothing' } ] } },
                },
            ],
        },
    });
    const outer = elements[0].children[1].children[0];

    arranges.forEach(({ arrange }) => arrange());
    assert.deepEqual(order, [ 'outer', 'inner' ]);
    assert.equal(arranges[0].scope, outer);
    assert.equal(outer.children[1].children[0].itemKey, 'inner');
    assert.equal(missing.length, 1);
    assert.match(missing[0], /lost: nothing$/);
});

await test('added clones come after an element\'s own children, which stay the template\'s', () => {
    const expander = new TemplateExpander();
    const { elements, byElement } = expander.expand([ window ], {
        window: { added: [ { key: 'badge', from: 'row', bindings: { room_name: { caption: 'Badge' } } } ] },
    });
    const [ expandedWindow ] = elements;
    const [ ownHeader, ownList, badge ] = expandedWindow.children;

    assert.equal(ownHeader, header);
    assert.equal(ownList, list);
    assert.equal(badge.itemKey, 'badge');
    assert.equal(byElement.get(badge.children[0]).caption, 'Badge');
    assert.equal(byElement.get(expandedWindow)?.added, undefined, 'the added clones are made into elements, not handed on');
});

await test('a clone made from another template brings that template\'s skins', () => {
    const skin = { name: 'grid_skin', width: 40, height: 40, elements: [] };
    const widget = { name: 'widget', width: 100, height: 100, elements: [ element('widget_root') ], skins: { 'scrollable_itemgrid_vertical:3': skin } };
    const { skins } = new TemplateExpander().expand([ window ], {
        window: { added: [ { key: 'widget', from: widget } ] },
    });

    assert.equal(skins['scrollable_itemgrid_vertical:3'], skin);
});

await test('disableSection disables a section the way roomevents Util.disableSection walks it', () => {
    const leaf = (tag, name, extra = {}) => ({ tag, name, x: 0, y: 0, width: 0, height: 0, vars: {}, children: [], ...extra });
    const box = leaf('checkbox', 'box');
    const caption = leaf('text', 'caption', { blend: 0.8 });
    const icon = leaf('bitmap', 'icon', { tags: [ '#icon' ] });
    const buttonLabel = leaf('text', 'button_label');
    const button = { ...leaf('button', 'button'), children: [ buttonLabel ] };
    const kept = leaf('text', 'kept', { tags: [ 'DO_NOT_DISABLE' ] });
    const frame = { ...leaf('border', 'frame'), children: [ box, caption ] };
    const section = { ...leaf('container', 'section'), children: [ frame, icon, button, kept ] };
    const outside = leaf('text', 'outside');
    const { byElement } = new TemplateExpander().expand([ { ...leaf('container', 'root'), children: [ section, outside ] } ], {
        section: { disableSection: true },
    });

    assert.equal(byElement.get(section).disabled, true);
    assert.equal(byElement.get(section).blend, undefined, 'a container passes it on without fading itself');
    assert.equal(byElement.get(frame).blend, 0.5, 'a border fades');
    assert.deepEqual([ byElement.get(box).disabled, byElement.get(box).blend ], [ true, 0.5 ]);
    assert.equal(byElement.get(caption).blend, 0.4, 'half the blend it had');
    assert.deepEqual([ byElement.get(icon).disabled, byElement.get(icon).blend ], [ true, undefined ], 'an #icon is not faded');
    assert.deepEqual([ byElement.get(button).disabled, byElement.get(button).blend ], [ true, undefined ], 'a button is disabled, not faded');
    assert.equal(byElement.get(buttonLabel), undefined, 'nor entered');
    assert.equal(byElement.get(kept), undefined, 'DO_NOT_DISABLE is left alone');
    assert.equal(byElement.get(outside), undefined);
});
