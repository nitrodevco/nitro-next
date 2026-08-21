import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { wrapTextChildren } from './utils/wrapTextChildren';

export interface ContentAreaProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const cascadedVariant = useCascadedVariant('contentArea');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['contentArea']?.[resolvedVariant];

        return (
            <Box ref={ref} layout={{ flexDirection: 'column', width: '100%', flex: 1, overflow: 'hidden', ...layout }}>
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

ContentArea.displayName = 'ContentArea';
