/**
 * A clock for `useSyncExternalStore`: `read` (`performance.now`, `Date.now`) sampled by one interval
 * of `periodMs` that every subscriber shares, started by the first and stopped with the last, so a
 * render reads the snapshot instead of asking the time. `refreshOnSubscribe` samples it again
 * whenever a component subscribes - React then reads the snapshot once more and draws that time.
 */
export const clockTicker = (read: () => number, periodMs: number, refreshOnSubscribe: boolean = false) => {
    let now = read();
    const listeners = new Set<() => void>();
    let timer: ReturnType<typeof setInterval> | undefined;

    const subscribe = (onChange: () => void) => {
        if (refreshOnSubscribe) now = read();

        listeners.add(onChange);

        if (!timer) {
            timer = setInterval(() => {
                now = read();

                for (const listener of listeners) listener();
            }, periodMs);
        }

        return () => {
            listeners.delete(onChange);

            if (!listeners.size && timer) {
                clearInterval(timer);
                timer = undefined;
            }
        };
    };

    return { subscribe, getSnapshot: () => now };
};
