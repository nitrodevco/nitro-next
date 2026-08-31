import { Texture } from 'pixi.js';

import { getRenderMode } from '../utils/renderMode';
import { DropShadowConfig } from '../utils/ThemeVariant';

/**
 * A baked drop shadow: a Gaussian falloff around a rectangle, rendered once per
 * `(blur, color, alpha)` into a small canvas and stretched as a nine-slice behind the host box.
 * Replaces the `DropShadowFilter` frames and regions used to carry - a filter re-renders its
 * whole subject into pooled offscreen textures (bounds-sized, plus blur passes) every frame,
 * which for a window-sized frame was the single largest GPU allocation the UI made. This is
 * one batched nine-slice draw. The trade: the shadow follows the box's rectangle (with soft,
 * rounded falloff at the corners) rather than the art's exact alpha shape.
 *
 * DOM draws the same shape with `box-shadow`.
 */
const shadowTextures = new Map<string, { texture: Texture; pad: number }>();

const parseColor = (color: string): [number, number, number] => {
    const hex = color.replace('#', '');
    const value = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);

    return [ (value >> 16) & 255, (value >> 8) & 255, value & 255 ];
};

/**
 * The falloff is drawn pixel by pixel (no canvas `filter`, which isn't available everywhere):
 * every pixel's alpha is `alpha * exp(-d^2 / 2sigma^2)` with `d` its distance to the solid
 * 1px core in the middle, `sigma = blur`. The nine-slice's corners are the full `pad` so the
 * rounded falloff is preserved; the 1px core stretches into the shadow's body.
 */
const shadowTexture = (blur: number, color: string, alpha: number): { texture: Texture; pad: number } | undefined => {
    const key = `${blur}|${color}|${alpha}`;
    const cached = shadowTextures.get(key);

    if (cached) return cached;

    const pad = Math.max(1, Math.ceil(blur * 2.5));
    const size = pad * 2 + 1;
    const canvas = document.createElement('canvas');

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const [ r, g, b ] = parseColor(color);
    const image = ctx.createImageData(size, size);
    const sigma = Math.max(0.5, blur);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const dx = Math.max(0, pad - x, x - pad);
            const dy = Math.max(0, pad - y, y - pad);
            const falloff = blur > 0 ? Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma)) : (dx === 0 && dy === 0 ? 1 : 0);
            const index = (y * size + x) * 4;

            image.data[index] = r;
            image.data[index + 1] = g;
            image.data[index + 2] = b;
            image.data[index + 3] = Math.round(255 * alpha * falloff);
        }
    }

    ctx.putImageData(image, 0, 0);

    const texture = Texture.from(canvas);

    texture.source.scaleMode = 'linear';
    texture.label = `shadow ${key}`;

    const entry = { texture, pad };

    shadowTextures.set(key, entry);

    return entry;
};

const offsetOf = ({ distance = 4, angle = 45 }: DropShadowConfig): { x: number; y: number } => {
    const radians = (angle * Math.PI) / 180;

    return { x: Math.round(Math.cos(radians) * distance), y: Math.round(Math.sin(radians) * distance) };
};

const ShadowLayerPixi = ({ distance, angle, color = '#000000', alpha = 0.35, blur = 4 }: DropShadowConfig) => {
    const shadow = shadowTexture(blur, color, alpha);

    if (!shadow) return null;

    const { x, y } = offsetOf({ distance, angle });
    const { texture, pad } = shadow;

    // The host container is what the insets size (a Yoga leaf keeps its intrinsic texture size
    // when only insets are given); the nine-slice then fills it.
    return (
        <pixiContainer
            eventMode="none"
            layout={{ position: 'absolute', left: x - pad, top: y - pad, right: -x - pad, bottom: -y - pad }}
        >
            <pixiNineSliceSprite
                texture={texture}
                leftWidth={pad}
                topHeight={pad}
                rightWidth={pad}
                bottomHeight={pad}
                eventMode="none"
                layout={{ width: '100%', height: '100%' }}
            />
        </pixiContainer>
    );
};

const ShadowLayerDom = ({ distance, angle, color = '#000000', alpha = 0.35, blur = 4 }: DropShadowConfig) => {
    const { x, y } = offsetOf({ distance, angle });
    const [ r, g, b ] = parseColor(color);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${alpha})` }} />
    );
};

/** Render as the FIRST child of the box it shadows, so everything else draws over it. */
export const ShadowLayer = (props: DropShadowConfig) => (getRenderMode() === 'dom' ? <ShadowLayerDom {...props} /> : <ShadowLayerPixi {...props} />);
