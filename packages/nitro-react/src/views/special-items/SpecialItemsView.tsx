/**
 * The special items display - `catalog/special_items_display/SpecialItemsView` on
 * `special_items_display.xml` (420 x 495, style 3 frame, `#2a2a2a`, content margins 0/33/0/0),
 * opened centred by a `special_items_display/<key>` link:
 *
 * - `header`: the set's title (bold) and description, centred, in a 380 x 80 scrolling list on a
 *   `#d9d9d9` style 2 border;
 * - `center`: the carousel. Every item is a `product_image` widget cloned from
 *   `product_display_template` (200 x 200, `pivot_point` bottom center), placed on the ellipse
 *   `SpecialItemElementView.updateRotation` computes and faded by how far back it is, over the
 *   platform and under the additive spotlight; the arrows (`brightness_and_shadow_under_gentle`)
 *   and the page dots (`progress_disk_etched_on`/`_off`, 10 x 11, 7 apart, centred) move it, and
 *   `update` eases it round from the ticker;
 * - `claim_container`: the free claim - its text and a style 4 button reading "claim" (disabled
 *   until every item was visited and the server said it was not claimed yet) or "claimed". While
 *   a set has a claim, `claim_spacer` is 20 high, and its `reflect_vertical_resize_to_parent`
 *   grows the window by 20, pushing the bottom-anchored `center` and `bottom` down with it;
 * - `bottom`: the plaque of the item in focus - title (white, bold) and description in a 374 x 97
 *   scrolling list on the stacked style 2 borders, with the furni's `product_icon` beside them.
 *   `plaqueAndSpotlightBlend` fades the plaque and dims the spotlight while the carousel turns.
 *
 * `product_image` draws a floor item with `getFurnitureImage(id, Vector3d(90), 64)` and
 * `product_icon` with `getFurnitureIcon(id)`, which are `useFurnitureImageTexture(.., 90, 64)` and
 * the floor icon URL here. The plaque's fade also sets the blend of the item scroll area's slider
 * track and bar; the port's `ScrollArea` has no alpha for its scrollbar, so the bar stays opaque.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine, GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect } from 'react';

import { claimSpecialItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { getSpecialItemPoint, getSpecialItemWindowPosition, SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE, SPECIAL_ITEMS_CLAIM_STATE_CLAIMED, SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE, SpecialItem, useSpecialItemsActions, useSpecialItemsStore } from '#base/context/special-items';
import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

/** The layout's frame size. */
const WIDTH = 420;
const HEIGHT = 495;
/** `SpecialItemsView.CLAIM_HEIGHT`: `claim_spacer`'s height while the set has a claim. */
const CLAIM_HEIGHT = 20;
/** The page dots' `page_list`: 10 wide, `spacing` 7. */
const PAGE_WIDTH = 10;
const PAGE_SPACING = 7;

/** One carousel element: `product_display_template`'s clone, at its place on the ellipse. */
const SpecialItemElement = ({ item, position, total, blend }: { item: SpecialItem; position: number; total: number; blend: number }) => {
    const { texture } = useFurnitureImageTexture(item.className, item.colorIndex, 90, RoomGeometryScaleType.ZoomedIn);
    const { x, y } = getSpecialItemWindowPosition(getSpecialItemPoint(item.index, position, total));

    return (
        <Region layout={{ position: 'absolute', left: x, top: y, width: 200, height: 200 }}>
            {texture && (
                <ThemeImage
                    texture={texture}
                    alpha={blend}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'bottom center' }}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 200, height: 200 }}
                />
            )}
        </Region>
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
    const spacer = hasClaim ? CLAIM_HEIGHT : 0;
    const pageListWidth = total ? ((total * PAGE_WIDTH) + ((total - 1) * PAGE_SPACING)) : 0;
    // `displayNewData` titles the window and header for the set it was filled for.
    const setKey = displayKey || key;

    return (
        <Frame
            variant="3"
            id="special_items_display"
            name="main"
            caption={t('special_items.title', '', { set_name: t(`special_items.${setKey}.title`, '') })}
            tintColor="#2a2a2a"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            centered
            onClose={onClose}
            margins={[ 0, 33, 0, 0 ]}
            layout={{ position: 'absolute', width: WIDTH, height: HEIGHT + spacer }}
        >
            <Region
                name="background_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="bg1"
                    backgroundColor="#bfbfbf"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 0, bottom: 7 }}
                />
                <Region
                    name="bg2"
                    backgroundColor="#bfbfbf"
                    layout={{ position: 'absolute', left: 4, right: 4, bottom: 5, height: 2 }}
                />
                <Region
                    name="bg3"
                    backgroundColor="#bfbfbf"
                    layout={{ position: 'absolute', left: 6, right: 6, bottom: 4, height: 1 }}
                />
            </Region>
            <Region
                name="header"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 107 }}
            >
                <Border
                    variant="2"
                    tintColor="#d9d9d9"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 13, height: 94 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        variant="100"
                        layout={{ position: 'absolute', left: 7, width: 380, top: 7, height: 80 }}
                    >
                        <Region layout={{ flexDirection: 'column', width: '100%' }}>
                            <ThemeText
                                text={t(`special_items.${setKey}.header.title`, '')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 361, align: 'center' }}
                                flashFormat={{ bold: true }}
                                name="set_title"
                                verticalAlign="top"
                                layout={{ width: 365, marginLeft: 7, flexShrink: 0, maxWidth: 365 }}
                            />
                            <ThemeText
                                text={t(`special_items.${setKey}.header.desc`, '')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 361, align: 'center' }}
                                name="set_desc"
                                verticalAlign="top"
                                layout={{ width: 365, marginLeft: 7, flexShrink: 0, maxWidth: 365 }}
                            />
                        </Region>
                    </ScrollArea>
                </Border>
            </Region>
            <Region
                name="center"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 135, height: 220 }}
            >
                <Region
                    name="item_viewer"
                    layout={{ position: 'absolute', left: 40, width: 340, top: 0, height: 197, overflow: 'hidden' }}
                >
                    <ThemeImage
                        name="platform_img"
                        src={LayoutImage('catalog/special_items_item_platform.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                        layout={{ position: 'absolute', left: 8, top: 41 }}
                    />
                    <ThemeImage
                        name="spotlight_base_img"
                        src={LayoutImage('catalog/special_items_spotlight2.png')}
                        alpha={rotation.spotlightBlend}
                        bitmap={{ stretchedX: false, stretchedY: false, zoomX: 1.5, zoomY: 1.5, fitSizeToContents: true }}
                        layout={{ position: 'absolute', left: 124, top: 118 }}
                    />
                    <Region
                        name="item_rotation"
                        layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 197, overflow: 'hidden' }}
                    >
                        {items.map(item => (
                            <SpecialItemElement
                                key={`${setKey}:${item.index}`}
                                item={item}
                                position={rotation.placedPosition}
                                total={total}
                                blend={rotation.elementBlends[item.index] ?? 1}
                            />
                        ))}
                    </Region>
                    <ThemeImage
                        name="spotlight_img"
                        src={LayoutImage('catalog/special_items_spotlight1.png')}
                        alpha={rotation.spotlightBlend}
                        bitmap={{ stretchedX: false, stretchedY: false, zoomX: 1.5, zoomY: 1.5, fitSizeToContents: true }}
                        blendMode="add"
                        layout={{ position: 'absolute', left: 124, top: -100 }}
                    />
                </Region>
                <Region
                    name="previous_button"
                    dynamicStyle="brightness_and_shadow_under_gentle"
                    onPointerTap={showPreviousSpecialItem}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 33, top: 97, height: 38 }}
                >
                    <ThemeImage
                        src={LayoutImage('shared/icons_back.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                        dynamicRole="icon"
                        layout={{ position: 'absolute', left: 0, top: 4 }}
                    />
                </Region>
                <Region
                    name="next_button"
                    dynamicStyle="brightness_and_shadow_under_gentle"
                    onPointerTap={showNextSpecialItem}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 379, width: 33, top: 97, height: 38 }}
                >
                    <ThemeImage
                        src={LayoutImage('shared/icons_forward.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                        dynamicRole="icon"
                        layout={{ position: 'absolute', left: 0, top: 4 }}
                    />
                </Region>
                <Region
                    name="page_container"
                    layout={{ position: 'absolute', left: 39, width: 342, top: 207, height: 11 }}
                >
                    {/* `page_list` grows with its dots and stays centred in the container. */}
                    <Region
                        name="page_list"
                        layout={{ position: 'absolute', left: Math.trunc((342 - pageListWidth) / 2), top: 0, width: pageListWidth, height: 11, flexDirection: 'row', gap: PAGE_SPACING }}
                    >
                        {items.map(item => (
                            <Region
                                key={item.index}
                                name="page_template"
                                onPointerTap={() => showSpecialItem(item.index)}
                                cursor="pointer"
                                layout={{ width: PAGE_WIDTH, height: 11, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="page_image"
                                    src={LayoutImage((item.index === rotation.target) ? 'catalog/progress_disk_etched_on.png' : 'catalog/progress_disk_etched_off.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                    layout={{ position: 'absolute', left: 0, top: 0 }}
                                />
                            </Region>
                        ))}
                    </Region>
                </Region>
            </Region>
            {hasClaim && (
                <Border
                    variant="2"
                    name="claim_container"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 55, width: 310, top: 115, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', left: 16, top: 5, height: 30, flexDirection: 'row', gap: 10 }}>
                        <ThemeText
                            text={t('special_items.claim_info')}
                            textStyle="u_regular"
                            name="claim_txt"
                            verticalAlign="top"
                            layout={{ marginTop: 6, flexShrink: 0 }}
                        />
                        <Button
                            variant="4"
                            name="claim_btn"
                            disabled={claimState !== SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE}
                            onPointerTap={() => claimSpecialItems(send)}
                            layout={{ width: 55, height: 30, flexShrink: 0 }}
                        >
                            {t((claimState === SPECIAL_ITEMS_CLAIM_STATE_CLAIMED) ? 'special_items.claimed' : 'special_items.claim')}
                        </Button>
                    </Region>
                </Border>
            )}
            <Region
                name="bottom"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 135 }}
            >
                <Border
                    variant="2"
                    name="bottomborder_1"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 16, height: 110 }}
                />
                <Border
                    variant="2"
                    name="bottomborder_3"
                    tintColor="#5a5a5a"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 10, height: 110 }}
                />
                <Border
                    variant="2"
                    tintColor="#262626"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 9, height: 110 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        variant="100"
                        layout={{ position: 'absolute', left: 10, width: 374, top: 7, height: 97 }}
                    >
                        <Region
                            name="item_scroll_area"
                            layout={{ flexDirection: 'column', gap: 10, width: '100%' }}
                        >
                            <ThemeText
                                text={plaque?.name ?? ''}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 296 }}
                                flashFormat={{ bold: true }}
                                alpha={rotation.plaqueBlend}
                                name="item_title"
                                verticalAlign="top"
                                layout={{ width: 300, flexShrink: 0, maxWidth: 300 }}
                            />
                            <ThemeText
                                text={plaque?.description ?? ''}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 296 }}
                                alpha={rotation.plaqueBlend}
                                name="item_desc"
                                verticalAlign="top"
                                layout={{ width: 300, flexShrink: 0, maxWidth: 300 }}
                            />
                        </Region>
                    </ScrollArea>
                    {/* `product_icon`: `product_icon_xml`'s 46x40 bitmap at -3,0 of the 40x40 widget, centred. */}
                    <Region
                        name="product_icon"
                        layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                    >
                        {plaque && (
                            <ThemeImage
                                src={GetRoomEngine().getFurnitureFloorIconUrl(plaque.furniTypeId)}
                                alpha={rotation.plaqueBlend}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: -3, top: 0, width: 46, height: 40 }}
                            />
                        )}
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};
