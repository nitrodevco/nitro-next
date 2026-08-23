import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { ThemeProps, ThemeVariant, ThemeVariants, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';

type TabContextVariant = ThemeVariant;

const TAB_CONTEXT_VARIANTS: ThemeVariants<TabContextVariant> = {
    0: { layout: { minHeight: 22, maxHeight: 22 } },
    3: {},
};

export interface TabContextProps extends ThemeProps<TabContextVariant> {
    children?: ReactNode;
}

export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabContext', variants: TAB_CONTEXT_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                zIndex={20}
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
