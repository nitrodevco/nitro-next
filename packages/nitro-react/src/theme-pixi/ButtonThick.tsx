import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer, SpriteLayer } from './utils/Layer';
import { getPixiTextStyle, type TextStyleKey } from './utils/textStyles';
import { resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface ButtonThickStates {
    default: string;
    hovering: string;
    pressed: string;
    disabled: string;
}

interface ButtonThickVariant {
    /** '0'/'1'/'2' are plain stretch sprites (`bg-size-[100%_100%]`); '3'-'6' are 5px
     *  nine-slice borders. theme/ButtonThick.tsx never defines an overlay for any variant
     *  (the overlay config exists in the DOM source but every entry is an empty string). */
    kind: 'sprite' | 'nineSlice';
    states: ButtonThickStates;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    minWidth: number;
    minHeight: number;
    textStyleKey: TextStyleKey;
    color: string;
}

const states = (prefix: string): ButtonThickStates => (
    { default: `${prefix}-default-src`, hovering: `${prefix}-hovering-src`, pressed: `${prefix}-pressed-src`, disabled: `${prefix}-disabled-src` }
);

/** Full port of theme/ButtonThick.tsx's 6-variant table. */
const BUTTON_THICK_VARIANTS: Record<string, ButtonThickVariant> = {
    '0': { kind: 'sprite', states: states('buttonthick-0'), paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23, textStyleKey: 'text-style-button-bold', color: '#000000' },
    '1': { kind: 'sprite', states: states('buttonthick-1'), paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23, textStyleKey: 'text-style-button-bold', color: '#ffffff' },
    '2': { kind: 'sprite', states: states('buttonthick-0'), paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23, textStyleKey: 'text-style-button-bold', color: '#000000' },
    '3': { kind: 'nineSlice', states: states('buttonthick-3'), paddingLeft: 10, paddingTop: 2, paddingRight: 10, paddingBottom: 3, minWidth: 20, minHeight: 22, textStyleKey: 'text-style-button-shiny-bold', color: '#000000' },
    '4': { kind: 'nineSlice', states: states('buttonthick-4'), paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28, textStyleKey: 'text-style-button-shiny-bold', color: '#ffffff' },
    '5': { kind: 'nineSlice', states: states('buttonthick-3'), paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28, textStyleKey: 'text-style-button-shiny-bold', color: '#ffffff' },
    '6': { kind: 'nineSlice', states: states('buttonthick-3'), paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28, textStyleKey: 'text-style-button-shiny-bold', color: '#ffffff' },
};

const BUTTON_THICK_TINT_COLORS: Partial<Record<string, string>> = {
    '6': '#00aa00',
};

export interface ButtonThickProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    textColor?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

export const ButtonThick: ForwardRefExoticComponent<ButtonThickProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonThickProps>(
    ({ variant, defaultVariant, tintColor, textColor, disabled, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('buttonThick', variant, defaultVariant);
        const config = BUTTON_THICK_VARIANTS[resolvedVariant] ?? BUTTON_THICK_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const textureKey = resolveByState(config.states, state);
        const resolvedTint = tintColor || BUTTON_THICK_TINT_COLORS[resolvedVariant];
        const resolvedTextColor = textColor ?? config.color;

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: config.paddingLeft,
                    paddingTop: config.paddingTop,
                    paddingRight: config.paddingRight,
                    paddingBottom: config.paddingBottom,
                    minWidth: config.minWidth,
                    minHeight: config.minHeight,
                    ...layout,
                }}
                {...handlers}
                onPointerTap={disabled ? undefined : onPress}
            >
                {config.kind === 'sprite'
                    ? <SpriteLayer textureKey={textureKey} tint={resolvedTint} />
                    : <NineSliceLayer textureKey={textureKey} leftWidth={5} topHeight={5} rightWidth={5} bottomHeight={5} tint={resolvedTint} />}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <pixiText layout={{}} text={children} style={getPixiTextStyle(config.textStyleKey, { fill: resolvedTextColor })} />
                        : children}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

ButtonThick.displayName = 'ButtonThick';
