import { IRoomObjectNameData } from "@nitrodevco/nitro-api";

import { InfoBubbleNameView } from "#base/views/room-widgets/bubbles/InfoBubbleNameView";

import { RoomObjectInfoBubble } from "./RoomObjectInfoBubble";

type RoomObjectInfoNameBubbleProps = {
    nameData: IRoomObjectNameData;
}

export const RoomObjectInfoNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { nameData } = props;

    return (
        <RoomObjectInfoBubble objectData={nameData}>
            <InfoBubbleNameView nameData={nameData} />
        </RoomObjectInfoBubble>);
}