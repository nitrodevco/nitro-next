/** Mounts AS3 `QuestsList` in the Pixi window layer. */
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { QuestsView } from '#base/views/quests/QuestsView';

export const QuestsComponent = () => {
    const visible = useIsWindowVisible('quests');
    const { hideWindow } = useWindowActions();
    const { isAuthenticated, isDisconnected } = useWebSocketContext();

    useEffect(() => {
        if (isAuthenticated && !isDisconnected) return;

        hideWindow('quests');
    }, [ isAuthenticated, isDisconnected, hideWindow ]);

    if (!visible) return null;

    return <QuestsView onClose={() => hideWindow('quests')} />;
};
