/**
 * The quest list's packets - Flash's `quest/IncomingMessages`: `onQuests` (`QuestsListEvent` to
 * `QuestsList.onQuests`) and `onRoomExit` (`QuestsList.onRoomExit` closes it), and `onQuest`,
 * `onQuestCancelled` and `onQuestCompleted` as `QuestController` hands them to the trackers, the
 * details and the completed dialog.
 */
import { CloseConnectionMessage, QuestCancelledMessage, QuestCompletedMessage, QuestMessage, QuestsMessage } from '@nitrodevco/nitro-packets';

import { onQuestCancelledMessage, onQuestCompletedMessage, onQuestMessage, onQuestRoomExit, onQuests } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerQuestHandlers = ({ subscribe, send }: WebSocketConnection) => {
    questsStore.getState().reset();

    return subscribeAll(subscribe, [
        on(QuestsMessage, data => onQuests(data.quests)),
        on(QuestMessage, data => onQuestMessage(data.quest)),
        on(QuestCancelledMessage, data => onQuestCancelledMessage(data.quest.chainCode)),
        on(QuestCompletedMessage, data => onQuestCompletedMessage(send, data.quest, data.showDialog)),
        on(CloseConnectionMessage, () => {
            systemStore.getState().hideWindow('quests');
            onQuestRoomExit();
        }),
    ]);
};
