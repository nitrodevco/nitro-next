import { INotificationItem, NotificationPhaseEnum } from "@nitrodevco/nitro-api";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect } from "react";

import { useNotificationActions } from "#base/context/notification";

import { getNotificationHeight } from "./NotificationViewConfigs";

export type NotificationPhaseOptions = {
    timeFadeIn?: number;
    timeDisplay?: number;
    timeFadeOut?: number;
    timeSwipeOut?: number;
    distanceSwipeOut?: number;
}

export const useNotificationPhase = (notification: INotificationItem, {
    timeFadeIn = 1000,
    timeDisplay = 15000,
    timeFadeOut = 1000,
    timeSwipeOut = 300,
    distanceSwipeOut = 340
}: NotificationPhaseOptions = {}) => {
    const { id, phase } = notification;

    const { setNotificationPhase, setNotificationHovering, expireNotification, clickNotification, removeNotification } = useNotificationActions();

    useEffect(() => {
        switch (phase) {
            case NotificationPhaseEnum.FadeIn: {
                const timeout = window.setTimeout(() => setNotificationPhase(id, NotificationPhaseEnum.Display), timeFadeIn);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.Display: {
                const timeout = window.setTimeout(() => expireNotification(id), timeDisplay);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.FadeOut: {
                const timeout = window.setTimeout(() => removeNotification(id), timeFadeOut);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.SwipeOut: {
                const timeout = window.setTimeout(() => removeNotification(id), timeSwipeOut);

                return () => window.clearTimeout(timeout);
            }
            default:
                return;
        }
    }, [id, phase, timeFadeIn, timeDisplay, timeFadeOut, timeSwipeOut, setNotificationPhase, expireNotification, removeNotification]);

    const isVisible = phase !== NotificationPhaseEnum.Idle && phase !== NotificationPhaseEnum.FadeIn;
    const isSwiping = phase === NotificationPhaseEnum.SwipeOut;
    const isFadingOut = phase === NotificationPhaseEnum.FadeOut;

    const style: CSSProperties = {
        minHeight: getNotificationHeight(notification.styleName),
        opacity: (isVisible && !isFadingOut) ? 1 : 0,
        transform: isSwiping ? `translateX(${ distanceSwipeOut }px)` : undefined,
        transitionDuration: `${ isSwiping ? timeSwipeOut : (isFadingOut ? timeFadeOut : timeFadeIn) }ms`
    };

    const onClick = (event: MouseEvent<HTMLElement>) => {
        const slideAway = !!(event.target as HTMLElement | null)?.closest('[data-slide-away]');

        clickNotification(id, slideAway);
    }

    return {
        style,
        onClick,
        onMouseEnter: () => setNotificationHovering(id, true),
        onMouseLeave: () => setNotificationHovering(id, false)
    };
}
