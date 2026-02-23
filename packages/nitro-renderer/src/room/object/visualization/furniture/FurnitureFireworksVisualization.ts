import type { IAdvancedMap, IParticleSystem } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-shared';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurnitureParticleSystem } from './FurnitureParticleSystem';

export class FurnitureFireworksVisualization extends FurnitureAnimatedVisualization {
    private _particleSystems: IAdvancedMap<number, FurnitureParticleSystem> | undefined = undefined;
    private _currentParticleSystem: FurnitureParticleSystem | undefined = undefined;

    public override dispose(): void {
        super.dispose();

        this._currentParticleSystem = undefined;

        if (this._particleSystems) {
            for (const particleSystem of this._particleSystems.getValues()) particleSystem.dispose();

            this._particleSystems = undefined;
        }
    }

    protected override updateObject(scale: number, direction: number): boolean {
        if (!super.updateObject(scale, direction)) return false;

        if (!this._particleSystems) this.readDefinition();

        if (!this._particleSystems) return true;

        const targetParticleSystem = this._particleSystems.getValue(scale);

        if (!this._currentParticleSystem) this._currentParticleSystem = targetParticleSystem;

        if (scale !== this._scale || targetParticleSystem !== this._currentParticleSystem) {
            if (this._currentParticleSystem) {
                targetParticleSystem?.copyStateFrom(this._currentParticleSystem);

                this._currentParticleSystem.reset();
            }

            this._currentParticleSystem = targetParticleSystem;
        }

        return true;
    }

    protected override updateSprites(scale: number, update: boolean, animation: number): void {
        super.updateSprites(scale, update, animation);

        if (this._currentParticleSystem) this._currentParticleSystem.updateSprites();
    }

    protected override updateAnimation(scale: number): number {
        if (this._currentParticleSystem) this._currentParticleSystem.updateAnimation();

        return super.updateAnimation(scale);
    }

    protected override setAnimation(id: number): void {
        if (this._currentParticleSystem) this._currentParticleSystem.setAnimation(id);

        super.setAnimation(id);
    }

    protected override getLayerYOffset(scale: number, direction: number, layerId: number): number {
        if (this._currentParticleSystem && this._currentParticleSystem.controlsSprite(layerId)) {
            return this._currentParticleSystem.getLayerYOffset(scale, direction, layerId);
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }

    private readDefinition(): boolean {
        const fireworksData = this.object.model.getValue<IParticleSystem[]>(
            RoomObjectVariableEnum.FurnitureFireworksData,
        );

        if (!fireworksData || !fireworksData.length) return false;

        this._particleSystems = new AdvancedMap();

        for (const particleData of fireworksData) {
            const size = particleData.size;

            if (size === undefined) continue;

            const particleSystem = new FurnitureParticleSystem(this);

            particleSystem.parseData(particleData);

            this._particleSystems.add(size, particleSystem);
        }

        return true;
    }
}
