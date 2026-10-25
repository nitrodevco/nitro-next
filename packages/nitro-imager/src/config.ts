/** The imager's configuration: the `IMAGER_*` variables of `.env.example`, read and checked at start-up. */
import { fileURLToPath } from 'node:url';

import { AddressError, AddressKind, resolveAddress } from './address';

/** Everything the imager is told, from its environment (`.env` beside the package, then the process's). */
export interface ImagerConfig {
    host: string;
    port: number;
    /** How many encoded images, in bytes, the response cache keeps before dropping the least recently used. */
    cacheBytes: number;
    /**
     * How many avatar asset libraries may be loaded before the ones no avatar is drawing with are
     * unloaded: each figure asked for loads its clothing's, and they would otherwise stay for good.
     */
    maxLoadedLibraries: number;
    /** Every address is a url, or a path on this server (`resolveAddress`), and is held as the url it is loaded from. */
    avatar: {
        /** `asset.bundles.templates`: the `habbo-avatar-render-lib` bundle - geometry, part sets, actions, animations. */
        templatesUrl: string;
        /** `asset.bundles.avatar`, `%libname%` the figure library. */
        figureBundleUrl: string;
        /** `asset.bundles.effects`, `%libname%` the effect library. Empty: effects are not drawn. */
        effectBundleUrl: string;
        figureMapUrl: string;
        figureDataUrl: string;
        /** Empty: effects are not drawn. */
        effectMapUrl: string;
    };
    pet: {
        /** `asset.bundles.pets`, `%libname%` the pet type's library. Empty: pets are not drawn. */
        bundleUrl: string;
        /** `renderer.petTypes`: each pet type's library name, at the index the hotel numbers the type by. */
        types: string[];
    };
    furniture: {
        /** `asset.bundles.furni`, `%libname%` the furniture's library. Empty, or no furnidata: furniture is not drawn. */
        bundleUrl: string;
        /** `furnituredata.url`: the hotel's furnidata (Turbo's `/gamedata/furnidata_json/0`), or a file. */
        dataUrl: string;
        /** How often, in seconds, furnidata read from a url is read again, so new furniture is drawn; 0 never. */
        dataRefreshSeconds: number;
    };
    badge: {
        /** `image.library.badgepart.url`: where `badgepart_<file>.png` is found. */
        partImageUrl: string;
        /**
         * The part and colour table a badge code is read with: Turbo's `/gamedata/badgeparts_json/0`,
         * or a file. Defaults to the copy the package ships.
         */
        partsSource: string;
        /** How often, in seconds, a table read from a url is read again, so a recoloured palette reaches new badges. */
        partsRefreshSeconds: number;
    };
}

/**
 * The client's `renderer.petTypes`, as the hotel's client configuration has them: a pet's type is
 * its index here (`gnome` is in it twice, as types 26 and 27).
 */
export const DEFAULT_PET_TYPES = [
    'dog', 'cat', 'croco', 'terrier', 'bear', 'pig', 'lion', 'rhino', 'spider', 'turtle', 'chicken', 'frog', 'dragon',
    'monster', 'monkey', 'horse', 'monsterplant', 'bunnyeaster', 'bunnyevil', 'bunnydepressed', 'bunnylove', 'pigeongood',
    'pigeonevil', 'demonmonkey', 'bearbaby', 'terrierbaby', 'gnome', 'gnome', 'kittenbaby', 'puppybaby', 'pigletbaby',
    'haloompa', 'fools', 'pterosaur', 'velociraptor', 'cow', 'dragondog',
];

/** The table the package ships: the parts and colours the hotel's badge codes are built from. */
export const DEFAULT_BADGE_PARTS = fileURLToPath(new URL('../data/badge-parts.json', import.meta.url));

const MEGABYTE = 1024 * 1024;

/**
 * Reads the configuration out of `env`. A url the imager cannot work without is an error here,
 * at start-up, rather than a broken image on the first request.
 */
export const readImagerConfig = (env: NodeJS.ProcessEnv): ImagerConfig => {
    const missing: string[] = [];
    const required = (key: string): string => {
        const value = env[key]?.trim();

        if (!value) missing.push(key);

        return value ?? '';
    };
    const optional = (key: string, fallback: string = ''): string => env[key]?.trim() || fallback;
    const address = (value: string, kind: AddressKind): string => {
        if (!value) return value;

        try {
            return resolveAddress(value, kind);
        } catch (err) {
            if (!(err instanceof AddressError)) throw err;

            missing.push(err.message);

            return '';
        }
    };

    const config: ImagerConfig = {
        host: optional('IMAGER_HOST', '127.0.0.1'),
        port: readInteger(optional('IMAGER_PORT'), 3030),
        cacheBytes: readInteger(optional('IMAGER_CACHE_MB'), 64) * MEGABYTE,
        maxLoadedLibraries: readInteger(optional('IMAGER_MAX_LIBRARIES'), 300),
        avatar: {
            templatesUrl: address(required('IMAGER_TEMPLATES_URL'), 'bundle'),
            figureBundleUrl: address(required('IMAGER_FIGURE_BUNDLE_URL'), 'bundle'),
            effectBundleUrl: address(optional('IMAGER_EFFECT_BUNDLE_URL'), 'bundle'),
            figureMapUrl: address(required('IMAGER_FIGUREMAP_URL'), 'file'),
            figureDataUrl: address(required('IMAGER_FIGUREDATA_URL'), 'file'),
            effectMapUrl: address(optional('IMAGER_EFFECTMAP_URL'), 'file'),
        },
        pet: {
            bundleUrl: address(optional('IMAGER_PET_BUNDLE_URL'), 'bundle'),
            types: optional('IMAGER_PET_TYPES') ? optional('IMAGER_PET_TYPES').split(',').map(type => type.trim().toLowerCase()) : DEFAULT_PET_TYPES,
        },
        furniture: {
            bundleUrl: address(optional('IMAGER_FURNITURE_BUNDLE_URL'), 'bundle'),
            dataUrl: address(optional('IMAGER_FURNIDATA_URL'), 'file'),
            dataRefreshSeconds: readInteger(optional('IMAGER_FURNIDATA_REFRESH_SECONDS'), 600),
        },
        badge: {
            partImageUrl: address(required('IMAGER_BADGE_PART_URL'), 'folder'),
            partsSource: optional('IMAGER_BADGE_PARTS', DEFAULT_BADGE_PARTS),
            partsRefreshSeconds: readInteger(optional('IMAGER_BADGE_PARTS_REFRESH_SECONDS'), 300),
        },
    };

    if (missing.length) throw new Error(`The imager needs ${missing.join('; ')} (see .env.example)`);

    return config;
};

const readInteger = (value: string, fallback: number): number => {
    const parsed = Number(value);

    return (value && Number.isInteger(parsed) && (parsed >= 0)) ? parsed : fallback;
};
