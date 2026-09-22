import { IPurchasableOffer, RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useRef, useState } from 'react';

import { requestSelectedItemToMover } from '#base/commands';
import { CatalogWidgetEventEnum, CatalogWidgetUpdateRoomPreviewEvent, useCatalogStoreApi } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region } from '#base/theme';

import { useRoomEngineTexture } from '../../useRoomEngineTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `onUpdateRoomPreview`'s window: the wall item drawn over the room and cut into its wall. */
const PREVIEW_WINDOW_TYPE = 'window_double_default';
/** `setRoomImage`'s nudge of the room from the bitmap's centre. */
const ROOM_OFFSET_X = -45;
const ROOM_OFFSET_Y = 20;
/** `catalog_floor_preview_example`'s size in `layout_spaces_new`. */
const PREVIEW_WIDTH = 360;
const PREVIEW_HEIGHT = 240;

/**
 * The spaces page's room preview, Flash's `RoomPreviewCatalogWidget` - the layout's
 * `roomPreviewWidget` container (360x240), whose `catalog_floor_preview_example` bitmap it draws
 * into. The layout's other two bitmaps (`catalog_wall_preview_b_right`,
 * `catalog_space_preview_window`) name no asset and nothing fills them, so they draw nothing.
 *
 * `onUpdateRoomPreview` (`CatalogWidgetUpdateRoomPreviewEvent`, sent by the spaces widget) renders
 * a small room with the chosen floor, wall and landscape (`RoomEngine.getRoomImage`, with
 * `window_double_default`'s mask cut into its wall) and that window on its own
 * (`getGenericRoomObjectImage` at direction 180), both at the event's tile size. `setRoomImage`
 * draws them once both are there: the room centred in the bitmap and moved 45px left and 20px
 * down, and the window with its left edge 1px right of that moved centre (x 136) and its bottom
 * 44px under it (y 184). Either picture still downloading fills in when the engine calls back.
 *
 * `eventProc`: a press on the preview that leaves it with the button still down hands the selected
 * offer (the last `SelectProductEvent`) to the catalogue's object mover
 * (`requestSelectedItemToMover`, the widget as the drop's receiver); a drop in the room buys it
 * (`onDragAndDropDone` -> `CatalogWidgetInitPurchaseEvent`, no gift, the avatar it was dropped on).
 */
export const CatalogRoomPreviewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ preview, setPreview ] = useState<CatalogWidgetUpdateRoomPreviewEvent | undefined>(undefined);
    const offer = useRef<IPurchasableOffer | undefined>(undefined);
    const pressed = useRef(false);
    const store = useCatalogStoreApi();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.UPDATE_ROOM_PREVIEW, event => setPreview(event));

    // `onPreviewProduct`: the offer a drag would place.
    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        offer.current = event.offer;
    });

    const onPointerOut = () => {
        if (!pressed.current || !offer.current) return;

        pressed.current = false;

        requestSelectedItemToMover(store, {
            // `onDragAndDropDone`: the page's purchase flow buys what was dropped.
            onDragAndDropDone: (placed, userName) => {
                if (placed) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.INIT_PURCHASE, enableBuyAsGift: false, userName });
            },
        }, offer.current);
    };

    const key = preview ? `${preview.floorType}\n${preview.wallType}\n${preview.landscapeType}\n${preview.tileSize}` : undefined;
    const scale = (preview?.tileSize ?? RoomGeometryScaleType.ZoomedIn);

    const room = useRoomEngineTexture(key, listener => GetRoomEngine().getRoomTexture(preview?.floorType, preview?.wallType, preview?.landscapeType, scale, listener, PREVIEW_WINDOW_TYPE));
    const windowImage = useRoomEngineTexture(key, listener => GetRoomEngine().getGenericRoomObjectTexture(PREVIEW_WINDOW_TYPE, '', new Vector3d(180, 0, 0), scale, listener));

    const ready = !!room && !!windowImage;
    const roomX = Math.trunc(((PREVIEW_WIDTH - (room?.width ?? 0)) / 2) + ROOM_OFFSET_X);
    const roomY = Math.trunc(((PREVIEW_HEIGHT - (room?.height ?? 0)) / 2) + ROOM_OFFSET_Y);
    const windowX = Math.trunc((PREVIEW_WIDTH / 2) + ROOM_OFFSET_X) + 1;
    const windowY = Math.trunc((PREVIEW_HEIGHT / 2) + ROOM_OFFSET_Y - (windowImage?.height ?? 0)) + 44;

    return (
        <Region
            name="catalog_floor_preview_example"
            onPointerDown={() => {
                pressed.current = true;
            }}
            onPointerUp={() => {
                pressed.current = false;
            }}
            onPointerOut={onPointerOut}
            layout={{ position: 'absolute', left: 0, width: PREVIEW_WIDTH, top: 0, height: PREVIEW_HEIGHT, overflow: 'hidden' }}
        >
            {ready && (
                <>
                    <pixiSprite
                        texture={room}
                        layout={{ position: 'absolute', left: roomX, top: roomY, width: room.width, height: room.height }}
                    />
                    <pixiSprite
                        texture={windowImage}
                        layout={{ position: 'absolute', left: windowX, top: windowY, width: windowImage.width, height: windowImage.height }}
                    />
                </>
            )}
        </Region>
    );
};
