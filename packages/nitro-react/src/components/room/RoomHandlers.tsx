import { NitroLogger } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { OpenConnectionMessage, RoomReadyMessage } from "@nitrodevco/nitro-shared";

import { useRoomActions } from "#base/context";
import { useRoomChatHandler, useRoomDataHandler, useRoomMappingHandler, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler } from "#base/handlers";
import { useRoomFurnitureHandler } from "#base/handlers/room";
import { useMessageListener } from "#base/hooks";

export const RoomHandlers = () => {
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

    useRoomChatHandler();
    useRoomDataHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();

    return null;
}