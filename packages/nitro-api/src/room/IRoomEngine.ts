import type { Ticker } from 'pixi.js';

import type { IRoom } from './IRoom';
import type { RoomObjectCategoryEnum } from './object';

export interface IRoomEngine {
    init(): Promise<void>;
    update(ticker: Ticker): void;
    createRoom(roomId: number): Promise<IRoom>;
    getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum;
    whereYouClickIsWhereYouGo(): boolean;
    isPlayingGame(): boolean;
    moveBlocked: boolean;
}
