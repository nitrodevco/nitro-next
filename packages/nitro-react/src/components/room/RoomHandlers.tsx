import { useRoomChatHandler, useRoomDataHandler, useRoomDirectoryHandler, useRoomFurnitureHandler, useRoomMappingHandler, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler, useRoomToolsHandler, useRoomUserHandler } from "#base/handlers";

export const RoomHandlers = () => {
    useRoomChatHandler();
    useRoomDataHandler();
    useRoomDirectoryHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();
    useRoomToolsHandler();
    useRoomUserHandler();

    return null;
}