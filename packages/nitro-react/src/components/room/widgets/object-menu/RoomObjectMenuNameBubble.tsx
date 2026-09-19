import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useRoomObjectName } from '#base/hooks';
import { InfoBubbleNameView } from '#base/views/room-widgets/object-menu/InfoBubbleNameView';

import { RoomObjectMenuBubble } from './RoomObjectMenuBubble';

type RoomObjectInfoNameBubbleProps = {
    objectData: ISimpleRoomObjectData;
};

/**
 * The name bubble shown while hovering an object - `AvatarInfoWidget`'s name-only view; it
 * fades after a few seconds.
 */
export const RoomObjectMenuNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { objectData } = props;
    const nameData = useRoomObjectName(objectData);

    if (!nameData) return null;

    return (
        <RoomObjectMenuBubble
            objectData={objectData}
            userType={nameData.userType}
            fades={true}
        >
            <InfoBubbleNameView nameData={nameData} />
        </RoomObjectMenuBubble>
    );
};
