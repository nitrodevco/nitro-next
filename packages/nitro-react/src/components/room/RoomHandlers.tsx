import { useRoomChatHandler, useRoomDataHandler, useRoomDirectoryHandler, useRoomFurnitureHandler, useRoomMappingHandler, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler } from "#base/handlers";

export const RoomHandlers = () => {
    useRoomDirectoryHandler();
    useRoomChatHandler();
    useRoomDataHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();

    return null;
}