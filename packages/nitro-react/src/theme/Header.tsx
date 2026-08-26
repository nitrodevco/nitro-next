import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { CloseButton } from './CloseButton';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer, NineSlice, Stretch, Tiled } from './layer';
import { ThemeText } from './ThemeText';
import { ThemeProps, ThemeVariant, ThemeVariants } from './utils';

type HeaderVariant = ThemeVariant & {
    needsBgChip?: boolean;
};

const HEADER_0_VARIANT: HeaderVariant = {
    layer: Tiled('header-0-default-src'),
    overlay: Tiled('header-0-default-shine-src'),
    layout: {
        minHeight: 15,
        margin: 6,
        padding: 0,
    },
    textStyle: 'text-style-frame-title',
    needsBgChip: true,
};

const HEADER_VARIANTS: ThemeVariants<HeaderVariant> = {
    0: {
        ...HEADER_0_VARIANT,
        tintColor: '#418db0',
        textColor: '#ffffff',
    },
    1: {
        ...HEADER_0_VARIANT,
        tintColor: '#4c4c4c',
        textColor: '#ffffff',
    },
    2: {
        ...HEADER_0_VARIANT,
        tintColor: '#fac200',
        textColor: '#ffffff',
    },
    3: {
        layout: {
            minHeight: 33,
            paddingLeft: 6,
            paddingTop: 0,
            paddingRight: 6,
            paddingBottom: 0,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    4: {
        layer: Stretch('header-3-default-src'),
        layout: {
            minHeight: 20,
            paddingLeft: 8,
            paddingTop: 1,
            paddingRight: 8,
            paddingBottom: 1,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    7: {
        layout: {
            minHeight: 33,
            paddingLeft: 8,
            paddingTop: 4,
            paddingRight: 8,
            paddingBottom: 4,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#000000',
    },
    100: {
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'text-style-il-frame-title',
        textColor: '#000000',
    },
    200: {
        layer: NineSlice('border-200-default-src', 3, 3, 3, 3),
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
};

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, caption, onClose,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'header', variants: HEADER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                {...handlers}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <Box layout={{
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
                >
                    <VariantCascadeProvider map={ownCascade}>
                        <Box layout={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            {caption && (
                                <Box layout={{ position: 'relative', alignItems: 'center', paddingLeft: 6, paddingRight: 6, height: '100%' }}>
                                    { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                                    <ThemeText
                                        text={caption}
                                        textStyle={config.textStyle}
                                        textOptions={{ fill: config.textColor }}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box layout={{ position: 'absolute', right: 0, paddingLeft: 2, flexDirection: 'row', alignItems: 'center' }}>
                            { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                            <CloseButton onPointerTap={onClose} />
                        </Box>
                    </VariantCascadeProvider>
                </Box>
            </Box>
        );
    },
);

Header.displayName = 'Header';
