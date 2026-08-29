import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSliceBlendOverlay } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { BORDER_VARIANTS, BorderVariant } from './variants/border';

export interface BorderProps extends ThemeProps<BorderVariant> {
    blend?: number;
    children?: ReactNode;
}

export const Border: ForwardRefExoticComponent<BorderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BorderProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, blend, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'border', variants: BORDER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...config.layout, ...layout }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {resolvedLayer && resolvedLayer.kind === 'nineSlice' && (
                    <NineSliceBlendOverlay
                        textureKey={resolvedLayer.textureKey}
                        leftWidth={resolvedLayer.leftWidth}
                        topHeight={resolvedLayer.topHeight}
                        rightWidth={resolvedLayer.rightWidth}
                        bottomHeight={resolvedLayer.bottomHeight}
                        blend={blend}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Border.displayName = 'Border';
