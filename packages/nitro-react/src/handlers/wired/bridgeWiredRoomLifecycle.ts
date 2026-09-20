/**
 * Clears the wired state that belongs to a room when that room goes - Flash's
 * `HabboUserDefinedRoomEvents.onRoomEngineEvent` on `REE_DISPOSED` (the variables synchronizer,
 * the environment and the setup dialog) and `IncomingMessages.onRoomExit` on `CloseConnection`.
 * Both end in the room store's room changing, so that is what is watched; not a packet listener,
 * hence not a `*Handlers`. `WiredEnvironment.leaveRoom` (`RSE_ENDED`) watches the same change
 * from `registerWiredEnvironmentHandlers`, where its timer lives.
 *
 * A room that starts gets the wired menu's play test mode on its session - Flash's
 * `WiredMenuController.roomSessionEventHandler` on `RSE_STARTED` (`session.playTestMode =
 * _playTestMode`); `setRoom` has just reset the session to its defaults.
 */
import { closeWiredSetup } from '#base/commands';
import { roomStore } from '#base/context/room';
import { wiredStore } from '#base/context/wired';

export const bridgeWiredRoomLifecycle = () => roomStore.subscribe((state, previous) => {
    if (state.room === previous.room) return;

    if (state.room) state.setPlayTestMode(wiredStore.getState().playTestMode);

    if (!previous.room) return;

    // The old room's furni went with it, so the highlights `close` takes off find nothing - harmless.
    closeWiredSetup();

    wiredStore.getState().resetRoom();
});
