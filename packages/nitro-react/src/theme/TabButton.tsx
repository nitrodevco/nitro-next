import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type TabButtonVariant = ThemeWithStatesVariant;

// Variants 0/1's bottomHeight is 2, not 0 - the legacy DOM port (theme/TabButton.tsx, deleted)
// sliced these at `border-image-slice: 5 5 2 5 fill` / `border-image-width: 5px 5px 0px 5px`.
// Both `tabbutton-0-*`/`tabbutton-1-*` textures have two fully-transparent padding rows at the
// very bottom (confirmed by inspecting the PNGs directly): the nonzero slice trims those rows
// out of the nine-slice's stretched "fill" region (so the fill doesn't fade to transparent
// right at the button's bottom edge, the bug bottomHeight:0 caused), while the zero
// `borderWidth.bottom` override means that trimmed band is never itself drawn as a visible
// border strip - DOM-only, see BackgroundLayerConfig.ts's `NineSliceBorderWidth` docblock for
// why Pixi can't replicate the same slice-without-a-visible-band trick.
const TRIM_BOTTOM_BORDER = { bottom: 0 };

const TAB_BUTTON_VARIANTS: ThemeVariants<TabButtonVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
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
            default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
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
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
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
