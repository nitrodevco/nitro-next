import { useState } from 'react';

import { autoPickModerationBundle, pickModerationBundle, releaseAllModerationBundles, releaseModerationBundle } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { bundleHighestPriority, bundleMessageCount, bundleOpenTime, bundlesOfTab, highestPriorityIssue, IssueBundleTab, useModerationIssueActions, useModerationIssueStore } from '#base/context/moderation';
import { useUserStore } from '#base/context/user';
import { useClock } from '#base/hooks';
import { findTemplateChild, LayoutImage, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';

import { issueCategoryName, issueSourceName } from './issueNames';

const TEMPLATE = 'habbo-moderation-com/issue_browser_xml';

const TABS: IssueBundleTab[] = [ 'open_issues', 'my_issues', 'picked_issues' ];

/** `IssueListView.update`'s alternating row colours (`4289914618`, `4294967295`), the first row the shaded one. */
const ROW_COLORS = [ 0xFFB2E6FA, 0xFFFFFFFF ];

/** `IssueBrowser`'s 15 s timer (`IssueManager.PRIORITY_UPDATE_INTERVAL_MS`): the open times move on. */
const UPDATE_INTERVAL_MS = 15000;

/** `IssueManager.issueListLimit`: `max.call_for_help.results`, 200 by default. */
const LIST_LIMIT = 200;

/**
 * Flash's `moderation/IssueBrowser`: the `issue_browser` frame the start panel's ticket queue opens
 * (`IssueManager.init`), centred, with three tabs (`OpenIssuesView`, `MyIssuesView`,
 * `PickedIssuesView`), open first. Each lists its bundles (`IssueListView.update`) by priority then
 * age, at most 200: score, topic, source, reported player, open time, and pick (open), handle and
 * release plus the message count (mine, with "release all"), or the picker (others'). "Give me the
 * next priority issue" picks the next open bundle (`autoPick`).
 */
export const ModIssueBrowserView = () => {
    const { send } = useWebSocketContext();
    const userId = useUserStore(x => x.userId);
    const tab = useModerationIssueStore(x => x.browserTab);
    const snapshot = useModerationIssueStore(x => x.snapshot);
    const { showBrowser, setBrowserTab, handleBundle } = useModerationIssueActions();
    const template = useTemplate(TEMPLATE);
    const now = useClock('monotonic', UPDATE_INTERVAL_MS);
    // `createMainFrame`: centred on the desktop.
    const [ frame ] = useState(() => ({
        id: 'moderation-issue-browser',
        centered: true,
        rememberPosition: false,
        onClose: () => showBrowser(false),
    }));

    if (!template) return null;

    const bindings: Record<string, object> = {
        auto_pick: { onPointerTap: () => autoPickModerationBundle(send, 'issue browser pick next') },
        'my_issues_prototype/release_all': { onPointerTap: () => releaseAllModerationBundles(send, userId) },
    };

    for (const name of TABS) {
        bindings[name] = { selected: tab === name, onPointerTap: () => setBrowserTab(name) };
        bindings[`${name}_prototype`] = { visible: tab === name };

        const row = findTemplateChild(findTemplateChild(template.elements, `${name}_prototype`)?.children ?? [], 'item_prototype');

        if (!row || (tab !== name)) continue;

        const bundles = bundlesOfTab(snapshot, name, userId)
            .sort((a, b) => (bundleHighestPriority(a) - bundleHighestPriority(b)) || (a.issueAgeInMilliseconds - b.issueAgeInMilliseconds))
            .slice(0, LIST_LIMIT);
        const items: TemplateItem[] = bundles.map((bundle, index) => {
            const issue = highestPriorityIssue(bundle);

            return {
                key: `b${bundle.id}`,
                from: row,
                bindings: {
                    '': { color: ROW_COLORS[index % 2] },
                    score: { caption: String(bundleHighestPriority(bundle)) },
                    source: { caption: issueSourceName(issue?.categoryId ?? 0) },
                    category: { caption: issueCategoryName(issue?.reportedCategoryId ?? 0) },
                    target_name: { caption: issue?.reportedUserId ? issue.reportedUserName : '' },
                    // `IssueListView`: a player's icon when the issue names one, else the room's.
                    target_icon: { asset: LayoutImage(issue?.reportedUserId ? 'habbo-moderation-com/user_icon.png' : 'habbo-moderation-com/room_icon.png') },
                    time: { caption: bundleOpenTime(bundle, now) },
                    msgs: { caption: String(bundleMessageCount(bundle)) },
                    picker: { caption: bundle.pickerName },
                    pick_button: { onPointerTap: () => pickModerationBundle(send, bundle.id, 'pick button') },
                    handle_button: { onPointerTap: () => handleBundle(bundle.id) },
                    release_button: { onPointerTap: () => releaseModerationBundle(send, bundle.id) },
                },
            };
        });

        bindings[`${name}_prototype/issue_list`] = { items };
    }

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
