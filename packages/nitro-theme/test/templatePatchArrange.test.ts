import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { TemplateWindows } from '../src/template/templateBindings';
import type { Template, TemplateElement } from '../src/template/templateData';
import { LayoutWindow } from '../src/template/templateLayout';
import { applyTemplatePatches, TemplateContext, TemplatePatchOp } from '../src/template/templatePatch';
import { runTemplateArrange, TemplateArrangeOp, templateArrangeProblems } from '../src/template/templatePatchArrange';

/** A laid-out text: its text's size as the layout measured it. */
class TextWindow extends LayoutWindow {
    constructor(rect: { x: number; y: number; width: number; height: number }, private readonly text: { width: number; height: number }) {
        super(undefined, rect, 0);
    }

    public override get textWidth() {
        return this.text.width;
    }

    public override get textHeight() {
        return this.text.height;
    }
}

const windowsOf = (named: Record<string, LayoutWindow>, root?: LayoutWindow): TemplateWindows => ({ find: key => named[key], root: () => root });

const rectOf = (window: LayoutWindow) => ({ x: window.x, y: window.y, width: window.width, height: window.height });

const CATALOG = 'habbo-catalog-com/catalog_ubuntu_with_tabs';

// The catalogue header as a theme's module laid it out (api.templates.arrange): the picture's size,
// the page under the header - under its text but on the info layouts, flush on a page with no picture.
const NO_HEADER_TEXT = [ 'pets', 'pets2', 'pets3', 'trophies' ];
const moduleArrange = ({ find }: TemplateWindows, ctx: TemplateContext) => {
    const image = find('catalog.header.image')!;
    const description = find('catalog.header.description')!;
    const container = find('layoutContainer')!;
    const shown = !!ctx.hasHeaderImage;
    const text = shown && !!ctx.hasHeaderText && !NO_HEADER_TEXT.includes(String(ctx.layoutCode));
    const top = !shown ? 0 : text ? (description.y + description.textHeight + 8) : (image.y + 75 + 8);

    image.setRectangle(26, image.y, shown ? 290 : 0, shown ? 75 : 0);
    container.setY(top);
    container.setHeight(436 - top);
};

// The same, written as the theme's patch file has it now.
const headerOps: TemplateArrangeOp[] = [
    { element: 'catalog.header.image', arrange: { x: 26, width: '${ctx.hasHeaderImage} ? 290 : 0', height: '${ctx.hasHeaderImage} ? 75 : 0' } },
    { element: 'layoutContainer', arrange: { y: '!${ctx.hasHeaderImage} ? 0 : ${ctx.hasHeaderText} && !oneOf(${ctx.layoutCode}, \'pets\', \'pets2\', \'pets3\', \'trophies\') ? ${catalog.header.description.y} + ${catalog.header.description.textHeight} + 8 : ${catalog.header.image.y} + 75 + 8' } },
    { element: 'layoutContainer', arrange: { height: '436 - ${layoutContainer.y}' } },
];

const header = () => ({
    'catalog.header.image': new LayoutWindow(undefined, { x: 10, y: 6, width: 400, height: 100 }, 0),
    'catalog.header.description': new TextWindow({ x: 26, y: 84, width: 290, height: 40 }, { width: 250, height: 27 }),
    layoutContainer: new LayoutWindow(undefined, { x: 0, y: 0, width: 600, height: 436 }, 0),
});

void test('a theme\'s catalogue header arrange written as data lays the page out as its module did', () => {
    const contexts: TemplateContext[] = [
        { hasHeaderImage: true, hasHeaderText: true, layoutCode: 'default_3x3' },
        { hasHeaderImage: true, hasHeaderText: true, layoutCode: 'pets3' },
        { hasHeaderImage: false, hasHeaderText: true, layoutCode: 'default_3x3' },
        // A key the page does not give: `null`, false in a test.
        { hasHeaderImage: true, layoutCode: 'frontpage4' },
    ];

    for (const context of contexts) {
        const byModule = header();
        const byData = header();
        const misses: string[] = [];

        moduleArrange(windowsOf(byModule), context);

        for (const op of headerOps) runTemplateArrange('theme', op, windowsOf(byData), context, () => false, what => misses.push(what));

        assert.deepEqual(Object.values(byData).map(rectOf), Object.values(byModule).map(rectOf), JSON.stringify(context));
        assert.deepEqual(misses, []);
    }

    // The page under the header's text: 84 + 27 + 8.
    const drawn = header();

    for (const op of headerOps) runTemplateArrange('theme', op, windowsOf(drawn), contexts[0], () => false, () => {});

    assert.deepEqual(rectOf(drawn.layoutContainer), { x: 0, y: 119, width: 600, height: 317 });
});

void test('an arrange op reads an element its owner added by its short name, and the window itself', () => {
    const skin = new LayoutWindow(undefined, { x: 5, y: 5, width: 10, height: 10 }, 0);
    const border = new LayoutWindow(undefined, { x: 0, y: 0, width: 200, height: 320 }, 0);
    const root = new LayoutWindow(undefined, { x: 0, y: 0, width: 170, height: 300 }, 0);
    const windows = windowsOf({ 'theme:skin': skin, info_border: border }, root);
    const isOwned = (name: string) => name === 'theme:skin';

    runTemplateArrange('theme', { element: 'skin', arrange: { x: 0, y: 0, width: 200, height: '${info_border.height}' } }, windows, {}, isOwned, assert.fail);
    runTemplateArrange('theme', { element: '', arrange: { width: '${skin.width}', height: '${info_border.height} + 9' } }, windows, {}, isOwned, assert.fail);

    assert.deepEqual(rectOf(skin), { x: 0, y: 0, width: 200, height: 320 });
    assert.deepEqual(rectOf(root), { x: 0, y: 0, width: 200, height: 329 });
});

void test('a field whose formula reads nothing keeps the layout\'s and is reported; the other fields still apply', () => {
    const box = new LayoutWindow(undefined, { x: 1, y: 2, width: 30, height: 40 }, 0);
    const misses: string[] = [];

    const set = runTemplateArrange('theme', { element: 'box', arrange: { x: '${gone.width} + 1', y: '${ctx.top} + 4', width: 'max(${box.width}, 50)' } }, windowsOf({ box }), {}, () => false, what => misses.push(what));

    assert.equal(set, true);
    assert.deepEqual(rectOf(box), { x: 1, y: 2, width: 50, height: 40 });
    assert.deepEqual(misses, [ '\'gone\'', 'y' ]);
});

void test('an arrange op no client could run is refused with the reason', () => {
    const problems = (arrange: TemplateArrangeOp['arrange']) => templateArrangeProblems({ element: 'box', arrange });

    assert.deepEqual(problems({ x: 4, width: 'max(${box.width}, ${ctx.min}) - 2' }), []);
    assert.match(problems({ colour: 3 } as never)[0], /arrange has colour, which it does not set/);
    assert.match(problems({ x: 'clamp(1, 2)' })[0], /'clamp' is no function/);
    assert.match(problems({ x: '${box.left}' })[0], /reads nothing/);
    assert.match(problems({ x: '${item.index} * 20' })[0], /not a row's or a text's value/);
    assert.match(problems({ x: '${text.${ctx.key}.x}' })[0], /do not nest/);
    assert.match(problems({ x: '(1 + 2' })[0], /'\)' was expected at the end/);
    assert.match(problems({ x: 'round(1, 2)' })[0], /round takes 1 value/);
    assert.match(problems({})[0], /"arrange" is an object/);
});

void test('arrange ops count as applied when the patched template has every element they read, and two owners arranging one field clash', () => {
    const element = (tag: string, name: string, children: TemplateElement[] = []): TemplateElement => ({ tag, name, x: 0, y: 0, width: 10, height: 10, vars: {}, children });
    const template = (): Template => ({ name: 'catalog', width: 400, height: 300, elements: [ element('frame', 'catalog', [ element('container', 'layoutContainer'), element('text', 'catalog.header.description') ]) ] });
    const ops = (arrange: TemplateArrangeOp['arrange'], name = 'layoutContainer'): TemplatePatchOp[] => [ { element: name, arrange } ];

    const { report } = applyTemplatePatches(template(), CATALOG, [
        { owner: 'a', template: CATALOG, ops: ops({ y: '${catalog.header.description.y} + 8' }) },
        { owner: 'b', template: CATALOG, ops: ops({ y: 4, height: 10 }), order: 1 },
        { owner: 'c', template: CATALOG, ops: ops({ x: '${catalog.header.picture.x}' }) },
        { owner: 'c', template: CATALOG, ops: ops({ x: 1 }, 'layoutContainr') },
    ]);

    assert.equal(report.applied, 2);
    assert.deepEqual(report.unmatched.map(miss => `${miss.owner}:${miss.element}`), [ 'c:catalog.header.picture', 'c:layoutContainr' ]);
    assert.deepEqual(report.conflicts, [ { template: CATALOG, element: 'layoutContainer', property: 'arrange.y', owners: [ 'a', 'b' ] } ]);
});

// Past a cap a formula is refused unread, as Turbo's patch check refuses it (TemplateArrangeFormula.cs),
// where a formula nested thousands deep would overflow the server's recursive reader.
const capProblem = (formula: string) => templateArrangeProblems({ element: 'box', arrange: { y: formula } });

void test('an arrange formula longer than 500 characters is refused', () => {
    assert.match(capProblem(`${'1+'.repeat(250)}1`)[0], /at most 500 characters, not 501/);
    assert.deepEqual(capProblem(`${'1+'.repeat(249)}1`), []);
});

void test('an arrange formula nested deeper than 32 is refused', () => {
    assert.match(capProblem(`${'('.repeat(40)}1${')'.repeat(40)}`)[0], /nests at most 32 deep/);
    assert.match(capProblem(`${'-'.repeat(40)}1`)[0], /nests at most 32 deep/);
    assert.deepEqual(capProblem(`${'('.repeat(31)}1${')'.repeat(31)}`), []);
});

void test('an arrange call with more than 16 values is refused', () => {
    assert.match(capProblem(`max(${Array(17).fill(1).join(', ')})`)[0], /max takes at most 16 values/);
    assert.deepEqual(capProblem(`max(${Array(16).fill(1).join(', ')})`), []);
});
