import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BackgroundLayer } from './layer';
import { useResolvedVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type TabContextVariant = ThemeVariant;

const TAB_CONTEXT_VARIANTS: ThemeVariants<TabContextVariant> = {
    '0': { layout: { minHeight: 22, maxHeight: 22 } },
    '3': {},
};

export interface TabContextProps extends ThemeProps<TabContextVariant> {
    children?: ReactNode;
}

export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, layout, tintColor, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabContext', variant, defaultVariant);
        const config = TAB_CONTEXT_VARIANTS[resolvedVariant] ?? TAB_CONTEXT_VARIANTS['0'];
        const resolvedTint = tintColor || config.tintColor;

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
                <BackgroundLayer layer={config.layer} tintColor={resolvedTint} />
                <BackgroundLayer layer={config.overlay} />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

TabContext.displayName = 'TabContext';
