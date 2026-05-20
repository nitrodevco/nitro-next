import type { IVector3D } from '#api/utils';

import type { IRoomObjectModel } from './IRoomObjectModel';
import type { IRoomObjectMouseHandler } from './logic';
import type { IRoomObjectVisualization } from './visualization';

export interface IRoomObject {
    dispose(): void;
    getLocation(): IVector3D;
    getDirection(): IVector3D;
    getState(index?: number): number;
    id: number;
    instanceId: number;
    type: string;
    model: IRoomObjectModel;
    visualization: IRoomObjectVisualization;
    mouseHandler: IRoomObjectMouseHandler;
    location: IVector3D;
    direction: IVector3D;
    updateCounter: number;
    isReady: boolean;
}
