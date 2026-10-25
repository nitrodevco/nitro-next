import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, wrapTextChildren } from './utils';

/** `ContentArea` variants - the Flash `style` ids it draws. */
export type ContentAreaVariant = ThemeVariant;

export interface ContentAreaProps extends ThemeProps<ContentAreaVariant> {
    /** How far above its own box its children are still drawn - the frame's top margin; see `Box`. */
    clipOutset?: readonly [ number, number, number, number ];
    children?: ReactNode;
}

/**
 * A frame's `_CONTENT` container: its skin, if its variant has one, and the frame's children,
 * cropped at the frame's rectangle rather than at its own (see `clipOutset`) and never a mouse
 * target of its own.
 */
export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, clipOutset, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<ContentAreaVariant>({
            cascadeKey: 'contentArea', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
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
