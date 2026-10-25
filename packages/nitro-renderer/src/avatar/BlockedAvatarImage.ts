import { AvatarActionStateType } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { TexturePool } from '#renderer/utils';

import { AvatarImage, AvatarImageCachedFullImage } from './AvatarImage';

/** The generic figure drawn for an ignored user: the placeholder's rules, with its own shared full-image cache. */
export class BlockedAvatarImage extends AvatarImage {
    private static _sharedFullImageCache: Map<string, AvatarImageCachedFullImage> = new Map();

    public override isBlocked(): boolean {
        return true;
    }

    public override appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number | string)[]): boolean {
        return this.appendRestrictedAction(action, _args);
    }

    protected override getFullImage(key: string): AvatarImageCachedFullImage | undefined {
        return BlockedAvatarImage._sharedFullImageCache.get(key);
    }

    protected override cacheFullImage(key: string, texture: RenderTexture, topCropY: number): void {
        const existing = BlockedAvatarImage._sharedFullImageCache.get(key);

        if (existing) {
            BlockedAvatarImage._sharedFullImageCache.delete(key);

            TexturePool.releaseTexture(existing.texture);
        }

        BlockedAvatarImage._sharedFullImageCache.set(key, { texture, topCropY });
    }

    protected override disposeFullImageCache(): void {
    }
}
