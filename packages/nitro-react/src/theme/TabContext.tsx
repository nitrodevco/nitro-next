import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

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
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
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
