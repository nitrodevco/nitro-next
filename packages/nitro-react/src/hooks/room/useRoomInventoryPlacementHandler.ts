/**
 * Brings the inventory back once the thing it was placing is in the room - Flash's
 * `PetsModel.onObjectPlaced` and its twins on the furni and bots models, which answer `REOE_PLACED`
 * by showing the view again and dropping the flag they set when they hid it.
 *
 * `returnInventoryAfterPlacement` checks that flag, so a catalogue drag ending in the same event
 * passes straight through - the catalogue restores its own window.
 *
 * The flag also clears itself whenever the window is up again by any other route (the user opening
 * it from the toolbar, a trade opening it): it only ever means "hidden, waiting for a placement",
 * and nothing in the room reports a placement the user simply abandoned, so a stale one would
 * otherwise sit there and pop the window open on somebody else's placement later.
 */
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { onInventoryObjectPlaced, returnInventoryAfterPlacement } from '#base/commands';
import { useInventoryPlacementActions, useInventoryStore } from '#base/context/inventory';
import { useIsWindowVisible } from '#base/context/system';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

export const useRoomInventoryPlacementHandler = () => {
    const isVisible = useIsWindowVisible('inventory');
    const moverRequested = useInventoryStore(x => x.inventoryMoverRequested);
    const { setInventoryMoverRequested } = useInventoryPlacementActions();

    // `FurniModel.onObjectPlaced`: the next furni of a stack is placed straight away, and the window
    // comes back when the stack is used up or the drop did not place anything.
    useRoomEventDispatcher<RoomEngineObjectPlacedEvent>(RoomEngineObjectEvent.PLACED, event => onInventoryObjectPlaced(event));

    // A drop onto a user never reaches a tile, but the placement is over either way.
    useRoomEventDispatcher<RoomEngineObjectEvent>(RoomEngineObjectEvent.PLACED_ON_USER, () => returnInventoryAfterPlacement());

    useEffect(() => {
        if (isVisible && moverRequested) setInventoryMoverRequested(false);
    }, [ isVisible, moverRequested, setInventoryMoverRequested ]);
};
