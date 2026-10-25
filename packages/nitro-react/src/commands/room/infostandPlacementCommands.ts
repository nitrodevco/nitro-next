/**
 * The infostand's place more button - Flash's `InfoStandWidget.requestItemToMover` and
 * `onRoomObjectPlaced`: another of the furni on the stand is placed from the Builders Club, by its
 * builders club offer (`bcOfferId`). The ghost goes into the room as the infostand's
 * (`initializeRoomObjectInsert("info_stand", -bcOfferId, ...)`), and each drop in the room sends
 * `BuildersClubPlaceRoomItem` / `BuildersClubPlaceWallItem` for page -1 and starts the next one, so
 * the user keeps placing until they cancel. A drop off the room places nothing and ends it.
 *
 * Flash asks for the repeated placement (`initializeRoomObjectInsert`'s last argument), which keeps
 * a floor furni's direction from one drop to the next; the port's room placement has no repeated
 * placement, so each ghost starts at its default direction (as the catalogue's do).
 */
import { RoomEngineObjectPlacedEvent, RoomObjectCategoryEnum, RoomObjectPlacementSource } from '@nitrodevco/nitro-api';
import { BuildersClubPlaceRoomItemComposer, BuildersClubPlaceWallItemComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { InfostandPlaceMoreFurni, roomStore } from '#base/context/room';

import { initializeRoomObjectInsert } from '../catalog/catalogPlacementCommands';

/** `requestItemToMover`: the furni's ghost, as the infostand's, by its builders club offer. */
export const requestInfostandItemToMover = (furni: InfostandPlaceMoreFurni) => {
    roomStore.getState().setInfostandPlaceMoreFurni(furni);

    initializeRoomObjectInsert(RoomObjectPlacementSource.INFO_STAND, -furni.bcOfferId, furni.category, furni.classId, furni.extraParam || undefined);
};

/**
 * `onRoomObjectPlaced`: the infostand's ghost was put down. In the room - a floor furni on the
 * floor, a wall furni on a wall - it is placed from the Builders Club and the next ghost follows.
 */
export const onInfostandObjectPlaced = (send: Send, event: RoomEngineObjectPlacedEvent) => {
    const { objectPlacementSource, infostandPlaceMoreFurni: furni } = roomStore.getState();

    if ((objectPlacementSource !== RoomObjectPlacementSource.INFO_STAND) || !furni || !event.placedInRoom) return;

    switch (event.category) {
        case RoomObjectCategoryEnum.Floor:
            if (!event.placedOnFloor) return;

            send(new BuildersClubPlaceRoomItemComposer({ pageId: -1, offerId: furni.bcOfferId, extraParam: furni.extraParam, x: event.x, y: event.y, direction: event.direction }));
            break;
        case RoomObjectCategoryEnum.Wall:
            if (!event.placedOnWall) return;

            send(new BuildersClubPlaceWallItemComposer({ pageId: -1, offerId: furni.bcOfferId, extraParam: furni.extraParam, location: event.wallLocation }));
            break;
    }

    requestInfostandItemToMover(furni);
};
