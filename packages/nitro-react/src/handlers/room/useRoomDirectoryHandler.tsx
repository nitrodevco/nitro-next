import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { NitroLogger, OpenConnectionMessage, RoomReadyMessage } from "@nitrodevco/nitro-shared";

import { useRoomActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDirectoryHandler = () => {
    const { setRoom } = useRoomActions();

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