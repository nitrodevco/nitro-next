/**
 * The friend bar's notifications - `HabboFriendBarData.onFriendNotification`: a
 * `FriendNotificationMessage` about a friend the bar holds becomes one of their notifications
 * (`makeNotification`), shown as a token on their tab. Only while `friendbar.notifications.enabled`
 * is on (`showFriendNotifications`).
 *
 * `makeNotification` also runs for a console message or a room invite, as a notification of type -1
 * with no token (`addNotificationToken` breaks on it) and no move to the front, so it leaves nothing
 * to see; those are not carried. Nor is the `EventLog` tracking it sends.
 */
import { FriendNotificationMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { configBoolean } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerFriendBarHandlers = ({ subscribe }: WebSocketConnection) => {
    const { addFriendBarNotification } = userStore.getState();

    return subscribeAll(subscribe, [
        on(FriendNotificationMessage, (data) => {
            if (!configBoolean('friendbar.notifications.enabled')) return;

            addFriendBarNotification(data.playerId, Number(data.typeCode), data.message);
        }),
    ]);
};
