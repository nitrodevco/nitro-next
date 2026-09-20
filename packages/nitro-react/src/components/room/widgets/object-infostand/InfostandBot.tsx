import { ISimpleRoomObjectData, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RemoveBotFromFlatComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useOwnControllerLevel, useRoom, useRoomStore } from '#base/context/room';
import { useOwnSecurityLevel } from '#base/context/user';
import { useRoomObjectModify } from '#base/hooks';
import { InfostandBotView } from '#base/views/room-widgets/object-infostand/InfostandBotView';

/** `SessionDataManager.isAnyRoomController`: staff count as a controller everywhere. */
const ANY_ROOM_CONTROLLER_SECURITY = 5;

/**
 * The bot panel - `InfoStandBotView` and `InfoStandRentableBotView`. Everything it shows arrives
 * with the room's user list, so unlike a pet there is nothing to ask the server for. A rentable
 * bot can be moved and turned by anyone with rights - not in wired play test mode - and picked up
 * by whoever may manage it.
 */
export const InfostandBot = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    const room = useRoom();
    // The raw room user rather than `useRoomUserData`'s avatar shape: only this one names the owner.
    const userData = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const playTestMode = useRoomStore(x => x.playTestMode);
    const controllerLevel = useOwnControllerLevel();
    const securityLevel = useOwnSecurityLevel();
    const { modifyRoomObject } = useRoomObjectModify();
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const roomObject = room?.getRoomObject(objectData.objectId, RoomObjectCategoryEnum.Unit);
    const isRentable = Number(userData.userType) === Number(RoomObjectUserType.RentableBot);
    const hasOwner = isRentable && (userData.ownerId > -1);
    const isAnyRoomController = Number(securityLevel) >= ANY_ROOM_CONTROLLER_SECURITY;

    return (
        <InfostandBotView
            objectData={objectData}
            name={userData.name}
            motto={userData.custom}
            figure={userData.figure}
            gender={userData.gender}
            ownerName={hasOwner ? userData.ownerName : ''}
            carryItem={roomObject?.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0}
            canMove={hasOwner && !playTestMode && ((controllerLevel >= RoomControllerLevelEnum.Guest) || isRoomOwner || isAnyRoomController)}
            canPickUp={hasOwner && (isRoomOwner || isAnyRoomController)}
            onMove={() => modifyRoomObject(objectData.objectId, RoomObjectCategoryEnum.Unit, RoomObjectOperationType.OBJECT_MOVE)}
            onRotate={() => modifyRoomObject(objectData.objectId, RoomObjectCategoryEnum.Unit, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}
            onPickUp={() => {
                send(new RemoveBotFromFlatComposer({ botId: userData.webID }));
                onClose();
            }}
            onClose={onClose}
        />
    );
};
