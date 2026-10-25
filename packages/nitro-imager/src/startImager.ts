import { serve } from '@hono/node-server';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';

import { AVATAR_FRAME_MS, AvatarImager } from './avatar/AvatarImager';
import { GroupBadgeImager } from './badge/GroupBadgeImager';
import { DEFAULT_BADGE_PARTS, readImagerConfig } from './config';
import { setRendererConfig } from './environment/installNodeEnvironment';
import { FurnitureImager } from './furniture/FurnitureImager';
import { createApp } from './http/createApp';
import { ImageCache } from './http/ImageCache';
import { PetImager } from './pet/PetImager';
import { ROOM_OBJECT_FRAME_MS } from './room/drawRoomObject';

/** How often, in seconds, the furniture and pet libraries nothing has drawn with for a while are released. */
const ROOM_CONTENT_PURGE_SECONDS = 60;

/** Reads the configuration, loads what each imager draws from, and serves them. */
export const startImager = async (env: NodeJS.ProcessEnv): Promise<void> => {
    const config = readImagerConfig(env);
    const hasPets = !!config.pet.bundleUrl;
    const hasFurniture = !!(config.furniture.bundleUrl && config.furniture.dataUrl);

    // The renderer reads its few config values (`asset.bundles.templates` ...) as the client gives them.
    setRendererConfig({
        'asset.bundles.templates': config.avatar.templatesUrl,
        'asset.bundles.avatar': config.avatar.figureBundleUrl,
        'asset.bundles.effects': config.avatar.effectBundleUrl,
        'asset.bundles.pets': config.pet.bundleUrl,
        'asset.bundles.furni': config.furniture.bundleUrl,
        'renderer.petTypes': config.pet.types,
    });

    const startedAt = performance.now();
    const [ avatars, badges ] = await Promise.all([
        AvatarImager.create(config.avatar, config),
        GroupBadgeImager.create(config.badge, DEFAULT_BADGE_PARTS),
        // Reads `renderer.petTypes`. The room's own libraries it would also load have no address here, so that is all it does.
        (hasPets || hasFurniture) ? GetRoomContentLoader().init() : undefined,
    ]);
    const pets = hasPets ? new PetImager(config.pet.types) : undefined;
    const furniture = hasFurniture ? await FurnitureImager.create(config.furniture.dataUrl, config.furniture.dataRefreshSeconds, ROOM_CONTENT_PURGE_SECONDS) : undefined;

    console.log([
        `Avatar data and ${badges.table.partCount} badge parts (${badges.table.colorCount} colours)`,
        pets ? `, ${pets.types.length} pet types` : '',
        furniture ? `, ${furniture.itemCount.floor} floor and ${furniture.itemCount.wall} wall items` : '',
        ` loaded in ${Math.round(performance.now() - startedAt)} ms`,
    ].join(''));

    const app = createApp({ avatars, badges, pets, furniture, cache: new ImageCache(config.cacheBytes), avatarFrameDelay: AVATAR_FRAME_MS, roomObjectFrameDelay: ROOM_OBJECT_FRAME_MS });

    serve({ fetch: app.fetch, hostname: config.host, port: config.port }, info => console.log(`Imager listening on http://${info.address}:${info.port}`));
};
