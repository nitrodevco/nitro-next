import type { IRoomObjectSprite } from './IRoomObjectSprite';

export interface ISortableSprite {
    dispose(): void;
    name: string;
    sprite: IRoomObjectSprite;
    x: number;
    y: number;
    z: number;
}
