/**
 * The parts a scrollbar is built from. Each Flash window type (`scrollbar_slider_button_up`,
 * `scrollbar_slider_track_vertical`, ...) is its own theme component with its own variants, but the
 * two orientations and four arrows draw the same way - so each kind is made here once and bound to
 * its cascade key in its own module.
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks/useThemeVariant';
import { BackgroundLayer } from './layer/BackgroundLayer';
import { ThemeImage } from './ThemeImage';
import { expandSides } from './utils/expandSides';
import { ThemeProps, ThemeWithStatesVariant } from './utils/ThemeVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

export interface ScrollbarPartProps extends ThemeProps<ThemeWithStatesVariant> {
    /** The scrollbar is disabled (its content fits): the part draws its `disabled` art and takes no input. */
    disabled?: boolean;
}

export interface ScrollbarTrackProps extends ScrollbarPartProps {
    children?: ReactNode;
}

type ScrollbarPart<P> = ForwardRefExoticComponent<P & RefAttributes<PixiContainer>>;

/**
 * An arrow button: the state's sprite, sized by its art. The press-and-hold repeat lives in the
 * scrollbar's `useHoldToRepeat`, spread in as the pointer handlers.
 */
export const createScrollbarButton = (displayName: string, cascadeKey: string): ScrollbarPart<ScrollbarPartProps> => {
    const Component = forwardRef<PixiContainer, ScrollbarPartProps>(
        ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
            const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant<ThemeWithStatesVariant>({
                cascadeKey, variant, defaultVariant, tooltip, tooltipDelay, tintColor, disabled,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });

            if (resolvedLayer?.kind !== 'sprite') return null;

            return (
                <ThemeImage
                    ref={ref}
                    textureKey={resolvedLayer.textureKey}
                    tint={resolvedTint}
                    {...handlers}
                    layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                />
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};

/** The clickable track the lift runs along; the lift is its child. */
export const createScrollbarTrack = (displayName: string, cascadeKey: string): ScrollbarPart<ScrollbarTrackProps> => {
    const Component = forwardRef<PixiContainer, ScrollbarTrackProps>(
        ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, disabled, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
            const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<ThemeWithStatesVariant>({
                cascadeKey, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });

            return (
                <Box
                    ref={ref}
                    layout={{ flex: 1, ...config.layout, ...layout }}
                    {...handlers}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    <BackgroundLayer layer={resolvedOverlay} />
                    <VariantCascadeProvider map={ownCascade}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};

/** The lift (thumb): positioned and sized by the scrollbar inside its track, its grip an overlay strip. */
export const createScrollbarLift = (displayName: string, cascadeKey: string): ScrollbarPart<ScrollbarPartProps> => {
    const Component = forwardRef<PixiContainer, ScrollbarPartProps>(
        ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
            const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<ThemeWithStatesVariant>({
                cascadeKey, variant, defaultVariant, tooltip, tooltipDelay, tintColor, disabled,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });

            return (
                <Box
                    ref={ref}
                    layout={{ position: 'absolute', ...config.layout, ...layout }}
                    {...handlers}
                    cursor={disabled ? 'default' : (state === 'pressed' ? 'grabbing' : 'grab')}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    <BackgroundLayer layer={resolvedOverlay} />
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};
