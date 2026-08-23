import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, CompositeLayer, NineSlice, Stretch } from './layer';
import { useThemeVariant } from './utils';
import { wrapTextChildren } from './utils/wrapTextChildren';

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
    onPress?: () => void;
    children?: ReactNode;
}

export const Dropmenu: ForwardRefExoticComponent<DropmenuProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, onPress, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'dropmenu', variants: DROPMENU_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                layout={{ paddingLeft: 2, paddingRight: 2, ...config.layout, ...layout }}
                {...handlers}
                eventMode={onPress ? 'static' : undefined}
                cursor={onPress ? 'pointer' : undefined}
                onPointerTap={onPress}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {config.arrowTextureKey && <CompositeLayer pieces={[ { textureKey: config.arrowTextureKey, right: 5, top: 2, width: 16, height: 16 } ]} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Dropmenu.displayName = 'Dropmenu';
