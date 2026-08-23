import { FurnitureUsagePolicyEnum, GetObjectDataForFlags, IFurniData, IFurnitureData, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useFurnitureDataSelector, useRoomSelector, useTranslation } from '#base/context';

export const useRoomFurnitureData = (objectId: number, category: RoomObjectCategoryEnum) => {
    const room = useRoomSelector();
    const { floorItems, wallItems } = useFurnitureDataSelector();
    const roomObject = room?.getRoomObject(objectId, category);
    const t = useTranslation();

    if (!roomObject) return undefined;

    const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);
    const dataFormat = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat);
    const stuffData = GetObjectDataForFlags(dataFormat);
    const ownerId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId);
    const ownerName = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureOwnerName);
    const usagePolicy = roomObject.model.getValue<FurnitureUsagePolicyEnum>(RoomObjectVariableEnum.FurnitureUsagePolicy);
    const groupId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedGuildId);

    stuffData.initializeFromRoomObjectModel(roomObject.model);

    let name: string = '';
    let description: string = '';
    let furnitureData: IFurnitureData | undefined = undefined;

    if (roomObject.type.indexOf('poster') === 0) {
        const posterId = parseInt(roomObject.type.replace('poster', ''));

        name = t(`poster_${posterId}_name`);
        description = t(`poster_${posterId}_desc`);
    } else {
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
            name = furnitureData.localizedName;
            description = furnitureData.description;
        }
    }

    return {
        id: roomObject.id,
        objectId,
        category,
        name,
        description,
        extraParam: roomObject.model.getValue<string>(RoomObjectVariableEnum.InfostandExtraParam) ?? undefined,
        stuffData,
        furnitureData,
        isWallItem: (category === RoomObjectCategoryEnum.Wall),
        isStickie: (roomObject.type.indexOf('post_it') > -1) ? true : false,
        ownerId,
        ownerName,
        usagePolicy,
        groupId,
    } as IFurniData;
};
