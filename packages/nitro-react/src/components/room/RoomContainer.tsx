import { RoomEngineEvent } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoomChatHandler, useRoomDataHandler, useRoomDirectoryHandler, useRoomFurnitureHandler, useRoomMappingHandler, useRoomModifications, useRoomPermissionsHandler, useRoomPetPackageHandler, useRoomPollHandler, useRoomUserHandler } from '#base/handlers';
import { useRoomEventDispatcher } from '#base/hooks';

import { RoomCanvas } from './RoomCanvas';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomWidgetsPixi } from './widgets';

export const RoomContainer = () => {
    const [ isReady, setIsReady ] = useState<boolean>(false);

    useRoomChatHandler();
    useRoomDataHandler();
    useRoomDirectoryHandler();
    useRoomFurnitureHandler();
    useRoomMappingHandler();
    useRoomPermissionsHandler();
    useRoomPetPackageHandler();
    useRoomPollHandler();
    useRoomUserHandler();

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
            <RoomWidgetsPixi />
            <RoomCanvas />
        </>
    );
};
