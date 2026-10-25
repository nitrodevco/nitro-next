/**
 * The moderation and opening-hours alerts - the listeners of Flash's
 * `notifications/IncomingMessages` that end in `HabboAlertDialogManager` (`onModCautionEvent`,
 * `onModMessageEvent`, `onUserBannedMessageEvent`, `onHotelClosing`, `onHotelMaintenance`,
 * `onHotelClosed`, `onLoginFailedHotelClosed`), with the manager's own methods folded in. They write nothing but the system store's dialogs, which is
 * the window manager's `simpleAlert` and `alert`.
 *
 * - `handleModeratorCaution`: a `simpleAlert` with no caption, `${mod.alert.title}` as its
 *   subtitle, the message with the `\r` the server writes made a line break, `${mod.alert.link}`
 *   to the caution's url, and Frank beside it - only while `notification.items.enabled`. Closing
 *   it calls `IHabboHelp.showHabboWay` in Flash; the Habbo Way window (`HabboWayController` on
 *   `habbo_way`, and the quiz it leads to) is one of the help windows the port has not got, so
 *   here the close does nothing more. The `notification.feed.enabled` feed item is not made either:
 *   no Flash path creates the notification feed (and the hotel sets the key false).
 * - `handleModeratorMessage`: the same alert for a moderator's message, whose close never leads
 *   to the Habbo Way; also only while `notification.items.enabled`.
 * - `handleUserBannedMessage`: the same alert for a ban, with no url, whatever the config says.
 * - `handleHotelClosingMessage` / `handleHotelMaintenanceMessage`: a `simpleAlert` with
 *   `${opening.hours.title}` as its subtitle over `${opening.hours.shutdown}` (`%m%`) or
 *   `${maintenance.shutdown}` (`%m%`, `%d%`).
 * - `handleHotelClosedMessage` / `handleLoginFailedHotelClosedMessage`: an `alert` under
 *   `${opening.hours.title}` of `${opening.hours.closed}` or, for a user the closing threw out
 *   (and for a login the closed hotel turned away), `${opening.hours.disconnected}`, the opening
 *   time in `%h%` and `%m%` zero-padded to two digits (`getTimeZeroPadded`).
 *
 * The same packets have other Flash listeners the port has no counterpart for:
 * `HabboGameManager`'s `hotelClosed` flag (the game centre is not ported), and the login flow's
 * `HabboCommunicationDemo` - its `onMaintenance` disconnecting with
 * `disconnected.maintenance_status` and its `onLoginFailedHotelClosed` showing the login view's
 * disconnected text - which is the login session the port does not run.
 */
import { InfoHotelClosedMessage, InfoHotelClosingMessage, LoginFailedHotelClosedMessage, MaintenanceStatusMessage, ModeratorCautionMessage, ModeratorMessage, UserBannedMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { configBoolean, systemStore, translate as t } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `HabboAlertDialogManager.getTimeZeroPadded`: the last two digits of `"0" + value`. */
const getTimeZeroPadded = (value: number) => `0${value}`.slice(-2);

export const registerAlertDialogHandlers = ({ subscribe }: WebSocketConnection) => {
    const { showAlert, showSimpleAlert } = systemStore.getState();

    /** `IncomingMessages.useNotifications`: `getBoolean("notification.items.enabled")`. */
    const notificationItemsEnabled = () => configBoolean('notification.items.enabled');

    /** `handleHotelClosedMessage` / `handleLoginFailedHotelClosedMessage`: the `alert`, whose callback only disposes it. */
    const showOpeningHoursAlert = (key: 'opening.hours.closed' | 'opening.hours.disconnected', openHour: number, openMinute: number) => {
        showAlert(t('opening.hours.title', 'opening.hours.title'), t(key, key, { h: getTimeZeroPadded(openHour), m: getTimeZeroPadded(openMinute) }));
    };

    // `showModerationMessage`: `simpleAlert("", "${mod.alert.title}", message, "${mod.alert.link}", url, null, frank)`.
    const showModerationMessage = (message: string, url: string) => {
        showSimpleAlert({
            caption: '',
            subtitle: t('mod.alert.title', 'mod.alert.title'),
            message: message.replace(/\\r/g, '\n'),
            linkTitle: t('mod.alert.link', 'mod.alert.link'),
            // `SimpleAlertDialog`: `param6 = interpolate(param6)`.
            linkUrl: systemStore.getState().interpolate(url),
            // `illumina_alert_illustrations_frank_neutral_png` - `LayoutImage('habbo-window-manager-com/illumina_alert_illustrations_frank_neutral.png')`.
            illustration: 'habbo-window-manager-com-illumina_alert_illustrations_frank_neutral',
        });
    };

    return subscribeAll(subscribe, [
        on(ModeratorCautionMessage, (data) => {
            if (!notificationItemsEnabled()) return;

            showModerationMessage(data.message, data.url);
        }),

        on(ModeratorMessage, (data) => {
            if (!notificationItemsEnabled()) return;

            showModerationMessage(data.message, data.url);
        }),

        on(UserBannedMessage, data => showModerationMessage(data.message, '')),

        on(InfoHotelClosingMessage, (data) => {
            showSimpleAlert({
                caption: '',
                subtitle: t('opening.hours.title', 'opening.hours.title'),
                message: t('opening.hours.shutdown', 'opening.hours.shutdown', { m: String(data.minutesUntilClosing) }),
            });
        }),

        on(MaintenanceStatusMessage, (data) => {
            showSimpleAlert({
                caption: '',
                subtitle: t('opening.hours.title', 'opening.hours.title'),
                message: t('maintenance.shutdown', 'maintenance.shutdown', { m: String(data.minutesUntilMaintenance), d: String(data.duration) }),
            });
        }),

        on(InfoHotelClosedMessage, data => showOpeningHoursAlert(data.userThrownOutAtClose ? 'opening.hours.disconnected' : 'opening.hours.closed', data.openHour, data.openMinute)),

        on(LoginFailedHotelClosedMessage, data => showOpeningHoursAlert('opening.hours.disconnected', data.openHour, data.openMinute)),
    ]);
};
