import { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

/**
 * A logic that carries state over from the logic it replaces on the same object
 * (`com.sulake.room.object.logic.IRoomObjectEventHandlerStateTransfer`).
 */
export interface IRoomObjectEventHandlerStateTransfer {
    transferStateFrom(handler: IRoomObjectEventHandler): void;
}
