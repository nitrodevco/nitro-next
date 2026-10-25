/**
 * The boot's furnidata step: loads `furnituredata.url` once the config names it
 * (`loadFurnitureData`), and says when it is in for the loading screen. Reloads after a catalogue
 * publish go through the same command, from `registerFurnitureDataHandlers`.
 */
import { useEffect, useState } from 'react';

import { loadFurnitureData } from '#base/commands';
import { useConfigValue } from '#base/context/system';

export const useFurnitureDataLoader = () => {
    const [ ready, setReady ] = useState(false);
    const furnidataUrl = useConfigValue<string>('furnituredata.url') ?? '';

    useEffect(() => {
        if (ready || !furnidataUrl.length) return;

        void loadFurnitureData().then(loaded => loaded && setReady(true));
    }, [ ready, furnidataUrl ]);

    const isFurnitureDataReady = () => ready;

    return { isFurnitureDataReady };
};
