import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * Per-variant layout on top of the always-on base (flex column, full size, overflow
 * hidden, z-index 20 - theme/ContentArea.tsx's `flex flex-col size-full overflow-hidden
 * z-20`). '0' adds a 3px bottom padding (`pb-0.75`); '3' makes the box a positioning
 * context for absolutely-positioned children (`relative`) - previously both variants
 * resolved identically here since the render ignored `variant` entirely.
 */
const CONTENT_AREA_VARIANTS: Record<string, BoxLayout> = {
    '0': { paddingBottom: 3 },
    '3': { position: 'relative' },
};

export interface ContentAreaProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('contentArea', variant, defaultVariant);

        return (
            <Box
                ref={ref}
                zIndex={20}
                layout={{
                    flexDirection: 'column',
                    width: '100%',
                    flex: 1,
                    overflow: 'hidden',
                    ...CONTENT_AREA_VARIANTS[resolvedVariant],
                    ...layout,
                }}
            >
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

ContentArea.displayName = 'ContentArea';
