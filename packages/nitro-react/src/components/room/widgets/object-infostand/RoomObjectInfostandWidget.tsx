import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeUtils } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useRoomSelector } from "#base/context";
import { useRoomObjectDeselected, useRoomObjectSelected } from "#base/hooks";
import { InfostandPetViewPixi } from "#base/views-pixi/room-widgets/object-infostand/InfostandPetViewPixi";
import { InfostandUserViewPixi } from "#base/views-pixi/room-widgets/object-infostand/InfostandUserViewPixi";

import { InfostandFurni } from "./InfostandFurni";

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

    switch (selectedData.category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            return <InfostandFurni objectData={selectedData} onClose={onClose} />;
        }
        case RoomObjectCategoryEnum.Unit: {
            const roomObject = room.getRoomObject(selectedData.objectId, selectedData.category);

            if (!roomObject) return null;

            const userType = RoomObjectUserTypeUtils.getAvatarType(roomObject.type);

            if (!userType) return null;

            switch (userType) {
                case RoomObjectUserType.Pet: {
                    return <InfostandPetViewPixi objectData={selectedData} onClose={onClose} />;
                }
                case RoomObjectUserType.User: {
                    return <InfostandUserViewPixi objectData={selectedData} onClose={onClose} />;
                }
                case RoomObjectUserType.Bot: {
                    return <InfostandUserViewPixi objectData={selectedData} onClose={onClose} />;
                }
                case RoomObjectUserType.RentableBot: {
                    return <InfostandUserViewPixi objectData={selectedData} onClose={onClose} />;
                }
            }
        }
    }

    return null;
}