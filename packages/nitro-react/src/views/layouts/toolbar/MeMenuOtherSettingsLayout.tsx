import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Region, ThemeText } from '#base/theme';

/** Generated from `1210_me_menu_other_settings_xml` (layout "memenu_chat_settings", 242x184) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuOtherSettingsLayoutProps {
    captionSettingsTitle?: string;
    itemsDisableRoomCameraFollow?: ReactNode;
    itemsDisableWiredWhisper?: ReactNode;
    itemsIgnoreRoomInvites?: ReactNode;
    layout?: BoxLayout;
    onBackBtn?: () => void;
    onBtnResetPhoneNumberCollection?: () => void;
}

export const MeMenuOtherSettingsLayout = ({ captionSettingsTitle, itemsDisableRoomCameraFollow, itemsDisableWiredWhisper, itemsIgnoreRoomInvites, layout, onBackBtn, onBtnResetPhoneNumberCollection }: MeMenuOtherSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 242, height: 184, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 242, top: 1, height: 184 }}
            >
                <Region
                    name="settings_title"
                    params={786640}
                    layout={{ position: 'absolute', left: 45, width: 153, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('widget.memenu.other.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={786640}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 40, width: 162, top: 24, height: 1 }}
                />
                <Region
                    params={8388624}
                    layout={{ position: 'absolute', left: 10, width: 222, top: 35, height: 99, flexDirection: 'column', gap: 7 }}
                >
                    <Region
                        name="ignore_room_invites"
                        params={16}
                        layout={{ width: 267, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsIgnoreRoomInvites ?? (
                            <MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 247, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('memenu.settings.other.ignore.room.invites')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="disable_room_camera_follow"
                        params={16}
                        layout={{ width: 313, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsDisableRoomCameraFollow ?? (
                            <MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 293, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('memenu.settings.other.disable.room.camera.follow')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="disable_wired_whisper"
                        params={16}
                        layout={{ width: 179, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsDisableWiredWhisper ?? (
                            <MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 159, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('memenu.settings.wired_whisper_read_disable')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="btn_reset_phone_number_collection"
                        params={131089}
                        onPointerTap={onBtnResetPhoneNumberCollection}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 210, height: 30, flexShrink: 0, maxWidth: 210 }}
                    >
                        {t('memenu.settings.reset.phone.number.collection')}
                    </Button>
                </Region>
                <Button
                    variant="3"
                    name="back_btn"
                    params={1180721}
                    onPointerTap={onBackBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 10, width: 60, top: 148, height: 28, minWidth: 60, maxWidth: 60, minHeight: 28, maxHeight: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};

/** Row template `ignore_room_invites_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItemProps {
    layout?: BoxLayout;
    onIgnoreRoomInvitesCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem = ({ layout, onIgnoreRoomInvitesCheckbox }: MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="ignore_room_invites_checkbox"
            params={17}
            onPointerTap={onIgnoreRoomInvitesCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `disable_room_camera_follow_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItemProps {
    layout?: BoxLayout;
    onDisableRoomCameraFollowCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem = ({ layout, onDisableRoomCameraFollowCheckbox }: MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="disable_room_camera_follow_checkbox"
            params={17}
            onPointerTap={onDisableRoomCameraFollowCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `disable_wired_whisper_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItemProps {
    layout?: BoxLayout;
    onDisableWiredWhisperCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem = ({ layout, onDisableWiredWhisperCheckbox }: MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="disable_wired_whisper_checkbox"
            params={17}
            onPointerTap={onDisableWiredWhisperCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
