import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useMemo } from 'react';

import { GetPixelRatio } from '#base/utils';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { ColorLayer } from './layer';
import { DropShadowConfig, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type RegionVariant = ThemeVariant;

const REGION_VARIANTS: ThemeVariants<RegionVariant> = {
    0: {},
};

/** Flash's `DropShadowFilter(distance, angle°, color, alpha, blurX, blurY)` -> pixi-filters' offset/blur form. */
const createDropShadow = ({ distance = 4, angle = 45, color = '#000000', alpha = 0.35, blur = 4 }: DropShadowConfig) => {
    const radians = angle * Math.PI / 180;

    return new DropShadowFilter({ offset: { x: Math.cos(radians) * distance, y: Math.sin(radians) * distance }, blur, color, alpha, resolution: GetPixelRatio() });
};

export interface RegionProps extends ThemeProps<RegionVariant> {
    /** The Flash `background="true"` + `color` pair: a flat fill behind the children. */
    backgroundColor?: string;
    cursor?: string;
    /** The Flash `BLEND_<mode>` tag (`BLEND_ADD` on glow bitmaps, ...). */
    blendMode?: BLEND_MODES;
    children?: ReactNode;
}

/**
 * The themed counterpart of the Flash `container`/`region`/`background` elements: a plain
 * positioning `Box` that, unlike `Box` itself, accepts the full `ThemeProps` surface (variant
 * cascade, text style inheritance for bare string children, the layout metadata in
 * `ThemeLayoutMeta`, and the pointer handlers a `region` uses as a hit area). Ported layouts
 * reach for this wherever the XML had a structural node; hand-written views keep using `Box`.
 * It's also the one component that applies `dropShadow`, so the generator wraps any other
 * element carrying a `<DropShadowFilter>` in one of these.
 */
export const Region: ForwardRefExoticComponent<RegionProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RegionProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, zIndex, visible, dropShadow, backgroundColor, cursor, blendMode, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'region', variants: REGION_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const filters = useMemo(() => (dropShadow ? [ createDropShadow(dropShadow) ] : undefined), [ dropShadow ]);

        return (
            <Box
                ref={ref}
                zIndex={zIndex}
                visible={visible}
                cursor={cursor}
                blendMode={blendMode}
                filters={filters}
                layout={{ ...config.layout, ...layout }}
                {...handlers}
            >
                {backgroundColor && <ColorLayer color={backgroundColor} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Region.displayName = 'Region';
