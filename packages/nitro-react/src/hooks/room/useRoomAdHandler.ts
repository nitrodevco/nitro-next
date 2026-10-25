import { NitroLogger, RoomEngineRoomAdEvent, RoomObjectRoomAdEvent } from '@nitrodevco/nitro-api';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useWindowActions } from '#base/context/system';

/** `RoomObjectEventHandler.handleObjectRoomAdEvent`: a click url that opens the games window. */
const NAVIGATOR_GAMES = 'NAVIGATOR_GAMES';

/** A double-click url naming a catalogue page to open. */
const CATALOG_PAGE_PREFIX = 'CATALOG_PAGE:';

/**
 * A furni with an ad on it being clicked or hovered - Flash's
 * `RoomObjectEventHandler.handleObjectRoomAdEvent`. What the logic's own click url asks for is
 * done here: a billboard's in-client link goes to `createLinkEvent` (`openClientLink`), and a
 * double click on `CATALOG_PAGE:<name>` opens that catalogue page. Every one of them is then
 * raised as a `RoomEngineRoomAdEvent` on the room, which `RoomAdWidget` (the `RoomDesktop` half)
 * answers with the ad's web page and its tooltip.
 *
 * `NAVIGATOR_GAMES` toggled the toolbar's games window; the port has no games window, so that
 * link does nothing but log. `RORAE_ROOM_AD_LOAD_IMAGE` never arrives: the branding logic
 * downloads its own image (`FurnitureRoomBrandingLogic.downloadBackground`) instead of asking
 * `RoomEngine.requestRoomAdImage` to.
 */
export const useRoomAdHandler = () => {
    const room = useRoom();
    const { showWindow } = useWindowActions();
    const { send } = useWebSocketContext();

    const handleRoomAdEvent = (event: RoomObjectRoomAdEvent) => {
        if (!room) return;

        let type: string | undefined = undefined;

        switch (event.type) {
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK:
                if (event.clickUrl === NAVIGATOR_GAMES) NitroLogger.log('Room ad asked for the games window, which is not ported');
                else if (event.clickUrl !== '') openClientLink(send, event.clickUrl);

                type = RoomEngineRoomAdEvent.FURNI_CLICK;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK:
                if (event.clickUrl && (event.clickUrl.indexOf(CATALOG_PAGE_PREFIX) === 0)) showWindow('catalog', { pageName: event.clickUrl.substring(CATALOG_PAGE_PREFIX.length) });

                type = RoomEngineRoomAdEvent.FURNI_DOUBLE_CLICK;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW:
                type = RoomEngineRoomAdEvent.TOOLTIP_SHOW;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE:
                type = RoomEngineRoomAdEvent.TOOLTIP_HIDE;
                break;
        }

        if (!type) return;

        room.dispatchEvent(new RoomEngineRoomAdEvent(type, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)));
    };

    return { handleRoomAdEvent };
};
