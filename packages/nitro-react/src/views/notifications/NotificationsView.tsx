import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { NotificationLayoutName, useNotificationActions, useNotificationStore } from '#base/context/notifications';
import { useWindowActions, useWindowZIndex } from '#base/context/system';
import { useViewportSize } from '#base/hooks';

import { NotificationFrame, NotificationsBubble } from './NotificationsBubble';
import {
    countVisible, createRuntime, duplicateFadeThreshold, findItemToReplace, isReadyOrFading, isSpaceAvailable, nextAvailablePosition, NOTIFICATION_SPACING,
    restack, StackEntry, startPhase, updateRuntime, updateVerticalTargets,
} from './notificationStack';

/** The bubbles share one place in the window order: a new one comes up over the open windows, a window clicked after it goes over them. */
const STACK_ID = 'notifications';

/** Each layout's window height as built, until the bubble has been laid out and measured. */
const LAYOUT_HEIGHTS: Record<NotificationLayoutName, number> = { default: 66, friendonline: 58, treasure_hunt: 87, wired: 60 };

const sameFrames = (a: Record<number, NotificationFrame>, b: Record<number, NotificationFrame>) => {
    const keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) return false;

    return keys.every((key) => {
        const left = a[Number(key)];
        const right = b[Number(key)];

        return !!right && (left.margin === right.margin) && (left.swipe === right.swipe) && (left.blend === right.blend);
    });
};

/**
 * The notification bubbles, stacked from the top right under the purse - Flash's
 * `HabboNotificationViewManager` with the `SingularNotificationController.update` that feeds it.
 * Once a frame, while anything is queued or up: the next queued item is shown if a bubble still
 * fits above the bottom of the screen (pushing an old one out when the stack is crowded), the
 * bubbles that are staying close ranks, and each runs its own fade in / display / fade out
 * (`notificationStack.ts`). The per-frame state lives in a ref and reaches the bubbles as plain
 * `x` / `y` / `alpha` props, only on a frame where something moved.
 *
 * Mounted once, in `MainView`'s window layer; `NotificationsExtensionAnchor` tells it where the
 * purse column ends.
 */
export const NotificationsView = () => {
    const queueLength = useNotificationStore(x => x.queue.length);
    const visible = useNotificationStore(x => x.visible);
    const extensionHeight = useNotificationStore(x => x.extensionHeight);
    const { showNextNotification, dismissNotification, finishNotification } = useNotificationActions();
    const { bringWindowToFront } = useWindowActions();
    const zIndex = useWindowZIndex(STACK_ID);
    const { height: screenHeight } = useViewportSize();
    const { send } = useWebSocketContext();
    const [ frames, setFrames ] = useState<Record<number, NotificationFrame>>({});

    /** `_viewItems`, sorted by where each bubble was put when it was shown. */
    const entries = useRef<StackEntry[]>([]);
    const lastTop = useRef(0);

    const findEntry = (key: number) => entries.current.find(entry => entry.item.key === key);

    /** `startFadeOut`, told to the store so the bubble gives up its id and its place. */
    const fadeOut = (entry: StackEntry) => {
        entry.runtime.hovering = false;

        startPhase(entry.runtime, 'fade_out');
        dismissNotification(entry.item.key);
    };

    const tick = (deltaMs: number) => {
        const list = entries.current;
        const top = extensionHeight + NOTIFICATION_SPACING;

        // The store replaces an item when it marks it fading; a new item may be a render ahead of `visible`.
        for (const entry of list) entry.item = visible.find(item => item.key === entry.item.key) ?? entry.item;

        // `refreshTopMargin`.
        if (top !== lastTop.current) {
            lastTop.current = top;

            restack(list, top);
        }

        // `SingularNotificationController.update` + `showItem`.
        if ((queueLength > 0) && isSpaceAvailable(list, top, screenHeight)) {
            const item = showNextNotification();

            if (item) {
                if (countVisible(list) >= duplicateFadeThreshold(top, screenHeight)) {
                    const replaced = findItemToReplace(list, item);

                    if (replaced) fadeOut(replaced);
                }

                list.push({ item, runtime: createRuntime(item.key, nextAvailablePosition(list, top), LAYOUT_HEIGHTS[item.layout]) });
                list.sort((a, b) => a.runtime.margin - b.runtime.margin);

                bringWindowToFront(STACK_ID);
            }
        }

        // `HabboNotificationViewManager.update`.
        updateVerticalTargets(list, top);

        for (const entry of list) {
            // `remove()`, asked for through the store by `removeNotificationById`.
            if (entry.item.fading && !isReadyOrFading(entry.runtime)) fadeOut(entry);

            if (updateRuntime(entry.runtime, entry.item, deltaMs)) dismissNotification(entry.item.key);
        }

        entries.current = list.filter((entry) => {
            if (entry.runtime.phase !== 'idle') return true;

            finishNotification(entry.item.key);

            return false;
        });

        const next: Record<number, NotificationFrame> = {};

        for (const { runtime } of entries.current) next[runtime.key] = { margin: runtime.margin, swipe: runtime.swipe, blend: runtime.blend };

        setFrames(previous => (sameFrames(previous, next) ? previous : next));
    };

    const tickRef = useRef(tick);

    useEffect(() => {
        tickRef.current = tick;
    });

    const active = (queueLength > 0) || (visible.length > 0);

    useEffect(() => {
        if (!active) return;

        const listener = (ticker: Ticker) => tickRef.current(ticker.deltaMS);

        GetTicker().add(listener);

        return () => {
            GetTicker().remove(listener);
        };
    }, [ active ]);

    /** `HabboNotificationItemView.onWindowEvent`, WME_CLICK. */
    const click = (key: number) => {
        const entry = findEntry(key);

        if (!entry) return;

        // `HabboNotificationItem.ExecuteUiLinks`.
        if (entry.item.internalLink) openClientLink(send, entry.item.internalLink);

        if (!entry.item.options.stay) fadeOut(entry);
    };

    /** WME_CLICK on `slide_notification_away`. */
    const swipe = (key: number) => {
        const entry = findEntry(key);

        if (entry && !entry.item.options.stay) startPhase(entry.runtime, 'swipe_out');
    };

    const setHovering = (key: number, hovering: boolean) => {
        const entry = findEntry(key);

        if (entry) entry.runtime.hovering = hovering;
    };

    const setMeasuredHeight = (key: number, height: number) => {
        const entry = findEntry(key);

        if (entry && (height > 0)) entry.runtime.measuredHeight = height;
    };

    return (
        <>
            {visible.map(item => (
                <NotificationsBubble
                    key={item.key}
                    item={item}
                    frame={frames[item.key]}
                    zIndex={zIndex}
                    onHover={hovering => setHovering(item.key, hovering)}
                    onClick={() => click(item.key)}
                    onSwipe={() => swipe(item.key)}
                    isDisplayed={() => findEntry(item.key)?.runtime.phase === 'display'}
                    onMeasure={height => setMeasuredHeight(item.key, height)}
                />
            ))}
        </>
    );
};
