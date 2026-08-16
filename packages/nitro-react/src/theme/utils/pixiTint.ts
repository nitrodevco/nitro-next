import { GetAssetManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Container, Graphics, Sprite } from 'pixi.js';

const cache = new Map<string, Promise<string | undefined>>();

export function tintImage(url: string, tintColor: string | undefined = undefined, blend: number = 0): Promise<string | undefined> {
    const key = `${url}::${tintColor}::${blend}`;
    const cached = cache.get(key);

    if (cached) return cached;

    const promise = (async () => {
        let texture = GetAssetManager().getTexture(key);

        if (!texture) {
            await GetAssetManager().downloadAsset(url);

            texture = GetAssetManager().getTexture(url);
        }

        if (!texture) return undefined;

        const container = new Container();

        const sprite = new Sprite(texture);

        if (tintColor) sprite.tint = tintColor;

        container.addChild(sprite);

        if (blend > 0) container.addChild(new Graphics().rect(0, 0, texture.width, texture.height).fill({ color: 0xFFFFFF, alpha: blend }));

        try {
            return await TextureUtils.generateImageUrl({ target: container, resolution: 1 });
        } finally {
            sprite.destroy({ children: true });
        }
    })();

    cache.set(key, promise);

    return promise;
}
