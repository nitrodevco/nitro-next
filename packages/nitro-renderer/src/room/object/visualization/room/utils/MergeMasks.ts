import type { PointData } from 'pixi.js';
import type { Texture } from 'pixi.js';
import { Container } from 'pixi.js';
import { Sprite } from 'pixi.js';


export interface MaskEntry {
    texture: Texture;
    position?: PointData;
    scale?: PointData;
    rotation?: number;
}

export const MergeMasks = (
    masks: MaskEntry[],
): Container => {
    const container = new Container();

    for (const entry of masks) {
        const sprite = new Sprite(entry.texture);

        sprite.blendMode = 'erase';

        if (entry.position) sprite.position.set(entry.position.x, entry.position.y);

        if (entry.scale) sprite.scale.set(entry.scale.x, entry.scale.y);

        if (entry.rotation !== undefined) sprite.rotation = entry.rotation;

        container.addChild(sprite);
    }

    return container;
};
