import { useStore } from 'zustand';

import { ModerationIssueStore, moderationIssueStore } from './store/ModerationIssueStore';

/** A slice of the ModerationIssueStore (`IssueManager`), re-rendering only when that slice changes. */
export function useModerationIssueStore<T>(selector: (state: ModerationIssueStore) => T) {
    return useStore(moderationIssueStore, selector);
}
