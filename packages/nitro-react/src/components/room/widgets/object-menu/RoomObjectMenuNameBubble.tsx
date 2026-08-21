import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";

import { useRoomObjectName } from "#base/hooks";
import { InfoBubbleNameViewPixi } from "#base/views-pixi/room-widgets/object-menu/InfoBubbleNameViewPixi";

import { RoomObjectMenuBubblePixi } from "./RoomObjectMenuBubblePixi";

type RoomObjectInfoNameBubbleProps = {
    objectData: ISimpleRoomObjectData;
}

export const RoomObjectMenuNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { objectData } = props;
    const nameData = useRoomObjectName(objectData);

    if (!nameData) return null;

    return (
        <RoomObjectMenuBubblePixi objectData={objectData} userType={nameData.userType} fades={true}>
            <InfoBubbleNameViewPixi nameData={nameData} />
        </RoomObjectMenuBubblePixi>);
}