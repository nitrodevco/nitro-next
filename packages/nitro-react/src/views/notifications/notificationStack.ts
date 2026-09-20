import { NOTIFICATION_VIEWS, NotificationItem } from '#base/context/notifications';

/**
 * The arithmetic of the notification stack, kept apart from React: one bubble's life
 * (`HabboNotificationItemView.update`) and where the bubbles go
 * (`HabboNotificationViewManager`). `NotificationsView` owns the records and runs these once a
 * frame; everything here works on plain records, so none of it touches a store or a ref.
 */

/** `HabboNotificationViewManager.SPACING`, also the gap under the toolbar's extension view. */
export const NOTIFICATION_SPACING = 4;
/** `HabboNotificationItemView.MAX_HEIGHT`: the room a new bubble needs at the bottom of the screen. */
export const NOTIFICATION_MAX_HEIGHT = 70;
/** `HabboNotificationItemView.SIDE_MARGIN`: the gap to the right edge of the screen. */
export const NOTIFICATION_SIDE_MARGIN = 5;

const MOVE_DURATION_MS = 220;

/** `STATE_IDLE` .. `STATE_SWIPE_OUT`. A bubble is created fading in; an idle one is removed. */
export type NotificationPhase = 'idle' | 'fade_in' | 'display' | 'fade_out' | 'swipe_out';

/** The per-frame half of `HabboNotificationItemView`: what a store has no business holding. */
export interface NotificationRuntime {
    key: number;
    phase: NotificationPhase;
    /** Milliseconds into the current phase. Flash keeps one counter per phase; each starts at 0 with it. */
    elapsed: number;
    /** `_margin`: the y the bubble is at. */
    margin: number;
    /** `_targetMargin`: the y it is easing towards. */
    targetMargin: number;
    hovering: boolean;
    /** `_window.blend`. */
    blend: number;
    /** How far a swipe has carried it to the right. */
    swipe: number;
    /** `_window.height` as laid out, for a layout whose view has no fixed `height`. */
    measuredHeight: number;
}

export const isReadyOrFading = (runtime: NotificationRuntime) => (runtime.phase === 'idle') || (runtime.phase === 'fade_out');

/** `HabboNotificationItemView.height`: the view's fixed slot, else the window as it measures. */
export const stackHeight = (item: NotificationItem, runtime: NotificationRuntime) => NOTIFICATION_VIEWS[item.layout].height ?? runtime.measuredHeight;

export const createRuntime = (key: number, margin: number, measuredHeight: number): NotificationRuntime => ({
    key, phase: 'fade_in', elapsed: 0, margin, targetMargin: margin, hovering: false, blend: 0, swipe: 0, measuredHeight,
});

export const startPhase = (runtime: NotificationRuntime, phase: NotificationPhase) => {
    runtime.phase = phase;
    runtime.elapsed = 0;
};

/** `animatePosition`: eases towards the target, a pixel at the least, never past it. */
const animatePosition = (runtime: NotificationRuntime, deltaMs: number) => {
    if (runtime.margin === runtime.targetMargin) return;

    const distance = runtime.targetMargin - runtime.margin;
    const progress = Math.min(deltaMs / MOVE_DURATION_MS, 1);
    const eased = 1 - ((1 - progress) * (1 - progress));

    let step = Math.round(distance * eased);

    if (step === 0) step = (distance > 0) ? 1 : -1;

    if (Math.abs(step) >= Math.abs(distance)) runtime.margin = runtime.targetMargin;
    else runtime.margin += step;
};

const clampBlend = (blend: number) => Math.min(Math.max(blend, 0), 1);

/**
 * `HabboNotificationItemView.update`. Returns true when the display time has run out and the
 * bubble starts to fade on its own, so the caller can tell the store.
 */
export const updateRuntime = (runtime: NotificationRuntime, item: NotificationItem, deltaMs: number): boolean => {
    const view = NOTIFICATION_VIEWS[item.layout];

    animatePosition(runtime, deltaMs);

    switch (runtime.phase) {
        case 'fade_in':
            runtime.elapsed += deltaMs;
            runtime.blend = clampBlend(runtime.elapsed / view.timeFadeIn);

            if (runtime.elapsed > view.timeFadeIn) startPhase(runtime, 'display');

            return false;
        case 'display':
            // The clock keeps running under the pointer; the bubble just does not leave while it is there.
            runtime.elapsed += deltaMs;

            if ((runtime.elapsed > (item.options.timeDisplay ?? view.timeDisplay)) && !runtime.hovering && !item.options.stay) {
                startPhase(runtime, 'fade_out');

                return true;
            }

            return false;
        case 'fade_out':
            runtime.elapsed += deltaMs;
            runtime.blend = clampBlend(1 - (runtime.elapsed / view.timeFadeOut));

            if (runtime.elapsed > view.timeFadeOut) startPhase(runtime, 'idle');

            return false;
        case 'swipe_out':
            runtime.elapsed += deltaMs;
            runtime.swipe = (runtime.elapsed / view.timeSwipeOut) * view.distanceSwipeOut;

            if (runtime.elapsed > view.timeSwipeOut) startPhase(runtime, 'idle');

            return false;
    }

    return false;
};

/** A bubble with what the stack needs to know about it; the list is kept sorted by `margin`. */
export interface StackEntry {
    item: NotificationItem;
    runtime: NotificationRuntime;
}

/** `getNextAvailableVerticalPosition`: the first gap from the top that the bubble above leaves. */
export const nextAvailablePosition = (entries: StackEntry[], top: number) => {
    let position = top;

    for (const { item, runtime } of entries) {
        const height = stackHeight(item, runtime);

        if ((position + height) < runtime.margin) return position;

        position = runtime.margin + height + NOTIFICATION_SPACING;
    }

    return position;
};

/** `isSpaceAvailable`. */
export const isSpaceAvailable = (entries: StackEntry[], top: number, screenHeight: number) => (nextAvailablePosition(entries, top) + NOTIFICATION_MAX_HEIGHT) < screenHeight;

/** `updateVerticalTargets`: the bubbles that are staying close ranks; a fading one is left where it is. */
export const updateVerticalTargets = (entries: StackEntry[], top: number) => {
    let position = top;

    for (const { item, runtime } of entries) {
        if (isReadyOrFading(runtime)) continue;

        runtime.targetMargin = position;
        position += stackHeight(item, runtime) + NOTIFICATION_SPACING;
    }
};

/** `refreshTopMargin`: the extension view was resized, so everything is restacked at once, unanimated. */
export const restack = (entries: StackEntry[], top: number) => {
    let position = top;

    for (const { item, runtime } of entries) {
        runtime.margin = position;
        runtime.targetMargin = position;
        position = runtime.margin + stackHeight(item, runtime) + NOTIFICATION_SPACING;
    }
};

/** `getVisibleCapacity`: how many default bubbles fit between the extension view and the bottom. */
const visibleCapacity = (top: number, screenHeight: number) => {
    const available = screenHeight - top;

    if (available <= 0) return 0;

    const height = NOTIFICATION_VIEWS.default.height ?? NOTIFICATION_MAX_HEIGHT;

    return Math.max(0, Math.floor((available + NOTIFICATION_SPACING) / (height + NOTIFICATION_SPACING)));
};

/** `getDuplicateFadeThreshold`: from this many bubbles up, a new one pushes an old one out. */
export const duplicateFadeThreshold = (top: number, screenHeight: number) => {
    const capacity = visibleCapacity(top, screenHeight);

    if (capacity <= 0) return Number.MAX_SAFE_INTEGER;

    return Math.max(4, capacity * 0.65);
};

export const countVisible = (entries: StackEntry[]) => entries.filter(({ runtime }) => !isReadyOrFading(runtime)).length;

const isDuplicateOf = (entry: StackEntry, item: NotificationItem) => !isReadyOrFading(entry.runtime) && (entry.item.style === item.style) && (entry.item.text === item.text) && !entry.item.options.stay;

/**
 * `findItemToReplace`: the bubble a new one pushes out. Flash collects the first duplicate of
 * the new item, then - walking the stack from the bottom up to its third bubble - the first
 * duplicate of each of those among the bubbles above it, and only when none of that finds
 * anything every bubble that is free to go; the topmost of what was collected is the one.
 */
export const findItemToReplace = (entries: StackEntry[], item: NotificationItem): StackEntry | undefined => {
    const found = new Set<StackEntry>();

    let subject = item;

    for (let index = entries.length - 1; ; index--) {
        const duplicate = entries.slice(0, index + 1).find(entry => isDuplicateOf(entry, subject));

        if (duplicate) found.add(duplicate);

        if (index < 2) break;

        subject = entries[index].item;
    }

    if (!found.size) {
        for (const entry of entries) {
            if (!isReadyOrFading(entry.runtime) && !entry.item.options.stay) found.add(entry);
        }
    }

    return entries.find(entry => found.has(entry));
};
