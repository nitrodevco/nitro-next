import { RoomEngineEvent } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoom } from '#base/context/room';
import { useRoomEventDispatcher } from '#base/hooks';

import { RoomCanvas } from './RoomCanvas';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomWidgets } from './widgets';

export const RoomContainer = () => {
    const room = useRoom();
    /*
     * Nothing reads this value: bumping it is only how an initialization that happens after the
     * room was created gets a render to notice it. Whether the room is shown is decided by the
     * room itself, below.
     */
    const [ , setRoomStateVersion ] = useState(0);

    useRoomEventDispatcher([ RoomEngineEvent.INITIALIZED, RoomEngineEvent.DISPOSED ], () => {
        setRoomStateVersion(version => version + 1);
    });

    /*
     * The room is shown when *it* says it is initialized, not when an event about it was caught.
     *
     * The event can be missed. Packets arrive in batches, so the packet that creates the room and
     * the floor map that initializes it are usually handled in the same synchronous loop - while
     * this listener is only attached by an effect, after React has re-rendered with the new room.
     * By then the room has already initialized and the event is gone, which left a client that
     * believed it was in a room with nothing on screen. Reading the room's own flag on the render
     * that follows catches that case; the listener above covers a floor map arriving later.
     *
     * It also means a stale "ready" can never carry over from the previous room: a new room is
     * not shown until that room is initialized.
     */
    if (!room?.isInitialized) return null;

    return (
        <>
            <RoomEventHandler />
            <RoomWidgets />
            <RoomCanvas />
        </>
    );
};
