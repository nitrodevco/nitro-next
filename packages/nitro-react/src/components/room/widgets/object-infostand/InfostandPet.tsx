import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { GetPetInfoComposer, RespectPetComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetInfo, useRoomStore } from '#base/context/room';
import { useUserActions, useUserStore } from '#base/context/user';
import { InfostandPetView } from '#base/views/room-widgets/object-infostand/InfostandPetView';

/**
 * The pet panel. The room knows a pet's name and figure from the moment it walks in, but nothing
 * else - the rest is asked for when the pet is clicked, which is what `InfoStandWidgetHandler`
 * did with `GetPetInfoComposer`.
 */
export const InfostandPet = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    const { objectId } = objectData;
    // The raw room user, not `useRoomUserData`'s avatar shape: only this one carries the
    // pet id and its posture.
    const userData = useRoomStore(x => x.usersByRoomObjectId[objectId]);
    const petId = userData?.webID ?? 0;
    const info = useRoomPetInfo(petId);
    const petRespectLeft = useUserStore(x => x.petRespectLeft);
    const { decreasePetRespects } = useUserActions();
    const { send } = useWebSocketContext();

    useEffect(() => {
        if (!petId) return;

        send(new GetPetInfoComposer({ petId }));
    }, [ petId, send ]);

    if (!userData) return null;

    return (
        <InfostandPetView
            objectData={objectData}
            info={info}
            figure={userData.figure}
            posture={userData.petPosture}
            name={userData.name}
            respectLeft={petRespectLeft}
            onRespect={() => {
                send(new RespectPetComposer({ petId }));
                // The server only answers a respect that failed, so the count is spent here.
                decreasePetRespects();
            }}
            onClose={onClose}
        />
    );
};
