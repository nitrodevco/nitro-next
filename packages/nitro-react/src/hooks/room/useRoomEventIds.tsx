import { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { useRef } from "react";

export const useRoomEventIds = () => {
    const eventIds = useRef(new Map<RoomObjectCategoryEnum, Map<string, number>>());

    const getMouseEventId = (category: RoomObjectCategoryEnum, type: string) =>
        eventIds.current.get(category)?.get(type);

    const setMouseEventId = (category: RoomObjectCategoryEnum, type: string, eventId: number) => {
        let map = eventIds.current.get(category);

        if (!map) {
            map = new Map();
            eventIds.current.set(category, map);
        }

        map.set(type, eventId);
    };

    return { getMouseEventId, setMouseEventId };
}