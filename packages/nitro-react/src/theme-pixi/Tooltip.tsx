import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { Text } from './Text';
import { NineSliceLayer } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * Static-skinning port of theme/Tooltip.tsx - single variant, no tint/overlay/interactivity
 * anywhere in DOM (the simplest component in the whole package). Note DOM's class string is
 * `text-[#000000] text-style-u-tool-tip` - since `text-style-u-tool-tip` itself bakes in
 * `text-white` (see theme/utilities.css) and is the LATER class in cascade order, the tooltip
 * actually renders WHITE text in the browser despite the explicit black hex earlier in the
 * string. Reproduced here by using the text style's own baked-in color (already `#ffffff` in
 * utils/textStyles.ts's registry) rather than the literal `#000000`, matching real DOM output.
 */
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
