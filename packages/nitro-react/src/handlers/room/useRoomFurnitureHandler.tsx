/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Vector3d } from "@nitrodevco/nitro-api";
import { ItemAddMessage, ItemDataUpdateMessage, ItemRemoveMessage, ItemsMessage, ItemsStateUpdateMessage, ItemStateUpdateMessage, ItemUpdateMessage, ObjectAddMessage, ObjectDataUpdateMessage, ObjectRemoveMessage, ObjectRemoveMultipleMessage, ObjectsDataUpdateMessage, ObjectsMessage, ObjectUpdateMessage } from "@nitrodevco/nitro-shared";

import { useRoomSelector } from "#base/context";
import { useMessageListener } from "#base/hooks";

import type { IRoomFloorItem } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomFloorItem";
import type { IRoomWallItem } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomWallItem";

export const useRoomFurnitureHandler = () => {
    const room = useRoomSelector();

    const addRoomObjectFloor = (item: IRoomFloorItem) => {
        if (!room) return;

        const location = new Vector3d(item.x, item.y, item.z);
        const direction = new Vector3d(item.rotation);

        if (item.spriteName) {
            room.addFurnitureFloorByTypeName(item.objectId, item.spriteName, location, direction, item.stuffData.state, item.stuffData, item.extra, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true, item.stackHeight);
        } else {
            room.addFurnitureFloorByTypeId(item.objectId, item.spriteId, location, direction, item.stuffData.state, item.stuffData, item.extra, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true, item.stackHeight);
        }
    }

    const addRoomObjectWall = (item: IRoomWallItem) => {
        if (!room || !room.legacyGeometry) return;

        const wallPosition = room.legacyGeometry.getLocationFromString(item.wallPosition);
        const location = room.legacyGeometry.getLocation(wallPosition.width, wallPosition.height, wallPosition.localX, wallPosition.localY, wallPosition.direction);
        const direction = new Vector3d(room.legacyGeometry.getDirection(wallPosition.direction));

        room.addFurnitureWallByTypeId(item.objectId, item.spriteId, location, direction, item.state, item.data, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true);
    }

    useMessageListener(ObjectAddMessage, data => {
        if (!room) return;

        addRoomObjectFloor(data.floorItem);
    });

    useMessageListener(ObjectDataUpdateMessage, data => {
        if (!room) return;

        room.updateRoomObjectFloor(data.objectId, undefined, undefined, data.stuffData.state, data.stuffData);
    });

    useMessageListener(ObjectRemoveMessage, data => {
        if (!room) return;

        const isOwner = false;

        if (data.delay > 0) {
            setTimeout(() => {
                if (!room) return;

                room.removeRoomObjectFloor(data.objectId, isOwner);
            }, data.delay);
        } else {
            room.removeRoomObjectFloor(data.objectId, isOwner);
        }
    });

    useMessageListener(ObjectRemoveMultipleMessage, data => {
        if (!room) return;

        for (const objectId of data.objectIds) {
            const isOwner = false;

            room.removeRoomObjectFloor(objectId, isOwner);
        }
    });

    useMessageListener(ObjectsDataUpdateMessage, data => {
        if (!room) return;

        for (const stuffData of data.stuffDatas) room.updateRoomObjectFloor(stuffData.objectId, undefined, undefined, stuffData.stuffData.state, stuffData.stuffData);
    });

    useMessageListener(ObjectsMessage, data => {
        if (!room) return;

        for (const item of data.floorItems) addRoomObjectFloor(item);
    });

    useMessageListener(ObjectUpdateMessage, data => {
        if (!room) return;

        const item = data.floorItem;

        const location = new Vector3d(item.x, item.y, item.z);
        const direction = new Vector3d(item.rotation);

        room.updateRoomObjectFloor(item.objectId, location, direction, item.stuffData.state, item.stuffData, item.extra);
        room.updateRoomObjectFloorHeight(item.objectId, item.stackHeight);
        // TODO update expiration
    });

    useMessageListener(ItemAddMessage, data => {
        if (!room) return;

        addRoomObjectWall(data.wallItem);
    });

    useMessageListener(ItemDataUpdateMessage, data => {
        if (!room) return;

        room.updateRoomObjectWallItemData(data.objectId, data.state)
    });

    useMessageListener(ItemRemoveMessage, data => {
        if (!room) return;

        const isOwner = false;

        room.removeRoomObjectWall(data.objectId, isOwner);
    });

    useMessageListener(ItemsMessage, data => {
        if (!room) return;

        for (const item of data.wallItems) addRoomObjectWall(item);
    });

    useMessageListener(ItemsStateUpdateMessage, data => {
        if (!room) return;

        for (const update of data.updates) room.updateRoomObjectWallState(update.objectId, update.state, update.data);
    });

    useMessageListener(ItemStateUpdateMessage, data => {
        if (!room) return;

        room.updateRoomObjectWallState(data.objectId, data.state, data.data);
    });

    useMessageListener(ItemUpdateMessage, data => {
        if (!room || !room.legacyGeometry) return;

        const item = data.wallItem;
        const wallPosition = room.legacyGeometry.getLocationFromString(item.wallPosition);
        const location = room.legacyGeometry.getLocation(wallPosition.width, wallPosition.height, wallPosition.localX, wallPosition.localY, wallPosition.direction);
        const direction = new Vector3d(room.legacyGeometry.getDirection(wallPosition.direction));

        room.updateRoomObjectWall(item.objectId, location, direction, item.state, item.data);
        // expiration
    });
}