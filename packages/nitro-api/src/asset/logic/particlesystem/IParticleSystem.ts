import { RoomGeometryScaleType } from '#api/room/enum';

import { IParticleSystemEmitter } from './IParticleSystemEmitter';

export interface IParticleSystem {
    size: RoomGeometryScaleType;
    canvasId?: number;
    offsetY?: number;
    blend?: number;
    bgColor?: string;
    emitters?: IParticleSystemEmitter[];
}
