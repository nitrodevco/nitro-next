import { useEffect } from 'react';

import { useRoomSelector, useRoomStackingHeightMapSelector } from '#base/context';

export const useRoomModifications = () => {
    const room = useRoomSelector();
    const { width, heights } = useRoomStackingHeightMapSelector();

    useEffect(() => {
        if (!room) return;

        // eslint-disable-next-line react-hooks/immutability
        room.getTileHeight = (x: number, y: number) => heights[y * width + x];

        return () => {
            room.getTileHeight = (x: number, y: number) => 0;
        };
    }, [ room, heights ]);
};
