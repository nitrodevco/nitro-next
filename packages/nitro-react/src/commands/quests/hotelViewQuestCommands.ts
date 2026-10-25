/**
 * What the reception's quest-package widgets send when clicked: the daily quest's
 * (`DailyQuestWidget` and `DailyQuestElementHandler` - another quest, a difficulty, accept and
 * cancel), the concurrent users goal's reward (`ConcurrentUsersInfoElementHandler.onClick`) and the
 * hall of fame's room link (`CommunityGoalHallOfFameWidget.extraLinkClicked`).
 */
import { ActivateQuestComposer, CancelQuestComposer, ForwardToACompetitionRoomComposer, GetConcurrentUsersGoalProgressComposer, GetConcurrentUsersRewardComposer, GetDailyQuestComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';

/** `sendGetDailyQuest`: the `index`th daily quest of a difficulty. */
export const requestDailyQuest = (send: Send, easy: boolean, index: number) => send(new GetDailyQuestComposer({ easy, index }));

/** `onAcceptButton`: the offered quest, accepted outside a room (`ActivateQuestMessageComposer`). */
export const activateDailyQuest = (send: Send, questId: number) => send(new ActivateQuestComposer({ questId }));

/** `onCancelQuest`: the accepted quest given up. */
export const cancelDailyQuest = (send: Send) => send(new CancelQuestComposer({}));

/** `ConcurrentUsersInfoElementHandler.onClick`: the reward, then the progress again. */
export const redeemConcurrentUsersReward = (send: Send) => {
    send(new GetConcurrentUsersRewardComposer({}));
    send(new GetConcurrentUsersGoalProgressComposer({}));
};

/** `CommunityGoalHallOfFameWidget.extraLinkClicked`: the leader's competition room. */
export const goToHallOfFameRoom = (send: Send, goalCode: string, userId: number) => send(new ForwardToACompetitionRoomComposer({ goalCode, userId }));
