/**
 * The call for help queue's listeners (1318 AS3 `moderation/ModerationMessageHandler.as`) and the
 * reporter's close notice (`help/CallForHelpManager.as`):
 * - `onModeratorInit` (:93-99): each of the init's issues into the `IssueManager`;
 * - `onIssueInfo` (:64-78): an issue new or changed, with `HBST_call_for_help` for a new one while the
 *   issue browser is closed (`IssueManager.playSound`, :178-188);
 * - `onModeratorToolPreferences` (:104-112): where an issue handler opens;
 * - `onIssuePickFailed` (:114-150): the bundles not got are released; when another moderator holds
 *   one and retry is on, the next is picked (under 10 tries), else "Issue picking failed";
 * - `onIssueDeleted` (:152-164): an issue gone;
 * - `onCfhChatlog` (:186-195): "Call For Help Evidence #id" for the issue handler's chat;
 * - `onRoomVisits` (:223-232): a player's room visits;
 * - `onSanctions`: the default sanction an issue's reported player would get (`IssueManager.updateSanctionData`);
 * - `CallForHelpManager.onIssueClose` (:670-679): the reporter's alert, the server's text or
 *   `help.cfh.closed.useless` / `abusive` / `resolved`.
 */
import { CfhChatlogMessage, CfhSanctionMessage, IssueCloseNotificationMessage, IssueDeletedMessage, IssueInfoMessage, IssuePickFailedMessage, ModeratorInitMessage, ModeratorToolPreferencesMessage, RoomVisitsMessage } from '@nitrodevco/nitro-packets';

import { moderationIssueSends } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { MOD_CHATLOG_CFH, moderationIssueStore, moderationStore } from '#base/context/moderation';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';

import { on, subscribeAll } from '../packetSubscriptions';

const issues = () => moderationIssueStore.getState();
const userId = () => userStore.getState().userId;

/** `CallForHelpManager.getCloseReasonKey`. */
const closeReasonKey = (reason: number) => ((reason === 1) ? 'useless' : ((reason === 2) ? 'abusive' : 'resolved'));

export const registerModerationIssueHandlers = ({ subscribe, send }: WebSocketConnection) => {
    const sends = moderationIssueSends(send);

    return subscribeAll(subscribe, [
        on(ModeratorInitMessage, (data) => {
            for (const issue of data.issues) issues().updateIssue(issue, userId(), sends);
        }),
        on(IssueInfoMessage, (data) => {
            // `IssueManager.playSound`: a new issue rings while the issue browser is closed.
            if (!issues().issues.has(data.issueData.issueId) && !issues().browserOpen) GetSoundManager().playSound(HabboSoundTypesEnum.SOUND_CALL_FOR_HELP);

            issues().updateIssue(data.issueData, userId(), sends);
        }),
        on(ModeratorToolPreferencesMessage, data => issues().setPreferences({ x: data.windowX, y: data.windowY, width: data.windowWidth, height: data.windowHeight })),
        on(IssuePickFailedMessage, (data) => {
            const pickedAlready = issues().issuePickFailed(data.issues, userId(), sends);

            if (pickedAlready && data.retryEnabled && (data.retryCount < 10)) {
                issues().autoPick('pick failed retry', sends, data.retryEnabled, data.retryCount);

                return;
            }

            systemStore.getState().showSimpleAlert({ caption: 'Error', message: 'Issue picking failed' });
        }),
        on(IssueDeletedMessage, data => issues().removeIssue(data.issueId)),
        on(CfhChatlogMessage, data => moderationStore.getState().setChatlog(MOD_CHATLOG_CFH, data.data.callId, { caption: `Call For Help Evidence #${data.data.chatRecordId}`, records: [ data.data.chatRecord ] })),
        on(RoomVisitsMessage, data => moderationStore.getState().setRoomVisits(data.data)),
        on(CfhSanctionMessage, data => issues().updateSanctionData(data.issueId, data.accountId, data.sanctionType)),
        on(IssueCloseNotificationMessage, data => systemStore.getState().showSimpleAlert({ caption: '${mod.alert.title}', message: data.messageText || `\${help.cfh.closed.${closeReasonKey(data.closeReason)}}` })),
    ]);
};
