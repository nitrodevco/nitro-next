import { IRoom } from '@nitrodevco/nitro-api';

import { RoomStore, roomStore } from '#base/context/room';

/**
 * Lends the room the stacking height map the server keeps sending, so the renderer can ask how
 * high a tile is. Not a packet listener: the map arrives through the room store, and this follows
 * the store - re-pointing whenever the room or its map changes, and handing the previous room back
 * a flat floor.
 *
 * Returns the unsubscribe.
 */
export const registerRoomTileHeights = () => {
    let current: IRoom | undefined = undefined;

    const apply = ({ room, width, heights }: RoomStore) => {
        if (current && (current !== room)) current.getTileHeight = () => 0;

        current = room;

        if (room) room.getTileHeight = (x: number, y: number) => heights[(y * width) + x];
    };

    apply(roomStore.getState());

    const unsubscribe = roomStore.subscribe((state, previous) => {
        if ((state.room === previous.room) && (state.width === previous.width) && (state.heights === previous.heights)) return;

        apply(state);
    });

    return () => {
        unsubscribe();

        if (current) current.getTileHeight = () => 0;

        current = undefined;
    };
};
