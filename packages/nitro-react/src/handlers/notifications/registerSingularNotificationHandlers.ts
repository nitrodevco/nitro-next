/**
 * The notification windows of Flash's `notifications/IncomingMessages` - `onMOTD`,
 * `onClubGiftNotification`, `onUserObject` and `onAccountSafetyLockStatusChanged` - and the
 * `SingularNotificationController` methods they call (`showClubGiftNotification`,
 * `showSafetyLockedNotification`, `hideSafetyLockedNotification`):
 *
 * - `onMOTD`: a packet with messages opens a new `MOTDNotification` while
 *   `notification.items.enabled`. The feed items `notification.feed.enabled` would add are not
 *   made: no Flash path creates the notification feed (and the hotel sets the key false).
 * - `onClubGiftNotification`: at least one gift docks the club gift notification.
 * - `onUserObject`: a safety locked account docks the safety lock notification.
 * - `onAccountSafetyLockStatusChanged`: status 1 (unlocked) takes it down. The session's own
 *   `accountSafetyLocked` flag is `SessionDataManager`'s, set in `registerUserInfoHandlers`.
 * - `TurboNoticeMessage`: not Flash's - Turbo's `notices.live` puts a `NewFeatureNotification` up
 *   (or takes it down) while the client runs, as a restart's countdown notice.
 */
import { AccountSafetyLockStatusChangeMessage, ClaimProductResultMessage, ClubGiftNotificationEventMessage, EpicPopupMessage, HasClaimedProductResponseMessage, MOTDNotificationEventMessage, TurboNoticeMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { applyLiveNewFeatureNotification } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { singularNotificationStore } from '#base/context/singular-notifications';
import { configBoolean } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerSingularNotificationHandlers = ({ subscribe }: WebSocketConnection) => {
    const { showMotdNotification, showClubGiftNotification, showSafetyLockedNotification, hideSafetyLockedNotification, showEpicPopup } = singularNotificationStore.getState();

    return subscribeAll(subscribe, [
        // `NewFeatureNotification.onHasClaimedProductResponse` / `onClaimProductResult`: the answers
        // its auto-open waits on - taken stops it, not taken arms it, and a claim of 0 or 1 stops it.
        on(HasClaimedProductResponseMessage, data => singularNotificationStore.getState().setNewFeatureClaim(data.claimId, data.hasClaimed)),
        on(ClaimProductResultMessage, (data) => {
            if ((data.result === 0) || (data.result === 1)) singularNotificationStore.getState().setNewFeatureClaim(data.claimId, true);
        }),
        on(MOTDNotificationEventMessage, (data) => {
            if (!data.messages.length) return;

            // `useNotifications`: `getBoolean("notification.items.enabled")`.
            if (configBoolean('notification.items.enabled')) showMotdNotification(data.messages);
        }),

        // `HabboEpicPopupView.onEpicPopupMessageEvent`: `showPopup(imageUri)`.
        on(EpicPopupMessage, (data) => {
            showEpicPopup(data.imageUri);
        }),

        on(ClubGiftNotificationEventMessage, (data) => {
            if (data.numGifts < 1) return;

            showClubGiftNotification();
        }),

        on(UserObjectMessage, (data) => {
            if (data.userInfo.accountSafetyLocked) showSafetyLockedNotification();
        }),

        on(TurboNoticeMessage, data => applyLiveNewFeatureNotification(data.key, data.shown, data.variables, data.desc)),

        on(AccountSafetyLockStatusChangeMessage, (data) => {
            if (data.status === 1) hideSafetyLockedNotification();
        }),
    ]);
};
