import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { SpriteLayer } from './layer';
import { Text } from './Text';
import { type TextStyleKey } from './utils/textStyles';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

interface DropmenuItemVariant {
    defaultTextureKey: string;
    hoveringTextureKey: string;
    selectedTextureKey: string;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    textStyleKey: TextStyleKey;
    color: string;
}

/**
 * Static-skinning port of theme/DropmenuItem.tsx, plus `onPress` - views/navigator/
 * NavigatorSearchView.tsx renders a real list of these (found once views/ migration reached
 * Navigator), each with a working onClick, inside a Dropmenu it opens/closes itself (see
 * Dropmenu.tsx's own updated docblock). `aria-selected:`/`active:` both map to the same
 * "selected" art in every variant, collapsed to one Pixi `selected` prop.
 */
const DROPMENU_ITEM_VARIANTS: Record<string, DropmenuItemVariant> = {
    '0': { defaultTextureKey: 'dropmenuitem-0-default-src', hoveringTextureKey: 'dropmenuitem-0-hovering-src', selectedTextureKey: 'dropmenuitem-0-selected-src', paddingLeft: 4, paddingTop: 1, paddingRight: 4, paddingBottom: 2, textStyleKey: 'text-style-regular', color: '#000000' },
    '1': { defaultTextureKey: 'dropmenuitem-1-default-src', hoveringTextureKey: 'dropmenuitem-1-hovering-src', selectedTextureKey: 'dropmenuitem-1-selected-src', paddingLeft: 4, paddingTop: 1, paddingRight: 4, paddingBottom: 2, textStyleKey: 'text-style-regular', color: '#ffffff' },
    '3': { defaultTextureKey: 'dropmenuitem-0-default-src', hoveringTextureKey: 'dropmenuitem-3-hovering-src', selectedTextureKey: 'dropmenuitem-3-selected-src', paddingLeft: 4, paddingTop: 2, paddingRight: 4, paddingBottom: 4, textStyleKey: 'text-style-u-regular', color: '#000000' },
    '100': { defaultTextureKey: 'dropmenuitem-0-default-src', hoveringTextureKey: 'dropmenuitem-0-hovering-src', selectedTextureKey: 'dropmenuitem-0-selected-src', paddingLeft: 4, paddingTop: 1, paddingRight: 4, paddingBottom: 2, textStyleKey: 'text-style-il-regular', color: '#000000' },
};

export interface DropmenuItemProps {
    variant?: string;
    defaultVariant?: string;
    selected?: boolean;
    onPress?: () => void;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const DropmenuItem: ForwardRefExoticComponent<DropmenuItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuItemProps>(
    ({ variant, defaultVariant, selected, onPress, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('dropmenuItem', variant, defaultVariant);
        const config = DROPMENU_ITEM_VARIANTS[resolvedVariant] ?? DROPMENU_ITEM_VARIANTS['0'];
        const { state, handlers } = useInteractionState();
        const textureKey = (selected || state === 'pressed')
            ? config.selectedTextureKey
            : (state === 'hovering' ? config.hoveringTextureKey : config.defaultTextureKey);

        return (
            <Box
                ref={ref}
                layout={{ minWidth: 5, minHeight: 19, paddingLeft: config.paddingLeft, paddingTop: config.paddingTop, paddingRight: config.paddingRight, paddingBottom: config.paddingBottom, ...layout }}
                {...handlers}
                cursor={onPress ? 'pointer' : undefined}
                onPointerTap={onPress}
            >
                <SpriteLayer textureKey={textureKey} />
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: config.color }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

DropmenuItem.displayName = 'DropmenuItem';
