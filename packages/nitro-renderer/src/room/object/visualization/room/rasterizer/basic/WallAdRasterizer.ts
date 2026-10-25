/**
 * Draws billboard walls from `wallAdData`: a `WallRasterizer` over a different section, keeping the
 * first plane of an id, with one texture per scale whichever way the wall faces. Ports Flash
 * `WallAdRasterizer`.
 *
 * Nothing reaches it, in the client or here: `RoomVisualization` gives it the planes of type 4
 * (`RoomPlaneData.PLANE_BILLBOARD`), and `RoomPlaneParser` only ever builds floors, walls and
 * landscapes. It is kept so the room's rasterizers are Flash's whole set.
 */
import { IVector3D } from '@nitrodevco/nitro-api';

import { WallPlane } from './WallPlane';
import { WallRasterizer } from './WallRasterizer';

export class WallAdRasterizer extends WallRasterizer {
    public override getTextureIdentifier(scale: number, _normal: IVector3D | undefined): string {
        return String(scale);
    }

    protected override parseWalls(): void {
        for (const wallAd of this.data?.planes ?? []) {
            if (!wallAd?.id) continue;

            const plane = new WallPlane();

            this.parseVisualizations(plane, wallAd.visualizations);

            if (!this.getPlane(wallAd.id)) this.addPlane(wallAd.id, plane);
            else plane.dispose();
        }
    }
}
