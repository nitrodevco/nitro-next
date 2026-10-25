import { ISimpleRoomObjectData, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RemoveBotFromFlatComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useIsRoomOwner, useOwnControllerLevel, useRoom, useRoomPlayTestMode, useRoomUserByObjectId } from '#base/context/room';
import { ClientGates, useClientGate } from '#base/context/user';
import { useRoomObjectModify } from '#base/hooks';
import { InfostandBotView } from '#base/views/room-widgets/object-infostand/InfostandBotView';

/**
 * The bot panel - `InfoStandBotView` and `InfoStandRentableBotView`. Everything it shows arrives
 * with the room's user list, so unlike a pet there is nothing to ask the server for. A rentable
 * bot can be moved and turned by anyone with rights - not in wired play test mode - and picked up
 * by whoever may manage it.
 */
export const InfostandBot = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    const room = useRoom();
    // The raw room user rather than `useRoomUserData`'s avatar shape: only this one names the owner.
    const userData = useRoomUserByObjectId(objectData.objectId);
    const isRoomOwner = useIsRoomOwner();
    const playTestMode = useRoomPlayTestMode();
    const controllerLevel = useOwnControllerLevel();
    const { modifyRoomObject } = useRoomObjectModify();
    const { send } = useWebSocketContext();
    const isAnyRoomController = useClientGate(ClientGates.AnyRoomController);

    if (!userData) return null;

    const roomObject = room?.getRoomObject(objectData.objectId, RoomObjectCategoryEnum.Unit);
    const isRentable = Number(userData.userType) === Number(RoomObjectUserType.RentableBot);
    const hasOwner = isRentable && (userData.ownerId > -1);

    return (
        <InfostandBotView
            objectData={objectData}
            rentable={isRentable}
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
            // `onButtonClicked`'s `pick` only asks; the bot leaving the room closes the stand.
            onPickUp={() => send(new RemoveBotFromFlatComposer({ botId: userData.webID }))}
            onClose={onClose}
        />
    );
};
