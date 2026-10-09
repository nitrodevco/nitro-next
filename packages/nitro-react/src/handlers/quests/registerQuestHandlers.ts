/**
 * The quest list's packets - Flash's `quest/IncomingMessages`: `onQuests` (`QuestsListEvent` to
 * `QuestsList.onQuests`) and `onRoomExit` (`QuestsList.onRoomExit` closes it). The quest tracker,
 * details and completion views the other quest packets feed are not ported.
 */
import { CloseConnectionMessage, QuestsMessage } from '@nitrodevco/nitro-packets';

import { onQuests } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerQuestHandlers = ({ subscribe }: WebSocketConnection) => {
    questsStore.getState().reset();

    return subscribeAll(subscribe, [
        on(QuestsMessage, data => onQuests(data.quests)),
        on(CloseConnectionMessage, () => systemStore.getState().hideWindow('quests')),
    ]);
};
