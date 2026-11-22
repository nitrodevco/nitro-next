/**
 * Not Flash's: where a client module's secondary room is drawn against the room on screen, and which
 * tile of a room's floor is under a point of the stage (`secondaryRooms.ts`, `RoomCanvas`).
 */
import { IRoomRenderingCanvas, Vector3d } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

/** A place in a room's tile coordinates. */
export interface RoomTileLocation {
    x: number;
    y: number;
    z: number;
}

/** A room's floor from its `FloorHeightMap` model: each tile's height (`undefined` off the floor), and the heights there are, highest first. */
export interface RoomFloorTiles {
    rows: (number | undefined)[][];
    heights: number[];
}

type Canvas = Pick<IRoomRenderingCanvas, 'geometry' | 'screenOffsetX' | 'screenOffsetY' | 'scale' | 'isFlipped' | 'width' | 'height'>;

/** The scale the canvas draws its display at: negative while it is flipped (`RoomSpriteCanvas.displayScale`). */
const displayScale = (canvas: Canvas) => (canvas.isFlipped ? -canvas.scale : canvas.scale);

/** `RoomMessageHandler`'s model: rows split at `\r`, a tile's height one base-36 digit, `x` no tile. */
export const parseRoomFloorTiles = (modelData: string): RoomFloorTiles => {
    const heights = new Set<number>();
    const rows = modelData.split('\r').map(row => [ ...row ].map((char) => {
        if ((char === 'x') || (char === 'X')) return undefined;

        const height = parseInt(char, 36);

        if (!Number.isFinite(height)) return undefined;

        heights.add(height);

        return height;
    }));

    return { rows, heights: [ ...heights ].sort((a, b) => b - a) };
};

/**
 * The screen offset that draws `secondary` with its tile (0, 0, 0) where `active` draws its tile
 * `offset`: both canvases share the room geometry's direction and scale, so a point's place on screen
 * differs between them by the same amount everywhere.
 */
export const secondaryRoomScreenOffset = (active: Canvas, secondary: Canvas, offset: RoomTileLocation): { x: number; y: number } | undefined => {
    const there = active.geometry.getScreenPoint(new Vector3d(offset.x, offset.y, offset.z));
    const origin = secondary.geometry.getScreenPoint(new Vector3d(0, 0, 0));

    if (!there || !origin) return undefined;

    const scale = displayScale(active);

    return { x: active.screenOffsetX + (scale * (there.x - origin.x)), y: active.screenOffsetY + (scale * (there.y - origin.y)) };
};

/** The tile of the plane at height `z` under a stage point, in the room's tile coordinates - off its floor too. */
export const roomPlaneTileAt = (canvas: Canvas, x: number, y: number, z: number = 0): { x: number; y: number } | undefined => {
    const scale = displayScale(canvas);

    if (!scale) return undefined;

    const point = new Point(((x - canvas.screenOffsetX) / scale) - (canvas.width / 2), ((y - canvas.screenOffsetY) / scale) - (canvas.height / 2));
    const plane = canvas.geometry.getPlanePosition(point, new Vector3d(0, 0, z), new Vector3d(1, 0, 0), new Vector3d(0, 1, 0));

    // `RoomObjectTileMouseEvent.tileXAsInt`: a tile's own coordinate is its centre.
    return (plane && Number.isFinite(plane.x) && Number.isFinite(plane.y)) ? { x: Math.floor(plane.x + 0.5), y: Math.floor(plane.y + 0.5) } : undefined;
};

/** The floor tile whose top is under a stage point, the highest first; `undefined` off the floor. */
export const roomFloorTileAt = (canvas: Canvas, floor: RoomFloorTiles, x: number, y: number): RoomTileLocation | undefined => {
    for (const height of floor.heights) {
        const tile = roomPlaneTileAt(canvas, x, y, height);

        if (tile && (floor.rows[tile.y]?.[tile.x] === height)) return { ...tile, z: height };
    }

    return undefined;
};
