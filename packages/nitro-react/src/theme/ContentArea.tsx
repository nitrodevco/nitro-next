import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

/** `ContentArea` variants - the Flash `style` ids it draws. */
export type ContentAreaVariant = ThemeVariant;

/**
 * Where the frame's `_CONTENT` container sits, as margins on the content box - `left`, `right` and
 * `bottom` are the insets its window layout gives it, and `top` is what is left between it and the
 * header, which is a flow sibling here rather than a window at its own `y`.
 *
 * This is the fallback for a frame that states no `margins` of its own; one that does places the
 * content itself (`Frame`'s `marginsLayout`), which is what a layout port passes.
 */
const contentAreaVariant = (left: number, top: number, right: number, bottom: number): ContentAreaVariant => ({
    layout: { marginLeft: left, marginTop: top, marginRight: right, marginBottom: bottom },
});

const CONTENT_AREA_VARIANTS: ThemeVariants<ContentAreaVariant> = {
    // `habbo_window_layout_frame` (40x40): content at (6, 25) 28x8, under a titlebar ending at 21.
    0: contentAreaVariant(6, 4, 6, 7),
    // `habbo_window_layout_frame_3` (64x64): content at (3, 36) 58x25, under a titlebar ending at 33.
    3: contentAreaVariant(3, 3, 3, 3),
    // `habbo_window_layout_frame_7` (64x73): the same content rect in a taller template.
    7: contentAreaVariant(3, 3, 3, 12),
    // the illumina frames (50x50): content at (1, 30) 48x19, flush under their 30px title bar.
    100: contentAreaVariant(1, 0, 1, 1),
    /*
     * `illumina_light_frame_modal` (50x80): content at (1, 70) 48x19, flush under the 70px band and
     * bar. Its bottom inset is the one the template does not give - the content area runs 9 past
     * the layout's own height - so it keeps the 1 its siblings have.
     */
    101: contentAreaVariant(1, 0, 1, 1),
    // `habbo_window_layout_frame_leaderboard` (193x130): content at (10, 52) 173x69, under a 40px header.
    10000: contentAreaVariant(10, 12, 10, 9),
};

export interface ContentAreaProps extends ThemeProps<ContentAreaVariant> {
    /** How far above its own box its children are still drawn - the frame's top margin; see `Box`. */
    clipOutset?: readonly [ number, number, number, number ];
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, clipOutset, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'contentArea', variants: CONTENT_AREA_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                // `_CONTENT` carries no `input_event_processor` in any frame's window layout, so
                // it is never a mouse target: a press over it reaches the window beneath, which
                // for a frame with a zero top margin is the header that drags the window.
                pointerTransparent
                clipOutset={clipOutset}
                zIndex={20}
                /*
                 * Its children are cropped by the frame's rectangle, not by this box - `clipOutset`
                 * is the frame's margins, so they may reach exactly as far as its own edges and no
                 * further. `_CONTENT` owns no buffer to crop with (`use_parent_graphic_context`,
                 * drawing into the frame's), which is how a layout can place a window's top band at
                 * a negative `x` and `y` and have the client draw it whole.
                 *
                 * Measured, not derived, and the measurement that settles it is narrow: the
                 * navigator's `white_background` (`x="-2" y="-5"`) covers the frame's two edge
                 * columns on each side at the rows just under the title bar, where the frame's own
                 * art is still the tinted top slice - blue, then its dark line. Only content can
                 * put white there. Lower down both the band and the frame's `center_left` are
                 * white, so those rows prove nothing either way; this pair of rows is the evidence.
                 *
                 * Cropping at this box instead leaves that dark line showing at the sides and cuts
                 * the tabs' tops; leaving it uncropped lets the room settings' `tab_context` at
                 * `x="-6"` hang outside the window. Both were tried.
                 */
                layout={{
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ContentArea.displayName = 'ContentArea';
