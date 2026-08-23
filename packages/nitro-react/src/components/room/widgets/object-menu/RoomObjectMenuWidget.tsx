import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeUtils } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useOwnRoomObjectId, useRoomSelector } from '#base/context';
import { useRoomObjectDeselected, useRoomObjectRollOut, useRoomObjectRollOver, useRoomObjectSelected } from '#base/hooks';
import { InfoBubbleAvatarViewPixi } from '#base/views-pixi/room-widgets/object-menu/InfoBubbleAvatarViewPixi';
import { InfoBubbleOwnAvatarViewPixi } from '#base/views-pixi/room-widgets/object-menu/InfoBubbleOwnAvatarViewPixi';

import { RoomObjectMenuBubblePixi } from './RoomObjectMenuBubblePixi';
import { RoomObjectMenuNameBubble } from './RoomObjectMenuNameBubble';

export const RoomObjectMenuWidget = () => {
    const [ selectedData, setSelectedData ] = useState<ISimpleRoomObjectData | undefined>(undefined);

    const [ hoverData, setHoverData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoomSelector();
    const ownRoomObjectId = useOwnRoomObjectId();

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
        setHoverData(undefined);
    });

    useRoomObjectRollOver((event) => {
        if (selectedData || event.category !== RoomObjectCategoryEnum.Unit) return;

        setHoverData({
            objectId: event.objectId,
            category: event.category,
        });
    });

    useRoomObjectRollOut((event) => {
        if (!hoverData || event.category !== RoomObjectCategoryEnum.Unit || hoverData.objectId !== event.objectId) return;

        setHoverData(undefined);
    });

    if (!room) return null;

    if (hoverData) return <RoomObjectMenuNameBubble objectData={hoverData} />;

    if (!selectedData || selectedData.objectId < 0) return null;

    switch (selectedData.category) {
        case RoomObjectCategoryEnum.Floor:
        case RoomObjectCategoryEnum.Wall: {
            return null;
        }
        case RoomObjectCategoryEnum.Unit: {
            const roomObject = room.getRoomObject(selectedData.objectId, selectedData.category);

            if (!roomObject) return null;

            const userType = RoomObjectUserTypeUtils.getAvatarType(roomObject.type);

            if (!userType) return null;

            switch (userType) {
                case RoomObjectUserType.Pet: {
                    return null;
                }
                case RoomObjectUserType.User: {
                    return (
                        <RoomObjectMenuBubblePixi
                            objectData={selectedData}
                            userType={userType}
                        >
                            {selectedData.objectId === ownRoomObjectId && (
                                <InfoBubbleOwnAvatarViewPixi
                                    objectData={selectedData}
                                    onClose={onClose}
                                />
                            )}
                            {selectedData.objectId !== ownRoomObjectId && (
                                <InfoBubbleAvatarViewPixi
                                    objectData={selectedData}
                                    onClose={onClose}
                                />
                            )}
                        </RoomObjectMenuBubblePixi>
                    );
                }
            }
        }
    }

    return null;
};
