import { useRoomChatHandler } from "./useRoomChatHandler"
import { useRoomDataHandler } from "./useRoomDataHandler";
import { useRoomPermissionsHandler } from "./useRoomPermissionsHandler";
import { useRoomPetPackageHandler } from "./useRoomPetPackageHandler";
import { useRoomPollHandler } from "./useRoomPollHandler";

export const useRoomHandlers = () => {
    useRoomChatHandler();
    useRoomDataHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();
}