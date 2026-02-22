import type { BLEND_MODES, Filter, Texture } from 'pixi.js';

import type { RoomObjectSpriteTypeEnum } from '../RoomObjectSpriteTypeEnum';

export interface IRoomObjectSprite {
    dispose(): void;
    increaseUpdateCounter(): void;
    id: number;
    name: string;
    type: string;
    spriteType: RoomObjectSpriteTypeEnum;
    texture: Texture | undefined;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    flipH: boolean;
    flipV: boolean;
    direction: number;
    alpha: number;
    blendMode: BLEND_MODES;
    color: number;
    relativeDepth: number;
    varyingDepth: boolean;
    libraryAssetName: string | undefined;
    clickHandling: boolean;
    visible: boolean;
    tag: string;
    posture: string | undefined;
    alphaTolerance: number;
    filters: Filter[];
    updateCounter: number;
    skipMouseHandling: boolean;
}
