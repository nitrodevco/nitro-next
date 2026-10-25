import { useEffect, useState } from 'react';

import { autoPickModerationBundle, closeModerationIssues, closeModerationIssueWithDefaultAction, forwardToModeratedRoom, releaseModerationBundle, requestCfhChatlog, requestModeratorUserInfo, requestSanctionData, saveModerationToolPreferences } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useHelpStore } from '#base/context/help';
import { highestPriorityIssue, ISSUE_RESOLUTION_RESOLVED, ISSUE_RESOLUTION_USELESS, issueOpenTime, MOD_CHATLOG_CFH, moderationChatlogKey, useModerationActions, useModerationIssueActions, useModerationIssueStore, useModerationStore } from '#base/context/moderation';
import { useWindowActions } from '#base/context/system';
import { useClock } from '#base/hooks';
import { findTemplateChild, TemplateItem, TemplateWindow, useLatest, useTemplate } from '#base/theme';

import { chatlogItems, useChatlogArrange } from './chatlogItems';
import { issueCategoryName, issueSourceName } from './issueNames';
import { userInfoBindings, userInfoButtons } from './userInfoBindings';

const TEMPLATE = 'habbo-moderation-com/issue_handler_xml';

/** `issue_handler.xml`'s frame: 750 wide (`width_min` = `width_max`), 650 tall. */
const HANDLER_SIZE = { width: 750, height: 650 };

/** `IssueHandler.update`: the window's place is sent only 5 s after it opened, once it changed. */
const PREFERENCES_DELAY_MS = 5000;

/**
 * Flash's `moderation/IssueHandler`: the `issue_handler` frame for a bundle this moderator handles,
 * where they last left one (`ModeratorToolPreferences`). The bundle's issues (reporter, topic,
 * source, open time; the highest priority one bold when there are more) and their messages
 * ("reporter: message"), the caller's and the reported player's user info (`UserInfoCtrl`, the
 * reported one taken out when the bundle names no one), and the call's chat
 * (`GetCfhChatlogMessageComposer` -> "Call For Help Evidence"). Close as useless (1) or resolved (3)
 * (`CloseIssuesMessageComposer`), close with the default sanction (`CloseIssueDefaultActionMessageComposer`:
 * the highest priority issue, the rest, -1) or release; then, with "Automatically open next issue"
 * ticked (it starts ticked), the next open bundle is picked (`checkAutoHandling`). The topic menu lists
 * every call for help topic as `help.cfh.topic.<id>` (`initializeTopicDropdown`), on the issue's own
 * (disabled for 27, "Useless reports"); opening and every topic picked ask the default sanction
 * (`ModToolSanctionComposer`), shown as `sanction_label` once `CfhSanction` comes. An issue still on
 * topic 28 ("Auto-triggered") cannot be closed with the sanction ("Topic missing").
 */
export const ModIssueHandlerView = ({ bundleId }: { bundleId: number }) => {
    const { send } = useWebSocketContext();
    const bundle = useModerationIssueStore(x => x.snapshot.find(b => b.id === bundleId));
    const preferences = useModerationIssueStore(x => x.preferences);
    const preferencesRef = useLatest(preferences);
    const { removeHandler } = useModerationIssueActions();
    const { showWindow, moveWindow, placeFrame } = useModerationActions();
    // The rect the windows its user infos and evidence open go beside (`WindowTracker.show(window, _window)`).
    const callerKey = `issueHandler:${bundleId}`;
    const { showSimpleAlert } = useWindowActions();
    const template = useTemplate(TEMPLATE);
    const evidenceTemplate = useTemplate('habbo-moderation-com/evidence_frame_xml');
    const userInfoTemplate = useTemplate('habbo-moderation-com/user_info_xml');
    const [ handleNext, setHandleNext ] = useState(true);
    const [ openedAt ] = useState(() => performance.now());
    const issue = bundle && highestPriorityIssue(bundle);
    const issueId = issue?.issueId ?? 0;
    const reporterId = issue?.reporterUserId ?? 0;
    const reportedId = bundle?.reportedUserId ?? 0;
    const chatlog = useModerationStore(x => x.chatlogs[moderationChatlogKey(MOD_CHATLOG_CFH, issueId)]);
    const caller = useModerationStore(x => x.userInfos[reporterId]);
    const reported = useModerationStore(x => x.userInfos[reportedId]);
    const categories = useHelpStore(x => x.callForHelpCategories);
    const sanctionLabel = useModerationIssueStore(x => x.sanctionTexts[bundleId]);
    const issueTopic = issue?.reportedCategoryId ?? 0;
    // `initializeTopicDropdown`: every topic of every category, in order; the issue's own selected.
    const topicIds = categories.flatMap(category => category.topics.map(topic => topic.id));
    // `show`: an automatic report (source 3) still on topic 28 starts on topic 1.
    const autoTriggered = (issue?.categoryId === 3) && (issueTopic === 28);
    const [ topicSelection, setTopicSelection ] = useState<number | undefined>(undefined);
    const evidenceArrange = useChatlogArrange();
    const selectedTopic = topicSelection ?? topicIds.indexOf(autoTriggered ? 1 : issueTopic);

    // `show`: requestSanctionData(bundle, -1), then topic 1 for an automatic report on 28.
    useEffect(() => {
        if (!issueId) return;

        requestSanctionData(send, issueId, -1, -1);

        if (autoTriggered) requestSanctionData(send, issueId, -1, 1);
    }, [ send, issueId, autoTriggered ]);
    const [ frame ] = useState(() => ({
        id: `moderation-issue-handler-${bundleId}`,
        defaultPosition: { x: preferences.x, y: preferences.y },
        rememberPosition: false,
        onPositionChange: (position: { x: number; y: number }) => {
            const current = preferencesRef.current;

            moveWindow(callerKey, position);

            if ((performance.now() - openedAt) <= PREFERENCES_DELAY_MS) return;
            if ((position.x === current.x) && (position.y === current.y)) return;

            const next = { ...current, x: position.x, y: position.y };

            saveModerationToolPreferences(send, next);
        },
        onClose: () => removeHandler(bundleId),
    }));

    // Placed where it opens; drags move it (onPositionChange).
    useEffect(() => {
        placeFrame(callerKey, { x: preferencesRef.current.x, y: preferencesRef.current.y, ...HANDLER_SIZE });
    }, [ placeFrame, callerKey, preferencesRef ]);

    // `registerUpdateReceiver(this, 1000)`: the open times move on each second.
    const now = useClock('monotonic', 1000);

    useEffect(() => {
        if (issueId) requestCfhChatlog(send, issueId);
    }, [ send, issueId ]);

    useEffect(() => {
        if (reporterId) requestModeratorUserInfo(send, reporterId);
        if (reportedId) requestModeratorUserInfo(send, reportedId);
    }, [ send, reporterId, reportedId ]);

    if (!template || !bundle || !issue) return null;

    const ids = [ ...bundle.issues.keys() ];
    const list = (name: string) => findTemplateChild(template.elements, name)?.children[0];
    const issueRow = list('issues_item_list');
    const messageRow = list('msg_item_list');
    const evidence = evidenceTemplate && findTemplateChild(evidenceTemplate.elements, 'evidence_list');
    const [ header, line ] = evidence?.children ?? [];

    // `checkAutoHandling` then `dispose`.
    const done = () => {
        if (handleNext) autoPickModerationBundle(send, 'issue handler pick next');

        removeHandler(bundleId);
    };

    const issueItems: TemplateItem[] = issueRow
        ? [ ...bundle.issues.values() ].map((item, index) => ({
                key: `i${item.issueId}`,
                from: issueRow,
                bindings: {
                    '': { background: (index % 2) === 0 },
                    reporter: { caption: item.reporterUserName },
                    type: { caption: issueSourceName(item.categoryId) },
                    category: { caption: issueCategoryName(item.reportedCategoryId), style: ((item.issueId === issueId) && (bundle.issues.size > 1)) ? 'bold' : undefined },
                    time_open: { caption: issueOpenTime(item, now) },
                },
            }))
        : [];
    const messageItems: TemplateItem[] = messageRow
        ? [ ...bundle.issues.values() ].map((item, index) => ({
                key: `m${item.issueId}`,
                from: messageRow,
                bindings: { '': { caption: `${item.reporterUserName}: ${item.message}`, background: (index % 2) === 0 } },
            }))
        : [];
    // `IssueHandler.show`: both `UserInfoCtrl`s hold the highest priority issue; their tools open beside the handler.
    const userInfo = (user: Parameters<typeof userInfoBindings>[0]) => (userInfoTemplate ? [ { key: 'user_info', from: userInfoTemplate, bindings: { ...userInfoBindings(user), ...userInfoButtons(user, showWindow, callerKey, false, issueId || undefined) } } ] : []);

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                ...evidenceArrange.bindings,
                issues_item_list: { items: issueItems },
                msg_item_list: { items: messageItems },
                caller_user_info: { items: userInfo(caller) },
                reported_user_info: reportedId ? { items: userInfo(reported) } : { visible: false },
                reported_user_info_caption: { visible: reportedId > 0 },
                evidence_list: { items: (chatlog && header && line) ? chatlogItems(chatlog.records, header, line, callerKey, showWindow, roomId => forwardToModeratedRoom(send, roomId), issueId || undefined) : [] },
                handle_next_checkbox: { selected: handleNext, onPointerTap: () => setHandleNext(!handleNext) },
                close_useless: {
                    onPointerTap: () => {
                        closeModerationIssues(send, ids, ISSUE_RESOLUTION_USELESS);
                        done();
                    },
                },
                close_resolved: {
                    onPointerTap: () => {
                        closeModerationIssues(send, ids, ISSUE_RESOLUTION_RESOLVED);
                        done();
                    },
                },
                close_sanction: {
                    onPointerTap: () => {
                        if (issueTopic === 28) {
                            showSimpleAlert({ caption: 'Topic missing', message: 'You need to select the topic first.' });

                            return;
                        }

                        closeModerationIssueWithDefaultAction(send, issueId, ids);
                        done();
                    },
                },
                cfh_topics: (issueTopic === 27)
                    ? { disabled: true }
                    : {
                            options: topicIds.map(id => `\${help.cfh.topic.${id}}`),
                            selection: (selectedTopic >= 0) ? selectedTopic : undefined,
                            // `refreshSanctionDataForSelectedTopic`.
                            onSelect: (index: number) => {
                                setTopicSelection(index);
                                requestSanctionData(send, issueId, -1, topicIds[index]);
                            },
                        },
                sanction_label: (sanctionLabel !== undefined) ? { caption: sanctionLabel } : {},
                release: {
                    onPointerTap: () => {
                        releaseModerationBundle(send, bundleId);
                        done();
                    },
                },
            }}
            arrange={evidenceArrange.arrange}
        />
    );
};
