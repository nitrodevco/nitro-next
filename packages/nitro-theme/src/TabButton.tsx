import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type TabButtonVariant = ThemeWithStatesVariant;

/**
 * The height a variant's skin is drawn at when its skin layout scales it `vertical="fixed"` -
 * pinned to the top at that height rather than stretched over the button.
 */
const SKIN_HEIGHT: Readonly<Record<string, number>> = {
    3: 32,
};

export interface TabButtonProps extends ThemeProps<TabButtonVariant> {
    selected?: boolean;
    children?: ReactNode;
}

/** Flash's `TabButtonController` (`tab_button`): the state's skin behind its caption, selected or not. */
export const TabButton: ForwardRefExoticComponent<TabButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { resolvedVariant, ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<TabButtonVariant>({
            cascadeKey: 'tabButton', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled: false, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const skinHeight = SKIN_HEIGHT[resolvedVariant];
        const skinLayout: BoxLayout | undefined = (skinHeight === undefined) ? undefined : { position: 'absolute', left: 0, top: 0, width: '100%', height: skinHeight };

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
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
                        layout={skinLayout}
                    />
                )}
                {resolvedOverlay && (
                    <BackgroundLayer
                        layer={resolvedOverlay}
                        layout={skinLayout}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

TabButton.displayName = 'TabButton';
