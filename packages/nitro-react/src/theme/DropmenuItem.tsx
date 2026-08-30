import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type DropmenuItemVariant = ThemeWithStatesVariant;

const DROPMENU_ITEM_VARIANTS: ThemeVariants<DropmenuItemVariant> = {
    0: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-0-hovering-src'),
            selected: Stretch('dropmenuitem-0-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-regular',
    },
    1: {
        states: {
            default: Stretch('dropmenuitem-1-default-src'),
            hovering: Stretch('dropmenuitem-1-hovering-src'),
            selected: Stretch('dropmenuitem-1-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-regular',
        textColor: '#ffffff',
    },
    3: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-3-hovering-src'),
            selected: Stretch('dropmenuitem-3-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 2,
            paddingRight: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-u-regular',
    },
    100: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-3-hovering-src'),
            selected: Stretch('dropmenuitem-3-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-il-regular',
    },
};

export interface DropmenuItemProps extends ThemeProps<DropmenuItemVariant> {
    selected?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export const DropmenuItem: ForwardRefExoticComponent<DropmenuItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuItemProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'dropmenuItem', variants: DROPMENU_ITEM_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ minWidth: 5, minHeight: 19, ...config.layout, ...layout }}
                {...handlers}
                cursor={handlers.eventMode === 'static' ? 'pointer' : undefined}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
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

DropmenuItem.displayName = 'DropmenuItem';
