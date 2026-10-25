/**
 * The two pictures the floor plan editor draws - the flat, colour-coded height map you edit and
 * the isometric preview beside it. Ports the geometry and the colour table of `HeightMapEditor`
 * and `FloorPlanPreviewer`.
 *
 * Flash composited both into a `BitmapData` and handed it to a bitmap window. Here each tile is
 * its own sprite in a container, so the height map's colouring is a sprite `tint` rather than a
 * `ColorTransform` on a cloned bitmap - the same multiply, without a cache of tinted clones.
 */
import { FloorPlanModel, getFloorPlanHeightAt, isFloorPlanTileReserved } from './floorPlanModel';

/** `HeightMapEditor.zoomLevel` - the only two the client offers, with a tile bitmap each. */
export const FLOOR_PLAN_ZOOM_NORMAL = 1;
export const FLOOR_PLAN_ZOOM_LARGE = 2;

/** The height map tile bitmaps of `HeightMapEditor`, by zoom level. */
export const FLOOR_PLAN_TILE_IMAGES = {
    [FLOOR_PLAN_ZOOM_NORMAL]: { base: 'window-manager/floor_editor_tile_base.png', entry: 'window-manager/floor_editor_tile_entry.png', width: 18, height: 9 },
    [FLOOR_PLAN_ZOOM_LARGE]: { base: 'window-manager/floor_editor_tile_base_large.png', entry: 'window-manager/floor_editor_tile_entry_large.png', width: 34, height: 17 },
} as const;

/**
 * `FloorPlanPreviewer`'s seventeen bitmaps, in the order it pushes them: sixteen tile shapes
 * indexed by the edge mask below, then the entry tile. The names are the hex digits the client
 * gave them, and the order is load-bearing - the index *is* the mask.
 */
export const FLOOR_PLAN_PREVIEW_TILE_NAMES = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'entry',
];

export const FLOOR_PLAN_PREVIEW_TILE_IMAGES = FLOOR_PLAN_PREVIEW_TILE_NAMES.map(name => `window-manager/tile_preview_${name}.png`);

/** Every preview bitmap is this size; the isometric step is half of each. */
export const FLOOR_PLAN_PREVIEW_TILE_SIZE = 18;

/** `FloorPlanPreviewer.updatePreview` caps the canvas it allocates. */
const PREVIEW_MAX_SIZE = 4095;

/** `HeightMapEditor.hslToRgb`'s helper, on 0..1 components. */
const hueToRgb = (p: number, q: number, t: number): number => {
    let hue = t;

    if (hue < 0) hue += 1;
    if (hue > 1) hue -= 1;

    if (hue < (1 / 6)) return p + ((q - p) * 6 * hue);
    if (hue < (1 / 2)) return q;
    if (hue < (2 / 3)) return p + ((q - p) * ((2 / 3) - hue) * 6);

    return p;
};

/** `HeightMapEditor.hslToRgb` - components in 0..1, as the colour transform multipliers Flash used them for. */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    if (s === 0) return [ l, l, l ];

    const q = (l < 0.5) ? (l * (1 + s)) : (l + s - (l * s));
    const p = (2 * l) - q;

    return [ hueToRgb(p, q, h + (1 / 3)), hueToRgb(p, q, h), hueToRgb(p, q, h - (1 / 3)) ];
};

/** `uint(255 * v)` per component, as Pixi wants a tint - truncated, the way Flash's `uint` cast is. */
const toTint = ([ r, g, b ]: [number, number, number]): number => (Math.trunc(255 * r) << 16) + (Math.trunc(255 * g) << 8) + Math.trunc(255 * b);

/**
 * The hue `HeightMapEditor`'s constructor starts its colour ramp at, and how far down it walks
 * over the levels - it runs off the bottom and wraps into the reds, which is what gives the ramp
 * its blue-to-red sweep.
 */
export const HEIGHT_HUE_START = 0.6;
export const HEIGHT_HUE_SPAN = 0.85;

/** A free tile's colour: that hue at full saturation. */
export const HEIGHT_SATURATION = 1;
export const HEIGHT_LIGHTNESS = 0.5;

/** A tile something is standing on: the same hue, washed out and darker, so it reads as untouchable. */
export const OCCUPIED_SATURATION = 0.33;
export const OCCUPIED_LIGHTNESS = 0.4;

/** `HeightMapEditor`'s constructor builds both colour maps, one entry per level. */
const buildHeightColors = (saturation: number, lightness: number, levels: number): number[] => {
    const colors: number[] = [];

    for (let level = 0; level < levels; level++) {
        let hue = HEIGHT_HUE_START - ((level / levels) * HEIGHT_HUE_SPAN);

        if (hue < 0) hue = 1 + hue;

        colors.push(toTint(hslToRgb(hue, saturation, lightness)));
    }

    return colors;
};

/** `HeightMapEditor.heigthColorMap` - the draw-height slider's gradient, and a free tile's colour. */
export const floorPlanHeightColors = (levels: number): number[] => buildHeightColors(HEIGHT_SATURATION, HEIGHT_LIGHTNESS, levels);

/** `HeightMapEditor._occupiedHeigthColorMap` - the same hue for a tile that cannot be changed. */
export const floorPlanOccupiedHeightColors = (levels: number): number[] => buildHeightColors(OCCUPIED_SATURATION, OCCUPIED_LIGHTNESS, levels);

/** `HeightMapEditor.transformToScreenSpace` - the tile's top-left corner in the height map picture. */
export const floorPlanTileToScreen = (x: number, y: number, zoom: number) => ({
    x: zoom * 8 * (x - y),
    y: zoom * 4 * (x + y),
});

/**
 * `HeightMapEditor.transformFromScreenSpace` - which tile a point in the height map picture is
 * over. The map's row count is part of it, because the picture's left edge is the last row's
 * corner; `originX` below is the same offset from the other side.
 */
export const floorPlanScreenToTile = (screenX: number, screenY: number, zoom: number, floorHeight: number) => {
    const u = screenX / 16 / zoom;
    const v = screenY / 8 / zoom;

    return {
        x: Math.trunc(v + (u - (floorHeight / 2))),
        y: Math.trunc(v - (u - (floorHeight / 2))),
    };
};

/**
 * Where tile (0, 0) sits in the height map picture. Flash shifted every tile by the minimum it
 * had measured; the leftmost tile is always the last row's first column, and the topmost is
 * always (0, 0), so the shift is this and nothing else.
 */
export const floorPlanOriginX = (floorHeight: number, zoom: number): number => Math.max(0, zoom * 8 * (floorHeight - 1));

export interface FloorPlanHeightMapTile {
    x: number;
    y: number;
    screenX: number;
    screenY: number;
    /** The entry tile is drawn with its own bitmap and no colour. */
    isEntry: boolean;
    tint: number;
}

export interface FloorPlanPicture<T> {
    tiles: T[];
    width: number;
    height: number;
}

/**
 * `HeightMapEditor.updateView` - one sprite per tile that has a floor, plus the entry tile on top
 * of whatever it covers, in row order so a later tile overlaps an earlier one the way the client's
 * `copyPixels` calls did.
 *
 * The picture spans the whole grid rather than the filled tiles, as Flash measured it: an empty
 * column still holds its place, so the tile under the pointer does not shift as the map is drawn.
 * Flash then padded that with a literal 18 x 27 whatever the zoom was, which cut the large tiles
 * off; here the padding is the tile's own size.
 */
export const buildFloorPlanHeightMap = (model: FloorPlanModel, zoom: number, entryPoint: { x: number; y: number } | null, colors: number[], occupiedColors: number[]): FloorPlanPicture<FloorPlanHeightMapTile> => {
    const { width: tileWidth, height: tileHeight } = FLOOR_PLAN_TILE_IMAGES[zoom === FLOOR_PLAN_ZOOM_LARGE ? FLOOR_PLAN_ZOOM_LARGE : FLOOR_PLAN_ZOOM_NORMAL];
    const originX = floorPlanOriginX(model.height, zoom);
    const tiles: FloorPlanHeightMapTile[] = [];

    let right = 0;
    let bottom = 0;

    for (let y = 0; y < model.height; y++) {
        for (let x = 0; x < model.width; x++) {
            const screen = floorPlanTileToScreen(x, y, zoom);
            const screenX = screen.x + originX;

            right = Math.max(right, screenX + tileWidth);
            bottom = Math.max(bottom, screen.y + tileHeight);

            const isEntry = !!entryPoint && (entryPoint.x === x) && (entryPoint.y === y);
            // `Math.min(getHeightAt, LEVELS - 1)`: a height of exactly LEVELS is drawn as the last colour.
            const height = Math.min(getFloorPlanHeightAt(model, x, y), colors.length - 1);

            if (!isEntry && (height < 0)) continue;

            tiles.push({
                x,
                y,
                screenX,
                screenY: screen.y,
                isEntry,
                tint: isEntry ? 0xFFFFFF : (isFloorPlanTileReserved(model, x, y) ? occupiedColors : colors)[height],
            });
        }
    }

    return { tiles, width: right, height: bottom };
};

export interface FloorPlanPreviewTile {
    screenX: number;
    screenY: number;
    /** Index into `FLOOR_PLAN_PREVIEW_TILE_IMAGES`. */
    type: number;
}

/**
 * `FloorPlanPreviewer.updatePreview` - the isometric picture. A tile's bitmap is chosen by which
 * of its four corners has a neighbour exactly one level above it, one bit per corner; a tile
 * walled in on all four is drawn flat instead, and the entry tile has a bitmap of its own.
 */
export const buildFloorPlanPreview = (model: FloorPlanModel, entryPoint: { x: number; y: number } | null): FloorPlanPicture<FloorPlanPreviewTile> => {
    const entryType = FLOOR_PLAN_PREVIEW_TILE_IMAGES.length - 1;
    const tiles: { x: number; y: number; type: number }[] = [];

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    for (let y = 0; y < model.height; y++) {
        for (let x = 0; x < model.width; x++) {
            const height = getFloorPlanHeightAt(model, x, y);

            if (height < 0) continue;

            // `getCanvasPoint`: the isometric step, with the height lifting the tile.
            const pointX = 8 * (x - y);
            const pointY = (4 * (x + y)) - (8 * height);

            minX = Math.min(minX, pointX);
            minY = Math.min(minY, pointY);
            maxX = Math.max(maxX, pointX);
            maxY = Math.max(maxY, pointY);

            const above = height + 1;
            const northWest = getFloorPlanHeightAt(model, x - 1, y - 1);
            const north = getFloorPlanHeightAt(model, x, y - 1);
            const northEast = getFloorPlanHeightAt(model, x + 1, y - 1);
            const west = getFloorPlanHeightAt(model, x - 1, y);
            const east = getFloorPlanHeightAt(model, x + 1, y);
            const southWest = getFloorPlanHeightAt(model, x - 1, y + 1);
            const south = getFloorPlanHeightAt(model, x, y + 1);
            const southEast = getFloorPlanHeightAt(model, x + 1, y + 1);

            let type = (((northWest === above) || (north === above) || (west === above)) ? 1 : 0)
                | (((northEast === above) || (north === above) || (east === above)) ? 2 : 0)
                | (((southWest === above) || (south === above) || (west === above)) ? 4 : 0)
                | (((southEast === above) || (south === above) || (east === above)) ? 8 : 0);

            if (type === 15) type = 0;

            if (entryPoint && (entryPoint.x === x) && (entryPoint.y === y)) type = entryType;

            tiles.push({ x: pointX, y: pointY, type });
        }
    }

    if (!tiles.length) return { tiles: [], width: 0, height: 0 };

    return {
        tiles: tiles.map(tile => ({ screenX: tile.x - minX, screenY: tile.y - minY, type: tile.type })),
        width: Math.min(maxX - minX + FLOOR_PLAN_PREVIEW_TILE_SIZE, PREVIEW_MAX_SIZE),
        height: Math.min(maxY - minY + FLOOR_PLAN_PREVIEW_TILE_SIZE, PREVIEW_MAX_SIZE),
    };
};
