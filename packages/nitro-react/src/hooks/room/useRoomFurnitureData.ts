import { FurnitureUsagePolicyEnum, GetObjectDataForFlags, IFurniData, IFurnitureData, IRoomObjectModel, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useRoom } from '#base/context/room';
import { useSystemStore, useTranslation } from '#base/context/system';
import { getFurnitureData } from '#base/utils';

import { useRoomObjectModelVersion } from './useRoomObjectModelVersion';

/** What the furni's model holds that can change while it is in the room, as of `_version` (`useRoomObjectModelVersion`). */
const readFurnitureModel = (model: IRoomObjectModel, _version: string) => {
    const stuffData = GetObjectDataForFlags(model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat));

    stuffData.initializeFromRoomObjectModel(model);

    return {
        typeId: model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId),
        stuffData,
        ownerId: model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId),
        ownerName: model.getValue<string>(RoomObjectVariableEnum.FurnitureOwnerName),
        usagePolicy: model.getValue<FurnitureUsagePolicyEnum>(RoomObjectVariableEnum.FurnitureUsagePolicy),
        groupId: model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedGuildId),
        extraParam: model.getValue<string>(RoomObjectVariableEnum.InfostandExtraParam) ?? undefined,
    };
};

/**
 * Everything the UI wants to know about one furniture object, joined from its room object model
 * and the furniture data the client loaded: name and description (a poster takes its own from
 * the localization), owner, usage policy, group and the parsed stuff data.
 */
export const useRoomFurnitureData = (objectId: number, category: RoomObjectCategoryEnum) => {
    const room = useRoom();
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const roomObject = room?.getRoomObject(objectId, category);
    const t = useTranslation();
    const modelVersion = useRoomObjectModelVersion(objectId, category);

    if (!roomObject) return undefined;

    const { typeId, stuffData, ownerId, ownerName, usagePolicy, groupId, extraParam } = readFurnitureModel(roomObject.model, modelVersion);

    let name: string = '';
    let description: string = '';
    let furnitureData: IFurnitureData | undefined = undefined;

    if (roomObject.type.indexOf('poster') === 0) {
        const posterId = parseInt(roomObject.type.replace('poster', ''));

        name = t(`poster_${posterId}_name`);
        description = t(`poster_${posterId}_desc`);
    } else {
        if ((category === RoomObjectCategoryEnum.Floor) || (category === RoomObjectCategoryEnum.Wall)) furnitureData = getFurnitureData({ floorItems, wallItems }, typeId, (category === RoomObjectCategoryEnum.Wall));

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
        extraParam,
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
