import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useEffect } from 'react';

import { ClientPointToStage } from '../utils/GetPixelRatio';
import { useLatest } from './useLatest';

/**
 * Calls `callback` on any press outside `ref`'s container - what Flash tells a window as `WME_CLICK_AWAY`. Every
 * popup is drawn into the one shared canvas, so the test is geometric: a `window` `pointerdown`
 * listener converts the client position into the stage's space (`ClientPointToStage`) - the
 * space `getBounds()` reports in - and checks it against the container's `getBounds()`.
 */
export const useOutsideClick = <T extends PixiContainer>(ref: RefObject<T | null>, callback: () => void, enabled: boolean = true) => {
    // `callback` is almost always an inline arrow at the call site, so a ref keeps the listener
    // itself stable across re-renders instead of tearing down/re-adding the window listener (and
    // dropping it during any render that happens between pointerdown and its own effect re-run)
    // every time the caller re-renders.
    const callbackRef = useLatest(callback);

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            const container = ref.current;
            const canvas = GetRenderer().canvas;

            if (!container || !canvas) return;

            const point = ClientPointToStage(canvas, event.clientX, event.clientY);

            if (container.getBounds().containsPoint(point.x, point.y)) return;

            callbackRef.current();
        };

        window.addEventListener('pointerdown', onPointerDown);

        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [ ref, enabled ]);
};
