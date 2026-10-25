/**
 * A value read off the current room, looked at again whenever one of `events` is dispatched on it.
 * The room is engine state that tells React nothing; its events only say when to look again, which
 * is `useSyncExternalStore` - and that reads once more straight after subscribing, which a listener
 * attached in an effect cannot. `getSnapshot` must return the same value while nothing changed (a
 * primitive, or a string built from the parts that matter).
 */
import { useCallback, useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';

type Room = ReturnType<typeof useRoom>;

export const useRoomEventSnapshot = <T>(events: readonly string[], getSnapshot: (room: Room) => T): T => {
    const room = useRoom();
    const eventKey = events.join('|');

    const subscribe = useCallback((onChange: () => void) => {
        if (!room) return () => undefined;

        const names = eventKey.split('|');

        for (const name of names) room.eventDispatcher.addEventListener(name, onChange);

        return () => {
            for (const name of names) room.eventDispatcher.removeEventListener(name, onChange);
        };
    }, [ room, eventKey ]);

    return useSyncExternalStore(subscribe, () => getSnapshot(room));
};
