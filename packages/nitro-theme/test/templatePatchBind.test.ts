import assert from 'node:assert/strict';
import { test } from 'node:test';

import { resolveTemplateNames } from '../src/template/templateBindings';
import type { Template, TemplateElement } from '../src/template/templateData';
import { applyTemplatePatches, mergeTemplateItemBindings, TemplatePatchOp } from '../src/template/templatePatch';
import { resolveTemplateBind, templateBindElement, TemplateBindOp, templateBindProblems, templatePatchAddedNames } from '../src/template/templatePatchBind';

const element = (tag: string, name: string, children: TemplateElement[] = [], extra: Partial<TemplateElement> = {}): TemplateElement => ({ tag, name, x: 0, y: 0, width: 10, height: 10, vars: {}, children, ...extra });

const CATALOG = 'habbo-catalog-com/catalog_ubuntu_with_tabs';

// The catalogue's tab prototype, as the code clones it per top-level page (S2's tab icons).
const catalog = (): Template => ({
    name: 'catalog',
    width: 400,
    height: 300,
    elements: [ element('frame', 'catalog', [ element('itemlist_horizontal', 'tab_list', [ element('container', 'tab_button', [ element('text', 'tab_text') ]) ]) ]) ],
});

// S2's case as data: the icon is added and bound in two patches of one file, the bind first.
const iconFile: { order: number; ops: TemplatePatchOp[] }[] = [
    { order: 0, ops: [ { element: 'tab_button/icon', bind: { asset: 'icons/tab${item.index}.png', tooltip: '${item.pageName}' }, items: true } ] },
    { order: 0, ops: [ { element: 'tab_button', insert: 'last', add: { tag: 'bitmap', name: 'icon', width: 20, height: 20 } } ] },
];

void test('a bind op names what its file adds by its short name, and is applied once the patched template has it', () => {
    const added = templatePatchAddedNames('s2theme', iconFile.flatMap(patch => patch.ops));
    const bind = iconFile[0].ops[0] as TemplateBindOp;
    const key = templateBindElement('s2theme', bind, name => added.has(name));

    assert.equal(key, 'tab_button/s2theme:icon');

    const { template, report } = applyTemplatePatches(catalog(), CATALOG, iconFile.map(patch => ({ owner: 's2theme', template: CATALOG, ...patch })));

    // The bind op changes no element and is counted as applied: the icon it names is in the patched template.
    assert.equal(report.applied, 2);
    assert.deepEqual(report.ops, { s2theme: 2 });
    assert.deepEqual(report.unmatched, []);
    assert.ok(resolveTemplateNames(template.elements, [ key ]).targets.has(key));

    // A typo is a miss, as any op's element is - never a silent no-op.
    const typo = applyTemplatePatches(catalog(), CATALOG, [ { owner: 's2theme', template: CATALOG, ops: [ { element: 'tab_buton/icon', bind: { visible: false }, items: true } ] } ]);

    assert.equal(typo.report.applied, 0);
    assert.deepEqual(typo.report.unmatched, [ { template: CATALOG, owner: 's2theme', element: 'tab_buton/icon' } ]);

    // One a function of the context gives has no binding added for it: an error, not "applied".
    const dynamic = applyTemplatePatches(catalog(), CATALOG, [ { owner: 's2theme', template: CATALOG, ops: () => [ bind ] } ]);

    assert.equal(dynamic.report.applied, 0);
    assert.equal(dynamic.report.errors.length, 1);

    // Each tab clone takes the binding: its key reaches the icon inside the clone's prototype.
    const prototype = template.elements[0].children[0].children[0];
    const { bindings } = mergeTemplateItemBindings(CATALOG, prototype, { tab_text: { caption: 'Frontpage' } }, [ { owner: 's2theme', element: key, override: false } ], () => ({ asset: 'x' }));

    assert.deepEqual(bindings, { [key]: { asset: 'x' }, tab_text: { caption: 'Frontpage' } });
});

void test('a bind op\'s placeholders are filled per row, keeping a whole value\'s type, and a relative asset is read from beside the file', () => {
    const misses: string[] = [];
    const base = 'http://hotel.test/gamedata/plugins/s2theme/template-patches.json?v=3';
    const scope = {
        context: { pageId: 7, pageName: 'Frontpage', selected: true },
        item: { key: '7', index: 2, list: 'tab_list' },
        itemContext: { pageId: 7, pageName: 'Frontpage', selected: true, iconUrl: 'https://images.test/icon_1.png' },
        text: (key: string) => (key === 'catalog.title' ? 'Shop' : key),
        base,
    };

    assert.deepEqual(resolveTemplateBind({
        asset: 'icons/tab${item.index}.png',
        tooltip: '${text.catalog.title}: ${item.pageName}',
        selected: '${ctx.selected}',
        alpha: '${ctx.pageId}',
    }, scope, what => misses.push(what)), {
        asset: 'http://hotel.test/gamedata/plugins/s2theme/icons/tab2.png',
        tooltip: 'Shop: Frontpage',
        selected: true,
        alpha: 7,
    });

    // An address of its own stays as it is: another host's, the hotel's root, a hotel variable the window fills.
    assert.deepEqual(resolveTemplateBind({ asset: '${item.iconUrl}' }, scope, what => misses.push(what)), { asset: 'https://images.test/icon_1.png' });
    assert.deepEqual(resolveTemplateBind({ asset: '/c_images/x.png' }, scope, what => misses.push(what)), { asset: '/c_images/x.png' });
    assert.deepEqual(misses, [] as string[]);

    // A key the window does not give leaves the field to the window and says which.
    assert.deepEqual(resolveTemplateBind({ asset: 'icons/${ctx.nothing}.png', caption: 'kept' }, scope, what => misses.push(what)), { caption: 'kept' });
    assert.deepEqual(resolveTemplateBind({ color: '${item.pageName}' }, scope, what => misses.push(what)), {});
    assert.deepEqual(misses, [ '${ctx.nothing}', 'color' ]);
});

void test('a bind op that no client could bind is refused with what is wrong', () => {
    assert.deepEqual(templateBindProblems({ element: 'tab_button/icon', bind: { asset: 'icons/${item.index}.png' }, items: true }), []);
    assert.deepEqual(templateBindProblems({ element: 'tab_text', bind: { caption: '${style:tab.caption} ${text.a.b}' }, override: true }), []);

    const problems = templateBindProblems({ element: 'icon', bind: { asset: '${page.icon}', tooltip: '${item.pageName}', colour: 1, color: 'red' } as TemplateBindOp['bind'] });

    assert.equal(problems.length, 4);
    assert.match(problems[0], /\$\{page\.icon\}: a placeholder is/);
    assert.match(problems[1], /"items": true/);
    assert.match(problems[2], /colour, which is no binding field/);
    assert.match(problems[3], /color is a number/);
    assert.match(templateBindProblems({ element: '', bind: { visible: false } }).join(' '), /"override": true/);
});

// Stranger test S3 (3.2 #5): the root `text` is one, so this passed and drew nothing - the text
// looked up was "tabicon.${item.index", whose value is its own key: an address that 404s.
void test('a bind op with a placeholder inside another is refused', () => {
    const op: TemplateBindOp = { element: 'tab_button/icon', bind: { asset: '${text.tabicon.${item.index}}' }, items: true, override: true };

    assert.deepEqual(templateBindProblems(op), [ 'bind\'s asset puts a placeholder inside another (${text.tabicon.${item.index}}): placeholders are filled once and do not nest, so it names no key. Bind each row\'s own value (${item.<key>}) or one whole key.' ]);
});
