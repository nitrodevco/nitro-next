
import type { RoomObjectSpriteData } from '#api/room';

import type { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import type { IRoomObjectSprite } from './IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
    getSprite(index: number): IRoomObjectSprite | undefined;
    getSpriteList(): RoomObjectSpriteData[];
    sprites: IRoomObjectSprite[];
    updateObjectCounter: number;
    updateModelCounter: number;
}
