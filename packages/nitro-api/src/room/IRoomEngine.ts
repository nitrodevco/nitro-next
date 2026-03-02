import type { Ticker } from 'pixi.js';

import type { IRoom } from './IRoom';
import type { IRoomObjectController, RoomObjectCategoryEnum } from './object';

export interface IRoomEngine {
    init(): Promise<void>;
    update(ticker: Ticker): void;
    createRoom(roomId: number): Promise<IRoom>;
    getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum;
    getRoomObjectCursor(roomId: number): IRoomObjectController | undefined;
    whereYouClickIsWhereYouGo(): boolean;
    isPlayingGame: boolean;
}
