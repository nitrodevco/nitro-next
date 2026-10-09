/**
 * `RewardTrackPrizeLayout`: where a number of points sits across the prize track, and how the
 * prizes are split into pages. One point is `distancePerPoint` pixels: as wide as a prize plus its
 * spacing over the smallest gap between two prizes of a tier, then stretched as far as a page of
 * whole multiples of that gap (`pagePointSpan`) still fits the visible width. The lowest prize sits
 * half a prize plus the spacing in (`zeroOffset`), and page `n` starts at `n * pagePointSpan` points.
 */
import type { RewardTrackPrize } from '#base/context/reward-track';

const PAGE_BOUNDARY_EPSILON = 0.0001;

export interface RewardTrackPrizeLayout {
    pageCount: number;
    xForPoints: (points: number, page: number) => number;
    pageForPoints: (points: number) => number;
}

/** `findMinimumGapForPremium`: the smallest positive step between consecutive prizes of one tier, 0 for none. */
const minimumGapForTier = (prizes: readonly RewardTrackPrize[], premium: boolean) => {
    let previous = -1;
    let gap = 0;

    for (const prize of prizes) {
        if (prize.premium !== premium) continue;

        if (previous !== -1) {
            const step = prize.requiredPoints - previous;

            if ((step > 0) && ((gap === 0) || (step < gap))) gap = step;
        }

        previous = prize.requiredPoints;
    }

    return gap;
};

/** `findMinimumGap`. */
const minimumGap = (prizes: readonly RewardTrackPrize[]) => {
    const free = minimumGapForTier(prizes, false);
    const premium = minimumGapForTier(prizes, true);

    if (free <= 0) return premium;
    if (premium <= 0) return free;

    return Math.min(free, premium);
};

/** `pageForPointSpan`. */
const pageForPointSpan = (points: number, span: number) => ((points <= 0) ? 0 : Math.max(0, Math.trunc(Math.ceil((points - PAGE_BOUNDARY_EPSILON) / span)) - 1));

/** `rebuild`, for a track's prizes, the visible width and the prize's width and spacing. */
export const buildRewardTrackPrizeLayout = (prizes: readonly RewardTrackPrize[], visibleWidth: number, prizeWidth: number, spacing: number): RewardTrackPrizeLayout => {
    const halfPrize = (prizeWidth / 2) + spacing;
    const minRequired = Math.max(0, prizes.reduce((min, prize) => (((min === -1) || (prize.requiredPoints < min)) ? prize.requiredPoints : min), -1));
    const maxRequired = prizes.reduce((max, prize) => Math.max(max, prize.requiredPoints), 0);

    let gap = minimumGap(prizes);

    if (gap <= 0) gap = Math.max(1, maxRequired);

    const zeroOffsetFor = (distance: number) => Math.max(0, halfPrize - (minRequired * distance));
    const usableWidthFor = (distance: number) => Math.max(1, visibleWidth - halfPrize - zeroOffsetFor(distance));
    const spanFits = (distance: number, span: number) => (span * distance) <= (usableWidthFor(distance) + PAGE_BOUNDARY_EPSILON);

    let distancePerPoint = (prizeWidth + spacing) / gap;

    if (distancePerPoint <= 0) distancePerPoint = 1;

    // `calculatePagePointSpan`: whole gaps that fit.
    const pagePointSpan = Math.max(1, Math.max(1, Math.trunc(Math.floor(usableWidthFor(distancePerPoint) / distancePerPoint / gap))) * gap);

    // `findMaxDistancePerPoint`: doubled while the span still fits, then bisected.
    let low = distancePerPoint;
    let high = distancePerPoint;

    for (let i = 0; i < 32; i++) {
        high *= 2;

        if (!spanFits(high, pagePointSpan)) break;

        low = high;
    }

    for (let i = 0; i < 24; i++) {
        const middle = (low + high) / 2;

        if (spanFits(middle, pagePointSpan)) low = middle;
        else high = middle;
    }

    distancePerPoint = low;

    const zeroOffset = zeroOffsetFor(distancePerPoint);
    const pageCount = Math.max(1, prizes.reduce((max, prize) => Math.max(max, pageForPointSpan(prize.requiredPoints, pagePointSpan)), 0) + 1);

    return {
        pageCount,
        xForPoints: (points, page) => zeroOffset + ((points - Math.max(0, page * pagePointSpan)) * distancePerPoint),
        pageForPoints: points => Math.max(0, Math.min(pageCount - 1, pageForPointSpan(points, pagePointSpan))),
    };
};
