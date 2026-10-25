/**
 * The quest list's packets - Flash's `quest/IncomingMessages`: `onQuests` (`QuestsListEvent` to
 * `QuestsList.onQuests`) and `onRoomExit` (`QuestsList.onRoomExit` closes it), and `onQuest`,
 * `onQuestCancelled` and `onQuestCompleted` as `QuestController` hands them to the trackers, the
 * details and the completed dialog. Also `CitizenshipVipQuestsPromoExtension`'s one message event,
 * which docks the toolbar's VIP quests promo.
 *
 * `RoomCompetitionController.onRoomEnter` asks for the room's competition on every room entry
 * (`RoomEntryInfoMessageEvent`), unless the new identity hides the UI (`new.identity` not 0 with
 * `new.identity.hide.ui`); `onSubscriptionUserInfoEvent` asks again when a VIP subscription answer
 * has response type 2.
 */
import { CitizenshipVipOfferPromoEnabledMessage, CloseConnectionMessage, QuestCancelledMessage, QuestCompletedMessage, QuestMessage, QuestsMessage, RoomCompetitionInitComposer, RoomEntryInfoMessage, ScrSendUserInfoMessage } from '@nitrodevco/nitro-packets';

import { onCitizenshipVipQuestsPromoEnabled, onQuestCancelledMessage, onQuestCompletedMessage, onQuestMessage, onQuestRoomExit, onQuests } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { configBoolean, configInteger, systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerQuestHandlers = ({ subscribe, send }: WebSocketConnection) => {
    questsStore.getState().reset();

    return subscribeAll(subscribe, [
        on(QuestsMessage, data => onQuests(data.quests)),
        on(QuestMessage, data => onQuestMessage(data.quest)),
        on(QuestCancelledMessage, data => onQuestCancelledMessage(data.quest.chainCode, data.expired)),
        on(QuestCompletedMessage, data => onQuestCompletedMessage(send, data.quest, data.showDialog)),
        on(CitizenshipVipOfferPromoEnabledMessage, () => onCitizenshipVipQuestsPromoEnabled()),
        on(RoomEntryInfoMessage, () => {
            const showsUi = (configInteger('new.identity', 0) <= 0) || !configBoolean('new.identity.hide.ui');

            if (showsUi) send(new RoomCompetitionInitComposer({}));
        }),
        on(ScrSendUserInfoMessage, (data) => {
            if (data.isVIP && (data.responseType === 2)) send(new RoomCompetitionInitComposer({}));
        }),
        on(CloseConnectionMessage, () => {
            systemStore.getState().hideWindow('quests');
            onQuestRoomExit();
        }),
    ]);
};
