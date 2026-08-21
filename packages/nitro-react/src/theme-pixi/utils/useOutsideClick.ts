import { GetRenderer } from '@nitrodevco/nitro-renderer';
import type { Container as PixiContainer } from 'pixi.js';
import { type RefObject, useEffect } from 'react';

/**
 * Pixi port of hooks/ui/useOutsideClick.ts. DOM's version hit-tests via `element.contains(
 * event.target)`, which has no Pixi equivalent (a Pixi container isn't a DOM node, and every
 * popup shares the same single `<canvas>` as its DOM target regardless of where it sits in the
 * Pixi display tree). This instead hit-tests geometrically: the same native `window`
 * `pointerdown` listener DOM's version uses (browser pointer events work the same regardless of
 * which element started them, the same reasoning useFrameDrag.ts/useScrollController.ts already
 * rely on for their own window-level listeners), converted from window/client space into the
 * canvas's own CSS-pixel space via `GetRenderer().canvas.getBoundingClientRect()` - the same
 * space `Container.getGlobalPosition()`/`getBounds()` report in, since the shared renderer runs
 * with `autoDensity` + `resolution: GetPixelRatio()` (see PixiApplicationRoot.tsx) - then
 * checked against the target container's own `getBounds()`.
 */
export const useOutsideClick = <T extends PixiContainer>(ref: RefObject<T | null>, callback: () => void, enabled: boolean = true) => {
    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            const container = ref.current;
            const canvas = GetRenderer()?.canvas;

            if (!container || !canvas) return;

            const rect = canvas.getBoundingClientRect();
            const localX = event.clientX - rect.left;
            const localY = event.clientY - rect.top;

            if (container.getBounds().containsPoint(localX, localY)) return;

            callback();
        };

        window.addEventListener('pointerdown', onPointerDown);

        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [ref, enabled, callback]);
};
