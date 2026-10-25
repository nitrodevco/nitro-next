/**
 * What Flash's `catalog/earnings/EarningsController` keeps for the whole session, besides its
 * view: whether the purse's earnings button shows its "unseen" dot (`showingIndicator`, the
 * `§_-t1X§` interface `HabboCatalog.getEarnings()` hands the toolbar), whether the first income
 * reward status of the session is still to come, and whether an `EarningsView` was ever built.
 *
 * `viewCreated` exists because the controller never lets go of its view: the close button
 * disposes `EarningsView`, but `§_-y1§` keeps pointing at it until the controller itself is
 * disposed, so `onIncomeRewardNotificationMessageEvent`'s `if(§_-y1§)` refreshes the status for
 * the rest of the session once the vault has been opened once - open or not.
 */
import { StateCreator } from 'zustand';

type State = {
    /** `§_-E2z§` - the purse's `earnings_unseen_indicator`. */
    showingIndicator: boolean;
    /** `§_-Y2a§`: true until the session's first `IncomeRewardStatusMessage` has been read. */
    awaitingFirstStatus: boolean;
    /** `§_-y1§ != null`: an `EarningsView` was built at least once. */
    viewCreated: boolean;
};

type Actions = {
    /** Sets `showingIndicator`; the purse follows it (`HabboToolbar.refreshPurseAreaIndicators`). */
    setShowingIndicator: (showingIndicator: boolean) => void;
    setAwaitingFirstStatus: (awaitingFirstStatus: boolean) => void;
    setViewCreated: (viewCreated: boolean) => void;
};

export const EarningsIndicatorSliceInitialState: State = {
    showingIndicator: false,
    awaitingFirstStatus: true,
    viewCreated: false,
};

export type EarningsIndicatorSlice = State & Actions;

export const createEarningsIndicatorSlice: StateCreator<EarningsIndicatorSlice, [], [], EarningsIndicatorSlice> = set => ({
    ...EarningsIndicatorSliceInitialState,
    setShowingIndicator: showingIndicator => set({ showingIndicator }),
    setAwaitingFirstStatus: awaitingFirstStatus => set({ awaitingFirstStatus }),
    setViewCreated: viewCreated => set({ viewCreated }),
});
