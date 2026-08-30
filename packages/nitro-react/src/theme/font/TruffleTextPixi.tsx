import { Color, TextDropShadow, Texture } from 'pixi.js';
import { useEffect, useMemo } from 'react';

import { BoxLayout } from '../Box';
import { bufferToCanvas, colorStringToNumber, HabboStyleKey, renderTruffleText } from './truffle';

export interface TruffleTextPixiProps {
    habboKey: HabboStyleKey;
    text: string;
    color?: string;
    dropShadow?: TextDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    visible?: boolean;
}

/**
 * Truffle-rasterised text as one sprite. A drop shadow is baked into the same canvas (a second,
 * shadow-coloured rasterisation drawn offset underneath, exactly what `TruffleTextDom` does)
 * rather than applied as a `DropShadowFilter` - a filter routes every shadowed label through
 * offscreen render textures each frame, for a sprite a few dozen pixels wide.
 */
export const TruffleTextPixi = ({ habboKey, text, color, dropShadow, layout, wordWrap, wordWrapWidth, visible }: TruffleTextPixiProps) => {
    const texture = useMemo(() => {
        if (!text?.length) return undefined;

        const options = { wordWrap, width: wordWrap ? wordWrapWidth : undefined };
        const buffer = renderTruffleText(text, habboKey, { ...options, ...(color ? { color: colorStringToNumber(color) } : {}) });

        if (!buffer) return undefined;

        const shadowBuffer = dropShadow ? renderTruffleText(text, habboKey, { ...options, color: new Color(dropShadow.color).toNumber() }) : undefined;
        const canvas = bufferToCanvas(buffer, shadowBuffer && dropShadow ? { buffer: shadowBuffer, ...dropShadow } : undefined);
        const created = Texture.from(canvas);

        created.source.scaleMode = 'nearest';

        return created;
    }, [ text, habboKey, color, wordWrap, wordWrapWidth, dropShadow ]);

    useEffect(() => () => texture?.destroy(true), [ texture ]);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            visible={visible}
            roundPixels
            layout={{
                width: texture.width,
                height: texture.height,
                objectFit: 'none',
                flexShrink: 0,
                ...layout,
            }}
        />
    );
};

TruffleTextPixi.displayName = 'TruffleTextPixi';
