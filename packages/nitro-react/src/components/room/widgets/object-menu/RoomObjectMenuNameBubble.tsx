import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";

import { useRoomObjectName } from "#base/hooks";
import { InfoBubbleNameView } from "#base/views/room-widgets/object-menu/InfoBubbleNameView";

import { RoomObjectMenuBubble } from "./RoomObjectMenuBubble";
import { RoomObjectMenuNameContext } from "./RoomObjectMenuNameContext";

type RoomObjectInfoNameBubbleProps = {
    objectData: ISimpleRoomObjectData;
}

export const RoomObjectMenuNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { objectData } = props;
    const nameData = useRoomObjectName(objectData);

    if (!nameData) return null;

    return (
        <RoomObjectMenuBubble objectData={objectData} userType={nameData.userType} fades={true}>
            <RoomObjectMenuNameContext value={{ nameData }}>
                <InfoBubbleNameView />
            </RoomObjectMenuNameContext>
        </RoomObjectMenuBubble>);
}
