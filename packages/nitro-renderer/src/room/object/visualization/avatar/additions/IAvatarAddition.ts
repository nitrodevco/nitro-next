import type { IRoomObjectSprite, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

export interface IAvatarAddition {
    dispose(): void;
    update(sprite: IRoomObjectSprite, scale: RoomGeometryScaleType): void;
    animate(sprite: IRoomObjectSprite): boolean;
    id: number;
}
