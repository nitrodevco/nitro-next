import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { CloseConnectionMessage, OpenConnectionMessage, RoomReadyMessage, UserObjectMessage } from "@nitrodevco/nitro-shared";

import { useRoomActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDirectoryHandler = () => {
    const { setRoom, setOwnUserId, setLandingViewVisible } = useRoomActions();

    useMessageListener(UserObjectMessage, data => {
        setOwnUserId(data.userInfo.userId);
    });

    useMessageListener(OpenConnectionMessage, data => {
        setLandingViewVisible(false);
        setRoom(GetRoomEngine().createRoom(data.roomId));
    });

    useMessageListener(CloseConnectionMessage, data => {
        setRoom(undefined);
        setLandingViewVisible(true);
    });

    useMessageListener(RoomReadyMessage, data => {
        //ready
    });
}