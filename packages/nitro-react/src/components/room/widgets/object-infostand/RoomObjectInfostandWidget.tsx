import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeUtils } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoomSelector } from '#base/context';
import { useRoomObjectDeselected, useRoomObjectSelected } from '#base/hooks';
import { InfostandPetView } from '#base/views/room-widgets/object-infostand/InfostandPetView';
import { InfostandUserView } from '#base/views/room-widgets/object-infostand/InfostandUserView';

import { InfostandFurni } from './InfostandFurni';

export const RoomObjectInfostandWidget = () => {
    const [ selectedData, setSelectedData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoomSelector();

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
                        <InfostandPetView
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
                case RoomObjectUserType.Bot: {
                    return (
                        <InfostandUserView
                            objectData={selectedData}
                            onClose={onClose}
                        />
                    );
                }
                case RoomObjectUserType.RentableBot: {
                    return (
                        <InfostandUserView
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
