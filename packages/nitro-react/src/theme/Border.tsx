import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, useDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer, Composite, CompositePiece, HsvNineSlice, NineSlice } from './layer';
import { DynamicStyleRole, FillLayout, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

/**
 * A border skin. `colorize: false` (on `ThemeBase`, honoured by `useThemeVariant`) marks a skin
 * whose every entity is `colorize="false"` in the client's skin XML - `BitmapSkinRenderer.draw`
 * copies such pieces untinted, so the window's `color` has no effect on it.
 */
export type BorderVariant = ThemeVariant;

const BORDER_VARIANTS: ThemeVariants<BorderVariant> = {
    0: { layer: NineSlice('border-0-default-src', 6, 6, 6, 6) },
    1: { layer: NineSlice('border-1-default-src', 6, 6, 6, 6) },
    2: { layer: NineSlice('border-2-default-src', 6, 6, 6, 6) },
    3: { layer: NineSlice('border-3-default-src', 3, 3, 3, 3) },
    4: { layer: NineSlice('border-4-default-src', 6, 6, 6, 6) },
    5: { layer: NineSlice('border-5-default-src', 5, 5, 5, 5) },
    6: { layer: NineSlice('border-6-default-src', 8, 8, 8, 8) },
    7: { layer: NineSlice('border-7-default-src', 6, 6, 6, 7) },
    8: { layer: NineSlice('border-8-default-src', 10, 10, 10, 10) },
    9: { layer: NineSlice('border-9-default-src', 7, 7, 7, 8), tintColor: '#686661' },
    10: { layer: NineSlice('border-10-default-src', 6, 6, 6, 8) },
    // habbo_skin - "white with sharpest corners" (border_slot_2)
    11: { layer: NineSlice('border-11-default-src', 3, 3, 3, 3) },
    // "white with thin dark border, sharpest corners, shadow"
    12: { layer: NineSlice('border-12-default-src', 5, 5, 5, 5) },
    // "ancient border"
    13: { layer: NineSlice('border-13-default-src', 12, 11, 12, 11) },
    // ubuntu_skin - "white round with grey light border"
    14: { layer: NineSlice('border-14-default-src', 10, 10, 10, 10) },
    // "recolorable round border" - the dark/mid/light HSV layers are pre-composed (see
    // scripts/extract-skin-assets.ts), the element's `color` tints the result.
    // Recolourable (`hsv_layer`) borders: shade layers stacked and tinted per layer like the client.
    15: { layer: HsvNineSlice('border-15-default', [ 0.2, 0.12, 0 ], 5, 5, 5, 5) },
    16: { layer: HsvNineSlice('border-16-default', [ 0.5, 0.16, 0 ], 6, 6, 6, 6) },
    // Illumina (`habbo_element_description`): `illumina_light_border` - every piece `colorize="false"`.
    100: { layer: NineSlice('border-100-default-src', 3, 3, 3, 3), colorize: false },
    // `illumina_light_frame` - every piece `colorize="false"`.
    101: {
        colorize: false,
        layer: Composite([
            CompositePiece('border-101-default-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-101-default-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-101-default-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-101-default-center-left-src', 4, 0, undefined, 7, 1),
            CompositePiece('border-101-default-center-center-src', 4, 1, 1, 7),
            CompositePiece('border-101-default-center-left-src', 4, undefined, 0, 7, 1),
            CompositePiece('border-101-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-101-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-101-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
    },
    // `illumina_light_border_sunk` - every piece `colorize="false"`.
    102: {
        colorize: false,
        layer: Composite([
            CompositePiece('border-102-default-top-left-src', 0, 0, undefined, undefined, 12, 14),
            CompositePiece('border-102-default-top-center-src', 0, 12, 6, undefined, undefined, 14),
            CompositePiece('border-102-default-top-right-src', 0, undefined, 0, undefined, 6, 14),
            CompositePiece('border-102-default-center-left-src', 14, 0, undefined, 4, 8),
            CompositePiece('border-102-default-center-center-src', 14, 8, 1, 4),
            CompositePiece('border-102-default-center-right-src', 14, undefined, 0, 4, 1),
            CompositePiece('border-102-default-bottom-left-src', undefined, 0, undefined, 0, 8, 4),
            CompositePiece('border-102-default-bottom-center-src', undefined, 8, 4, 0, undefined, 4),
            CompositePiece('border-102-default-bottom-right-src', undefined, undefined, 0, 0, 4, 4),
        ]),
    },
    103: {
        layer: Composite([
            CompositePiece('border-103-default-top-src', 0, 0, 0, undefined, undefined, 4),
            CompositePiece('border-103-default-center-src', 4, 0, 0, 12),
            CompositePiece('border-103-default-bottom-left-src', undefined, 0, undefined, 0, 4, 12),
            CompositePiece('border-103-default-bottom-center-src', undefined, 4, 4, 0, undefined, 12),
            CompositePiece('border-103-default-bottom-right-src', undefined, undefined, 0, 0, 4, 12),
        ]),
    },
    // `illumina_light_border_raised` / `_input` (104/105): the `background_*` pieces colorize,
    // the `border_*` ring is `colorize="false"` - which is why the ring is an untinted overlay.
    104: {
        layer: NineSlice('border-104-default-src', 7, 7, 7, 7),
        overlay: Composite([
            CompositePiece('border-104-default-border-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-104-default-border-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-104-default-border-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-104-default-border-center-left-src', 4, 0, undefined, 5, 1),
            CompositePiece('border-104-default-border-center-left-src', 4, undefined, 0, 5, 1),
            CompositePiece('border-104-default-border-bottom-left-src', undefined, 0, undefined, 0, 4, 5),
            CompositePiece('border-104-default-border-bottom-center-src', undefined, 4, 4, 0, undefined, 5),
            CompositePiece('border-104-default-border-bottom-right-src', undefined, undefined, 0, 0, 4, 5),
        ]),
    },
    105: {
        layer: NineSlice('border-105-default-src', 5, 5, 5, 5),
        overlay: NineSlice('border-105-default-shine-src', 5, 5, 5, 5),
    },
    // `illumina_light_border_chat_bubble` - every piece `colorize="false"`.
    106: {
        colorize: false,
        layer: Composite([
            CompositePiece('border-106-default-top-left-src', 0, 0, undefined, undefined, 4, 5),
            CompositePiece('border-106-default-top-center-src', 0, 4, 4, undefined, undefined, 5),
            CompositePiece('border-106-default-top-right-src', 0, undefined, 0, undefined, 4, 5),
            CompositePiece('border-106-default-center-src', 5, 0, 0, 7),
            CompositePiece('border-106-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-106-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-106-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
    },
    107: {
        layer: Composite([
            CompositePiece('border-107-default-background-top-left-src', 0, 0, undefined, undefined, 5, 10),
            CompositePiece('border-107-default-background-top-center-src', 0, 5, 5, undefined, undefined, 10),
            CompositePiece('border-107-default-background-top-right-src', 0, undefined, 0, undefined, 5, 10),
            CompositePiece('border-107-default-background-center-left-src', 10, 0, undefined, 5, 1),
            CompositePiece('border-107-default-background-center-center-src', 10, 1, 1, 5),
            CompositePiece('border-107-default-background-center-left-src', 10, undefined, 0, 5, 1),
            CompositePiece('border-107-default-background-bottom-left-src', undefined, 0, undefined, 0, 5, 5),
            CompositePiece('border-107-default-background-bottom-center-src', undefined, 5, 5, 0, undefined, 5),
            CompositePiece('border-107-default-background-bottom-right-src', undefined, undefined, 0, 0, 5, 5),
        ]),
    },
    // `illumina_light_border_infobox` colorizes, with the element description's default `color="0x676767"`.
    108: { layer: NineSlice('border-108-default-src', 3, 3, 3, 3), tintColor: '#676767' },
    // `illumina_dark_border` - every piece `colorize="false"`.
    200: { layer: NineSlice('border-200-default-src', 3, 3, 3, 3), colorize: false },
};

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
    ({ variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, blend, ownGraphicContext, backgroundColor, backgroundAlpha, dynamicRole, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'border', variants: BORDER_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const roleEffect = useDynamicStyleEffect(dynamicRole);
        // The fill is part of the skin buffer, so it blends with it.
        const skin = (
            <>
                {backgroundColor && (
                    <ColorLayer
                        color={backgroundColor}
                        alpha={backgroundAlpha}
                    />
                )}
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </>
        );

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...config.layout, ...layout }}
                {...dynamicStyleBoxProps(roleEffect, ownGraphicContext ? blend : undefined)}
                {...handlers}
            >
                {(blend === undefined || ownGraphicContext)
                    ? skin
                    : (
                            // The skin alone at `blend` (a group alpha - identical to a per-sprite one for
                            // the single-sprite and non-overlapping composite skins). Children stay outside it.
                            <Box
                                layout={FillLayout}
                                alpha={blend}
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
