import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { NitroLogger, OpenConnectionMessage, RoomReadyMessage, UserObjectMessage } from "@nitrodevco/nitro-shared";

import { useRoomActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDirectoryHandler = () => {
    const { setRoom, setOwnUserId } = useRoomActions();

    useMessageListener(UserObjectMessage, data => {
        setOwnUserId(data.userInfo.userId);
    });

    useMessageListener(OpenConnectionMessage, data => {
        try {
            setRoom(GetRoomEngine().createRoom(data.roomId));
        } catch (err) {
            NitroLogger.error(err);
        }
    });

    useMessageListener(RoomReadyMessage, data => {
        //ready
    });
}