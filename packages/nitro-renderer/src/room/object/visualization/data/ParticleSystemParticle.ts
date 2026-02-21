import type { IGraphicAsset } from '@nitrodevco/nitro-api';

export interface ParticleSystemParticle {
    isEmitter?: boolean;
    lifeTime?: number;
    fade?: boolean;
    frames?: IGraphicAsset[];
}
