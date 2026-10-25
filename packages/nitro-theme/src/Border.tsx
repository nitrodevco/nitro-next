import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, useDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer, isSingleNodeLayer, leafBoxLayout, ShadowLayer } from './layer';
import { DynamicStyleRole, expandSides, FillLayout, ThemeProps, ThemeVariant, wrapTextChildren } from './utils';

/**
 * A border skin. `colorize: false` (on `ThemeBase`, honoured by `useThemeVariant`) marks a skin
 * whose every entity is `colorize="false"` in the client's skin XML - `BitmapSkinRenderer.draw`
 * copies such pieces untinted, so the window's `color` has no effect on it.
 */
export type BorderVariant = ThemeVariant;

export interface BorderProps extends ThemeProps<BorderVariant> {
    /**
     * The Flash window `blend`: the opacity the skin is composited at, over whatever lies
     * behind the border. `WindowRendererItem.render` draws the skin buffer into the parent's
     * bitmap with `ColorTransform.alphaMultiplier = blend` - a border at `blend="0.3"` is 30%
     * skin, 70% of the parent's own background, which is why it reads lighter than the skin's
     * colour on a light window. Children are not dimmed: nearly every layout border uses the
     * parent graphic context (`params` bit 16), where each child window composites itself with
     * its own blend. See `ownGraphicContext` for the borders that do not.
     */
    blend?: number;
    /**
     * The border's `params` lack bit 16, so it has a graphic context of its own. For such a window
     * `WindowRendererItem.render` copies the skin in at full opacity and puts `blend` on the
     * context instead (`getGraphicContext(true).blend`, i.e. its `alpha`) - and the context holds
     * every child window's context too, so the whole subtree fades with it, text included.
     * `room_tools_toolbar`'s `window_bg` and `room_tools_history`'s border are the two the port
     * draws; without this their labels come out at full strength, visibly whiter than Flash's.
     */
    ownGraphicContext?: boolean;
    /**
     * A fill behind the skin. `WindowRendererItem` creates the skin buffer filled with the
     * window's `color` *including its alpha byte* - most layout colours have none
     * (`0x0666666`) and the fill is invisible, but a `0xffa1a19b` (the catalogue's item
     * highlight borders) paints an opaque square under the skin that shows through its
     * transparent corners. `backgroundAlpha` is that byte, when it isn't `ff`.
     */
    backgroundColor?: string;
    backgroundAlpha?: number;
    /**
     * A `#icon` / `#bg` tag under a `dynamic_style` host: the host's child rule moves, recolours and
     * fades the border with everything in it (ubuntu's `element_entry_template`, whose tagged
     * `icon_border` holds the product icon). As for a `Region`, a container takes the rule's offset,
     * multiply and alpha; the etching and the additive brightening are drawn only for a bitmap.
     */
    dynamicRole?: DynamicStyleRole;
    children?: ReactNode;
}

/**
 * Tint and blend follow `BitmapSkinRenderer.draw` / `WindowRendererItem.render`: `tintColor`
 * is the window `color`, a straight RGB multiply applied to each `colorize` skin entity (a
 * sprite `tint`); `blend` is the alpha the finished skin is composited at (see `BorderProps`).
 * Neither pre-darkens or washes the artwork - what shows through a translucent border is the
 * parent, not white.
 */
export const Border: ForwardRefExoticComponent<BorderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BorderProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, dropShadow, blend, ownGraphicContext, backgroundColor, backgroundAlpha, dynamicRole, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedPlain, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<BorderVariant>({
            cascadeKey: 'border', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const roleEffect = useDynamicStyleEffect(dynamicRole);
        const boxLayout = { ...expandSides(config.layout), ...expandSides(layout) };
        // A skin drawn as one display object (a nine-slice, most borders) with no fill or overlay
        // takes the blend itself - the same as a group alpha over one object - with no container
        // around it; and a border given no children, which nothing interacts with, is that object.
        // Whether it is decided by what the call site passes, not by what the children render to:
        // a node that changes from one kind to another while mounted is not laid out again.
        const alone = isSingleNodeLayer(resolvedLayer) && !backgroundColor && !resolvedOverlay;
        const interactive = !!tooltip || !!dynamicRole || !!(onPointerOver || onPointerOut || onPointerDown || onPointerUp || onPointerUpOutside || onPointerTap);

        if (alone && !interactive && !dropShadow && (children === undefined)) {
            return (
                <BackgroundLayer
                    ref={ref}
                    layer={resolvedLayer}
                    tintColor={resolvedTint}
                    alpha={blend}
                    visible={visible}
                    layout={leafBoxLayout(boxLayout)}
                />
            );
        }

        const skinBlend = (blend !== undefined) && !ownGraphicContext ? blend : undefined;
        // The fill is part of the skin buffer, so it blends with it.
        const skin = (
            <>
                {backgroundColor && (
                    <ColorLayer
                        color={backgroundColor}
                        alpha={backgroundAlpha}
                    />
                )}
                <BackgroundLayer
                    layer={resolvedLayer}
                    tintColor={resolvedTint}
                    alpha={alone ? skinBlend : undefined}
                />
                <BackgroundLayer layer={resolvedOverlay} />
            </>
        );

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={boxLayout}
                {...dynamicStyleBoxProps(roleEffect, ownGraphicContext ? blend : undefined)}
                {...handlers}
            >
                {/* The skin's own silhouette, as a `Frame` casts it - a `Region`'s would be a square box. Not faded by `blend`. */}
                {dropShadow && (
                    <ShadowLayer
                        {...dropShadow}
                        layer={resolvedLayer}
                        plain={resolvedPlain}
                    />
                )}
                {((skinBlend === undefined) || alone)
                    ? skin
                    : (
                            // A skin of several objects at `blend`, as one group. Children stay outside it.
                            <Box
                                layout={FillLayout}
                                alpha={skinBlend}
                                eventMode="none"
                            >
                                {skin}
                            </Box>
                        )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Border.displayName = 'Border';
