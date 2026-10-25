/**
 * WIN63-202610131318 `VariableLeaderboardLocationProjector`: a leaderboard location (tile, `offsetX`
 * room pixels right of the tile centre, `altitude` room pixels up, at the room's zoom) to a point on
 * screen and back; a panel's bottom centre sits on that point. The room view's size is the canvas's
 * (`getRoomViewRect`), the scale its zoom (`getScale`, `getRoomOverlayScale`).
 */
import { IRoom, Vector3d } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

import { VARIABLE_LEADERBOARD_MAX_OFFSET_X, VARIABLE_LEADERBOARD_MIN_OFFSET_X, VariableLeaderboardLocation } from '#base/wired';

import { getRoomOverlayScale } from '../../overlay';

const canvasOf = (room: IRoom) => room.canvas ?? null;

/** `getRoomCanvasScale` - negative for a flipped room, as the room engine reports it. */
const canvasScaleOf = (room: IRoom): number => {
    const canvas = canvasOf(room);

    if (!canvas) return 0;

    return canvas.isFlipped ? -canvas.scale : canvas.scale;
};

/** `projectTileCenter`: the centre of a tile's floor on screen. */
const projectTileCenter = (room: IRoom, tileX: number, tileY: number): { x: number; y: number } | null => {
    const canvas = canvasOf(room);

    if (!canvas) return null;

    const point = canvas.geometry.getScreenPoint(new Vector3d(tileX + 0.5, tileY + 0.5, 0));

    if (!point) return null;

    const scale = canvasScaleOf(room);

    return { x: ((point.x + (canvas.width / 2)) * scale) + canvas.screenOffsetX, y: ((point.y + (canvas.height / 2)) * scale) + canvas.screenOffsetY };
};

/** `project`: the location's anchor on screen. */
export const projectLeaderboardLocation = (room: IRoom, location: VariableLeaderboardLocation): { x: number; y: number } | null => {
    const center = projectTileCenter(room, location.tileX, location.tileY);

    if (!center) return null;

    const scale = getRoomOverlayScale(room);

    return { x: center.x + (location.offsetX * scale), y: center.y - (location.altitude * scale) };
};

/** `project` + `getWindowPosition`: the window's top-left, its bottom centre on the anchor. */
export const placeLeaderboardWindow = (room: IRoom, location: VariableLeaderboardLocation, width: number, height: number): { x: number; y: number } | null => {
    const anchor = projectLeaderboardLocation(room, location);

    return anchor ? { x: anchor.x - (width / 2), y: anchor.y - height } : null;
};

/**
 * `getScreenAnchor` + `unproject`: the location of a window dragged to `x`, `y` - the floor tile
 * under its bottom centre, then the pixels right of and above that tile's centre. When the
 * horizontal offset leaves -32..32, the anchor moves to the neighbour tile along the axis that
 * runs most sideways on screen and the offset is measured again.
 */
export const unprojectLeaderboardWindow = (room: IRoom, x: number, y: number, width: number, height: number): VariableLeaderboardLocation | null => {
    const canvas = canvasOf(room);

    if (!canvas) return null;

    const scale = getRoomOverlayScale(room);
    const canvasScale = canvasScaleOf(room);

    if (!scale || !canvasScale) return null;

    const anchor = { x: x + (width / 2), y: y + height };
    const planePoint = new Point(((anchor.x - canvas.screenOffsetX) / canvasScale) - (canvas.width / 2), ((anchor.y - canvas.screenOffsetY) / canvasScale) - (canvas.height / 2));
    const plane = canvas.geometry.getPlanePosition(planePoint, new Vector3d(0, 0, 0), new Vector3d(1, 0, 0), new Vector3d(0, 1, 0));

    if (!plane) return null;

    let tileX = Math.floor(plane.x);
    let tileY = Math.floor(plane.y);
    let center = projectTileCenter(room, tileX, tileY);

    if (!center) return null;

    const rawOffset = (anchor.x - center.x) / scale;
    let offsetX = Math.round(rawOffset);

    if ((offsetX < VARIABLE_LEADERBOARD_MIN_OFFSET_X) || (offsetX > VARIABLE_LEADERBOARD_MAX_OFFSET_X)) {
        const alongX = projectTileCenter(room, tileX + 1, tileY);
        const alongY = projectTileCenter(room, tileX, tileY + 1);

        if (!alongX || !alongY) return null;

        const stepX = (alongX.x - center.x) / scale;
        const stepY = (alongY.x - center.x) / scale;
        const useX = (Math.abs(stepX) >= Math.abs(stepY));
        const step = useX ? stepX : stepY;

        if (step === 0) return null;

        let tiles = Math.round(rawOffset / step);

        if (tiles === 0) tiles = ((rawOffset * step) > 0) ? 1 : -1;

        if (useX) tileX += tiles;
        else tileY += tiles;

        center = projectTileCenter(room, tileX, tileY);

        if (!center) return null;

        offsetX = Math.round((anchor.x - center.x) / scale);
    }

    return { tileX, tileY, offsetX, altitude: Math.round((center.y - anchor.y) / scale) };
};
