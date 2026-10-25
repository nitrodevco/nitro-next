/** `PickupMode`: none, eject someone else's furni, pick up your own. */
export const PICKUP_NONE = 0;
export const PICKUP_EJECT = 1;
export const PICKUP_FULL = 2;

export type FurniturePickupModeInput = {
    playTestMode: boolean;
    isStickie: boolean;
    /** `RoomDesktop.isOwnerOfFurniture`. */
    isOwner: boolean;
    isRoomOwner: boolean;
    /** `roomControllerLevel >= 3`. */
    isGuildAdmin: boolean;
    /** `SessionDataManager.isAnyRoomController` (security 5). */
    isAnyRoomController: boolean;
    /** Takes somebody else's furni into their own inventory (`room.furni.steal`); level 5 without permission nodes. */
    canStealFurni: boolean;
    isBuildersClub: boolean;
};

/**
 * `InfoStandFurniView.updatePickupMode`: whether the infostand offers "Pick up" or "Eject". Flash
 * offers staff "Pick up" on anyone's furni, but where the furni goes is the server's choice: Turbo
 * puts it in the clicker's inventory only for `room.furni.steal` and otherwise returns it to its
 * owner, so staff without that permission are offered "Eject", the word for what happens. A server
 * that sends no permission nodes leaves `canStealFurni` at level 5, which is Flash's choice exactly.
 * A Builders Club furni goes back to the club whoever takes it, so it keeps Flash's "Pick up".
 */
export const getFurniturePickupMode = (input: FurniturePickupModeInput): number => {
    if (input.playTestMode || input.isStickie) return PICKUP_NONE;

    if (input.isOwner || (input.isBuildersClub ? input.isAnyRoomController : input.canStealFurni)) return PICKUP_FULL;

    if (input.isRoomOwner || input.isGuildAdmin || input.isAnyRoomController) return PICKUP_EJECT;

    return PICKUP_NONE;
};
