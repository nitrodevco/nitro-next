import { TextDropShadow, Texture } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { useEffect, useMemo } from 'react';

import { GetPixelRatio } from '#base/utils';

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
}

/**
 * Renders the whole string through truffle in one `renderToBuffer` call (see `theme/font/
 * truffle.ts`'s docblock for why - kerning/grid-fitting only come out right when truffle shapes
 * the full string itself) and wraps the resulting buffer in a Pixi `Texture` via an intermediate
 * canvas, mirroring `BitmapTextDom`'s own blit so both targets can never disagree on pixels.
 * `color` is omitted from the render call entirely when the caller doesn't override it, so
 * truffle applies the named style's own certified default color - not a value this component
 * has to track or duplicate.
 */
export const TruffleTextPixi = ({ habboKey, text, color, dropShadow, layout, wordWrap, wordWrapWidth }: TruffleTextPixiProps) => {
    const texture = useMemo(() => {
        if (!text?.length) return undefined;

        const buffer = renderTruffleText(text, habboKey, {
            ...(color ? { color: colorStringToNumber(color) } : {}),
            wordWrap,
            width: wordWrap ? wordWrapWidth : undefined,
        });

        if (!buffer) return undefined;

        const canvas = bufferToCanvas(buffer);
        const created = Texture.from(canvas);

        created.source.scaleMode = 'nearest';

        return created;
    }, [ text, habboKey, color, wordWrap, wordWrapWidth ]);

    // `Texture.from(canvas)` allocates a GPU resource each render - explicit disposal is what
    // keeps this from leaking as text content changes (chat messages, live counters, etc.).
    useEffect(() => () => texture?.destroy(true), [ texture ]);

    const filters = useMemo(() => (dropShadow
        ? [ new DropShadowFilter({
                offset: { x: Math.cos(dropShadow.angle) * dropShadow.distance, y: Math.sin(dropShadow.angle) * dropShadow.distance },
                blur: dropShadow.blur,
                color: dropShadow.color,
                alpha: dropShadow.alpha,
                resolution: GetPixelRatio(),
            }) ]
        : undefined), [ dropShadow ]);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            roundPixels
            filters={filters}
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
