import { CantConnectMessage, CloseConnectionMessage, OpenConnectionMessage, RoomReadyMessage, UserObjectMessage } from "@nitrodevco/nitro-packets";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { useRef } from "react";

import { useRoomActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDirectoryHandler = () => {
    const { setRoom, setOwnUserId, setLandingViewVisible } = useRoomActions();
    // RoomMessageHandler keeps the current room id so it can dispose it on the next enter
    const currentRoomIdRef = useRef(0);

    useMessageListener(UserObjectMessage, data => {
        setOwnUserId(data.userInfo.userId);
    });

    /*
     * Flash enters a room from two places, both guarded the same way:
     *   RoomEngine.onRoomSessionEvent "RSE_STARTED" -> setCurrentRoom(session.roomId)
     *   RoomMessageHandler.onRoomReady -> if (currentRoomId != roomId) setCurrentRoom(roomId)
     * and setCurrentRoom disposes the previous room before adopting the new id. The guard
     * makes whichever arrives first win and the other a no-op.
     */
    const enterRoom = (roomId: number) => {
        if (currentRoomIdRef.current === roomId) return;

        if (currentRoomIdRef.current !== 0) GetRoomEngine().disposeRoom(currentRoomIdRef.current);

        currentRoomIdRef.current = roomId;

        setLandingViewVisible(false);
        setRoom(GetRoomEngine().createRoom(roomId));
    };

    useMessageListener(OpenConnectionMessage, data => enterRoom(data.roomId));

    const leaveRoom = () => {
        // RSE_ENDED: resetCurrentRoom(); disposeRoom(session.roomId)
        if (currentRoomIdRef.current !== 0) {
            GetRoomEngine().disposeRoom(currentRoomIdRef.current);

            currentRoomIdRef.current = 0;
        }

        setRoom(undefined);
        setLandingViewVisible(true);
    };

    useMessageListener(CloseConnectionMessage, leaveRoom);

    /*
     * IncomingMessages.onCantConnect dispatches HTIE_ICON_RECEPTION — a failed entry
     * always lands on hotel view, and the server has already removed us from the
     * previous room without sending CloseConnection.
     */
    useMessageListener(CantConnectMessage, leaveRoom);

    useMessageListener(RoomReadyMessage, data => enterRoom(data.roomId));
}