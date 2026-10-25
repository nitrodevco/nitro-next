import { IRoomObject, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

/** `RoomDesktop.isOwnerOfFurniture`: whether the furni's `furniture_owner_id` is the user. */
export const isFurnitureOwnedBy = (object: IRoomObject | null | undefined, userId: number): boolean =>
    !!object && (object.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === userId);
