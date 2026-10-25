/**
 * The time for a view that redraws as it passes - an epoch clock (`Date.now`) for times the server
 * sent, or a monotonic one (`performance.now`) for times the client measured - sampled every
 * `periodMs` by one interval that every view on that clock and period shares. While `enabled` is
 * false (a window that is hidden) the view does not follow the clock; it reads the time afresh
 * when it is enabled again.
 */
import { useSyncExternalStore } from 'react';

import { clockTicker } from '#base/utils';

export type ClockKind = 'epoch' | 'monotonic';

const READ: Record<ClockKind, () => number> = { epoch: () => Date.now(), monotonic: () => performance.now() };

const tickers = new Map<string, ReturnType<typeof clockTicker>>();

const tickerFor = (kind: ClockKind, periodMs: number) => {
    const key = `${kind}/${periodMs}`;
    let ticker = tickers.get(key);

    if (!ticker) {
        ticker = clockTicker(READ[kind], periodMs, true);
        tickers.set(key, ticker);
    }

    return ticker;
};

const noSubscribe = () => () => {};

export const useClock = (kind: ClockKind, periodMs: number, enabled: boolean = true) => {
    const ticker = tickerFor(kind, periodMs);

    return useSyncExternalStore(enabled ? ticker.subscribe : noSubscribe, ticker.getSnapshot);
};
