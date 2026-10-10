/**
 * The extended profile - `ExtendedProfileWindowCtrl`: `new_extended_profile`, centred.
 *
 * - `refreshHeader`: the figure, name, motto, creation date, activity points (where shown), last
 *   login and friend count; the online, offline or hidden icon; "me" or "friend" with its tick, the
 *   sent request text, or the add-friend button where one may be asked; the change looks and badges
 *   links on the viewer's own profile; level, badge count and rank; the block button on anyone
 *   else's, and the blocked overlay while they are blocked (its link unblocks). A profile hidden from
 *   the viewer shows `full_profile_hidden` instead of the groups.
 * - `onUserBadges`: the five selected badges; hovering one shows its details to its right
 *   (`showBadgeInfo`, `extended_profile_badge_details`).
 * - `refreshRelationships` (`relationship.status.enabled`): per status, a friend's name and head and
 *   "and N others", or the add-friends link and "no friends in this category". A name opens that
 *   friend's profile; with no friends of the status, an alert offers to find some.
 * - `refreshGroupList`: a `group_entry` per group in `groups_list`, the selected one lit, with the
 *   viewer's own favourite toggles; the selected group's details (`GroupDetailsCtrl`) in `group_cont`,
 *   or `no_groups` when there are none.
 *
 * Not ported: `playGlow`, the badge widget's glow for a standalone rarity tier.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { ExtendedProfileMessageType, IHabboUserBadge, IRelationshipStatusInfo } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { AvatarImage } from '#base/components/AvatarImage';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Box, getGlobalRect, GlobalRect, TemplateBindings, TemplateItem, TemplateWindow, useTemplate, useTemplateFrame } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';
import { useGroupDetailsItem } from '#base/views/groups/useGroupDetailsItem';
import { AvatarImageWidgetHead } from '#base/views/shared/AvatarImageWidgetHead';
import { BadgeDetailsPopup } from '#base/views/shared/BadgeDetailsPopup';
import { useBadgeDetails } from '#base/views/shared/useBadgeDetails';

export interface UserProfileViewProps {
    profile: ExtendedProfileMessageType;
    badges: IHabboUserBadge[];
    relationships: IRelationshipStatusInfo[];
    ownUserId: number;
    activityDisplayEnabled: boolean;
    relationshipsEnabled: boolean;
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

/** `RelationshipStatusEnum.displayableStatuses`, by `statusAsString`: heart 1, smile 2, bobba 3. */
const RELATIONSHIP_NAMES = [ 'heart', 'smile', 'bobba' ] as const;

/** `onlineStatus`: offline 0, online 1, hidden 2. */
const ONLINE_ICONS = [ 'offline_icon', 'online_icon', 'hidden_icon' ] as const;

/** The relationship heads' `avatar_image:direction`, `southwest`. */
const RELATIONSHIP_HEAD_DIRECTION = 4;

/** `avatar_image`'s width, the figure centred on it (`on_resize_align_center`). */
const AVATAR_WIDGET_WIDTH = 34;

const BADGE_SLOTS = 5;

export const UserProfileView = ({
    profile, badges, relationships, ownUserId, activityDisplayEnabled, relationshipsEnabled, canAskForFriend, isBlocked,
    onClose, onAddFriend, onRooms, onChangeLooks, onChangeBadges, onBadgeCount, onSelectGroup, onOpenProfile, onFindFriends, onToggleBlock, onShowGroups, onFavouriteGroup,
}: UserProfileViewProps) => {
    const t = useTranslation();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const frame = useTemplateFrame({ id: 'user_profile', centered: true, onClose });
    const groupEntryTemplate = useTemplate('habbo-groups-com/group_entry');
    const noGroupsTemplate = useTemplate('habbo-groups-com/no_groups');
    const badgeDetails = useBadgeDetails();
    const [ selectedId, setSelectedId ] = useState(profile.guilds[0]?.groupId ?? 0);
    const [ hoveredBadge, setHoveredBadge ] = useState<{ slot: number; anchor: GlobalRect } | null>(null);
    // `getSelectedGroup`: the chosen group while the profile still has it, else the first.
    const selectedGroupId = profile.guilds.some(group => group.groupId === selectedId) ? selectedId : (profile.guilds[0]?.groupId ?? 0);
    const groupDetails = useGroupDetailsItem(selectedGroupId);

    const isSelf = profile.userId === ownUserId;
    const isHidden = profile.isHidden && !isSelf;
    const friendOrSelf = profile.isFriend || isSelf;
    const selectedBadges = new Map(badges.filter(badge => (badge.badgeIndex >= 1) && (badge.badgeIndex <= BADGE_SLOTS)).map(badge => [ badge.badgeIndex - 1, badge ]));

    /** `onSelectGroup`: the group chosen, its details asked for. */
    const selectGroup = (groupId: number) => {
        setSelectedId(groupId);
        onSelectGroup(groupId);
    };

    const badgeBindings = (slot: number): TemplateBindings => {
        const badge = selectedBadges.get(slot);

        return {
            [`badge_${slot}`]: {
                asset: badge ? badgeUrl.replace('%badgename%', badge.badgeCode) : undefined,
                onPointerOver: (event: FederatedPointerEvent) => {
                    if (badge && (event.currentTarget instanceof PixiContainer)) setHoveredBadge({ slot, anchor: getGlobalRect(event.currentTarget) });
                },
                onPointerOut: () => setHoveredBadge(null),
            },
        };
    };

    /** `setRelationshipDetails`. */
    const relationshipBindings = (name: typeof RELATIONSHIP_NAMES[number], index: number): TemplateBindings => {
        const relationship = relationships.find(item => item.relationshipStatusType === (index + 1));
        const hasFriends = !!relationship && (relationship.friendCount > 0);
        const text = !hasFriends
            ? '${extendedprofile.no.friends.in.this.category}'
            : t(`extendedprofile.relstatus.others.${name}`, '', { count: String(relationship.friendCount - 1) });

        return {
            [`${name}_friend_name_link_region`]: {
                // `onRelationshipLink`: a status the server answered for opens its friend's profile; one it did not, the alert.
                onPointerTap: () => {
                    if (relationship) {
                        if (relationship.randomFriendId) onOpenProfile(relationship.randomFriendId);
                    } else {
                        onFindFriends();
                    }
                },
            },
            ...(relationshipsEnabled
                ? {
                        [`${name}_friend_name_link_text`]: { caption: hasFriends ? relationship.randomFriendName : '${extendedprofile.add.friends}' },
                        [`${name}_head`]: {
                            visible: hasFriends,
                            children: hasFriends && (
                                <AvatarImageWidgetHead
                                    figure={relationship.randomFriendFigure}
                                    cropped
                                    direction={RELATIONSHIP_HEAD_DIRECTION}
                                />
                            ),
                        },
                        [`${name}_txt`]: { visible: !hasFriends || (relationship.friendCount > 1), caption: text },
                    }
                : {}),
        };
    };

    const groupEntries: TemplateItem[] = groupEntryTemplate
        ? profile.guilds.map(group => ({
                key: String(group.groupId),
                from: groupEntryTemplate,
                bindings: {
                    bg_region: { onPointerTap: () => selectGroup(group.groupId) },
                    bg_selected_bitmap: { visible: group.groupId === selectedGroupId },
                    bg_unselected_bitmap: { visible: group.groupId !== selectedGroupId },
                    group_pic_bitmap: { asset: group.badgeCode ? groupBadgeUrl.replace('%badgedata%', group.badgeCode) : undefined },
                    // `onClearFavourite` / `onMakeFavourite`: the group chosen; the new profile asks for its details.
                    clear_favourite: {
                        visible: group.favourite && isSelf,
                        onPointerTap: () => {
                            setSelectedId(group.groupId);
                            onFavouriteGroup(group.groupId, true);
                        },
                    },
                    make_favourite: {
                        visible: !group.favourite && isSelf,
                        onPointerTap: () => {
                            setSelectedId(group.groupId);
                            onFavouriteGroup(group.groupId, false);
                        },
                    },
                },
            }))
        : [];

    const noGroups: TemplateItem | undefined = noGroupsTemplate && {
        key: 'no_groups',
        from: noGroupsTemplate,
        bindings: {
            no_groups_caption: { caption: `\${${isSelf ? 'extendedprofile.nogroups.me' : 'extendedprofile.nogroups.user'}}` },
            view_groups_button: { visible: true, onPointerTap: onShowGroups },
        },
    };
    const groupContent = (profile.guilds.length < 1) ? noGroups : groupDetails;
    const hovered = hoveredBadge && selectedBadges.get(hoveredBadge.slot);

    return (
        <>
            <TemplateWindow
                id="habbo-groups-com/new_extended_profile"
                frame={frame}
                parameters={{
                    'extendedprofile.caption': { username: profile.userName },
                    'extendedprofile.username': { username: profile.userName },
                    'extendedprofile.created': { created: profile.creationDate },
                    'extendedprofile.activitypoints': { activitypoints: String(profile.achievementScore) },
                    'extendedprofile.last.login': { lastlogin: (profile.lastAccessSinceInSeconds === -1) ? '-' : GetFriendlyTime(t, profile.lastAccessSinceInSeconds, '.ago') },
                    'extendedprofile.friends.count': { count: (profile.friendCount === -1) ? '-' : String(profile.friendCount) },
                    'extendedprofile.groups.count': { count: String(profile.guilds.length) },
                }}
                bindings={{
                    avatar_image: {
                        children: (
                            <Box layout={{ position: 'absolute', left: 0, top: 0, width: AVATAR_WIDGET_WIDTH, flexDirection: 'row', justifyContent: 'center' }}>
                                <AvatarImage
                                    figure={profile.figure}
                                    gender={AvatarGenderType.Unisex}
                                    cropped
                                    direction={2}
                                />
                            </Box>
                        ),
                    },
                    motto_txt: { caption: profile.motto },
                    user_activity_points: { visible: activityDisplayEnabled },
                    ...Object.fromEntries(ONLINE_ICONS.map((name, status) => [ name, { visible: profile.onlineStatus === status } ])),
                    ok_icon: { visible: friendOrSelf },
                    status_txt: { visible: friendOrSelf, caption: profile.isFriend ? '${extendedprofile.friend}' : '${extendedprofile.me}' },
                    friend_request_sent_txt: { visible: profile.isFriendRequestSent },
                    addasfriend_button: { visible: !profile.isFriend && !profile.isFriendRequestSent && !isSelf && canAskForFriend, onPointerTap: onAddFriend },
                    change_own_attributes: { visible: isSelf },
                    change_looks: { onPointerTap: onChangeLooks },
                    change_badges: { onPointerTap: onChangeBadges },
                    ...Array.from({ length: BADGE_SLOTS }, (unused, slot) => badgeBindings(slot)).reduce((all, slot) => ({ ...all, ...slot }), {}),
                    ...RELATIONSHIP_NAMES.map(relationshipBindings).reduce((all, row) => ({ ...all, ...row }), {}),
                    rooms_button: { onPointerTap: onRooms },
                    badgeCountRegion: { onPointerTap: onBadgeCount },
                    badgeCount: { caption: String(profile.totalBadges) },
                    badgeRank: { visible: profile.totalBadgesRank >= 0, caption: `(#${profile.totalBadgesRank})` },
                    levelValue: { caption: String(profile.accountLevel) },
                    bottom: { visible: !isHidden },
                    full_profile_hidden: { visible: isHidden },
                    groups_list: { visible: profile.guilds.length > 0, items: groupEntries },
                    group_cont: { items: groupContent ? [ groupContent ] : [] },
                    block_button: { visible: !isSelf, onPointerTap: onToggleBlock },
                    blocked_container: { visible: isBlocked },
                    blocked_html: { onLink: onToggleBlock },
                }}
            />
            {(hoveredBadge && hovered) && (
                <BadgeDetailsPopup
                    templateId="habbo-groups-com/extended_profile_badge_details"
                    anchor={hoveredBadge.anchor}
                    side="right"
                    details={badgeDetails(hovered.badgeCode, hovered.ownerCount, hovered.badgeRarityId)}
                />
            )}
        </>
    );
};
