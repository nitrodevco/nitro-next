import type { Texture } from 'pixi.js';

import { useTextureFromUrl } from './usePixiTexture';

/**
 * Discrete-PNG icon registry mirroring theme/icons.css (one image per icon, as opposed
 * to the habbo-icons.css spritesheet). Only entries actually used by a migrated view are
 * listed here - add more as views migrate, following theme/icons.css as the source of truth.
 */
const ICON_ASSETS = {
    'icon-hc-small': { url: '/assets/flash/purse/hc.png', width: 15, height: 16 },
    'icon-earnings-small': { url: '/assets/flash/purse/earnings.png', width: 15, height: 15 },
    'icon-disconnect': { url: '/assets/flash/purse/disconnect.png', width: 13, height: 11 },
    'icon-settings': { url: '/assets/flash/purse/settings.png', width: 12, height: 12 },
} as const satisfies Record<string, { url: string, width: number, height: number }>;

export type IconKey = keyof typeof ICON_ASSETS;

export const useIconTexture = (icon: IconKey): { texture: Texture | undefined, width: number, height: number } => {
    const asset = ICON_ASSETS[icon];
    const texture = useTextureFromUrl(asset.url);

    return { texture, width: asset.width, height: asset.height };
};
