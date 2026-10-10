import { IRoomObjectController, RoomObjectUserTypeName, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

/**
 * `RoomObjectEventHandler.setObjectAlphaMultiplier`: a user or a rentable bot being placed or
 * moved fades through its own key, which the avatar visualization reads; everything else through
 * the furniture one.
 */
export const setObjectAlphaMultiplier = (object: IRoomObjectController, multiplier: number) => {
    if (!object) return;

    const isAvatar = (object.type === RoomObjectUserTypeName.User) || (object.type === RoomObjectUserTypeName.RentableBot);

    object.model.setValue(isAvatar ? RoomObjectVariableEnum.FigureAlphaMultiplier : RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
};

/**
 * `RoomObjectEventHandler.getValidRoomObjectDirection`: the next (or, going back, the previous)
 * of the directions the object allows - a monster plant's pet directions, any other object's
 * furniture directions. A direction not in the list starts from the first allowed one at or past
 * it; an object that lists none keeps its own.
 */
export const getValidRoomObjectDirection = (roomObject: IRoomObjectController, forward: boolean): number => {
    if (!roomObject?.model) return 0;

    const allowedDirections: number[] = roomObject.type === RoomObjectUserTypeName.MonsterPlant
        ? roomObject.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections)
        : roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

    const direction = roomObject.getDirection().x;

    if (!allowedDirections?.length) return direction;

    let dirIndex = allowedDirections.indexOf(direction);

    if (dirIndex < 0) {
        const insertAt = allowedDirections.findIndex(d => direction <= d);
        dirIndex = insertAt < 0 ? 0 : insertAt;
    }

    dirIndex = forward
        ? (dirIndex + 1) % allowedDirections.length
        : (dirIndex - 1 + allowedDirections.length) % allowedDirections.length;

    return allowedDirections[dirIndex];
};
