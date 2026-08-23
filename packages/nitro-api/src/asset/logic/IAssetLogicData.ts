import type { ICustomVars } from './IAssetLogicCustomVars';
import type { IAssetLogicPlanetSystem } from './IAssetLogicPlanetSystem';
import type { ISoundSample } from './ISoundSample';
import type { IAssetLogicModel } from './model/IAssetLogicModel';
import type { IParticleSystem } from './particlesystem';

export interface IAssetLogicData {
    model?: IAssetLogicModel;
    maskType?: string;
    credits?: string;
    soundSample?: ISoundSample;
    action?: { link?: string; startState?: number };
    planetSystems?: IAssetLogicPlanetSystem[];
    particleSystems?: IParticleSystem[];
    customVars?: ICustomVars;
}
