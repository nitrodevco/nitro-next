/**
 * Where and how big each frame was left, kept per frame `id` in the browser's `localStorage`, so a
 * window reopens as the user arranged it (`useFrameDrag`'s `remember`, `useFrameResize`). Storage
 * that is unavailable or full only means nothing is remembered.
 */

/** A frame's drag offset from where its layout puts it. */
export type FramePositionOffset = { dx: number; dy: number };

/** The size a frame's scaler gave it. */
export type FrameSize = { width: number; height: number };

const POSITION_KEY_PREFIX = 'nitro:frame-position:';
const SIZE_KEY_PREFIX = 'nitro:frame-size:';

/** The two numbers stored under `key`, or `undefined` when there are none (or storage is unavailable). */
const readStored = <K extends string>(key: string, fields: readonly [ K, K ]): Record<K, number> | undefined => {
    if (typeof window === 'undefined') return undefined;

    try {
        const raw = window.localStorage.getItem(key);

        if (!raw) return undefined;

        const parsed = JSON.parse(raw);

        if (fields.some(field => typeof parsed?.[field] !== 'number')) return undefined;

        return Object.fromEntries(fields.map(field => [ field, parsed[field] as number ])) as Record<K, number>;
    } catch {
        return undefined;
    }
};

/** Stores `value` under `key`, or removes it for `undefined`. */
const writeStored = (key: string, value: object | undefined): void => {
    if (typeof window === 'undefined') return;

    try {
        if (value === undefined) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        return;
    }
};

export const getStoredFramePosition = (id: string): FramePositionOffset | undefined => readStored(POSITION_KEY_PREFIX + id, [ 'dx', 'dy' ]);

export const setStoredFramePosition = (id: string, offset: FramePositionOffset): void => writeStored(POSITION_KEY_PREFIX + id, offset);

export const getStoredFrameSize = (id: string): FrameSize | undefined => readStored(SIZE_KEY_PREFIX + id, [ 'width', 'height' ]);

export const setStoredFrameSize = (id: string, size: FrameSize): void => writeStored(SIZE_KEY_PREFIX + id, size);

export const clearStoredFrameSize = (id: string): void => writeStored(SIZE_KEY_PREFIX + id, undefined);
