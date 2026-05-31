import type { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory {
    getLogic(type: string | undefined): IRoomObjectEventHandler | undefined;
}
