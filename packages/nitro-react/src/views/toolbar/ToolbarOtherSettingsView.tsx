/**
 * The toolbar's "other settings" window - `toolbar/extensions/settings/OtherSettingsView`, drawn from
 * its `me_menu_other_settings` template (the 2026 revision with the online indicator menu): ignore
 * room invites, disable the room camera's follow (its row shown only with `room.camera.follow_user`),
 * turn wired whispers off (`WiredMenuController.wiredWhisperDisabled`), who is told when this user
 * comes online, and the phone number collection reset (only while `sms.identity.verification.*` and
 * the phone statuses say it applies). Every switch is saved the moment it is flipped - a click on the
 * checkbox itself, as `onButtonClicked` reads it. Opened from the settings list under the purse.
 *
 * The bundled layout adds a `graphics_settings` block under the options (a renderer menu and an
 * "Apply and reload" button) that neither Flash nor the JavaScript client fills in and nothing in
 * this client backs, so it is hidden. The official client (official-20261009/settings-other.png) draws the
 * window with the options list as high as its rows - the unshown phone reset button takes no room - so
 * it is 203 high with `back_btn` at y 167, 36 less than the full layout's.
 */
import { useState } from 'react';

import { resetPhoneNumberCollection, setOnlineIndicatorPreference, setRoomCameraFollowDisabled, setRoomInvitesIgnored, setWiredWhisperDisabled } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useWiredStore } from '#base/context/wired';

import { ToolbarSettingsWindow } from './ToolbarSettingsWindow';

/** The official window: its height and `back_btn`'s y (measured, `Back` at y 181 on the 1008x729 capture). */
const WINDOW_HEIGHT = 203;
const BACK_BUTTON_Y = 167;

/** `phone.verification.status` / `phone.collection.status` values the reset button tests. */
const PHONE_STATUS_DONE = 2;
const PHONE_STATUS_NONE = 0;

export const ToolbarOtherSettingsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const roomInvitesIgnored = useUserStore(x => x.roomInvitesIgnored);
    const cameraFollowDisabled = useUserStore(x => x.isRoomCameraFollowDisabled);
    const onlineIndicatorPreference = useUserStore(x => x.onlineIndicatorPreference);
    const wiredWhisperDisabled = useWiredStore(x => x.wiredWhisperDisabled);
    const cameraFollowEnabled = useConfigValue<boolean>('room.camera.follow_user') === true;
    const smsVerificationEnabled = useConfigValue<boolean>('sms.identity.verification.enabled') === true;
    const smsButtonEnabled = useConfigValue<boolean>('sms.identity.verification.button.enabled') === true;
    const phoneVerificationStatus = useConfigValue<number>('phone.verification.status') ?? 0;
    const phoneCollectionStatus = useConfigValue<number>('phone.collection.status') ?? 0;
    // Flash hides the button on the click and never shows it again for this window.
    const [ phoneResetSent, setPhoneResetSent ] = useState(false);

    const showPhoneReset = !phoneResetSent && smsVerificationEnabled && (phoneVerificationStatus !== PHONE_STATUS_DONE)
        && ((phoneCollectionStatus === PHONE_STATUS_DONE) || (smsButtonEnabled && (phoneCollectionStatus === PHONE_STATUS_NONE)));

    return (
        <ToolbarSettingsWindow
            windowId="toolbar_other_settings"
            templateId="habbo-toolbar-com/me_menu_other_settings_xml"
            height={WINDOW_HEIGHT}
            arrange={({ find }) => find('back_btn')?.setY(BACK_BUTTON_Y)}
            bindings={{
                ignore_room_invites_checkbox: { selected: roomInvitesIgnored, onPointerTap: () => setRoomInvitesIgnored(send, !roomInvitesIgnored) },
                disable_room_camera_follow: { visible: cameraFollowEnabled },
                disable_room_camera_follow_checkbox: { selected: cameraFollowDisabled, onPointerTap: () => setRoomCameraFollowDisabled(send, !cameraFollowDisabled) },
                disable_wired_whisper_checkbox: { selected: wiredWhisperDisabled, onPointerTap: () => setWiredWhisperDisabled(send, !wiredWhisperDisabled) },
                online_indicator_preference: {
                    options: [
                        t('memenu.settings.other.friend.online.notification.0', 'Everyone'),
                        t('memenu.settings.other.friend.online.notification.1', 'Users in my relationship status'),
                        t('memenu.settings.other.friend.online.notification.2', 'Nobody'),
                    ],
                    selection: onlineIndicatorPreference,
                    onSelect: (index) => {
                        if (index !== onlineIndicatorPreference) setOnlineIndicatorPreference(send, index);
                    },
                },
                btn_reset_phone_number_collection: {
                    visible: showPhoneReset,
                    onPointerTap: () => {
                        setPhoneResetSent(true);
                        resetPhoneNumberCollection(send);
                    },
                },
                graphics_settings: { visible: false },
                back_btn: { onPointerTap: onClose },
            }}
        />
    );
};
