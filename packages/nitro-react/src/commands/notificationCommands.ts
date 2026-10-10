/**
 * `HabboNotifications.showNotification` and the two lookups it and `NotificationPopup` share,
 * `getNotificationPart` and `getNotificationImageUrl` - the notification a server-named type
 * describes (`NotificationDialogMessageEvent`, heard in
 * `handlers/notifications/registerNotificationHandlers`) or a client feature raises by type
 * (`builders_club.membership_in_grace`).
 *
 * The hotel's external variable `notification.<type>`, when it is set, is a JSON object merged
 * over the parameters - its keys win. Its `display` decides the rest: `BUBBLE` is a bubble of the
 * `info` style in the side stack (`addItem(message, "info", bitmap, imageUrl, null, link)`), and
 * anything else - `POP_UP`, or no `display` at all - opens a `NotificationPopup`.
 *
 * `delivery` (`PERSISTENT`, which a dozen of the hotel's types carry) is read by no Flash class:
 * it tells the server to keep the notification for a user who is offline, and reaches the client
 * only as a parameter nothing looks at.
 */
import { RoomEnterEffect } from '@nitrodevco/nitro-renderer';

import { NOTIFICATION_ASSETS, notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { configReader } from '#base/utils';

/** The parameter map of a notification, `Map` in Flash. */
export type NotificationParameters = Record<string, string>;

/** `IMAGE_LIBRARY_URL`'s placeholder, which marks an image that is a url rather than a library bitmap. */
const IMAGE_LIBRARY_PLACEHOLDER = '${image.library.url}';

/** `NotificationPopup`'s link that stays inside the client: the rest of it goes to `createLinkEvent`. */
const EVENT_LINK_PREFIX = 'event:';

/**
 * `getNotificationPart`: the parameter of that name when the map has it (an empty one included),
 * else the text `notification.<type>.<part>` with every parameter filled in as `%name%` - when the
 * hotel has that text, or `required` asks for it anyway, in which case a missing text reads as
 * its own key. Otherwise `undefined`.
 */
export const getNotificationPart = (parameters: NotificationParameters, type: string, part: string, required: boolean): string | undefined => {
    if (Object.hasOwn(parameters, part)) return parameters[part];

    const key = [ 'notification', type, part ].join('.');
    const { localizations, getLocalizationValue } = systemStore.getState();

    if ((localizations[key] !== undefined) || required) return getLocalizationValue(key, key, parameters);

    return undefined;
};

/**
 * `getNotificationImageUrl`: the `image` parameter, else the type's own picture in the image
 * library, `${image.library.url}notifications/<type with every . made _>.png`.
 */
export const getNotificationImageUrl = (parameters: NotificationParameters, type: string): string => parameters['image'] ?? `${IMAGE_LIBRARY_PLACEHOLDER}notifications/${type.replace(/\./g, '_')}.png`;

/**
 * An image as `showNotification` and the popup's `illustration` use it: a bitmap of the
 * notifications library by name (`chests_icon_chest_empty`) stays a name - Flash's
 * `assets.getAssetByName`, tried only for a value without the library url in it - and anything
 * else is a url, with the `${...}` Flash's bitmap wrapper expands resolved from the config.
 */
const resolveNotificationImage = (image: string): string => {
    if (!image.includes(IMAGE_LIBRARY_PLACEHOLDER) && Object.hasOwn(NOTIFICATION_ASSETS, image)) return image;

    return configReader(systemStore.getState().config).resolve(image);
};

/** Whether a link is an `event:` one: a popup draws it as the `action` button, which `createLinkEvent`s the rest of it. */
export const isNotificationEventLink = (linkUrl: string | undefined): linkUrl is string => (linkUrl !== undefined) && (linkUrl.substring(0, EVENT_LINK_PREFIX.length) === EVENT_LINK_PREFIX);

/** The client link an `event:` url names. */
export const notificationEventLink = (linkUrl: string) => linkUrl.substring(EVENT_LINK_PREFIX.length);

/** `HabboNotifications.showNotification`. */
export const showNotification = (type: string, parameters: NotificationParameters = {}) => {
    const { config } = systemStore.getState();
    const { configString } = configReader(config);
    const merged: NotificationParameters = { ...parameters };
    const propertyKey = `notification.${type}`;

    // `propertyExists` then `new JSONDecoder(getProperty(key), true)`: the object's keys over the parameters.
    if (Object.hasOwn(config, propertyKey)) {
        let decoded: unknown = undefined;

        try {
            decoded = JSON.parse(configString(`notification.${type}`));
        } catch {
            // Flash's decoder throws on a value that is not JSON and the notification is lost with it;
            // here the parameters are shown as they came.
        }

        if (decoded && (typeof decoded === 'object')) {
            for (const [ key, value ] of Object.entries(decoded)) merged[key] = String(value);
        }
    }

    if (merged['display'] === 'BUBBLE') {
        const message = getNotificationPart(merged, type, 'message', true) ?? '';
        const linkUrl = getNotificationPart(merged, type, 'linkUrl', false);

        notificationStore.getState().addNotification(
            message,
            'info',
            resolveNotificationImage(getNotificationImageUrl(merged, type)),
            // A bubble's link always goes to `createLinkEvent`: an `event:` one without its prefix, any other as it is.
            isNotificationEventLink(linkUrl) ? notificationEventLink(linkUrl) : linkUrl,
        );

        return;
    }

    // `new NotificationPopup(this, type, parameters)`: its constructor.
    const linkUrl = getNotificationPart(merged, type, 'linkUrl', false);

    notificationStore.getState().addNotificationPopup({
        title: getNotificationPart(merged, type, 'title', true) ?? '',
        message: (getNotificationPart(merged, type, 'message', true) ?? '').replace(/\\r/g, '\n'),
        linkUrl,
        linkTitle: (linkUrl !== undefined) ? (getNotificationPart(merged, type, 'linkTitle', false) ?? linkUrl) : undefined,
        image: resolveNotificationImage(getNotificationImageUrl(merged, type)),
        critical: (merged['alertStyle'] === 'critical'),
    });
};

/** `SingularNotificationController.MODERATION_DISCLAIMER_DELAY_MS`: how long after the room entry effect the disclaimer waits. */
const MODERATION_DISCLAIMER_DELAY_MS = 5000;

/**
 * `SingularNotificationController.showModerationDisclaimer`, on every room entry (`IncomingMessages.onRoomEnter`,
 * for `RoomEntryInfoMessageEvent` and `OpenConnectionMessageEvent`): `mod.chatdisclaimer` (`NA` when the hotel
 * has no such text) as an `info` bubble, once. While the room entry effect runs it waits for the effect's whole
 * running time and 5 s more, with one wait at a time, and asks again then.
 */
export const showModerationDisclaimer = () => {
    const { moderationDisclaimerShown, moderationDisclaimerPending, patchModerationDisclaimer, addNotification } = notificationStore.getState();

    if (RoomEnterEffect.isRunning()) {
        if (moderationDisclaimerPending) return;

        patchModerationDisclaimer({ moderationDisclaimerPending: true });
        setTimeout(() => {
            notificationStore.getState().patchModerationDisclaimer({ moderationDisclaimerPending: false });
            showModerationDisclaimer();
        }, RoomEnterEffect.totalRunningTime + MODERATION_DISCLAIMER_DELAY_MS);

        return;
    }

    if (moderationDisclaimerShown) return;

    addNotification(systemStore.getState().getLocalizationValue('mod.chatdisclaimer', 'NA'), 'info');
    patchModerationDisclaimer({ moderationDisclaimerShown: true });
};
