import { useEffect } from 'react';

import { syncNavigatorWindowPreferences } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

/** `registerUpdateReceiver(this, 1000)`: `NavigatorView.update`'s period. */
const UPDATE_INTERVAL_MS = 1000;

/**
 * `NavigatorView.update`'s preference sync, ticking whether the window is up or not - Flash
 * registers the receiver when it creates the window and keeps it while the window is hidden, so a
 * move made just before closing still reaches the server. Nothing is sent before the window has
 * been created once (`syncNavigatorWindowPreferences` waits for its geometry).
 */
export const useNavigatorWindowPreferencesSync = () => {
    const { send } = useWebSocketContext();

    useEffect(() => {
        const timer = setInterval(() => syncNavigatorWindowPreferences(send), UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [ send ]);
};
