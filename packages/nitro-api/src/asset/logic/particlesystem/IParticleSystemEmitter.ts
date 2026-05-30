import type { IParticleSystemParticle } from './IParticleSystemParticle';
import type { IParticleSystemSimulation } from './IParticleSystemSimulation';

export interface IParticleSystemEmitter {
    id?: number;
    name?: string;
    spriteId?: number;
    maxNumParticles?: number;
    particlesPerFrame?: number;
    burstPulse?: number;
    fuseTime?: number;
    simulation?: IParticleSystemSimulation;
    particles?: IParticleSystemParticle[];
}
