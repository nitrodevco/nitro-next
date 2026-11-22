/**
 * Not Flash's: the room's own content handlers - the floor and height maps, the furniture and the
 * avatars (`registerRoomMappingHandlers`, `registerRoomFurnitureHandlers`, `registerRoomUserHandlers`)
 * - kept by packet as they are subscribed, so that a client module's secondary room is fed through
 * the very handlers the room on screen is (`commands/room/secondaryRooms.ts`). Kept in the order they
 * were subscribed in, which is the order the connection calls them in.
 */
import { IncomingPacketConstructor } from '@nitrodevco/nitro-api';

import type { WebSocketConnection } from '#base/context/communication';

type Handler = (data: object) => void;

const handlers = new Map<IncomingPacketConstructor<object>, Handler[]>();

/** `connection`, whose `subscribe` also keeps each handler as one of the room's content handlers. */
export const roomContentConnection = (connection: WebSocketConnection): WebSocketConnection => ({
    ...connection,
    subscribe: (event, handler) => {
        const unsubscribe = connection.subscribe(event, handler);

        handlers.set(event, [ ...(handlers.get(event) ?? []), handler ]);

        return () => {
            unsubscribe();

            const next = (handlers.get(event) ?? []).filter(x => x !== handler);

            if (next.length) handlers.set(event, next);
            else handlers.delete(event);
        };
    },
});

/** The room's content handlers of a packet, in the order the connection calls them. */
export const getRoomContentHandlers = (event: IncomingPacketConstructor<object>): readonly Handler[] => handlers.get(event) ?? [];
