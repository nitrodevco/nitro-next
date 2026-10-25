import { IObjectVisualizationData, IRoomGeometry, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { FurniturePlane } from './FurniturePlane';

/**
 * Port of Flash `FurnitureCuboidVisualization` (`furniture_cuboid`): no bitmaps of its own, only
 * `FurniturePlane`s projected from the furni's size. Flash builds one - the footprint,
 * `furniture_size_x` by `furniture_size_y` from (-0.5, -0.5, 0), in yellow (`16776960`) - and
 * needs `furniture_size_z` only to know the size has arrived. A quarter turn (direction 2 or 6)
 * swaps the plane's side lengths.
 *
 * The planes draw into render textures they own instead of the `AssetLibrary` Flash kept
 * (`"plane " + index + " " + scale`), and a redrawn plane raises the sprite counter so the canvas
 * picks it up - Flash renamed the sprite's asset (`assetName`) for the same reason.
 */
export class FurnitureCuboidVisualization extends RoomObjectSpriteVisualization {
    private static PLANE_COLOR: number = 16776960;

    private _planes: FurniturePlane[] = [];
    private _planesInitialized: boolean = false;
    private _updateCount: number = 0;

    public override initialize(_data: IObjectVisualizationData): boolean {
        this.reset();

        return true;
    }

    public override dispose(): void {
        super.dispose();

        for (const plane of this._planes) plane.dispose();

        this._planes = [];
    }

    protected defineSprites(): void {
        this.createSprites(1);
    }

    protected initializePlanes(): void {
        if (this._planesInitialized || !this.object) return;

        const model = this.object.model;
        const sizeX = model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        const sizeY = model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);
        const sizeZ = model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);

        if (!Number.isFinite(sizeX) || !Number.isFinite(sizeY) || !Number.isFinite(sizeZ)) return;

        const plane = new FurniturePlane(new Vector3d(-0.5, -0.5, 0), new Vector3d(sizeX, 0, 0), new Vector3d(0, sizeY, 0));

        plane.color = FurnitureCuboidVisualization.PLANE_COLOR;

        this._planes.push(plane);
        this._planesInitialized = true;

        this.defineSprites();
    }

    public override update(geometry: IRoomGeometry, _time: number, _update: boolean, _skipUpdate: boolean): void {
        if (!this.object || !geometry) return;

        this.initializePlanes();
        this.updatePlanes(geometry);
    }

    protected updatePlanes(geometry: IRoomGeometry): void {
        if (!this.object || !geometry) return;

        this._updateCount++;

        let changed = false;

        for (let index = 0; index < this._planes.length; index++) {
            const plane = this._planes[index];
            const sprite = this.getSprite(index);

            if (!plane || !sprite) continue;

            const direction = this.object.getDirection().x;

            plane.setRotation((direction / 45) === 2 || (direction / 45) === 6);

            const planeChanged = plane.update(geometry);

            if (planeChanged) changed = true;

            sprite.offsetX = -plane.offset.x;
            sprite.offsetY = -plane.offset.y;
            sprite.color = plane.color;
            sprite.visible = plane.visible;
            sprite.texture = plane.texture ?? Texture.EMPTY;

            if (planeChanged) sprite.name = `plane ${index} ${geometry.scale}_${this.object.instanceId}_${this._updateCount}`;

            sprite.relativeDepth = plane.relativeDepth;
        }

        if (changed) this.updateSpriteCounter++;
    }
}
