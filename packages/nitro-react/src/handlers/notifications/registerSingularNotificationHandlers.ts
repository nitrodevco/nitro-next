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
 */
import { AccountSafetyLockStatusChangeMessage, ClubGiftNotificationEventMessage, MOTDNotificationEventMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { singularNotificationStore } from '#base/context/singular-notifications';
import { systemStore } from '#base/context/system';
import { configReader } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerSingularNotificationHandlers = ({ subscribe }: WebSocketConnection) => {
    const { showMotdNotification, showClubGiftNotification, showSafetyLockedNotification, hideSafetyLockedNotification } = singularNotificationStore.getState();

    return subscribeAll(subscribe, [
        on(MOTDNotificationEventMessage, (data) => {
            if (!data.messages.length) return;

            // `useNotifications`: `getBoolean("notification.items.enabled")`.
            if (configReader(systemStore.getState().config).configBoolean('notification.items.enabled')) showMotdNotification(data.messages);
        }),

        on(ClubGiftNotificationEventMessage, (data) => {
            if (data.numGifts < 1) return;

            showClubGiftNotification();
        }),

        on(UserObjectMessage, (data) => {
            if (data.userInfo.accountSafetyLocked) showSafetyLockedNotification();
        }),

        on(AccountSafetyLockStatusChangeMessage, (data) => {
            if (data.status === 1) hideSafetyLockedNotification();
        }),
    ]);
};
