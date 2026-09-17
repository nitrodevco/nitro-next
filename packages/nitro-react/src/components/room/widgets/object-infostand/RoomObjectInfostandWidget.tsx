import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeUtils } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoom } from '#base/context/room';
import { useRoomObjectDeselected, useRoomObjectSelected } from '#base/hooks';
import { InfostandUserView } from '#base/views/room-widgets/object-infostand/InfostandUserView';

import { InfostandBot } from './InfostandBot';
import { InfostandFurni } from './InfostandFurni';
import { InfostandPet } from './InfostandPet';

export const RoomObjectInfostandWidget = () => {
    const [ selectedData, setSelectedData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoom();

    const onClose = () => {
        setSelectedData(undefined);
    };

    useRoomObjectDeselected((_e) => {
        setSelectedData(undefined);
    });

    useRoomObjectSelected((event) => {
        setSelectedData({
            objectId: event.objectId,
            category: event.category,
        });
    });

    if (!selectedData || !room) return null;

    switch (selectedData.category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            return (
                <InfostandFurni
                    objectData={selectedData}
                    onClose={onClose}
                />
            );
        }
        case RoomObjectCategoryEnum.Unit: {
            const roomObject = room.getRoomObject(selectedData.objectId, selectedData.category);

            if (!roomObject) return null;

            const userType = RoomObjectUserTypeUtils.getAvatarType(roomObject.type);

            if (!userType) return null;

            switch (userType) {
                case RoomObjectUserType.Pet: {
                    return (
                        <InfostandPet
                            objectData={selectedData}
                            onClose={onClose}
                        />
                    );
                }
                case RoomObjectUserType.User: {
                    return (
                        <InfostandUserView
                            objectData={selectedData}
                            onClose={onClose}
                        />
                    );
                }
                // A bot has no profile, motto or respect, so it gets its own panel.
                case RoomObjectUserType.Bot:
                case RoomObjectUserType.RentableBot: {
                    return (
                        <InfostandBot
                            objectData={selectedData}
                            onClose={onClose}
                        />
                    );
                }
            }
        }
    }

    return null;
};
