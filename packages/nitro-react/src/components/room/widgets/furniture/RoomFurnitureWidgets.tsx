import { RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { ComponentType, createElement } from 'react';

import { useRoomContext, useRoomWidgetActions } from '#base/context';
import { useRoomEventDispatcher } from '#base/hooks';

import { FURNITURE_WIDGETS } from './furnitureWidgetRegistry';

/**
 * Hosts the furniture dialogs the room has open. Which of them that is comes from the request
 * store: a logic asks for a dialog, the request lands under its own type, and the widget
 * registered for that type is mounted to answer it.
 *
 * A widget serving two requests - the badge plaque answers both a badge display and a resolution
 * trophy - is mounted once however many of its requests are open, since it reads them itself.
 *
 * The one thing the host owns is the tear-down a logic can't announce: furniture removed from
 * the room (picked up, traded away, moved out from under you) takes its widgets with it.
 */
export const RoomFurnitureWidgets = () => {
    // Which widgets are open, as a string, so the host re-renders when that set changes rather
    // than every time a widget is handed a packet.
    const openTypes = useRoomContext(x => Object.keys(x.openWidgets).join(','));
    const { closeRoomWidgetsForObject } = useRoomWidgetActions();

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([
        RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED,
    ], (event) => {
        closeRoomWidgetsForObject(event.objectId, event.category);
    });

    const mounted = new Map<ComponentType, string>();

    for (const type of openTypes.split(',')) {
        const widget = FURNITURE_WIDGETS[type];

        if (widget && !mounted.has(widget)) mounted.set(widget, type);
    }

    return (
        <>
            {[ ...mounted ].map(([ widget, type ]) => createElement(widget, { key: type }))}
        </>
    );
};
