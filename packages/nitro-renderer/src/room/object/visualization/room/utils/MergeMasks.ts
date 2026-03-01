import type { PointData, Renderer, Texture } from 'pixi.js';
import { Container, Graphics, RenderTexture, Sprite } from 'pixi.js';

export interface MaskEntry {
    texture: Texture;
    position?: PointData;
    scale?: PointData;
    rotation?: number;
}

export const MergeMasks = (
    renderer: Renderer,
    width: number,
    height: number,
    masks: MaskEntry[],
    existing?: RenderTexture,
): RenderTexture => {
    const rt = existing ?? RenderTexture.create({ width, height, antialias: true });

    if (existing) {
        rt.resize(width, height);
    }

    const root = new Container();
    const bg = new Graphics().rect(0, 0, width, height).fill(0xffffff);

    root.addChild(bg);

    for (const entry of masks) {
        const sprite = new Sprite(entry.texture);

        sprite.blendMode = 'erase';

        if (entry.position) {
            sprite.position.set(entry.position.x, entry.position.y);
        }

        if (entry.scale) {
            sprite.scale.set(entry.scale.x, entry.scale.y);
        }

        if (entry.rotation !== undefined) {
            sprite.rotation = entry.rotation;
        }

        root.addChild(sprite);
    }

    renderer.render({ container: root, target: rt, clear: true });
    root.destroy({ children: true });

    return rt;
};
