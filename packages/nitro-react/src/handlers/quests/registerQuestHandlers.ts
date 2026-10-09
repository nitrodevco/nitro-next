/**
 * The quest list's packets - Flash's `quest/IncomingMessages`: `onQuests` (`QuestsListEvent` to
 * `QuestsList.onQuests`) and `onRoomExit` (`QuestsList.onRoomExit` closes it), and `onQuest`,
 * `onQuestCancelled` and `onQuestCompleted` as `QuestCompleted` takes them (its dialog). The quest
 * tracker and details those packets also feed are not ported.
 */
import { CloseConnectionMessage, QuestCancelledMessage, QuestCompletedMessage, QuestMessage, QuestsMessage } from '@nitrodevco/nitro-packets';

import { closeQuestCompleted, onQuestCompleted, onQuests } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerQuestHandlers = ({ subscribe }: WebSocketConnection) => {
    questsStore.getState().reset();

    return subscribeAll(subscribe, [
        on(QuestsMessage, data => onQuests(data.quests)),
        on(QuestMessage, () => closeQuestCompleted()),
        on(QuestCancelledMessage, () => closeQuestCompleted()),
        on(QuestCompletedMessage, data => onQuestCompleted(data.quest, data.showDialog)),
        on(CloseConnectionMessage, () => systemStore.getState().hideWindow('quests')),
    ]);
};
