import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { CloseButton } from './CloseButton';
import { NineSliceLayer, SpriteLayer, TileLayer } from './utils/Layer';
import { FONT_AA_DROP_SHADOW, getPixiTextStyle, type TextStyleKey } from './utils/textStyles';

interface HeaderPadding {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

interface HeaderVariant {
    /** Blue/black/yellow (0/1/2) tile a 6x15 strip via `bg-repeat-x`; light (4) stretches
     *  one texture to fill (`bg-size-[100%_100%]`); default/bubble/il (3/7/100) have no
     *  background image at all; default (200) is a nine-slice border. */
    background?: { kind: 'tile' | 'stretch', textureKey: string } | { kind: 'nineSlice', textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number };
    /** '0'/'1'/'2' share one shine tile overlay; everything else has none. */
    overlayTextureKey?: string;
    minHeight: number;
    /** theme/Header.tsx's real `m-1.5` (0/2) vs `p-1.5` (1) inconsistency: margin leaves a
     *  6px transparent gap around the header (background doesn't extend under margin),
     *  padding instead insets only the content row while the background bleeds to the
     *  full box. Preserved as-is rather than "fixed" to a single consistent behavior. */
    margin?: number;
    padding: HeaderPadding;
    textStyleKey: TextStyleKey;
    textColor: string;
    fontAA?: boolean;
    tint?: string;
}

const HEADER_VARIANTS: Record<string, HeaderVariant> = {
    '0': { background: { kind: 'tile', textureKey: 'header-0-default-src' }, overlayTextureKey: 'header-0-default-shine-src', minHeight: 15, margin: 6, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyleKey: 'text-style-frame-title', textColor: '#ffffff', fontAA: true, tint: '#418db0' },
    '1': { background: { kind: 'tile', textureKey: 'header-0-default-src' }, overlayTextureKey: 'header-0-default-shine-src', minHeight: 15, padding: { left: 6, top: 6, right: 6, bottom: 6 }, textStyleKey: 'text-style-frame-title', textColor: '#ffffff', fontAA: true, tint: '#4c4c4c' },
    '2': { background: { kind: 'tile', textureKey: 'header-0-default-src' }, overlayTextureKey: 'header-0-default-shine-src', minHeight: 15, margin: 6, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyleKey: 'text-style-frame-title', textColor: '#000000', fontAA: true, tint: '#fac200' },
    '3': { minHeight: 33, padding: { left: 6, top: 0, right: 6, bottom: 0 }, textStyleKey: 'text-style-u-frame-title', textColor: '#ffffff' },
    '4': { background: { kind: 'stretch', textureKey: 'header-3-default-src' }, minHeight: 20, padding: { left: 8, top: 1, right: 8, bottom: 1 }, textStyleKey: 'text-style-u-frame-title', textColor: '#ffffff' },
    '7': { minHeight: 33, padding: { left: 8, top: 4, right: 8, bottom: 4 }, textStyleKey: 'text-style-u-frame-title', textColor: '#000000' },
    '100': { minHeight: 30, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyleKey: 'text-style-il-frame-title', textColor: '#000000' },
    '200': { background: { kind: 'nineSlice', textureKey: 'border-200-default-src', leftWidth: 3, topHeight: 3, rightWidth: 3, bottomHeight: 3 }, minHeight: 30, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyleKey: 'text-style-u-frame-title', textColor: '#ffffff' },
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

/** A solid-color chip behind the caption/close-button, matching resolvedTint - theme/
 *  Header.tsx paints the same `backgroundColor: resolvedTint` behind both, masking the
 *  tiled/shine background immediately behind them. */
const TintChip = ({ color }: { color: string | undefined }) => {
    if (!color) return null;

    return <pixiGraphics eventMode="none" layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} draw={g => { g.clear(); g.rect(0, 0, 1, 1).fill(color); }} />;
};

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({ variant, defaultVariant, caption, tintColor, layout, onClose, onPointerDown }, ref) => {
        const cascadedVariant = useCascadedVariant('header');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['header']?.[resolvedVariant];
        const config = HEADER_VARIANTS[resolvedVariant] ?? HEADER_VARIANTS['0'];
        const resolvedTint = tintColor || config.tint;

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
                    minHeight: config.minHeight,
                    margin: config.margin,
                    ...layout,
                }}
            >
                {config.background?.kind === 'tile' && <TileLayer textureKey={config.background.textureKey} tint={resolvedTint} />}
                {config.background?.kind === 'stretch' && <SpriteLayer textureKey={config.background.textureKey} tint={resolvedTint} />}
                {config.background?.kind === 'nineSlice' && <NineSliceLayer textureKey={config.background.textureKey} leftWidth={config.background.leftWidth} topHeight={config.background.topHeight} rightWidth={config.background.rightWidth} bottomHeight={config.background.bottomHeight} />}
                {config.overlayTextureKey && <TileLayer textureKey={config.overlayTextureKey} />}
                <Box
                    layout={{
                        position: 'relative',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        paddingLeft: config.padding.left,
                        paddingTop: config.padding.top,
                        paddingRight: config.padding.right,
                        paddingBottom: config.padding.bottom,
                    }}
                >
                    <VariantCascadeProvider map={ownCascade}>
                        <Box layout={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {caption && (
                                <Box layout={{ position: 'relative', paddingLeft: 8, paddingRight: 8 }}>
                                    <TintChip color={resolvedTint} />
                                    <pixiText
                                        layout={{}}
                                        text={caption}
                                        style={getPixiTextStyle(config.textStyleKey, { fill: config.textColor, dropShadow: config.fontAA ? FONT_AA_DROP_SHADOW : undefined })}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box layout={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TintChip color={resolvedTint} />
                            <CloseButton onClose={onClose} />
                        </Box>
                    </VariantCascadeProvider>
                </Box>
            </Box>
        );
    }
);

Header.displayName = 'Header';
