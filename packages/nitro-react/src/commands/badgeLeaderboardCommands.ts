/**
 * `BadgeLeaderboardController` - the badge leaderboard (`badge_leaderboard/<type>/<rarity>/<page>`),
 * with its `BadgeLeaderboardDataServer`.
 *
 * - A board is a type - 0 total badges, 1 badges of one rarity, 2 achievement level - and, for type
 *   1, a rarity (`normalizeType` / `normalizeRarity`: an unsupported rarity falls back to type 0).
 *   The supported rarities are 2-6, with 1 (uncommon) first while `badge_rarity.uncommon` is on.
 * - The window shows pages of 10. The data server asks the server for chunks of 50 entries
 *   (`GetBadgeLeaderboard(type, rarity, chunk, 50)`), keeps them per board, serves a page from its
 *   chunk at once and asks again for a chunk older than a minute, and asks for the next chunk while
 *   the page is the last or the one before the last of its chunk. An answer of any other size is
 *   dropped.
 * - `showBadgeLeaderboard` clears what the window showed (`clearVisibleData`) before it asks, so a
 *   page whose chunk is not in yet shows no rows.
 */
import { getBadgeRarityLocalizationKey } from '@nitrodevco/nitro-api';
import type { BadgeLeaderboardResultMessageType, IBadgeLeaderboardEntryData } from '@nitrodevco/nitro-packets';
import { GetBadgeLeaderboardComposer } from '@nitrodevco/nitro-packets';

import { BadgeLeaderboardPageData, badgeLeaderboardStore } from '#base/context/badge-leaderboard';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { openProfile } from './roomUserCommands';

type Send = WebSocketConnection['send'];

/** `PAGE_SIZE`. */
export const BADGE_LEADERBOARD_PAGE_SIZE = 10;

/** `BadgeLeaderboardDataServer`'s chunk size, pages per chunk and age before a chunk is asked for again. */
const CHUNK_SIZE = 50;
const PAGES_PER_FETCH = 5;
const STALE_AFTER_MS = 60000;
/** `PREFETCH_BOUNDARY_DISTANCE`: the next chunk is asked for from this many pages before a chunk's end. */
const PREFETCH_BOUNDARY_DISTANCE = 1;

/** The board types. */
export const BADGE_LEADERBOARD_TYPE_TOTAL = 0;
export const BADGE_LEADERBOARD_TYPE_RARITY = 1;
export const BADGE_LEADERBOARD_TYPE_ACHIEVEMENT = 2;

/** `BASE_SUPPORTED_RARITIES`. */
const BASE_SUPPORTED_RARITIES = [ 2, 3, 4, 5, 6 ];

/** `getRankBorderColor`: gold, silver and bronze for the first three. */
const RANK_BORDER_COLORS = [ 13938487, 12632256, 13467442 ];
const DEFAULT_RANK_BORDER_COLOR = 6521514;

/** `getRarityAssetBase`, by rarity 1-6. */
const RARITY_ASSET_BASES = [ 'badge_rarity_badges_emblem_uncommon', 'badge_rarity_badges_emblem_rare', 'badge_rarity_badges_emblem_very_rare', 'badge_rarity_badges_emblem_mythical', 'badge_rarity_badges_emblem_legendary', 'badge_rarity_badges_emblem_unique' ];

/** `getInfoLocalizationKey`, by rarity 1-6. */
const RARITY_INFO_KEYS = [ 'uncommon', 'rare', 'epic', 'mythical', 'legendary', 'unique' ];

/** `getFrameStyle`'s rarity styles, by rarity 1-6. */
const RARITY_FRAME_STYLES = [ 10007, 10002, 10003, 10004, 10005, 10006 ];

const config = () => systemStore.getState().config;
const t = (key: string, params?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, '', params);

/** `isUncommonBadgeRarityEnabled`. */
const isUncommonBadgeRarityEnabled = () => config()['badge_rarity.uncommon'] === true;

/** `getSupportedRarities`. */
export const getBadgeLeaderboardSupportedRarities = (): number[] => (isUncommonBadgeRarityEnabled() ? [ 1, ...BASE_SUPPORTED_RARITIES ] : [ ...BASE_SUPPORTED_RARITIES ]);

/** `normalizeType`. */
const normalizeType = (type: number, rarity: number) => {
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return type;
    if ((type === BADGE_LEADERBOARD_TYPE_RARITY) && getBadgeLeaderboardSupportedRarities().includes(rarity)) return type;

    return BADGE_LEADERBOARD_TYPE_TOTAL;
};

/** `normalizeRarity`. */
const normalizeRarity = (type: number, rarity: number) => ((type === BADGE_LEADERBOARD_TYPE_RARITY) ? rarity : -1);

/** `getRarityText`. */
const rarityText = (rarity: number) => t(getBadgeRarityLocalizationKey(rarity, isUncommonBadgeRarityEnabled()));

/** `getDropdownOptions`. */
export const getBadgeLeaderboardDropdownOptions = (): string[] => [
    t('badge_leaderboard.option.total_badges'),
    t('badge_leaderboard.option.achievement_level'),
    ...getBadgeLeaderboardSupportedRarities().map(rarity => t('badge_leaderboard.option.rarity', { rarity: rarityText(rarity) })),
];

/** `getDropdownSelectionIndex`. */
export const getBadgeLeaderboardDropdownSelection = (type: number, rarity: number): number => {
    if (type === BADGE_LEADERBOARD_TYPE_TOTAL) return 0;
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return 1;

    const index = getBadgeLeaderboardSupportedRarities().indexOf(rarity);

    return (index < 0) ? 0 : index + 2;
};

/** `getTitleText`. */
export const getBadgeLeaderboardTitle = (type: number, rarity: number): string => {
    if (type === BADGE_LEADERBOARD_TYPE_RARITY) return t('badge_leaderboard.title.rarity', { rarity: rarityText(rarity) });
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return t('badge_leaderboard.title.achievement_level');

    return t('badge_leaderboard.title.total_badges');
};

/** `getInfoText`. */
export const getBadgeLeaderboardInfo = (type: number, rarity: number): string => {
    if (type === BADGE_LEADERBOARD_TYPE_RARITY) {
        const key = RARITY_INFO_KEYS[rarity - 1];

        return t(key ? `badge_leaderboard.info.rarity.${key}` : 'badge_leaderboard.info.total_badges');
    }

    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return t('badge_leaderboard.info.achievement_level');

    return t('badge_leaderboard.info.total_badges');
};

/** `getRowAssetUri`: the emblem by each row's score. */
export const getBadgeLeaderboardRowAsset = (type: number, rarity: number): string => {
    if (type === BADGE_LEADERBOARD_TYPE_RARITY) return RARITY_ASSET_BASES[rarity - 1] ?? 'badge_rarity_badges_emblem';
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return 'badges_emblem_achievement';

    return 'badge_rarity_badges_emblem';
};

/** `getHeaderAssetUri`: the emblem by the info text. */
export const getBadgeLeaderboardHeaderAsset = (type: number, rarity: number): string => {
    if (type === BADGE_LEADERBOARD_TYPE_RARITY) return `${RARITY_ASSET_BASES[rarity - 1] ?? 'badge_rarity_badges_emblem'}_extended`;
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return 'badges_emblem_achievement_extended';

    return 'badge_rarity_badges_emblem';
};

/** `getHeaderAssetYOffset`. */
export const getBadgeLeaderboardHeaderYOffset = (type: number, rarity: number): number => {
    if ((type === BADGE_LEADERBOARD_TYPE_TOTAL) || ((type === BADGE_LEADERBOARD_TYPE_RARITY) && (rarity === 1))) return -9;
    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return -7;

    return 0;
};

/** `getFrameStyle`. */
export const getBadgeLeaderboardFrameStyle = (type: number, rarity: number): number => {
    if (type === BADGE_LEADERBOARD_TYPE_RARITY) {
        const style = RARITY_FRAME_STYLES[rarity - 1];

        if (style) return style;
    }

    if (type === BADGE_LEADERBOARD_TYPE_ACHIEVEMENT) return 10001;

    return 10000;
};

/** `getRankText`. */
export const getBadgeLeaderboardRankText = (rank: number): string => ((rank < 0) ? '--' : String(rank));

/** `getRankBorderColor`. */
export const getBadgeLeaderboardRankBorderColor = (rank: number): number => RANK_BORDER_COLORS[rank - 1] ?? DEFAULT_RANK_BORDER_COLOR;

/** `canGoPrevious` / `canGoNext`. */
export const canBadgeLeaderboardGoPrevious = (page: number) => page > 0;
export const canBadgeLeaderboardGoNext = (page: number, pageData: BadgeLeaderboardPageData | undefined) => !!pageData && (((page + 1) * BADGE_LEADERBOARD_PAGE_SIZE) < pageData.totalEntries);

/* ------------------------------------------------------------ BadgeLeaderboardDataServer */

/** `BadgeLeaderboardDataServerChunk`. */
interface Chunk {
    index: number;
    totalEntries: number;
    entries: IBadgeLeaderboardEntryData[];
    ownEntry: IBadgeLeaderboardEntryData | undefined;
    lastSynchronizedAt: number;
}

/** `BadgeLeaderboardDataServerContext`: one board's chunks. */
interface Context {
    type: number;
    rarity: number;
    key: string;
    totalEntries: number;
    ownEntry: IBadgeLeaderboardEntryData | undefined;
    chunks: Map<number, Chunk>;
    inFlight: Set<number>;
}

/** `BadgeLeaderboardResolvedPage`. */
interface ResolvedPage {
    data: BadgeLeaderboardPageData;
    chunkSyncTime: number;
    isStale: boolean;
    chunkIndex: number;
}

const contexts = new Map<string, Context>();
const active = { key: '', page: 0, request: 0, deliveredRequest: -1, deliveredSyncTime: -1 };

const now = () => performance.now();
const contextKey = (type: number, rarity: number) => `${type}:${rarity}`;
const chunkIndexOf = (page: number) => Math.trunc(page / PAGES_PER_FETCH);

const getContext = (type: number, rarity: number): Context => {
    const key = contextKey(type, rarity);
    let context = contexts.get(key);

    if (!context) {
        context = { type, rarity, key, totalEntries: -1, ownEntry: undefined, chunks: new Map(), inFlight: new Set() };
        contexts.set(key, context);
    }

    return context;
};

/** `canChunkExist`: any chunk while the total is unknown, else one that starts inside it. */
const canChunkExist = (context: Context, index: number) => (index >= 0) && ((context.totalEntries < 0) || ((index * CHUNK_SIZE) < context.totalEntries));

const synchronizeChunk = (send: Send, context: Context, index: number) => {
    if (!canChunkExist(context, index) || context.inFlight.has(index)) return;

    context.inFlight.add(index);
    send(new GetBadgeLeaderboardComposer({ type: context.type, rarity: context.rarity, chunkIndex: index, chunkSize: CHUNK_SIZE }));
};

/** `resolvePage`: the page's 10 out of its chunk, with the chunk's own entry or the board's. */
const resolvePage = (context: Context, page: number): ResolvedPage | undefined => {
    const chunkIndex = chunkIndexOf(page);
    const chunk = context.chunks.get(chunkIndex);

    if (!chunk) return undefined;

    const start = (page % PAGES_PER_FETCH) * BADGE_LEADERBOARD_PAGE_SIZE;
    const entries = chunk.entries.slice(start, start + BADGE_LEADERBOARD_PAGE_SIZE);

    return {
        data: { type: context.type, rarity: context.rarity, page, totalEntries: chunk.totalEntries, entries, ownEntry: chunk.ownEntry ?? context.ownEntry },
        chunkSyncTime: chunk.lastSynchronizedAt,
        isStale: (now() - chunk.lastSynchronizedAt) > STALE_AFTER_MS,
        chunkIndex,
    };
};

/** `deliverPage`: only the page asked for last, and a chunk once per request. */
const deliverPage = (resolved: ResolvedPage) => {
    if ((resolved.data.page !== active.page) || (contextKey(resolved.data.type, resolved.data.rarity) !== active.key)) return;
    if ((active.deliveredRequest === active.request) && (active.deliveredSyncTime === resolved.chunkSyncTime)) return;

    active.deliveredRequest = active.request;
    active.deliveredSyncTime = resolved.chunkSyncTime;

    // `onPageData`.
    badgeLeaderboardStore.getState().setPageData(resolved.data);
};

/** `prefetchAroundPage`: the next chunk, from the page before the last of this one. */
const prefetchAroundPage = (send: Send, context: Context, page: number) => {
    const chunkIndex = chunkIndexOf(page);

    if ((((chunkIndex + 1) * PAGES_PER_FETCH) - 1 - page) > PREFETCH_BOUNDARY_DISTANCE) return;

    const next = chunkIndex + 1;

    if (!canChunkExist(context, next)) return;

    const chunk = context.chunks.get(next);

    if (!chunk || ((now() - chunk.lastSynchronizedAt) > STALE_AFTER_MS)) synchronizeChunk(send, context, next);
};

/** `BadgeLeaderboardDataServer.requestPage`. */
const requestPage = (send: Send, type: number, rarity: number, page: number) => {
    page = Math.max(0, page);

    const context = getContext(type, rarity);

    active.key = context.key;
    active.page = page;
    active.request++;
    active.deliveredSyncTime = -1;
    active.deliveredRequest = -1;

    const resolved = resolvePage(context, page);

    if (resolved) {
        deliverPage(resolved);

        if (resolved.isStale) synchronizeChunk(send, context, resolved.chunkIndex);
    } else if (canChunkExist(context, chunkIndexOf(page))) {
        synchronizeChunk(send, context, chunkIndexOf(page));
    } else {
        deliverPage({ data: { type, rarity, page, totalEntries: context.totalEntries, entries: [], ownEntry: context.ownEntry }, chunkSyncTime: -1, isStale: false, chunkIndex: 0 });
    }

    prefetchAroundPage(send, context, page);
};

/** `onBadgeLeaderboardResult` -> `BadgeLeaderboardDataServer.onBadgeLeaderboardResult`. */
export const onBadgeLeaderboardResult = (send: Send, result: BadgeLeaderboardResultMessageType) => {
    if (result.size !== CHUNK_SIZE) return;

    const context = getContext(result.type, result.rarity);
    const chunk: Chunk = { index: result.page, totalEntries: result.totalEntries, entries: result.entries, ownEntry: result.ownEntry, lastSynchronizedAt: now() };

    context.chunks.set(chunk.index, chunk);
    context.inFlight.delete(chunk.index);
    context.totalEntries = result.totalEntries;
    context.ownEntry = result.ownEntry;

    if (active.key !== context.key) return;

    // `deliverActivePageIfAvailable`.
    const resolved = resolvePage(context, active.page);

    if (resolved) deliverPage(resolved);

    prefetchAroundPage(send, context, active.page);
};

/* ------------------------------------------------------------ the controller */

/** `showBadgeLeaderboard`. */
export const showBadgeLeaderboard = (send: Send, type: number, rarity: number = -1, page: number = 0) => {
    const shownType = normalizeType(type, rarity);
    const shownRarity = normalizeRarity(shownType, rarity);

    badgeLeaderboardStore.getState().showBoard(shownType, shownRarity, Math.max(0, page));
    requestPage(send, shownType, shownRarity, Math.max(0, page));
};

/** `linkReceived`: `badge_leaderboard/<type>/<rarity>/<page>`, each a number or its default. */
export const openBadgeLeaderboardLink = (send: Send, parts: string[]) => {
    const value = (index: number, fallback: number) => {
        const part = parts[index];

        if (!part) return fallback;

        const number = Number(part);

        return isNaN(number) ? fallback : Math.trunc(number);
    };

    showBadgeLeaderboard(send, value(1, 0), value(2, -1), value(3, 0));
};

/** `hide`. */
export const hideBadgeLeaderboard = () => badgeLeaderboardStore.getState().hide();

/** `onDropdownOpenClicked` -> `openDropdownMenu`. */
export const openBadgeLeaderboardDropdown = () => badgeLeaderboardStore.getState().requestMenuOpen();

/** `onDropdownSelectionChanged`: `getTypeByDropdownIndex` / `getRarityByDropdownIndex`, page 0. */
export const selectBadgeLeaderboardOption = (send: Send, index: number) => {
    const rarities = getBadgeLeaderboardSupportedRarities();
    const type = (index <= 0) ? BADGE_LEADERBOARD_TYPE_TOTAL : (index === 1) ? BADGE_LEADERBOARD_TYPE_ACHIEVEMENT : BADGE_LEADERBOARD_TYPE_RARITY;
    const rarity = ((index <= 1) || (index > (rarities.length + 1))) ? -1 : rarities[index - 2];

    showBadgeLeaderboard(send, type, rarity, 0);
};

/** `onPreviousPageClicked`. */
export const showBadgeLeaderboardPreviousPage = (send: Send) => {
    const { type, rarity, page } = badgeLeaderboardStore.getState();

    if (canBadgeLeaderboardGoPrevious(page)) showBadgeLeaderboard(send, type, rarity, page - 1);
};

/** `onNextPageClicked`. */
export const showBadgeLeaderboardNextPage = (send: Send) => {
    const { type, rarity, page, pageData } = badgeLeaderboardStore.getState();

    if (canBadgeLeaderboardGoNext(page, pageData)) showBadgeLeaderboard(send, type, rarity, page + 1);
};

/** `onProfileRegionClicked`: a row's user, or the own entry's (-1), in the extended profile. */
export const openBadgeLeaderboardProfile = (send: Send, index: number) => {
    const { pageData } = badgeLeaderboardStore.getState();
    const entry = (index === -1) ? pageData?.ownEntry : pageData?.entries[index];

    if (entry) openProfile(send, entry.userId);
};
