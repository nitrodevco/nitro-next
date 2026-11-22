import assert from 'node:assert/strict';
import { test } from 'node:test';

import { navigatorFirstPosition } from '../src/views/navigator/navigatorFirstPosition';

const preferences = { windowX: 427, windowY: 41 };
const theme = { x: 84, y: 153 };

// Flash: `NavigatorView.setInitialWindowDimensions` (NavigatorView.as:149-157) puts the window where the server's preferences say.
void test('without a theme\'s place the navigator opens where the server\'s preferences put it, as in Flash', () => {
    assert.deepEqual(navigatorFirstPosition(undefined, preferences, undefined, false), { position: { x: 427, y: 41 }, fromTheme: false });
    assert.deepEqual(navigatorFirstPosition(undefined, preferences, undefined, true), { position: { x: 427, y: 41 }, fromTheme: false });
});

// The theme's part is the framework's own rule (Flash has no themes), not official evidence.
void test('a theme\'s first place goes over the server\'s default until the player has placed the window, then theirs wins', () => {
    assert.deepEqual(navigatorFirstPosition(undefined, preferences, theme, false), { position: theme, fromTheme: true });
    assert.deepEqual(navigatorFirstPosition(undefined, preferences, theme, true), { position: { x: 427, y: 41 }, fromTheme: false });
});

void test('where the window was last this session beats both', () => {
    assert.deepEqual(navigatorFirstPosition({ x: 300, y: 200 }, preferences, theme, false), { position: { x: 300, y: 200 }, fromTheme: false });
});
