import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { DROPMENU_VARIANTS, DropmenuVariant } from './variants/dropmenu';

export interface DropmenuProps extends ThemeProps<DropmenuVariant> {
    children?: ReactNode;
}

export const Dropmenu: ForwardRefExoticComponent<DropmenuProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'dropmenu', variants: DROPMENU_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ position: 'relative', paddingLeft: 2, paddingRight: 2, ...config.layout, ...layout }}
                {...handlers}
                cursor={handlers.eventMode === 'static' ? 'pointer' : undefined}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {config.arrowTextureKey && (
                    <BackgroundLayer
                        layer={Stretch(config.arrowTextureKey)}
                        layout={{ position: 'absolute', right: 5, top: 2, width: 16, height: 16 }}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Dropmenu.displayName = 'Dropmenu';
