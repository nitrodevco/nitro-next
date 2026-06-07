import type { IAssetLogicPlanetSystem, IVector3D, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurniturePlanetSystemVisualizationPlanetObject } from './FurniturePlanetSystemVisualizationPlanetObject';

export class FurniturePlanetSystemVisualization extends FurnitureAnimatedVisualization {
    private _planetIndex: FurniturePlanetSystemVisualizationPlanetObject[] | undefined = undefined;
    private _planetNameIndex: string[] = [];
    private _offsetArray: IVector3D[] = [];
    private _rootPosition: IVector3D = new Vector3d();

    public override dispose(): void {
        if (this._planetIndex) {
            while (this._planetIndex.length > 0) this._planetIndex.shift()?.dispose();
        }

        this._planetIndex = undefined;
        this._planetNameIndex = [];

        super.dispose(); // TODO maybe not?
    }

    protected override updateAnimation(scale: RoomGeometryScaleType): number {
        if (!this._planetIndex && this.spriteCount > 0 && !this.processPlanets()) return 0;

        if (this._planetIndex) {
            for (const planet of this._planetIndex) planet.update(this._offsetArray, this._rootPosition, scale);

            return super.updateAnimation(scale);
        }

        return 0;
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this._offsetArray[layerId]) return this._offsetArray[layerId].x;

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this._offsetArray[layerId]) return this._offsetArray[layerId].y;

        return super.getLayerYOffset(scale, direction, layerId);
    }

    protected override getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this._offsetArray[layerId]) return this._offsetArray[layerId].z;

        return super.getLayerZOffset(scale, direction, layerId);
    }

    private processPlanets(): boolean {
        const planetSystems = this.object.model.getValue<IAssetLogicPlanetSystem[]>(
            RoomObjectVariableEnum.FurniturePlanetsystemData,
        );

        if (!planetSystems) return false;

        this._planetIndex = [];
        this._planetNameIndex = [];

        for (const planet of planetSystems) {
            if (planet.id === undefined) continue;

            const sprite = this.getSprite(planet.id);

            if (sprite) {
                this.addPlanet(
                    planet.name ?? '',
                    planet.id,
                    planet.parent ?? '',
                    planet.radius ?? 0,
                    planet.arcSpeed ?? 0,
                    planet.arcOffset ?? 0,
                    planet.height ?? 0,
                );
            }
        }

        return true;
    }

    private addPlanet(
        name: string,
        index: number,
        parentName: string,
        radius: number,
        arcSpeed: number,
        arcOffset: number,
        height: number,
    ): void {
        if (!this._planetIndex) return;

        const planet = new FurniturePlanetSystemVisualizationPlanetObject(
            name,
            index,
            radius,
            arcSpeed,
            arcOffset,
            height,
        );
        const existingPlanet = this.getPlanet(parentName);

        if (existingPlanet) existingPlanet.addChild(planet);
        else {
            this._planetIndex.push(planet);
            this._planetNameIndex.push(name);
        }
    }

    private getPlanet(name: string): FurniturePlanetSystemVisualizationPlanetObject | undefined {
        if (this._planetIndex)
            for (const planet of this._planetIndex) {
                if (planet.name === name) return planet;

                if (planet.hasChild(name)) return planet.getChild(name);
            }

        return undefined;
    }
}
