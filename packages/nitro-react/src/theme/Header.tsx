import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { CloseButton } from './CloseButton';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer } from './layer';
import { ThemeText } from './ThemeText';
import { ThemeProps } from './utils';
import { HEADER_VARIANTS, HeaderVariant } from './variants/header';

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, caption, onClose,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'header', variants: HEADER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
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
                                        textStyle={resolvedTextStyle}
                                        textOptions={{ fill: resolvedTextColor }}
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
