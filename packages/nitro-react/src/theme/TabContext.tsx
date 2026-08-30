import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { TAB_CONTEXT_VARIANTS, TabContextVariant } from './variants/tabContext';

export interface TabContextProps extends ThemeProps<TabContextVariant> {
    children?: ReactNode;
}

export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabContext', variants: TAB_CONTEXT_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 4,
                    ...config.layout,
                    ...layout,
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
