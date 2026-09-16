import { NitroLogger, RoomObjectBadgeAssetEvent } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomContentLoader, ObjectGroupBadgeUpdateMessage } from '@nitrodevco/nitro-renderer';
import { RenderTexture, Sprite, Texture } from 'pixi.js';

import { useConfigValue, useRoomSelector } from '#base/context';
import { loadTexture } from '#base/theme';

/**
 * The asset name a badge is registered under, and what the badge visualizations look for once
 * the logic has written it onto the model. The zoomed-out layer asks for the same name with
 * `_32` appended, which is the half-size copy made below.
 */
const badgeAssetName = (badgeId: string, groupBadge: boolean) => `badge_${groupBadge ? 'group_' : ''}${badgeId}`;

/** Textures already fetched, by url, so a room full of the same guild furni fetches once. */
const badgeTextures = new Map<string, Promise<Texture | undefined>>();

/**
 * A furni can exist before its own asset bundle has finished downloading, and a badge can only
 * be registered on a collection that is already there - `addAssetToCollection` quietly returns
 * nothing otherwise. The badge is asked for once, when the furni's data arrives, so a miss here
 * would be permanent; these are the few attempts it gets while the bundle lands.
 */
const COLLECTION_RETRIES = 4;
const COLLECTION_RETRY_DELAY = 500;

/**
 * The half-size copy the zoomed-out layer draws. Flash kept a separate small bitmap per badge
 * (`getBadgeSmallImage`); here the full-size one is redrawn at half scale, which is the same
 * thing and saves a second download.
 */
const createSmallTexture = (texture: Texture): Texture | undefined => {
    try {
        const small = RenderTexture.create({
            width: Math.max(1, Math.round(texture.width / 2)),
            height: Math.max(1, Math.round(texture.height / 2)),
        });
        const sprite = new Sprite(texture);

        sprite.scale.set(0.5);

        GetRenderer().render({ container: sprite, target: small });
        sprite.destroy();

        return small;
    } catch {
        // Without it the badge simply does not draw while zoomed out, which beats a broken room.
        return undefined;
    }
};

/**
 * Badges on furniture - a badge display, a guild-customised sofa - are not part of the furni's
 * own asset bundle: the logic asks for one by code and something has to fetch it, register it
 * on the furni's asset collection and tell the logic what it ended up being called. That is all
 * this does, and it is what `RoomEngine.requestBadgeImageAsset` did.
 *
 * The furni is told twice, as Flash told it: once with `loading_icon` so the visualization has
 * something to hold while the download runs, and again with the real asset name once it is in
 * the collection. The logic ignores the first of those, which is why that name is not
 * registered anywhere.
 */
export const useRoomBadgeAssetHandler = () => {
    const room = useRoomSelector();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';

    const handleBadgeAssetEvent = (event: RoomObjectBadgeAssetEvent) => {
        if (!room || (event.type !== RoomObjectBadgeAssetEvent.LOAD_BADGE)) return;

        const category = room.getRoomObjectCategoryForType(event.objectType);
        const roomObject = room.getRoomObject(event.objectId, category);

        if (!roomObject) return;

        const template = event.groupBadge ? groupBadgeUrl : badgeUrl;

        if (!template.length) {
            NitroLogger.warn('RoomBadgeAsset', `No ${event.groupBadge ? 'badge.asset.group.url' : 'badge.asset.url'} configured; ${event.badgeId} cannot be loaded`);

            return;
        }

        const assetName = badgeAssetName(event.badgeId, event.groupBadge);
        const collection = roomObject.type;
        const contentLoader = GetRoomContentLoader();

        const apply = (texture: Texture, retriesLeft: number) => {
            // The furni may well have gone by the time the badge arrives.
            if (!room.getRoomObject(event.objectId, category)) return;

            if (!contentLoader.addAssetToCollection(collection, assetName, texture)) {
                if (retriesLeft <= 0) {
                    NitroLogger.error('RoomBadgeAsset', `No asset collection for ${collection}; badge ${event.badgeId} was dropped`);

                    return;
                }

                setTimeout(() => apply(texture, retriesLeft - 1), COLLECTION_RETRY_DELAY);

                return;
            }

            const small = createSmallTexture(texture);

            if (small) contentLoader.addAssetToCollection(collection, `${assetName}_32`, small);

            roomObject.logic?.processUpdateMessage(new ObjectGroupBadgeUpdateMessage(event.badgeId, assetName));
        };

        const url = template
            .replace('%badgename%', event.badgeId)
            .replace('%badgedata%', event.badgeId);

        let pending = badgeTextures.get(url);

        if (!pending) {
            pending = loadTexture(url);

            badgeTextures.set(url, pending);
        }

        // Something to show while the download runs; the logic knows to ignore it.
        roomObject.logic?.processUpdateMessage(new ObjectGroupBadgeUpdateMessage(event.badgeId, 'loading_icon'));

        void pending.then((texture) => {
            if (!texture) {
                badgeTextures.delete(url);
                NitroLogger.error('RoomBadgeAsset', `Could not load badge ${event.badgeId} from ${url}`);

                return;
            }

            apply(texture, COLLECTION_RETRIES);
        });
    };

    return { handleBadgeAssetEvent };
};
