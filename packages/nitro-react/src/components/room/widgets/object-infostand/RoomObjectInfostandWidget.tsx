import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeUtils } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useRoomSelector } from "#base/context";
import { useRoomObjectDeselected, useRoomObjectSelected } from "#base/hooks";
import { InfostandPetView } from "#base/views/room-widgets/object-infostand/InfostandPetView";
import { InfostandUserView } from "#base/views/room-widgets/object-infostand/InfostandUserView";

import { InfostandFurni } from "./InfostandFurni";
import { ObjectInfostandContext } from "./ObjectInfostandContext";

export const RoomObjectInfostandWidget = () => {
    const [selectedData, setSelectedData] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoomSelector();

    const onClose = () => {
        setSelectedData(undefined);
    }

    useRoomObjectDeselected(_e => {
        setSelectedData(undefined);
    });

    useRoomObjectSelected(event => {
        setSelectedData({
            objectId: event.objectId,
            category: event.category
        });
    });

    if (!selectedData || !room) return null;

    const renderContent = () => {
        switch (selectedData.category) {
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall: {
                return <InfostandFurni />;
            }
            case RoomObjectCategoryEnum.Unit: {
                const roomObject = room.getRoomObject(selectedData.objectId, selectedData.category);

                if (!roomObject) return null;

                const userType = RoomObjectUserTypeUtils.getAvatarType(roomObject.type);

                if (!userType) return null;

                switch (userType) {
                    case RoomObjectUserType.Pet: {
                        return <InfostandPetView />;
                    }
                    case RoomObjectUserType.User:
                    case RoomObjectUserType.Bot:
                    case RoomObjectUserType.RentableBot: {
                        return <InfostandUserView />;
                    }
                }
            }
        }

        return null;
    }

    return (
        <ObjectInfostandContext value={{ objectData: selectedData, onClose }}>
            {renderContent()}
        </ObjectInfostandContext>
    );
}
