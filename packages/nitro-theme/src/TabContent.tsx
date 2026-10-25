import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, TabContentVariant, ThemeProps, wrapTextChildren } from './utils';

export type { TabContentVariant };

export interface TabContentProps extends ThemeProps<TabContentVariant> {
    children?: ReactNode;
}

/** `tab_content` (a `ContainerController`): the panel under a tab strip, its skin behind the selected tab's content, which it crops. */
export const TabContent: ForwardRefExoticComponent<TabContentProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContentProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<TabContentVariant>({
            cascadeKey: 'tabContent', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    height: '100%',
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
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

TabContent.displayName = 'TabContent';
