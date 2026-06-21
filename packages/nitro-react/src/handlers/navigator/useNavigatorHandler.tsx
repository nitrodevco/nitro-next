import { CantConnectMessage, DoorbellMessage, FavouriteChangedMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, NavigatorMetadataMessage, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-shared";

import { useWebSocketContext } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();

    useMessageListener(UserObjectMessage, data => {
        send(new GetUserFlatCatsComposer({}));
        send(new GetUserEventCatsComposer({}));
    });

    useMessageListener(UserRightsMessage, data => {
        // set navi data
        // eventMod > securityLevel >= SecurityLevel.MODERATOR
        // roomPicker > securityLevel >= SecurityLevel.COMMUNITY
    });

    useMessageListener(RoomForwardMessage, data => {
        send(new GetGuestRoomComposer({
            roomId: data.roomId,
            enterRoom: false,
            roomForward: true
        }));
    });

    useMessageListener(RoomEntryInfoMessage, data => {
        // set navi data
        // enteredGuestRoom null
        // currenetRoomOwner data.isOwner
        // currentRoomId data.roomId

        send(new GetGuestRoomComposer({
            roomId: data.roomId,
            enterRoom: true,
            roomForward: false
        }));
    });

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.enterRoom) {
            // clear door data
            // enteredGuestRoom data.data
            // isStaffPick data.staffPick
        }

        else if (data.roomForward) {
            //
        }

        else {
            // currenetRoomOwner data.isOwner
            // currentRoomId data.roomId
        }
    });

    useMessageListener(RoomRatingMessage, data => {
        // currentRoomRating data.rating
        // canRate data.canRate
    });

    useMessageListener(DoorbellMessage, data => {
        if (!data.username || !data.username.length) {
            //set door data
            // waiting
        }
    });

    useMessageListener(FlatAccessibleMessage, data => {
        if (!data.username || !data.username.length) {
            //set door data
            // accepted
        }
    });

    useMessageListener(FlatAccessDeniedMessage, data => {
        if (!data.username || !data.username.length) {
            //set door data
            // no answer
        }
    });

    useMessageListener(NavigatorMetadataMessage, data => {

    });

    useMessageListener(UserFlatCatsMessage, data => {
    });

    useMessageListener(UserEventCatsMessage, data => {
    });

    useMessageListener(FlatCreatedMessage, data => {
        //
    });

    useMessageListener(FavouriteChangedMessage, data => {
    });

    useMessageListener(CantConnectMessage, data => {
    });
}