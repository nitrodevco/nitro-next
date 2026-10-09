import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { LayoutImage, useTextureFromUrl } from '#base/theme';

type ChatHistoryAsset = 'tray_bar' | 'tray_handle_open' | 'tray_handle_close' | 'room_change' | 'scrollbar_back' | 'scrollbar_thumb';

/**
 * The bitmaps of the free flow chat library the history tray draws (`tray_bar`, `room_change`,
 * `scrollbar_thumb` ...). The library's published bundle carries only the chat styles' art, so they
 * are ours, under `public/assets/chat-history/` - by the name `build-asset-bundles.ts` packs them under
 * (`chat-history-tray_bar`) once it has, and until then as the loose file.
 */
export const useChatHistoryTexture = (name: ChatHistoryAsset): Texture | undefined => {
    const bundled = GetAssetManager().getTexture(LayoutImage(`chat-history/${name}.png`)) ?? undefined;
    const loose = useTextureFromUrl(bundled ? undefined : `/assets/chat-history/${name}.png`);

    return bundled ?? loose;
};
