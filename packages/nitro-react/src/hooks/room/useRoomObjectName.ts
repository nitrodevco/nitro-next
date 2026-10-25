import { IRoomObjectNameData, ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useRoom, useRoomUsersActions } from '#base/context/room';
import { useSystemStore, useTranslation } from '#base/context/system';
import { getFurnitureData } from '#base/utils';

/**
 * The name a bubble shows for a room object - a user's name, a furni's localized name -
 * together with the type the caller picks a bubble by.
 */
export const useRoomObjectName = (objectData: ISimpleRoomObjectData) => {
    const { objectId, category } = objectData;
    const room = useRoom();
    const roomObject = room?.getRoomObject(objectId, category);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const { getUserDataByIndex } = useRoomUsersActions();
    const t = useTranslation();

    if (!roomObject) return undefined;

    let id = -1;
    let name = '';
    let userType = RoomObjectUserType.None;

    switch (category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            if (roomObject.type.indexOf('poster') === 0) {
                const posterId = parseInt(roomObject.type.replace('poster', ''));

                name = t(`poster_${posterId}_name`);
            } else {
                const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);

                const furnitureData = getFurnitureData({ floorItems, wallItems }, typeId, (category === RoomObjectCategoryEnum.Wall));

                if (furnitureData) {
                    id = objectId;
                    name = furnitureData.localizedName;
                }
            }

            break;
        }
        case RoomObjectCategoryEnum.Unit: {
            const userData = getUserDataByIndex(objectId);

            if (userData) {
                id = userData.webID;
                name = userData.name;
                userType = userData.userType;
            }

            break;
        }
    }

    return { id, objectId, category, name, userType } as IRoomObjectNameData;
};
