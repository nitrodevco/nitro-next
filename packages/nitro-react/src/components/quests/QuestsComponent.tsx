/** Mounts AS3 `QuestsList` and `QuestCompleted` in the Pixi window layer. */
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useQuestsStore } from '#base/context/quests';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { QuestCompletedView } from '#base/views/quests/QuestCompletedView';
import { QuestsView } from '#base/views/quests/QuestsView';

export const QuestsComponent = () => {
    const visible = useIsWindowVisible('quests');
    const { hideWindow } = useWindowActions();
    const { isAuthenticated, isDisconnected } = useWebSocketContext();
    const completed = useQuestsStore(x => x.completed);

    useEffect(() => {
        if (isAuthenticated && !isDisconnected) return;

        hideWindow('quests');
    }, [ isAuthenticated, isDisconnected, hideWindow ]);

    return (
        <>
            { visible && <QuestsView onClose={() => hideWindow('quests')} /> }
            { completed && (
                <QuestCompletedView
                    key={completed.id}
                    quest={completed}
                />
            ) }
        </>
    );
};
