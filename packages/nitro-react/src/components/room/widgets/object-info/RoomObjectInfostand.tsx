import type { IFurnitureData, IRoomPetData } from "@nitrodevco/nitro-api";
import { FurnitureUsagePolicyEnum, GetObjectDataForFlags, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useRoomSelector, useRoomUsersActions } from "#base/context";
import { useRoomObjectDeselected, useRoomObjectSelected } from "#base/hooks";
import { useFurnitureDataStore, useLocalizationStore } from "#base/stores";
import { InfostandFurniView } from "#base/views/room-widgets/infostand/InfostandFurniView";
import { InfostandPetView } from "#base/views/room-widgets/infostand/InfostandPetView";
import { InfostandUserView } from "#base/views/room-widgets/infostand/InfostandUserView";

export const RoomObjectInfostand = () => {
    const [selectedObjectId, setSelectedObjectId] = useState<number>(-1);
    const [selectedObjectCategory, setSelectedObjectCategory] = useState<RoomObjectCategoryEnum>(RoomObjectCategoryEnum.Minimum);
    const room = useRoomSelector();
    const floorItems = useFurnitureDataStore(x => x.floorItems);
    const wallItems = useFurnitureDataStore(x => x.wallItems);
    const { getUserDataByIndex } = useRoomUsersActions();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const onClose = () => {
        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    }

    useRoomObjectDeselected(event => {
        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    })

    useRoomObjectSelected(event => {
        setSelectedObjectId(event.objectId);
        setSelectedObjectCategory(event.category);
    });

    switch (selectedObjectCategory) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            const roomObject = room?.getRoomObject(selectedObjectId, selectedObjectCategory);

            if (!roomObject) return null;

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

                name = getLocalizationValue(`poster_${posterId}_name`);
                description = getLocalizationValue(`poster_${posterId}_desc`);;
            } else {
                switch (selectedObjectCategory) {
                    case RoomObjectCategoryEnum.Floor: {
                        furnitureData = floorItems.get(typeId);
                        break;
                    }
                    case RoomObjectCategoryEnum.Wall: {
                        furnitureData = wallItems.get(typeId);
                        break;
                    }
                }

                if (furnitureData) {
                    name = furnitureData.localizedName;
                    description = furnitureData.description;
                }
            }

            return <InfostandFurniView onClose={onClose} data={{
                id: roomObject.id,
                objectId: roomObject.id,
                category: selectedObjectCategory,
                name,
                description,
                extraParam: roomObject.model.getValue<string>(RoomObjectVariableEnum.InfostandExtraParam) ?? undefined,
                stuffData,
                furnitureData,
                isWallItem: (selectedObjectCategory === RoomObjectCategoryEnum.Wall),
                isStickie: (roomObject.type.indexOf('post_it') > -1) ? true : false,
                ownerId,
                ownerName,
                usagePolicy,
                groupId
            }} />;
        }
        case RoomObjectCategoryEnum.Unit: {
            const userData = getUserDataByIndex(selectedObjectId);

            if (userData) {
                switch (userData.userType) {
                    case RoomObjectUserType.Pet: {
                        const petData = userData as unknown as IRoomPetData;

                        return <InfostandPetView onClose={onClose} data={petData} />;
                    }
                    case RoomObjectUserType.User: {
                        return <InfostandUserView onClose={onClose} data={userData} />;
                    }
                    case RoomObjectUserType.Bot: {
                        return <InfostandUserView onClose={onClose} data={userData} />;
                    }
                    case RoomObjectUserType.RentableBot: {
                        return <InfostandUserView onClose={onClose} data={userData} />;
                    }
                }
            }

            break;
        }
    }

    return null;
}