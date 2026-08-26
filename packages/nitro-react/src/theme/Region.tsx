import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { ColorLayer } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

type RegionVariant = ThemeVariant;

const REGION_VARIANTS: ThemeVariants<RegionVariant> = {
    0: {},
};

export interface RegionProps extends ThemeProps<RegionVariant> {
    /** The Flash `background="true"` + `color` pair: a flat fill behind the children. */
    backgroundColor?: string;
    cursor?: string;
    children?: ReactNode;
}

/**
 * The themed counterpart of the Flash `container`/`region`/`background` elements: a plain
 * positioning `Box` that, unlike `Box` itself, accepts the full `ThemeProps` surface (variant
 * cascade, text style inheritance for bare string children, the layout metadata in
 * `ThemeLayoutMeta`, and the pointer handlers a `region` uses as a hit area). Ported layouts
 * reach for this wherever the XML had a structural node; hand-written views keep using `Box`.
 */
export const Region: ForwardRefExoticComponent<RegionProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RegionProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, zIndex, visible, backgroundColor, cursor, children,
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
