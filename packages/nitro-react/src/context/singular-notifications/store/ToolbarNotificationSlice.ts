/**
 * The two notifications `SingularNotificationController` docks in the toolbar's extension column
 * (`IHabboToolbar.extensionView.attachExtension`) rather than stacking as bubbles:
 *
 * - `ClubGiftNotification` (`club_gift_notification`): shown by `showClubGiftNotification` unless
 *   one is already up or the user put the last one off with "not now" (`isCancelled`), which
 *   holds for the rest of the session - the controller keeps the cancelled instance.
 * - `SafetyLockedNotification` (`safety_locked_notification`): shown by
 *   `showSafetyLockedNotification` unless one is up, taken down by `hideSafetyLockedNotification`.
 *
 * Both constructors take an argument they never read (the gift count, the user id), so the slice
 * keeps only whether each is up.
 */
import { StateCreator } from 'zustand';

type State = {
    /** `ClubGiftNotification.visible`. */
    clubGiftNotificationVisible: boolean;
    /** `ClubGiftNotification.isCancelled`: the "not now" link was pressed. */
    clubGiftNotificationCancelled: boolean;
    /** `SafetyLockedNotification.visible`. */
    safetyLockedNotificationVisible: boolean;
};

type Actions = {
    /** `SingularNotificationController.showClubGiftNotification`. */
    showClubGiftNotification: () => void;
    /**
     * `ClubGiftNotification.dispose` from its own `eventHandler`: `cancelled` for the "not now"
     * link, which sets `isCancelled` first; the gift list button disposes it without.
     */
    closeClubGiftNotification: (cancelled: boolean) => void;
    /** `SingularNotificationController.showSafetyLockedNotification`. */
    showSafetyLockedNotification: () => void;
    /** `SingularNotificationController.hideSafetyLockedNotification`. */
    hideSafetyLockedNotification: () => void;
};

export const ToolbarNotificationSliceInitialState: State = {
    clubGiftNotificationVisible: false,
    clubGiftNotificationCancelled: false,
    safetyLockedNotificationVisible: false,
};

export type ToolbarNotificationSlice = State & Actions;

export const createToolbarNotificationSlice: StateCreator<ToolbarNotificationSlice, [], [], ToolbarNotificationSlice> = set => ({
    ...ToolbarNotificationSliceInitialState,
    showClubGiftNotification: () => set(x => ((x.clubGiftNotificationVisible || x.clubGiftNotificationCancelled) ? x : { clubGiftNotificationVisible: true })),
    closeClubGiftNotification: cancelled => set(x => ({ clubGiftNotificationVisible: false, clubGiftNotificationCancelled: x.clubGiftNotificationCancelled || cancelled })),
    showSafetyLockedNotification: () => set(x => (x.safetyLockedNotificationVisible ? x : { safetyLockedNotificationVisible: true })),
    hideSafetyLockedNotification: () => set(x => (x.safetyLockedNotificationVisible ? { safetyLockedNotificationVisible: false } : x)),
});
