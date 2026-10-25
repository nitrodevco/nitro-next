/**
 * Draws the room's floors from `floorData`: every floor type a `FloorPlane`, the one a plane names
 * (or `default`) rendered at its size, material by material. Ports Flash `FloorRasterizer`.
 *
 * Flash clears the canvas it is handed and clones a bitmap the plane returns in its place; the
 * port's `PlaneVisualization.render` clears or replaces the canvas itself and hands back one the
 * caller owns, so neither step is needed. A floor never expires (`-1`): it is drawn again only when
 * the plane asks for a new texture.
 */
import { IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { PlaneBitmapData } from '../../utils';
import { FloorPlane } from './FloorPlane';
import { PlaneRasterizer } from './PlaneRasterizer';

export class FloorRasterizer extends PlaneRasterizer {
    protected override initializePlanes(): void {
        if (this.data?.planes) this.parseFloors();
    }

    private parseFloors(): void {
        for (const floor of this.data?.planes ?? []) {
            if (!floor?.id) continue;

            const plane = new FloorPlane();

            this.parseVisualizations(plane, floor.visualizations);

            if (!this.addPlane(floor.id, plane)) plane.dispose();
        }
    }

    public override render(
        canvas: RenderTexture | undefined,
        planeId: string,
        width: number,
        height: number,
        scale: number,
        normal: IVector3D,
        useTexture: boolean,
        offsetX: number = 0,
        offsetY: number = 0,
    ): PlaneBitmapData | undefined {
        let plane = this.getPlane(planeId);

        if (!(plane instanceof FloorPlane)) plane = this.getPlane(PlaneRasterizer.DEFAULT_TYPE);

        if (!(plane instanceof FloorPlane)) return undefined;

        const texture = plane.render(canvas, width, height, scale, normal, useTexture, offsetX, offsetY);

        if (!texture) return undefined;

        return new PlaneBitmapData(texture, -1);
    }
}
