import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useRoomStore } from '#base/context/room';
import { InfostandBotView } from '#base/views/room-widgets/object-infostand/InfostandBotView';

/**
 * The bot panel. Everything it shows arrives with the room's user list, so unlike a pet there is
 * nothing to ask the server for.
 */
export const InfostandBot = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    // The raw room user rather than `useRoomUserData`'s avatar shape: only this one names the owner.
    const userData = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]);

    if (!userData) return null;

    return (
        <InfostandBotView
            objectData={objectData}
            name={userData.name}
            motto={userData.custom}
            figure={userData.figure}
            gender={userData.gender}
            ownerName={userData.ownerName}
            carryItem={0}
            onClose={onClose}
        />
    );
};
