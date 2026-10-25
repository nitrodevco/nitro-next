import { RoomObjectSpriteData } from '#api/room';

import { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import { IRoomObjectSprite } from './IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
    getSprite(index: number): IRoomObjectSprite | undefined;
    getSpriteList(): RoomObjectSpriteData[];
    sprites: IRoomObjectSprite[];
    /** Flash `IPlaneVisualization.additionalSpriteCount` / `getAdditionalSprite`: sprites drawn after `sprites` (a WIRED highlight composite). */
    readonly additionalSpriteCount: number;
    getAdditionalSprite(index: number): IRoomObjectSprite | undefined;
    updateObjectCounter: number;
    updateModelCounter: number;
}
