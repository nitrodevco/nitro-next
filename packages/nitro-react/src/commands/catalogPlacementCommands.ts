/**
 * Dragging a catalogue offer into the room and buying it where it lands - the object mover half
 * of Flash's `HabboCatalog`: `isDraggable`, `requestSelectedItemToMover`, `onObjectPlacedInRoom`,
 * `onObjectPlaceOnUser`, `resetObjectMover`, `resetPlacedOfferData`, `syncPlacedOfferWithPurchase`,
 * `cancelFurniInMover` and `itemAddedToInventory`, with the two room engine calls they make
 * (`RoomEngine.initializeRoomObjectInsert` / `cancelRoomObjectInsert`, which
 * `RoomObjectEventHandler` carries out).
 *
 * A widget starts a drag with `requestSelectedItemToMover(store, receiver, offer)` - the item grid
 * (`ItemGridCatalogWidget.startDragAndDrop`), the product view and the room preview pass
 * themselves as the receiver, the builders club widget none. The catalogue window hides, and the
 * room's own placement (`useRoomObjectPlace`) moves the ghost and, on the click, dispatches
 * `REOE_PLACED` without sending anything, because the placement source is the catalogue. The
 * catalogue's purchase flow (`useCatalogPurchaseFlow`) hands that event here: in the normal
 * catalogue the object stays in the room half transparent while its purchase confirmation is
 * open (the receiver's `onDragAndDropDone` starts it), and once the bought item reaches the
 * inventory it is placed exactly there (`itemAddedToInventory`); in the builders club the
 * placement is the purchase.
 *
 * Two Flash quirks are kept. The floor object put back for the confirmation gets
 * `new Vector3d(direction)` with the placed event's 0-7 direction index, where the wall item gets
 * `direction * 45` degrees. And `itemAddedToInventory` switches on the placed object's room
 * category (10 or 20) against the inventory's wallpaper, floor and landscape categories (2, 3, 4),
 * which never match: every dropped item, a wallpaper too, is placed with `PlaceObjectMessageComposer`.
 * `RoomObjectEventHandler`'s repeated placement (`recalibrateMovements` for the builders club's
 * `param11`) is not in the port's room placement; the builders club's repeated drop still starts
 * the next drag, the ghost just starts at its default direction.
 */
import { CatalogPricingModelEnum, CatalogTypeEnum, FurnitureTypeEnum, IObjectData, IPurchasableOffer, LegacyDataType, RoomControllerLevelEnum, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectPlacementSource, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { BuildersClubPlaceRoomItemComposer, BuildersClubPlaceWallItemComposer, PlaceObjectComposer } from '@nitrodevco/nitro-packets';
import { SelectedRoomObjectData } from '@nitrodevco/nitro-renderer';
import { StoreApi } from 'zustand';

import { CATALOG_SEARCH_PAGE_ID, CatalogStore, CatalogWidgetEventEnum, getCatalogWindowName } from '#base/context/catalog';
import { CatalogPlacedObjectPurchaseData, catalogPurchaseStore, ICatalogDragAndDropReceiver } from '#base/context/catalog-purchase';
import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { getOfferProduct } from '#base/utils';

import { BUILDER_FURNI_PLACEABLE_STATUS_OKAY, getBuilderFurniPlaceableStatusForOffer } from './catalogBuildersClubCommands';

type Send = WebSocketConnection['send'];
type CatalogStoreApi = StoreApi<CatalogStore>;

/** `updateRoom`'s defaults when the room has no pattern of its own yet. */
const DEFAULT_WALL_TYPE = '101';
const DEFAULT_FLOOR_TYPE = '101';
const DEFAULT_LANDSCAPE_TYPE = '1.1';

/** The furni classes that change a room plane instead of being an object in it. */
const ROOM_PLANE_CLASSES = [ 'floor', 'wallpaper', 'landscape' ];

/**
 * `hideMainWindow` / `showMainWindow` for the catalogue a drag started from (the normal or the
 * builders club window), marked as the mover's own change.
 */
const setCatalogWindowVisible = (store: CatalogStoreApi, visible: boolean) => {
    const { visibleWindows, showWindow, hideWindow } = systemStore.getState();
    const windowName = getCatalogWindowName(store.getState().catalogType);

    if (!!visibleWindows[windowName] === visible) return;

    catalogPurchaseStore.getState().setWindowToggledByMover(true);

    if (visible) showWindow(windowName);
    else hideWindow(windowName);
};

/**
 * `RoomObjectEventHandler.initializeRoomObjectInsert`: the object to place becomes the room's
 * selected object in `OBJECT_PLACE` at (-100, -100), and the overlay icon is made for it but
 * hidden until the pointer leaves the room. Not in a public room (`room_is_public`). The
 * inventory's placements (`HabboInventory.requestSelectedFurniToMover`) pass the item's stuff
 * data as well, and a monster plant dragged in from the pets page passes the posture its growth
 * stage names (`PetsModel.placePetToRoom`).
 */
export const initializeRoomObjectInsert = (source: string, objectId: number, category: RoomObjectCategoryEnum, typeId: number, instanceData: string | undefined, stuffData?: IObjectData, posture?: string): boolean => {
    const room = getRoom();

    if (!room || (room.getRoomValue<number>(RoomObjectVariableEnum.RoomIsPublic) ?? 0) !== 0) return false;

    const { setSelectedObject, setObjectPlacementSource } = roomStore.getState();

    cancelRoomObjectInsert();
    setObjectPlacementSource(source);
    setSelectedObject(new SelectedRoomObjectData(objectId, category, RoomObjectOperationType.OBJECT_PLACE, new Vector3d(-100, -100), new Vector3d(0), typeId, instanceData, stuffData, -1, -1, posture));

    void (async () => {
        await room.setRoomOverlayIconSprite(typeId, category, false, instanceData ?? '');

        room.setRoomOverlayIconSpriteVisibility(false);
    })();

    return true;
};

/**
 * `RoomObjectEventHandler.cancelRoomObjectInsert` -> `resetSelectedObjectData`: whatever is
 * being placed or moved goes back - a placed ghost is removed, a moved object returns to where it
 * was - and nothing is selected for an operation any more.
 */
export const cancelRoomObjectInsert = () => {
    const room = getRoom();
    const { selectedObject, setSelectedObject } = roomStore.getState();

    if (!room || !selectedObject) return;

    room.removeRoomOverlayIconSprite();

    if ((selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE) || (selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE_TO)) {
        const roomObject = room.getRoomObject(selectedObject.objectId, selectedObject.category);

        if (roomObject) {
            if (selectedObject.operation !== RoomObjectOperationType.OBJECT_MOVE_TO) {
                roomObject.setLocation(selectedObject.loc);
                roomObject.setDirection(selectedObject.dir);
            }

            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 1);
        }

        if (selectedObject.category === RoomObjectCategoryEnum.Wall) room.updateRoomObjectMask(selectedObject.objectId, true);
    } else if (selectedObject.operation === RoomObjectOperationType.OBJECT_PLACE) {
        switch (selectedObject.category) {
            case RoomObjectCategoryEnum.Floor:
                room.removeRoomObjectFloor(selectedObject.objectId);
                break;
            case RoomObjectCategoryEnum.Wall:
                room.removeRoomObjectWall(selectedObject.objectId);
                break;
            case RoomObjectCategoryEnum.Unit:
                room.removeRoomObject(selectedObject.objectId, RoomObjectCategoryEnum.Unit);
                break;
        }
    }

    setSelectedObject(undefined);
};

/**
 * `updateRoom(type, pattern)`: preview a floor, wallpaper or landscape on the room's planes, the
 * other two kept as they are; `reset` puts all three back to the room's own.
 */
const updateRoom = (type: string, pattern: string) => {
    const room = getRoom();

    if (!room) return;

    const wallType = room.getRoomValue<string>(RoomObjectVariableEnum.RoomWallType) || DEFAULT_WALL_TYPE;
    const floorType = room.getRoomValue<string>(RoomObjectVariableEnum.RoomFloorType) || DEFAULT_FLOOR_TYPE;
    const landscapeType = room.getRoomValue<string>(RoomObjectVariableEnum.RoomLandscapeType) || DEFAULT_LANDSCAPE_TYPE;

    switch (type) {
        case 'floor':
            room.updateRoomPlaneType(pattern, wallType, landscapeType);
            return;
        case 'wallpaper':
            room.updateRoomPlaneType(floorType, pattern, landscapeType);
            return;
        case 'landscape':
            room.updateRoomPlaneType(floorType, wallType, pattern);
            return;
        default:
            room.updateRoomPlaneType(floorType, wallType, landscapeType);
    }
};

/**
 * `isDraggable`: `catalog.drag_and_drop` on, a room, a page that allows dragging, the rights to
 * place (the owner, or a group room member in the normal catalogue; the builders club's own
 * placeable status), and a single furni - no bundle, no multi-pack, no effect, no club.
 */
export const isCatalogOfferDraggable = (store: CatalogStoreApi, offer: IPurchasableOffer): boolean => {
    const { catalogType, activePage } = store.getState();
    const { isRoomOwner, isGuildRoom, controllerLevel } = roomStore.getState();
    const product = getOfferProduct(offer);

    if ((systemStore.getState().config['catalog.drag_and_drop'] !== true) || !getRoom()) return false;
    if (activePage && !activePage.allowDragging) return false;

    const mayPlace = (catalogType === CatalogTypeEnum.Normal)
        ? (isRoomOwner || (isGuildRoom && (Number(controllerLevel) >= Number(RoomControllerLevelEnum.GuildMember))))
        : ((catalogType === CatalogTypeEnum.BuildersClub) && (getBuilderFurniPlaceableStatusForOffer(store, offer) === BUILDER_FURNI_PLACEABLE_STATUS_OKAY));

    if (!mayPlace) return false;

    return (offer.pricingModel !== CatalogPricingModelEnum.Bundle) && (offer.pricingModel !== CatalogPricingModelEnum.Multi) && !!product
        && (product.productType !== FurnitureTypeEnum.Effect) && (product.productType !== FurnitureTypeEnum.HabboClub);
};

/**
 * `requestSelectedItemToMover(receiver, offer, repeat)`: start placing the offer's furni in the
 * room as the catalogue's (`-offerId`, so it can never be a real object), and hide the catalogue
 * while it is placed. Flash leaves a product that is neither floor nor wall furni at category 0;
 * Sulake's own later client refuses it, and so does this.
 */
export const requestSelectedItemToMover = (store: CatalogStoreApi, receiver: ICatalogDragAndDropReceiver | undefined, offer: IPurchasableOffer, repeatPlacement: boolean = false) => {
    if (!isCatalogOfferDraggable(store, offer)) return;

    const product = getOfferProduct(offer);

    if (!product) return;

    let category: RoomObjectCategoryEnum;

    switch (product.productType) {
        case FurnitureTypeEnum.Floor:
            category = RoomObjectCategoryEnum.Floor;
            break;
        case FurnitureTypeEnum.Wall:
            category = RoomObjectCategoryEnum.Wall;
            break;
        default:
            return;
    }

    if (!initializeRoomObjectInsert(RoomObjectPlacementSource.CATALOG, -offer.offerId, category, product.classId, product.extraParam || undefined)) return;

    const { setOfferInFurniPlacing, setIsObjectMoverRequested, setCatalogStore } = catalogPurchaseStore.getState();

    setOfferInFurniPlacing(offer, receiver, repeatPlacement);
    setCatalogStore(store);
    setCatalogWindowVisible(store, false);
    setIsObjectMoverRequested(true);
};

/**
 * `resetObjectMover(showWindow)`: the drag is over; unless told otherwise the catalogue comes back
 * and its page hears that the room may have changed (`dispatchRoomChangedToCatalogPage`).
 */
export const resetObjectMover = (showWindow: boolean = true) => {
    const { isObjectMoverRequested, catalogStore, setIsObjectMoverRequested, setCallbackReceiver } = catalogPurchaseStore.getState();

    if (showWindow && isObjectMoverRequested && catalogStore) {
        setCatalogWindowVisible(catalogStore, true);

        catalogStore.getState().activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.ROOM_CHANGED });
    }

    setIsObjectMoverRequested(false);
    setCallbackReceiver(undefined);
};

/**
 * `resetPlacedOfferData(keepMover)`: the object put in the room for a purchase goes - the preview
 * furni, or the room's own planes back for a floor, wallpaper or landscape - and, unless
 * `keepMover`, the mover is reset too.
 */
export const resetPlacedOfferData = (keepMover: boolean = false) => {
    if (!keepMover) resetObjectMover();

    const { placedObjectPurchaseData: placed, setPlacedObjectPurchaseData } = catalogPurchaseStore.getState();

    if (!placed) return;

    const room = getRoom();

    if (room && (room.roomId === placed.roomId)) {
        if (placed.category === RoomObjectCategoryEnum.Floor) {
            room.removeRoomObjectFloor(placed.objectId);
        } else if (placed.category === RoomObjectCategoryEnum.Wall) {
            if (ROOM_PLANE_CLASSES.includes(placed.furniClassName)) updateRoom('reset', '');
            else room.removeRoomObjectWall(placed.objectId);
        } else {
            room.removeRoomObject(placed.objectId, placed.category);
        }
    }

    setPlacedObjectPurchaseData(undefined);
};

/** `syncPlacedOfferWithPurchase`: a purchase of another offer drops the placed one. */
export const syncPlacedOfferWithPurchase = (offer: IPurchasableOffer) => {
    const { placedObjectPurchaseData } = catalogPurchaseStore.getState();

    if (placedObjectPurchaseData && (placedObjectPurchaseData.offerId !== offer.offerId)) resetPlacedOfferData();
};

/** `cancelFurniInMover`: an offer still in the mover is taken off it. */
export const cancelFurniInMover = () => {
    const { offerInFurniPlacing, setOfferInFurniPlacing, setIsObjectMoverRequested, callbackReceiver, repeatPlacement } = catalogPurchaseStore.getState();

    if (!offerInFurniPlacing) return;

    cancelRoomObjectInsert();
    setIsObjectMoverRequested(false);
    setOfferInFurniPlacing(undefined, callbackReceiver, repeatPlacement);
};

/**
 * `toggleCatalog`'s part in the mover: whenever the user opens or closes the catalogue, an offer
 * still being placed is cancelled. The mover's own hiding and showing are not a toggle; the answer
 * says whether this change was one.
 */
export const onCatalogWindowToggled = (): boolean => {
    const { windowToggledByMover, setWindowToggledByMover } = catalogPurchaseStore.getState();

    if (windowToggledByMover) {
        setWindowToggledByMover(false);

        return false;
    }

    cancelFurniInMover();

    return true;
};

/**
 * `onObjectPlacedInRoom`: the catalogue's object was put down - heard by the catalogue the drag
 * started from (each catalogue window listens, as Flash's one `HabboCatalog` does). Placed outside the room (a
 * wallpaper counts when it is over a floor or a wall), the drag just ends. Otherwise the place is
 * kept for the purchase and the receiver is told; the normal catalogue puts a half transparent
 * copy where it landed, the builders club buys it by placing it and starts the next drag when it
 * repeats, or toggles the builders club catalogue (`toggleBuilderCatalog`) when it does not.
 */
export const onObjectPlacedInRoom = (send: Send, store: CatalogStoreApi, event: RoomEngineObjectPlacedEvent) => {
    const { isObjectMoverRequested, offerInFurniPlacing: offer, callbackReceiver, catalogStore, repeatPlacement, setPlacedObjectPurchaseData } = catalogPurchaseStore.getState();

    if ((catalogStore !== store) || !isObjectMoverRequested || (event.type !== RoomEngineObjectEvent.PLACED) || (roomStore.getState().objectPlacementSource !== RoomObjectPlacementSource.CATALOG)) return;

    resetPlacedOfferData(true);

    const product = offer ? getOfferProduct(offer) : undefined;

    if (!offer || !product) {
        resetObjectMover();

        return;
    }

    const className = product.furnitureData?.className ?? '';
    const placed = ((event.category === RoomObjectCategoryEnum.Wall) && ROOM_PLANE_CLASSES.includes(className)) ? (event.placedOnFloor || event.placedOnWall) : event.placedInRoom;

    if (!placed) {
        resetObjectMover();

        return;
    }

    const placedData: CatalogPlacedObjectPurchaseData = {
        roomId: event.roomId,
        objectId: event.objectId,
        category: event.category,
        wallLocation: event.wallLocation,
        x: event.x,
        y: event.y,
        direction: event.direction,
        offerId: offer.offerId,
        productClassId: product.classId,
        extraParameter: product.extraParam,
        furniClassName: className,
    };

    setPlacedObjectPurchaseData(placedData);

    callbackReceiver?.onDragAndDropDone(true, undefined);

    const { catalogType, offersToNodes } = store.getState();

    if (catalogType === CatalogTypeEnum.BuildersClub) {
        let pageId = offer.page?.pageId ?? -1;

        // `currentCatalogNavigator.getNodesByOfferId(offerId, true)`: a search hit is placed for its first visible page.
        if (pageId === CATALOG_SEARCH_PAGE_ID) {
            const nodes = (offersToNodes[offer.offerId] ?? []).filter(node => node.visible);

            if (nodes.length) pageId = nodes[0].pageId;
        }

        if (event.category === RoomObjectCategoryEnum.Floor) send(new BuildersClubPlaceRoomItemComposer({ pageId, offerId: offer.offerId, extraParam: product.extraParam, x: event.x, y: event.y, direction: event.direction }));
        else if (event.category === RoomObjectCategoryEnum.Wall) send(new BuildersClubPlaceWallItemComposer({ pageId, offerId: offer.offerId, extraParam: product.extraParam, location: event.wallLocation }));

        if (repeatPlacement) requestSelectedItemToMover(store, callbackReceiver, offer, true);
        else systemStore.getState().toggleWindow(getCatalogWindowName(CatalogTypeEnum.BuildersClub));

        return;
    }

    const room = getRoom();

    // The receiver's purchase may have been refused already (a short purse clears the placement
    // as its alert opens, where Flash clears it as the alert closes): then nothing is put back.
    if (!room || (catalogPurchaseStore.getState().placedObjectPurchaseData !== placedData)) return;

    if (event.category === RoomObjectCategoryEnum.Floor) {
        room.addFurnitureFloorByTypeId(event.objectId, product.classId, new Vector3d(event.x, event.y, event.z), new Vector3d(event.direction), 0, new LegacyDataType());
    } else if (event.category === RoomObjectCategoryEnum.Wall) {
        if (ROOM_PLANE_CLASSES.includes(className)) updateRoom(className, product.extraParam);
        else room.addFurnitureWallByTypeId(event.objectId, product.classId, new Vector3d(event.x, event.y, event.z), new Vector3d(event.direction * 45), 0, event.instanceData, 0);
    }

    room.getRoomObject(event.objectId, event.category)?.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 0.5);
};

/**
 * `onObjectPlaceOnUser`: the offer was dropped on an avatar - the receiver hears whose, and the
 * drag ends without the catalogue coming back.
 */
export const onObjectPlacedOnUser = (store: CatalogStoreApi, event: RoomEngineObjectPlacedOnUserEvent) => {
    const { isObjectMoverRequested, offerInFurniPlacing, callbackReceiver, catalogStore } = catalogPurchaseStore.getState();

    if ((catalogStore !== store) || !isObjectMoverRequested || (event.type !== RoomEngineObjectEvent.PLACED_ON_USER)) return;

    resetPlacedOfferData(true);

    if (!offerInFurniPlacing) {
        resetObjectMover();

        return;
    }

    const userName = roomStore.getState().usersByRoomObjectId[event.objectId]?.name;

    callbackReceiver?.onDragAndDropDone(true, userName);
    resetObjectMover(false);
    cancelFurniInMover();
};

/**
 * `itemAddedToInventory(typeId, itemId)`: the item bought for a drop has arrived, so it is placed
 * where the offer was put down, if that room is still the one on show.
 */
export const itemAddedToInventory = (send: Send, typeId: number, itemId: number) => {
    const { placedObjectPurchaseData: placed } = catalogPurchaseStore.getState();
    const room = getRoom();

    if (!placed || (placed.productClassId !== typeId) || !room || (room.roomId !== placed.roomId)) return;

    send(new PlaceObjectComposer({ itemId, category: placed.category, wallLocation: placed.wallLocation, x: placed.x, y: placed.y, rotation: placed.direction }));

    resetPlacedOfferData();
};
