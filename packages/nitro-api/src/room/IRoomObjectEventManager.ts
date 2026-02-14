import type { IRoomObjectController } from './object';

export interface IRoomObjectEventManager {
    getValidRoomObjectDirection(k: IRoomObjectController, _arg_2: boolean): number;
}
