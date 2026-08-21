import '@pixi/layout';

import { extend } from '@pixi/react';
import { Container, Graphics, NineSliceSprite, Sprite, Text } from 'pixi.js';

/**
 * Registers the Pixi classes theme-pixi components render as JSX tags (pixiContainer,
 * pixiNineSliceSprite, etc). Importing '@pixi/layout' above also mixes a `.layout` flexbox
 * property into pixi.js's own Container prototype (and therefore every subclass used
 * here), so no separate Layout* wrapper classes are needed.
 */
extend({
    Container,
    Graphics,
    NineSliceSprite,
    Sprite,
    Text,
});
