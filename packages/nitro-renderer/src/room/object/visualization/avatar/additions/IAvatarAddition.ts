import { IRoomObjectSprite, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

/** Port of Flash's obfuscated `§_-lm§`, the interface of what an avatar draws over itself. */
export interface IAvatarAddition {
    dispose(): void;
    update(sprite: IRoomObjectSprite, scale: RoomGeometryScaleType): void;
    animate(sprite: IRoomObjectSprite): boolean;
    id: number;
}
