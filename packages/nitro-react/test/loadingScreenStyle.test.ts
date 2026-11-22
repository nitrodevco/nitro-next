import assert from 'node:assert/strict';
import { test } from 'node:test';

import { LOADING_SCREEN_PARTS, parseLoadingScreenStyle, placeLoadingScreenLayer, saturationMatrix } from '../src/views/loading-screen/loadingScreenStyle';

// The case: a restyled hotel's loading screen matched 1.3% (its look: the hotel view greyed, a 300x197 panel, a logo, a white bar), as no module can draw it.
void test('a hotel\'s look, as JSON text: colours, the picture greyed, a panel and a logo in place of the photo frame', () => {
    const look = parseLoadingScreenStyle(JSON.stringify({
        backgroundImage: '/images/reception.png', backgroundSaturation: 0.1, photo: false,
        box: { width: 300, height: 197, color: '#656159', radius: 8 }, logo: '/images/logo.png',
        text: 'loading.message', textColor: '#FFFFFF', bar: { outline: '#ffffff', fill: '#ffffff' }, percent: false,
    }));

    assert.deepEqual(look, {
        background: undefined, backgroundSaturation: 0.1, photo: false,
        layers: [ { image: '/images/reception.png', size: 'cover', alignX: 'center', alignY: 'center', offsetX: 0, offsetY: 0, repeat: 'no-repeat' } ],
        box: { width: 300, height: 197, color: '#656159', alpha: 1, radius: 8 }, logo: '/images/logo.png',
        text: 'loading.message', textColor: '#ffffff', textSize: undefined, textWidth: undefined, order: LOADING_SCREEN_PARTS,
        bar: { width: undefined, outline: '#ffffff', well: undefined, fill: '#ffffff', fillBottom: undefined }, percent: false, percentColor: undefined,
    });
});

void test('none, or values of the wrong type, leave Habbo\'s own screen', () => {
    const habbo = parseLoadingScreenStyle(undefined);

    assert.deepEqual(parseLoadingScreenStyle({ background: 'blue', photo: 'no', box: { width: 300 }, textSize: -4, backgroundSaturation: 'grey' }), habbo);
    assert.deepEqual(parseLoadingScreenStyle('{ not json'), habbo);
    assert.equal(habbo.photo, true);
    assert.equal(habbo.percent, true);
    assert.deepEqual(habbo.layers, []);
    assert.deepEqual(parseLoadingScreenStyle({ backgroundImage: '/a.png', backgroundSize: 'huge', backgroundRepeat: 'tile', layers: [ 'sky.png', { size: 2 } ], order: [ 'nothing' ] }).layers.map(layer => [ layer.size, layer.repeat ]), [ [ 'cover', 'no-repeat' ] ]);
    assert.deepEqual(parseLoadingScreenStyle({ order: [ 'nothing' ] }).order, LOADING_SCREEN_PARTS);
});

// The case: a theme's hotel view whose parts sit at their own size at the screen's left and right bottom corners, under a tiled sky,
// matched one aspect only as one covering picture; its stack is logo, bar, text, the text wrapping in the bar's 143 px column.
void test('a hotel view of layers: each at its own size, at a corner or tiled across, and the hotel order and wrap', () => {
    const look = parseLoadingScreenStyle({
        backgroundImage: '/sky.png', backgroundSize: 'auto', backgroundPosition: 'top', backgroundRepeat: 'repeat-x',
        layers: [ { image: '/left.png', size: 'auto', position: 'left bottom' }, { image: '/right.png', size: 'auto', position: 'bottom right', offset: [ -10, 4 ] } ],
        order: [ 'logo', 'bar', 'text' ], textWidth: 143,
    });

    assert.deepEqual(look.layers.map(layer => [ layer.image, layer.alignX, layer.alignY, layer.offsetX, layer.offsetY, layer.repeat ]), [
        [ '/sky.png', 'center', 'top', 0, 0, 'repeat-x' ],
        [ '/left.png', 'left', 'bottom', 0, 0, 'no-repeat' ],
        [ '/right.png', 'right', 'bottom', -10, 4, 'no-repeat' ],
    ]);
    assert.deepEqual(look.order, [ 'logo', 'bar', 'text', 'percent' ]);
    assert.equal(look.textWidth, 143);

    // On a 1260 x 860 screen: the sky's 100 px tiles across it, one starting at its centred place (580); the parts at their corners, unscaled.
    assert.deepEqual(placeLoadingScreenLayer(look.layers[0], 100, 300, 1260, 860), { x: 0, y: 0, width: 1260, height: 300, scale: 1, tiled: true, tileX: 80, tileY: 0 });
    assert.deepEqual(placeLoadingScreenLayer(look.layers[1], 400, 500, 1260, 860), { x: 0, y: 360, width: 400, height: 500, scale: 1, tiled: false, tileX: 0, tileY: 0 });
    assert.deepEqual(placeLoadingScreenLayer(look.layers[2], 400, 500, 1260, 860), { x: 850, y: 364, width: 400, height: 500, scale: 1, tiled: false, tileX: 0, tileY: 0 });
});

void test('a picture with no size given covers the screen, centred, as before', () => {
    const [ cover ] = parseLoadingScreenStyle({ backgroundImage: '/view.png' }).layers;

    // 1920 x 1080 on 1260 x 860: scaled 0.796, 1529 wide, 135 px cut each side (a theme's measure).
    const at = placeLoadingScreenLayer(cover, 1920, 1080, 1260, 860);

    assert.equal(Math.round(at.scale * 1000), 796);
    assert.equal(at.x, -134);
    assert.equal(at.y, 0);
    assert.equal(placeLoadingScreenLayer({ ...cover, size: 'contain' }, 1920, 1080, 1260, 860).scale, 1260 / 1920);
});

void test('saturation 1 is the picture as drawn and 0 its luminance (CSS saturate)', () => {
    const identity = saturationMatrix(1).map(value => Math.round(value * 1000) / 1000);

    assert.deepEqual(identity, [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ]);
    assert.deepEqual(saturationMatrix(0).slice(0, 3), [ 0.213, 0.715, 0.072 ]);
});
