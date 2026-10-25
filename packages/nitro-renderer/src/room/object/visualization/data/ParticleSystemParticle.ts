import { IGraphicAsset } from '@nitrodevco/nitro-api';

/**
 * Nitro's own: one particle of a `particlesystems` entry as the asset data gives it, which
 * `FurnitureParticleSystemEmitter` spawns.
 */
export interface ParticleSystemParticle {
    isEmitter?: boolean;
    lifeTime?: number;
    fade?: boolean;
    frames?: IGraphicAsset[];
}
