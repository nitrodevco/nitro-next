/**
 * Flash's `addMessageFragment`: a list the server sends in fragments (the badges, the furni, the
 * pets), whole once every one is in - the buffer sized by the first fragment's count. `add` answers
 * the merged list then, and starts afresh; undefined while some are missing. A list in one fragment
 * is that fragment.
 */
export const createFragmentBuffer = <T>(merge: (fragments: T[]) => T) => {
    let fragments: (T | undefined)[] | undefined;

    const add = (fragment: T, totalFragments: number, fragmentNo: number): T | undefined => {
        if (totalFragments === 1) return fragment;

        fragments ??= new Array<T | undefined>(totalFragments).fill(undefined);
        fragments[fragmentNo] = fragment;

        if (fragments.some(received => !received)) return undefined;

        const whole = merge(fragments as T[]);

        fragments = undefined;

        return whole;
    };

    /** Drops the fragments of a list on its way in. */
    const reset = () => {
        fragments = undefined;
    };

    return { add, reset };
};

/** Fragments that are maps, merged into one map (later keys win, as `Map` from entries does). */
export const mergeMapFragments = <K, V>(fragments: Map<K, V>[]): Map<K, V> => new Map(fragments.flatMap(fragment => [ ...fragment ]));
