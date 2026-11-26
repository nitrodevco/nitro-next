import { Ticker, UPDATE_PRIORITY } from 'pixi.js';

import { GetTicker } from './GetTicker';

/** First in each frame, ahead of every other listener on the shared ticker. */
const FRAME_TIME_PRIORITY = UPDATE_PRIORITY.INTERACTION + 1;

/** The time of the frame being run, or of the last one between frames; -1 while it is not tracked. */
let frameTime = -1;

/** A hidden page gets no animation frames; there is no document under Node (the imager). */
const isPageHidden = () => ((typeof document !== 'undefined') && document.hidden);

/**
 * The time of the frame a ticker listener is running in - what the room is updated to. Pixi moves
 * `lastTime` on only once every listener has run, so inside a listener it is still the frame before's
 * (and after a hidden page, the frame the page was left on); `elapsedMS` is the raw time since then.
 * Only meaningful inside a listener.
 */
export const GetTickerFrameTime = (ticker: Ticker) => (ticker.lastTime + ticker.elapsedMS);

const trackFrameTime = (ticker: Ticker) => {
    frameTime = GetTickerFrameTime(ticker);
};

/**
 * A page shown again runs no frame until its next animation frame: until then its time is when it
 * came back, not the frame it was left on.
 */
const resumeFrameTime = () => {
    if (!document.hidden) frameTime = performance.now();
};

/**
 * Keeps `GetTickerTime` on the frame being run, from its first listener on (`RoomEngine.start`), so
 * what is read during a frame agrees with the time the room is updated to; untracked, it is the
 * ticker's `lastTime`.
 */
export const TrackTickerFrameTime = (track: boolean) => {
    GetTicker().remove(trackFrameTime);

    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', resumeFrameTime);

    frameTime = -1;

    if (!track) return;

    GetTicker().add(trackFrameTime, undefined, FRAME_TIME_PRIORITY);

    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', resumeFrameTime);
};

/**
 * Flash's `getTimer()` for the room objects and visualizations, in whole milliseconds: the time of
 * the frame being run, or of the last one between frames, so everything read in or between two frames
 * agrees. While the page is hidden no frame runs and that time stands still, but packets are still
 * handled, so there it is the real time: a sign, gesture or line of talk that arrives while the page
 * is hidden is timed from when it arrived, and the first frame back shows what is still running.
 */
export const GetTickerTime = () => {
    if (isPageHidden()) return Math.floor(performance.now());

    return Math.floor((frameTime >= 0) ? frameTime : GetTicker().lastTime);
};
