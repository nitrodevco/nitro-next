import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { usePixiTexture } from './utils/usePixiTexture';

interface NineSliceVariant {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

/**
 * Only the variants used by a migrated view are ported here - see theme/Border.tsx for the
 * full CSS variant table (border-image-slice/width per variant) this mirrors. Add entries
 * as more views migrate.
 */
const BORDER_VARIANTS: Partial<Record<string, NineSliceVariant>> = {
    '1': { textureKey: 'border-1-default-src', leftWidth: 6, topHeight: 6, rightWidth: 6, bottomHeight: 6 },
    '9': { textureKey: 'border-9-default-src', leftWidth: 7, topHeight: 7, rightWidth: 7, bottomHeight: 8 },
};

const BORDER_TINT_COLORS: Partial<Record<string, string>> = {
    '9': '#686661',
};

export interface BorderProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Border: ForwardRefExoticComponent<BorderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BorderProps>(
    ({ variant, defaultVariant, tintColor, layout, children }, ref) => {
        const cascadedVariant = useCascadedVariant('border');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['border']?.[resolvedVariant];
        const resolvedTint = tintColor || BORDER_TINT_COLORS[resolvedVariant];
        const nineSlice = BORDER_VARIANTS[resolvedVariant];
        const texture = usePixiTexture(nineSlice?.textureKey);

        return (
            <Box ref={ref} layout={layout}>
                {(texture && nineSlice) && (
                    <pixiNineSliceSprite
                        texture={texture}
                        leftWidth={nineSlice.leftWidth}
                        topHeight={nineSlice.topHeight}
                        rightWidth={nineSlice.rightWidth}
                        bottomHeight={nineSlice.bottomHeight}
                        tint={resolvedTint}
                        eventMode="none"
                        layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </Box>
        );
    }
);

Border.displayName = 'Border';
