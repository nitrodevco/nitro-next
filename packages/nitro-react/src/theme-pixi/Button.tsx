import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { getPixiTextStyle } from './utils/textStyles';
import { useInteractionState } from './utils/useInteractionState';
import { usePixiTexture } from './utils/usePixiTexture';

interface ButtonVariant {
    textureKeys: { default: string, hovering?: string, pressed?: string, disabled?: string };
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    paddingX: number;
    paddingY: number;
}

/**
 * Only the variants used by a migrated view are ported here - see theme/Button.tsx for the
 * full CSS variant table (border-image-slice/width + hover/active/disabled art per variant)
 * this mirrors. Add entries as more views migrate.
 */
const BUTTON_VARIANTS: Partial<Record<string, ButtonVariant>> = {
    '0': {
        textureKeys: {
            default: 'button-0-default-src',
            hovering: 'button-0-hovering-src',
            pressed: 'button-0-pressed-src',
            disabled: 'button-0-disabled-src',
        },
        leftWidth: 3,
        topHeight: 3,
        rightWidth: 3,
        bottomHeight: 3,
        paddingX: 8,
        paddingY: 8,
    },
};

export interface ButtonProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    textColor?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

export const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonProps>(
    ({ variant, defaultVariant, tintColor, textColor = '#000000', disabled, layout, onPress, children }, ref) => {
        const cascadedVariant = useCascadedVariant('button');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['button']?.[resolvedVariant];
        const config = BUTTON_VARIANTS[resolvedVariant];
        const { state, handlers } = useInteractionState(disabled);
        const textureKey = config
            ? (state === 'hovering' && config.textureKeys.hovering)
                || (state === 'pressed' && config.textureKeys.pressed)
                || (state === 'disabled' && config.textureKeys.disabled)
                || config.textureKeys.default
            : undefined;
        const texture = usePixiTexture(textureKey || undefined);

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: config?.paddingX,
                    paddingRight: config?.paddingX,
                    paddingTop: config?.paddingY,
                    paddingBottom: config?.paddingY,
                    ...layout,
                }}
                {...handlers}
                onPointerTap={disabled ? undefined : onPress}
            >
                {(texture && config) && (
                    <pixiNineSliceSprite
                        texture={texture}
                        leftWidth={config.leftWidth}
                        topHeight={config.topHeight}
                        rightWidth={config.rightWidth}
                        bottomHeight={config.bottomHeight}
                        tint={tintColor}
                        eventMode="none"
                        layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <pixiText layout={{}} text={children} style={getPixiTextStyle('text-style-button-regular', { fill: textColor })} />
                        : children}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Button.displayName = 'Button';
