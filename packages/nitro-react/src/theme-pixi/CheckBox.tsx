import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box, type BoxLayout } from './Box';
import { Text } from './Text';
import { wrapTextChildren } from './utils';
import { type TextStyleKey } from './utils/textStyles';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface CheckBoxVariant {
    /** Sheet variants (0/1/2) point default/selected at two frames of ONE shared
     *  checkbox-src texture; labeled variants (100/101) instead point them at two entirely
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
    /** Only set for the labeled 100/101 variants - 0/1/2 carry no text-style class in DOM. */
    textStyleKey?: TextStyleKey;
    color?: string;
}

const sheetFrame = (x: number): SpriteFrame => ({ x, y: 0, width: 15, height: 15 });

/**
 * Full port of theme/CheckBox.tsx's checkBoxVariantsConfig. DOM defines no hover: rule for
 * any variant (hover always falls back to whichever default/selected frame already applies),
 * and every sheet variant's active: rule points at the SAME position as its own unselected
 * default frame - i.e. pressing a checked box shows it unchecked while the pointer is held
 * down. That's a real, confirmed DOM quirk, modeled below via `showSelected = selected &&
 * state !== 'pressed'` rather than normalized away. Variant '2' copy-pastes variant '0's
 * exact bg-position values in DOM (confirmed, not a typo repeated here) - it is visually
 * identical to '0' despite the "white" naming.
 */
const CHECK_BOX_VARIANTS: Partial<Record<string, CheckBoxVariant>> = {
    // default
    '0': {
        defaultTextureKey: 'checkbox-src', selectedTextureKey: 'checkbox-src',
        defaultFrame: sheetFrame(0), selectedFrame: sheetFrame(15),
        width: 15, height: 15,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // black
    '1': {
        defaultTextureKey: 'checkbox-src', selectedTextureKey: 'checkbox-src',
        defaultFrame: sheetFrame(30), selectedFrame: sheetFrame(45),
        width: 15, height: 15,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // white (DOM quirk: identical sprite positions to '0', see comment above)
    '2': {
        defaultTextureKey: 'checkbox-src', selectedTextureKey: 'checkbox-src',
        defaultFrame: sheetFrame(0), selectedFrame: sheetFrame(15),
        width: 15, height: 15,
        paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    },
    // switch
    '100': {
        defaultTextureKey: 'checkbox-100-default-src', selectedTextureKey: 'checkbox-100-selected-src',
        defaultFrame: { x: 0, y: 0, width: 38, height: 21 }, selectedFrame: { x: 0, y: 0, width: 38, height: 21 },
        width: 38, height: 21,
        paddingLeft: 42, paddingTop: 4, paddingRight: 0, paddingBottom: 4,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
    // basic
    '101': {
        defaultTextureKey: 'checkbox-101-default-src', selectedTextureKey: 'checkbox-101-selected-src',
        defaultFrame: { x: 0, y: 0, width: 19, height: 20 }, selectedFrame: { x: 0, y: 0, width: 19, height: 20 },
        width: 19, height: 20,
        paddingLeft: 23, paddingTop: 4, paddingRight: 0, paddingBottom: 4,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
};

export interface CheckBoxProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    /** Caller-controlled, mirroring DOM's caller-driven `aria-selected` (CheckBox never
     *  toggles its own state internally, in DOM or here). */
    selected?: boolean;
    disabled?: boolean;
    /** Only meaningful for the labeled 100/101 variants - DOM renders it as a sibling of the
     *  checkbox graphic inside the same element, offset via padding-left rather than a
     *  dedicated label prop, which is what this mirrors. */
    children?: ReactNode;
}

export const CheckBox: ForwardRefExoticComponent<CheckBoxProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CheckBoxProps>(
    ({ variant, defaultVariant, layout, selected, disabled, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('checkBox', variant, defaultVariant);
        const config = CHECK_BOX_VARIANTS[resolvedVariant] ?? CHECK_BOX_VARIANTS['0']!;
        const { state, handlers } = useInteractionState(disabled);
        const showSelected = !!selected && state !== 'pressed';
        const texture = useSpriteFrameTexture(
            showSelected ? config.selectedTextureKey : config.defaultTextureKey,
            showSelected ? config.selectedFrame : config.defaultFrame
        );
        if (!texture) return null;

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
                <pixiSprite
                    texture={texture}
                    width={config.width}
                    height={config.height}
                    eventMode="none"
                    layout={{ position: 'absolute', top: 0, left: 0 }}
                />
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: config.color }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

CheckBox.displayName = 'CheckBox';
