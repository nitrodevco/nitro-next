import { useRoomIsInitialized } from '#base/hooks';

import { RoomCanvas } from './RoomCanvas';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomWidgets } from './widgets';

/**
 * Everything that exists only while a room is on screen: the canvas, the engine's event side and
 * the widgets.
 *
 * The room is shown when *it* says it is initialized, not when an event about it was caught - see
 * `useRoomIsInitialized` for why the two are not the same. It also means a stale "ready" can never
 * carry over from the previous room: a new room is not shown until that room is initialized.
 */
export const RoomContainer = () => {
    const isInitialized = useRoomIsInitialized();

    if (!isInitialized) return null;

    return (
        <>
            <RoomEventHandler />
            <RoomWidgets />
            <RoomCanvas />
        </>
    );
};
