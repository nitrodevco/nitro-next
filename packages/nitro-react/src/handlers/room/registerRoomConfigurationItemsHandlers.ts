import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ConfigurationItemStatesMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What the room's wired configuration items switch on - `RoomMessageHandler.onConfigurationItemStates`.
 * Flash kept all four as room variables on the engine, and so does this: the room holds them the
 * way `RoomEngine.setHanditemControlBlocked` and its siblings did, and `setInvisibleFurni` also
 * hides the tagged layers of the furni in the room. The two that gate React - hand item control
 * and free furni movements - are mirrored into the store, since a room value does not re-render
 * anything. `ChooserDisabled` stays on the room only: the user chooser that reads it
 * (`UserChooserWidgetHandler.isChooserDisabled`) is not ported.
 */
export const registerRoomConfigurationItemsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setIsHanditemControlBlocked, setIsFreeFurniMovementsMode } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(ConfigurationItemStatesMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.setRoomValue(RoomObjectVariableEnum.HanditemControlBlocked, data.isHanditemControlBlocked ? 1 : 0);
            room.setRoomValue(RoomObjectVariableEnum.ChooserDisabled, data.chooserDisabled ? 1 : 0);
            room.setRoomValue(RoomObjectVariableEnum.FreeFurniMovementsMode, data.freeFurniMovementsEnabled ? 1 : 0);
            room.setInvisibleFurni(data.invisibleFurni);

            setIsHanditemControlBlocked(data.isHanditemControlBlocked);
            setIsFreeFurniMovementsMode(data.freeFurniMovementsEnabled);
        }),
    ]);
};
