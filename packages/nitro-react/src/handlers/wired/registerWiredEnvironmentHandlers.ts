/**
 * What the room's wired tells every client in it - `WiredEnvironment`: whether clicks on users
 * are reported (`WiredEnvironment`), the answer to such a report (`WiredClickUserResponse`), and
 * the click settings of a `wf_act_click_conf` box with the notification that announces them.
 *
 * The notification is where Flash is particular. Someone who may edit the room's wired gets one
 * that stays up with a stop / resume toggle; while they have it stopped, a change of the settings
 * is only announced, not applied. When the settings go back to default the toggle notification
 * is taken down three seconds later, unless new settings arrived in the meantime.
 */
import { WiredClickSettingsMessage, WiredClickUserResponseMessage, WiredEnvironmentMessage } from '@nitrodevco/nitro-packets';

import { applyWiredClickSettings, setWiredClickSettingsIgnored } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { getWiredHasWritePermission, WIRED_CLICK_FURNI_DEFAULT, WIRED_CLICK_USER_DEFAULT, wiredStore } from '#base/context/wired';

import { on, subscribeAll } from '../packetSubscriptions';

/** `WiredEnvironment.CLICK_SETTINGS_NOTIFICATION_TOGGLE_ID`. */
const CLICK_SETTINGS_NOTIFICATION_ID = 'wired_click_settings_toggle';

/** How long the toggle notification outlives the click settings it belongs to. */
const HIDE_INACTIVE_NOTIFICATION_MS = 3000;

export const registerWiredEnvironmentHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setWiredEnvironment, setUserClickHandled, setClickSettings, setClickSettingsIgnored } = wiredStore.getState();
    const { addNotification, removeNotificationById } = notificationStore.getState();

    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    const hasActiveClickSettings = () => {
        const { clickUserSetting, clickFurniSetting } = wiredStore.getState();

        return (clickUserSetting !== WIRED_CLICK_USER_DEFAULT) || (clickFurniSetting !== WIRED_CLICK_FURNI_DEFAULT);
    };

    const hideClickSettingsIfInactive = () => {
        if (hasActiveClickSettings()) return;

        setClickSettingsIgnored(false);
        removeNotificationById(CLICK_SETTINGS_NOTIFICATION_ID);
    };

    /** `WiredEnvironment.leaveRoom` (`RSE_ENDED`). The room the settings were applied to is gone; only the state is put back. */
    const leaveRoom = () => {
        removeNotificationById(CLICK_SETTINGS_NOTIFICATION_ID);
        setClickSettingsIgnored(false);
        clearTimeout(hideTimeout);

        if (!hasActiveClickSettings()) return;

        setClickSettings(WIRED_CLICK_USER_DEFAULT, WIRED_CLICK_FURNI_DEFAULT);
        applyWiredClickSettings(WIRED_CLICK_USER_DEFAULT, WIRED_CLICK_FURNI_DEFAULT);
    };

    const unsubscribeRoom = roomStore.subscribe((state, previous) => {
        if (previous.room && (state.room !== previous.room)) leaveRoom();
    });

    const unsubscribePackets = subscribeAll(subscribe, [
        on(WiredEnvironmentMessage, data => setWiredEnvironment(data.hasClickUserWired, data.enabledAchievements)),

        on(WiredClickUserResponseMessage, data => setUserClickHandled(data.index, data.openMenu)),

        on(WiredClickSettingsMessage, (data) => {
            const { clickUserSetting, clickFurniSetting } = wiredStore.getState();
            const userOption = Number(data.userOption);
            const furniOption = Number(data.furniOption);
            const hasWritePermission = getWiredHasWritePermission();

            let changed = (clickUserSetting !== userOption) || (clickFurniSetting !== furniOption);

            // Someone who lost their write permission loses the toggle, and the settings apply to them again.
            if (wiredStore.getState().clickSettingsIgnored && !hasWritePermission) {
                setClickSettingsIgnored(false);
                removeNotificationById(CLICK_SETTINGS_NOTIFICATION_ID);

                changed = true;
            }

            if (!changed) return;

            setClickSettings(userOption, furniOption);

            if (!hasActiveClickSettings()) {
                clearTimeout(hideTimeout);

                hideTimeout = setTimeout(hideClickSettingsIfInactive, HIDE_INACTIVE_NOTIFICATION_MS);
            }

            if (wiredStore.getState().clickSettingsIgnored) {
                const { getLocalizationValue } = systemStore.getState();
                const ignoredText = getLocalizationValue('notification.click_settings_ignored', 'notification.click_settings_ignored');
                const settingsText = getLocalizationValue('notification.click_settings', 'notification.click_settings');

                addNotification(hasActiveClickSettings() ? `${ignoredText} ${settingsText}` : '${notification.click_settings}', 'wired');

                return;
            }

            applyWiredClickSettings(userOption, furniOption);

            if (hasWritePermission && hasActiveClickSettings()) {
                addNotification('${notification.click_settings}', 'wired', undefined, undefined, {
                    id: CLICK_SETTINGS_NOTIFICATION_ID,
                    stay: true,
                    toggleCallback: stopped => setWiredClickSettingsIgnored(stopped),
                });

                return;
            }

            addNotification('${notification.click_settings}', 'wired');
        }),
    ]);

    return () => {
        clearTimeout(hideTimeout);
        unsubscribeRoom();
        unsubscribePackets();
    };
};
