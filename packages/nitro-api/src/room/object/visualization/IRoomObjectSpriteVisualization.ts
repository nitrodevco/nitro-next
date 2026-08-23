import { RoomObjectSpriteData } from '#api/room';

import { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import { IRoomObjectSprite } from './IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
    getSprite(index: number): IRoomObjectSprite | undefined;
    getSpriteList(): RoomObjectSpriteData[];
    sprites: IRoomObjectSprite[];
    updateObjectCounter: number;
    updateModelCounter: number;
}
