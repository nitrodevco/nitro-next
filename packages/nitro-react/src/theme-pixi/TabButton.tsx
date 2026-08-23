import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';

type TabButtonVariant = ThemeWithStatesVariant;

const TAB_BUTTON_VARIANTS: ThemeVariants<TabButtonVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 0),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 0),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 0),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#000000',
    },
    // black
    1: {
        states: {
            default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 0),
            hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 0),
            selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 0),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#ffffff',
    },
    // white - reuses variant '0's art wholesale
    2: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 0),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 0),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 0),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#000000',
    },
    // shiny/pill
    3: {
        states: {
            default: NineSlice('tabbutton-3-default-src', 9, 0, 9, 0),
            hovering: NineSlice('tabbutton-3-hovering-src', 9, 0, 9, 0),
            selected: NineSlice('tabbutton-3-selected-src', 9, 0, 9, 0),
        },
        layout: {
            paddingLeft: 10, paddingTop: 0, paddingRight: 10, paddingBottom: 0,
            minHeight: 32, maxHeight: 32,
        },
        textStyle: 'text-style-button-shiny-regular',
        textColor: '#000000',
    },
};

export interface TabButtonProps extends ThemeProps<TabButtonVariant> {
    selected?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export const TabButton: ForwardRefExoticComponent<TabButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabButtonProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, selected, onPress, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabButton', variants: TAB_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled: false, selected,
        });

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
                cursor="pointer"
                onPointerTap={onPress}
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

TabButton.displayName = 'TabButton';
