import type { IRoomObjectSprite } from '@nitrodevco/nitro-api';

export interface IAvatarAddition {
    dispose(): void;
    update(sprite: IRoomObjectSprite, scale: number): void;
    animate(sprite: IRoomObjectSprite): boolean;
    id: number;
}
