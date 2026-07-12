import type { IFurnitureData, IRoomPetData } from "@nitrodevco/nitro-api";
import { GetObjectDataForFlags, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";

import { useRoomSelector, useRoomUsersActions } from "#base/context";
import { useFurnitureDataStore } from "#base/stores";
import { InfostandFurniView } from "#base/views/room-widgets/infostand/InfostandFurniView";
import { InfostandPetView } from "#base/views/room-widgets/infostand/InfostandPetView";
import { InfostandUserView } from "#base/views/room-widgets/infostand/InfostandUserView";

type RoomObjectInfostandProps = {
    selectedObjectId: number;
    selectedObjectCategory: RoomObjectCategoryEnum;
    onClose: () => void;
}

export const RoomObjectInfostand = (props: RoomObjectInfostandProps) => {
    const { selectedObjectId, selectedObjectCategory, onClose } = props;
    const room = useRoomSelector();
    const { getUserDataByIndex } = useRoomUsersActions();
    const floorItems = useFurnitureDataStore(x => x.floorItems);
    const wallItems = useFurnitureDataStore(x => x.wallItems);

    switch (selectedObjectCategory) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            const roomObject = room?.getRoomObject(selectedObjectId, selectedObjectCategory);

            if (!roomObject) return null;

            if (roomObject.model.getValue<string>(RoomObjectVariableEnum.InfostandExtraParam)) {
                //
            }
            const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);
            const dataFormat = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat);
            const stuffData = GetObjectDataForFlags(dataFormat);

            stuffData.initializeFromRoomObjectModel(roomObject.model);

            let furnitureData: IFurnitureData | undefined = undefined;

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

            if (!furnitureData) return null;

            return <InfostandFurniView onClose={onClose} data={furnitureData} />;
        }
        case RoomObjectCategoryEnum.Unit: {
            const userData = getUserDataByIndex(selectedObjectId);

            if (userData) {
                switch (userData.type) {
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
}