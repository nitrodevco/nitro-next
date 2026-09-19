import { roomStore } from './store/RoomStore';

/**
 * The room as it is right now, for code that runs outside React - packet handlers above all.
 * Read it when the packet lands, never at registration: packets arrive in batches with no render
 * between them, and a room captured earlier can be the one that was just left.
 */
export const getRoom = () => roomStore.getState().room;
