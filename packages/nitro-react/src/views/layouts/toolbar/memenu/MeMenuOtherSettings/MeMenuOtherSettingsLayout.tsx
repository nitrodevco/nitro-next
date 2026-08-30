import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem } from './MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem';
import { MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem } from './MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem';
import { MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem } from './MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem';

/** Generated from `1210_me_menu_other_settings_xml` (layout "memenu_chat_settings", 242x184) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuOtherSettingsLayoutProps {
    captionSettingsTitle?: string;
    itemsDisableRoomCameraFollow?: ReactNode;
    itemsDisableWiredWhisper?: ReactNode;
    itemsIgnoreRoomInvites?: ReactNode;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
    onBtnResetPhoneNumberCollection?: () => void;
}

export const MeMenuOtherSettingsLayout = ({ captionSettingsTitle, itemsDisableRoomCameraFollow, itemsDisableWiredWhisper, itemsIgnoreRoomInvites, layout, line, onBackBtn, onBtnResetPhoneNumberCollection }: MeMenuOtherSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 242, height: 184, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 242, top: 1, height: 184, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('widget.memenu.other.settings.title')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="settings_title"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 153, top: 5, height: 17 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', width: 162, top: 24, height: 1 }}
                >
                    {line}
                </Region>
                <Region layout={{ position: 'absolute', left: 10, width: 222, top: 35, height: 99, flexDirection: 'column', gap: 7 }}>
                    <Region
                        name="ignore_room_invites"
                        layout={{ width: 267, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsIgnoreRoomInvites ?? (
                            <MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem />
                        )}
                        <ThemeText
                            text={t('memenu.settings.other.ignore.room.invites')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                            layout={{ width: 247, height: 17, flexShrink: 0 }}
                        />
                    </Region>
                    <Region
                        name="disable_room_camera_follow"
                        layout={{ width: 313, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsDisableRoomCameraFollow ?? (
                            <MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem />
                        )}
                        <ThemeText
                            text={t('memenu.settings.other.disable.room.camera.follow')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                            layout={{ width: 293, height: 17, flexShrink: 0 }}
                        />
                    </Region>
                    <Region
                        name="disable_wired_whisper"
                        layout={{ width: 179, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsDisableWiredWhisper ?? (
                            <MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem />
                        )}
                        <ThemeText
                            text={t('memenu.settings.wired_whisper_read_disable')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                            layout={{ width: 159, height: 17, flexShrink: 0 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="btn_reset_phone_number_collection"
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
                    onPointerTap={onBackBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 8, height: 28, minWidth: 60, maxWidth: 60, minHeight: 28, maxHeight: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
