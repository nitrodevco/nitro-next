/**
 * One floor type of the room's `floorData` (`101`, `default`, ...), drawn at the pixel size the
 * room's floor geometry gives it. Ports Flash's obfuscated
 * `§_-RZ§`, the `Plane` `FloorRasterizer` builds.
 *
 * `width` and `height` come in as the plane's sides in world units times the scale; the
 * visualization's geometry turns them into the diamond's horizontal extent, and the texture offset
 * (a fraction of a tile, so a floor lines up across planes) into whole pixels.
 */
import { IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { Plane } from './Plane';

export class FloorPlane extends Plane {
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    public render(canvas: RenderTexture | undefined, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number): RenderTexture | undefined {
        const visualization = this.getPlaneVisualization(scale);
        const geometry = visualization?.geometry;

        if (!visualization || !geometry) return undefined;

        const origin = geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const yEnd = geometry.getScreenPoint(new Vector3d(0, height / geometry.scale, 0));
        const xEnd = geometry.getScreenPoint(new Vector3d(width / geometry.scale, 0, 0));

        let renderOffsetX = 0;
        let renderOffsetY = 0;

        if (origin && yEnd && xEnd) {
            width = Math.round(Math.abs(origin.x - xEnd.x));
            height = Math.round(Math.abs(origin.x - yEnd.x));

            const pixelsPerUnit = origin.x - geometry.getScreenPoint(new Vector3d(1, 0, 0)).x;

            // Flash `param7 * int(Math.abs(_loc14_))` into an `int` local: the pixels per unit
            // truncate first (a 31.999... from the geometry is 31), then the product does.
            renderOffsetX = (offsetX * (Math.abs(pixelsPerUnit) | 0)) | 0;
            renderOffsetY = (offsetY * (Math.abs(pixelsPerUnit) | 0)) | 0;
        }

        return visualization.render(canvas, width, height, normal, useTexture, renderOffsetX, renderOffsetY);
    }
}
