import { useRoomChatHandler, useRoomDataHandler, useRoomDirectoryHandler, useRoomFurnitureHandler, useRoomMappingHandler, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler, useRoomUserHandler } from "#base/handlers";

export const RoomHandlers = () => {
    useRoomChatHandler();
    useRoomDataHandler();
    useRoomDirectoryHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();
    useRoomUserHandler();

    return null;
}