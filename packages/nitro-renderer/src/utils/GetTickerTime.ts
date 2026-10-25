import { GetTicker } from './GetTicker';

/**
 * The shared ticker's last time in whole milliseconds - the clock the room objects and
 * visualizations are updated with, as Flash's `getTimer()`.
 */
export const GetTickerTime = () => Math.floor(GetTicker().lastTime);
