import type { IVector3D } from '#api/utils';

import type { IRoomObject } from './IRoomObject';
import type { IRoomObjectUpdateMessage } from './IRoomObjectUpdateMessage';
import type { IRoomObjectEventHandler } from './logic';
import type { IRoomObjectGraphicVisualization } from './visualization';

export interface IRoomObjectController extends IRoomObject {
    setLocation(vector: IVector3D): void;
    setDirection(vector: IVector3D): void;
    setState(state: number, index?: number): boolean;
    setVisualization(visualization: IRoomObjectGraphicVisualization): void;
    setLogic(logic: IRoomObjectEventHandler): void;
    processUpdateMessage(message: IRoomObjectUpdateMessage): void;
    tearDown(): void;
    isReady: boolean;
    logic: IRoomObjectEventHandler;
}
