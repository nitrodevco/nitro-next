import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Container } from 'pixi.js';

import { inspectElements, noteInspectTarget, type TemplateInspectNode } from '../src/inspect';
import type { TemplateElement } from '../src/template/templateData';

const element = (tag: string, name: string | undefined, children: TemplateElement[] = []): TemplateElement => ({ tag, ...(name ? { name } : {}), x: 0, y: 0, width: 10, height: 10, vars: {}, children });

void test('each element of the window once, with the outermost containers drawing it; other windows left out', () => {
    const title = element('text', 'title');
    const icon = element('bitmap', undefined);
    const root = element('frame', undefined, [ title, icon ]);
    const rootNode: TemplateInspectNode = { element: root, parent: undefined };
    const titleNode: TemplateInspectNode = { element: title, parent: rootNode };
    const iconNode: TemplateInspectNode = { element: icon, parent: rootNode };
    const window = { id: 'lib/dialog' };
    const stage = new Container();
    // The frame drawn by two sibling containers, the inner one of the first noting the frame again (a box inside its drawing).
    const frameA = new Container();
    const frameInner = new Container();
    const frameB = new Container();
    const titleBox = new Container();
    const iconBox = new Container();
    const other = new Container();

    noteInspectTarget(frameA, { node: rootNode, window });
    noteInspectTarget(frameInner, { node: rootNode, window });
    noteInspectTarget(frameB, { node: rootNode, window });
    noteInspectTarget(titleBox, { node: titleNode, window });
    noteInspectTarget(iconBox, { node: iconNode, window });
    noteInspectTarget(other, { node: { element: element('text', 'title'), parent: undefined }, window: { id: 'lib/other' } });
    frameA.addChild(frameInner, titleBox);
    frameB.addChild(iconBox);
    stage.addChild(frameA, frameB, other);

    const found = inspectElements(stage, 'lib/dialog');

    assert.deepEqual(found.map(entry => [ entry.key, entry.containers.length ]), [ [ '', 2 ], [ 'title', 1 ], [ '@1', 1 ] ]);
    assert.ok(found.every(entry => entry.template === 'lib/dialog'));
    assert.equal(found.find(entry => entry.key === '')?.containers.includes(frameInner), false, 'a container inside the frame\'s own drawing is not another drawing of it');
});

void test('with no window named, every window on the stage: the room screen is many', () => {
    const bar = element('container', undefined, [ element('bitmap', 'icon') ]);
    const purse = element('container', undefined);
    const barNode: TemplateInspectNode = { element: bar, parent: undefined };
    const iconNode: TemplateInspectNode = { element: bar.children[0], parent: barNode };
    const stage = new Container();
    const barBox = new Container();
    const iconBox = new Container();
    const purseBox = new Container();

    noteInspectTarget(barBox, { node: barNode, window: { id: 'lib/bar' } });
    noteInspectTarget(iconBox, { node: iconNode, window: { id: 'lib/bar' } });
    noteInspectTarget(purseBox, { node: { element: purse, parent: undefined }, window: { id: 'lib/purse' } });
    barBox.addChild(iconBox);
    stage.addChild(barBox, purseBox);

    assert.deepEqual(inspectElements(stage, undefined).map(entry => `${entry.template}|${entry.key}`), [ 'lib/bar|', 'lib/bar|icon', 'lib/purse|' ]);
});
