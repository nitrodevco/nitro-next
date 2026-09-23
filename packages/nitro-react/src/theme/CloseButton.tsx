import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type CloseButtonVariant = ThemeWithStatesVariant;

const LEADERBOARD_CLOSE_BUTTON: CloseButtonVariant = {
    states: {
        default: Stretch('closebutton-10000-default-src'),
        hovering: Stretch('closebutton-10000-hovering-src'),
        pressed: Stretch('closebutton-10000-pressed-src'),
    },
};

/** `CloseButton` variants - the `type="closebutton"` rows of `habbo_element_description_xml`, keyed by their `style`. */
const CLOSE_BUTTON_VARIANTS: ThemeVariants<CloseButtonVariant> = {
    0: {
        states: {
            default: Stretch('closebutton-0-default-src'),
            hovering: Stretch('closebutton-0-hovering-src'),
            pressed: Stretch('closebutton-0-pressed-src'),
        },
    },
    // `habbo_skin_button_close_black` draws its default, active and pressed states from one rect.
    1: {
        states: {
            default: Stretch('closebutton-1-default-src'),
            hovering: Stretch('closebutton-1-default-src'),
            pressed: Stretch('closebutton-1-default-src'),
        },
    },
    // ...as does `habbo_skin_button_close_white`.
    2: {
        states: {
            default: Stretch('closebutton-2-default-src'),
            hovering: Stretch('closebutton-2-default-src'),
            pressed: Stretch('closebutton-2-default-src'),
        },
    },
    3: {
        states: {
            default: Stretch('closebutton-3-default-src'),
            hovering: Stretch('closebutton-3-hovering-src'),
            pressed: Stretch('closebutton-3-pressed-src'),
        },
    },
    // `habbo_skin_button_help_3` - the ubuntu frames' "?" button
    4: {
        states: {
            default: Stretch('closebutton-4-default-src'),
            hovering: Stretch('closebutton-4-hovering-src'),
            pressed: Stretch('closebutton-4-pressed-src'),
        },
    },
    // habbo_skin "menu" (button_menu) - the hamburger-style frame button
    5: {
        states: {
            default: Stretch('closebutton-5-default-src'),
            hovering: Stretch('closebutton-5-hovering-src'),
            pressed: Stretch('closebutton-5-pressed-src'),
        },
    },
    // illumina frame "close" button
    100: {
        states: {
            default: Stretch('closebutton-100-default-src'),
            hovering: Stretch('closebutton-100-hovering-src'),
            pressed: Stretch('closebutton-100-pressed-src'),
        },
    },
    // illumina frame "menu" button
    101: {
        states: {
            default: Stretch('closebutton-101-default-src'),
            hovering: Stretch('closebutton-101-hovering-src'),
            pressed: Stretch('closebutton-101-pressed-src'),
        },
    },
    // illumina frame "minimize" button
    102: {
        states: {
            default: Stretch('closebutton-102-default-src'),
            hovering: Stretch('closebutton-102-hovering-src'),
            pressed: Stretch('closebutton-102-pressed-src'),
        },
    },
    // illumina purple frame close
    103: {
        states: {
            default: Stretch('closebutton-103-default-src'),
            hovering: Stretch('closebutton-103-hovering-src'),
            pressed: Stretch('closebutton-103-pressed-src'),
        },
    },
    // leaderboard frames: 10000-10007 are one skin (`habbo_skin_button_close_leaderboard`)
    10000: LEADERBOARD_CLOSE_BUTTON,
    10001: LEADERBOARD_CLOSE_BUTTON,
    10002: LEADERBOARD_CLOSE_BUTTON,
    10003: LEADERBOARD_CLOSE_BUTTON,
    10004: LEADERBOARD_CLOSE_BUTTON,
    10005: LEADERBOARD_CLOSE_BUTTON,
    10006: LEADERBOARD_CLOSE_BUTTON,
    10007: LEADERBOARD_CLOSE_BUTTON,
};

export type CloseButtonProps = ThemeProps<CloseButtonVariant>;

export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'closeButton', variants: CLOSE_BUTTON_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, stopsPropagation: true, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // A plain sprite skin with nothing layered over it is the sprite itself - one node, no Box.
        if (resolvedLayer?.kind === 'sprite' && !resolvedOverlay) {
            return (
                <ThemeImage
                    ref={ref}
                    textureKey={resolvedLayer.textureKey}
                    frame={resolvedLayer.frame}
                    tint={resolvedTint}
                    stretch
                    visible={visible}
                    {...handlers}
                    layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                />
            );
        }

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </Box>
        );
    },
);

CloseButton.displayName = 'CloseButton';
