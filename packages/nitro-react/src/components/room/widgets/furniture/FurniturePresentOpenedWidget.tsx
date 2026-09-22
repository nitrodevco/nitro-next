import { RoomGeometryScaleType, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectPlacementSource, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { RemovePetFromFlatComposer } from '@nitrodevco/nitro-packets';
import { GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { useEffect, useEffectEvent } from 'react';

import { initializeRoomObjectInsert } from '#base/commands';
import { useCatalogPurchaseStore } from '#base/context/catalog-purchase';
import { useWebSocketContext } from '#base/context/communication';
import { INVENTORY_FURNI_CATEGORY_POSTER, useInventoryStore } from '#base/context/inventory';
import { useRoomStore, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { useRoomEventDispatcher, useRoomObjectModify, useRoomObjectSelect } from '#base/hooks';
import { LayoutImage } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';
import { usePetImageTexture } from '#base/views/catalog/usePetImageTexture';
import { FurniturePresentOpenedIcon, FurniturePresentOpenedView } from '#base/views/room-widgets/furniture/FurniturePresentOpenedView';

import { PRESENT_OPENED_WIDGET, PresentOpenedData } from './furnitureWidgetData';

/** `FurniturePresentWidgetHandler`'s furni class names a wall item can change the room with. */
const SPACES_CLASS_NAMES = [ 'floor', 'landscape', 'wallpaper' ];
/** `requestSelectedFurniPlacement`: the wallpaper, floor and landscape categories, which never go to the mover. */
const ROOM_PLANE_CATEGORIES = [ 2, 3, 4 ];

/**
 * An opened gift - the `showGiftOpenedInterface` half of `PresentFurniWidget`, with what
 * `FurniturePresentWidgetHandler.processEvent` makes of `RSPE_PRESENT_OPENED`:
 *
 * - The prize's name and picture: a wall item whose class is `floor`, `landscape` or `wallpaper`
 *   is `inventory.furni.item.<class>.name` with `packagecard_icon_<class>`; a poster is its product
 *   name (else its furni name) with its wall icon for the number after `poster`; any other wall
 *   item its furni name and wall icon; club (`h`) is `widget.furni.present.hc` with
 *   `packagecard_icon_hc`; anything else its product name (else its furni name) with the pet (a
 *   placed pet with a figure) or the furni rendered at 64 facing 90 degrees. A wall item whose furni
 *   data is unknown sends nothing in Flash, and shows nothing here.
 * - `gift_message` is `widget.furni.present.message_opened` (`.spaces.` for a room plane item) with
 *   the name, or the name alone for club.
 * - Knowing the placed item (`updateRoomAndInventoryButtons`): the packet names it
 *   (`placedItemId`, `placedItemType`, `placedInRoom`), and `onRoomObjectRemoved` clears
 *   `placedInRoom` when an object of that id leaves the room. Keep shows while it is in the room,
 *   place while it is not, put in inventory always - none of the three for a room plane item or
 *   club. While placed it is selected in the room (`selectGiftedObject`): a pet by its user's
 *   `webID`, anything else as floor furni.
 * - Keep closes. Place sends the inventory's floor item `-placedItemId` or wall item
 *   `placedItemId` to the room's object mover (`HabboInventory.requestSelectedFurniToMover`, never
 *   for a wallpaper, floor or landscape category). Put in inventory picks the pet up
 *   (`pickUpPet`) or the floor furni (`OBJECT_PICKUP`). All three close the card.
 * - `give_gift_button` (`onGiveGiftOpened` -> `openGiftShop`): the sender becomes the catalogue's
 *   gift receiver and the `gift_shop` page opens.
 *
 * Not carried out: placing a pet (`placePetToRoom`) - the room's pet placement is not ported, so
 * the card closes and the pet stays in the inventory - and `removeUnseenFurniCounter` /
 * `removeUnseenPetCounter`, since the port has no unseen item tracker. The pet render is always
 * at the 64 scale, where Flash draws type 15 at 32: `usePetImageTexture` takes no scale.
 */
export const FurniturePresentOpenedWidget = () => {
    const request = useRoomWidget<PresentOpenedData>(PRESENT_OPENED_WIDGET);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const productData = useSystemStore(x => x.productData);
    const furniGroups = useInventoryStore(x => x.furniGroups);
    const usersByRoomObjectId = useRoomStore(x => x.usersByRoomObjectId);
    const setGiftReceiver = useCatalogPurchaseStore(x => x.setGiftReceiver);
    const { closeRoomWidget, mergeRoomWidgetData } = useRoomWidgetActions();
    const { showWindow } = useWindowActions();
    const { modifyRoomObject } = useRoomObjectModify();
    const { selectObject } = useRoomObjectSelect();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const data = request?.data;
    const contents = data?.contents;

    // `onRoomObjectRemoved`: the placed item leaving the room is no longer there to keep.
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([ RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED ], (event) => {
        if (!contents?.placedInRoom || (event.objectId !== contents.placedItemId)) return;

        mergeRoomWidgetData<PresentOpenedData>(PRESENT_OPENED_WIDGET, previous => ({
            contents: previous.contents && { ...previous.contents, placedInRoom: false },
        }));
    });

    const wallFurniData = (contents?.itemType === 'i') ? wallItems[contents.classId] : undefined;
    const floorFurniData = contents ? floorItems[contents.classId] : undefined;
    const isSpacesItem = !!wallFurniData && SPACES_CLASS_NAMES.includes(wallFurniData.className);
    const isClubItem = contents?.itemType === 'h';
    const petFigure = (contents && (contents.itemType !== 'i') && !isClubItem && (contents.placedItemType === 'p') && contents.petFigureString.length) ? new PetFigureData(contents.petFigureString) : undefined;
    const petTexture = usePetImageTexture(petFigure && { typeId: petFigure.typeId, paletteId: petFigure.paletteId, color: petFigure.color, direction: 90, customParts: petFigure.customParts });
    const furniImage = useFurnitureImageTexture((contents && (contents.itemType !== 'i') && !isClubItem && !petFigure) ? floorFurniData?.className : undefined, floorFurniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

    // `selectGiftedObject`, once the contents are in.
    const selectGiftedObject = useEffectEvent(() => {
        if (!contents || (contents.placedItemId <= 0) || !contents.placedInRoom) return;

        if (contents.placedItemType !== 'p') {
            selectObject(contents.placedItemId, RoomObjectCategoryEnum.Floor);

            return;
        }

        const unit = Object.entries(usersByRoomObjectId).find(([ , user ]) => user.webID === contents.placedItemId);

        if (unit) selectObject(Number(unit[0]), RoomObjectCategoryEnum.Unit);
    });

    useEffect(() => {
        if (contents) selectGiftedObject();
    }, [ contents ]);

    if (!request || !data || !contents) return null;

    let name: string;
    let icon: FurniturePresentOpenedIcon;

    const productName = productData[contents.productCode]?.name;

    switch (contents.itemType) {
        case 'i': {
            if (!wallFurniData) return null;

            if (isSpacesItem) {
                name = t(`inventory.furni.item.${wallFurniData.className}.name`);
                icon = { src: LayoutImage(`room-ui/packagecard_icon_${wallFurniData.className}.png`) };
            } else if (wallFurniData.className === 'poster') {
                // `int(productCode.replace("poster", ""))`: 0 for anything that is not a number.
                const posterId = contents.productCode.startsWith('poster') ? String(Math.trunc(Number(contents.productCode.replace('poster', ''))) || 0) : undefined;

                name = productName ?? wallFurniData.localizedName;
                icon = { src: GetRoomEngine().getFurnitureWallIconUrl(contents.classId, posterId) };
            } else {
                name = wallFurniData.localizedName;
                icon = { src: GetRoomEngine().getFurnitureWallIconUrl(contents.classId, undefined) };
            }

            break;
        }
        case 'h':
            name = t('widget.furni.present.hc');
            icon = { src: LayoutImage('room-ui/packagecard_icon_hc.png') };
            break;
        default:
            name = productName ?? ((contents.itemType === 's') ? (floorFurniData?.localizedName ?? '') : '');
            icon = { texture: petFigure ? petTexture : furniImage.texture };
    }

    const message = isClubItem ? name : t(isSpacesItem ? 'widget.furni.present.spaces.message_opened' : 'widget.furni.present.message_opened', name, { product: name });

    const onClose = () => closeRoomWidget(PRESENT_OPENED_WIDGET);

    const onPlaceInRoom = () => {
        if ((contents.placedItemId > 0) && !contents.placedInRoom) {
            switch (contents.placedItemType) {
                case 's':
                case 'i': {
                    // `getFloorItemById(-placedItemId)` / `getWallItemById(placedItemId)`.
                    const isWallItem = (contents.placedItemType === 'i');
                    const stripId = isWallItem ? contents.placedItemId : -contents.placedItemId;
                    const item = furniGroups.flatMap(group => group.items).find(entry => (entry.id === stripId) && (entry.isWallItem === isWallItem));

                    if (item && !ROOM_PLANE_CATEGORIES.includes(item.category)) {
                        initializeRoomObjectInsert(
                            RoomObjectPlacementSource.INVENTORY,
                            item.id,
                            item.isWallItem ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor,
                            item.typeId,
                            (item.category === INVENTORY_FURNI_CATEGORY_POSTER) ? item.stuffData.getLegacyString() : item.extra.toString(),
                            (item.category === INVENTORY_FURNI_CATEGORY_POSTER) ? undefined : item.stuffData,
                        );
                    }

                    break;
                }
            }
        }

        onClose();
    };

    const onPutInInventory = () => {
        if ((contents.placedItemId > 0) && contents.placedInRoom) {
            if (contents.placedItemType === 'p') send(new RemovePetFromFlatComposer({ petId: contents.placedItemId }));
            else modifyRoomObject(contents.placedItemId, RoomObjectCategoryEnum.Floor, RoomObjectOperationType.OBJECT_PICKUP);
        }

        onClose();
    };

    const onGiveGift = () => {
        if (data.senderName.length) setGiftReceiver(data.senderName);

        showWindow('catalog', { pageName: 'gift_shop' });
    };

    return (
        <FurniturePresentOpenedView
            senderName={data.senderName}
            senderFigure={data.senderFigure}
            trustedSender={data.trustedSender}
            message={message}
            icon={icon}
            showKeepInRoom={contents.placedInRoom && !isSpacesItem && !isClubItem}
            showPlaceInRoom={!contents.placedInRoom && !isSpacesItem && !isClubItem}
            showPutInInventory={!isSpacesItem && !isClubItem}
            onKeepInRoom={onClose}
            onPlaceInRoom={onPlaceInRoom}
            onPutInInventory={onPutInInventory}
            onGiveGift={onGiveGift}
            onClose={onClose}
        />
    );
};
