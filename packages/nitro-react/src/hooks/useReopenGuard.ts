/**
 * A popup that closes on any press outside it closes on the press that starts a tap on its own
 * button too, and the tap would open it again at once. The popup marks when it closed
 * (`markClosed`); the button asks `justClosed` and leaves it shut within 250ms of that.
 */
import { useMemo, useRef } from 'react';

const REOPEN_GUARD_MS = 250;

export const useReopenGuard = () => {
    const closedAt = useRef(0);

    return useMemo(() => ({
        markClosed: () => {
            closedAt.current = Date.now();
        },
        justClosed: () => (Date.now() - closedAt.current) < REOPEN_GUARD_MS,
    }), []);
};
