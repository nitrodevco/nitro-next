/**
 * The parent side of `ReflectResize` (Flash's `reflect_resize_to_parent`): the context a
 * reflecting child reports its growth through, and the hook a window uses to add it up.
 */
import { createContext, useState } from 'react';

/** How much the reflecting children of one window have grown past their template sizes. */
export interface ReflectResizeDelta {
    width: number;
    height: number;
}

export interface ReflectResizeRegistry {
    /** `null` removes the child's entry: an unmounted window no longer adds to its parent. */
    report: (id: string, delta: ReflectResizeDelta | null) => void;
}

export const ReflectResizeContext = createContext<ReflectResizeRegistry | null>(null);

/** The sum of every reported delta. */
const sumDeltas = (deltas: Record<string, ReflectResizeDelta>): ReflectResizeDelta => {
    let width = 0;
    let height = 0;

    for (const delta of Object.values(deltas)) {
        width += delta.width;
        height += delta.height;
    }

    return { width, height };
};

/**
 * Collects what the `ReflectResize` descendants report through `registry` (provide it with
 * `ReflectResizeContext`) and returns their total growth.
 */
export const useReflectResizeHost = (): { delta: ReflectResizeDelta; registry: ReflectResizeRegistry } => {
    const [ deltas, setDeltas ] = useState<Record<string, ReflectResizeDelta>>({});
    const [ registry ] = useState<ReflectResizeRegistry>(() => ({
        report: (id, delta) => setDeltas((prev) => {
            const current = prev[id];

            if (!delta) {
                if (!current) return prev;

                const next = { ...prev };

                delete next[id];

                return next;
            }

            if (current && (current.width === delta.width) && (current.height === delta.height)) return prev;

            return { ...prev, [id]: delta };
        }),
    }));

    return { delta: sumDeltas(deltas), registry };
};
