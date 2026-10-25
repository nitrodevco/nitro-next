import { RoomEngineObjectEvent, RoomObjectCategoryEnum, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';

import { wiredStuffAdded, wiredStuffSelected, wiredUserSelected } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

import { useRoomEventDispatcher } from '../room/useRoomEventDispatcher';

/**
 * What the room tells the wired system about - the three calls Flash makes into
 * `IHabboUserDefinedRoomEvents` from outside it:
 *
 * - `InfoStandWidgetHandler`, on the object info request every selection raises: `stuffSelected`
 *   for a furni (a wall item as its negative id) and `userSelected` for a unit, by room index;
 * - `HabboUserDefinedRoomEvents.roomObjectAddedHandler` (`REOE_ADDED`): `stuffAdded`, so a picked
 *   furni that is placed again gets its highlight back.
 *
 * Mounted once with the setup dialog's component, whether or not a dialog is open: a click on a
 * user has to reach the server when the room has a "user clicks user" trigger.
 */
export const useWiredRoomSelectionHandler = () => {
    const { send } = useWebSocketContext();

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED, (event) => {
        switch (Number(event.category)) {
            case Number(RoomObjectCategoryEnum.Floor):
                wiredStuffSelected(send, event.objectId);
                break;
            case Number(RoomObjectCategoryEnum.Wall):
                wiredStuffSelected(send, -event.objectId);
                break;
            case Number(RoomObjectCategoryEnum.Unit):
                wiredUserSelected(send, event.objectId);
                break;
        }
    });

    useRoomEventDispatcher<RoomEngineObjectEvent>(RoomEngineObjectEvent.ADDED, (event) => {
        if (Number(event.category) === Number(RoomObjectCategoryEnum.Floor)) wiredStuffAdded(event.objectId);
        else if (Number(event.category) === Number(RoomObjectCategoryEnum.Wall)) wiredStuffAdded(-event.objectId);
    });
};
