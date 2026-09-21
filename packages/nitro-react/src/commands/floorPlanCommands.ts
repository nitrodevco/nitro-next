import { RoomThicknessType } from '@nitrodevco/nitro-api';
import { GetOccupiedTilesComposer, GetRoomEntryTileComposer, UpdateFloorPropertiesComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { FLOOR_PLAN_WALLS_NOT_FIXED } from '#base/context/room';

type Send = WebSocketConnection['send'];

/**
 * The floor plan editor's two requests and its two saves - `BCFloorPlanEditor`'s `visible` setter,
 * its `reload` button and its `save`, plus `ImportExportDialog`'s own save.
 */

/**
 * What `BCFloorPlanEditor` asks for each time the window is shown, and again on "revert changes":
 * where the door is and which tiles are in use. The map itself is not asked for - the room already
 * sent it as `FloorHeightMapMessage` on the way in.
 */
export const requestFloorPlanData = (send: Send) => send(new GetRoomEntryTileComposer({}), new GetOccupiedTilesComposer({}));

export interface FloorPlanSaveData {
    modelData: string;
    entryPointX: number;
    entryPointY: number;
    entryPointDir: number;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
    /** `FLOOR_PLAN_WALLS_NOT_FIXED` while the walls are left to follow the floor. */
    fixedWallsHeight: number;
}

/** The editor's own save button - the whole form, fixed wall height included. */
export const saveFloorPlan = (send: Send, data: FloorPlanSaveData) => send(new UpdateFloorPropertiesComposer(data));

/**
 * `ImportExportDialog`'s save: the pasted map with the editor's current entry point and thickness,
 * and no fixed wall height at all - Flash leaves that argument off, so the packet is a value
 * shorter and the room keeps whatever wall height it had.
 */
export const saveFloorPlanImport = (send: Send, data: Omit<FloorPlanSaveData, 'fixedWallsHeight'>) =>
    send(new UpdateFloorPropertiesComposer({ ...data, fixedWallsHeight: FLOOR_PLAN_WALLS_NOT_FIXED }));
