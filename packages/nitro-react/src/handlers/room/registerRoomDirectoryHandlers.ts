import { AvatarEffectSelectedComposer, CantConnectMessage, CloseConnectionMessage, FlatAccessDeniedMessage, OpenConnectionMessage, RoomReadyMessage } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { leaveRoomAsNewUser, onRoomSessionForNoobLobbyOffer } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The room session's lifecycle - Flash's `RoomSessionManager`: the connection opening starts
 * the session, `RoomReady` names the room the engine should build, and closing, an access
 * denial or a failed connect ends it and puts the hotel view back.
 */
export const registerRoomDirectoryHandlers = ({ subscribe, send }: WebSocketConnection) => {
    // RoomMessageHandler keeps the current room id so it can dispose it on the next enter
    let currentRoomId = 0;

    /*
     * `HabboInventory.roomSessionEventHandler` on RSE_ENDED: `deselectAllEffects` - no effect is
     * worn any more, so the effects window stops showing one as worn, and the server is told to
     * take the worn effect off. The effect the player last chose is kept, so it can be put back on
     * in the next room (`effects.reactivate.on.room.entry`).
     */
    const deselectAllEffects = () => {
        userStore.getState().selectAvatarEffect(0);

        send(new AvatarEffectSelectedComposer({ effectType: -1 }));
    };

    /*
     * The room instance exists from the moment a session starts, the way Flash does it:
     *   RoomEngine.onRoomSessionEvent "RSE_STARTED" -> setCurrentRoom(session.roomId)
     * fires as soon as the client sends its OpenFlatConnection (`goToRoom`) - that is the
     * black "entering" screen while the doorbell rings, the password is checked or the room
     * packets are still on their way. The two server-side entries go through the same guard:
     *   RoomMessageHandler.onRoomReady -> if (currentRoomId != roomId) setCurrentRoom(roomId)
     * (a teleport or server-forced move, where no session was started client-side), and
     * OpenConnection (RS_CONNECTED), which is a no-op for a session already started.
     * setCurrentRoom disposes the previous room before adopting the new id.
     *
     * `force` is RoomSessionManager.createSession: a new session always replaces the current
     * one, even for the same room id.
     */
    const enterRoom = (roomId: number, force: boolean = false) => {
        if (!force && currentRoomId === roomId) return;

        if (currentRoomId !== 0) {
            deselectAllEffects();

            GetRoomEngine().disposeRoom(currentRoomId);
            // `RoomSessionManager.disposeSession`: the ended session's content may go once nothing uses it.
            GetRoomEngine().purgeRoomContent();
        }

        currentRoomId = roomId;

        systemStore.getState().setLandingViewVisible(false);
        roomStore.getState().setRoom(GetRoomEngine().createRoom(roomId));

        onRoomSessionForNoobLobbyOffer(send, roomId);
    };

    // RSE_ENDED: resetCurrentRoom(); disposeRoom(session.roomId); the landing view comes back
    const leaveRoom = () => {
        if (currentRoomId !== 0) {
            deselectAllEffects();

            GetRoomEngine().disposeRoom(currentRoomId);
            // `RoomSessionManager.disposeSession` -> `purgeRoomContent`.
            GetRoomEngine().purgeRoomContent();

            currentRoomId = 0;
        }

        roomStore.getState().setRoom(undefined);
        systemStore.getState().setLandingViewVisible(true);

        onRoomSessionForNoobLobbyOffer(send, undefined);
        // A new user goes on to a lobby, or home out of one; the hotel view shows until it opens.
        leaveRoomAsNewUser(send);
    };

    // Client-side session start/end requests (goToRoom, the toolbar's hotel view button).
    const unsubscribeSessionRequests = systemStore.subscribe((state, previous) => {
        const request = state.roomSessionRequest;

        if (!request || (request === previous.roomSessionRequest)) return;

        if (request.type === 'start') enterRoom(request.roomId, true);
        else leaveRoom();
    });

    const unsubscribePackets = subscribeAll(subscribe, [
        on(OpenConnectionMessage, data => enterRoom(data.roomId)),

        on(RoomReadyMessage, data => enterRoom(data.roomId)),

        on(CloseConnectionMessage, () => leaveRoom()),

        /*
         * RoomSessionHandler.onFlatAccessDenied: no username means our own doorbell ring was
         * refused / unanswered -> RS_DISCONNECTED -> the pending session is disposed. (A username
         * is a verdict on someone else ringing at a room we control.)
         */
        on(FlatAccessDeniedMessage, (data) => {
            if (data.username.length) return;

            leaveRoom();
        }),

        // The navigator quits the pending session and Flash's landing view disposes it: back to the hotel view.
        on(CantConnectMessage, () => leaveRoom()),
    ]);

    return () => {
        unsubscribeSessionRequests();
        unsubscribePackets();
    };
};
