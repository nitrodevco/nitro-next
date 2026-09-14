import { CantConnectMessage, CloseConnectionMessage, FlatAccessDeniedMessage, OpenConnectionMessage, RoomReadyMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef } from 'react';

import { useRoomActions, useRoomSessionRequest, useSystemActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

export const useRoomDirectoryHandler = () => {
    const { setRoom, setOwnUserId } = useRoomActions();
    const { setLandingViewVisible } = useSystemActions();
    const roomSessionRequest = useRoomSessionRequest();
    // RoomMessageHandler keeps the current room id so it can dispose it on the next enter
    const currentRoomIdRef = useRef(0);

    useMessageListener(UserObjectMessage, (data) => {
        setOwnUserId(data.userInfo.userId);
    });

    /*
     * The room instance exists from the moment a session starts, the way Flash does it:
     *   RoomEngine.onRoomSessionEvent "RSE_STARTED" -> setCurrentRoom(session.roomId)
     * fires as soon as the client sends its OpenFlatConnection (`useGoToRoom`) - that is the
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
        if (!force && currentRoomIdRef.current === roomId) return;

        if (currentRoomIdRef.current !== 0) GetRoomEngine().disposeRoom(currentRoomIdRef.current);

        currentRoomIdRef.current = roomId;

        setLandingViewVisible(false);
        setRoom(GetRoomEngine().createRoom(roomId));
    };

    // RSE_ENDED: resetCurrentRoom(); disposeRoom(session.roomId); the landing view comes back
    const leaveRoom = () => {
        if (currentRoomIdRef.current !== 0) {
            GetRoomEngine().disposeRoom(currentRoomIdRef.current);

            currentRoomIdRef.current = 0;
        }

        setRoom(undefined);
        setLandingViewVisible(true);
    };

    // Client-side session start/end requests (goToRoom, the toolbar's hotel view button).
    useEffect(() => {
        if (!roomSessionRequest) return;

        if (roomSessionRequest.type === 'start') enterRoom(roomSessionRequest.roomId, true);
        else leaveRoom();
    }, [ roomSessionRequest ]);

    useMessageListener(OpenConnectionMessage, data => enterRoom(data.roomId));

    useMessageListener(RoomReadyMessage, data => enterRoom(data.roomId));

    useMessageListener(CloseConnectionMessage, () => leaveRoom());

    /*
     * RoomSessionHandler.onFlatAccessDenied: no username means our own doorbell ring was
     * refused / unanswered -> RS_DISCONNECTED -> the pending session is disposed. (A username
     * is a verdict on someone else ringing at a room we control.)
     */
    useMessageListener(FlatAccessDeniedMessage, (data) => {
        if (data.username.length) return;

        leaveRoom();
    });

    // The navigator quits the pending session and Flash's landing view disposes it: back to the hotel view.
    useMessageListener(CantConnectMessage, () => leaveRoom());
};
