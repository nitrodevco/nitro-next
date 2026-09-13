import { Texture } from 'pixi.js';

import { getOrBuildTexture, usePixiEffectTexture } from '../hooks/usePixiTexture';
import { useThemeImageUrl } from '../hooks/useThemeImageUrl';
import { boxBlurAlpha } from '../utils/boxBlur';
import { getRenderMode } from '../utils/renderMode';
import { ThemeSliceEffect } from '../utils/themeSprites';
import { DropShadowConfig } from '../utils/ThemeVariant';
import { BackgroundLayerConfig } from './BackgroundLayer';

/**
 * A layout's `<DropShadowFilter>` (`flash.filters.DropShadowFilter`), baked instead of
 * filtered: a Pixi `DropShadowFilter` re-renders its whole subject into offscreen textures
 * every frame, which for a window-sized frame was the single largest GPU allocation the UI
 * made. Two bakes, one draw each:
 *
 * - Given the host's nine-slice skin (`layer`), the shadow is that skin's own silhouette,
 *   blurred and offset, drawn as a nine-slice through the same slicing - so it follows the
 *   art's rounded corners exactly like the filter did (the corners are in the corner slices,
 *   the straight runs stretch). One recoloured slice per skin + shadow settings.
 * - Without a skin (a region, a composite), the shadow is of the box's rectangle.
 *
 * Flash's defaults apply where the layout left an attribute out (`WindowParser`): no offset,
 * 45 degrees, black, opaque, no blur. The blur is Flash's `quality = 1` box blur, `blur` px
 * wide - see utils/boxBlur.ts.
 */
export type ShadowLayerProps = DropShadowConfig & {
    /** The host's skin, when it has one - a nine-slice casts the shadow of its art. */
    layer?: BackgroundLayerConfig;
};

const FLASH_DEFAULTS = { distance: 0, angle: 45, color: '#000000', alpha: 1, blur: 0 };

const parseColor = (color: string): [number, number, number] => {
    const hex = color.replace('#', '');
    const value = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);

    return [ (value >> 16) & 255, (value >> 8) & 255, value & 255 ];
};

const offsetOf = (distance: number, angle: number): { x: number; y: number } => {
    const radians = (angle * Math.PI) / 180;

    return { x: Math.round(Math.cos(radians) * distance), y: Math.round(Math.sin(radians) * distance) };
};

/** How far the blur reaches past an edge: half the window, and at least a pixel of transparent margin. */
const blurPad = (blur: number): number => Math.max(1, Math.ceil(blur / 2));

/**
 * The shadow of a rectangle as a nine-slice: a solid core `2 * pad + 1` wide, blurred on a
 * canvas padded `pad` more each side, so a `2 * pad` corner holds the whole edge falloff (the
 * `pad` outside the rectangle and the `pad` inside it) and the 1px middle stretches. One per
 * blur + colour + alpha, kept in the `AssetManager`.
 */
const rectShadowTexture = (blur: number, color: string, alpha: number): { texture: Texture; pad: number } | undefined => {
    const pad = blurPad(blur);
    const texture = getOrBuildTexture(`shadow:rect:${blur}|${color}|${alpha}`, () => {
        const core = (pad * 2) + 1;
        const size = core + (pad * 2);
        const canvas = document.createElement('canvas');

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        if (!ctx) return undefined;

        const [ r, g, b ] = parseColor(color);
        const image = ctx.createImageData(size, size);

        for (let y = pad; y < pad + core; y++) {
            for (let x = pad; x < pad + core; x++) {
                const index = ((y * size) + x) * 4;

                image.data[index + 3] = Math.round(255 * alpha);
            }
        }

        for (let i = 0; i < image.data.length; i += 4) {
            image.data[i] = r;
            image.data[i + 1] = g;
            image.data[i + 2] = b;
        }

        boxBlurAlpha(image, blur, blur);
        ctx.putImageData(image, 0, 0);

        return canvas;
    });

    return texture ? { texture, pad } : undefined;
};

/** The box, grown by `pad` on every side and shifted by the offset - what both bakes fill. */
const shadowBoxLayout = (x: number, y: number, pad: number) => ({ position: 'absolute' as const, left: x - pad, top: y - pad, right: -x - pad, bottom: -y - pad });

interface ResolvedShadow {
    x: number;
    y: number;
    color: string;
    alpha: number;
    blur: number;
}

const resolve = ({ distance = FLASH_DEFAULTS.distance, angle = FLASH_DEFAULTS.angle, color = FLASH_DEFAULTS.color, alpha = FLASH_DEFAULTS.alpha, blur = FLASH_DEFAULTS.blur }: DropShadowConfig): ResolvedShadow => (
    { ...offsetOf(distance, angle), color, alpha, blur }
);

const skinEffect = ({ color, alpha, blur }: ResolvedShadow, pad: number): ThemeSliceEffect => ({ kind: 'shadow', color, alpha, blurX: blur, blurY: blur, pad });

type NineSliceSkin = Extract<BackgroundLayerConfig, { kind: 'nineSlice' }>;

const SkinShadowPixi = ({ skin, shadow }: { skin: NineSliceSkin; shadow: ResolvedShadow }) => {
    const pad = Math.ceil(shadow.blur / 2);
    const texture = usePixiEffectTexture(skin.textureKey, skinEffect(shadow, pad));

    if (!texture) return null;

    return (
        <pixiContainer
            eventMode="none"
            layout={shadowBoxLayout(shadow.x, shadow.y, pad)}
        >
            <pixiNineSliceSprite
                texture={texture}
                leftWidth={skin.leftWidth + pad}
                topHeight={skin.topHeight + pad}
                rightWidth={skin.rightWidth + pad}
                bottomHeight={skin.bottomHeight + pad}
                eventMode="none"
                layout={{ width: '100%', height: '100%' }}
            />
        </pixiContainer>
    );
};

const SkinShadowDom = ({ skin, shadow }: { skin: NineSliceSkin; shadow: ResolvedShadow }) => {
    const pad = Math.ceil(shadow.blur / 2);
    const url = useThemeImageUrl(skin.textureKey, skinEffect(shadow, pad));

    if (!url) return null;

    const box = shadowBoxLayout(shadow.x, shadow.y, pad);
    const width = `${skin.topHeight + pad}px ${skin.rightWidth + pad}px ${skin.bottomHeight + pad}px ${skin.leftWidth + pad}px`;

    return (
        <div style={{
            position: 'absolute',
            left: box.left,
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            pointerEvents: 'none',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderWidth: width,
            borderImageSource: `url(${url})`,
            borderImageSlice: `${skin.topHeight + pad} ${skin.rightWidth + pad} ${skin.bottomHeight + pad} ${skin.leftWidth + pad} fill`,
            borderImageWidth: width,
            imageRendering: 'pixelated',
        }}
        />
    );
};

const RectShadowPixi = ({ shadow }: { shadow: ResolvedShadow }) => {
    const baked = rectShadowTexture(shadow.blur, shadow.color, shadow.alpha);

    if (!baked) return null;

    const { texture, pad } = baked;

    // The host container is what the insets size (a Yoga leaf keeps its intrinsic texture size
    // when only insets are given); the nine-slice then fills it.
    return (
        <pixiContainer
            eventMode="none"
            layout={shadowBoxLayout(shadow.x, shadow.y, pad)}
        >
            <pixiNineSliceSprite
                texture={texture}
                leftWidth={pad * 2}
                topHeight={pad * 2}
                rightWidth={pad * 2}
                bottomHeight={pad * 2}
                eventMode="none"
                layout={{ width: '100%', height: '100%' }}
            />
        </pixiContainer>
    );
};

/** CSS `box-shadow`'s blur radius spreads about half as far as Flash's box window, hence the halving. */
const RectShadowDom = ({ shadow }: { shadow: ResolvedShadow }) => {
    const [ r, g, b ] = parseColor(shadow.color);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur / 2}px rgba(${r}, ${g}, ${b}, ${shadow.alpha})` }} />
    );
};

/** Render as the FIRST child of the box it shadows, so everything else draws over it. */
export const ShadowLayer = ({ layer, ...config }: ShadowLayerProps) => {
    const shadow = resolve(config);
    const dom = getRenderMode() === 'dom';

    if (layer?.kind === 'nineSlice') {
        return dom
            ? (
                    <SkinShadowDom
                        skin={layer}
                        shadow={shadow}
                    />
                )
            : (
                    <SkinShadowPixi
                        skin={layer}
                        shadow={shadow}
                    />
                );
    }

    return dom ? <RectShadowDom shadow={shadow} /> : <RectShadowPixi shadow={shadow} />;
};
