import { AccountPreferencesEventMessage, GetGuestRoomResultMessage, RoomRatingMessage } from '@nitrodevco/nitro-packets';

import { useRoomContext } from '#base/context';
import { useMessageListener } from '#base/hooks';

/*
 * RoomToolsWidgetHandler — registered with the room session from the start, unlike
 * the panel itself which only mounts once the engine has initialized. onRoomInfo
 * records the visit into the shared RoomVisitHistory; RoomRatingEvent carries the
 * like-button gate.
 */
export const useRoomToolsHandler = () => {
    const setToolsCanRate = useRoomContext(x => x.setToolsCanRate);
    const setUiFlags = useRoomContext(x => x.setUiFlags);
    const setToolsRoomEntered = useRoomContext(x => x.setToolsRoomEntered);

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (!data.enterRoom || !data.roomInfo) return;

        setToolsRoomEntered(data.roomInfo.roomId, data.roomInfo.name);
    });

    useMessageListener(RoomRatingMessage, data => setToolsCanRate(data.canRate));

    /* uiFlags bit 2 keeps the panel expanded across sessions (setRoomToolsState) */
    useMessageListener(AccountPreferencesEventMessage, data => setUiFlags(data.uIFlags));
}
