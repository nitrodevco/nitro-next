/**
 * What the browser says about the device, as far as it says anything. Every field is optional:
 * `deviceMemory` and `connection.saveData` are Chrome's alone, and a browser that does not know
 * one simply does not report it.
 */
export interface DeviceHints {
    /** `navigator.deviceMemory`: gigabytes, rounded down to a power of two and capped at 8. */
    deviceMemory?: number;
    /** `navigator.hardwareConcurrency`: logical processors. */
    hardwareConcurrency?: number;
    /** `matchMedia('(pointer: coarse)')`: the main pointer is a finger, so a phone or a tablet. */
    coarsePointer?: boolean;
    /** `navigator.connection.saveData`: the user asked the browser to use less data. */
    saveData?: boolean;
}

/** What a phone's tab has always been given: a large room's sheets are decoded this many at a time. */
export const LOW_END_FURNITURE_DOWNLOADS = 4;

/**
 * A desktop. Measured on a 59-type room over a ~180ms round trip: a download takes about 180ms
 * and decoding it about 2ms, so the time is spent waiting on the network and the slots are what
 * limit it. Measured again on 400 pieces of 90 types from a cold CDN (~330ms a download): 8 slots
 * showed the room in 4.0s, 16 in 1.7s and 32 in 1.0s, with the origin answering no slower at 32.
 * Each slot holds one sheet in memory while it is decoded, which a desktop has room for.
 */
export const DEFAULT_FURNITURE_DOWNLOADS = 32;

/** No setting goes past this: past it a room is only asking the origin for more than it can answer. */
export const MAX_FURNITURE_DOWNLOADS = 64;

/**
 * How many furniture downloads run at once. A hotel can set `furniture.download.concurrency` to
 * choose; anything that is not a whole number from 1 to {@link MAX_FURNITURE_DOWNLOADS} is ignored
 * (a typo must not stop furniture loading, or open a hundred connections). Otherwise a device
 * that is likely to run out of memory with several sheets decoding at once keeps the old 4: a
 * touch screen, a device that reports 2GB or less or two processors or fewer, and anyone who has
 * asked the browser to save data. Everything else gets {@link DEFAULT_FURNITURE_DOWNLOADS}.
 */
export const chooseFurnitureDownloadConcurrency = (configured: unknown, hints: DeviceHints): number => {
    if ((typeof configured === 'number') && Number.isInteger(configured) && (configured >= 1) && (configured <= MAX_FURNITURE_DOWNLOADS)) return configured;

    if (hints.saveData || hints.coarsePointer) return LOW_END_FURNITURE_DOWNLOADS;
    if ((hints.deviceMemory !== undefined) && (hints.deviceMemory <= 2)) return LOW_END_FURNITURE_DOWNLOADS;
    if ((hints.hardwareConcurrency !== undefined) && (hints.hardwareConcurrency <= 2)) return LOW_END_FURNITURE_DOWNLOADS;

    return DEFAULT_FURNITURE_DOWNLOADS;
};

/** Reads the hints from the browser, tolerating every part of it being missing. */
export const readDeviceHints = (): DeviceHints => {
    const hints: DeviceHints = {};

    try {
        const nav = (typeof navigator === 'undefined')
            ? undefined
            : navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

        if (typeof nav?.deviceMemory === 'number') hints.deviceMemory = nav.deviceMemory;
        if (typeof nav?.hardwareConcurrency === 'number') hints.hardwareConcurrency = nav.hardwareConcurrency;
        if (typeof nav?.connection?.saveData === 'boolean') hints.saveData = nav.connection.saveData;
        if (typeof matchMedia === 'function') hints.coarsePointer = matchMedia('(pointer: coarse)').matches;
    } catch {
        // A browser that will not say is treated as one that did not.
    }

    return hints;
};
