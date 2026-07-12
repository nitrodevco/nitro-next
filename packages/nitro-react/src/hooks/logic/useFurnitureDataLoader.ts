import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useConfigurationStore, useFurnitureDataStore, useLocalizationStore } from '#base/stores';

export const useFurnitureDataLoader = () => {
    const [needsUpdate, setNeedsUpdate] = useState(true);
    const floorItems = useFurnitureDataStore(x => x.floorItems);
    const wallItems = useFurnitureDataStore(x => x.wallItems);
    const furnidataUrl = useConfigurationStore(state => state.config['furnituredata.url']) as string | undefined;
    const setLocalizationForFurniture = useLocalizationStore(x => x.setLocalizationForFurniture);
    const parseFloorItems = useFurnitureDataStore(x => x.parseFloorItems);
    const parseWallItems = useFurnitureDataStore(x => x.parseWallItems);

    const isFurnitureDataReady = () => {
        return !needsUpdate;
    }

    useEffect(() => {
        if (!floorItems.size) return;

        const items = floorItems.values().toArray();

        setLocalizationForFurniture(items);
        GetRoomContentLoader().processFurnitureData(items);
    }, [floorItems]);

    useEffect(() => {
        if (!wallItems.size) return;

        const items = wallItems.values().toArray();

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

                parseFloorItems(responseData.roomitemtypes);
                parseWallItems(responseData.wallitemtypes);
                setNeedsUpdate(false);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        void loadAsync(furnidataUrl);
    }, [needsUpdate, furnidataUrl]);

    return { isFurnitureDataReady };
};
