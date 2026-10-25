import { AvatarActionStateType, IRoom, IRoomWidgetRequest, IVector3D, LegacyDataType, RoomObjectCategoryEnum, RoomObjectVariableEnum, SlideAvatarMoveType, Vector3d } from '@nitrodevco/nitro-api';
import { DiceValueMessage, FurniRecolorUpdateMessage, FurnitureAliasesMessage, IRoomFloorItem, IRoomWallItem, ItemAddMessage, ItemDataUpdateMessage, ItemRemoveMessage, ItemRemoveMultipleMessage, ItemsMessage, ItemsStateUpdateMessage, ItemStateUpdateMessage, ItemUpdateMessage, ObjectAddMessage, ObjectDataUpdateMessage, ObjectRemoveConfirmMessage, ObjectRemoveMessage, ObjectRemoveMultipleMessage, ObjectsDataUpdateMessage, ObjectsMessage, ObjectUpdateMessage, OneWayDoorStatusMessage, PickupObjectComposer, SlideObjectBundleMessage, WiredMovementsMessage } from '@nitrodevco/nitro-packets';
import { GetRoomContentLoader, LegacyWallGeometry, ObjectMoveUpdateMessage } from '@nitrodevco/nitro-renderer';

import { createPickupTransition } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { FURNITURE_RECOLOR_WIDGET, FurnitureRecolorData } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The furniture half of Flash's `RoomMessageHandler`: floor and wall items arriving, updating
 * and leaving, the sliding and wired movement bundles, dice values and one-way doors. Every
 * packet ends in a call on the room, which owns the objects; the store only learns what the
 * widgets need.
 *
 * The furni aliases (`onFurnitureAliases`) are the content loader's, not a room's: a type drawn
 * from another type's asset (`RoomEngine.setRoomObjectAlias`).
 */
export const registerRoomFurnitureHandlers = ({ subscribe, send }: WebSocketConnection) => {
    const addRoomObjectFloor = (item: IRoomFloorItem) => {
        const room = getRoom();

        if (!room) return;

        const location = new Vector3d(item.x, item.y, item.z);
        const direction = new Vector3d(item.rotation);

        if (item.spriteName) {
            room.addFurnitureFloorByTypeName(item.objectId, item.spriteName, location, direction, item.stuffData.state, item.stuffData, item.extra, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true, item.stackHeight);
        } else {
            room.addFurnitureFloorByTypeId(item.objectId, item.spriteId, location, direction, item.stuffData.state, item.stuffData, item.extra, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true, item.stackHeight);
        }
    };

    const addRoomObjectWall = (item: IRoomWallItem) => {
        const room = getRoom();

        if (!room || !room.legacyGeometry) return;

        const wallPosition = room.legacyGeometry.getLocationFromString(item.wallPosition);
        const location = room.legacyGeometry.getLocation(wallPosition.width, wallPosition.height, wallPosition.localX, wallPosition.localY, wallPosition.direction);
        const direction = new Vector3d(room.legacyGeometry.getDirection(wallPosition.direction));

        room.addFurnitureWallByTypeId(item.objectId, item.spriteId, location, direction, item.state, item.data, item.expires, item.usagePolicy, item.ownerId, item.ownerName, true);
    };

    const roundLocation = (location: IVector3D) => {
        const geometry = getRoom()?.getGeometry();

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
    };

    const setUserMovePosture = (objectId: number, moveType: SlideAvatarMoveType) => {
        const room = getRoom();

        if (!room) return;

        const object = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object || object.type === 'monsterplant') return;

        let posture = AvatarActionStateType.None;

        switch (moveType) {
            case SlideAvatarMoveType.Move:
                posture = AvatarActionStateType.Walk;
                break;
            case SlideAvatarMoveType.Slide: {
                posture = object.model.getValue<AvatarActionStateType>(RoomObjectVariableEnum.FigurePosture);

                if (posture === AvatarActionStateType.Walk) posture = AvatarActionStateType.Stand;
                break;
            }
        }

        room.updateRoomObjectUserPosture(objectId, posture);
    };

    return subscribeAll(subscribe, [
        on(ObjectAddMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            addRoomObjectFloor(data.floorItem);
        }),

        on(ObjectDataUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectFloor(data.objectId, undefined, undefined, data.stuffData.state, data.stuffData);
        }),

        // `onFurniRecolorUpdate`: each entry's colour goes into the map data of the furni it names.
        on(FurniRecolorUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const { objectIds, red, green, blue } of data.updates) room.updateFurnitureColor(objectIds, red, green, blue);

            // `FurnitureRecolorController.onFurniRecolorUpdate`: the update that names the open
            // window's furni with the colour it sent ends the wait, and the window reads again.
            const { openWidgets, mergeRoomWidgetData } = roomStore.getState();
            const recolor = openWidgets[FURNITURE_RECOLOR_WIDGET] as IRoomWidgetRequest<FurnitureRecolorData> | undefined;
            const pendingColor = recolor?.data?.pendingColor;

            if (!recolor || (pendingColor === undefined)) return;

            const confirmed = data.updates.some(({ objectIds, red, green, blue }) => ((((red << 16) | (green << 8) | blue) >>> 0) === pendingColor) && objectIds.includes(recolor.objectId));

            if (confirmed) mergeRoomWidgetData<FurnitureRecolorData>(FURNITURE_RECOLOR_WIDGET, previous => ({ pendingColor: undefined, confirmed: (previous.confirmed ?? 0) + 1 }));
        }),

        on(FurnitureAliasesMessage, (data) => {
            for (const { name, alias } of data.aliases) GetRoomContentLoader().setAssetAliasName(name, alias);
        }),

        /*
         * `RoomMessageHandler.onObjectRemoveConfirm`: the server asks before a pickup - its title and
         * text are localization keys - and OK sends the pickup again, confirmed.
         */
        on(ObjectRemoveConfirmMessage, ({ id, category, confirmTitle, confirmBody }) => {
            const { interpolate, showConfirm } = systemStore.getState();

            showConfirm(interpolate(`\${${confirmTitle}}`), interpolate(`\${${confirmBody}}`), () => send(new PickupObjectComposer({ objectId: id, objectCategory: category, confirm: true })));
        }),

        on(ObjectRemoveMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            // `onObjectRemove`: an expired item was picked up by no one.
            const pickerId = data.isExpired ? -1 : data.pickerId;

            const remove = (room: IRoom) => {
                createPickupTransition(room, data.objectId, RoomObjectCategoryEnum.Floor, pickerId);
                room.removeRoomObjectFloor(data.objectId, data.byInvisibleFurniManager);
                room.refreshTileObjectMap();
            };

            if (data.delay > 0) {
                setTimeout(() => {
                    const room = getRoom();

                    if (room) remove(room);
                }, data.delay);
            } else {
                remove(room);
            }
        }),

        on(ObjectRemoveMultipleMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const objectId of data.objectIds) {
                createPickupTransition(room, objectId, RoomObjectCategoryEnum.Floor, data.pickerId);
                room.removeRoomObjectFloor(objectId, data.byInvisibleFurniManager);
            }

            // RoomMessageHandler.onObjectRemoveMultiple refreshes the tile map once, after the last one.
            room.refreshTileObjectMap();
        }),

        on(ObjectsDataUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const stuffData of data.stuffDatas) room.updateRoomObjectFloor(stuffData.objectId, undefined, undefined, stuffData.stuffData.state, stuffData.stuffData);
        }),

        on(ObjectsMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const item of data.floorItems) addRoomObjectFloor(item);
        }),

        on(ObjectUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            const item = data.floorItem;
            const location = new Vector3d(item.x, item.y, item.z);
            const direction = new Vector3d(item.rotation);

            room.updateRoomObjectFloor(item.objectId, location, direction, item.stuffData.state, item.stuffData, item.extra);
            room.updateRoomObjectFloorHeight(item.objectId, item.stackHeight);
            room.updateRoomObjectFloorExpiration(item.objectId, item.expires);
        }),

        on(ItemAddMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            addRoomObjectWall(data.wallItem);
        }),

        on(ItemDataUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectWallItemData(data.objectId, data.state);
        }),

        on(ItemRemoveMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            createPickupTransition(room, data.objectId, RoomObjectCategoryEnum.Wall, data.pickerId);
            room.removeRoomObjectWall(data.objectId);
        }),

        on(ItemRemoveMultipleMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const objectId of data.objectIds) {
                createPickupTransition(room, objectId, RoomObjectCategoryEnum.Wall, data.pickerId);
                room.removeRoomObjectWall(objectId);
            }
        }),

        on(ItemsMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const item of data.wallItems) addRoomObjectWall(item);
        }),

        on(ItemsStateUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            for (const update of data.updates) room.updateRoomObjectWallState(update.objectId, update.state, update.data);
        }),

        on(ItemStateUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectWallState(data.objectId, data.state, data.data);
        }),

        on(ItemUpdateMessage, (data) => {
            const room = getRoom();

            if (!room || !room.legacyGeometry) return;

            const item = data.wallItem;
            const wallPosition = room.legacyGeometry.getLocationFromString(item.wallPosition);
            const location = room.legacyGeometry.getLocation(wallPosition.width, wallPosition.height, wallPosition.localX, wallPosition.localY, wallPosition.direction);
            const direction = new Vector3d(room.legacyGeometry.getDirection(wallPosition.direction));

            room.updateRoomObjectWall(item.objectId, location, direction, item.state, item.data);
            room.updateRoomObjectWallExpiration(item.objectId, item.expires);
        }),

        on(SlideObjectBundleMessage, (data) => {
            const room = getRoom();

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
        }),

        on(WiredMovementsMessage, (data) => {
            const room = getRoom();

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

                room.updateRoomObjectUser(userMove.objectId, roundLocation(source), roundLocation(target), canStandUp, 0, direction, headDirection, userMove.animationTime, false, userMove.jumpPower);
            }

            for (const floorMove of data.floorMoves) {
                const object = room.getRoomObject(floorMove.objectId, RoomObjectCategoryEnum.Floor);

                if (!object) continue;

                const source = new Vector3d(floorMove.sourceX, floorMove.sourceY, floorMove.sourceZ);
                const target = new Vector3d(floorMove.targetX, floorMove.targetY, floorMove.targetZ);
                const direction = new Vector3d(floorMove.rotation % 8 * 45);

                object.processUpdateMessage(new ObjectMoveUpdateMessage(roundLocation(source), roundLocation(target), direction, true, floorMove.animationTime, false, floorMove.overshootingDistance, floorMove.curveStrength));
            }

            for (const wallMove of data.wallMoves) {
                const object = room.getRoomObject(wallMove.objectId, RoomObjectCategoryEnum.Wall);
                const legacyGeometry = room.legacyGeometry;

                if (!object || !legacyGeometry) continue;

                const direction = wallMove.isDirectionRight ? LegacyWallGeometry.R : LegacyWallGeometry.L;
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
        }),

        on(DiceValueMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectFloor(data.furniId, undefined, undefined, data.value, new LegacyDataType());
        }),

        on(OneWayDoorStatusMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectFloor(data.furniId, undefined, undefined, data.status, new LegacyDataType());
        }),
    ]);
};
