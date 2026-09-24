/**
 * Whether the inventory is the one that put something into the room's object mover - the flag each
 * of Flash's inventory models keeps beside its `placeXToRoom` (`PetsModel.§_-ih§` and its twins),
 * read back by `onObjectPlaced`.
 *
 * The window hides while the ghost is out, because it covers the room the item is being dropped
 * into; once the item is actually placed (`REOE_PLACED`) the window comes back and the flag is
 * cleared. It is the inventory's own flag rather than the room's `objectPlacementSource`, which
 * starts out naming the inventory and so cannot say whether a placement is running.
 *
 * All three pages share it: only one placement can be out at a time, and whichever page started it
 * wants the same window back.
 */
import { StateCreator } from 'zustand';

type State = {
    /** `isObjectMoverRequested`'s inventory twin: a placement of ours is out and the window is hidden for it. */
    inventoryMoverRequested: boolean;
};

type Actions = {
    setInventoryMoverRequested: (requested: boolean) => void;
};

export const InventoryPlacementSliceInitialState: State = {
    inventoryMoverRequested: false,
};

export type InventoryPlacementSlice = State & Actions;

export const createInventoryPlacementSlice: StateCreator<InventoryPlacementSlice, [], [], InventoryPlacementSlice> = set => ({
    ...InventoryPlacementSliceInitialState,
    setInventoryMoverRequested: inventoryMoverRequested => set({ inventoryMoverRequested }),
});
