import { IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { PlaneBitmapData } from '../utils';

/**
 * What a `RoomPlane` draws its texture with. Ports Flash's obfuscated rasterizer interface
 * `§_-ED§`, less three members nothing in the port can call: `initializeDimensions` (no Flash class
 * calls it, and `LandscapeRasterizer` only stored what it was given), `reinitialize` (no Flash class
 * calls it either) and `getLayers` (only `RoomPlane.getDrawingDatas` asks, which the port lacks).
 */
export interface IPlaneRasterizer {
    /**
     * The texture of the plane type `planeId` (or `default`) at `scale`, `width` x `height` world
     * units scaled, for a plane facing `normal`. `canvas` is the plane's previous texture, drawn over
     * again when the size still fits; a texture handed back that is not `canvas` replaces it, and the
     * caller releases the old one.
     */
    render(
        canvas: RenderTexture | undefined,
        planeId: string,
        width: number,
        height: number,
        scale: number,
        normal: IVector3D,
        useTexture: boolean,
        offsetX?: number,
        offsetY?: number,
        maxX?: number,
        maxY?: number,
        timeSinceStartMs?: number,
    ): PlaneBitmapData | undefined;
    getTextureIdentifier(scale: number, normal: IVector3D | undefined): string;
}
