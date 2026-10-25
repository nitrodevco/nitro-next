/**
 * The object a finger is dropping (`RoomCanvas`'s touch placement), for the one click that drops it.
 *
 * The ghost lies under the finger, so that click hits it as well as the floor; a click on a user
 * while placing is `placeObjectOnUser`, which also marks the room's click as handled - Flash's way of
 * putting a pet product on a pet - and a pet or bot ghost would swallow its own drop. During that
 * click the ghost's own hit is passed over (`RoomEventHandler`), so the floor under it takes it.
 */
export const touchPlacementDrop: { objectId: number; category: number } = { objectId: 0, category: -1 };

/** Whether `objectId` / `category` is the object being dropped by a finger right now. */
export const isTouchPlacementDrop = (objectId: number, category: number) => (touchPlacementDrop.category !== -1) && (touchPlacementDrop.objectId === objectId) && (touchPlacementDrop.category === category);
