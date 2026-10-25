/** Flash's `getTimer()`: whole milliseconds since the client started. */
export const getTimer = () => Math.trunc(performance.now());
