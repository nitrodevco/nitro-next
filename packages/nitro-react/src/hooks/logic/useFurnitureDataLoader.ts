import type { IFurnitureData } from '@nitrodevco/nitro-api';
import { FurnitureType } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { FurnitureData, LocalizationStore } from '@nitrodevco/nitro-shared';
import { useEffect, useState } from 'react';

import { useConfigurationStore } from '../../stores/useConfigurationStore';

export const useFurnitureDataLoader = () => {
    const [needsUpdate, setNeedsUpdate] = useState(true);
    const [floorItems, setFloorItems] = useState<IFurnitureData[]>([]);
    const [wallItems, setWallItems] = useState<IFurnitureData[]>([]);
    const [allItems, setAllItems] = useState<IFurnitureData[]>([]);
    const furnidataUrl = useConfigurationStore(state => state.config['furnituredata.url']) as string | undefined;

    const parseFloorItems = (data: any): IFurnitureData[] => {
        const floorItems: IFurnitureData[] = [];

        if (data && data.furnitype) {
            for (const furniture of data.furnitype) {
                if (!furniture) continue;

                const colors: number[] = [];

                if (furniture.partcolors) {
                    for (const color of furniture.partcolors.color) {
                        let colorCode = color as string;

                        if (colorCode.charAt(0) === '#') {
                            colorCode = colorCode.replace('#', '');

                            colors.push(parseInt(colorCode, 16));
                        } else {
                            colors.push(parseInt(colorCode, 16));
                        }
                    }
                }

                const classSplit = (furniture.classname as string).split('*');
                const className = classSplit[0];
                const colorIndex = classSplit.length > 1 ? parseInt(classSplit[1]) : 0;
                const hasColorIndex = classSplit.length > 1;

                const furnitureData = new FurnitureData(
                    FurnitureType.FLOOR,
                    furniture.id,
                    furniture.classname,
                    className,
                    furniture.category,
                    furniture.name,
                    furniture.description,
                    furniture.revision,
                    furniture.xdim,
                    furniture.ydim,
                    0,
                    colors,
                    hasColorIndex,
                    colorIndex,
                    furniture.adurl,
                    furniture.offerid,
                    furniture.buyout,
                    furniture.rentofferid,
                    furniture.rentbuyout,
                    furniture.bc,
                    furniture.customparams,
                    furniture.specialtype,
                    furniture.canstandon,
                    furniture.cansiton,
                    furniture.canlayon,
                    furniture.excludeddynamic,
                    furniture.furniline,
                    furniture.environment,
                    furniture.rare,
                );

                floorItems.push(furnitureData);
            }
        }

        return floorItems;
    };

    const parseWallItems = (data: any): IFurnitureData[] => {
        const wallItems: IFurnitureData[] = [];

        if (data && data.furnitype) {
            for (const furniture of data.furnitype) {
                if (!furniture) continue;

                const furnitureData = new FurnitureData(
                    FurnitureType.WALL,
                    furniture.id,
                    furniture.classname,
                    furniture.classname,
                    furniture.category,
                    furniture.name,
                    furniture.description,
                    furniture.revision,
                    0,
                    0,
                    0,
                    [],
                    false,
                    0,
                    furniture.adurl,
                    furniture.offerid,
                    furniture.buyout,
                    furniture.rentofferid,
                    furniture.rentbuyout,
                    furniture.bc,
                    '',
                    furniture.specialtype,
                    false,
                    false,
                    false,
                    furniture.excludeddynamic,
                    furniture.furniline,
                    furniture.environment,
                    furniture.rare,
                );

                wallItems.push(furnitureData);
            }
        }

        return wallItems;
    };

    useEffect(() => {
        if (!allItems || !allItems.length) return;

        LocalizationStore.getState().setLocalizationForFurniture(allItems);
        GetRoomContentLoader().processFurnitureData(allItems);
    }, [allItems]);

    useEffect(() => {
        if (!needsUpdate || !furnidataUrl || !furnidataUrl.length) return;

        const loadAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid furnidata url');

                const responseData = await response.json();

                const floorItems = responseData.roomitemtypes ? parseFloorItems(responseData.roomitemtypes) : [];
                const wallItems = responseData.wallitemtypes ? parseWallItems(responseData.wallitemtypes) : [];

                setFloorItems(floorItems);
                setWallItems(wallItems);
                setAllItems([...floorItems, ...wallItems]);
            } catch (e) {
                throw new Error(`Failed to load furni data: ${e}`);
            }
        };

        void loadAsync(furnidataUrl);
        setNeedsUpdate(false);
    }, [needsUpdate, furnidataUrl]);

    return null;
};
