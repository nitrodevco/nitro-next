import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, RadioButton, Region, ScrollArea, ThemeText } from '#base/theme';

/** Row template `tab_container_5` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer5ItemProps {
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
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    onModerationKickAll?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    onModerationUnbanBtn?: () => void;
    visibleModerationBanHeader?: boolean;
    visibleModerationBannedUsers?: boolean;
    visibleModerationBannedUsersCont?: boolean;
    visibleModerationBannedUsersLabel?: boolean;
    visibleModerationBanNone?: boolean;
    visibleModerationBanNoneLabel?: boolean;
    visibleModerationBanRights?: boolean;
    visibleModerationBanSelector?: boolean;
    visibleModerationBanSelectorModerationBanRights?: boolean;
    visibleModerationHeader?: boolean;
    visibleModerationKickAll?: boolean;
    visibleModerationKickAllLabel?: boolean;
    visibleModerationKickHeader?: boolean;
    visibleModerationKickNone?: boolean;
    visibleModerationKickNoneLabel?: boolean;
    visibleModerationKickRights?: boolean;
    visibleModerationKickRightsHeader?: boolean;
    visibleModerationKickSelector?: boolean;
    visibleModerationMuteHeader?: boolean;
    visibleModerationMuteNone?: boolean;
    visibleModerationMuteNoneLabel?: boolean;
    visibleModerationMuteRights?: boolean;
    visibleModerationMuteRightsLabel?: boolean;
    visibleModerationMuteSelector?: boolean;
    visibleModerationUnbanBtn?: boolean;
}

export const RoomSettingsLayoutTabContainer5Item = ({ captionModerationBanHeader, captionModerationBannedUsersLabel, captionModerationBanNoneLabel, captionModerationBanRights, captionModerationHeader, captionModerationKickAllLabel, captionModerationKickHeader, captionModerationKickNoneLabel, captionModerationKickRightsHeader, captionModerationMuteHeader, captionModerationMuteNoneLabel, captionModerationMuteRightsLabel, itemsModerationBannedUsers, layout, onModerationBanNone, onModerationBanRights, onModerationKickAll, onModerationKickNone, onModerationKickRights, onModerationMuteNone, onModerationMuteRights, onModerationUnbanBtn, visibleModerationBanHeader, visibleModerationBannedUsers, visibleModerationBannedUsersCont, visibleModerationBannedUsersLabel, visibleModerationBanNone, visibleModerationBanNoneLabel, visibleModerationBanRights, visibleModerationBanSelector, visibleModerationBanSelectorModerationBanRights, visibleModerationHeader, visibleModerationKickAll, visibleModerationKickAllLabel, visibleModerationKickHeader, visibleModerationKickNone, visibleModerationKickNoneLabel, visibleModerationKickRights, visibleModerationKickRightsHeader, visibleModerationKickSelector, visibleModerationMuteHeader, visibleModerationMuteNone, visibleModerationMuteNoneLabel, visibleModerationMuteRights, visibleModerationMuteRightsLabel, visibleModerationMuteSelector, visibleModerationUnbanBtn }: RoomSettingsLayoutTabContainer5ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_container_5"
            layout={{ width: 297, height: 367, flexShrink: 0, ...layout }}
        >
            {(visibleModerationHeader ?? true) && (
                <Region
                    name="moderation_header"
                    layout={{ position: 'absolute', left: 0, width: 323, top: 0, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationHeader ?? t('navigator.roomsettings.moderation.header')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 323 }}
                    />
                </Region>
            )}
            {(visibleModerationMuteHeader ?? true) && (
                <Region
                    name="moderation_mute_header"
                    layout={{ position: 'absolute', left: 0, width: 276, top: 50, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationMuteHeader ?? t('navigator.roomsettings.moderation.mute.header')}
                </Region>
            )}
            {(visibleModerationMuteSelector ?? true) && (
                <Region
                    name="moderation_mute_selector"
                    layout={{ position: 'absolute', left: 0, width: 291, top: 75, height: 31 }}
                >
                    {(visibleModerationMuteNone ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_mute_none"
                            onPointerTap={onModerationMuteNone}
                            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
                        />
                    )}
                    {(visibleModerationMuteNoneLabel ?? true) && (
                        <Region
                            name="moderation_mute_none_label"
                            layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationMuteNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                        </Region>
                    )}
                    {(visibleModerationMuteRightsLabel ?? true) && (
                        <Region
                            name="moderation_mute_rights_label"
                            layout={{ position: 'absolute', left: 95, width: 162, top: -4, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationMuteRightsLabel ?? t('navigator.roomsettings.moderation.rights')}
                        </Region>
                    )}
                    {(visibleModerationMuteRights ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_mute_rights"
                            onPointerTap={onModerationMuteRights}
                            layout={{ position: 'absolute', left: 80, width: 147, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
            {(visibleModerationKickHeader ?? true) && (
                <Region
                    name="moderation_kick_header"
                    layout={{ position: 'absolute', left: 0, width: 273, top: 110, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationKickHeader ?? t('navigator.roomsettings.moderation.kick.header')}
                </Region>
            )}
            {(visibleModerationKickSelector ?? true) && (
                <Region
                    name="moderation_kick_selector"
                    layout={{ position: 'absolute', left: 0, width: 325, top: 130, height: 26 }}
                >
                    {(visibleModerationKickNone ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_kick_none"
                            onPointerTap={onModerationKickNone}
                            layout={{ position: 'absolute', left: 0, width: 104, top: 0, height: 19 }}
                        />
                    )}
                    {(visibleModerationKickNoneLabel ?? true) && (
                        <Region
                            name="moderation_kick_none_label"
                            layout={{ position: 'absolute', left: 15, width: 66, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationKickNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                        </Region>
                    )}
                    {(visibleModerationKickRightsHeader ?? true) && (
                        <Region
                            name="moderation_kick_rights_header"
                            layout={{ position: 'absolute', left: 96, width: 123, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationKickRightsHeader ?? t('navigator.roomsettings.moderation.rights')}
                        </Region>
                    )}
                    {(visibleModerationKickAllLabel ?? true) && (
                        <Region
                            name="moderation_kick_all_label"
                            layout={{ position: 'absolute', left: 245, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationKickAllLabel ?? t('navigator.roomsettings.moderation.all')}
                        </Region>
                    )}
                    {(visibleModerationKickRights ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_kick_rights"
                            onPointerTap={onModerationKickRights}
                            layout={{ position: 'absolute', left: 80, width: 90, top: 0, height: 20 }}
                        />
                    )}
                    {(visibleModerationKickAll ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_kick_all"
                            onPointerTap={onModerationKickAll}
                            layout={{ position: 'absolute', left: 230, width: 107, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
            {(visibleModerationBanHeader ?? true) && (
                <Region
                    name="moderation_ban_header"
                    layout={{ position: 'absolute', left: 0, width: 292, top: 160, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationBanHeader ?? t('navigator.roomsettings.moderation.ban.header')}
                </Region>
            )}
            {(visibleModerationBanSelector ?? true) && (
                <Region
                    name="moderation_ban_selector"
                    layout={{ position: 'absolute', left: 0, width: 293, top: 180, height: 23 }}
                >
                    {(visibleModerationBanNoneLabel ?? true) && (
                        <Region
                            name="moderation_ban_none_label"
                            layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationBanNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                        </Region>
                    )}
                    {(visibleModerationBanNone ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_ban_none"
                            onPointerTap={onModerationBanNone}
                            layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
                        />
                    )}
                    {(visibleModerationBanRights ?? true) && (
                        <Region
                            name="moderation_ban_rights"
                            layout={{ position: 'absolute', left: 95, width: 197, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionModerationBanRights ?? t('navigator.roomsettings.moderation.rights')}
                        </Region>
                    )}
                    {(visibleModerationBanSelectorModerationBanRights ?? true) && (
                        <RadioButton
                            variant="0"
                            name="moderation_ban_rights"
                            onPointerTap={onModerationBanRights}
                            layout={{ position: 'absolute', left: 80, width: 177, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
            {(visibleModerationBannedUsersCont ?? true) && (
                <Border
                    variant="0"
                    name="moderation_banned_users_cont"
                    layout={{ position: 'absolute', left: 0, width: 172, top: 210, height: 156 }}
                >
                    {(visibleModerationBannedUsers ?? true) && (
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
                    )}
                    {/* <scrollbar_vertical> for moderation_banned_users - rendered by that list's ScrollArea */}
                </Border>
            )}
            {(visibleModerationBannedUsersLabel ?? true) && (
                <Region
                    name="moderation_banned_users_label"
                    layout={{ position: 'absolute', left: 178, width: 125, top: 233, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationBannedUsersLabel ?? t('navigator.roomsettings.moderation.banned.users')}
                </Region>
            )}
            {(visibleModerationUnbanBtn ?? true) && (
                <Button
                    variant="3"
                    name="moderation_unban_btn"
                    onPointerTap={onModerationUnbanBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 182, width: 257, top: 261, height: 32 }}
                >
                    {t('navigator.roomsettings.moderation.unban')}
                </Button>
            )}
        </Region>
    );
};
