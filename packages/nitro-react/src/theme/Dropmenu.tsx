import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type DropmenuVariant = (ThemeVariant | ThemeWithStatesVariant) & {
    arrowTextureKey?: string;
};

const DROPMENU_VARIANTS: ThemeVariants<DropmenuVariant> = {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#000000' },
    1: { layer: NineSlice('button-1-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-1-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#ffffff' },
    3: {
        states: {
            default: Stretch('dropmenu-3-default-src'),
            hovering: Stretch('dropmenu-3-hovering-src'),
        },
        layout: {
            minWidth: 40, minHeight: 23,
        },
        textStyle: 'text-style-u-regular', textColor: '#000000',
    },
    100: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-il-regular', textColor: '#000000' },
};

export interface DropmenuProps extends ThemeProps<DropmenuVariant> {
    children?: ReactNode;
}

export const Dropmenu: ForwardRefExoticComponent<DropmenuProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'dropmenu', variants: DROPMENU_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
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
