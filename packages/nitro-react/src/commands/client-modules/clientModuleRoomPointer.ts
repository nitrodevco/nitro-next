/**
 * Not Flash's: the pointer events over the room that the room did not use, offered to client modules
 * (`api.room.onUnhandledPointer`) - a press, a click or hover over the room's empty space, where a
 * module draws something of its own. The room canvas asks only after its own handling hit nothing
 * (no object, no floor, no wall, not a drag or an area selection); a listener that answers `true`
 * takes the event, and the room's "nothing here" handling (a click there deselects) is skipped.
 * Without listeners the canvas does what it always did. The listener added last is asked first; one
 * that throws is logged and counts as not taking it. Kept free of runtime imports, so a test can run it.
 */
import type { ClientModuleRoomPointerEvent } from '#base/context/client-modules/clientModuleModel';

export type ClientModuleRoomPointerListener = (event: ClientModuleRoomPointerEvent) => boolean | void;

export interface ClientModuleRoomPointer {
    /** `listener` is asked for each unused event from now on; returns its removal. */
    add: (owner: string, listener: ClientModuleRoomPointerListener) => () => void;
    /** Whether any module listens: the canvas builds no event otherwise. */
    has: () => boolean;
    /** Asks the listeners, latest first, until one takes the event: whether one did. */
    offer: (event: ClientModuleRoomPointerEvent) => boolean;
}

export const createClientModuleRoomPointer = (onError: (owner: string, error: unknown) => void): ClientModuleRoomPointer => {
    const listeners: { owner: string; listener: ClientModuleRoomPointerListener }[] = [];

    return {
        add: (owner, listener) => {
            const entry = { owner, listener };

            listeners.push(entry);

            return () => {
                const index = listeners.indexOf(entry);

                if (index >= 0) listeners.splice(index, 1);
            };
        },
        has: () => (listeners.length > 0),
        offer: (event) => {
            for (const entry of [ ...listeners ].reverse()) {
                try {
                    if (entry.listener(event) === true) return true;
                } catch (error) {
                    onError(entry.owner, error);
                }
            }

            return false;
        },
    };
};
