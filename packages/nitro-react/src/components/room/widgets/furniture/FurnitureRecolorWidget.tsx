import { IRoom, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RecolorFurnitureComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useIsRoomOwner, useOwnControllerLevel, useRoom, useRoomPlayTestMode, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useConfigData, useFurnitureData } from '#base/context/system';
import { ClientGates, useClientGate } from '#base/context/user';
import { configReader, FURNITURE_RECOLOR_WIDGET, FurnitureRecolorData, getRecolorableColors } from '#base/utils';
import { FurnitureRecolorView } from '#base/views/room-widgets/furniture/FurnitureRecolorView';

/** A recolorable furni's colour, read from its model; undefined for any other furni (Flash's NaN). */
const recolorableColor = (room: IRoom, objectId: number): number | undefined => {
    const value = room.getRoomObject(objectId, RoomObjectCategoryEnum.Floor)?.model.getValue<number>(RoomObjectVariableEnum.FurnitureRecolorableColor);

    return ((value === undefined) || isNaN(value)) ? undefined : value;
};

/**
 * `collectRoomColors`: every floor furni's recolorable colour that the palette holds, once each,
 * in numeric order (`sort(Array.NUMERIC)`).
 */
const collectRoomColors = (room: IRoom, allowedColors: readonly number[]): number[] => {
    const colors = new Set<number>();

    for (const object of room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor)) {
        const color = recolorableColor(room, object.id);

        if ((color !== undefined) && allowedColors.includes(color)) colors.add(color);
    }

    return [ ...colors ].sort((a, b) => a - b);
};

/**
 * The recolor window (WIN63-202610121624 `FurnitureRecolorController`), opened by the infostand's
 * recolor button on a recolorable floor furni. Only a room owner or controller outside play test
 * mode may use it (`hasRights`), and only on a furni whose model has a recolorable colour. The
 * palette is the furni class's (`getRecolorableColors`); Apply sends `RecolorFurniture` with the
 * picked colour and scope and keeps the colour pending until a `FurniRecolorUpdate` names this
 * furni with it, which moves `FurnitureRecolorData.confirmed` on: the before preview and the room's
 * colours are then read again. The furni leaving the room closes it, as every furniture widget.
 */
export const FurnitureRecolorWidget = () => {
    // A confirmed recolor changes the request's data, which renders this again with the new colours.
    const request = useRoomWidget<FurnitureRecolorData>(FURNITURE_RECOLOR_WIDGET);
    const room = useRoom();
    const isRoomOwner = useIsRoomOwner();
    const controllerLevel = useOwnControllerLevel();
    const isAnyRoomController = useClientGate(ClientGates.AnyRoomController);
    const playTestMode = useRoomPlayTestMode();
    const { configString } = configReader(useConfigData());
    const { closeRoomWidget, mergeRoomWidgetData } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const objectId = request?.objectId ?? -1;
    const roomObject = room?.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);
    const furnitureData = useFurnitureData(roomObject?.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId), false);
    // `open` picks the furni's own colour and scope 0 each time the window opens on a furni.
    const [ picked, setPicked ] = useState<{ objectId: number; sequence: number; color: number; scope: number } | undefined>(undefined);

    const close = () => closeRoomWidget(FURNITURE_RECOLOR_WIDGET);
    const hasRights = !playTestMode && (isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest) || isAnyRoomController);

    if (!request || !room || !roomObject || !hasRights) return null;

    const originalColor = recolorableColor(room, objectId);

    if (originalColor === undefined) return null;

    const allowedColors = furnitureData ? getRecolorableColors(configString, furnitureData.className) : [];
    const current = ((picked?.objectId === objectId) && (picked.sequence === request.sequence)) ? picked : { objectId, sequence: request.sequence, color: originalColor, scope: 0 };

    return (
        <FurnitureRecolorView
            typeName={roomObject.type}
            direction={roomObject.getDirection().x}
            stuffData={roomObject.model.getValue<Record<string, string>>(RoomObjectVariableEnum.FurnitureData) ?? {}}
            originalColor={originalColor}
            color={current.color}
            defaultColors={allowedColors}
            roomColors={collectRoomColors(room, allowedColors)}
            scope={current.scope}
            onColor={color => setPicked({ ...current, color })}
            onScope={scope => setPicked({ ...current, scope })}
            onApply={() => {
                if (!allowedColors.includes(current.color)) return;

                mergeRoomWidgetData<FurnitureRecolorData>(FURNITURE_RECOLOR_WIDGET, { pendingColor: current.color });
                send(new RecolorFurnitureComposer({ objectId, scope: current.scope, color: current.color }));
            }}
            onClose={close}
        />
    );
};
