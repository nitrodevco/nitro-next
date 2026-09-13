import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useDynamicStyleEffect, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { ColorLayer, ShadowLayer } from './layer';
import { DynamicStyleRole, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

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
    /**
     * The Flash window `blend` of a container/text with its own graphic context: the opacity
     * of the whole subtree (a container drawing into its parent's context ignores `blend`
     * entirely - `WindowRendererItem` only applies it to a skin or an own-context fill).
     */
    alpha?: number;
    /** Greys the region out through its `dynamicStyle`'s disabled rule and stops its pointer events. */
    disabled?: boolean;
    /** A `#icon` / `#bg` tag under a `dynamicStyle` host: that host's child rule moves and tints this region. */
    dynamicRole?: DynamicStyleRole;
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
 *
 * A region is also the usual `dynamicStyle` host (the toolbar's `lifted_hover` tiles, the room
 * tools' `brightness_and_shadow_under` buttons): it tracks hover/press itself, applies the
 * style's host rule to its own box (the nudge, the pressed colour transform) and hands its
 * state down so its `dynamicRole` children can apply theirs - see utils/dynamicStyles.ts.
 */
export const Region: ForwardRefExoticComponent<RegionProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RegionProps>(
    ({
        variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, zIndex, visible, dropShadow, dynamicStyle, dynamicRole, backgroundColor, cursor, blendMode, alpha, disabled, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'region', variants: REGION_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, disabled, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);
        const childEffect = useDynamicStyleEffect(dynamicRole);

        return (
            <Box
                ref={ref}
                zIndex={zIndex}
                visible={visible}
                cursor={cursor}
                blendMode={blendMode}
                layout={{ ...config.layout, ...layout }}
                {...dynamicStyleBoxProps(hostEffect ?? childEffect, alpha)}
                {...handlers}
            >
                {dropShadow && <ShadowLayer {...dropShadow} />}
                {backgroundColor && <ColorLayer color={backgroundColor} />}
                <DynamicStyleProvider
                    name={dynamicStyle}
                    state={state}
                >
                    <VariantCascadeProvider map={ownCascade}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </DynamicStyleProvider>
            </Box>
        );
    },
);

Region.displayName = 'Region';
