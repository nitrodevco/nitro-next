/**
 * `SingularNotificationController`'s `NewFeatureNotification`s: the promotions the hotel lists in
 * `notifications.new_feature.active`, each docked in the toolbar's extension column as
 * `new_feature_<key>` until its cancel link takes it down. The slice keeps the keys up, in the
 * order they were shown, the order they were docked in, and which of them were clicked open - that
 * shows their cancel link.
 */
import { StateCreator } from 'zustand';

type State = {
    newFeatureNotifications: string[];
    /**
     * The keys docked (`init`'s `extensionView.attachExtension("new_feature_" + key)`), in the order
     * they were: the column's order. One with an expiry or a countdown docks only once the server
     * answers its times (`onTime` -> `tryInitialize`), so after the ones that wait for nothing.
     */
    newFeatureNotificationsAttached: string[];
    /** The keys whose notification was opened (`eventHandler`'s `cancel_link_region.visible = true`). */
    newFeatureNotificationsOpened: string[];
    /**
     * `initializeAutoOpen`'s claims (`auto_open_condition.<key>` `not_claimed:<claimId>`) by id:
     * whether the server answered it taken (`HasClaimedProductResponse.hasClaimed`, or a
     * `ClaimProductResult` of 0 or 1), absent until it answers.
     */
    newFeatureClaims: Record<string, boolean>;
};

type Actions = {
    /** `maybeShowNewFeatureNotificationByKey` with its condition met: `new NewFeatureNotification(.., key)`. */
    showNewFeatureNotification: (key: string) => void;
    /** `NewFeatureNotification.init`: docked at the end of the column. */
    attachNewFeatureNotification: (key: string) => void;
    /** A click on the notification or its button: its link opened, its cancel link shown. */
    markNewFeatureNotificationOpened: (key: string) => void;
    /** `NewFeatureNotification.dispose`: `detachExtension("new_feature_" + key)`. */
    closeNewFeatureNotification: (key: string) => void;
    /** `onHasClaimedProductResponse` / `onClaimProductResult`: an answer for a claim. */
    setNewFeatureClaim: (claimId: string, claimed: boolean) => void;
    /** Forgets a claim's answer before it is asked again. */
    clearNewFeatureClaim: (claimId: string) => void;
};

export const NewFeatureNotificationSliceInitialState: State = {
    newFeatureNotifications: [],
    newFeatureNotificationsAttached: [],
    newFeatureNotificationsOpened: [],
    newFeatureClaims: {},
};

export type NewFeatureNotificationSlice = State & Actions;

export const createNewFeatureNotificationSlice: StateCreator<NewFeatureNotificationSlice, [], [], NewFeatureNotificationSlice> = set => ({
    ...NewFeatureNotificationSliceInitialState,
    showNewFeatureNotification: key => set(x => (x.newFeatureNotifications.includes(key) ? x : { newFeatureNotifications: [ ...x.newFeatureNotifications, key ] })),
    attachNewFeatureNotification: key => set(x => (x.newFeatureNotificationsAttached.includes(key) ? x : { newFeatureNotificationsAttached: [ ...x.newFeatureNotificationsAttached, key ] })),
    markNewFeatureNotificationOpened: key => set(x => (x.newFeatureNotificationsOpened.includes(key) ? x : { newFeatureNotificationsOpened: [ ...x.newFeatureNotificationsOpened, key ] })),
    closeNewFeatureNotification: key => set(x => ({
        newFeatureNotifications: x.newFeatureNotifications.filter(entry => entry !== key),
        newFeatureNotificationsAttached: x.newFeatureNotificationsAttached.filter(entry => entry !== key),
    })),
    setNewFeatureClaim: (claimId, claimed) => set(x => ({ newFeatureClaims: { ...x.newFeatureClaims, [claimId]: claimed } })),
    clearNewFeatureClaim: claimId => set((x) => {
        if (!(claimId in x.newFeatureClaims)) return x;

        const { [claimId]: _, ...rest } = x.newFeatureClaims;

        return { newFeatureClaims: rest };
    }),
});
