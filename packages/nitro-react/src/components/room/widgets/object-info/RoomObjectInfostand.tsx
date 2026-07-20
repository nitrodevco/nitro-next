import type { IRoomFurnitureData, IRoomObjectData, IRoomPetData, IRoomUserData } from "@nitrodevco/nitro-api";
import { RoomObjectCategoryEnum, RoomObjectUserType } from "@nitrodevco/nitro-api";

import { InfostandFurniView } from "#base/views/room-widgets/infostand/InfostandFurniView";
import { InfostandPetView } from "#base/views/room-widgets/infostand/InfostandPetView";
import { InfostandUserView } from "#base/views/room-widgets/infostand/InfostandUserView";

type RoomObjectInfostandProps = {
    activeData: IRoomObjectData | undefined;
    onClose: () => void;
}

export const RoomObjectInfostand = (props: RoomObjectInfostandProps) => {
    const { activeData, onClose } = props;

    if (!activeData) return null;

    switch (activeData.category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            return <InfostandFurniView onClose={onClose} data={activeData as IRoomFurnitureData} />;
        }
        case RoomObjectCategoryEnum.Unit: {
            const userData = activeData as IRoomUserData;

            if (userData) {
                switch (userData.userType) {
                    case RoomObjectUserType.Pet: {
                        return <InfostandPetView onClose={onClose} data={userData as unknown as IRoomPetData} />;
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