/**
 * The extended profile from Flash `new_extended_profile_xml$36220c362962d21300057f06bc2d5b88461739672`
 * and `ExtendedProfileWindowCtrl.refreshHeader` / `refreshRelationships` / `refreshGroupList`.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { ExtendedProfileMessageType, IHabboUserBadge, IRelationshipStatusInfo } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { AvatarImage } from '#base/components/AvatarImage';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Button, ContainerButton, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';
import { GroupBadgeImage } from '#base/views/groups/GroupBadgeImage';

import { UserProfileGroupDetailsView } from './UserProfileGroupDetailsView';

export interface UserProfileViewProps {
    profile: ExtendedProfileMessageType;
    badges: IHabboUserBadge[];
    relationships: IRelationshipStatusInfo[];
    ownUserId: number;
    activityDisplayEnabled: boolean;
    canAskForFriend: boolean;
    isBlocked: boolean;
    onClose: () => void;
    onAddFriend: () => void;
    onRooms: () => void;
    onChangeLooks: () => void;
    onChangeBadges: () => void;
    onBadgeCount: () => void;
    onSelectGroup: (groupId: number) => void;
    onOpenProfile: (userId: number) => void;
    onFindFriends: () => void;
    onToggleBlock: () => void;
    onShowGroups: () => void;
    onFavouriteGroup: (groupId: number, favourite: boolean) => void;
}

const RELATIONSHIP_NAMES = [ 'heart', 'smile', 'bobba' ];

export const UserProfileView = ({ profile, badges, relationships, ownUserId, activityDisplayEnabled, canAskForFriend, isBlocked, onClose, onAddFriend, onRooms, onChangeLooks, onChangeBadges, onBadgeCount, onSelectGroup, onOpenProfile, onFindFriends, onToggleBlock, onShowGroups, onFavouriteGroup }: UserProfileViewProps) => {
    const t = useTranslation();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const isSelf = profile.userId === ownUserId;
    const isPrivate = profile.isHidden && !isSelf;
    const canAddFriend = canAskForFriend && !profile.isFriend && !profile.isFriendRequestSent && !isSelf;
    const [ selectedId, setSelectedGroupId ] = useState(profile.guilds[0]?.groupId ?? 0);
    const selectedGroupId = profile.guilds.some(group => group.groupId === selectedId) ? selectedId : (profile.guilds[0]?.groupId ?? 0);
    const questingUrl = useConfigValue<string>('image.library.questing.url') ?? '';

    const profileText = (key: string, replacements: Record<string, string>) => t(key, '', replacements);

    return (
        <Frame
            id="user_profile"
            variant="3"
            caption={profileText('extendedprofile.caption', { username: profile.userName })}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            resizeDirection="none"
            layout={{ position: 'absolute', width: 521, height: 537 }}
            margins={[ 3, 36, 3, 3 ]}
        >
            <Region
                name="profile_top"
                layout={{ position: 'absolute', left: 6, top: -1, width: 500, height: 207 }}
            >
                <Region
                    name="profile_avatar"
                    layout={{ position: 'absolute', left: 0, top: 16, width: 56, height: 113 }}
                >
                    {/* `on_resize_align_center`: the cropped widget retains its XML centre at x=27. */}
                    <Region layout={{ position: 'absolute', left: 10, top: 0, width: 34, height: 113, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <AvatarImage
                            figure={profile.figure}
                            gender={AvatarGenderType.Unisex}
                            cropped
                            direction={2}
                        />
                    </Region>
                </Region>
                <Region
                    name="top_divider"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 265, top: 12, width: 1, height: 192 }}
                />
                <ThemeText
                    text={profileText('extendedprofile.username', { username: profile.userName })}
                    textStyle="il_regular"
                    markup
                    name="user_name"
                    layout={{ position: 'absolute', left: 56, top: 12, width: 141, height: 16 }}
                />
                <ThemeText
                    text={profile.motto}
                    textStyle="u_italic"
                    name="motto_txt"
                    textOptions={{ fontSize: 11, wordWrap: true, wordWrapWidth: 200 }}
                    layout={{ position: 'absolute', left: 56, top: 28, width: 200, height: 30 }}
                />
                <ThemeText
                    text={profileText('extendedprofile.created', { created: profile.creationDate })}
                    textStyle="il_regular"
                    markup
                    name="user_created"
                    layout={{ position: 'absolute', left: 56, top: 58, width: 129, height: 16 }}
                />
                {activityDisplayEnabled && (
                    <ThemeText
                        text={profileText('extendedprofile.activitypoints', { activitypoints: String(profile.achievementScore) })}
                        textStyle="il_regular"
                        markup
                        name="user_activity_points"
                        layout={{ position: 'absolute', left: 56, top: 90, width: 161, height: 16 }}
                    />
                )}
                <ThemeText
                    text={profileText('extendedprofile.last.login', { lastlogin: profile.lastAccessSinceInSeconds === -1 ? '-' : GetFriendlyTime(t, profile.lastAccessSinceInSeconds, '.ago') })}
                    textStyle="il_regular"
                    markup
                    name="user_last_login"
                    layout={{ position: 'absolute', left: 56, top: 74, width: 137, height: 16 }}
                />
                <ThemeText
                    text={profileText('extendedprofile.friends.count', { count: profile.friendCount === -1 ? '-' : String(profile.friendCount) })}
                    textStyle="il_regular"
                    markup
                    name="friend_count"
                    layout={{ position: 'absolute', left: 274, top: 18, width: 161, height: 16 }}
                />
                <ThemeText
                    text={t('extendedprofile.relstatus')}
                    textStyle="u_bold"
                    markup
                    name="rel_status_label_txt"
                    layout={{ position: 'absolute', left: 274, top: 37, width: 150, height: 17 }}
                />
                <ThemeImage
                    src={`${imageLibraryUrl}guilds/${[ 'offline_icon', 'online_icon', 'hidden_icon' ][profile.onlineStatus] ?? 'offline_icon'}.png`}
                    name="online_offline_container"
                    layout={{ position: 'absolute', left: 56, top: 110, width: 40, height: 18 }}
                />
                {(isSelf || profile.isFriend) && (
                    <Icon
                        variant="8"
                        tintColor="#3ce600"
                        layout={{ position: 'absolute', left: 101, top: 112, width: 16, height: 16 }}
                    />
                )}
                {(isSelf || profile.isFriend) && (
                    <ThemeText
                        text={t(isSelf ? 'extendedprofile.me' : 'extendedprofile.friend')}
                        textStyle="u_bold"
                        name="status_txt"
                        layout={{ position: 'absolute', left: 117, top: 111, width: 132, height: 17 }}
                    />
                )}
                {profile.isFriendRequestSent && (
                    <ThemeText
                        text={t('extendedprofile.friendrequestsent')}
                        textStyle="u_regular"
                        name="friend_request_sent_txt"
                        layout={{ position: 'absolute', left: 101, top: 111, width: 189, height: 17 }}
                    />
                )}
                <Border
                    name="badges"
                    variant="2"
                    tintColor="#afafaf"
                    layout={{ position: 'absolute', left: 1, top: 152, width: 256, height: 55 }}
                >
                    {badges.filter(badge => badge.badgeIndex > 0 && badge.badgeIndex <= 5).sort((a, b) => a.badgeIndex - b.badgeIndex).map(badge => (
                        <ThemeImage
                            key={badge.badgeIndex}
                            src={badgeUrl.replace('%badgename%', badge.badgeCode)}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            tooltip={t(`badge_name_${badge.badgeCode}`, badge.badgeCode)}
                            name={`badge_${badge.badgeIndex - 1}`}
                            layout={{ position: 'absolute', left: 7 + ((badge.badgeIndex - 1) * 50), top: 6, width: 42, height: 42 }}
                        />
                    ))}
                </Border>
                {canAddFriend && (
                    <Button
                        variant="3"
                        name="addasfriend_button"
                        onPointerTap={onAddFriend}
                        layout={{ position: 'absolute', left: 113, top: 107, width: 105, height: 23 }}
                    >
                        {t('extendedprofile.addasafriend')}
                    </Button>
                )}
                {isSelf && (
                    <Region
                        name="change_looks"
                        cursor="pointer"
                        onPointerTap={onChangeLooks}
                        layout={{ position: 'absolute', left: 0, top: 133, width: 160, height: 16 }}
                    >
                        <ThemeText
                            text={t('extended.profile.change.looks')}
                            textStyle="il_link_regular"
                        />
                    </Region>
                )}
                {isSelf && (
                    <Region
                        name="change_badges"
                        cursor="pointer"
                        onPointerTap={onChangeBadges}
                        layout={{ position: 'absolute', right: 246, top: 133, height: 16 }}
                    >
                        <ThemeText
                            text={t('extended.profile.change.badges')}
                            textStyle="il_link_regular"
                        />
                    </Region>
                )}
            </Region>

            <Region
                pointerTransparent
                backgroundColor="#afafaf"
                layout={{ position: 'absolute', left: 6, top: 212, width: 500, height: 1 }}
            />
            <Region
                pointerTransparent
                backgroundColor="#afafaf"
                layout={{ position: 'absolute', left: 6, top: 252, width: 500, height: 1 }}
            />
            <Region
                pointerTransparent
                backgroundColor="#afafaf"
                layout={{ position: 'absolute', left: 6, top: 213, width: 1, height: 39 }}
            />
            <Region
                pointerTransparent
                backgroundColor="#afafaf"
                layout={{ position: 'absolute', left: 505, top: 213, width: 1, height: 39 }}
            />

            <Region
                name="middle"
                layout={{ position: 'absolute', left: 6, top: 219, width: 500, height: 30 }}
            >
                <Region
                    name="rooms_button"
                    cursor="pointer"
                    onPointerTap={onRooms}
                    layout={{ position: 'absolute', left: 1, top: 0, width: 164, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 6 }}
                >
                    <ThemeImage
                        src="groups-extended_profile_rooms"
                        layout={{ width: 32, height: 28, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={t('extendedprofile.rooms')}
                        textStyle="il_link_strong"
                        name="rooms_link_text"
                        layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    name="rooms_badges_separator"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 166, top: -6, width: 1, height: 39 }}
                />
                <Region
                    name="badgeCountRegion"
                    cursor="pointer"
                    onPointerTap={onBadgeCount}
                    layout={{ position: 'absolute', left: 167, top: 0, width: 165, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 6 }}
                >
                    <ThemeImage
                        src="groups-badge_rarity_badges_emblem"
                        layout={{ width: 25, height: 25, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={t('inventory.badges')}
                        textStyle="u_regular"
                        name="badgeCountLabel"
                        textOptions={{ fontSize: 11 }}
                        flashFormat={{ bold: true, underline: true }}
                        layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                    />
                    <Region layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
                        <ThemeText
                            text={String(profile.totalBadges)}
                            textStyle="u_regular"
                            name="badgeCount"
                            textOptions={{ fontSize: 11 }}
                            flashFormat={{ bold: true }}
                            layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                        />
                        {profile.totalBadgesRank >= 0 && (
                            <ThemeText
                                text={`(#${profile.totalBadgesRank})`}
                                textStyle="u_regular"
                                name="badgeRank"
                                textOptions={{ fontSize: 11 }}
                                layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                            />
                        )}
                    </Region>
                </Region>
                <Region
                    name="badges_level_separator"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 332, top: -6, width: 1, height: 39 }}
                />
                <Region
                    name="levelRegion"
                    layout={{ position: 'absolute', left: 333, top: 0, width: 167, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 6 }}
                >
                    <ThemeImage
                        src="groups-extended_profile_icon_level"
                        layout={{ width: 29, height: 28, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={t('generic.level')}
                        textStyle="u_regular"
                        name="levelLabel"
                        textOptions={{ fontSize: 11 }}
                        flashFormat={{ bold: true, underline: true }}
                        layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={String(profile.accountLevel)}
                        textStyle="u_regular"
                        name="levelValue"
                        textOptions={{ fontSize: 11 }}
                        flashFormat={{ bold: true }}
                        layout={{ marginTop: 5, height: 16, flexShrink: 0 }}
                    />
                </Region>
            </Region>

            <Region
                name="relationships"
                layout={{ position: 'absolute', left: 280, top: 51, width: 227, height: 156, flexDirection: 'column' }}
            >
                {RELATIONSHIP_NAMES.map((name, index) => {
                    const relationship = relationships.find(item => item.relationshipStatusType === index + 1);

                    return (
                        <Region
                            key={name}
                            name={`relationship_${name}`}
                            layout={{ width: 227, height: 47 }}
                        >
                            <ThemeImage
                                src={`shared-relationship_status_${name}`}
                                name={`${name}_icon`}
                                layout={{ position: 'absolute', left: 3, top: 15, width: 16, height: 14 }}
                            />
                            <Border
                                variant="2"
                                layout={{ position: 'absolute', left: 23, top: 11, width: 202, height: 22 }}
                            >
                                <Region
                                    name={`${name}_friend_name_link_region`}
                                    cursor="pointer"
                                    onPointerTap={() => relationship && relationship.friendCount > 0 ? onOpenProfile(relationship.randomFriendId) : onFindFriends()}
                                    layout={{ position: 'absolute', left: 7, top: 3, width: 160, height: 16 }}
                                >
                                    <ThemeText
                                        text={relationship && relationship.friendCount > 0 ? relationship.randomFriendName : t('extendedprofile.add.friends')}
                                        textStyle="il_regular"
                                        flashFormat={{ bold: true, underline: true }}
                                        name={`${name}_friend_name_link_text`}
                                    />
                                </Region>
                            </Border>
                            {relationship && relationship.friendCount > 0 && (
                                <AvatarImage
                                    figure={relationship.randomFriendFigure}
                                    gender={AvatarGenderType.Unisex}
                                    headOnly
                                    cropped
                                    direction={4}
                                    layout={{ position: 'absolute', left: 191, bottom: 11 }}
                                />
                            )}
                            {(!relationship || relationship.friendCount < 1) && (
                                <ThemeText
                                    text={t('extendedprofile.no.friends.in.this.category')}
                                    textStyle="il_regular"
                                    markup
                                    name={`${name}_txt`}
                                    textOptions={{ fill: '#7f7f7f' }}
                                    flashFormat={{ italic: true }}
                                    layout={{ position: 'absolute', left: 31, top: 33, width: 190, height: 16 }}
                                />
                            )}
                            {relationship && relationship.friendCount > 1 && (
                                <ThemeText
                                    text={t(`extendedprofile.relstatus.others.${name}`, '', { count: String(relationship.friendCount - 1) })}
                                    textStyle="il_regular"
                                    markup
                                    name={`${name}_txt`}
                                    textOptions={{ fill: '#7f7f7f' }}
                                    flashFormat={{ italic: true }}
                                    layout={{ position: 'absolute', left: 31, top: 33, width: 190, height: 16 }}
                                />
                            )}
                        </Region>
                    );
                })}
            </Region>

            {!isPrivate && (
                <Region
                    name="profile_groups"
                    layout={{ position: 'absolute', left: 6, top: 259, width: 500, height: 236 }}
                >
                    <ThemeText
                        text={t('extendedprofile.groups.count', '', { count: String(profile.guilds.length) })}
                        textStyle="il_regular"
                        markup
                        name="total_group_count"
                        layout={{ position: 'absolute', left: 0, top: 5, width: 159, height: 16 }}
                    />
                    {profile.guilds.length > 0 && (
                        <ScrollArea
                            orientation="vertical"
                            variant="100"
                            layout={{ position: 'absolute', left: 3, top: 32, width: 74, height: 195, overflow: 'hidden' }}
                            viewportLayout={{ position: 'absolute', left: 0, top: 0, width: 65, height: 195 }}
                            scrollbarLayout={{ position: 'absolute', left: 65, top: 0, width: 9, height: 195 }}
                            contentLayout={{ flexDirection: 'column', width: 62 }}
                        >
                            {profile.guilds.map(group => (
                                <Region
                                    key={group.groupId}
                                    name={`group_entry_${group.groupId}`}
                                    cursor="pointer"
                                    onPointerTap={() => {
                                        setSelectedGroupId(group.groupId);
                                        onSelectGroup(group.groupId);
                                    }}
                                    layout={{ width: 62, height: 60, flexShrink: 0 }}
                                >
                                    <ThemeImage
                                        src={`${questingUrl}achievement_${selectedGroupId === group.groupId ? 'active' : 'inactive'}.png`}
                                        layout={{ position: 'absolute', left: 0, top: 0, width: 62, height: 60 }}
                                    />
                                    <GroupBadgeImage
                                        badgeCode={group.badgeCode}
                                        layout={{ position: 'absolute', left: 11, top: 10, width: 40, height: 40 }}
                                    />
                                    {isSelf && (
                                        <Region
                                            onPointerTap={(event) => {
                                                event.stopPropagation();
                                                setSelectedGroupId(group.groupId);
                                                onSelectGroup(group.groupId);
                                                onFavouriteGroup(group.groupId, group.favourite);
                                            }}
                                            tooltip={t(group.favourite ? 'group.clearfavourite' : 'group.makefavourite')}
                                            layout={{ position: 'absolute', left: 1, top: 1, width: 18, height: 16 }}
                                        >
                                            <ThemeImage
                                                src={`groups-extended_profile_${group.favourite ? 'clear' : 'make'}_favourite`}
                                                layout={{ width: 18, height: 16 }}
                                            />
                                        </Region>
                                    )}
                                </Region>
                            ))}
                        </ScrollArea>
                    )}
                    <Border
                        name="group_details"
                        variant="2"
                        tintColor="#afafaf"
                        layout={{ position: 'absolute', left: 89, top: 5, width: 410, height: 224 }}
                    >
                        <Region
                            name="group_cont"
                            layout={{ position: 'absolute', left: 33, top: 5, width: 343, height: 214 }}
                        >
                            {profile.guilds.length > 0
                                ? <UserProfileGroupDetailsView groupId={selectedGroupId} />
                                : (
                                        <>
                                            <ThemeText
                                                text={t(isSelf ? 'extendedprofile.nogroups.me' : 'extendedprofile.nogroups.user')}
                                                textStyle="u_regular"
                                                name="no_groups_caption"
                                                layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                                            />
                                            <ThemeImage
                                                src={`${imageLibraryUrl}guilds/ext_profile_grouppic.png`}
                                                layout={{ position: 'absolute', left: 15, top: 21, width: 311, height: 136 }}
                                            />
                                            <ThemeText
                                                text={t('extendedprofile.nogroups.info')}
                                                textStyle="u_regular"
                                                layout={{ position: 'absolute', left: 0, top: 164, height: 17 }}
                                            />
                                            <ContainerButton
                                                variant="0"
                                                name="view_groups_button"
                                                onPointerTap={onShowGroups}
                                                layout={{ position: 'absolute', left: 62, top: 184, width: 216, height: 30 }}
                                            >
                                                <ThemeImage
                                                    src={`${imageLibraryUrl}guilds/group_base_icon.png`}
                                                    layout={{ position: 'absolute', left: 11, top: 7, width: 24, height: 17 }}
                                                />
                                                <ThemeText
                                                    text={t('extendedprofile.nogroups.viewgroups')}
                                                    textStyle="u_regular"
                                                    layout={{ position: 'absolute', left: 42, top: 6, height: 17 }}
                                                />
                                            </ContainerButton>
                                        </>
                                    )}
                        </Region>
                    </Border>
                </Region>
            )}
            {isPrivate && (
                <ThemeText
                    text={t('profile.full_profile_hidden')}
                    textStyle="u_bold"
                    name="full_profile_hidden"
                    layout={{ position: 'absolute', left: 137, top: 368, width: 215, height: 17 }}
                />
            )}
            {isBlocked && (
                <Region
                    name="blocked_container"
                    layout={{ position: 'absolute', left: -2, top: -3, width: 519, height: 503 }}
                >
                    <Region
                        pointerTransparent
                        backgroundColor="#898985"
                        backgroundAlpha={0.8}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 519, height: 497 }}
                    />
                    <Region
                        pointerTransparent
                        backgroundColor="#898985"
                        backgroundAlpha={0.8}
                        layout={{ position: 'absolute', left: 1, top: 497, width: 517, height: 2 }}
                    />
                    <Region
                        pointerTransparent
                        backgroundColor="#898985"
                        backgroundAlpha={0.8}
                        layout={{ position: 'absolute', left: 2, top: 499, width: 515, height: 1 }}
                    />
                    <Region
                        pointerTransparent
                        backgroundColor="#898985"
                        backgroundAlpha={0.8}
                        layout={{ position: 'absolute', left: 3, top: 500, width: 513, height: 1 }}
                    />
                    <Region
                        pointerTransparent
                        backgroundColor="#898985"
                        backgroundAlpha={0.8}
                        layout={{ position: 'absolute', left: 5, top: 501, width: 509, height: 1 }}
                    />
                    <Border
                        variant="2"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 44, top: 195, width: 250, height: 100 }}
                    >
                        <ThemeText
                            text={t('extendedprofile.blocked')}
                            textStyle="u_regular"
                            markup
                            textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                            onLink={onToggleBlock}
                            layout={{ position: 'absolute', left: 13, top: 14, width: 218, height: 71 }}
                        />
                    </Border>
                    <ThemeImage
                        src="groups-extended_profile_frank_stop"
                        bitmap={{ stretchedX: false, stretchedY: false, zoomX: 2, zoomY: 2 }}
                        layout={{ position: 'absolute', left: 312, top: 146, width: 148, height: 192 }}
                    />
                </Region>
            )}
            {!isSelf && (
                <ContainerButton
                    variant="7"
                    dynamicStyle="button"
                    name="block_button"
                    tooltip={t(isBlocked ? 'extendedprofile.unblock_player.title' : 'extendedprofile.block_player.title')}
                    onPointerTap={onToggleBlock}
                    layout={{ position: 'absolute', left: 481, top: 4, width: 24, height: 24 }}
                >
                    <ThemeImage
                        src="groups-extended_profile_block_icon"
                        dynamicRole="icon"
                        bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000 }}
                        layout={{ position: 'absolute', left: 4, top: 4, width: 16, height: 16 }}
                    />
                </ContainerButton>
            )}
        </Frame>
    );
};
