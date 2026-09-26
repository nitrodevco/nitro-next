/** Shared Flash GroupDetailsCtrl content and its standalone DetailsWindowCtrl frame. */
import { GUILD_MEMBERSHIP_MEMBER, GUILD_MEMBERSHIP_REQUESTED, GUILD_TYPE_EXCLUSIVE, GUILD_TYPE_PRIVATE, GUILD_TYPE_REGULAR, IHabboGroupDetails, isGuildJoiningAllowed, isGuildLeaveAllowed, isGuildMembershipRequestAllowed } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, ButtonThick, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { GroupBadgeImage } from './GroupBadgeImage';

export interface GroupInfoViewProps {
    details: IHabboGroupDetails;
    /** `delete_guild_region`: `group.deletion.enabled` and either owning the group or being staff. */
    canDelete: boolean;
    onClose: () => void;
    onJoin: () => void;
    onLeave: () => void;
    onManage: () => void;
    onDelete: () => void;
    onMembers: () => void;
    onPendingMembers: () => void;
    onBaseRoom: () => void;
    onBuyFurni: () => void;
    onShowGroups: () => void;
    onForum: () => void;
}

/** `pending_members_region`'s own `y`, which the manage and delete links are placed against. */
const LINK_COLUMN_TOP = 121;

/** How far `GroupDetailsCtrl` drops each following link when the one above it is shown. */
const LINK_ROW_HEIGHT = 16;

/**
 * The three `grouptype_region_<n>` icons, with the file each one loads. `group.xml` names
 * `grouptype_icon_5.png` for the regular type, not the `grouptype_icon_0.png` the settings tab's
 * own selector uses, so the file is taken from the layout rather than built from the type.
 *
 * `getGroupTypeRegion` only has these three: a group of type 3 or 4 shows no icon at all.
 */
const GROUP_TYPE_ICONS = [
    { type: GUILD_TYPE_REGULAR, file: 'grouptype_icon_5', help: 'group.edit.settings.type.regular.help' },
    { type: GUILD_TYPE_EXCLUSIVE, file: 'grouptype_icon_1', help: 'group.edit.settings.type.exclusive.help' },
    { type: GUILD_TYPE_PRIVATE, file: 'grouptype_icon_2', help: 'group.edit.settings.type.private.help' },
];

/**
 * The group details window - `group_info_window` with `group` inside it, drawn by
 * `DetailsWindowCtrl` and `GroupDetailsCtrl`.
 *
 * One of the layout's controls is not offered, because its destination is missing rather than by
 * choice: `show_forum_link` leads to the group forums, which are not ported.
 */
export const GroupDetailsView = ({
    details, canDelete, onJoin, onLeave, onManage, onDelete, onMembers, onPendingMembers, onBaseRoom, onBuyFurni, onShowGroups, onForum,
}: Omit<GroupInfoViewProps, 'onClose'>) => {
    const t = useTranslation();
    // The window's own icons are hotel art: the layout names them under `${image.library.url}guilds/`.
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    const status = Number(details.status);
    const showPending = details.pendingMemberCount > 0;
    const showManage = details.isOwner && details.isGuild;
    const showDelete = details.isGuild && canDelete;
    const manageTop = showPending ? (LINK_COLUMN_TOP + LINK_ROW_HEIGHT) : LINK_COLUMN_TOP;
    const deleteTop = showManage ? (manageTop + LINK_ROW_HEIGHT) : LINK_COLUMN_TOP;

    // `group_name` starts after the decorate icon when that icon is shown, and in its place when it is not.
    const nameLeft = details.membersCanDecorate ? 140 : 125;

    const isMember = status === GUILD_MEMBERSHIP_MEMBER;
    const showYouAreMember = !details.isGuild && isMember;

    /*
     * `onJoin` disables the join button so a second press cannot send a second request, and every
     * `refresh` calls `enable()` on it again - so the next details answer, which is a new object,
     * brings it back.
     */
    const [ joinSentFor, setJoinSentFor ] = useState<IHabboGroupDetails | undefined>(undefined);

    if (joinSentFor && (joinSentFor !== details)) setJoinSentFor(undefined);

    return (
        <Border
            variant="0"
            name="group_info"
            tintColor="#cccccc"
            layout={{ position: 'absolute', left: 0, width: 343, top: 0, height: 214, overflow: 'hidden' }}
        >
            <ThemeText
                text={details.groupName}
                textStyle="u_bold"
                clip
                name="group_name"
                verticalAlign="top"
                layout={{ position: 'absolute', left: nameLeft, right: 12, top: 9, height: 17 }}
            />
            {GROUP_TYPE_ICONS.filter(icon => icon.type === Number(details.type)).map(icon => (
                <Region
                    key={icon.type}
                    name={`grouptype_region_${icon.type}`}
                    tooltip={t(icon.help)}
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name={`grouptype_icon_${icon.type}`}
                        src={`${imageLibraryUrl}guilds/${icon.file}.png`}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
            ))}
            {details.membersCanDecorate && (
                <Region
                    name="group_decorate_icon_region"
                    tooltip={t('group.memberscandecorate')}
                    layout={{ position: 'absolute', left: 125, width: 15, top: 10, height: 15 }}
                >
                    <ThemeImage
                        name="group_decorate_icon"
                        src={`${imageLibraryUrl}guilds/group_decorate_icon.png`}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                    />
                </Region>
            )}
            <GroupBadgeImage
                badgeCode={details.badgeCode}
                zoom={2}
                layout={{ position: 'absolute', left: 11, width: 85, top: 14, height: 85 }}
            />
            <ThemeText
                text={t('group.created', '', { date: details.creationDate, owner: details.ownerName })}
                textStyle="u_small"
                name="created_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 103, top: 27 }}
            />
            <ScrollArea
                orientation="vertical"
                variant="0"
                hideDisabledScrollbar={false}
                layout={{ position: 'absolute', left: 103, right: 5, top: 41, bottom: 117, overflow: 'hidden' }}
                viewportLayout={{ position: 'absolute', left: 0, top: 1, width: 215, height: 55 }}
                scrollbarLayout={{ position: 'absolute', left: 218, top: 0, width: 17, height: 56 }}
            >
                <Region
                    name="group_description_item_list"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    <ThemeText
                        text={details.description}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 211 }}
                        name="group_description"
                        verticalAlign="top"
                        layout={{ width: '100%' }}
                    />
                </Region>
            </ScrollArea>
            <Region
                name="members_region"
                onPointerTap={onMembers}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 97, top: 103, height: 18, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('group.membercount', '', { totalMembers: `${details.totalMembers}` })}
                    textStyle="u_bold"
                    flashFormat={{ underline: true }}
                    name="members_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, top: 0 }}
                />
            </Region>
            {showPending && (
                <Region
                    name="pending_members_region"
                    onPointerTap={onPendingMembers}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: LINK_COLUMN_TOP, height: 18, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('group.pendingmembercount', '', { amount: `${details.pendingMemberCount}` })}
                        textStyle="u_bold"
                        flashFormat={{ underline: true }}
                        name="pending_members_txt"
                        verticalAlign="top"
                        layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, top: 0 }}
                    />
                </Region>
            )}
            {showManage && (
                <Region
                    name="manage_guild_region"
                    onPointerTap={onManage}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: manageTop, height: 18, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('group.manage')}
                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                        name="manage_guild_link"
                        verticalAlign="top"
                        layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5 }}
                    />
                </Region>
            )}
            {showDelete && (
                <Region
                    name="delete_guild_region"
                    onPointerTap={onDelete}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: deleteTop, height: 18, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('group.delete')}
                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                        name="delete_guild_link"
                        verticalAlign="top"
                        layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5 }}
                    />
                </Region>
            )}
            {(details.roomId > -1) && (
                <Region
                    name="group_room_link_region"
                    onPointerTap={onBaseRoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 238, top: 103, height: 18 }}
                >
                    <ThemeText
                        text={t('group.linktobase', '', { room_name: details.roomName })}
                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                        name="group_room_link"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                </Region>
            )}
            <Region
                name="buy_furni_link_region"
                onPointerTap={onBuyFurni}
                cursor="pointer"
                layout={{ position: 'absolute', left: 103, width: 238, top: 119, height: 18, overflow: 'hidden' }}
            >
                <ThemeText
                    text={t('group.buyfurni')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                    name="buy_furni_link"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 2 }}
                />
            </Region>
            <Region
                name="show_groups_link_region"
                onPointerTap={onShowGroups}
                cursor="pointer"
                layout={{ position: 'absolute', left: 103, width: 238, top: 137, height: 18, overflow: 'hidden' }}
            >
                <ThemeText
                    text={t('group.showgroups')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                    name="show_groups_link"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 2 }}
                />
            </Region>
            {details.hasBoard && (
                <Region
                    name="show_forum_link_region"
                    onPointerTap={onForum}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 255, top: 155, height: 18, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={t('group.showforum')}
                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                        name="show_forum_link"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 2 }}
                    />
                </Region>
            )}
            {isGuildLeaveAllowed(details) && (
                <ButtonThick
                    variant="3"
                    name="leave_button"
                    onPointerTap={onLeave}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    {t('group.leave')}
                </ButtonThick>
            )}
            {isGuildJoiningAllowed(details) && (
                <ButtonThick
                    variant="3"
                    name="join_button"
                    disabled={joinSentFor === details}
                    onPointerTap={() => {
                        setJoinSentFor(details);
                        onJoin();
                    }}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    {t('group.join')}
                </ButtonThick>
            )}
            {isGuildMembershipRequestAllowed(details) && (
                <ButtonThick
                    variant="3"
                    name="request_membership_button"
                    onPointerTap={onJoin}
                    layout={{ position: 'absolute', left: 49, width: 260, top: 179, height: 29, minWidth: 260, maxWidth: 260 }}
                >
                    {t('group.requestmembership')}
                </ButtonThick>
            )}
            {details.isGuild && details.isOwner && (
                <Region
                    name="you_are_owner_region"
                    tooltip={t('group.youareowner')}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_owner"
                        src={`${imageLibraryUrl}guilds/group_icon_big_owner.png`}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {details.isGuild && details.isAdmin && !details.isOwner && (
                <Region
                    name="you_are_admin_region"
                    tooltip={t('group.youareadmin')}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_off"
                        src={`${imageLibraryUrl}guilds/group_icon_big_admin.png`}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {details.isGuild && isMember && !details.isAdmin && !details.isOwner && (
                <Region
                    name="you_are_member_region"
                    tooltip={t('group.youaremember')}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_over"
                        src={`${imageLibraryUrl}guilds/group_icon_big_member.png`}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(status === GUILD_MEMBERSHIP_REQUESTED) && (
                <ThemeText
                    text={t('group.membershippending')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 13 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    name="membership_pending_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', top: 184 }}
                />
            )}
            {showYouAreMember && (
                <Icon
                    variant="8"
                    name="youaremember_icon"
                    tintColor="#3ce600"
                    layout={{ position: 'absolute', left: 62, width: 16, top: 186, height: 16 }}
                />
            )}
            {showYouAreMember && (
                <ThemeText
                    text={t('group.youaremember')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    name="youaremember_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', top: 184 }}
                />
            )}
        </Border>
    );
};

/** `DetailsWindowCtrl`: the same `GroupDetailsCtrl` content also lives inside an extended profile. */
export const GroupInfoView = ({ onClose, ...props }: GroupInfoViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            name="groups_info_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 363, height: 268 }}
            margins={[ 0, 33, 0, 3 ]}
        >
            <Region
                name="group_cont"
                layout={{ position: 'absolute', left: 10, top: 10, width: 343, height: 214 }}
            >
                <GroupDetailsView {...props} />
            </Region>
        </Frame>
    );
};
