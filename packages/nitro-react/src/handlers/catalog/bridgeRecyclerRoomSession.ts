/**
 * `HabboCatalog.onRoomSessionEvent`'s recycler part: when the room session ends,
 * `RecyclerLogic.setRoomSessionActive(false)` empties the slots and, with the recycler ready, says
 * a room is needed. A session starting only redraws the recycle button, which reads the room
 * itself. The room session is `roomStore.room`; not a packet listener, so it returns the store
 * subscription's unsubscribe and is registered with the connection's handlers (`registerHandlers`).
 */
import { setRecyclerRoomSessionEnded } from '#base/commands';
import { roomStore } from '#base/context/room';

export const bridgeRecyclerRoomSession = () => roomStore.subscribe((state, previous) => {
    // A room left, or swapped for another: the old session ended.
    if ((state.room === previous.room) || !previous.room) return;

    setRecyclerRoomSessionEnded();
});
