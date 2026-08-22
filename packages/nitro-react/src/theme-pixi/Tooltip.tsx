import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer } from './layer';
import { Text } from './Text';
import { useResolvedVariant, wrapTextChildren } from './utils';

export interface TooltipProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Tooltip: ForwardRefExoticComponent<TooltipProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TooltipProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { ownCascade } = useResolvedVariant('tooltip', variant, defaultVariant);

        return (
            <Box ref={ref} layout={{ minWidth: 20, minHeight: 22, paddingLeft: 6, paddingRight: 6, ...layout }}>
                <NineSliceLayer textureKey="tooltip-0-default-src" leftWidth={6} topHeight={6} rightWidth={6} bottomHeight={6} />
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle="text-style-u-tool-tip" />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Tooltip.displayName = 'Tooltip';
