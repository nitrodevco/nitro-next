import type { IRoomEventHandler } from '../../IRoomEventHandler';
import type { IRoomObjectController } from '../IRoomObjectController';
import type { IRoomObjectUpdateMessage } from '../IRoomObjectUpdateMessage';
import type { IRoomObjectMouseHandler } from './IRoomObjectMouseHandler';

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler {
    initialize(data: unknown): void;
    dispose(): void;
    update(totalTimeRunning: number): void;
    processUpdateMessage(message: IRoomObjectUpdateMessage): void;
    getEventTypes(): string[];
    useObject(): void;
    setObject(object: IRoomObjectController): void;
    tearDown(): void;
    object: IRoomObjectController;
    eventHandler: IRoomEventHandler;
    widget: string | undefined;
    contextMenu: string | undefined;
}
