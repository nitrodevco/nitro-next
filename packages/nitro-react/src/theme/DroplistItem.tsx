import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { resolveByState, useInteractionState, useResolvedVariant } from './hooks';
import { SpriteLayer } from './layer';
import { wrapTextChildren } from './utils';

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
        const { ownCascade } = useResolvedVariant('droplistItem', variant, defaultVariant);
        const { state, handlers } = useInteractionState();
        const textureKey = resolveByState(DROPLIST_ITEM_TEXTURE_KEYS, state, selected);

        return (
            <Box
                ref={ref}
                layout={{ minWidth: 5, minHeight: 19, ...layout }}
                {...handlers}
            >
                <SpriteLayer textureKey={textureKey} />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    },
);

DroplistItem.displayName = 'DroplistItem';
