import type { RoomObjectSpriteData } from '../../renderer';
import type { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import type { IRoomObjectSprite } from './IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
    getSprite(index: number): IRoomObjectSprite;
    getSpriteList(): RoomObjectSpriteData[];
    sprites: IRoomObjectSprite[];
    updateObjectCounter: number;
    updateModelCounter: number;
}
