import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type DroplistItemVariant = ThemeWithStatesVariant;

export interface DroplistItemProps extends ThemeProps<DroplistItemVariant> {
    selected?: boolean;
    children?: ReactNode;
}

/** Flash's `DropListItemController` (`droplist_item`): the state's skin behind its caption. */
export const DroplistItem: ForwardRefExoticComponent<DroplistItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistItemProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<DroplistItemVariant>({
            cascadeKey: 'droplistItem', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                {...handlers}
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

DroplistItem.displayName = 'DroplistItem';
