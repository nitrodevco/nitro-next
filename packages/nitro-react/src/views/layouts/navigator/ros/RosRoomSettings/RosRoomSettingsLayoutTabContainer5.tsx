import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, RadioButton, Region, ScrollArea, ThemeText } from '#base/theme';

/** Named region `tab_container_5` of RosRoomSettingsLayout - configured through the parent's `tabContainer5` prop. */
export interface RosRoomSettingsLayoutTabContainer5Props {
    captionModerationBanHeader?: string;
    captionModerationBannedUsersLabel?: string;
    captionModerationBanNoneLabel?: string;
    captionModerationBanRights?: string;
    captionModerationHeader?: string;
    captionModerationKickAllLabel?: string;
    captionModerationKickHeader?: string;
    captionModerationKickNoneLabel?: string;
    captionModerationKickRightsHeader?: string;
    captionModerationMuteHeader?: string;
    captionModerationMuteNoneLabel?: string;
    captionModerationMuteRightsLabel?: string;
    itemsModerationBannedUsers?: ReactNode;
    layout?: BoxLayout;
    onModerationBanDropdown?: () => void;
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    onModerationKickAll?: () => void;
    onModerationKickDropdown?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    onModerationMuteDropdown?: () => void;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    onModerationUnbanBtn?: () => void;
    visibleModerationBanSelector?: boolean;
    visibleModerationKickSelector?: boolean;
    visibleModerationMuteSelector?: boolean;
    visibleTabContainer5?: boolean;
}

export const RosRoomSettingsLayoutTabContainer5 = ({ captionModerationBanHeader, captionModerationBannedUsersLabel, captionModerationBanNoneLabel, captionModerationBanRights, captionModerationHeader, captionModerationKickAllLabel, captionModerationKickHeader, captionModerationKickNoneLabel, captionModerationKickRightsHeader, captionModerationMuteHeader, captionModerationMuteNoneLabel, captionModerationMuteRightsLabel, itemsModerationBannedUsers, layout, onModerationBanDropdown, onModerationBanNone, onModerationBanRights, onModerationKickAll, onModerationKickDropdown, onModerationKickNone, onModerationKickRights, onModerationMuteDropdown, onModerationMuteNone, onModerationMuteRights, onModerationUnbanBtn, visibleModerationBanSelector, visibleModerationKickSelector, visibleModerationMuteSelector, visibleTabContainer5 }: RosRoomSettingsLayoutTabContainer5Props) => {
    const t = useTranslation();

    return (
        (visibleTabContainer5 ?? false) && (
            <Region
                name="tab_container_5"
                layout={{ position: 'absolute', left: 0, right: -4, top: 0, height: 367, ...layout }}
            >
                <Region
                    name="moderation_header"
                    layout={{ position: 'absolute', left: 6, width: 317, top: 5, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationHeader ?? t('navigator.roomsettings.moderation.header')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 317 }}
                    />
                </Region>
                <Region
                    name="moderation_mute_header"
                    layout={{ position: 'absolute', left: 7, width: 276, top: 42, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationMuteHeader ?? t('navigator.roomsettings.moderation.mute.header')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                {(visibleModerationMuteSelector ?? false) && (
                    <Region
                        name="moderation_mute_selector"
                        layout={{ position: 'absolute', left: 10, width: 291, top: 61, height: 31 }}
                    >
                        <RadioButton
                            variant="0"
                            name="moderation_mute_none"
                            onPointerTap={onModerationMuteNone}
                            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
                        />
                        <RadioButton
                            variant="0"
                            name="moderation_mute_rights"
                            onPointerTap={onModerationMuteRights}
                            layout={{ position: 'absolute', left: 110, width: 147, top: 0, height: 20 }}
                        />
                        <Region
                            name="moderation_mute_none_label"
                            layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationMuteNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Region
                            name="moderation_mute_rights_label"
                            layout={{ position: 'absolute', left: 125, width: 162, top: -2, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationMuteRightsLabel ?? t('navigator.roomsettings.moderation.rights')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    </Region>
                )}
                <Region
                    name="moderation_kick_header"
                    layout={{ position: 'absolute', left: 7, width: 273, top: 92, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationKickHeader ?? t('navigator.roomsettings.moderation.kick.header')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                {(visibleModerationKickSelector ?? false) && (
                    <Region
                        name="moderation_kick_selector"
                        layout={{ position: 'absolute', left: 10, width: 325, top: 112, height: 26 }}
                    >
                        <Region
                            name="moderation_kick_all_label"
                            layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationKickAllLabel ?? t('navigator.roomsettings.moderation.all')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <RadioButton
                            variant="0"
                            name="moderation_kick_all"
                            onPointerTap={onModerationKickAll}
                            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 20 }}
                        />
                        <Region
                            name="moderation_kick_rights_header"
                            layout={{ position: 'absolute', left: 126, width: 123, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationKickRightsHeader ?? t('navigator.roomsettings.moderation.rights')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <RadioButton
                            variant="0"
                            name="moderation_kick_none"
                            onPointerTap={onModerationKickNone}
                            layout={{ position: 'absolute', left: 240, width: 104, top: 0, height: 19 }}
                        />
                        <Region
                            name="moderation_kick_none_label"
                            layout={{ position: 'absolute', left: 255, width: 66, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationKickNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <RadioButton
                            variant="0"
                            name="moderation_kick_rights"
                            onPointerTap={onModerationKickRights}
                            layout={{ position: 'absolute', left: 110, width: 90, top: 0, height: 20 }}
                        />
                    </Region>
                )}
                <Region
                    name="moderation_ban_header"
                    layout={{ position: 'absolute', left: 7, width: 292, top: 142, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationBanHeader ?? t('navigator.roomsettings.moderation.ban.header')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                {(visibleModerationBanSelector ?? false) && (
                    <Region
                        name="moderation_ban_selector"
                        layout={{ position: 'absolute', left: 10, width: 293, top: 161, height: 23 }}
                    >
                        <Region
                            name="moderation_ban_none_label"
                            layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationBanNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <RadioButton
                            variant="0"
                            name="moderation_ban_none"
                            onPointerTap={onModerationBanNone}
                            layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
                        />
                        <RadioButton
                            variant="0"
                            name="moderation_ban_rights"
                            onPointerTap={onModerationBanRights}
                            layout={{ position: 'absolute', left: 110, width: 177, top: 0, height: 20 }}
                        />
                        <Region
                            name="moderation_ban_rights"
                            layout={{ position: 'absolute', left: 125, width: 197, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationBanRights ?? t('navigator.roomsettings.moderation.rights')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    </Region>
                )}
                <Border
                    variant="0"
                    name="moderation_banned_users_cont"
                    layout={{ position: 'absolute', left: 8, width: 172, top: 200, height: 156 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 3, width: 129, top: 4, height: 146 }}
                    >
                        <Region
                            name="moderation_banned_users"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsModerationBannedUsers}
                        </Region>
                    </ScrollArea>
                    {/* <scrollbar_vertical> for moderation_banned_users - rendered by that list's ScrollArea */}
                </Border>
                <Region
                    name="moderation_banned_users_label"
                    layout={{ position: 'absolute', left: 190, width: 125, top: 236, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationBannedUsersLabel ?? t('navigator.roomsettings.moderation.banned.users')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <Button
                    variant="3"
                    name="moderation_unban_btn"
                    onPointerTap={onModerationUnbanBtn}
                    layout={{ position: 'absolute', left: 190, width: 257, top: 261, height: 32 }}
                >
                    {t('navigator.roomsettings.moderation.unban')}
                </Button>
                <Dropmenu
                    variant="2"
                    name="moderation_mute_dropdown"
                    onPointerTap={onModerationMuteDropdown}
                    layout={{ position: 'absolute', left: 10, width: 276, top: 61, height: 24 }}
                />
                <Dropmenu
                    variant="2"
                    name="moderation_kick_dropdown"
                    onPointerTap={onModerationKickDropdown}
                    layout={{ position: 'absolute', left: 10, width: 276, top: 112, height: 24 }}
                />
                <Dropmenu
                    variant="2"
                    name="moderation_ban_dropdown"
                    onPointerTap={onModerationBanDropdown}
                    layout={{ position: 'absolute', left: 10, width: 276, top: 161, height: 24 }}
                />
            </Region>
        )
    );
};
