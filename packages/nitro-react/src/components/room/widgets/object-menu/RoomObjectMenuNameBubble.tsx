import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useRoomObjectName } from '#base/hooks';
import { InfoBubbleNameView } from '#base/views/room-widgets/object-menu/InfoBubbleNameView';

import { RoomObjectMenuBubblePixi } from './RoomObjectMenuBubblePixi';

type RoomObjectInfoNameBubbleProps = {
    objectData: ISimpleRoomObjectData;
};

export const RoomObjectMenuNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { objectData } = props;
    const nameData = useRoomObjectName(objectData);

    if (!nameData) return null;

    return (
        <RoomObjectMenuBubblePixi
            objectData={objectData}
            userType={nameData.userType}
            fades={true}
        >
            <InfoBubbleNameView nameData={nameData} />
        </RoomObjectMenuBubblePixi>
    );
};
