/**
 * The special items display - `catalog/special_items_display/SpecialItemsView` on
 * `special_items_display_xml`, opened centred by a `special_items_display/<key>` link:
 *
 * - `displayNewData`: the window titled `special_items.title` with the set's name, and the set's
 *   `set_title` and `set_desc`;
 * - the carousel: `product_display_template` taken out of `item_rotation` and cloned per item
 *   (`SpecialItemElementView`), each placed on the ellipse `updateRotation` computes and faded by
 *   how far back it is; `page_template` taken out of `page_list` and cloned per item
 *   (`SpecialItemPageButtonView`), its `page_image` `progress_disk_etched_on` while selected. The
 *   arrows and the page dots move it, and `update` eases it round from the ticker;
 * - `updateClaimState`: while a set has a claim, `claim_spacer` is `CLAIM_HEIGHT` high - its
 *   `reflect_vertical_resize_to_parent` grows the window, pushing `center` and `bottom` down - and
 *   `claim_container` shows, its `claim_btn` reading "claim" (enabled only while claimable) or
 *   "claimed";
 * - `setItemPlaque`: the title, description and `product_icon` of the item in focus;
 *   `plaqueAndSpotlightBlend` fades them and dims the spotlight while the carousel turns.
 *
 * `product_image` draws a floor item with `getFurnitureImage(id, Vector3d(90), 64)` and
 * `product_icon` with `getFurnitureIcon(id)`, which are `useFurnitureImageTexture(.., 90, 64)` and
 * the floor icon URL here. The plaque's fade also sets the blend of the item scroll area's slider
 * track and bar, which are its window layout's and no element bindings reach, so the bar stays opaque.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine, GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect } from 'react';

import { claimSpecialItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { getSpecialItemPoint, getSpecialItemWindowPosition, SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE, SPECIAL_ITEMS_CLAIM_STATE_CLAIMED, SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE, SpecialItem, useSpecialItemsActions, useSpecialItemsStore } from '#base/context/special-items';
import { useTranslation } from '#base/context/system';
import { useFurnitureImageTexture } from '#base/hooks';
import { TemplateItem, TemplateWindow, ThemeImage, useTemplateFrame } from '#base/theme';

/** `SpecialItemsView.CLAIM_HEIGHT`: `claim_spacer`'s height while the set has a claim. */
const CLAIM_HEIGHT = 20;

/** The `product_image` widget's picture: the furni at 90 degrees, at the widget's `bottom center` pivot (`pivot = 7`). */
const SpecialItemImage = ({ item }: { item: SpecialItem }) => {
    const { texture } = useFurnitureImageTexture(item.className, item.colorIndex, 90, RoomGeometryScaleType.ZoomedIn);

    if (!texture) return null;

    return (
        <ThemeImage
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'bottom center' }}
            layout={{ position: 'absolute', left: 0, top: 0, width: 200, height: 200 }}
        />
    );
};

export interface SpecialItemsViewProps {
    onClose: () => void;
}

export const SpecialItemsView = ({ onClose }: SpecialItemsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const key = useSpecialItemsStore(x => x.key);
    const displayKey = useSpecialItemsStore(x => x.displayKey);
    const items = useSpecialItemsStore(x => x.items);
    const claimState = useSpecialItemsStore(x => x.claimState);
    const rotation = useSpecialItemsStore(x => x.rotation);
    const { showNextSpecialItem, showPreviousSpecialItem, showSpecialItem, stepSpecialItems } = useSpecialItemsActions();
    // `show`: added to the desktop and `center()`ed each time.
    const frame = useTemplateFrame({ id: 'special_items_display', centered: true, rememberPosition: false, onClose });

    // `registerUpdateReceiver(this, 1)`: `update` runs every frame, and does nothing at rest.
    const animating = rotation.animating;

    useEffect(() => {
        if (!animating) return;

        const tick = (ticker: Ticker) => stepSpecialItems(ticker.deltaMS);

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ animating ]);

    const total = items.length;
    const plaque = items[rotation.plaqueItem];
    const hasClaim = (claimState !== SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE);
    // `displayNewData` titles the window and header for the set it was filled for.
    const setKey = displayKey || key;

    // `initializeElements` / `updateRotation`: each element at its point on the ellipse, faded by its depth.
    const elements: TemplateItem[] = items.map(item => ({
        key: `${setKey}:${item.index}`,
        from: 'product_display_template',
        bindings: { '': { alpha: rotation.elementBlends[item.index] ?? 1, children: <SpecialItemImage item={item} /> } },
        arrange: ({ root }) => {
            const { x, y } = getSpecialItemWindowPosition(getSpecialItemPoint(item.index, rotation.placedPosition, total));

            root()?.setX(x);
            root()?.setY(y);
        },
    }));

    // `initializePages` / `selectedPage`.
    const pages: TemplateItem[] = items.map(item => ({
        key: String(item.index),
        from: 'page_template',
        bindings: {
            '': { onPointerTap: () => showSpecialItem(item.index) },
            page_image: { asset: `habbo-window-manager-com-progress_disk_etched_${(item.index === rotation.target) ? 'on' : 'off'}` },
        },
    }));

    return (
        <TemplateWindow
            id="habbo-catalog-com/special_items_display_xml"
            frame={frame}
            parameters={{ 'special_items.title': { set_name: t(`special_items.${setKey}.title`, '') } }}
            arrange={({ find }) => find('claim_spacer')?.setHeight(hasClaim ? CLAIM_HEIGHT : 0)}
            bindings={{
                set_title: { caption: t(`special_items.${setKey}.header.title`, '') },
                set_desc: { caption: t(`special_items.${setKey}.header.desc`, '') },
                spotlight_base_img: { alpha: rotation.spotlightBlend },
                spotlight_img: { alpha: rotation.spotlightBlend },
                item_rotation: { items: elements },
                previous_button: { onPointerTap: showPreviousSpecialItem },
                next_button: { onPointerTap: showNextSpecialItem },
                page_list: { items: pages },
                claim_container: { visible: hasClaim },
                claim_btn: {
                    disabled: claimState !== SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE,
                    caption: (claimState === SPECIAL_ITEMS_CLAIM_STATE_CLAIMED) ? '${special_items.claimed}' : '${special_items.claim}',
                    onPointerTap: () => claimSpecialItems(send),
                },
                item_title: { ...(plaque && { caption: plaque.name }), alpha: rotation.plaqueBlend },
                item_desc: { ...(plaque && { caption: plaque.description }), alpha: rotation.plaqueBlend },
                product_icon: {
                    alpha: rotation.plaqueBlend,
                    // `product_icon_xml`'s 46x40 bitmap at -3,0 of the 40x40 widget, centred.
                    children: plaque && (
                        <ThemeImage
                            src={GetRoomEngine().getFurnitureFloorIconUrl(plaque.furniTypeId)}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: -3, top: 0, width: 46, height: 40 }}
                        />
                    ),
                },
            }}
        />
    );
};
