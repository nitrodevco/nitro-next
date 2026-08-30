import { Texture } from 'pixi.js';

import { getRenderMode } from '../utils/renderMode';
import { DropShadowConfig } from '../utils/ThemeVariant';

/**
 * A baked drop shadow: a blurred rectangle drawn once on a canvas per `(blur, color, alpha)`,
 * kept as a nine-slice texture and stretched behind the host box. Replaces the
 * `DropShadowFilter` frames and regions used to carry - a filter re-renders its whole subject
 * into pooled offscreen textures (bounds-sized, plus blur passes) every frame, which for a
 * window-sized frame was the single largest GPU allocation the UI made. A nine-slice is one
 * ordinary batched draw. The trade: the shadow is the box's rectangle rather than its exact
 * alpha shape, which for window chrome (near-rectangular, 35% black, 4px blur) is invisible.
 *
 * DOM draws the same rectangle with `box-shadow`, so both targets match.
 */
const shadowTextures = new Map<string, { texture: Texture; pad: number }>();

const shadowTexture = (blur: number, color: string, alpha: number): { texture: Texture; pad: number } | undefined => {
    const key = `${blur}|${color}|${alpha}`;
    const cached = shadowTextures.get(key);

    if (cached) return cached;

    // The blur spreads ~2x its radius; pad by that on every side, with a 2px solid centre.
    const pad = Math.ceil(blur * 2) + 1;
    const size = pad * 2 + 2;
    const canvas = document.createElement('canvas');

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    if (blur > 0) ctx.filter = `blur(${blur}px)`;
    ctx.fillRect(pad, pad, 2, 2);
    ctx.filter = 'none';

    // Un-blurred, the 2px centre would shrink the visible shadow: fill the solid core last.
    if (blur > 0) ctx.fillRect(pad, pad, 2, 2);

    const texture = Texture.from(canvas);

    texture.label = `shadow ${key}`;

    const entry = { texture, pad };

    shadowTextures.set(key, entry);

    return entry;
};

const offsetOf = ({ distance = 4, angle = 45 }: DropShadowConfig): { x: number; y: number } => {
    const radians = (angle * Math.PI) / 180;

    return { x: Math.cos(radians) * distance, y: Math.sin(radians) * distance };
};

const ShadowLayerPixi = ({ distance, angle, color = '#000000', alpha = 0.35, blur = 4 }: DropShadowConfig) => {
    const shadow = shadowTexture(blur, color, alpha);

    if (!shadow) return null;

    const { x, y } = offsetOf({ distance, angle });
    const { texture, pad } = shadow;

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={pad + 1}
            topHeight={pad + 1}
            rightWidth={pad + 1}
            bottomHeight={pad + 1}
            eventMode="none"
            layout={{ position: 'absolute', left: x - pad, top: y - pad, right: -x - pad, bottom: -y - pad }}
        />
    );
};

const ShadowLayerDom = ({ distance, angle, color = '#000000', alpha = 0.35, blur = 4 }: DropShadowConfig) => {
    const { x, y } = offsetOf({ distance, angle });
    const rgba = (() => {
        const hex = color.replace('#', '');
        const value = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);

        return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
    })();

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: `${x}px ${y}px ${blur}px ${rgba}` }} />
    );
};

/** Render as the FIRST child of the box it shadows, so everything else draws over it. */
export const ShadowLayer = (props: DropShadowConfig) => (getRenderMode() === 'dom' ? <ShadowLayerDom {...props} /> : <ShadowLayerPixi {...props} />);
