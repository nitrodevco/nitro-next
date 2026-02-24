import type { Ticker } from 'pixi.js';

import type { IRoom } from './IRoom';
import type { IRoomMapData } from './object';

export interface IRoomEngine {
    init(): Promise<void>;
    update(ticker: Ticker): void;
    createRoom(roomId: number, roomMap: IRoomMapData): Promise<IRoom>;
}
