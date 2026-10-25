import { Ticker } from 'pixi.js';

/** The shared Pixi ticker that drives the room engine's update. */
export const GetTicker = () => Ticker.shared;
