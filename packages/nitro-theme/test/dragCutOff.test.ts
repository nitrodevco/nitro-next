import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Container, Graphics } from 'pixi.js';

import { findDragCutOff } from '../src/drag/dragCutOff';

const DESKTOP = { width: 1024, height: 768 };

/** A container laid out at `x, y` and `width x height`, with a box hit area unless it is `pointerTransparent`. */
const box = (x: number, y: number, width: number, height: number, hitBox = true) => {
    const node = new Container();

    node.position.set(x, y);
    Object.defineProperty(node, 'layout', { value: { computedLayout: { left: x, top: y, width, height } } });

    if (hitBox) node.hitArea = { contains: (px: number, py: number) => (px >= 0) && (px <= width) && (py >= 0) && (py <= height) };

    return node;
};

/** The desktop, a box that places a window in it, the window's own drag target, and the target's root. */
const placedWindow = (placingHitBox: boolean) => {
    const desktop = box(0, 0, DESKTOP.width, DESKTOP.height);
    const placing = box(342, 297, 340, 173, placingHitBox);
    // `TemplateWindow`'s own wrapper is `pointerTransparent`.
    const template = box(0, 0, 340, 173, false);
    const target = box(0, 0, 340, 173);

    desktop.addChild(placing);
    placing.addChild(template);
    template.addChild(target);

    return { desktop, placing, target };
};

void test('a box that places a dragged window with a hit area of its own cuts the window off', () => {
    const { placing, target } = placedWindow(true);

    assert.equal(findDragCutOff(target, DESKTOP), placing);
});

void test('a pointerTransparent placing box under a desktop-sized one cuts nothing off', () => {
    const { target } = placedWindow(false);

    assert.equal(findDragCutOff(target, DESKTOP), undefined);
});

void test('a clipping ancestor ends the walk: the window is cut there in Flash too', () => {
    const { placing, target } = placedWindow(true);
    const clip = box(0, 0, 340, 173, false);
    const mask = new Graphics().rect(0, 0, 340, 173).fill(0xffffff);

    placing.removeChildren();
    placing.addChild(clip);
    clip.addChild(mask);
    clip.mask = mask;
    clip.addChild(target);

    assert.equal(findDragCutOff(target, DESKTOP), undefined);
});

void test('the box is placed by its ancestors: one covering the desktop from a shifted parent still does not', () => {
    const desktop = box(0, 0, DESKTOP.width, DESKTOP.height);
    const shifted = box(0, 10, DESKTOP.width, DESKTOP.height - 10, false);
    const layer = box(0, 0, DESKTOP.width, DESKTOP.height);
    const target = box(100, 100, 50, 50);

    desktop.addChild(shifted);
    shifted.addChild(layer);
    layer.addChild(target);

    assert.equal(findDragCutOff(target, DESKTOP), layer);
});
