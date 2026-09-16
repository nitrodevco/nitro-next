import { RoomEngineEvent } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoomAreaHideHandler, useRoomChatHandler, useRoomDataHandler, useRoomDirectoryHandler, useRoomFriendFurniHandler, useRoomFurnitureHandler, useRoomMappingHandler, useRoomModifications, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler, useRoomUserHandler, useRoomVariableFxHandler } from '#base/handlers';
import { useRoomEventDispatcher } from '#base/hooks';

import { RoomCanvas } from './RoomCanvas';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomWidgets } from './widgets';

export const RoomContainer = () => {
    const [ isReady, setIsReady ] = useState<boolean>(false);

    useRoomAreaHideHandler();
    useRoomChatHandler();
    useRoomDataHandler();
    useRoomDirectoryHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();
    useRoomFriendFurniHandler();
    useRoomUserHandler();
    useRoomVariableFxHandler();

    useRoomModifications();

    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, (event) => {
        setIsReady(true);
    });

    useRoomEventDispatcher(RoomEngineEvent.DISPOSED, (event) => {
        setIsReady(false);
    });

    if (!isReady) return null;

    return (
        <>
            <RoomEventHandler />
            <RoomWidgets />
            <RoomCanvas />
        </>
    );
};
