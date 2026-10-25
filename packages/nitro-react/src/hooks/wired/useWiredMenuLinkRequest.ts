/**
 * Acts on the `wired_menu` window's params once the menu is up (`routeWiredMenuLink`, the second
 * half of `WiredMenuController.linkReceived`) and clears them, the way `useCatalogPageRequest`
 * does it. Called by the menu's view after its own effects, so the tab a link lands on is being
 * viewed when the link is routed into it.
 */
import { useEffect } from 'react';

import { routeWiredMenuLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWindowActions, useWindowParams } from '#base/context/system';

export const useWiredMenuLinkRequest = () => {
    const { send } = useWebSocketContext();
    const { tab, inspect, variableName, logs } = useWindowParams('wired_menu');
    const { updateWindowParams } = useWindowActions();

    useEffect(() => {
        if ((tab === undefined) && !inspect && (variableName === undefined) && !logs) return;

        routeWiredMenuLink(send, { tab, inspect, variableName, logs });

        updateWindowParams('wired_menu', { tab: undefined, inspect: undefined, variableName: undefined, logs: undefined });
    }, [ tab, inspect, variableName, logs, send, updateWindowParams ]);
};
