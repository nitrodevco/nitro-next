/** Mounts AS3 AchievementController in the Pixi window layer. */
import { useEffect } from 'react';

import { useAchievementsActions } from '#base/context/achievements';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { AchievementsView } from '#base/views/achievements/AchievementsView';

export const AchievementsComponent = () => {
    const visible = useIsWindowVisible('achievements');
    const { hideWindow } = useWindowActions();
    const { close, reset } = useAchievementsActions();
    const { isAuthenticated, isDisconnected } = useWebSocketContext();

    useEffect(() => {
        if (isAuthenticated && !isDisconnected) return;

        reset();
        hideWindow('achievements');
    }, [ isAuthenticated, isDisconnected, reset, hideWindow ]);

    if (!visible) return null;

    return (
        <AchievementsView onClose={() => {
            close();
            hideWindow('achievements');
        }}
        />
    );
};
