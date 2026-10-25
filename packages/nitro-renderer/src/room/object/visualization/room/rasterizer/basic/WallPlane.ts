/**
 * One wall type of the room's `wallData` (or `wallAdData`), drawn at the pixel size the room's wall
 * geometry gives it: the wall's run along the floor becomes its horizontal extent and its height
 * its vertical one. Ports Flash's obfuscated `§_-e1B§`, the
 * `Plane` `WallRasterizer` builds.
 */
import { IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { Plane } from './Plane';

export class WallPlane extends Plane {
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    public render(canvas: RenderTexture | undefined, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean): RenderTexture | undefined {
        const visualization = this.getPlaneVisualization(scale);
        const geometry = visualization?.geometry;

        if (!visualization || !geometry) return undefined;

        const origin = geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const yEnd = geometry.getScreenPoint(new Vector3d(0, 0, height / geometry.scale));
        const xEnd = geometry.getScreenPoint(new Vector3d(0, width / geometry.scale, 0));

        if (origin && yEnd && xEnd) {
            width = Math.round(Math.abs(origin.x - xEnd.x));
            height = Math.round(Math.abs(origin.y - yEnd.y));
        }

        return visualization.render(canvas, width, height, normal, useTexture);
    }
}
