import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';

type TabButtonVariant = ThemeWithStatesVariant;

// Variants 0/1's bottomHeight is 2, not 0 - the legacy DOM port (theme/TabButton.tsx, deleted)
// sliced these at `border-image-slice: 5 5 2 5 fill`. Both `tabbutton-0-*`/`tabbutton-1-*`
// textures have two fully-transparent padding rows at the very bottom (confirmed by inspecting
// the PNGs directly) - with bottomHeight dropped to 0 during the Pixi port, the nine-slice's
// stretched "fill" region extended all the way into those transparent rows instead of stopping
// short of them, so the stretched middle faded to transparent right at the button's bottom edge
// instead of cutting off crisply.
const TAB_BUTTON_VARIANTS: ThemeVariants<TabButtonVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2),
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
            default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 2),
            hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 2),
            selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 2),
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
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2),
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
