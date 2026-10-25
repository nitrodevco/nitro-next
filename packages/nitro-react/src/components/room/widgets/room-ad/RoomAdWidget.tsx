import { RoomControllerLevelEnum, RoomEngineRoomAdEvent, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useOwnControllerLevel, useRoom } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { ClientGates, useClientGate } from '#base/context/user';
import { useRoomEventDispatcher } from '#base/hooks';
import { openHabboMainPage } from '#base/utils';
import { RoomAdTooltipView } from '#base/views/room-widgets/room-ad/RoomAdTooltipView';

/**
 * The `RoomDesktop` side of a furni carrying a room ad (`furniture_ad_url`): the
 * `RoomEngineRoomAdEvent`s `useRoomAdHandler` raises, answered as `handleRoomAdClick` and
 * `handleRoomAdTooltip` answered them.
 *
 * - A click opens the ad's web page for a visitor; someone with rights (or staff, who count as a
 *   controller in every room - `isAnyRoomController`) has to double-click, so arranging the room
 *   does not keep throwing them out of it. Only an `http` url is ever opened.
 * - Hovering shows the ad's tooltip: the `<furni type>.tooltip` text, or `${ads.roomad.tooltip}`
 *   when the furni has none. A second one waits for the first to hide.
 */
export const RoomAdWidget = () => {
    const room = useRoom();
    const controllerLevel = useOwnControllerLevel();
    const isAnyRoomController = useClientGate(ClientGates.AnyRoomController);
    const t = useTranslation();
    const [ tooltip, setTooltip ] = useState<string | undefined>(undefined);

    const isController = (controllerLevel >= RoomControllerLevelEnum.Guest) || isAnyRoomController;

    useRoomEventDispatcher<RoomEngineRoomAdEvent>([
        RoomEngineRoomAdEvent.FURNI_CLICK,
        RoomEngineRoomAdEvent.FURNI_DOUBLE_CLICK,
    ], (event) => {
        const url = room?.getRoomObject(event.objectId, event.category)?.model.getValue<string>(RoomObjectVariableEnum.FurnitureAdUrl);

        if (!url || (url.indexOf('http') !== 0)) return;

        // A click is the visitor's way in, a double click the controller's.
        if ((event.type === RoomEngineRoomAdEvent.FURNI_CLICK) === isController) return;

        openHabboMainPage(url);
    });

    useRoomEventDispatcher<RoomEngineRoomAdEvent>([
        RoomEngineRoomAdEvent.TOOLTIP_SHOW,
        RoomEngineRoomAdEvent.TOOLTIP_HIDE,
    ], (event) => {
        if (event.type === RoomEngineRoomAdEvent.TOOLTIP_HIDE) {
            setTooltip(undefined);

            return;
        }

        if (tooltip !== undefined) return;

        const roomObject = room?.getRoomObject(event.objectId, event.category);

        if (!roomObject) return;

        setTooltip(t(`${roomObject.type}.tooltip`, '${ads.roomad.tooltip}'));
    });

    if (tooltip === undefined) return null;

    return <RoomAdTooltipView text={tooltip} />;
};
