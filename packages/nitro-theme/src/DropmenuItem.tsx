import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { DropmenuItemVariant } from './dropmenuItemVariants';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, wrapTextChildren } from './utils';

export interface DropmenuItemProps extends ThemeProps<DropmenuItemVariant> {
    selected?: boolean;
    children?: ReactNode;
}

/**
 * Flash's `DropMenuItemController` (`dropmenu_item`): one entry of an open `Dropmenu`, the state's
 * skin behind its caption, at the height `dropmenuItemHeight` gives it.
 */
export const DropmenuItem: ForwardRefExoticComponent<DropmenuItemProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuItemProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<DropmenuItemVariant>({
            cascadeKey: 'dropmenuItem', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ minWidth: 5, ...expandSides(config.layout), ...expandSides(layout) }}
                {...handlers}
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

DropmenuItem.displayName = 'DropmenuItem';
