import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type DroplistItemVariant = ThemeWithStatesVariant;

const DROPLIST_ITEM_VARIANTS: ThemeVariants<DroplistItemVariant> = {
    0: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-0-hovering-src'),
            selected: Stretch('dropmenuitem-0-selected-src'),
        },
        layout: {
            minWidth: 5,
            minHeight: 19,
        },
    },
};

export interface DroplistItemProps extends ThemeProps<DroplistItemVariant> {
    selected?: boolean;
    children?: ReactNode;
}

export const DroplistItem: ForwardRefExoticComponent<DroplistItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistItemProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'droplistItem', variants: DROPLIST_ITEM_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
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
