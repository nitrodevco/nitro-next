import { NitroLogger } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { OpenConnectionMessage, RoomReadyMessage } from "@nitrodevco/nitro-shared";

import { useRoomActions } from "#base/context";
import { useRoomChatHandler, useRoomDataHandler, useRoomMappingHandler, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler } from "#base/handlers";
import { useMessageListener } from "#base/hooks";

export const RoomHandlers = () => {
    const { setRoom } = useRoomActions();

    useMessageListener(OpenConnectionMessage, data => {
        try {
            const room = GetRoomEngine().createRoom(data.roomId);
            setRoom(room);
        } catch (err) {
            NitroLogger.error(err);
        }
    });

    useMessageListener(RoomReadyMessage, data => {
        //ready
    });

    useRoomChatHandler();
    useRoomDataHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();

    return null;
}