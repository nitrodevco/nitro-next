/**
 * The bubbles and alerts the server raises on its own - Flash's
 * `com/sulake/habbo/notifications/IncomingMessages`, whose listeners each end in
 * `SingularNotificationController.addItem` (a bubble of one of the styles in
 * `NotificationConfig`) or in an alert dialog.
 *
 * Only the part of that class whose packet the port parses and whose destination exists is here:
 * `onLevelUp`, `onBadgeReceived`, `onPetLevelNotification`, `onRoomMessagesNotification`,
 * `onInfoFeedEnable` and `onBroadcastMessageEvent`. The rest of the class needs windows that are
 * not ported (the MOTD, club gift and safety lock dialogs, `HabboAlertDialogManager`, the
 * notification feed) or a packet that is still an empty stub; each is listed in
 * `scripts/drift/known.py` with what it waits for. The listeners the port already had - the
 * respect chat bubbles, the wired transaction bubbles - stay where they are.
 *
 * Flash draws a bitmap it has to hand (a badge it downloaded, a rendered pet); here the bubble
 * takes an image URL, so a badge is built from `badge.asset.url` the way `InfostandBadgeView`
 * does. The pet bubbles have no image: a pet picture needs the avatar renderer, which only
 * answers for a pet that is in the room, and the pet a level-up names need not be.
 */
import { BadgeReceivedEventMessage, HabboAchievementNotificationMessage, HabboBroadcastMessage, InfoFeedEnableMessage, PetLevelNotificationEventMessage, RoomMessageNotificationMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `HabboLocalizationManager.getBadgeName`. */
const badgeName = (code: string) => systemStore.getState().getLocalizationValue(`badge_name_${code}`, code);

/** The badge image `SessionDataManager.requestBadgeImage` fetched, as a URL the bubble can show. */
const badgeImage = (code: string) => {
    const url = systemStore.getState().config['badge.asset.url'];

    return (typeof url === 'string') ? url.replace('%badgename%', code) : undefined;
};

export const registerNotificationHandlers = ({ subscribe }: WebSocketConnection) => {
    const { addNotification, setNotificationsDisabled } = notificationStore.getState();

    const localize = (key: string, replacements?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, key, replacements);

    /**
     * `getLocalizationRaw`, which answers null for a key the hotel has no text for. The listeners
     * that use it raise no bubble at all then, rather than one reading its own key.
     */
    const localizeRaw = (key: string, replacements?: Record<string, string>) => {
        const state = systemStore.getState();

        return (state.localizations[key] === undefined) ? undefined : state.getLocalizationValue(key, key, replacements);
    };

    return subscribeAll(subscribe, [
        on(HabboAchievementNotificationMessage, (data) => {
            const text = localize('notification.new.achievement', { achievement_name: badgeName(data.data.badgeCode) });

            addNotification(text, 'achievement', badgeImage(data.data.badgeCode), `questengine/achievements/${data.data.category}`);
        }),

        on(BadgeReceivedEventMessage, (data) => {
            const text = localize('notification.new.badge', { badge_name: badgeName(data.badgeCode) });

            addNotification(text, 'badge_received', badgeImage(data.badgeCode), 'inventory/open/badges');
        }),

        on(PetLevelNotificationEventMessage, (data) => {
            const text = localizeRaw('notifications.text.petlevel', { pet_name: data.petName, level: String(data.level) });

            if (text) addNotification(text, 'petlevel');
        }),

        on(RoomMessageNotificationMessage, (data) => {
            const text = localizeRaw('notifications.text.room.messages.posted', { room_name: data.roomName, messages_count: String(data.messageCount) });

            if (text) addNotification(text, 'roommessagesposted', 'if_icon_temp_png');
        }),

        // `onInfoFeedEnable`: the server turning the bubbles off. `addNotification` drops them while it is set.
        on(InfoFeedEnableMessage, data => setNotificationsDisabled(!data.enabled)),

        on(HabboBroadcastMessage, (data) => {
            // `simpleAlert`, whose message keeps the literal `\r` the server sends as a line break.
            systemStore.getState().showAlert(localize('notifications.broadcast.title'), data.messageText.replace(/\\r/g, '\n'));
        }),
    ]);
};
