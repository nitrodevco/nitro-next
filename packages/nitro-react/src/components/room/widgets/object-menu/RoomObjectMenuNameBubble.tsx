/**
 * The name bubble shown while hovering an object - `AvatarInfoWidget`'s name-only view; it
 * fades after a few seconds.
 */
import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';

import { useRoomObjectName } from '#base/hooks';
import { InfoBubbleNameView } from '#base/views/room-widgets/object-menu/InfoBubbleNameView';

import { RoomObjectMenuBubble } from './RoomObjectMenuBubble';

type RoomObjectMenuNameBubbleProps = {
    objectData: ISimpleRoomObjectData;
    /** Called once the bubble has faded out. */
    onClose?: () => void;
    /** The bubble's window, for whoever needs it as well (a hint target). */
    targetRef?: (node: PixiContainer | null) => void;
};

export const RoomObjectMenuNameBubble = (props: RoomObjectMenuNameBubbleProps) => {
    const { objectData, onClose = undefined, targetRef = undefined } = props;
    const nameData = useRoomObjectName(objectData);

    if (!nameData) return null;

    return (
        <RoomObjectMenuBubble
            objectData={objectData}
            userType={nameData.userType}
            fades={true}
            onClose={onClose}
            targetRef={targetRef}
        >
            <InfoBubbleNameView nameData={nameData} />
        </RoomObjectMenuBubble>
    );
};
