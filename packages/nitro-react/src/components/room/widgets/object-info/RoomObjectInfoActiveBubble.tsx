import { IRoomObjectData, IRoomObjectNameData, IRoomUserData, RoomObjectCategoryEnum, RoomObjectUserType } from "@nitrodevco/nitro-api";

import { useOwnUserId } from "#base/context";
import { InfoBubbleOwnAvatarView } from "#base/views/room-widgets/bubbles/InfoBubbleOwnAvatarView";

import { RoomObjectInfoBubble } from "./RoomObjectInfoBubble";
import { RoomObjectInfoNameBubble } from "./RoomObjectInfoNameBubble";

type RoomObjectInfoBubblesProps = {
    activeBubble: IRoomObjectNameData | undefined;
    activeData: IRoomObjectData | undefined;
}

export const RoomObjectInfoActiveBubble = (props: RoomObjectInfoBubblesProps) => {
    const { activeBubble, activeData } = props;
    const ownUserId = useOwnUserId();

    console.log(activeBubble, activeData);

    if (activeBubble) return <RoomObjectInfoNameBubble nameData={activeBubble} />;

    if (!activeData) return null;

    switch (activeData.category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            return null;
        }
        case RoomObjectCategoryEnum.Unit: {
            const userData = activeData as IRoomUserData;

            switch (userData.userType) {
                case RoomObjectUserType.Pet: {
                    return null;
                }
                case RoomObjectUserType.User: {
                    if (userData.webID === ownUserId) return (
                        <RoomObjectInfoBubble objectData={userData}>
                            <InfoBubbleOwnAvatarView activeData={userData} />
                        </RoomObjectInfoBubble>);

                    return null;
                }
                case RoomObjectUserType.Bot: {
                    return null;
                }
                case RoomObjectUserType.RentableBot: {
                    return null;
                }
            }
        }
    }

    return null;
}