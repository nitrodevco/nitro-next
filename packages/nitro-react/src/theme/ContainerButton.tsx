import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { CONTAINER_BUTTON_VARIANTS, ContainerButtonVariant } from './variants/containerButton';

export interface ContainerButtonProps extends ThemeProps<ContainerButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

/**
 * The Flash `container_button`: a button whose face is built from arbitrary children
 * (positioned absolutely, exactly like a `container`) rather than a centered caption. Press
 * feedback beyond the sheet's own states came from `dynamic_style`, which is carried on
 * `ThemeLayoutMeta` but not applied yet.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'containerButton', variants: CONTAINER_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
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
