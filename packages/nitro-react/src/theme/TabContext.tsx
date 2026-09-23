import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type TabContextVariant = ThemeVariant;

/**
 * `TabContext` variants. The padding is the `tab_selector` of the context's window layout - where
 * its buttons start, and how far they reach: `habbo_window_layout_tab_context`'s selector is
 * `x="6" y="0" width="88"` of a 100 wide layout (6 in from either side, flush with the top) and
 * `_3`'s is `x="8" y="0" width="48"` of 64. Neither has a top inset: the selector is the full
 * button height (21 and 32) and overhangs the `tab_content` under it, which starts at y 20 / 30.
 */
const TAB_CONTEXT_VARIANTS: ThemeVariants<TabContextVariant> = {
    0: { layout: { minHeight: 22, maxHeight: 22, paddingLeft: 6, paddingRight: 6 } },
    3: { layout: { paddingLeft: 8, paddingRight: 8 } },
};

export interface TabContextProps extends ThemeProps<TabContextVariant> {
    children?: ReactNode;
}

export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabContext', variants: TAB_CONTEXT_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                zIndex={10}
                layout={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: 0,
                    // It crops its buttons, as a window does: a style 3 tab button is 32 tall in a
                    // strip the layouts declare 30 (`catalog_ubuntu_with_tabs`, `navigator_frame_2`),
                    // and uncropped those 2px reach past the strip - over the top of the catalog's
                    // header image, which the context's own zIndex then draws them above.
                    overflow: 'hidden',
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
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}</VariantCascadeProvider>
            </Box>
        );
    },
);

TabContext.displayName = 'TabContext';
