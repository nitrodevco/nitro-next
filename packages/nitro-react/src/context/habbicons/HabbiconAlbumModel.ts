/**
 * The hub's view model - Flash `HabbiconAlbumModel`, `HabbiconAlbumStats`, `HabbiconSetModel` and
 * `HabbiconEntryModel`, and `HabbiconView.buildAlbumFromController`, which builds them from the
 * controller's shop collections every time the hub refreshes.
 *
 * Which habbicons the user has is read from the shop data's own `state` (the controller keeps it
 * in step with `UserHabbiconStatusChanged`), not from the owned list.
 *
 * Left out of the entry: `description` (two fixed English sentences), `color` (`seededColor`) and
 * `§_-c1e§` (the slot index) - `buildAlbumFromController` fills them, but no view reads them.
 */
import type { IHabbiconShopCollection, IHabbiconShopItem } from '@nitrodevco/nitro-packets';
import type { Texture } from 'pixi.js';

import { HabbiconState } from './HabbiconState';

export interface HabbiconEntryModel {
    /** The habbicon id, `reward_<id>` for a set's reward. */
    id: string;
    habbiconId: number;
    collectionId: number;
    collectionName: string;
    collectionTitle: string;
    name: string;
    state: number;
    owned: boolean;
    favorite: boolean;
    claimable: boolean;
    purchasable: boolean;
    isReward: boolean;
    priceCredits: number;
    priceActivityPoints: number;
    activityPointType: number;
}

export interface HabbiconSetModel {
    /** `collection_<collectionId>`; the favourites tray's single group is `favourited`. */
    id: string;
    collectionId: number;
    name: string;
    title: string;
    description: string;
    /** `_bitmapData`: the collection icon of `collection_icons_spritesheet.png`. */
    icon: Texture | undefined;
    habbicons: HabbiconEntryModel[];
    rewardHabbicon: HabbiconEntryModel | undefined;
    completed: number;
    total: number;
    priceCredits: number;
    priceActivityPoints: number;
    activityPointType: number;
    canBuy: boolean;
}

export interface HabbiconAlbumStats {
    ownedHabbicons: number;
    completedSets: number;
    collected: number;
    total: number;
}

export interface HabbiconAlbumModel {
    sets: HabbiconSetModel[];
    /** `§_-B9§`: the owned tab's groups, one per set with owned habbicons. */
    ownedGroups: HabbiconSetModel[];
    favouriteGroups: HabbiconSetModel[];
    stats: HabbiconAlbumStats;
}

/** What the builder needs besides the shop data: the asset manager's name keys and icons, and the localization. */
export interface HabbiconAlbumSources {
    /** `HabbiconAssetManager.getHabbiconNameKey`. */
    nameKeys: Record<number, string>;
    /** `HabbiconAssetManager.getCollectionIconBitmap`. */
    collectionIcons: Record<number, Texture>;
    /** `getLocalization(key, fallback)`. */
    localize: (key: string, fallback: string) => string;
}

/** `HabbiconSetModel.complete`. */
export const isHabbiconSetComplete = (set: HabbiconSetModel): boolean => (set.total > 0) && (set.completed >= set.total);

/** `HabbiconSetModel.progressRatio`. */
export const getHabbiconSetProgressRatio = (set: HabbiconSetModel): number => ((set.total <= 0) ? 0 : Math.max(0, Math.min(1, set.completed / set.total)));

/** `HabbiconAlbumStats.progressRatio`. */
export const getHabbiconAlbumProgressRatio = (stats: HabbiconAlbumStats): number => ((stats.total <= 0) ? 0 : Math.max(0, Math.min(1, stats.collected / stats.total)));

/** `HabbiconAlbumModel.findSetByCollectionId`. */
export const findHabbiconSetByCollectionId = (album: HabbiconAlbumModel, collectionId: number): HabbiconSetModel | undefined => album.sets.find(set => set.collectionId === collectionId);

/** `HabbiconAlbumModel.findEntryByHabbiconId`: a set's own habbicons first, then its reward. */
export const findHabbiconEntryByHabbiconId = (album: HabbiconAlbumModel, habbiconId: number): HabbiconEntryModel | undefined => {
    for (const set of album.sets) {
        const entry = set.habbicons.find(habbicon => habbicon.habbiconId === habbiconId);

        if (entry) return entry;
        if (set.rewardHabbicon?.habbiconId === habbiconId) return set.rewardHabbicon;
    }

    return undefined;
};

/** `HabbiconView.hasHabbiconPrice`. */
export const hasHabbiconPrice = (entry: HabbiconEntryModel | undefined): boolean => !!entry && ((entry.priceCredits > 0) || (entry.priceActivityPoints > 0));

/** `HabbiconView.formatPrice` (and the popup's, the reward panel's and the confirmation's `formatPriceAmount`). */
export const formatHabbiconPrice = (credits: number, activityPoints: number): string => {
    if ((credits > 0) && (activityPoints > 0)) return `${credits}c + ${activityPoints}`;
    if (credits > 0) return credits.toString();

    return Math.max(0, activityPoints).toString();
};

/** `§_-u1R§.CREDITS`: the currency type `getPriceIconStyle` asks for when a price has no activity points. */
export const HABBICON_PRICE_CREDITS = 7;

/** `getPriceIconStyle`: the activity point icon when the price has activity points, else credits. */
export const getHabbiconPriceCurrency = (activityPoints: number, activityPointType: number): number => ((activityPoints > 0) ? activityPointType : HABBICON_PRICE_CREDITS);

const localizeOr = (sources: HabbiconAlbumSources, key: string, fallback: string): string => {
    const value = sources.localize(key, fallback);

    return (value && value.length) ? value : fallback;
};

/** `resolveCollectionTitle`. */
const resolveCollectionTitle = (sources: HabbiconAlbumSources, collection: IHabbiconShopCollection): string => (collection.name?.length
    ? localizeOr(sources, `habbicon_collection_${collection.name.toLowerCase()}_name`, collection.name)
    : 'Habbicon Collection');

/** `resolveCollectionDescription`. */
const resolveCollectionDescription = (sources: HabbiconAlbumSources, collection: IHabbiconShopCollection): string => (collection.name?.length
    ? localizeOr(sources, `habbicon_collection_${collection.name.toLowerCase()}_description`, `${collection.name} set description`)
    : '');

/** `HabbiconView.resolveHabbiconDisplayName`: the asset manager's name key, else the server's name. */
export const resolveHabbiconDisplayName = (sources: HabbiconAlbumSources, habbiconId: number, name: string | null = null): string => {
    const nameKey = sources.nameKeys[habbiconId];
    const key = (nameKey && nameKey.length) ? nameKey : (name ?? '');

    if (!key.length) return 'Habbicon';

    return localizeOr(sources, `habbicon_${key.toLowerCase()}_name`, (name && name.length) ? name : 'Habbicon');
};

/** `createEntryFromData`. */
const createEntry = (sources: HabbiconAlbumSources, item: IHabbiconShopItem, set: HabbiconSetModel): HabbiconEntryModel => {
    const favorite = (item.state === HabbiconState.FAVORITE);
    const entry: HabbiconEntryModel = {
        id: String(item.habbiconId),
        habbiconId: item.habbiconId,
        collectionId: item.collectionId,
        collectionName: set.name,
        collectionTitle: set.title,
        name: resolveHabbiconDisplayName(sources, item.habbiconId, item.name),
        state: item.state,
        favorite,
        owned: favorite || (item.state === HabbiconState.OWNED),
        claimable: (item.state === HabbiconState.CLAIMABLE),
        isReward: false,
        priceCredits: item.priceCredits,
        priceActivityPoints: item.priceActivityPoints,
        activityPointType: item.activityPointType,
        purchasable: false,
    };

    entry.purchasable = (entry.state === HabbiconState.NOT_OWNED) && hasHabbiconPrice(entry);

    return entry;
};

/** `createRewardEntry`: none when the set rewards nothing. */
const createRewardEntry = (sources: HabbiconAlbumSources, collection: IHabbiconShopCollection, set: HabbiconSetModel): HabbiconEntryModel | undefined => {
    if (collection.rewardHabbiconId <= 0) return undefined;

    const state = collection.rewardState;
    const favorite = (state === HabbiconState.FAVORITE);

    return {
        id: `reward_${collection.rewardHabbiconId}`,
        habbiconId: collection.rewardHabbiconId,
        collectionId: collection.collectionId,
        collectionName: set.name,
        collectionTitle: set.title,
        name: resolveHabbiconDisplayName(sources, collection.rewardHabbiconId),
        state,
        favorite,
        owned: favorite || (state === HabbiconState.OWNED),
        claimable: (state === HabbiconState.CLAIMABLE),
        purchasable: false,
        isReward: true,
        priceCredits: 0,
        priceActivityPoints: 0,
        activityPointType: collection.activityPointType,
    };
};

/** `updateSetProgress`: every non-reward habbicon counts, an owned or claimable one as collected. */
const updateSetProgress = (set: HabbiconSetModel) => {
    set.completed = 0;
    set.total = 0;

    for (const habbicon of set.habbicons) {
        if (habbicon.isReward) continue;

        set.total++;

        if (habbicon.owned || habbicon.claimable) set.completed++;
    }
};

/** `updateAlbumStats`: a set's reward counts towards the album's total, and towards collected once owned. */
const createAlbumStats = (sets: HabbiconSetModel[]): HabbiconAlbumStats => {
    const stats: HabbiconAlbumStats = { ownedHabbicons: 0, completedSets: 0, collected: 0, total: 0 };

    for (const set of sets) {
        stats.total += set.total;
        stats.collected += set.completed;

        if (isHabbiconSetComplete(set)) stats.completedSets++;

        for (const habbicon of set.habbicons) {
            if (habbicon.owned) stats.ownedHabbicons++;
        }

        if (set.rewardHabbicon) {
            stats.total++;

            if (set.rewardHabbicon.owned) {
                stats.collected++;
                stats.ownedHabbicons++;
            }
        }
    }

    return stats;
};

/** `createTrayGroup`: a copy of the set holding only `habbicons`, with no reward of its own. */
const createTrayGroup = (set: HabbiconSetModel, habbicons: HabbiconEntryModel[]): HabbiconSetModel => ({ ...set, habbicons, rewardHabbicon: undefined });

/** `createTrayGroups(album, false)`: per set, its owned habbicons and its reward when owned. */
const createOwnedGroups = (sets: HabbiconSetModel[]): HabbiconSetModel[] => {
    const groups: HabbiconSetModel[] = [];

    for (const set of sets) {
        const habbicons = set.habbicons.filter(habbicon => habbicon.owned);

        if (set.rewardHabbicon?.owned) habbicons.push(set.rewardHabbicon);
        if (habbicons.length > 0) groups.push(createTrayGroup(set, habbicons));
    }

    return groups;
};

/** `createFavouriteTrayGroups`: every favourite of every set in one `${habbicons.favourites.title}` group. */
const createFavouriteGroups = (sets: HabbiconSetModel[]): HabbiconSetModel[] => {
    const habbicons: HabbiconEntryModel[] = [];

    for (const set of sets) {
        habbicons.push(...set.habbicons.filter(habbicon => habbicon.favorite));

        if (set.rewardHabbicon?.favorite) habbicons.push(set.rewardHabbicon);
    }

    if (!habbicons.length) return [];

    return [ {
        id: 'favourited',
        collectionId: 0,
        name: 'favourited',
        title: '${habbicons.favourites.title}',
        description: '',
        icon: undefined,
        habbicons,
        rewardHabbicon: undefined,
        completed: 0,
        total: 0,
        priceCredits: 0,
        priceActivityPoints: 0,
        activityPointType: 0,
        canBuy: false,
    } ];
};

/** `HabbiconView.buildAlbumFromController`. */
export const buildHabbiconAlbum = (collections: IHabbiconShopCollection[], sources: HabbiconAlbumSources): HabbiconAlbumModel => {
    const sets: HabbiconSetModel[] = [];

    for (const collection of collections) {
        const set: HabbiconSetModel = {
            id: `collection_${collection.collectionId}`,
            collectionId: collection.collectionId,
            name: collection.name,
            title: resolveCollectionTitle(sources, collection),
            description: resolveCollectionDescription(sources, collection),
            icon: sources.collectionIcons[collection.collectionId],
            habbicons: [],
            rewardHabbicon: undefined,
            completed: 0,
            total: 0,
            priceCredits: collection.priceCredits,
            priceActivityPoints: collection.priceActivityPoints,
            activityPointType: collection.activityPointType,
            canBuy: ((collection.priceCredits > 0) || (collection.priceActivityPoints > 0)) && !collection.completed,
        };

        for (const item of collection.habbicons) set.habbicons.push(createEntry(sources, item, set));

        set.rewardHabbicon = createRewardEntry(sources, collection, set);

        updateSetProgress(set);
        sets.push(set);
    }

    return {
        sets,
        ownedGroups: createOwnedGroups(sets),
        favouriteGroups: createFavouriteGroups(sets),
        stats: createAlbumStats(sets),
    };
};
