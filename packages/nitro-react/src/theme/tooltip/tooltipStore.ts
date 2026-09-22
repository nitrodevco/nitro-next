import { useSyncExternalStore } from 'react';

/**
 * The one tooltip on screen, as the client's `WindowToolTipAgent` kept it: the window being
 * hovered (`owner`), its `tool_tip_caption`, the pointer position it follows, and whether the
 * `tool_tip_delay` (500ms) has elapsed. `TooltipLayer` renders it; `useTooltipHandlers` drives
 * it from a component's hover.
 */
export interface TooltipState {
    owner: string | null;
    text: string;
    x: number;
    y: number;
    visible: boolean;
}

/** `ThemeManager`'s `tool_tip_delay` default - what a window without its own var waits. */
export const TOOLTIP_DELAY_MS = 500;

const listeners = new Set<() => void>();
let state: TooltipState = { owner: null, text: '', x: 0, y: 0, visible: false };
let timer: ReturnType<typeof setTimeout> | undefined;

const set = (partial: Partial<TooltipState>): void => {
    state = { ...state, ...partial };
    listeners.forEach(listener => listener());
};

const clearTimer = (): void => {
    if (timer === undefined) return;

    clearTimeout(timer);
    timer = undefined;
};

/** `WindowToolTipAgent.begin`: remember the caption and pointer, and start the delay. */
export const beginTooltip = (owner: string, text: string, x: number, y: number, delay = TOOLTIP_DELAY_MS): void => {
    clearTimer();
    set({ owner, text, x, y, visible: false });
    timer = setTimeout(() => {
        timer = undefined;
        set({ visible: true });
    }, delay);
};

/** `WindowToolTipAgent.operate`: the tooltip follows the pointer. */
export const moveTooltip = (x: number, y: number): void => {
    if (state.owner === null || (state.x === x && state.y === y)) return;

    set({ x, y });
};

/** `WindowToolTipAgent.updateCaption`: a caption that changes while shown. */
export const updateTooltipText = (owner: string, text: string): void => {
    if (state.owner !== owner || state.text === text) return;

    set({ text });
};

/** `WindowToolTipAgent.end`: only the owner that began it ends it. */
export const endTooltip = (owner: string): void => {
    if (state.owner !== owner) return;

    clearTimer();
    set({ owner: null, visible: false });
};

const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
};

const getSnapshot = (): TooltipState => state;

export const useTooltipState = (): TooltipState => useSyncExternalStore(subscribe, getSnapshot);
