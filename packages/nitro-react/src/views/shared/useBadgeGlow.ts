import { getBadgeRarityGlowColor, isBadgeRarityStandaloneTier } from '@nitrodevco/nitro-api';
import { createFlashGlowFilter } from '@nitrodevco/nitro-renderer';
import { ColorMatrixFilter, Filter } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useConfigBoolean } from '#base/context/system';

import { BADGE_GLOW_IMAGE_TIMEOUT, BADGE_GLOW_MIN_STRENGTH, BADGE_GLOW_TICK, badgeGlowStrength, badgeGlowTicks, badgeInnerGlowArgs, badgeOuterGlowArgs, badgeTintMatrix } from './badgeGlow';

/**
 * A badge slot's `glowColor` as `InfoStandUserView.setBadge` and `ExtendedProfileWindowCtrl.setSelectedBadge`
 * set it: the tier's glow colour for a standalone tier (uncommon only while `badge_rarity.uncommon` is on), else -1.
 */
export const getBadgeGlowColor = (rarityId: number | undefined, uncommonEnabled: boolean): number => {
    if ((rarityId === undefined) || !isBadgeRarityStandaloneTier(rarityId, uncommonEnabled)) return -1;

    return getBadgeRarityGlowColor(rarityId, uncommonEnabled);
};

/** `getBadgeGlowColor` with `badge_rarity.uncommon` read from the config. */
export const useBadgeGlowColors = (): ((rarityId: number | undefined) => number) => {
    const uncommonEnabled = useConfigBoolean('badge_rarity.uncommon');

    return (rarityId: number | undefined) => getBadgeGlowColor(rarityId, uncommonEnabled);
};

// one set per colour and tick, shared by every badge that glows it: the filters keep no per-object state
const FILTER_CACHE: Map<string, Filter[] | undefined> = new Map();

/** `applyGlowStrength` at a tick: the outer glow, the inner glow and the tint, or none below the least strength. */
const glowFilters = (color: number, count: number, ticks: number): Filter[] | undefined => {
    const key = `${color}:${count}:${ticks}`;

    if (FILTER_CACHE.has(key)) return FILTER_CACHE.get(key);

    const strength = badgeGlowStrength(count, ticks);
    let filters: Filter[] | undefined = undefined;

    if (strength > BADGE_GLOW_MIN_STRENGTH) {
        const tint = new ColorMatrixFilter({ resolution: 'inherit' });
        const matrix = badgeTintMatrix(color, strength);

        // Pixi's offsets are 0-1, Flash's 0-255
        [ 4, 9, 14, 19 ].forEach(index => matrix[index] /= 255);
        tint.matrix = matrix as ColorMatrixFilter['matrix'];
        filters = [ createFlashGlowFilter(...badgeOuterGlowArgs(color, strength)), createFlashGlowFilter(...badgeInnerGlowArgs(color, strength)), tint ];
    }

    FILTER_CACHE.set(key, filters);

    return filters;
};

/**
 * `BadgeImageWidget.playGlow` / `clearGlow` for one badge image. `playGlow` waits up to 5 s for the
 * image (`receiveAsset`) and then steps the glow every 16 ms, its filters over the badge's own; at
 * the last tick `clearGlow` takes them off. A new image (`set badgeId`) clears it.
 */
export const useBadgeGlow = (imageUrl: string | undefined, imageReady: boolean) => {
    const [ filters, setFilters ] = useState<Filter[] | undefined>(undefined);
    const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const pending = useRef<{ color: number; ticks: number; until: number } | undefined>(undefined);
    const [ requests, setRequests ] = useState(0);

    const stopTimer = () => {
        if (timer.current !== undefined) clearInterval(timer.current);

        timer.current = undefined;
    };

    const clearGlow = useCallback(() => {
        pending.current = undefined;
        stopTimer();
        setFilters(undefined);
    }, []);

    // `receiveAsset` -> `startGlowAnimation`: strength 0 at once, then a tick every 16 ms.
    const startPending = useCallback(() => {
        const glow = pending.current;

        pending.current = undefined;

        if (!glow || (performance.now() > glow.until)) return;

        let count = 0;

        setFilters(undefined);
        timer.current = setInterval(() => {
            count++;
            setFilters(glowFilters(glow.color, count, glow.ticks));

            // `onGlowComplete`
            if (count >= glow.ticks) clearGlow();
        }, BADGE_GLOW_TICK);
    }, [ clearGlow ]);

    const playGlow = useCallback((color: number, duration?: number) => {
        clearGlow();
        pending.current = { color: color & 0xFFFFFF, ticks: badgeGlowTicks(duration), until: performance.now() + BADGE_GLOW_IMAGE_TIMEOUT };
        setRequests(count => count + 1);
    }, [ clearGlow ]);

    // `receiveAsset`: the image is there, at once or once it loads.
    useEffect(() => {
        if (imageReady && pending.current) startPending();
    }, [ imageReady, requests, startPending ]);

    useEffect(() => clearGlow, [ imageUrl, clearGlow ]);

    return { filters, playGlow, clearGlow };
};
