import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { CloseButton } from './CloseButton';
import { BackgroundLayer, type BackgroundLayerConfig, ColorLayer, TileLayer } from './utils/Layer';
import { FONT_AA_DROP_SHADOW, getPixiTextStyle, type TextStyleKey } from './utils/textStyles';
import { useResolvedVariant } from './utils/useResolvedVariant';

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
    background?: BackgroundLayerConfig;
    /** DOM's `headerTintableVars` has no entry for '200' - its nine-slice border is the one
     *  background that never tints, even with a caller-supplied `tintColor` (matching
     *  Button.tsx's own `tintable: false` pattern for the same kind of DOM omission). */
    tintable?: boolean;
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
    '200': { background: { kind: 'nineSlice', textureKey: 'border-200-default-src', leftWidth: 3, topHeight: 3, rightWidth: 3, bottomHeight: 3 }, tintable: false, minHeight: 30, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyleKey: 'text-style-u-frame-title', textColor: '#ffffff' },
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
        const { resolvedVariant, ownCascade } = useResolvedVariant('header', variant, defaultVariant);
        const config = HEADER_VARIANTS[resolvedVariant] ?? HEADER_VARIANTS['0'];
        // DOM's `resolvedTint` (the caption/close-button chip's inline backgroundColor) and its
        // separate CSS-var-driven background tinting (gated by `headerTintableVars`, absent for
        // '200') are two independent mechanisms - the chip always uses the raw tint, only the
        // background art respects `tintable`.
        const resolvedTint = tintColor || config.tint;
        const resolvedBackgroundTint = config.tintable === false ? undefined : resolvedTint;

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
                <BackgroundLayer layer={config.background} tint={resolvedBackgroundTint} />
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
                                    <ColorLayer color={resolvedTint} />
                                    <pixiText
                                        layout={{}}
                                        text={caption}
                                        style={getPixiTextStyle(config.textStyleKey, { fill: config.textColor, dropShadow: config.fontAA ? FONT_AA_DROP_SHADOW : undefined })}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box layout={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <ColorLayer color={resolvedTint} />
                            <CloseButton onClose={onClose} />
                        </Box>
                    </VariantCascadeProvider>
                </Box>
            </Box>
        );
    }
);

Header.displayName = 'Header';
