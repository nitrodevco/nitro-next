import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type TabButtonVariant = ThemeWithStatesVariant;

const TRIM_BOTTOM_BORDER = { bottom: 0 };

const TAB_BUTTON_VARIANTS: ThemeVariants<TabButtonVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            pressed: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'button_tab',
        textColor: '#000000',
    },
    // black
    1: {
        states: {
            default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            pressed: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'button_tab',
        textColor: '#ffffff',
    },
    // white - reuses variant '0's art wholesale
    2: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            pressed: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'button_tab',
        textColor: '#000000',
    },
    /*
     * shiny/pill - `habbo_skin_button_tab_3_xml`. Its `button_tab_3` skin layout scales every
     * entity `vertical="fixed"`: the 32px art is copied at the top at its own height, however tall
     * the window is (`SKIN_HEIGHT`), so a 34px layout tab (the navigator's) or a 46px one (the
     * avatar editor's) keeps its height with 2 / 14 bare pixels under the art. The `title` label
     * of `habbo_window_layout_tab_button_3_xml` sizes itself to its text plus its 10/6/10/4
     * margins (`TextLabelController.refresh`) and is centred both ways
     * (`relative_*_scale_center`), which is this padding around centred content.
     */
    3: {
        states: {
            default: NineSlice('tabbutton-3-default-src', 9, 0, 9, 0),
            hovering: NineSlice('tabbutton-3-hovering-src', 9, 0, 9, 0),
            pressed: NineSlice('tabbutton-3-selected-src', 9, 0, 9, 0),
            selected: NineSlice('tabbutton-3-selected-src', 9, 0, 9, 0),
        },
        layout: {
            paddingLeft: 10, paddingTop: 0, paddingRight: 10, paddingBottom: 0,
            minHeight: 32, maxHeight: 32,
        },
        textStyle: 'button_shiny_regular',
        textColor: '#000000',
    },
};

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

export const TabButton: ForwardRefExoticComponent<TabButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { resolvedVariant, ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabButton', variants: TAB_BUTTON_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled: false, selected,
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
