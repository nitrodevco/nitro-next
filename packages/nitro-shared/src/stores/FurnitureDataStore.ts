import type { IFurnitureData } from '@nitrodevco/nitro-api';
import { FurnitureType } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { FurnitureData } from './FurnitureData';
import { LocalizationStore } from './LocalizationStore';

type State = {
    floorItems: Map<number, IFurnitureData>;
    wallItems: Map<number, IFurnitureData>;
    allItems: IFurnitureData[];
    furnitureLoaded: boolean;
};

type Actions = {
    loadAsync: (url: string) => Promise<void>;
    parseFloorItems: (data: any) => void;
    parseWallItems: (data: any) => void;
};

const initialState: State = {
    floorItems: new Map(),
    wallItems: new Map(),
    allItems: [],
    furnitureLoaded: false,
};

export const FurnitureDataStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    loadAsync: async (...urls: string[]) => {
        if (!urls || !urls.length) return;

        try {
            for (const url of urls) {
                if (!url || !url.length) continue;

                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid furnidata url');

                const responseData = await response.json();

                if (responseData.roomitemtypes) get().parseFloorItems(responseData.roomitemtypes);
                if (responseData.wallitemtypes) get().parseWallItems(responseData.wallitemtypes);
            }

            const items = [...get().floorItems.values(), ...get().wallItems.values()];

            if (!items.length) return;

            LocalizationStore.getState().setLocalizationForFurniture(items);

            set({ allItems: items, furnitureLoaded: true });
        } catch (e) {
            throw new Error(`Failed to load furni data: ${e}`);
        }
    },
    parseFloorItems: (data: any) => {
        if (!data || !data.furnitype) return;

        const addedFloorItems: IFurnitureData[] = [];

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

            addedFloorItems.push(furnitureData);
        }

        if (!addedFloorItems.length) return;

        set(state => {
            const map = new Map(state.floorItems);

            for (const item of addedFloorItems) {
                map.set(item.id, item);
            }

            return { floorItems: map };
        });
    },
    parseWallItems: (data: any) => {
        if (!data || !data.furnitype) return;

        const addedWallItems: IFurnitureData[] = [];

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

            addedWallItems.push(furnitureData);
        }

        if (!addedWallItems.length) return;

        set(state => {
            const map = new Map(state.wallItems);

            for (const item of addedWallItems) {
                map.set(item.id, item);
            }

            return { wallItems: map };
        });
    },
}));
