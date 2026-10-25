/**
 * Flash's `moderation/IssueManager` with its `IssueBundle`s (1318 AS3): the call for help queue a
 * moderator's tool keeps from `ModeratorInit.issues` and every `IssueInfo`. Issues with the same
 * grouping id and reported player are one bundle (`IssueBundle.matches`); a bundle is open (1) or
 * picked (2) by someone, and a closed issue (3) leaves it. The browser lists bundles by tab
 * (`getBundles`): open, mine (picked by me), picked by others.
 */
import type { ICfhSanctionTypeData, IIssueMessageData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { twoDigits } from '#base/utils';

export const ISSUE_STATE_OPEN = 1;
export const ISSUE_STATE_PICKED = 2;
export const ISSUE_STATE_CLOSED = 3;

/** `IssueManager.RESOLUTION_USELESS` 1, abusive 2, `RESOLUTION_RESOLVED` 3. */
export const ISSUE_RESOLUTION_USELESS = 1;
export const ISSUE_RESOLUTION_ABUSIVE = 2;
export const ISSUE_RESOLUTION_RESOLVED = 3;

export type IssueBundleTab = 'open_issues' | 'my_issues' | 'picked_issues';

/** An issue and when it came (`IssueMessageData`'s `getTimer()` at parse). */
export interface ModerationIssue extends IIssueMessageData {
    receivedAt: number;
}

export interface ModerationIssueBundle {
    id: number;
    state: number;
    pickerUserId: number;
    pickerName: string;
    reportedUserId: number;
    groupingId: number;
    /** The issues by id, in the order they were added. */
    issues: Map<number, ModerationIssue>;
    /** `IssueBundle.issueAgeInMilliseconds`: the last added issue's age, which the list sorts by. */
    issueAgeInMilliseconds: number;
}

/** `IssueMessageData.getOpenTime`: hours and minutes since the issue was sent. */
export const issueOpenTime = (issue: ModerationIssue, now: number) => {
    const minutes = Math.floor(Math.floor((issue.issueAgeInMilliseconds + now - issue.receivedAt) / 1000) / 60);

    return `${twoDigits(Math.floor(minutes / 60))}:${twoDigits(minutes % 60)}`;
};

/**
 * `IssueBundle.getHighestPriorityIssue`: the lowest priority number among the issues whose topic
 * is a reported category (1-99), else among all.
 */
export const highestPriorityIssue = (bundle: ModerationIssueBundle) => {
    let reported: ModerationIssue | undefined;
    let other: ModerationIssue | undefined;

    for (const issue of bundle.issues.values()) {
        if ((issue.reportedCategoryId > 0) && (issue.reportedCategoryId < 100)) {
            if (!reported || (reported.priority > issue.priority)) reported = issue;
        } else if (!other || (other.priority > issue.priority)) other = issue;
    }

    return reported ?? other;
};

export const bundleHighestPriority = (bundle: ModerationIssueBundle) => highestPriorityIssue(bundle)?.priority ?? 0;

/** `IssueBundle.getMessageCount`: the issues that carry a message. */
export const bundleMessageCount = (bundle: ModerationIssueBundle) => [ ...bundle.issues.values() ].filter(x => !!x.message).length;

/** `IssueBundle.getOpenTime`: the oldest issue's open time. */
export const bundleOpenTime = (bundle: ModerationIssueBundle, now: number) => {
    let oldest: ModerationIssue | undefined;

    for (const issue of bundle.issues.values()) if (!oldest || (issue.issueAgeInMilliseconds > oldest.issueAgeInMilliseconds)) oldest = issue;

    return oldest ? issueOpenTime(oldest, now) : '';
};

/** `IssueBundle.matches`: same grouping (not 0) and reported player; unless `ignoreState`, also its state and picker. */
const bundleMatches = (bundle: ModerationIssueBundle, issue: IIssueMessageData, ignoreState = false) => {
    if ((bundle.groupingId === 0) || (issue.groupingId === 0)) return false;
    if ((bundle.groupingId !== issue.groupingId) || (bundle.reportedUserId !== issue.reportedUserId)) return false;

    return ignoreState || ((bundle.state === issue.state) && (bundle.pickerUserId === issue.pickerUserId));
};

const addToBundle = (bundle: ModerationIssueBundle, issue: ModerationIssue) => {
    bundle.issues.delete(issue.issueId);
    bundle.issues.set(issue.issueId, issue);
    bundle.issueAgeInMilliseconds = issue.issueAgeInMilliseconds;
};

/** `IssueManager.getBundles` (:350-383): open; picked by me; picked by someone else. */
export const bundlesOfTab = (bundles: readonly ModerationIssueBundle[], tab: IssueBundleTab, userId: number) => bundles.filter((bundle) => {
    switch (tab) {
        case 'open_issues': return bundle.state === ISSUE_STATE_OPEN;
        case 'my_issues': return (bundle.state === ISSUE_STATE_PICKED) && (bundle.pickerUserId === userId);
        case 'picked_issues': return (bundle.state === ISSUE_STATE_PICKED) && (bundle.pickerUserId !== userId);
    }
});

export interface ModerationIssueSends {
    pick: (issueIds: number[], retryEnabled: boolean, retryCount: number, message: string) => void;
    release: (issueIds: number[]) => void;
}

export interface ModerationIssueStore {
    /** Bumped on every change (the maps are kept and changed in place, as `IssueManager`'s are). */
    version: number;
    /**
     * The bundles as views read them: copied on every change, so a view (and the React Compiler's
     * memoised values) sees a new value whenever the queue changes, never a map changed under it.
     */
    snapshot: readonly ModerationIssueBundle[];
    issues: Map<number, ModerationIssue>;
    bundles: Map<number, ModerationIssueBundle>;
    issueBundle: Map<number, number>;
    nextBundleId: number;
    /** `_-F1H`: issues this moderator asked to pick, whose bundle opens a handler once picked. */
    pickRequested: number[];
    /** `_-to`: issues this moderator released, not auto-picked back when they come in open. */
    releaseRequested: number[];
    browserOpen: boolean;
    browserTab: IssueBundleTab;
    /** `IssueManager.setToolPreferences`: where an issue handler opens. */
    preferences: { x: number; y: number; width: number; height: number };
    /** Bundles with an issue handler window up. */
    handlers: number[];
    updateIssue: (data: IIssueMessageData, userId: number, sends: ModerationIssueSends) => void;
    removeIssue: (issueId: number) => void;
    getBundles: (tab: IssueBundleTab, userId: number) => ModerationIssueBundle[];
    pickBundle: (bundleId: number, message: string, sends: ModerationIssueSends, retryEnabled?: boolean, retryCount?: number) => void;
    autoPick: (message: string, sends: ModerationIssueSends, retryEnabled?: boolean, retryCount?: number) => void;
    releaseBundle: (bundleId: number, sends: ModerationIssueSends) => void;
    releaseAll: (userId: number, sends: ModerationIssueSends) => void;
    handleBundle: (bundleId: number) => void;
    removeHandler: (bundleId: number) => void;
    /** `IssueManager.issuePickFailed`: closes and releases the bundles not got; true when another moderator holds one. */
    issuePickFailed: (issues: { issueId: number; pickerUserId: number }[], userId: number, sends: ModerationIssueSends) => boolean;
    showBrowser: (open: boolean) => void;
    setBrowserTab: (tab: IssueBundleTab) => void;
    setPreferences: (preferences: { x: number; y: number; width: number; height: number }) => void;
    /** The issue handlers' `sanction_label` texts, by bundle (`IIssueHandler.showDefaultSanction`). */
    sanctionTexts: Record<number, string>;
    /** `IssueManager.updateSanctionData` (:468-511) for an issue: its bundles' handlers, when the player is the reported one. */
    updateSanctionData: (issueId: number, accountId: number, sanction: ICfhSanctionTypeData) => void;
}

/** `IssueManager.updateSanctionData`'s text: "NAME 18h", "NAME (avatar) 7 days", then " & " the trade lock and machine ban. */
export const sanctionText = (sanction: ICfhSanctionTypeData) => {
    let text = sanction.name + (sanction.avatarOnly ? ' (avatar) ' : ' ');

    text += (sanction.sanctionLengthInHours > 24) ? `${sanction.sanctionLengthInHours / 24} days` : `${sanction.sanctionLengthInHours}h`;

    if (sanction.tradeLockInfo) text += ` & ${sanction.tradeLockInfo}`;
    if (sanction.machineBanInfo) text += ` & ${sanction.machineBanInfo}`;

    return text;
};

export const createModerationIssueStore = () => createStore<ModerationIssueStore>((set, get) => {
    const changed = () => set(state => ({
        version: state.version + 1,
        snapshot: [ ...state.bundles.values() ].map(bundle => ({ ...bundle, issues: new Map(bundle.issues) })),
    }));

    const store: ModerationIssueStore = {
        version: 0,
        snapshot: [],
        issues: new Map(),
        bundles: new Map(),
        issueBundle: new Map(),
        nextBundleId: 1,
        pickRequested: [],
        releaseRequested: [],
        browserOpen: false,
        browserTab: 'open_issues',
        preferences: { x: 0, y: 0, width: 0, height: 0 },
        handlers: [],
        // `IssueManager.updateIssue` (:190-292).
        updateIssue: (data, userId, sends) => {
            const state = get();
            const issue: ModerationIssue = { ...data, receivedAt: performance.now() };

            state.issues.delete(issue.issueId);
            state.issues.set(issue.issueId, issue);

            let bundle: ModerationIssueBundle | undefined;
            const bundleId = state.issueBundle.get(issue.issueId);

            if (bundleId !== undefined) {
                bundle = state.bundles.get(bundleId);

                if (bundle) {
                    if (bundleMatches(bundle, issue)) addToBundle(bundle, issue);
                    else {
                        bundle.issues.delete(issue.issueId);

                        if (bundle.issues.size === 0) {
                            state.bundles.delete(bundle.id);
                            state.removeHandler(bundle.id);
                        }

                        state.issueBundle.delete(issue.issueId);
                        bundle = undefined;
                    }
                }
            }

            if (issue.state === ISSUE_STATE_CLOSED) {
                state.issues.delete(issue.issueId);
                changed();

                return;
            }

            if (!bundle) {
                for (const other of state.bundles.values()) {
                    if (!bundleMatches(other, issue)) continue;

                    bundle = other;
                    addToBundle(bundle, issue);
                    state.issueBundle.set(issue.issueId, bundle.id);
                    break;
                }
            }

            if (!bundle) {
                const id = state.nextBundleId;

                bundle = { id, state: issue.state, pickerUserId: issue.pickerUserId, pickerName: issue.pickerUserName, reportedUserId: issue.reportedUserId, groupingId: issue.groupingId, issues: new Map(), issueAgeInMilliseconds: 0 };
                addToBundle(bundle, issue);
                state.issueBundle.set(issue.issueId, id);
                state.bundles.set(id, bundle);
                set({ nextBundleId: id + 1 });
            }

            // A pick this moderator asked for opens its handler; picked by someone else, it closes again.
            if (state.pickRequested.includes(issue.issueId)) {
                state.handleBundle(bundle.id);

                if ((issue.pickerUserId !== userId) && (issue.state === ISSUE_STATE_PICKED)) state.removeHandler(bundle.id);
            }

            // An open issue about a player whose bundle I hold is picked for me too, unless I released it.
            if (issue.state === ISSUE_STATE_OPEN) {
                const mine = state.getBundles('my_issues', userId).find(x => bundleMatches(x, issue, true));
                const released = state.releaseRequested.indexOf(issue.issueId);

                if ((released === -1) && mine) sends.pick([ issue.issueId ], false, 0, `matches bundle with issue: ${highestPriorityIssue(mine)?.issueId ?? 0}`);
                else if (released !== -1) set({ releaseRequested: state.releaseRequested.filter((_, index) => index !== released) });
            }

            changed();
        },
        removeIssue: (issueId) => {
            get().issues.delete(issueId);
            changed();
        },
        // `IssueManager.getBundles` (:350-383).
        getBundles: (tab, userId) => bundlesOfTab([ ...get().bundles.values() ], tab, userId),
        pickBundle: (bundleId, message, sends, retryEnabled = false, retryCount = 0) => {
            const bundle = get().bundles.get(bundleId);

            if (!bundle) return;

            const ids = [ ...bundle.issues.keys() ];

            sends.pick(ids, retryEnabled, retryCount, message);
            set(state => ({ pickRequested: [ ...state.pickRequested, ...ids ] }));
        },
        // `IssueManager.autoPick`: the open bundle with the lowest priority, then the youngest.
        autoPick: (message, sends, retryEnabled = false, retryCount = 0) => {
            let best: ModerationIssueBundle | undefined;

            for (const bundle of get().bundles.values()) {
                if (bundle.state !== ISSUE_STATE_OPEN) continue;

                const better = !best
                    || (bundleHighestPriority(bundle) < bundleHighestPriority(best))
                    || ((bundleHighestPriority(bundle) === bundleHighestPriority(best)) && (bundle.issueAgeInMilliseconds < best.issueAgeInMilliseconds));

                if (better) best = bundle;
            }

            if (best) get().pickBundle(best.id, message, sends, retryEnabled, retryCount);
        },
        releaseBundle: (bundleId, sends) => {
            const bundle = get().bundles.get(bundleId);

            if (!bundle || (bundle.issues.size === 0)) return;

            const ids = [ ...bundle.issues.keys() ];

            sends.release(ids);
            set(state => ({ releaseRequested: [ ...state.releaseRequested, ...ids ] }));
        },
        releaseAll: (userId, sends) => {
            const ids = get().getBundles('my_issues', userId).flatMap(x => [ ...x.issues.keys() ]);

            if (ids.length === 0) return;

            sends.release(ids);
            set(state => ({ releaseRequested: [ ...state.releaseRequested, ...ids ] }));
        },
        // `IssueManager.handleBundle`: its handler window up, and its issues no longer waiting for a pick.
        handleBundle: (bundleId) => {
            const bundle = get().bundles.get(bundleId);

            if (!bundle) return;

            set(state => ({
                handlers: [ ...state.handlers.filter(x => x !== bundleId), bundleId ],
                pickRequested: state.pickRequested.filter(x => !bundle.issues.has(x)),
            }));
        },
        removeHandler: bundleId => set(state => ({ handlers: state.handlers.filter(x => x !== bundleId) })),
        issuePickFailed: (issues, userId, sends) => {
            const state = get();
            let pickedAlready = false;

            for (const { issueId, pickerUserId } of issues) {
                if ((pickerUserId !== -1) && (pickerUserId !== userId)) pickedAlready = true;

                const bundle = [ ...state.bundles.values() ].find(x => x.issues.has(issueId));

                if (!bundle) continue;

                state.removeHandler(bundle.id);
                state.releaseBundle(bundle.id, sends);
            }

            return pickedAlready;
        },
        showBrowser: browserOpen => set({ browserOpen }),
        setBrowserTab: browserTab => set({ browserTab }),
        setPreferences: preferences => set({ preferences }),
        sanctionTexts: {},
        updateSanctionData: (issueId, accountId, sanction) => {
            if (issueId <= 0) return;

            const texts = { ...get().sanctionTexts };

            for (const bundle of get().bundles.values()) {
                if (bundle.issues.has(issueId) && (bundle.reportedUserId === accountId)) texts[bundle.id] = sanctionText(sanction);
            }

            set({ sanctionTexts: texts });
        },
    };

    return store;
});

export const moderationIssueStore = createModerationIssueStore();
