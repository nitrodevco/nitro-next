import { IFurnitureData, IRoomObjectData, IRoomObjectNameData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";
import { useEffect, useState } from "react";

import { useRoomIsPlayingGame, useRoomSelector, useRoomUsersActions } from "#base/context";
import { useRoomObjectRollOut, useRoomObjectRollOver } from "#base/hooks";
import { useFurnitureDataStore, useLocalizationStore } from "#base/stores";

import { RoomObjectInfoActiveBubble } from "./RoomObjectInfoActiveBubble";
import { RoomObjectInfoNameBubble } from "./RoomObjectInfoNameBubble";

type RoomObjectInfoBubblesProps = {
    activeData: IRoomObjectData | undefined;
}

export const RoomObjectInfoBubbles = (props: RoomObjectInfoBubblesProps) => {
    const { activeData } = props;
    const [activeBubble, setActiveBubble] = useState<IRoomObjectNameData | undefined>(undefined);
    const [nameBubbles, setNameBubbles] = useState<IRoomObjectNameData[]>([]);
    const room = useRoomSelector();
    const isPlayingGame = useRoomIsPlayingGame();
    const floorItems = useFurnitureDataStore(x => x.floorItems);
    const wallItems = useFurnitureDataStore(x => x.wallItems);
    const { getUserDataByIndex } = useRoomUsersActions();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const getRoomObjectName = (objectId: number, category: RoomObjectCategoryEnum) => {
        const roomObject = room?.getRoomObject(objectId, category);

        if (!roomObject) return undefined;

        let id = -1;
        let name = '';
        let userType = RoomObjectUserType.None;

        switch (category) {
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall: {
                if (roomObject.type.indexOf('poster') === 0) {
                    const posterId = parseInt(roomObject.type.replace('poster', ''));

                    name = getLocalizationValue(`poster_${posterId}_name`);
                } else {
                    const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);

                    let furnitureData: IFurnitureData | undefined = undefined;

                    switch (category) {
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
                        id = objectId;
                        name = furnitureData.localizedName;
                    }
                }

                break;
            }
            case RoomObjectCategoryEnum.Unit: {
                const userData = getUserDataByIndex(objectId);

                if (userData) {
                    id = userData.webID;
                    name = userData.name;
                    userType = userData.userType;
                }

                break;
            }
        }

        if (!name.length) return undefined;

        return { id, objectId, category, name, userType } as IRoomObjectNameData;
    }

    useRoomObjectRollOver(event => {
        if (activeData || event.category !== RoomObjectCategoryEnum.Unit) return;

        const nameData = getRoomObjectName(event.objectId, event.category);

        if (!nameData) return;

        setActiveBubble(nameData);
    });

    useRoomObjectRollOut(event => {
        if (!activeBubble || event.category !== RoomObjectCategoryEnum.Unit || activeBubble.objectId !== event.objectId) return;

        setActiveBubble(undefined);
    });

    useEffect(() => {
        if (!activeData) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveBubble(undefined);
        setNameBubbles([]);
    }, [activeData]);

    if (isPlayingGame) return null;

    return (
        <>
            <RoomObjectInfoActiveBubble activeBubble={activeBubble} activeData={activeData} />
            {nameBubbles.length && nameBubbles.map((x, i) => <RoomObjectInfoNameBubble key={i} nameData={x} />)}
        </>
    )
}