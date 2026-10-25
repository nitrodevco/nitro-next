import { ImageFormat } from '../avatar/avatarRequest';
import { ImageSize } from '../output/drawFrames';
import { RequestError } from './RequestError';

/** The parameters every room object image takes: its size, turn, frame, animation and format. */
export interface FrameQuery {
    size: ImageSize;
    direction: number;
    frame: number;
    animate: boolean;
    format: ImageFormat;
}

export const MAX_FRAME = 1000;

/**
 * `size` `s` / `n` / `l`, `direction` 0-7 (2 when left out), `frame` (or `frame_num`), `animate`,
 * and `img_format` `png` / `gif` - a gif when animated, which it must then be.
 */
export const readFrameQuery = (query: Record<string, string | undefined>): FrameQuery => {
    const animate = readFlag(query.animate);
    const format = (query.img_format ?? (animate ? 'gif' : 'png')).toLowerCase();

    if ((format !== 'png') && (format !== 'gif')) throw new RequestError('img_format is png or gif');
    if (animate && (format !== 'gif')) throw new RequestError('an animated image is a gif');

    const size = (query.size ?? 'n').toLowerCase();

    if ((size !== 's') && (size !== 'n') && (size !== 'l')) throw new RequestError('size is s, n or l');

    return {
        size,
        direction: readInteger(query.direction, 'direction', 0, 7, 2),
        frame: readInteger(query.frame ?? query.frame_num, 'frame', 0, MAX_FRAME, 0),
        animate,
        format,
    };
};

export const readInteger = (value: string | undefined, name: string, min: number, max: number, fallback: number): number => {
    if ((value === undefined) || (value === '')) return fallback;

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || (parsed < min) || (parsed > max)) throw new RequestError(`${name} is a whole number from ${min} to ${max}`);

    return parsed;
};

/** On when given with any value but `0` or `false`. */
export const readFlag = (value: string | undefined): boolean => (value !== undefined) && (value !== '0') && (value.toLowerCase() !== 'false');
