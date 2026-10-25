/** A carried item id at or above this is no hand item: it has no name and cannot be handed on or dropped. */
const MAX_CARRY_ITEM = 999999;

/**
 * Whether an avatar's `carryItem` is a real hand item - the `carryItem > 0 && carryItem < 999999`
 * check Flash's infostand and avatar menus (`InfoStandUserView`, `AvatarMenuView`,
 * `OwnAvatarMenuView`, `PetMenuView`) each make before naming, passing or dropping it.
 */
export const isHandItem = (carryItem: number): boolean => (carryItem > 0) && (carryItem < MAX_CARRY_ITEM);
