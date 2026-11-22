/**
 * A design window's samples (`designSamples.ts`): `fill` writes them once the view and the game's
 * window in it have mounted, and returns what puts the stores back, which runs as the view goes -
 * in a layout effect's cleanup, so before the next view's layout effects fill theirs. React runs a
 * new view's layout effects before an old view's passive cleanups: put back there, the purse's
 * user store landed over the room screen's samples (`DesignHudView`), and the room screen's
 * put-back then restored the purse's. Not a Flash feature.
 */
import { useEffect, useLayoutEffect, useRef } from 'react';

export const usePreviewSample = (fill: () => () => void) => {
    const putBack = useRef<(() => void) | undefined>(undefined);

    useLayoutEffect(() => () => {
        putBack.current?.();
        putBack.current = undefined;
    }, []);

    useEffect(() => {
        putBack.current = fill();
    }, []);
};
