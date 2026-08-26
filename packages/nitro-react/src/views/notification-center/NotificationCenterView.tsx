import { useEffect, useRef } from "react";

import { useNotificationActions, useNotificationIds } from "#base/context/notification";

import { NotificationItemView } from "./NotificationItemView";

export const NotificationCenterView = () => {
    const notificationIds = useNotificationIds();
    const { setNotificationContainerHeight } = useNotificationActions();

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = containerRef.current;

        if (!element) return;

        const measure = () => setNotificationContainerHeight(Math.max(0, window.innerHeight - element.getBoundingClientRect().top));

        measure();

        const observer = new ResizeObserver(measure);

        if (element.parentElement) observer.observe(element.parentElement);

        window.addEventListener('resize', measure);

        return () => {
            observer.disconnect();

            window.removeEventListener('resize', measure);
        };
    }, [setNotificationContainerHeight]);

    return (
        <div ref={ containerRef } className="flex flex-col items-end gap-1 w-full pointer-events-none mt-0.5">
            { notificationIds.map(id => <NotificationItemView key={ id } id={ id } />) }
        </div>
    );
}
