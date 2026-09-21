/**
 * The floor plan editor's working model - a port of `FloorPlanCache`, as plain functions over the
 * height map text rather than a stateful object.
 *
 * The model is the same string the server sends and takes back: one row per line, `\r` between
 * them, one character per tile - `x` for no tile, otherwise the tile's height in base 33, so a
 * single character covers all thirty levels. The rows are kept as an array here and joined again
 * on save.
 *
 * Every function that grows or writes the map takes the limits with it, because Flash checked
 * them on each write rather than up front: the area cap only applies without the
 * `BUILDER_AT_WORK` perk, while the axis cap always does.
 */

/** `HeightMapEditor.LEVELS` - how many heights the editor draws, and the length of its colour map. */
export const FLOOR_PLAN_LEVELS = 30;

/** `FloorPlanCache.MAX_AREA` - the tile budget without the `BUILDER_AT_WORK` perk. */
export const FLOOR_PLAN_MAX_AREA = 3025;

/** `FloorPlanCache.MAX_AXIS_LENGTH` - neither side may pass this, perk or not. */
export const FLOOR_PLAN_MAX_AXIS_LENGTH = 64;

/** The character a tile with no floor carries. */
const EMPTY_TILE = 'x';

/** `FloorPlanCache` writes heights with `toString(33)` and reads them with `parseInt(c, 33)`. */
const HEIGHT_RADIX = 33;

export interface FloorPlanTile {
    x: number;
    y: number;
}

/**
 * The map being edited. `rows` is mutated in place by the write helpers - a caller holds one of
 * these for the duration of a draw and hands the finished rows to the store, rather than
 * rebuilding the whole map per pointer move.
 */
export interface FloorPlanModel {
    rows: string[];
    width: number;
    height: number;
    /** Tiles the room refuses to change because something is standing on them (`RoomOccupiedTilesMessage`). */
    reserved: boolean[][];
    /** `BCFloorPlanEditor.largeFloorPlansAllowed` - the `BUILDER_AT_WORK` perk lifts the area cap. */
    largeFloorPlansAllowed: boolean;
    /**
     * Set by a growth the limits refused. `FloorPlanCache` raised
     * `${floor.plan.editor.size.limit.exceeded}` once per received map and stopped the drag; the
     * caller does both.
     *
     * Reaching it takes a map the server would not send. `allowDrawAt` already refuses a tile the
     * limits cannot hold, and its check works out to the same arithmetic as the last growth step
     * the write would need, so a draw that gets past it never fails a growth - only rows of
     * unequal length could part the two. The mechanism is kept because Flash has it, not because
     * the alert is expected; a tile out of bounds is simply refused, with no popup, in both.
     */
    sizeLimitReached: boolean;
}

/**
 * `FloorPlanCache.checkDimensions`: the width is the first row's length and the height is how many
 * rows there are before the first empty one. A map whose rows differ in length is the server's to
 * answer for - Flash measured it the same way.
 */
const measure = (rows: string[]) => {
    if (!rows.length) return { width: -1, height: -1 };

    let height = 0;

    for (const row of rows) {
        if (!row.length) break;

        height++;
    }

    return { width: rows[0].length, height };
};

/** `FloorPlanCache.onOccupiedTiles` - `resetReservedTiles` then one flag per occupied tile. */
export const setFloorPlanReservedTiles = (model: FloorPlanModel, tiles: FloorPlanTile[]) => {
    model.reserved = [];

    for (let y = 0; y < model.height; y++) model.reserved.push(new Array<boolean>(Math.max(model.width, 0)).fill(false));

    for (const tile of tiles) {
        const row = model.reserved[tile.y];

        if (row && (tile.x >= 0) && (tile.x < row.length)) row[tile.x] = true;
    }
};

/** `FloorPlanCache.updateFloorPlanCache` - the received text, empty rows dropped. */
export const createFloorPlanModel = (text: string, options: { reserved?: FloorPlanTile[]; largeFloorPlansAllowed?: boolean } = {}): FloorPlanModel => {
    const rows = text.split('\r').filter(row => (row.length > 0));
    const { width, height } = measure(rows);

    const model: FloorPlanModel = {
        rows,
        width,
        height,
        reserved: [],
        largeFloorPlansAllowed: options.largeFloorPlansAllowed ?? false,
        sizeLimitReached: false,
    };

    setFloorPlanReservedTiles(model, options.reserved ?? []);

    return model;
};

/**
 * `FloorPlanCache.clearTemporaryCache` - puts the buffered rows back and measures them again. The
 * reserved tiles are deliberately left as they are, the way Flash leaves them: a row it grew stays
 * longer than the map, and the lookup above is what tolerates that.
 */
export const resetFloorPlanRows = (model: FloorPlanModel, rows: string[]) => {
    const { width, height } = measure(rows);

    model.rows = [ ...rows ];
    model.width = width;
    model.height = height;
};

/** A working copy, so a draw can be thrown away by simply not committing it. */
export const cloneFloorPlanModel = (model: FloorPlanModel): FloorPlanModel => ({
    ...model,
    rows: [ ...model.rows ],
    reserved: model.reserved.map(row => [ ...row ]),
});

/** `FloorPlanCache.getData` - every row, each followed by its `\r`, the way the server sent it. */
export const floorPlanModelText = (model: FloorPlanModel): string => model.rows.map(row => `${row}\r`).join('');

/** `FloorPlanCache.isTileReserved` - a tile outside the map was never reserved. */
export const isFloorPlanTileReserved = (model: FloorPlanModel, x: number, y: number): boolean => model.reserved[y]?.[x] ?? false;

/** `FloorPlanCache.getHeightAt` - -1 for no tile, and for anything off the map. */
export const getFloorPlanHeightAt = (model: FloorPlanModel, x: number, y: number): number => {
    if ((x < 0) || (x >= model.width) || (y < 0) || (y >= model.height)) return -1;

    const character = model.rows[y].charAt(x);

    return (character === EMPTY_TILE) ? -1 : parseInt(character, HEIGHT_RADIX);
};

/** `FloorPlanCache.checkSizeLimits` - the area cap is the perk's to lift, the axis cap is not. */
const checkSizeLimits = (model: FloorPlanModel, width: number, height: number): boolean =>
    !((!model.largeFloorPlansAllowed && (((width - 1) * (height - 1)) > FLOOR_PLAN_MAX_AREA)) || (width > FLOOR_PLAN_MAX_AXIS_LENGTH) || (height > FLOOR_PLAN_MAX_AXIS_LENGTH));

/**
 * `FloorPlanCache.isFirstColumnZeroOrHasDoorAt` / `isFirstRowZeroOrHasDoorAt`: the first row and
 * the first column belong to the door. A tile may only be drawn there while it would be the only
 * filled one in both - which is what keeps the entry tile on the map's edge.
 */
const isDoorTileAllowedAt = (model: FloorPlanModel, x: number, y: number): boolean => {
    for (let row = 0; row < model.height; row++) {
        if ((row !== y) && (model.rows[row].charAt(0) !== EMPTY_TILE)) return false;
    }

    for (let column = 0; column < model.width; column++) {
        if ((column !== x) && (model.rows[0].charAt(column) !== EMPTY_TILE)) return false;
    }

    return true;
};

/** `FloorPlanCache.allowDrawAt` - Flash passes the two axes the other way round; both caps are the same number, so it reads the same. */
const allowDrawAt = (model: FloorPlanModel, x: number, y: number): boolean => {
    if (!checkSizeLimits(model, y + 1, x + 1)) return false;

    if ((x === 0) || (y === 0)) return isDoorTileAllowedAt(model, x, y);

    return true;
};

/** `FloorPlanCache.addColumn` - one more empty tile on every row, or the size limit refusing it. */
const addColumn = (model: FloorPlanModel): boolean => {
    if (!checkSizeLimits(model, model.width + 1, model.height)) {
        model.sizeLimitReached = true;

        return false;
    }

    for (let y = 0; y < model.height; y++) {
        if (!model.rows[y].length) continue;

        model.rows[y] += EMPTY_TILE;
        model.reserved[y].push(false);
    }

    model.width++;

    return true;
};

/** `FloorPlanCache.addRow` - one more empty row, or the size limit refusing it. */
const addRow = (model: FloorPlanModel): boolean => {
    if (!checkSizeLimits(model, model.width, model.height + 1)) {
        model.sizeLimitReached = true;

        return false;
    }

    model.rows.push(EMPTY_TILE.repeat(model.width));
    model.reserved.push(new Array<boolean>(model.width).fill(false));
    model.height++;

    return true;
};

/**
 * `FloorPlanCache.setHeightAt` - grows the map to reach the tile, then writes it unless the door
 * rules or an occupied tile say no. A height below zero clears the tile.
 */
export const setFloorPlanHeightAt = (model: FloorPlanModel, x: number, y: number, height: number): boolean => {
    if ((x < 0) || (y < 0)) return false;
    if (!allowDrawAt(model, x, y)) return false;

    while (x >= model.width) {
        if (!addColumn(model)) return false;
    }

    while (y >= model.height) {
        if (!addRow(model)) return false;
    }

    if (isFloorPlanTileReserved(model, x, y)) return false;

    const character = (height < 0) ? EMPTY_TILE : height.toString(HEIGHT_RADIX);
    const row = model.rows[y];

    model.rows[y] = row.substring(0, x) + character + row.substring(x + 1);

    return true;
};

/** `BCFloorPlanEditor._drawModes`, in its order - the five buttons above the map are laid out in it. */
export const FLOOR_PLAN_DRAW_MODES = [ 'add_tile', 'remove_tile', 'increase_height', 'decrease_height', 'set_enter_tile' ] as const;

export type FloorPlanDrawMode = typeof FLOOR_PLAN_DRAW_MODES[number];

/**
 * `HeightMapEditor.applyDraw` - one tile, under the mode the editor is in. The three modes that
 * change an existing tile do nothing where there is no floor, and only the entry mode answers
 * with anything: the tile it moved the door to, or null when it did not move it.
 */
export const applyFloorPlanDraw = (model: FloorPlanModel, x: number, y: number, mode: FloorPlanDrawMode, drawingHeight: number): FloorPlanTile | null => {
    switch (mode) {
        case 'add_tile':
            setFloorPlanHeightAt(model, x, y, drawingHeight);
            break;
        case 'remove_tile':
            setFloorPlanHeightAt(model, x, y, -1);
            break;
        case 'increase_height': {
            const height = getFloorPlanHeightAt(model, x, y);

            if (height >= 0) setFloorPlanHeightAt(model, x, y, Math.min(FLOOR_PLAN_LEVELS - 1, height + 1));
            break;
        }
        case 'decrease_height': {
            const height = getFloorPlanHeightAt(model, x, y);

            if (height >= 0) setFloorPlanHeightAt(model, x, y, Math.max(0, height - 1));
            break;
        }
        case 'set_enter_tile': {
            if (getFloorPlanHeightAt(model, x, y) >= 0) return { x, y };
            break;
        }
    }

    return null;
};

/**
 * `FloorPlanCache.attemptExpandColumns` / `attemptExpandRows` - the shift-drag rectangle grows the
 * map to its far corner before filling it. Flash passes those two `true` so they raise no alert of
 * their own; the drag shrinks the rectangle instead until it fits.
 */
export const expandFloorPlanTo = (model: FloorPlanModel, x: number, y: number): { columns: boolean; rows: boolean } => {
    const wasLimitReached = model.sizeLimitReached;

    let columns = true;
    let rows = true;

    while (columns && (x >= model.width)) columns = addColumn(model);
    while (rows && (y >= model.height)) rows = addRow(model);

    model.sizeLimitReached = wasLimitReached;

    return { columns, rows };
};
