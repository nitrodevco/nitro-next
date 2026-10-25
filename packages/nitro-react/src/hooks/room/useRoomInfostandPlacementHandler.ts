/**
 * `InfoStandWidget.onRoomObjectPlaced`: the infostand hears every `REOE_PLACED` (as
 * `RoomWidgetRoomObjectPlaceEvent`) and acts on its own placements - the place more button's
 * (`onInfostandObjectPlaced`). Mounted with the infostand widget, which stays while the stand is
 * closed, as Flash's widget does.
 */
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent } from '@nitrodevco/nitro-api';

import { onInfostandObjectPlaced } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

export const useRoomInfostandPlacementHandler = () => {
    const { send } = useWebSocketContext();

    useRoomEventDispatcher<RoomEngineObjectPlacedEvent>(RoomEngineObjectEvent.PLACED, event => onInfostandObjectPlaced(send, event));
};
