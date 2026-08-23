import type { Container as PixiContainer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface VirtualRow {
    index: number;
    start: number;
    size: number;
}

export interface RowVirtualizerOptions {
    count: number;
    estimateSize: number;
    overscan?: number;
    viewportHeight: number;
    scrollOffset: number;
    /** Extra space added after every row but the last, matching InfiniteGrid.tsx's own
     *  `*:pb-1 *:last:pb-0` row spacing. */
    gap?: number;
}

export interface RowVirtualizer {
    virtualItems: VirtualRow[];
    totalSize: number;
    /** Call sites must wrap this in their own inline arrow at the JSX `ref` prop
     *  (`ref={node => virtualizer.measureRow(row.index, node)}`), never pass it as a direct
     *  member expression - see useScrollController.ts's docblock for why: this repo's
     *  `eslint-plugin-react-hooks` flags any `xxxRef`-property-shaped hook result assigned
     *  straight to a JSX `ref=` as a false-positive "refs during render" error. */
    measureRow: (index: number, node: PixiContainer | null) => void;
}

/**
 * Pixi-native replacement for `@tanstack/react-virtual`'s `useVirtualizer`, used by
 * theme/InfiniteGrid.tsx in row-count mode with measured (not fixed) row height
 * (`estimateSize: () => 0` + `measureElement`). react-virtual's API is inherently shaped
 * around a real DOM scroll element (`getScrollElement`/`scrollTop`), which Pixi has none of -
 * this reimplements just the two things InfiniteGrid actually needs: a visible-range window
 * (current scroll position + overscan) and dynamic per-row size measurement, reusing the same
 * `requestAnimationFrame` polling + `.layout.computedLayout` read this package already relies
 * on for scroll metrics (see useScrollController.ts) since there's no ResizeObserver
 * equivalent for a Pixi container's yoga-computed size. Measured sizes live in real state
 * (not a ref read during render) so `eslint-plugin-react-hooks`'s `react-hooks/refs` rule -
 * which forbids reading `ref.current` during render - stays clean; the map of currently-
 * mounted row nodes is a plain ref, touched only inside the measurement effect and inside
 * `measureRow` (an event-time callback, never called during render itself).
 */
export const useRowVirtualizer = ({ count, estimateSize, overscan = 1, viewportHeight, scrollOffset, gap = 0 }: RowVirtualizerOptions): RowVirtualizer => {
    const [ sizes, setSizes ] = useState<number[]>(() => new Array(count).fill(estimateSize));
    const nodesRef = useRef<Map<number, PixiContainer>>(new Map());

    if (sizes.length !== count) {
        const next: number[] = new Array(count);
        for (let i = 0; i < count; i++) next[i] = sizes[i] ?? estimateSize;
        setSizes(next);
    }

    useEffect(() => {
        for (const index of nodesRef.current.keys()) {
            if (index >= count) nodesRef.current.delete(index);
        }
    }, [ count ]);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            setSizes((prev) => {
                let changed = false;
                const next = [ ...prev ];

                nodesRef.current.forEach((node, index) => {
                    if (index >= next.length) return;

                    const measured = node.layout?.computedLayout?.height ?? node.height ?? 0;
                    if (measured > 0 && Math.abs(measured - next[index]) > 0.5) {
                        changed = true;
                        next[index] = measured;
                    }
                });

                return changed ? next : prev;
            });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, []);

    const measureRow = (index: number, node: PixiContainer | null) => {
        if (node) nodesRef.current.set(index, node);
        else nodesRef.current.delete(index);
    };

    const offsets: number[] = new Array(count);
    let totalSize = 0;
    for (let i = 0; i < count; i++) {
        offsets[i] = totalSize;
        totalSize += sizes[i] + (i < count - 1 ? gap : 0);
    }

    let startIndex = 0;
    while (startIndex < count && offsets[startIndex] + sizes[startIndex] < scrollOffset) startIndex++;

    let endIndex = startIndex;
    while (endIndex < count && offsets[endIndex] < scrollOffset + viewportHeight) endIndex++;

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(count, endIndex + overscan);

    const virtualItems: VirtualRow[] = [];
    for (let i = startIndex; i < endIndex; i++) {
        virtualItems.push({ index: i, start: offsets[i], size: sizes[i] });
    }

    return { virtualItems, totalSize, measureRow };
};
