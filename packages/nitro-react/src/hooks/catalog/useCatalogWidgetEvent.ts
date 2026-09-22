import { useEffect, useRef } from 'react';

import { CatalogPage, CatalogWidgetEventListener, CatalogWidgetEventType } from '#base/context/catalog';

/**
 * A catalogue widget's `events.addEventListener(type, handler)` from its `init()`: subscribes to
 * one widget event of the page for as long as the widget is mounted. The handler lives in a ref,
 * so the latest render's closure is the one called and callers need not memoise it.
 *
 * Call it at the top of the widget, before any early return: the subscription is made in a mount
 * effect, and React runs sibling effects in tree order, which is what keeps Flash's widget
 * initialisation order - each widget hears what the widgets after it dispatch while they
 * initialise, and `CatalogPageView` dispatches `WIDGETS_INITIALIZED` after all of them.
 */
export const useCatalogWidgetEvent = <T extends CatalogWidgetEventType>(page: CatalogPage, type: T, handler: CatalogWidgetEventListener<T>) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => page.events.addEventListener(type, event => handlerRef.current(event)), [ page, type ]);
};
