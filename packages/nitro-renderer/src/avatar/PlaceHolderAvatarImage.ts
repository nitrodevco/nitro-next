import { AvatarActionStateType } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { TexturePool } from '#renderer/utils';

import { AvatarImage, AvatarImageCachedFullImage } from './AvatarImage';

/**
 * The grey stand-in drawn while a figure's libraries download. Every placeholder shares one
 * full-image cache (they all render the same figure) and only honours the restricted action
 * set.
 */
export class PlaceHolderAvatarImage extends AvatarImage {
    private static _sharedFullImageCache: Map<string, AvatarImageCachedFullImage> = new Map();

    public override isPlaceholder(): boolean {
        return true;
    }

    public override appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number | string)[]): boolean {
        return this.appendRestrictedAction(action, _args);
    }

    protected override getFullImage(key: string): AvatarImageCachedFullImage | undefined {
        return PlaceHolderAvatarImage._sharedFullImageCache.get(key);
    }

    protected override cacheFullImage(key: string, texture: RenderTexture, topCropY: number): void {
        const existing = PlaceHolderAvatarImage._sharedFullImageCache.get(key);

        if (existing) {
            PlaceHolderAvatarImage._sharedFullImageCache.delete(key);

            TexturePool.releaseTexture(existing.texture);
        }

        PlaceHolderAvatarImage._sharedFullImageCache.set(key, { texture, topCropY });
    }

    // the cache outlives any one placeholder
    protected override disposeFullImageCache(): void {
    }
}
