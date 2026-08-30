import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { ColorLayer, ShadowLayer } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type RegionVariant = ThemeVariant;

const REGION_VARIANTS: ThemeVariants<RegionVariant> = {
    0: {},
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

        return (
            <Box
                ref={ref}
                zIndex={zIndex}
                visible={visible}
                cursor={cursor}
                blendMode={blendMode}
                layout={{ ...config.layout, ...layout }}
                {...handlers}
            >
                {dropShadow && <ShadowLayer {...dropShadow} />}
                {backgroundColor && <ColorLayer color={backgroundColor} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Region.displayName = 'Region';
