import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { SpriteLayer } from './utils/Layer';
import { useInteractionState } from './utils/useInteractionState';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * Static-skinning port of theme/DroplistItem.tsx. Both DOM variants ('0'/'1') are
 * byte-identical, reusing DropmenuItem's own `dropmenuitem-0-*` assets, and (unlike
 * DropmenuItem) define no padding/text-style classes at all - text is entirely
 * unstyled/inherited in DOM, reproduced here by not applying any text style either.
 */
const DROPLIST_ITEM_TEXTURE_KEYS = { default: 'dropmenuitem-0-default-src', hovering: 'dropmenuitem-0-hovering-src', selected: 'dropmenuitem-0-selected-src' };

export interface DroplistItemProps {
    variant?: string;
    defaultVariant?: string;
    selected?: boolean;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const DroplistItem: ForwardRefExoticComponent<DroplistItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistItemProps>(
    ({ variant, defaultVariant, selected, layout, children }, ref) => {
        const cascadedVariant = useCascadedVariant('droplistItem');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['droplistItem']?.[resolvedVariant];
        const { state, handlers } = useInteractionState();
        const textureKey = (selected || state === 'pressed')
            ? DROPLIST_ITEM_TEXTURE_KEYS.selected
            : (state === 'hovering' ? DROPLIST_ITEM_TEXTURE_KEYS.hovering : DROPLIST_ITEM_TEXTURE_KEYS.default);

        return (
            <Box ref={ref} layout={{ minWidth: 5, minHeight: 19, ...layout }} {...handlers}>
                <SpriteLayer textureKey={textureKey} />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

DroplistItem.displayName = 'DroplistItem';
