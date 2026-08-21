import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { CloseButton } from './CloseButton';
import { getPixiTextStyle } from './utils/textStyles';
import { usePixiTexture } from './utils/usePixiTexture';

interface HeaderVariant {
    /** Tiled background texture key (theme/Header.tsx's headers repeat via bg-repeat-x). Omit for a plain/transparent header (variant '3' has no header background - the frame's own background shows through). */
    tiledTextureKey?: string;
    tileHeight?: number;
    tint?: string;
    minHeight: number;
    padding: number;
}

/** Only the variants used by a migrated view are ported here - see theme/Header.tsx. */
const HEADER_VARIANTS: Partial<Record<string, HeaderVariant>> = {
    '0': { tiledTextureKey: 'header-0-default-src', tileHeight: 15, tint: '#418db0', minHeight: 15, padding: 6 },
    '3': { minHeight: 33, padding: 6 },
};

export interface HeaderProps {
    variant?: string;
    defaultVariant?: string;
    caption?: string;
    tintColor?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({ variant, defaultVariant, caption, tintColor, layout, onClose, onPointerDown }, ref) => {
        const cascadedVariant = useCascadedVariant('header');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['header']?.[resolvedVariant];
        const config = HEADER_VARIANTS[resolvedVariant] ?? HEADER_VARIANTS['0'];
        const resolvedTint = tintColor || config?.tint;
        const tileTexture = usePixiTexture(config?.tiledTextureKey);

        return (
            <Box
                ref={ref}
                eventMode="static"
                cursor="grab"
                onPointerDown={onPointerDown}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: config?.minHeight ?? 15,
                    padding: config?.padding ?? 6,
                    ...layout,
                }}
            >
                {(tileTexture && config?.tiledTextureKey) && (
                    <pixiTilingSprite
                        texture={tileTexture}
                        tint={resolvedTint}
                        eventMode="none"
                        layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    <Box layout={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {caption && <pixiText layout={{}} text={caption} style={getPixiTextStyle('text-style-u-bold', { fill: '#ffffff' })} />}
                    </Box>
                    <CloseButton onClose={onClose} />
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Header.displayName = 'Header';
