import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type ContainerButtonVariant = ThemeVariant | ThemeWithStatesVariant;

const CONTAINER_BUTTON_4_VARIANT: ContainerButtonVariant = {
    states: {
        default: NineSlice('containerbutton-4-default-src', 6, 6, 6, 7),
        hovering: NineSlice('containerbutton-4-hovering-src', 6, 6, 6, 7),
        pressed: NineSlice('containerbutton-4-pressed-src', 6, 6, 6, 7),
        disabled: NineSlice('containerbutton-4-disabled-src', 6, 6, 6, 7),
    },
    textStyle: 'text-style-button-shiny-regular',
    textColor: '#000000',
};

const CONTAINER_BUTTON_VARIANTS: ThemeVariants<ContainerButtonVariant> = {
    // habbo_skin - an invisible hit area whose children (a bitmap, a text) are the whole button
    0: {},
    // ubuntu_skin - rounded, same art ButtonThick's variant 5 uses
    3: CONTAINER_BUTTON_4_VARIANT,
    4: CONTAINER_BUTTON_4_VARIANT,
    5: CONTAINER_BUTTON_4_VARIANT,
};

export interface ContainerButtonProps extends ThemeProps<ContainerButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

/**
 * The Flash `container_button`: a button whose face is built from arbitrary children
 * (positioned absolutely, exactly like a `container`) rather than a centered caption. Most
 * styles in the skins have no chrome of their own - the press feedback came from the
 * `dynamic_style` effect, which is carried on `ThemeLayoutMeta` but not applied yet.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'containerButton', variants: CONTAINER_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
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

ContainerButton.displayName = 'ContainerButton';
