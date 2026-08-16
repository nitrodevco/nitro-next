import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useConfigValue, useFurnitureDataActions, useFurnitureDataSelector, useSystemActions } from '#base/context';

export const useFurnitureDataLoader = () => {
    const [needsUpdate, setNeedsUpdate] = useState(true);
    const { floorItems, wallItems } = useFurnitureDataSelector();
    const { parseFloorItems, parseWallItems } = useFurnitureDataActions();
    const furnidataUrl = useConfigValue<string>('furnituredata.url') ?? '';
    const { setLocalizationForFurniture } = useSystemActions();

    const isFurnitureDataReady = () => {
        return !needsUpdate;
    }

    useEffect(() => {
        const items = Object.values(floorItems);

        if (!items.length) return;

        setLocalizationForFurniture(items);
        GetRoomContentLoader().processFurnitureData(items);
    }, [floorItems]);

    useEffect(() => {
        const items = Object.values(wallItems);

        if (!items.length) return;

        setLocalizationForFurniture(items);
        GetRoomContentLoader().processFurnitureData(items);
    }, [wallItems]);

    useEffect(() => {
        if (!needsUpdate || !furnidataUrl || !furnidataUrl.length) return;

        const loadAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid furnidata url');

                const responseData = await response.json();

                parseFloorItems(responseData.roomitemtypes.furnitype);
                parseWallItems(responseData.wallitemtypes.furnitype);
                setNeedsUpdate(false);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        void loadAsync(furnidataUrl);
    }, [needsUpdate, furnidataUrl]);

    return { isFurnitureDataReady };
};
