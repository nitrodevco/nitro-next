import type { IFurnitureData } from '@nitrodevco/nitro-api';
import { FurnitureType } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { FurnitureData } from './FurnitureData';

type State = {
    floorItems: Map<number, IFurnitureData>;
    wallItems: Map<number, IFurnitureData>;
    furnitureLoaded: boolean;
};

type Actions = {
    parseFloorItems: (data: any) => void;
    parseWallItems: (data: any) => void;
};

const initialState: State = {
    floorItems: new Map(),
    wallItems: new Map(),
    furnitureLoaded: false,
};

export const FurnitureDataStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    parseFloorItems: (data: any) => {
        if (!data || !data.furnitype) return;

        const floorItems: IFurnitureData[] = [];

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

        if (!floorItems.length) return;

        set(() => {
            const map = new Map(floorItems.map(x => {
                return [x.id, x]
            }));

            return { floorItems: map };
        });
    },
    parseWallItems: (data: any) => {
        if (!data || !data.furnitype) return;

        const wallItems: IFurnitureData[] = [];

        for (const furniture of data.furnitype) {
            if (!furniture) continue;

            const furnitureData = new FurnitureData(
                FurnitureType.WALL,
                furniture.id,
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

        if (!wallItems.length) return;

        set(() => {
            const map = new Map(wallItems.map(x => {
                return [x.id, x]
            }));

            return { wallItems: map };
        });
    },
}));
