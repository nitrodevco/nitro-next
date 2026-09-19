import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoom, useRoomStore } from '#base/context/room';
import { useRoomEventDispatcher } from '#base/hooks';
import { InfostandUserView } from '#base/views/room-widgets/object-infostand/InfostandUserView';

import { InfostandBot } from './InfostandBot';
import { InfostandFurni } from './InfostandFurni';
import { InfostandPet } from './InfostandPet';

/**
 * The infostand - Flash's `InfoStandWidget`: whatever is selected gets its panel (user, bot,
 * pet or furniture), and the panel closes when the selection does or the object leaves the
 * room.
 */
export const RoomObjectInfostandWidget = () => {
    const [ selectedData, setSelectedData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoom();
    // The room object's type is a pet's breed name, not its kind; the user list knows the kind.
    const selectedUserType = useRoomStore(x => (selectedData ? x.usersByRoomObjectId[selectedData.objectId]?.userType : undefined));

    const onClose = () => {
        setSelectedData(undefined);
    };

    useRoomEventDispatcher(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, () => {
        setSelectedData(undefined);
    });

    // `InfoStandWidget`: whatever the stand shows leaving the room closes it.
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([ RoomWidgetUpdateRoomObjectEvent.USER_REMOVED, RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED ], (event) => {
        if (selectedData && (selectedData.objectId === event.objectId) && (selectedData.category === event.category)) setSelectedData(undefined);
    });

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED, (event) => {
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
            if (selectedUserType === undefined) return null;

            switch (selectedUserType) {
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
