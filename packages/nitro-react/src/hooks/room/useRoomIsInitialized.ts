import { RoomEngineEvent } from '@nitrodevco/nitro-api';
import { useCallback, useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';

const ROOM_STATE_EVENTS = [ RoomEngineEvent.INITIALIZED, RoomEngineEvent.DISPOSED ];

/**
 * Whether the current room has its floor map and can be shown - Flash's `REE_INITIALIZED`, which
 * is what made `RoomUI` create the room view.
 *
 * The room's own flag is the truth and its events only say when to look again, which is exactly
 * `useSyncExternalStore`: it reads the flag once more straight after subscribing. A listener
 * attached in an effect cannot do that. The floor map of a room the server already has loaded - a
 * room from the visit history, say - can arrive after the render that saw "not initialized" and
 * before the effect that would have listened, and then nothing ever asks again: a black screen
 * in a room the server has long since put you in.
 */
export const useRoomIsInitialized = () => {
    const room = useRoom();

    const subscribe = useCallback((onChange: () => void) => {
        if (!room) return () => undefined;

        for (const name of ROOM_STATE_EVENTS) room.eventDispatcher.addEventListener(name, onChange);

        return () => {
            for (const name of ROOM_STATE_EVENTS) room.eventDispatcher.removeEventListener(name, onChange);
        };
    }, [ room ]);

    return useSyncExternalStore(subscribe, () => room?.isInitialized ?? false);
};
