/**
 * `wired_setup/common/NeighborhoodFloor` - the tile plan the "in neighbourhood" selector draws:
 * a 21 x 21 square around a root tile, of which the editor shows either all of it or, in small
 * mode, the 11 x 11 middle.
 *
 * Flash keeps the plan in a mutable array and a second array as the undo buffer of a shift-drag
 * rectangle (`initTemporaryCache` / `clearTemporaryCache` / `submitTemporaryCache`). Here a plan
 * is an immutable value that lives in the element's form, every edit returns a new plan, and the
 * rectangle's buffer is simply the plan the drag started from, which `WiredFloorDrawing` holds
 * for the length of the drag. `occupationHasChanged` is the component's `onChange`.
 *
 * A plan is indexed `plan[x][y]` with the root tile's neighbourhood centre at
 * `[NEIGHBORHOOD_RADIUS][NEIGHBORHOOD_RADIUS]`; `SpiralUtils` turns it into int params.
 */
import { parseSpiralVector, SpiralPlan } from './SpiralUtils';

/** `NeighborhoodFloor.RADIUS`. */
export const NEIGHBORHOOD_RADIUS = 10;
/** `NeighborhoodFloor.SMALL_RADIUS`. */
export const NEIGHBORHOOD_SMALL_RADIUS = 5;
/** `NeighborhoodFloor.§_-N2b§` - the side of the full plan. */
export const NEIGHBORHOOD_DIMENSION = (NEIGHBORHOOD_RADIUS * 2) + 1;

export type NeighborhoodFloorPlan = SpiralPlan;

/** The plan of a box: `SpiralUtils.parseSpiralVector(intParams, RADIUS)`; no params is an empty plan. */
export const createNeighborhoodFloorPlan = (intParams: readonly number[] = []): NeighborhoodFloorPlan =>
    parseSpiralVector(intParams, NEIGHBORHOOD_RADIUS);

/** `NeighborhoodFloor.isOccupied` - in plan coordinates (`0 .. NEIGHBORHOOD_DIMENSION - 1`). */
export const isNeighborhoodTileOccupied = (plan: NeighborhoodFloorPlan, x: number, y: number): boolean => plan[x]?.[y] ?? false;

/** `NeighborhoodFloor.setOccupied` - the same plan when the tile already has that state. */
export const setNeighborhoodTileOccupied = (plan: NeighborhoodFloorPlan, x: number, y: number, occupied: boolean): NeighborhoodFloorPlan => {
    if ((x < 0) || (y < 0) || (x >= plan.length) || (y >= plan[x].length)) return plan;

    if (plan[x][y] === occupied) return plan;

    return plan.map((column, columnIndex) => (columnIndex === x) ? column.map((value, rowIndex) => (rowIndex === y) ? occupied : value) : column);
};

/** `NeighborhoodFloor.smallModeAllowed` - nothing is drawn outside the 11 x 11 middle. */
export const isNeighborhoodSmallModeAllowed = (plan: NeighborhoodFloorPlan): boolean => {
    for (let x = -NEIGHBORHOOD_RADIUS; x <= NEIGHBORHOOD_RADIUS; x++) {
        for (let y = -NEIGHBORHOOD_RADIUS; y <= NEIGHBORHOOD_RADIUS; y++) {
            const outside = (x < -NEIGHBORHOOD_SMALL_RADIUS) || (x > NEIGHBORHOOD_SMALL_RADIUS) || (y < -NEIGHBORHOOD_SMALL_RADIUS) || (y > NEIGHBORHOOD_SMALL_RADIUS);

            if (outside && isNeighborhoodTileOccupied(plan, x + NEIGHBORHOOD_RADIUS, y + NEIGHBORHOOD_RADIUS)) return false;
        }
    }

    return true;
};

/** `NeighborhoodFloor.visualizingRadius`. */
export const neighborhoodVisualizingRadius = (smallMode: boolean): number => smallMode ? NEIGHBORHOOD_SMALL_RADIUS : NEIGHBORHOOD_RADIUS;

/** `NeighborhoodFloor.visualizingDimension`. */
export const neighborhoodVisualizingDimension = (smallMode: boolean): number => (neighborhoodVisualizingRadius(smallMode) * 2) + 1;

/** `FloorDrawingPreset.DRAW_MODES` - what a press on the drawing does. */
export const FLOOR_DRAW_MODE_ADD_TILE = 'add_tile';
export const FLOOR_DRAW_MODE_REMOVE_TILE = 'remove_tile';
export const FLOOR_DRAW_MODE_SET_ROOT_TILE = 'set_root_tile';

export type FloorDrawMode = typeof FLOOR_DRAW_MODE_ADD_TILE | typeof FLOOR_DRAW_MODE_REMOVE_TILE | typeof FLOOR_DRAW_MODE_SET_ROOT_TILE;

/** `FloorDrawingPreset.transformToScreenSpace` - where a tile's 18 x 9 bitmap goes; the tile grid is isometric, 16 x 8 a step. */
export const floorTileToScreen = (x: number, y: number): { x: number; y: number } => ({ x: 8 * ((x - y) + 1), y: 4 * (x + y + 1) });

/** `FloorDrawingPreset.transformFromScreenSpace` - `int()` truncates towards zero, so the half tile outside an edge still hits the edge tile. */
export const floorScreenToTile = (screenX: number, screenY: number): { x: number; y: number } => {
    const column = screenX / 16;
    const row = screenY / 8;

    return { x: Math.trunc((row + column) - 1), y: Math.trunc((row - column) - 1) };
};

/** `FloorDrawingPreset.allowDraw` - `x` / `y` are tiles of the visible square, `0 .. dimension - 1`. */
export const isFloorDrawAllowed = (smallMode: boolean, x: number, y: number): boolean => {
    const dimension = neighborhoodVisualizingDimension(smallMode);

    return (x >= 0) && (y >= 0) && (x < dimension) && (y < dimension);
};

/** `FloorDrawingPreset.applyDraw` for the two tile modes: a visible tile set or cleared in the full plan. */
export const drawNeighborhoodTile = (plan: NeighborhoodFloorPlan, smallMode: boolean, x: number, y: number, occupied: boolean): NeighborhoodFloorPlan => {
    if (!isFloorDrawAllowed(smallMode, x, y)) return plan;

    const offset = NEIGHBORHOOD_RADIUS - neighborhoodVisualizingRadius(smallMode);

    return setNeighborhoodTileOccupied(plan, x + offset, y + offset, occupied);
};
