/**
 * The furnidata - Flash's `SessionDataManager` furniture data (`FurnitureDataParser`): the file at
 * `furnituredata.url` parsed into the system store's floor and wall items, whose names go into the
 * texts (`setLocalizationForFurniture`) and whose types go to the renderer's content loader
 * (`processFurnitureData`).
 *
 * It is loaded once at boot (`useFurnitureDataLoader`, which the loading screen waits on) and
 * again whenever the server says it changed: `CatalogPublishedMessage` carries the new file's hash
 * after a publish that moved any item's offers, as `HabboCatalog.onCatalogPublished` hands it to
 * the session's furniture data (`registerFurnitureDataHandlers`).
 *
 * A file already loaded or loading is not asked for again, and when a newer one is asked for while
 * one loads, the newer one wins.
 */
import { IFurnitureData, NitroLogger } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';

import { configString, systemStore } from '#base/context/system';

const HASH_SEGMENT = /\/(0|[0-9a-f]{40})$/i;

/**
 * `furnituredata.url` for the build of this hash: the last segment of a hash-addressed url
 * (`/gamedata/furnidata_json/0` or `/<sha1>`) is replaced, any other url is asked again with the
 * hash as a query, so a cached copy is not taken for the new one.
 */
export const furnitureDataUrlForHash = (url: string, hash: string): string => {
    const [ path, query ] = url.split('?', 2);

    if (HASH_SEGMENT.test(path)) return path.replace(HASH_SEGMENT, `/${encodeURIComponent(hash)}`) + (query ? `?${query}` : '');

    return `${url}${query === undefined ? '?' : '&'}hash=${encodeURIComponent(hash)}`;
};

/** The file each request names: the configured one at boot (`''`), else a published hash. */
let loading: string | null = null;
let loaded: string | null = null;

/** The parsed items to the texts and the renderer - every item of each kind, as the store now holds them. */
const processFurnitureData = () => {
    const { floorItems, wallItems, setLocalizationForFurniture } = systemStore.getState();
    const kinds = [ Object.values(floorItems), Object.values(wallItems) ] as IFurnitureData[][];

    // One texts update for both kinds: each update copies the whole texts map (~54k keys + the names).
    setLocalizationForFurniture(kinds.flat());

    for (const items of kinds) {
        if (!items.length) continue;

        GetRoomContentLoader().processFurnitureData(items);
    }
};

/**
 * Loads the furnidata - the configured file, or the build of `hash` - and answers whether it is in
 * (also when it already was). False when there is no `furnituredata.url`, the file failed, or a
 * newer request took over.
 */
export const loadFurnitureData = async (hash: string = ''): Promise<boolean> => {
    const url = configString('furnituredata.url');

    if (!url.length) return false;
    if (hash === loaded) return true;
    if (hash === loading) return false;

    loading = hash;

    try {
        const response = await fetch(hash.length ? furnitureDataUrlForHash(url, hash) : url);

        if (response.status !== 200) throw new Error(`Furnidata ${hash || url} answered ${response.status}`);

        const data = await response.json();

        // A newer file was asked for while this one loaded: that one wins.
        if (loading !== hash) return false;

        const { parseFloorItems, parseWallItems } = systemStore.getState();

        parseFloorItems(data.roomitemtypes.furnitype);
        parseWallItems(data.wallitemtypes.furnitype);
        processFurnitureData();
        loaded = hash;

        return true;
    } catch (e) {
        NitroLogger.error(e);

        return false;
    } finally {
        if (loading === hash) loading = null;
    }
};
