import type { IEventDispatcher, INitroEvent } from '../../../utils';
import type { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory {
    getLogic(type: string): IRoomObjectEventHandler | undefined;
    registerEventFunction(func: (event: INitroEvent) => void): void;
    removeEventFunction(func: (event: INitroEvent) => void): void;
    events: IEventDispatcher;
}
