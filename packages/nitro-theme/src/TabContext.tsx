import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, wrapTextChildren } from './utils';

export type TabContextVariant = ThemeVariant;

export interface TabContextProps extends ThemeProps<TabContextVariant> {
    children?: ReactNode;
}

/** Flash's `TabContextController` (`tab_context`): the strip of tab buttons, in a row it crops. */
export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<TabContextVariant>({
            cascadeKey: 'tabContext', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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
