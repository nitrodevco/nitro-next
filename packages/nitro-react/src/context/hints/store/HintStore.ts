/**
 * The hint store - Flash's `window/HintManager` (`HabboWindowManagerComponent.registerHintWindow`,
 * `showHint`, `hideHint`, `hideMatchingHint`): the green arrow pointing at one element of the UI.
 *
 * - `targets` (`_registeredWindows`): every key a view registered, with the arrow's style for it -
 *   `HINT_STYLE_VERTICAL` (above or below the element) or any other (beside it).
 * - `nodes`: each key's element as its view mounts it. Flash's `HintTarget` holds the window; here a
 *   view registers its key for as long as it lives and hands its element over when it is drawn, so a
 *   key whose element is hidden (unmounted) is still registered and the arrow waits, invisible, as
 *   Flash's does for an invisible window.
 * - `activeHint` (`_activeHint` and the start rectangle): the key the arrow points at, a new `id`
 *   each time one is shown.
 */
import { Container as PixiContainer } from 'pixi.js';
import { createStore } from 'zustand';

import type { GlobalRect } from '#base/theme';

/**
 * `registerHintWindow`'s default style: `common_green_arrow_vertical`. Any other style draws
 * `common_green_arrow_horizontal`; Flash's callers only ever register this one.
 */
export const HINT_STYLE_VERTICAL = 1;

export interface ActiveHint {
    readonly id: number;
    readonly key: string;
    readonly style: number;
    /** `showHint`'s rectangle: where the arrow starts and flies in from (`animateHint`). */
    readonly startRect: GlobalRect | undefined;
}

type State = {
    targets: Record<string, number>;
    nodes: Record<string, PixiContainer>;
    activeHint: ActiveHint | undefined;
};

type Actions = {
    /** `registerWindow`: a key registered again replaces the old one (`unregisterWindow` first). */
    registerHintWindow: (key: string, style?: number) => void;
    /** `unregisterWindow`: the arrow goes too when it points at the key. */
    unregisterHintWindow: (key: string) => void;
    /** The key's element as it is mounted, `null` when it is taken down. */
    setHintWindowNode: (key: string, node: PixiContainer | null) => void;
    /** `showHint`: only for a registered key, and not again for the one already shown. */
    showHint: (key: string, startRect?: GlobalRect) => void;
    hideHint: () => void;
    hideMatchingHint: (key: string) => void;
};

export type HintStore = State & Actions;

let nextHintId = 1;

export const createHintStore = () => createStore<HintStore>()((set, get) => ({
    targets: {},
    nodes: {},
    activeHint: undefined,
    registerHintWindow: (key, style = HINT_STYLE_VERTICAL) => {
        if (get().targets[key] !== undefined) get().unregisterHintWindow(key);

        set(state => ({ targets: { ...state.targets, [key]: style } }));
    },
    unregisterHintWindow: (key) => {
        if (get().activeHint?.key === key) get().hideHint();

        set((state) => {
            if (state.targets[key] === undefined) return state;

            const { [key]: _removed, ...targets } = state.targets;

            return { targets };
        });
    },
    setHintWindowNode: (key, node) => set((state) => {
        if (node) return (state.nodes[key] === node) ? state : { nodes: { ...state.nodes, [key]: node } };

        if (!state.nodes[key]) return state;

        const { [key]: _removed, ...nodes } = state.nodes;

        return { nodes };
    }),
    showHint: (key, startRect) => {
        const { targets, activeHint } = get();
        const style = targets[key];

        if ((style === undefined) || (activeHint?.key === key)) return;

        set({ activeHint: { id: nextHintId++, key, style, startRect } });
    },
    hideHint: () => set(state => (state.activeHint ? { activeHint: undefined } : state)),
    hideMatchingHint: (key) => {
        if (get().activeHint?.key === key) get().hideHint();
    },
}));

/** The one hint manager, for the whole session. */
export const hintStore = createHintStore();
