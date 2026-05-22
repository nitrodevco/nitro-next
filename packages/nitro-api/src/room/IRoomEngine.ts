import type { Ticker } from 'pixi.js';

import type { IRoom } from './IRoom';

export interface IRoomEngine {
    init(): Promise<void>;
    update(ticker: Ticker): void;
    createRoom(roomId: number): Promise<IRoom>;
    whereYouClickIsWhereYouGo(): boolean;
    moveBlocked: boolean;
}
