import { ISimpleRoomObjectData, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType } from '@nitrodevco/nitro-api';
import { GetPetInfoComposer, PetSelectedComposer, RemovePetFromFlatComposer, RespectPetComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useIsRoomOwner, useOwnControllerLevel, useRoomPetInfo, useRoomPlayTestMode, useRoomUserByObjectId } from '#base/context/room';
import { useConfigBoolean, useWindowActions } from '#base/context/system';
import { useOwnIsAnyRoomController, useOwnUserId, useUserActions, useUserStore } from '#base/context/user';
import { useRoomObjectModify } from '#base/hooks';
import { InfostandPetView } from '#base/views/room-widgets/object-infostand/InfostandPetView';

/**
 * The pet panel. The room knows a pet's name and figure from the moment it walks in, but nothing
 * else - the rest is asked for when the pet is clicked, which is what `InfoStandWidgetHandler`
 * did with `GetPetInfoComposer`. Under `petSelect.enabled`, `handleGetPetInfoMessage` first tells
 * the server which pet was selected (`PetSelectedMessageComposer`).
 *
 * `InfoStandWidgetHandler.onPetInfo` decides who the pet is to the viewer: their own when its
 * owner is them, and removable by its owner, the room owner, any room controller or anyone with
 * rights. `InfoStandPetView.update` lets a monsterplant be moved and rotated outside play test
 * mode by anyone with rights, its owner or any room controller. The buttons' actions are
 * `InfoStandWidgetHandler.processWidgetMessage`'s.
 */
export const InfostandPet = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    const { objectId } = objectData;
    // The raw room user, not `useRoomUserData`'s avatar shape: only this one carries the
    // pet id and its posture.
    const userData = useRoomUserByObjectId(objectId);
    const petId = userData?.webID ?? 0;
    const info = useRoomPetInfo(petId);
    const petRespectLeft = useUserStore(x => x.petRespectLeft);
    const ownUserId = useOwnUserId();
    const isAnyRoomController = useOwnIsAnyRoomController();
    const isRoomOwner = useIsRoomOwner();
    const controllerLevel = useOwnControllerLevel();
    const playTestMode = useRoomPlayTestMode();
    const { decreasePetRespects } = useUserActions();
    const { showWindow } = useWindowActions();
    const { modifyRoomObject } = useRoomObjectModify();
    const petSelectEnabled = useConfigBoolean('petSelect.enabled');
    const { send } = useWebSocketContext();

    useEffect(() => {
        if (!petId) return;

        if (petSelectEnabled) send(new PetSelectedComposer({ petId }));

        send(new GetPetInfoComposer({ petId }));
    }, [ petId, petSelectEnabled, send ]);

    if (!userData) return null;

    const isOwnPet = !!info && (info.ownerId === ownUserId);
    const hasRights = controllerLevel >= RoomControllerLevelEnum.Guest;

    return (
        <InfostandPetView
            objectData={objectData}
            info={info}
            figure={userData.figure}
            posture={userData.petPosture}
            name={userData.name}
            respectLeft={petRespectLeft}
            isOwnPet={isOwnPet}
            canRemovePet={isOwnPet || isRoomOwner || isAnyRoomController || hasRights}
            canMoveAndRotate={!playTestMode && (hasRights || isOwnPet || isAnyRoomController)}
            onRespect={() => {
                send(new RespectPetComposer({ petId }));
                // The server only answers a respect that failed, so the count is spent here.
                decreasePetRespects();
            }}
            // `RWUAM_PICKUP_PET`: `RoomSession.pickUpPet`.
            onPickUp={() => send(new RemovePetFromFlatComposer({ petId }))}
            onBuyFood={() => showWindow('catalog', { pageName: 'pet_accessories' })}
            onTrain={() => showWindow('pet_training', { petId, objectId })}
            // `RWUAM_TREAT_PET`: a respect, which spends none of the viewer's.
            onTreat={() => send(new RespectPetComposer({ petId }))}
            onMove={() => modifyRoomObject(objectId, RoomObjectCategoryEnum.Unit, RoomObjectOperationType.OBJECT_MOVE)}
            onRotate={() => modifyRoomObject(objectId, RoomObjectCategoryEnum.Unit, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}
            onClose={onClose}
        />
    );
};
