import type { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory {
    getLogic(type: string): IRoomObjectEventHandler | undefined;
}
