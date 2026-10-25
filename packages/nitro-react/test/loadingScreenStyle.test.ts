import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseLoadingScreenStyle, saturationMatrix } from '../src/views/loading-screen/loadingScreenStyle';

// The case: a restyled hotel's loading screen matched 1.3% (its look: the hotel view greyed, a 300x197 panel, a logo, a white bar), as no module can draw it.
void test('a hotel\'s look, as JSON text: colours, the picture greyed, a panel and a logo in place of the photo frame', () => {
    const look = parseLoadingScreenStyle(JSON.stringify({
        backgroundImage: '/images/reception.png', backgroundSaturation: 0.1, photo: false,
        box: { width: 300, height: 197, color: '#656159', radius: 8 }, logo: '/images/logo.png',
        text: 'loading.message', textColor: '#FFFFFF', bar: { outline: '#ffffff', fill: '#ffffff' }, percent: false,
    }));

    assert.deepEqual(look, {
        background: undefined, backgroundImage: '/images/reception.png', backgroundSaturation: 0.1, photo: false,
        box: { width: 300, height: 197, color: '#656159', alpha: 1, radius: 8 }, logo: '/images/logo.png',
        text: 'loading.message', textColor: '#ffffff', textSize: undefined,
        bar: { width: undefined, outline: '#ffffff', well: undefined, fill: '#ffffff', fillBottom: undefined }, percent: false, percentColor: undefined,
    });
});

void test('none, or values of the wrong type, leave Habbo\'s own screen', () => {
    const habbo = parseLoadingScreenStyle(undefined);

    assert.deepEqual(parseLoadingScreenStyle({ background: 'blue', photo: 'no', box: { width: 300 }, textSize: -4, backgroundSaturation: 'grey' }), habbo);
    assert.deepEqual(parseLoadingScreenStyle('{ not json'), habbo);
    assert.equal(habbo.photo, true);
    assert.equal(habbo.percent, true);
});

void test('saturation 1 is the picture as drawn and 0 its luminance (CSS saturate)', () => {
    const identity = saturationMatrix(1).map(value => Math.round(value * 1000) / 1000);

    assert.deepEqual(identity, [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ]);
    assert.deepEqual(saturationMatrix(0).slice(0, 3), [ 0.213, 0.715, 0.072 ]);
});
