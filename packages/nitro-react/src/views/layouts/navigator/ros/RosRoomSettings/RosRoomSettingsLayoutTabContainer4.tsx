import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `tab_container_4` of RosRoomSettingsLayout - configured through the parent's `tabContainer4` prop. */
export interface RosRoomSettingsLayoutTabContainer4Props {
    captionChatSettingsText?: string;
    captionDoNotLeaveOnDoorTileText?: string;
    captionHideWallsText?: string;
    captionIdleAutokickText?: string;
    captionIdleAutokickTimeoutLabel?: string;
    captionIdleSleepText?: string;
    captionIdleSleepTimeoutLabel?: string;
    captionRoomBehaviorText?: string;
    captionVipSettingsText?: string;
    captionVipTabCaption?: string;
    captionVipTabInfo?: string;
    layout?: BoxLayout;
    onChatFloodSensitivity?: () => void;
    onDoNotLeaveOnDoorTileCheckbox?: () => void;
    onFloorThickness?: () => void;
    onHideWallsCheckbox?: () => void;
    onIdleAutokickCheckbox?: () => void;
    onIdleSleepCheckbox?: () => void;
    onWallThickness?: () => void;
}

export const RosRoomSettingsLayoutTabContainer4 = ({ captionChatSettingsText, captionDoNotLeaveOnDoorTileText, captionHideWallsText, captionIdleAutokickText, captionIdleAutokickTimeoutLabel, captionIdleSleepText, captionIdleSleepTimeoutLabel, captionRoomBehaviorText, captionVipSettingsText, captionVipTabCaption, captionVipTabInfo, layout, onChatFloodSensitivity, onDoNotLeaveOnDoorTileCheckbox, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onWallThickness }: RosRoomSettingsLayoutTabContainer4Props) => {
    const t = useTranslation();
    const [ idleSleepTimeoutValue, setIdleSleepTimeoutValue ] = useState('');
    const [ idleAutokickTimeoutValue, setIdleAutokickTimeoutValue ] = useState('');

    return (
        <Region
            name="tab_container_4"
            layout={{ position: 'absolute', left: 6, width: 322, top: 0, height: 395, ...layout }}
        >
            <Region
                name="vip_tab_caption"
                layout={{ position: 'absolute', left: 0, width: 237, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipTabCaption ?? t('navigator.roomsettings.vip.caption')}
                    textStyle="text-style-u-headline-small"
                />
            </Region>
            <Region
                name="vip_tab_info"
                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipTabInfo ?? t('navigator.roomsettings.vip.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                />
            </Region>
            <Region
                name="vip_settings_text"
                layout={{ position: 'absolute', left: 0, width: 206, top: 84, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipSettingsText ?? t('navigator.roomsettings.vip_settings')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <CheckBox
                variant="0"
                name="hide_walls_checkbox"
                onPointerTap={onHideWallsCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 104, height: 20 }}
            />
            <Region
                name="hide_walls_text"
                layout={{ position: 'absolute', left: 20, width: 194, top: 103, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHideWallsText ?? t('navigator.roomsettings.hide_walls')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Dropmenu
                variant="2"
                name="wall_thickness"
                onPointerTap={onWallThickness}
                layout={{ position: 'absolute', left: 0, width: 276, top: 125, height: 24 }}
            />
            <Dropmenu
                variant="2"
                name="floor_thickness"
                onPointerTap={onFloorThickness}
                layout={{ position: 'absolute', left: 0, width: 276, top: 156, height: 24 }}
            />
            <Region
                name="room_behavior_text"
                layout={{ position: 'absolute', left: 0, width: 221, top: 191, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomBehaviorText ?? t('navigator.roomsettings.room_behavior')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <CheckBox
                variant="0"
                name="do_not_leave_on_door_tile_checkbox"
                onPointerTap={onDoNotLeaveOnDoorTileCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 212, height: 20 }}
            />
            <Region
                name="do_not_leave_on_door_tile_text"
                layout={{ position: 'absolute', left: 20, width: 292, top: 211, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoNotLeaveOnDoorTileText ?? t('navigator.roomsettings.do_not_leave_on_door_tile')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <CheckBox
                variant="0"
                name="idle_sleep_checkbox"
                onPointerTap={onIdleSleepCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 234, height: 20 }}
            />
            <Region
                name="idle_sleep_text"
                layout={{ position: 'absolute', left: 20, width: 192, top: 233, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleSleepText ?? t('navigator.roomsettings.idle_sleep')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <TextInput
                value={idleSleepTimeoutValue}
                onChange={setIdleSleepTimeoutValue}
                backgroundColor="#fbfbf9"
                layout={{ position: 'absolute', left: 24, width: 50, top: 255, height: 20 }}
            />
            <Region
                name="idle_sleep_timeout_label"
                layout={{ position: 'absolute', left: 77, width: 231, top: 257, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleSleepTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <CheckBox
                variant="0"
                name="idle_autokick_checkbox"
                onPointerTap={onIdleAutokickCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 280, height: 20 }}
            />
            <Region
                name="idle_autokick_text"
                layout={{ position: 'absolute', left: 20, width: 210, top: 279, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleAutokickText ?? t('navigator.roomsettings.idle_autokick')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <TextInput
                value={idleAutokickTimeoutValue}
                onChange={setIdleAutokickTimeoutValue}
                backgroundColor="#fbfbf9"
                layout={{ position: 'absolute', left: 24, width: 50, top: 301, height: 20 }}
            />
            <Region
                name="idle_autokick_timeout_label"
                layout={{ position: 'absolute', left: 77, width: 231, top: 303, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleAutokickTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="chat_settings_text"
                layout={{ position: 'absolute', left: 0, width: 260, top: 335, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionChatSettingsText ?? t('navigator.roomsettings.chat.flood_sensitivity')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Dropmenu
                variant="2"
                name="chat_flood_sensitivity"
                onPointerTap={onChatFloodSensitivity}
                layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
            />
        </Region>
    );
};
