import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Row template `tab_container_4` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer4ItemProps {
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
    visibleChatFloodSensitivity?: boolean;
    visibleChatSettingsText?: boolean;
    visibleDoNotLeaveOnDoorTileCheckbox?: boolean;
    visibleDoNotLeaveOnDoorTileText?: boolean;
    visibleFloorThickness?: boolean;
    visibleHideWallsCheckbox?: boolean;
    visibleHideWallsText?: boolean;
    visibleIdleAutokickCheckbox?: boolean;
    visibleIdleAutokickText?: boolean;
    visibleIdleAutokickTimeout?: boolean;
    visibleIdleAutokickTimeoutLabel?: boolean;
    visibleIdleSleepCheckbox?: boolean;
    visibleIdleSleepText?: boolean;
    visibleIdleSleepTimeout?: boolean;
    visibleIdleSleepTimeoutLabel?: boolean;
    visibleRoomBehaviorText?: boolean;
    visibleVipSettingsText?: boolean;
    visibleVipTabCaption?: boolean;
    visibleVipTabInfo?: boolean;
    visibleWallThickness?: boolean;
}

export const RoomSettingsLayoutTabContainer4Item = ({ captionChatSettingsText, captionDoNotLeaveOnDoorTileText, captionHideWallsText, captionIdleAutokickText, captionIdleAutokickTimeoutLabel, captionIdleSleepText, captionIdleSleepTimeoutLabel, captionRoomBehaviorText, captionVipSettingsText, captionVipTabCaption, captionVipTabInfo, layout, onChatFloodSensitivity, onDoNotLeaveOnDoorTileCheckbox, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onWallThickness, visibleChatFloodSensitivity, visibleChatSettingsText, visibleDoNotLeaveOnDoorTileCheckbox, visibleDoNotLeaveOnDoorTileText, visibleFloorThickness, visibleHideWallsCheckbox, visibleHideWallsText, visibleIdleAutokickCheckbox, visibleIdleAutokickText, visibleIdleAutokickTimeout, visibleIdleAutokickTimeoutLabel, visibleIdleSleepCheckbox, visibleIdleSleepText, visibleIdleSleepTimeout, visibleIdleSleepTimeoutLabel, visibleRoomBehaviorText, visibleVipSettingsText, visibleVipTabCaption, visibleVipTabInfo, visibleWallThickness }: RoomSettingsLayoutTabContainer4ItemProps) => {
    const t = useTranslation();
    const [ idleSleepTimeoutValue, setIdleSleepTimeoutValue ] = useState('');
    const [ idleAutokickTimeoutValue, setIdleAutokickTimeoutValue ] = useState('');

    return (
        <Region
            name="tab_container_4"
            layout={{ width: 322, height: 395, flexShrink: 0, ...layout }}
        >
            {(visibleVipTabCaption ?? true) && (
                <ThemeText
                    text={captionVipTabCaption ?? t('navigator.roomsettings.vip.caption')}
                    textStyle="text-style-u-headline-small"
                    name="vip_tab_caption"
                    layout={{ position: 'absolute', left: 0, width: 237, top: 3, height: 19 }}
                />
            )}
            {(visibleVipTabInfo ?? true) && (
                <ThemeText
                    text={captionVipTabInfo ?? t('navigator.roomsettings.vip.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                    name="vip_tab_info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 70 }}
                />
            )}
            {(visibleVipSettingsText ?? true) && (
                <ThemeText
                    text={captionVipSettingsText ?? t('navigator.roomsettings.vip_settings')}
                    textStyle="text-style-u-bold"
                    name="vip_settings_text"
                    layout={{ position: 'absolute', left: 0, width: 206, top: 90, height: 17 }}
                />
            )}
            {(visibleHideWallsCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="hide_walls_checkbox"
                    onPointerTap={onHideWallsCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 110, height: 20 }}
                />
            )}
            {(visibleHideWallsText ?? true) && (
                <ThemeText
                    text={captionHideWallsText ?? t('navigator.roomsettings.hide_walls')}
                    textStyle="text-style-u-regular"
                    name="hide_walls_text"
                    layout={{ position: 'absolute', left: 20, width: 194, top: 109, height: 17 }}
                />
            )}
            {(visibleWallThickness ?? true) && (
                <Dropmenu
                    variant="3"
                    name="wall_thickness"
                    onPointerTap={onWallThickness}
                    layout={{ position: 'absolute', left: 0, width: 276, top: 131, height: 24 }}
                />
            )}
            {(visibleFloorThickness ?? true) && (
                <Dropmenu
                    variant="3"
                    name="floor_thickness"
                    onPointerTap={onFloorThickness}
                    layout={{ position: 'absolute', left: 0, width: 276, top: 162, height: 24 }}
                />
            )}
            {(visibleRoomBehaviorText ?? true) && (
                <ThemeText
                    text={captionRoomBehaviorText ?? t('navigator.roomsettings.room_behavior')}
                    textStyle="text-style-u-bold"
                    name="room_behavior_text"
                    layout={{ position: 'absolute', left: 0, width: 148, top: 193, height: 17 }}
                />
            )}
            {(visibleDoNotLeaveOnDoorTileCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="do_not_leave_on_door_tile_checkbox"
                    onPointerTap={onDoNotLeaveOnDoorTileCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 214, height: 20 }}
                />
            )}
            {(visibleDoNotLeaveOnDoorTileText ?? true) && (
                <ThemeText
                    text={captionDoNotLeaveOnDoorTileText ?? t('navigator.roomsettings.do_not_leave_on_door_tile')}
                    textStyle="text-style-u-regular"
                    name="do_not_leave_on_door_tile_text"
                    layout={{ position: 'absolute', left: 20, width: 290, top: 213, height: 17 }}
                />
            )}
            {(visibleIdleSleepCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="idle_sleep_checkbox"
                    onPointerTap={onIdleSleepCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 236, height: 20 }}
                />
            )}
            {(visibleIdleSleepText ?? true) && (
                <ThemeText
                    text={captionIdleSleepText ?? t('navigator.roomsettings.idle_sleep')}
                    textStyle="text-style-u-regular"
                    name="idle_sleep_text"
                    layout={{ position: 'absolute', left: 20, width: 185, top: 235, height: 17 }}
                />
            )}
            {(visibleIdleSleepTimeout ?? true) && (
                <TextInput
                    value={idleSleepTimeoutValue}
                    onChange={setIdleSleepTimeoutValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 20, width: 72, top: 257, height: 20, overflow: 'hidden' }}
                />
            )}
            {(visibleIdleSleepTimeoutLabel ?? true) && (
                <ThemeText
                    text={captionIdleSleepTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                    name="idle_sleep_timeout_label"
                    layout={{ position: 'absolute', left: 98, width: 57, top: 259, height: 17 }}
                />
            )}
            {(visibleIdleAutokickCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="idle_autokick_checkbox"
                    onPointerTap={onIdleAutokickCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 282, height: 20 }}
                />
            )}
            {(visibleIdleAutokickText ?? true) && (
                <ThemeText
                    text={captionIdleAutokickText ?? t('navigator.roomsettings.idle_autokick')}
                    textStyle="text-style-u-regular"
                    name="idle_autokick_text"
                    layout={{ position: 'absolute', left: 20, width: 210, top: 281, height: 17 }}
                />
            )}
            {(visibleIdleAutokickTimeout ?? true) && (
                <TextInput
                    value={idleAutokickTimeoutValue}
                    onChange={setIdleAutokickTimeoutValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 20, width: 72, top: 303, height: 20, overflow: 'hidden' }}
                />
            )}
            {(visibleIdleAutokickTimeoutLabel ?? true) && (
                <ThemeText
                    text={captionIdleAutokickTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                    name="idle_autokick_timeout_label"
                    layout={{ position: 'absolute', left: 98, width: 57, top: 305, height: 17 }}
                />
            )}
            {(visibleChatSettingsText ?? true) && (
                <ThemeText
                    text={captionChatSettingsText ?? t('navigator.roomsettings.chat.flood_sensitivity')}
                    textStyle="text-style-u-bold"
                    name="chat_settings_text"
                    layout={{ position: 'absolute', left: 0, width: 97, top: 333, height: 17 }}
                />
            )}
            {(visibleChatFloodSensitivity ?? true) && (
                <Dropmenu
                    variant="3"
                    name="chat_flood_sensitivity"
                    onPointerTap={onChatFloodSensitivity}
                    layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
                />
            )}
        </Region>
    );
};
