/** A second ask for the same room inside this long is the second tap of one double-click. */
export const DOUBLE_ENTER_WINDOW_MS = 1000;

/**
 * Says whether a room ask repeats the one just made. Flash closes the navigator inside the click,
 * so the second tap of a double-click never reaches the row; here the window goes on the next
 * render, so a fast double-click asked twice, the server answered twice, and the second answer
 * replaced the room session while it was still loading - the room came up blank, or with its zoom
 * dead. `now` is a parameter so the window can be tested without waiting.
 */
export const createRepeatedEnterGuard = (windowMs: number = DOUBLE_ENTER_WINDOW_MS) => {
    let last = { roomId: 0, at: Number.NEGATIVE_INFINITY };

    return (roomId: number, now: number = performance.now()): boolean => {
        const repeated = (last.roomId === roomId) && ((now - last.at) < windowMs);

        if (!repeated) last = { roomId, at: now };

        return repeated;
    };
};

/** The navigator's own guard: its window is one per client, so one guard serves it. */
export const isRepeatedEnter = createRepeatedEnterGuard();
