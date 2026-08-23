import { IAssetData } from '#api/asset/IAssetData';

import { IRoomEventHandler } from '../../IRoomEventHandler';
import { IRoomObjectController } from '../IRoomObjectController';
import { IRoomObjectUpdateMessage } from '../IRoomObjectUpdateMessage';
import { IRoomObjectMouseHandler } from './IRoomObjectMouseHandler';

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler {
    initialize(data: IAssetData | undefined): void;
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
