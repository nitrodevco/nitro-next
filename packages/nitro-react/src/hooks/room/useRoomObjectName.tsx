import { IFurnitureData, IRoomObjectNameData, ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";

import { useFurnitureDataSelector, useRoomSelector, useRoomUsersActions, useTranslation } from "#base/context";

export const useRoomObjectName = (objectData: ISimpleRoomObjectData) => {
    const { objectId, category } = objectData;
    const room = useRoomSelector();
    const roomObject = room?.getRoomObject(objectId, category);
    const { floorItems, wallItems } = useFurnitureDataSelector();
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

                let furnitureData: IFurnitureData | undefined = undefined;

                switch (category) {
                    case RoomObjectCategoryEnum.Floor: {
                        furnitureData = floorItems[typeId];
                        break;
                    }
                    case RoomObjectCategoryEnum.Wall: {
                        furnitureData = wallItems[typeId];
                        break;
                    }
                }

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
}