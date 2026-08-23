import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { getRenderMode, VariantCascadeProvider } from '#base/theme-core';

import { Box, type BoxLayout } from './Box';
import { spriteFrameToStyle } from './dom/spriteFrameDom';
import { Text } from './Text';
import { wrapTextChildren } from './utils';
import { type TextStyleKey } from './utils/textStyles';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface RadioButtonVariant {
    /** Sheet variants (0/1/2) point default/selected at two frames of ONE shared
     *  radiobutton-src texture; the labeled 100 variant instead points them at two entirely
     *  separate whole-image textures (frame is always the full image, {0,0,width,height}). */
    defaultTextureKey: string;
    selectedTextureKey: string;
    defaultFrame: SpriteFrame;
    selectedFrame: SpriteFrame;
    width: number;
    height: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    /** Only set for the labeled 100 variant - 0/1/2 carry no text-style class in DOM. */
    textStyleKey?: TextStyleKey;
    color?: string;
}

const sheetFrame = (x: number): SpriteFrame => ({ x, y: 0, width: 16, height: 16 });

/**
 * Full port of theme/RadioButton.tsx's radioButtonVariantsConfig. Unlike CheckBox, DOM
 * defines no hover: AND no active: rule for ANY radio variant (0/1/2/100) - selection art is
 * driven purely by aria-selected with no interaction-state override at all, so (unlike
 * CheckBox) pressing a selected radio does NOT revert it to the unselected frame here.
 * Variant '2's selected frame reuses variant '0's selected sprite position (-16px, confirmed
 * in DOM, not a typo) while its own unselected frame is unique (-64px) - preserved exactly.
 */
const RADIO_BUTTON_VARIANTS: Partial<Record<string, RadioButtonVariant>> = {
    // default
    0: {
        defaultTextureKey: 'radiobutton-src', selectedTextureKey: 'radiobutton-src',
        defaultFrame: sheetFrame(0), selectedFrame: sheetFrame(16),
        width: 16, height: 16,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // black
    1: {
        defaultTextureKey: 'radiobutton-src', selectedTextureKey: 'radiobutton-src',
        defaultFrame: sheetFrame(32), selectedFrame: sheetFrame(48),
        width: 16, height: 16,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // white (DOM quirk: selected frame reuses '0's selected sprite, see comment above)
    2: {
        defaultTextureKey: 'radiobutton-src', selectedTextureKey: 'radiobutton-src',
        defaultFrame: sheetFrame(64), selectedFrame: sheetFrame(16),
        width: 16, height: 16,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // default
    100: {
        defaultTextureKey: 'radiobutton-100-default-src', selectedTextureKey: 'radiobutton-100-selected-src',
        defaultFrame: { x: 0, y: 0, width: 11, height: 14 }, selectedFrame: { x: 0, y: 0, width: 11, height: 14 },
        width: 11, height: 14,
        paddingLeft: 14, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
        textStyleKey: 'text-style-il-regular', color: '#000000',
    },
};

export interface RadioButtonProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    /** Caller-controlled, mirroring DOM's caller-driven `aria-selected` (RadioButton never
     *  toggles its own state internally, in DOM or here). */
    selected?: boolean;
    disabled?: boolean;
    /** Only meaningful for the labeled 100 variant - DOM renders it as a sibling of the radio
     *  graphic inside the same element, offset via padding-left rather than a dedicated label
     *  prop, which is what this mirrors. */
    children?: ReactNode;
}

export const RadioButton: ForwardRefExoticComponent<RadioButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RadioButtonProps>(
    ({ variant, defaultVariant, layout, selected, disabled, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('radioButton', variant, defaultVariant);
        const config = RADIO_BUTTON_VARIANTS[resolvedVariant] ?? RADIO_BUTTON_VARIANTS['0']!;
        const { handlers } = useInteractionState(disabled);
        const isDom = getRenderMode() === 'dom';
        const activeTextureKey = selected ? config.selectedTextureKey : config.defaultTextureKey;
        const activeFrame = selected ? config.selectedFrame : config.defaultFrame;
        const texture = useSpriteFrameTexture(isDom ? undefined : activeTextureKey, isDom ? undefined : activeFrame);

        if (!isDom && !texture) return null;

        return (
            <Box
                ref={ref}
                layout={{
                    minWidth: config.width,
                    minHeight: config.height,
                    paddingLeft: config.paddingLeft,
                    paddingTop: config.paddingTop,
                    paddingRight: config.paddingRight,
                    paddingBottom: config.paddingBottom,
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...layout,
                }}
                {...handlers}
            >
                {isDom
                    ? <div style={{ position: 'absolute', top: 0, left: 0, ...spriteFrameToStyle(activeTextureKey, activeFrame) }} />
                    : (
                            <pixiSprite
                                texture={texture}
                                width={config.width}
                                height={config.height}
                                eventMode="none"
                                layout={{ position: 'absolute', top: 0, left: 0 }}
                            />
                        )}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? (
                                <Text
                                    text={children}
                                    textStyle={config.textStyleKey}
                                    textOptions={{ fill: config.color }}
                                />
                            )
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

RadioButton.displayName = 'RadioButton';
