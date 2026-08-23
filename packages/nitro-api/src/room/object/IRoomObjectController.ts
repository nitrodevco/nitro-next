import { IVector3D } from '#api/utils';

import { IRoomObject } from './IRoomObject';
import { IRoomObjectUpdateMessage } from './IRoomObjectUpdateMessage';
import { IRoomObjectEventHandler } from './logic';
import { IRoomObjectGraphicVisualization } from './visualization';

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
