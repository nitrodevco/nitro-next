/**
 * The skin of a Flash `dropmenu` window (`DropMenuController`) - its frame with the down arrow,
 * and whatever it holds as children. `Dropmenu` is the control built on it; use that.
 *
 * `expanded` is the list Flash opens: `DropBaseController.getExpandedMenuView` creates a second
 * window of the same type and style over the menu's own rectangle, and `populateExpandedMenu`
 * fills its `_DROPLIST_ITEMLIST` with the items, a 3px padding item under them, and grows it to
 * the items' height plus 4. So the open menu is one piece - the frame runs round the items, with
 * the arrow still in its top right corner (the skin's `arrow` entity moves horizontally only) -
 * and the list sits where the skin layout puts `_DROPLIST_ITEMLIST` (`listInset`). The expanded
 * view's `_DROPLIST_REGION` is hidden, so its arrow never hovers.
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { ScrollArea } from './ScrollArea';
import { DROPMENU_EXPANDED_MARGIN, DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT, ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

/** Where the skin layout puts `_DROPLIST_ITEMLIST`: its left/top/right inset in the frame. */
export interface DropmenuListInset {
    left: number;
    top: number;
    right: number;
}

export type DropmenuVariant = (ThemeVariant | ThemeWithStatesVariant) & {
    arrowTextureKey?: string;
    /** The arrow while the menu is hovered; `arrowTextureKey` otherwise. */
    arrowHoveringTextureKey?: string;
    /** The skin's `arrow` entity: fixed size, kept at this distance from the top right corner. */
    arrowLayout?: BoxLayout;
    listInset: DropmenuListInset;
};

const DEFAULT_ARROW_LAYOUT: BoxLayout = { right: 5, top: 2, width: 16, height: 16 };

const DROPMENU_VARIANTS: ThemeVariants<DropmenuVariant> = {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#000000', listInset: { left: 6, top: 2, right: 6 } },
    1: { layer: NineSlice('button-1-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-1-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#ffffff', listInset: { left: 6, top: 2, right: 6 } },
    // `habbo_skin_dropmenu_3`: `dropmenu_frame_3` is a 6px-cornered white frame (the same in both
    // states) and a 22x20 `arrow` entity at x = width - 24, y = 2 that changes on hover.
    3: {
        layer: NineSlice('dropmenu-3-frame-src', 6, 6, 6, 6),
        arrowTextureKey: 'dropmenu-3-default-arrow-src',
        arrowHoveringTextureKey: 'dropmenu-3-hovering-arrow-src',
        arrowLayout: { right: 2, top: 2, width: 22, height: 20 },
        layout: {
            minWidth: 40, minHeight: 23,
        },
        textStyle: 'text-style-u-regular', textColor: '#000000',
        listInset: { left: 2, top: 2, right: 2 },
    },
    100: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-il-regular', textColor: '#000000', listInset: { left: 6, top: 2, right: 6 } },
};

export interface DropmenuFrameProps extends ThemeProps<DropmenuVariant> {
    /** Draw the open list: the children are the items, stacked inside the frame. */
    expanded?: boolean;
    /** With `expanded`: the list's visible height when it scrolls (`placeExpandedDropmenu`'s `listHeight`). */
    listHeight?: number;
    children?: ReactNode;
}

export const DropmenuFrame: ForwardRefExoticComponent<DropmenuFrameProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DropmenuFrameProps>(
    ({
        variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, zIndex, expanded = false, listHeight, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'dropmenu', variants: DROPMENU_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const arrowTextureKey = (!expanded && (state === 'hovering') && config.arrowHoveringTextureKey) ? config.arrowHoveringTextureKey : config.arrowTextureKey;
        const inset = config.listInset;
        const scrolls = expanded && (listHeight !== undefined);
        // The padding item is the list's last item: under the items, and scrolled with them.
        const contentLayout: BoxLayout = expanded
            ? {
                    flexDirection: 'column',
                    paddingLeft: inset.left,
                    paddingTop: inset.top,
                    paddingRight: inset.right,
                    paddingBottom: (DROPMENU_EXPANDED_MARGIN - inset.top) + (scrolls ? 0 : DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT),
                }
            : { paddingLeft: 2, paddingRight: 2 };
        const content = wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor });

        return (
            <Box
                ref={ref}
                visible={visible}
                zIndex={zIndex}
                layout={{ position: 'relative', ...contentLayout, ...config.layout, ...layout }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {arrowTextureKey && (
                    <BackgroundLayer
                        layer={Stretch(arrowTextureKey)}
                        layout={{ position: 'absolute', ...(config.arrowLayout ?? DEFAULT_ARROW_LAYOUT) }}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {scrolls
                        ? (
                                <ScrollArea
                                    variant={variant}
                                    layout={{ width: '100%', height: listHeight }}
                                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 0, paddingBottom: DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT }}
                                >
                                    {content}
                                </ScrollArea>
                            )
                        : content}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

DropmenuFrame.displayName = 'DropmenuFrame';
