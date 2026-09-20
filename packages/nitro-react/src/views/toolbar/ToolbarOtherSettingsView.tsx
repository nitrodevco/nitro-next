/**
 * The toolbar's "other settings" window - `toolbar/extensions/settings/OtherSettingsView` on the
 * `me_menu_other_settings` layout (242 x 239, the 2026 revision with the online indicator menu):
 * ignore room invites, disable the room camera's follow (only with `room.camera.follow_user`),
 * turn wired whispers off (`WiredMenuController.wiredWhisperDisabled`), who is told when this user
 * comes online, and the phone number collection reset (only while `sms.identity.verification.*`
 * and the phone statuses say it applies). Every switch is saved the moment it is flipped. Opened
 * from the settings list under the purse (`ToolbarSettingsView`), placed as Flash placed it: at
 * the top of the desktop, 200 pixels from its right edge.
 */
import { useState } from 'react';

import { resetPhoneNumberCollection, setOnlineIndicatorPreference, setRoomCameraFollowDisabled, setRoomInvitesIgnored, setWiredWhisperDisabled } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useWiredStore } from '#base/context/wired';
import { Border, Box, Button, CheckBox, Region, ThemeText } from '#base/theme';
import { WiredMenuDropmenu } from '#base/views/wired-menu/WiredMenuDropmenu';

/** `me_menu_other_settings` - the window, and the itemlist its rows sit in (`spacing` 7). */
const WINDOW_WIDTH = 242;
const WINDOW_HEIGHT = 239;
const LIST_WIDTH = 222;
/** `SettingsExtension.openOtherSettingsWindow`: `desktop.width - window.width - 200`. */
const RIGHT_MARGIN = 200;

/** `phone.verification.status` / `phone.collection.status` values the reset button tests. */
const PHONE_STATUS_DONE = 2;
const PHONE_STATUS_NONE = 0;

interface CheckRowProps {
    label: string;
    selected: boolean;
    onToggle: (selected: boolean) => void;
}

/** An `itemlist_horizontal` row: the 15 x 15 checkbox one pixel down, the label 5 pixels after it. */
const CheckRow = ({ label, selected, onToggle }: CheckRowProps) => (
    <Box layout={{ flexDirection: 'row', gap: 5, height: 16, flexShrink: 0 }}>
        <CheckBox
            variant="3"
            selected={selected}
            onPointerTap={() => onToggle(!selected)}
            layout={{ width: 15, height: 15, marginTop: 1, flexShrink: 0 }}
        />
        <ThemeText
            text={label}
            textStyle="text-style-u-regular"
            textOptions={{ fill: '#ffffff' }}
        />
    </Box>
);

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

    const onlineOptions = [
        t('memenu.settings.other.friend.online.notification.0', 'Everyone'),
        t('memenu.settings.other.friend.online.notification.1', 'Users in my relationship status'),
        t('memenu.settings.other.friend.online.notification.2', 'Nobody'),
    ];

    return (
        <Region layout={{ position: 'absolute', top: 0, right: RIGHT_MARGIN, width: WINDOW_WIDTH + 1, height: WINDOW_HEIGHT + 1 }}>
            <Border
                variant="6"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, top: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
            >
                <ThemeText
                    text={t('widget.memenu.other.settings.title')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    layout={{ position: 'absolute', left: 45, top: 5, width: 153, height: 17 }}
                />
                <Region
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 40, top: 24, width: 162, height: 1 }}
                />
                <Box layout={{ position: 'absolute', left: 10, top: 35, width: LIST_WIDTH, flexDirection: 'column', gap: 7 }}>
                    <CheckRow
                        label={t('memenu.settings.other.ignore.room.invites')}
                        selected={roomInvitesIgnored}
                        onToggle={selected => setRoomInvitesIgnored(send, selected)}
                    />
                    {cameraFollowEnabled && (
                        <CheckRow
                            label={t('memenu.settings.other.disable.room.camera.follow')}
                            selected={cameraFollowDisabled}
                            onToggle={selected => setRoomCameraFollowDisabled(send, selected)}
                        />
                    )}
                    <CheckRow
                        label={t('memenu.settings.wired_whisper_read_disable')}
                        selected={wiredWhisperDisabled}
                        onToggle={selected => setWiredWhisperDisabled(send, selected)}
                    />
                    <ThemeText
                        text={t('memenu.settings.other.friend.online.notification.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        layout={{ width: LIST_WIDTH, height: 17 }}
                    />
                    <WiredMenuDropmenu
                        items={onlineOptions}
                        selected={onlineIndicatorPreference}
                        onSelect={selection => setOnlineIndicatorPreference(send, selection)}
                        layout={{ width: LIST_WIDTH, height: 24 }}
                    />
                    {showPhoneReset && (
                        <Button
                            variant="3"
                            textStyle="text-style-button-shiny-regular"
                            onPointerTap={() => {
                                setPhoneResetSent(true);
                                resetPhoneNumberCollection(send);
                            }}
                            layout={{ marginLeft: 10, width: 210, height: 30, flexShrink: 0 }}
                        >
                            {t('memenu.settings.reset.phone.number.collection')}
                        </Button>
                    )}
                </Box>
                <Button
                    variant="3"
                    textStyle="text-style-button-shiny-regular"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 10, top: 203, width: 60, height: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
