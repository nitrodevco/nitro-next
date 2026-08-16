import type { StateCreator } from "zustand";

type State = {
    width: number;
    height: number;
    heights: number[];
    stackingBlocked: boolean[];
    validTiles: boolean[];
}

type Actions = {
    setHeightMap: (width: number, height: number, heights: number[], stackingBlocked: boolean[], validTiles: boolean[]) => void;
    setHeightMapUpdates: (updates: { x: number, y: number, height: number, stackingBlocked: boolean, validTile: boolean }[]) => void;
    getTileHeight: (x: number, y: number) => number;
    validateLocation: (
        x: number,
        y: number,
        sizeX: number,
        sizeY: number,
        prevX: number,
        prevY: number,
        prevSizeX: number,
        prevSizeY: number,
        alwaysStackable: boolean,
        height?: number,
    ) => boolean;
};

export const RoomStackingHeightMapSliceInitialState: State = {
    width: 0,
    height: 0,
    heights: [],
    stackingBlocked: [],
    validTiles: []
};

export type RoomStackingHeightMapSlice = State & Actions;

export const createRoomStackingHeightMapSlice: StateCreator<RoomStackingHeightMapSlice, [], [], RoomStackingHeightMapSlice> = (set, get, store) => ({
    ...RoomStackingHeightMapSliceInitialState,
    setHeightMap: (width: number, height: number, heights: number[], stackingBlocked: boolean[], validTiles: boolean[]) => {
        set({ width, height, heights, stackingBlocked, validTiles });
    },
    setHeightMapUpdates: (updates: { x: number, y: number, height: number, stackingBlocked: boolean, validTile: boolean }[]) => {
        set(state => {
            const width = state.width;
            const height = state.height;
            const heights = [...state.heights];
            const stackingBlocked = [...state.stackingBlocked];
            const validTiles = [...state.validTiles];

            for (const update of updates) {
                if (update.x >= 0 && update.x < width && update.y >= 0 && update.y < height) {
                    const key = update.y * width + update.x;

                    heights[key] = update.height;
                    stackingBlocked[key] = update.stackingBlocked;
                    validTiles[key] = update.validTile;
                }
            }

            return { heights, stackingBlocked, validTiles };
        });
    },
    getTileHeight: (x: number, y: number) => {
        const state = get();

        return state.heights[y * state.width + x] ?? -1;
    },
    validateLocation: (
        x: number,
        y: number,
        sizeX: number,
        sizeY: number,
        prevX: number,
        prevY: number,
        prevSizeX: number,
        prevSizeY: number,
        alwaysStackable: boolean,
        height: number = -1,
    ) => {
        const state = get();

        const mapWidth = state.width;
        const mapHeight = state.height;
        const key = y * mapWidth + x;

        if (!(x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) || !(x + sizeX - 1 >= 0 && x + sizeX - 1 < mapWidth && y + sizeY - 1 >= 0 && y + sizeY - 1 < mapHeight)) return false;

        if (prevX < 0 || prevX >= mapWidth) prevX = 0;

        if (prevY < 0 || prevY >= mapHeight) prevY = 0;

        prevSizeX = Math.min(prevSizeX, mapWidth - prevX);
        prevSizeY = Math.min(prevSizeY, mapHeight - prevY);

        if (height === -1) height = state.heights[key];

        let tileY = y;

        while (tileY < y + sizeY) {
            let tileX = x;

            while (tileX < x + sizeX) {
                if (
                    tileX < prevX ||
                    tileX >= prevX + prevSizeX ||
                    tileY < prevY ||
                    tileY >= prevY + prevSizeY
                ) {
                    const tileIndex = tileY * mapWidth + tileX;

                    if (alwaysStackable) {
                        if (!state.validTiles[tileIndex]) return false;
                    } else if (
                        state.stackingBlocked[tileIndex] ||
                        !state.validTiles[tileIndex] ||
                        Math.abs(state.heights[tileIndex] - height) > 0.01
                    )
                        return false;
                }

                tileX++;
            }

            tileY++;
        }

        return true;
    }
});