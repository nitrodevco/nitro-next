/**
 * The bubbles and alerts the server raises on its own - Flash's
 * `com/sulake/habbo/notifications/IncomingMessages`, whose listeners each end in
 * `SingularNotificationController.addItem` (a bubble of one of the styles in
 * `NotificationConfig`) or in an alert dialog.
 *
 * Only the part of that class whose packet the port parses and whose destination exists is here:
 * `onBadgeReceived`, `onPetLevelNotification`, `onPetReceived`, `onRoomMessagesNotification`,
 * `onInfoFeedEnable`, `onBroadcastMessageEvent`, `onClaimProductResult`, `onClubGiftSelected`,
 * `onRoomEnter` (the moderation disclaimer, `showModerationDisclaimer`) and
 * `onNotificationDialogMessageEvent` (`showNotification`, in `commands/notificationCommands`,
 * with `showCallCreatedNotification` for `cfh.created`). The MOTD, club gift and safety lock
 * windows and the `HabboAlertDialogManager` alerts are `registerSingularNotificationHandlers` and
 * `registerAlertDialogHandlers`. The feed items the class adds behind `notification.feed.enabled`
 * are not made: no Flash path creates the feed (`HabboNotifications.feedController` is never set).
 * The listeners the port already had - the respect chat bubbles, the wired transaction bubbles -
 * stay where they are.
 *
 * Flash draws a bitmap it has to hand (a badge it downloaded, a rendered pet); here the bubble
 * takes an image URL, so a badge is built from `badge.asset.url` the way `InfostandBadgeView`
 * does, and a pet - levelled up or received - is drawn by the bubble from the figure its packet
 * carries (`NotificationOptions.pet`), as `PetImageUtility.getPetImage` renders it outside any room.
 */
import { BadgeReceivedEventMessage, ClaimProductResultMessage, ClubGiftSelectedEventMessage, HabboBroadcastMessage, InfoFeedEnableMessage, IPetFigureData, NotificationDialogMessage, OpenConnectionMessage, PetLevelNotificationEventMessage, PetReceivedMessage, RoomEntryInfoMessage, RoomMessageNotificationMessage } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { showModerationDisclaimer, showNotification } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { LayoutImage } from '#base/theme';
import { getBadgeName } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `illumina_alert_illustrations_frank_neutral_png` - `LayoutImage('habbo-window-manager-com/illumina_alert_illustrations_frank_neutral.png')`. */
const FRANK_NEUTRAL = 'habbo-window-manager-com-illumina_alert_illustrations_frank_neutral';

/** `HabboLocalizationManager.getBadgeName`. */
const badgeName = (code: string) => getBadgeName(systemStore.getState().getLocalizationValue, code);

/** The badge image `SessionDataManager.requestBadgeImage` fetched, as a URL the bubble can show. */
const badgeImage = (code: string) => {
    const url = systemStore.getState().config['badge.asset.url'];

    return (typeof url === 'string') ? url.replace('%badgename%', code) : undefined;
};

/** `PetImageUtility.getPetImage`'s figure: type, palette and the colour its hex string names (`parseInt(color, 16)`). */
const petImage = ({ typeId, paletteId, color }: IPetFigureData) => ({ typeId, paletteId, color: parseInt(color, 16) || 0 });

/**
 * `ProductImageUtility.getProductImage`: a floor item's icon, a wall item's - but the wallpaper (3001),
 * floor (3002) and landscape (4057) by their own pictures (`tempCategoryMapping`), which this revision's
 * window manager publishes as `inventory_furni_icon_*` - or an effect's `fx_icon_<id>`. Nothing for
 * any other type.
 */
const productImage = (productType: string, classId: number, extraParam: string): string | undefined => {
    switch (productType) {
        case 's': return GetRoomEngine().getFurnitureFloorIconUrl(classId);
        case 'i':
            switch (classId) {
                case 3001: return LayoutImage('habbo-window-manager-com/inventory_furni_icon_wallpaper.png');
                case 3002: return LayoutImage('habbo-window-manager-com/inventory_furni_icon_floor.png');
                case 4057: return LayoutImage('habbo-window-manager-com/inventory_furni_icon_landscape.png');
                default: return GetRoomEngine().getFurnitureWallIconUrl(classId, extraParam);
            }
        case 'e': return LayoutImage(`habbo-inventory-com/fx_icon_${classId}.png`);
        default: return undefined;
    }
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
        on(BadgeReceivedEventMessage, (data) => {
            const text = localize('notification.new.badge', { badge_name: badgeName(data.badgeCode) });

            addNotification(text, 'badge_received', badgeImage(data.badgeCode), 'inventory/open/badges');
        }),

        on(PetLevelNotificationEventMessage, (data) => {
            const text = localizeRaw('notifications.text.petlevel', { pet_name: data.petName, level: String(data.level) });

            if (text) addNotification(text, 'petlevel', undefined, undefined, { pet: petImage(data.figureData) });
        }),

        on(PetReceivedMessage, (data) => {
            // `onPetReceived`: a bought gift or a received pet, drawn as `PetImageUtility.getPetImage` draws it.
            const text = localizeRaw(data.boughtAsGift ? 'notifications.text.petbought' : 'notifications.text.petreceived');

            if (text) addNotification(text, 'petlevel', undefined, undefined, { pet: petImage(data.pet.figureData) });
        }),

        on(ClubGiftSelectedEventMessage, (data) => {
            // `onClubGiftSelected`: the gift's first product, as an `info` bubble.
            const [ product ] = data.products;

            if (!product) return;

            addNotification(localize('notifications.text.club_gift.received'), 'info', productImage(product.productType, product.spriteId, product.extraParam));
        }),

        // `onRoomEnter`: every room entry, and a room's own connection, asks for the moderation disclaimer.
        on(RoomEntryInfoMessage, () => showModerationDisclaimer()),
        on(OpenConnectionMessage, () => showModerationDisclaimer()),

        on(RoomMessageNotificationMessage, (data) => {
            const text = localizeRaw('notifications.text.room.messages.posted', { room_name: data.roomName, messages_count: String(data.messageCount) });

            if (text) addNotification(text, 'roommessagesposted', 'if_icon_temp_png');
        }),

        on(ClaimProductResultMessage, (data) => {
            // `onClaimProductResult`: the answer to a special items display's free claim (`ClaimProductComposer`).
            const { getLocalizationValue } = systemStore.getState();
            const claimName = getLocalizationValue(`claim_product.name.${data.claimId}`, data.claimId);

            addNotification(getLocalizationValue(`claim_product.result.${data.result}`, '', { claim_name: claimName }), 'info');
        }),

        // `onInfoFeedEnable`: the server turning the bubbles off. `addNotification` drops them while it is set.
        on(InfoFeedEnableMessage, data => setNotificationsDisabled(!data.enabled)),

        on(HabboBroadcastMessage, (data) => {
            // `onBroadcastMessageEvent`: a `simpleAlert` with Frank beside it, the literal `\r` the server sends made a line break.
            systemStore.getState().showSimpleAlert({
                caption: localize('notifications.broadcast.title'),
                message: data.messageText.replace(/\\r/g, '\n'),
                illustration: FRANK_NEUTRAL,
            });
        }),

        on(NotificationDialogMessage, (data) => {
            if (data.type !== 'cfh.created') {
                showNotification(data.type, data.parameters);

                return;
            }

            // `showCallCreatedNotification`: the call for help's receipt is a `simpleAlert` with Frank, and the FAQ link only when the server sent one.
            const linkUrl = data.parameters['linkUrl'];

            systemStore.getState().showSimpleAlert({
                caption: localize('help.cfh.sent.title'),
                message: (data.parameters['message'] ?? '').replace(/\\r/g, '\n'),
                ...((linkUrl !== undefined) && { linkTitle: localize('help.main.faq.link.text'), linkUrl }),
                illustration: FRANK_NEUTRAL,
            });
        }),
    ]);
};
