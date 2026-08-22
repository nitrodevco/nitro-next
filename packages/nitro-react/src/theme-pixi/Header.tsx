import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { CloseButton } from './CloseButton';
import { BackgroundLayer, ColorLayer } from './layer';
import { Text } from './Text';
import { useThemeVariant } from './utils/useThemeVariant';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

interface HeaderPadding {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

type HeaderVariant = ThemeVariant & {
    tintable?: boolean;
    minHeight: number;
    margin?: number;
    padding: HeaderPadding;
};

const HEADER_VARIANTS: ThemeVariants<HeaderVariant> = {
    '0': { layer: { kind: 'tile', textureKey: 'header-0-default-src' }, overlay: { kind: 'tile', textureKey: 'header-0-default-shine-src' }, minHeight: 15, margin: 6, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyle: 'text-style-frame-title', textColor: '#ffffff', tintColor: '#418db0' },
    '1': { layer: { kind: 'tile', textureKey: 'header-0-default-src' }, overlay: { kind: 'tile', textureKey: 'header-0-default-shine-src' }, minHeight: 15, padding: { left: 6, top: 6, right: 6, bottom: 6 }, textStyle: 'text-style-frame-title', textColor: '#ffffff', tintColor: '#4c4c4c' },
    '2': { layer: { kind: 'tile', textureKey: 'header-0-default-src' }, overlay: { kind: 'tile', textureKey: 'header-0-default-shine-src' }, minHeight: 15, margin: 6, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyle: 'text-style-frame-title', textColor: '#000000', tintColor: '#fac200' },
    '3': { minHeight: 33, padding: { left: 6, top: 0, right: 6, bottom: 0 }, textStyle: 'text-style-u-frame-title', textColor: '#ffffff' },
    '4': { layer: { kind: 'stretch', textureKey: 'header-3-default-src' }, minHeight: 20, padding: { left: 8, top: 1, right: 8, bottom: 1 }, textStyle: 'text-style-u-frame-title', textColor: '#ffffff' },
    '7': { minHeight: 33, padding: { left: 8, top: 4, right: 8, bottom: 4 }, textStyle: 'text-style-u-frame-title', textColor: '#000000' },
    '100': { minHeight: 30, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyle: 'text-style-il-frame-title', textColor: '#000000' },
    '200': { layer: { kind: 'nineSlice', textureKey: 'border-200-default-src', leftWidth: 3, topHeight: 3, rightWidth: 3, bottomHeight: 3 }, tintable: false, minHeight: 30, padding: { left: 0, top: 0, right: 0, bottom: 0 }, textStyle: 'text-style-u-frame-title', textColor: '#ffffff' },
};

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({ variant, defaultVariant, caption, tintColor, layout, onClose, onPointerDown }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'header', variants: HEADER_VARIANTS, variant, defaultVariant, tintColor,
        });
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
                    ...config.layout,
                    ...layout,
                }}
            >
                <BackgroundLayer layer={resolvedLayer} tintColor={resolvedBackgroundTint} />
                <BackgroundLayer layer={resolvedOverlay} />
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
                                    <Text text={caption} textStyle={config.textStyle} textOptions={{ fill: config.textColor }} />
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
