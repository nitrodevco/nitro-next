import type { IVector3D } from "@nitrodevco/nitro-api";
import { AvatarActionType, LegacyDataType, RoomObjectCategoryEnum, RoomObjectVariableEnum, SlideAvatarMoveType, Vector3d } from "@nitrodevco/nitro-api";
import { LegacyWallGeometry, ObjectMoveUpdateMessage } from "@nitrodevco/nitro-renderer";
import { DiceValueMessage, ItemAddMessage, ItemDataUpdateMessage, ItemRemoveMessage, ItemsMessage, ItemsStateUpdateMessage, ItemStateUpdateMessage, ItemUpdateMessage, ObjectAddMessage, ObjectDataUpdateMessage, ObjectRemoveMessage, ObjectRemoveMultipleMessage, ObjectsDataUpdateMessage, ObjectsMessage, ObjectUpdateMessage, OneWayDoorStatusMessage, SlideObjectBundleMessage, WiredMovementsMessage } from "@nitrodevco/nitro-shared";

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

    const roundLocation = (location: IVector3D) => {
        const geometry = room?.getGeometry();

        let adjustedZ = location.z;

        if (geometry) {
            const screenPosition = geometry.getScreenPosition(location);
            const zReferencePosition = new Vector3d(location.x, location.y, location.z + 0.01);
            const referenceScreenPosition = geometry.getScreenPosition(zReferencePosition);
            const screenY = screenPosition.y;
            const pixelsPerZUnit = (screenY - referenceScreenPosition.y) * 100;
            const fractionalPixelOffset = screenY - Math.round(screenY);

            adjustedZ = location.z + fractionalPixelOffset / pixelsPerZUnit;
        }

        return new Vector3d(location.x, location.y, adjustedZ);
    }

    const setUserMovePosture = (objectId: number, moveType: SlideAvatarMoveType) => {
        if (!room) return;

        const object = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object || object.type === 'monsterplant') return;

        let posture = '';

        switch (moveType) {
            case SlideAvatarMoveType.Move:
                posture = AvatarActionType.Walk;
                break;
            case SlideAvatarMoveType.Slide: {
                posture = object.model.getValue<string>(RoomObjectVariableEnum.FigurePosture);

                if (posture === AvatarActionType.Walk) posture = AvatarActionType.Stand;
                break;
            }
        }

        room.updateRoomObjectUserPosture(objectId, posture);
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
        room.updateRoomObjectFloorExpiration(item.objectId, item.expires);
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
        room.updateRoomObjectWallExpiration(item.objectId, item.expires);
    });

    useMessageListener(SlideObjectBundleMessage, data => {
        if (!room) return;

        room.updateRoomObjectFloor(data.rollerItemId, undefined, undefined, 1);
        room.updateRoomObjectFloor(data.rollerItemId, undefined, undefined, 2);

        for (const heights of data.heights) {
            const object = room.getRoomObject(heights.objectId, RoomObjectCategoryEnum.Floor);

            if (!object) continue;

            const source = new Vector3d(data.fromX, data.fromY, heights.fromHeight);
            const target = new Vector3d(data.toX, data.toY, heights.toHeight);

            object.processUpdateMessage(new ObjectMoveUpdateMessage(source, target, undefined, true));
        }

        if (data.avatar) {
            const source = new Vector3d(data.fromX, data.fromY, data.avatar.fromHeight);
            const target = new Vector3d(data.toX, data.toY, data.avatar.toHeight);

            room.updateRoomObjectUser(data.avatar.objectId, source, target);
            setUserMovePosture(data.avatar.objectId, data.avatar.moveType);
        }
    });

    useMessageListener(WiredMovementsMessage, data => {
        if (!room) return;

        for (const userMove of data.userMoves) {
            let canStandUp = false;

            if (userMove.moveType === SlideAvatarMoveType.Slide) {
                const object = room.getRoomObject(userMove.objectId, RoomObjectCategoryEnum.Unit);

                if (object) canStandUp = object.model.getValue<number>(RoomObjectVariableEnum.FigureCanStandUp) > 0;
            }

            const source = new Vector3d(userMove.sourceX, userMove.sourceY, userMove.sourceZ);
            const target = new Vector3d(userMove.targetX, userMove.targetY, userMove.targetZ);
            const direction = new Vector3d(userMove.bodyRotation % 8 * 45);
            const headDirection = userMove.headRotation % 8 * 45;

            room.updateRoomObjectUser(userMove.objectId, roundLocation(source), roundLocation(target), canStandUp, 0, direction, headDirection, userMove.animationTime);
        }

        for (const floorMove of data.floorMoves) {
            const object = room.getRoomObject(floorMove.objectId, RoomObjectCategoryEnum.Floor);

            if (!object) continue;

            const source = new Vector3d(floorMove.sourceX, floorMove.sourceY, floorMove.sourceZ);
            const target = new Vector3d(floorMove.targetX, floorMove.targetY, floorMove.targetZ);
            const direction = new Vector3d(floorMove.rotation % 8 * 45);

            object.processUpdateMessage(new ObjectMoveUpdateMessage(roundLocation(source), roundLocation(target), direction, true, floorMove.animationTime));
        }

        for (const wallMove of data.wallMoves) {
            const object = room.getRoomObject(wallMove.objectId, RoomObjectCategoryEnum.Wall);
            const legacyGeometry = room.legacyGeometry;

            if (!object || !legacyGeometry) continue;

            const direction = wallMove.isDirectionRight ? LegacyWallGeometry.L : LegacyWallGeometry.R;
            const source = legacyGeometry.getLocation(wallMove.sourceX, wallMove.sourceY, wallMove.sourceOffsetX, wallMove.sourceOffsetY, direction);
            const target = legacyGeometry.getLocation(wallMove.targetX, wallMove.targetY, wallMove.targetOffsetX, wallMove.targetOffsetY, direction);

            object.processUpdateMessage(new ObjectMoveUpdateMessage(roundLocation(source), roundLocation(target), undefined, true, wallMove.animationTime));

            room.updateRoomObjectMask(wallMove.objectId);
        }

        for (const userDirection of data.userDirections) {
            const direction = new Vector3d(userDirection.bodyRotation % 8 * 45);
            const headDirection = userDirection.headRotation % 8 * 45;

            room.updateRoomObjectUserDirection(userDirection.objectId, direction, headDirection);
        }
    });

    useMessageListener(DiceValueMessage, data => {
        if (!room) return;

        room.updateRoomObjectFloor(data.furniId, undefined, undefined, data.value, new LegacyDataType());
    });

    useMessageListener(OneWayDoorStatusMessage, data => {
        if (!room) return;

        room.updateRoomObjectFloor(data.furniId, undefined, undefined, data.status, new LegacyDataType());
    });
}