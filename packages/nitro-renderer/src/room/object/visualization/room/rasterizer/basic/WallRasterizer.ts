/**
 * Draws the room's walls from `wallData`: every wall type a `WallPlane`, the one a plane names (or
 * `default`) rendered at its size, material by material. Ports Flash `WallRasterizer`.
 *
 * A wall's texture depends on which way it faces - a material picks its matrix, and a texture its
 * bitmap, by the plane's normal - so the texture identifier carries the normal, and the left and
 * right walls of a room are two textures. As `FloorRasterizer`, the canvas clearing and cloning
 * Flash does around `render` is `PlaneVisualization.render`'s own here.
 */
import { IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { PlaneBitmapData } from '../../utils';
import { PlaneRasterizer } from './PlaneRasterizer';
import { WallPlane } from './WallPlane';

export class WallRasterizer extends PlaneRasterizer {
    protected override initializePlanes(): void {
        if (this.data?.planes) this.parseWalls();
    }

    protected parseWalls(): void {
        for (const wall of this.data?.planes ?? []) {
            if (!wall?.id) continue;

            const plane = new WallPlane();

            this.parseVisualizations(plane, wall.visualizations);

            if (!this.addPlane(wall.id, plane)) plane.dispose();
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
    ): PlaneBitmapData | undefined {
        let plane = this.getPlane(planeId);

        if (!(plane instanceof WallPlane)) plane = this.getPlane(PlaneRasterizer.DEFAULT_TYPE);

        if (!(plane instanceof WallPlane)) return undefined;

        const texture = plane.render(canvas, width, height, scale, normal, useTexture);

        if (!texture) return undefined;

        return new PlaneBitmapData(texture, -1);
    }

    public override getTextureIdentifier(scale: number, normal: IVector3D | undefined): string {
        if (normal) return `${scale}_${normal.x}_${normal.y}_${normal.z}`;

        return super.getTextureIdentifier(scale, normal);
    }
}
