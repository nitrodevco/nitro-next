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
import { BackgroundLayer, SpriteLayer } from './layer';
import { ScrollArea } from './ScrollArea';
import { DROPMENU_EXPANDED_MARGIN, DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT, expandSides, ThemeProps, ThemeVariant, ThemeWithStatesVariant, wrapTextChildren } from './utils';
import { themeVariantOf } from './utils/themeRegistry';

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

/**
 * Where the closed menu's caption starts: the skin layout's `_DROPLIST_TITLETEXT` x - 10 in
 * `habbo_window_layout_dropmenu` / `_black` / `illumina_light_dropmenu`, 6 in `_dropmenu_3`. In every
 * one that is where the open list's text starts too: `_DROPLIST_ITEMLIST`'s x (`listInset`) plus the
 * item's `_BTN_TEXT` left margin (4 in each `dropmenu_item*` layout), so the caption lines up with it.
 * A style with no skin of its own (`ros_room_settings`' style 2 menus) is drawn by the default one
 * (`habbo_element_description` names no style 2 dropmenu), as the frame already is: its item too.
 */
const titleInsetLeft = (variant: string, defaultVariant: string, inset: DropmenuListInset | undefined): number => {
    const item = themeVariantOf<ThemeWithStatesVariant>('dropmenuItem', variant) ?? themeVariantOf<ThemeWithStatesVariant>('dropmenuItem', defaultVariant);

    return (inset?.left ?? 0) + Number(expandSides(item?.layout)?.paddingLeft ?? 0);
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
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, zIndex, expanded = false, listHeight, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<DropmenuVariant>({
            cascadeKey: 'dropmenu', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
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
            : { paddingLeft: titleInsetLeft(resolvedVariant, defaultVariant ?? '0', inset), paddingRight: 2 };
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
                    <SpriteLayer
                        textureKey={arrowTextureKey}
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
