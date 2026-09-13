import { IMessageDataWrapper } from './IMessageDataWrapper';

/** Reads a signed 64-bit integer (two 32-bit halves, high first) as a JS number. Exact for |value| < 2^53. */
export const ReadLong = (wrapper: IMessageDataWrapper): number => {
    const high = wrapper.readInt();
    const low = wrapper.readInt() >>> 0;

    return high * 4294967296 + low;
};
