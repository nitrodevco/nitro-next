import assert from 'node:assert/strict';
import { test } from 'node:test';

import { overlayTextureName, parseAssetOverlays } from '../src/utils/assetOverlays';

test('overlays are read by library then asset; keys without both and entries that are no url are left out', () => {
    const overlays = parseAssetOverlays(JSON.stringify({
        'habbo-window-manager-com/theme-habbo-frame-frame-default': '/gamedata/plugins/skin/frame.png?v=1',
        'habbo-room-ui-com/roomtools_gear': 'https://cdn.example.com/gear.png',
        'habbo-room-ui-com/': 'x.png',
        '/gear': 'x.png',
        'habbo-toolbar-com/icon': '',
    }));

    assert.deepEqual(overlays && [ ...overlays ].map(([ library, assets ]) => [ library, [ ...assets ] ]), [
        [ 'habbo-window-manager-com', [ [ 'theme-habbo-frame-frame-default', '/gamedata/plugins/skin/frame.png?v=1' ] ] ],
        [ 'habbo-room-ui-com', [ [ 'roomtools_gear', 'https://cdn.example.com/gear.png' ] ] ],
    ]);
    assert.equal(parseAssetOverlays('{ not json'), undefined);
});

test('a library bitmap is named with its library in front, a theme sheet sprite by its sprite name', () => {
    assert.equal(overlayTextureName('habbo-room-ui-com', 'roomtools_gear'), 'habbo-room-ui-com-roomtools_gear');
    assert.equal(overlayTextureName('habbo-window-manager-com', 'theme-habbo-frame-frame-default'), 'theme-habbo-frame-frame-default');
});
