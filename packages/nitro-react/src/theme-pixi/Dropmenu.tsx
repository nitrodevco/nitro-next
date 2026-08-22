import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { CompositeLayer, NineSliceLayer, SpriteLayer } from './layer';
import { Text } from './Text';
import { type TextStyleKey } from './utils/textStyles';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

type DropmenuLayer =
    | { kind: 'nineSlice', textureKey: string }
    | { kind: 'sprite', textureKey: string, hoverTextureKey?: string };

interface DropmenuVariant {
    layer: DropmenuLayer;
    arrowTextureKey?: string;
    minWidth: number;
    minHeight: number;
    textStyleKey: TextStyleKey;
    color: string;
}

/**
 * Static-skinning port of theme/Dropmenu.tsx, with one addition: views/navigator/
 * NavigatorSearchView.tsx (found once views/ migration reached Navigator) DOES use Dropmenu
 * interactively - a real onClick toggling a locally-rendered DropmenuItem list, not the
 * "always a bare closed box" pattern every other confirmed call site follows. `onPress` below
 * exists for that one real call site; still no built-in floating positioning/open state of its
 * own - the caller (as DOM's own does) owns showing/hiding whatever it renders below this.
 */
const DROPMENU_VARIANTS: Record<string, DropmenuVariant> = {
    '0': { layer: { kind: 'nineSlice', textureKey: 'dropmenu-0-default-src' }, arrowTextureKey: 'dropmenu-0-default-arrow-src', minWidth: 40, minHeight: 22, textStyleKey: 'text-style-regular', color: '#000000' },
    '1': { layer: { kind: 'nineSlice', textureKey: 'button-1-default-src' }, arrowTextureKey: 'dropmenu-1-default-arrow-src', minWidth: 40, minHeight: 22, textStyleKey: 'text-style-regular', color: '#ffffff' },
    '3': { layer: { kind: 'sprite', textureKey: 'dropmenu-3-default-src', hoverTextureKey: 'dropmenu-3-hovering-src' }, minWidth: 40, minHeight: 23, textStyleKey: 'text-style-u-regular', color: '#000000' },
    '100': { layer: { kind: 'nineSlice', textureKey: 'dropmenu-0-default-src' }, arrowTextureKey: 'dropmenu-0-default-arrow-src', minWidth: 40, minHeight: 22, textStyleKey: 'text-style-il-regular', color: '#000000' },
};

export interface DropmenuProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    onPress?: () => void;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Dropmenu: ForwardRefExoticComponent<DropmenuProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuProps>(
    ({ variant, defaultVariant, tintColor, onPress, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('dropmenu', variant, defaultVariant);
        const config = DROPMENU_VARIANTS[resolvedVariant] ?? DROPMENU_VARIANTS['0'];
        // Only variant '3' has hover art in DOM (0/1/100 are static nine-slice boxes).
        const { state, handlers } = useInteractionState();
        const spriteTextureKey = config.layer.kind === 'sprite' && state === 'hovering' && config.layer.hoverTextureKey
            ? config.layer.hoverTextureKey
            : config.layer.textureKey;

        return (
            <Box
                ref={ref}
                layout={{ minWidth: config.minWidth, minHeight: config.minHeight, paddingLeft: 2, paddingRight: 2, ...layout }}
                {...(config.layer.kind === 'sprite' ? handlers : undefined)}
                eventMode={onPress ? 'static' : undefined}
                cursor={onPress ? 'pointer' : undefined}
                onPointerTap={onPress}
            >
                {config.layer.kind === 'nineSlice'
                    ? <NineSliceLayer textureKey={config.layer.textureKey} leftWidth={3} topHeight={3} rightWidth={3} bottomHeight={3} tintColor={tintColor} />
                    : <SpriteLayer textureKey={spriteTextureKey} tintColor={tintColor} />}
                {config.arrowTextureKey && <CompositeLayer pieces={[{ textureKey: config.arrowTextureKey, right: 5, top: 2, width: 16, height: 16 }]} />}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: config.color }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Dropmenu.displayName = 'Dropmenu';
