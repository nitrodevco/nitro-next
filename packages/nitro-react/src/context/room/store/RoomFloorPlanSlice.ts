import { RoomThicknessType } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

import { FloorPlanTile } from '#base/utils';

/**
 * What the floor plan editor is working on - `FloorPlanCache`, plus the bits of `BCFloorPlanEditor`
 * that are the room's rather than the window's.
 *
 * The map is kept as the rows the server sent, not as a parsed grid: the editor's own helpers in
 * `utils/floorPlanModel.ts` read and write those rows, and the save sends them straight back. Being
 * a room slice, all of it is cleared by `RoomStore.setRoom` when you walk into the next room - which
 * is what Flash's `REE_DISPOSED` listener did by hiding the window.
 */

/** `BCFloorPlanEditor.WALL_HEIGHT_LIMIT` - how many steps the fixed wall height slider has. */
export const FLOOR_PLAN_WALL_HEIGHT_LIMIT = 16;

/** `FloorHeightMapMessage.fixedWallsHeight` when the walls follow the floor instead of being fixed. */
export const FLOOR_PLAN_WALLS_NOT_FIXED = -1;

type State = {
    /** The map being edited, one string per row - the received map until something is drawn. */
    floorPlanRows: string[];
    /** `BCFloorPlanEditor.lastReceivedFloorPlan` - what "revert changes" and the import dialog restore. */
    floorPlanReceivedModel: string;
    /** `RoomOccupiedTilesMessage` - tiles the room will not let the editor change. */
    floorPlanOccupiedTiles: FloorPlanTile[];
    /** `RoomEntryTileMessage` - where the door is, and which way whoever walks in is facing. */
    floorPlanEntryPoint: FloorPlanTile | null;
    floorPlanEntryPointDir: number;
    /** `FloorHeightMapMessage.fixedWallsHeight`, or `FLOOR_PLAN_WALLS_NOT_FIXED`. */
    floorPlanFixedWallsHeight: number;
    /** `RoomVisualizationSettingsMessage`, as the setting the save sends back rather than the multiplier the room draws with. */
    floorPlanWallThickness: RoomThicknessType;
    floorPlanFloorThickness: RoomThicknessType;
};

type Actions = {
    /** A map from the server (`FloorHeightMapMessage`), which also becomes what a revert goes back to. */
    setFloorPlanReceivedModel: (model: string) => void;
    /** A map the editor has changed - a draw, or the import dialog's paste. */
    setFloorPlanRows: (rows: string[]) => void;
    setFloorPlanOccupiedTiles: (tiles: FloorPlanTile[]) => void;
    setFloorPlanEntryPoint: (entryPoint: FloorPlanTile) => void;
    /** `FloorPlanCache.entryPointDir` wraps both ways: the two arrows walk the eight directions in a circle. */
    setFloorPlanEntryPointDir: (dir: number) => void;
    setFloorPlanFixedWallsHeight: (height: number) => void;
    setFloorPlanThickness: (wallThickness: RoomThicknessType, floorThickness: RoomThicknessType) => void;
};

export const RoomFloorPlanSliceInitialState: State = {
    floorPlanRows: [],
    floorPlanReceivedModel: '',
    floorPlanOccupiedTiles: [],
    floorPlanEntryPoint: null,
    floorPlanEntryPointDir: 0,
    floorPlanFixedWallsHeight: FLOOR_PLAN_WALLS_NOT_FIXED,
    floorPlanWallThickness: RoomThicknessType.Normal,
    floorPlanFloorThickness: RoomThicknessType.Normal,
};

export type RoomFloorPlanSlice = State & Actions;

export const createRoomFloorPlanSlice: StateCreator<RoomFloorPlanSlice, [], [], RoomFloorPlanSlice> = set => ({
    ...RoomFloorPlanSliceInitialState,
    setFloorPlanReceivedModel: (model: string) => set({
        floorPlanReceivedModel: model,
        floorPlanRows: model.split('\r').filter(row => (row.length > 0)),
    }),
    setFloorPlanRows: (rows: string[]) => set({ floorPlanRows: rows }),
    setFloorPlanOccupiedTiles: (tiles: FloorPlanTile[]) => set({ floorPlanOccupiedTiles: tiles }),
    setFloorPlanEntryPoint: (entryPoint: FloorPlanTile) => set({ floorPlanEntryPoint: entryPoint }),
    setFloorPlanEntryPointDir: (dir: number) => set({ floorPlanEntryPointDir: (dir < 0) ? 7 : ((dir > 7) ? 0 : dir) }),
    setFloorPlanFixedWallsHeight: (height: number) => set({ floorPlanFixedWallsHeight: height }),
    setFloorPlanThickness: (wallThickness: RoomThicknessType, floorThickness: RoomThicknessType) => set({ floorPlanWallThickness: wallThickness, floorPlanFloorThickness: floorThickness }),
});
