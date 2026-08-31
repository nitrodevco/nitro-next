import { Color, TextDropShadow, Texture } from 'pixi.js';
import { useEffect, useMemo } from 'react';

import { BoxLayout } from '../Box';
import { insetStretchAxes } from '../utils/layoutInsetStretch';
import { bufferToCanvas, colorStringToNumber, HabboStyleKey, renderTruffleText, renderTruffleTextBlock } from './truffle';

export interface TruffleTextPixiProps {
    habboKey: HabboStyleKey;
    text: string;
    color?: string;
    dropShadow?: TextDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    visible?: boolean;
    /** Explicit line advance in px for multi-line text (composed per line - see `renderTruffleTextBlock`). */
    lineHeight?: number;
}

/**
 * Truffle-rasterised text as one sprite. A drop shadow is baked into the same canvas (a second,
 * shadow-coloured rasterisation drawn offset underneath, exactly what `TruffleTextDom` does)
 * rather than applied as a `DropShadowFilter` - a filter routes every shadowed label through
 * offscreen render textures each frame, for a sprite a few dozen pixels wide.
 */
export const TruffleTextPixi = ({ habboKey, text, color, dropShadow, layout, wordWrap, wordWrapWidth, visible, lineHeight }: TruffleTextPixiProps) => {
    const texture = useMemo(() => {
        if (!text?.length) return undefined;

        const options = { wordWrap, width: wordWrap ? wordWrapWidth : undefined, ...(color ? { color: colorStringToNumber(color) } : {}) };
        const shadowColor = dropShadow ? new Color(dropShadow.color).toNumber() : 0;
        let canvas: HTMLCanvasElement | undefined;

        if (lineHeight && !wordWrap && text.includes('\n')) {
            canvas = renderTruffleTextBlock(text, habboKey, options, lineHeight, dropShadow ? { ...dropShadow, colorValue: shadowColor } : undefined);
        } else {
            const buffer = renderTruffleText(text, habboKey, options);

            if (!buffer) return undefined;

            const shadowBuffer = dropShadow ? renderTruffleText(text, habboKey, { ...options, color: shadowColor }) : undefined;

            canvas = bufferToCanvas(buffer, shadowBuffer && dropShadow ? { buffer: shadowBuffer, ...dropShadow } : undefined);
        }

        if (!canvas) return undefined;

        const created = Texture.from(canvas);

        created.source.scaleMode = 'nearest';

        return created;
    }, [ text, habboKey, color, wordWrap, wordWrapWidth, dropShadow, lineHeight ]);

    useEffect(() => () => texture?.destroy(true), [ texture ]);

    if (!texture) return null;

    const stretchAxes = insetStretchAxes(layout);
    const sprite = (spriteLayout: BoxLayout | undefined) => (
        <pixiSprite
            texture={texture}
            visible={visible}
            roundPixels
            layout={{
                width: texture.width,
                height: texture.height,
                objectFit: 'none',
                flexShrink: 0,
                ...spriteLayout,
            }}
        />
    );

    // A leaf sprite won't span between insets (it keeps its intrinsic size) - a container host
    // does the spanning, the text fills it and aligns itself via its objectPosition.
    if (stretchAxes.x || stretchAxes.y) {
        return (
            <pixiContainer
                eventMode="none"
                layout={layout}
            >
                {sprite({ objectPosition: layout?.objectPosition, width: stretchAxes.x ? '100%' : undefined, height: stretchAxes.y ? '100%' : undefined })}
            </pixiContainer>
        );
    }

    return sprite(layout);
};

TruffleTextPixi.displayName = 'TruffleTextPixi';
