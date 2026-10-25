/**
 * `GroupDetailsCtrl`: a group's details, `group`, as the clone its holder adds to its own container
 * (`attachWindow`) - the details window's `group_cont` (`DetailsWindowCtrl`) and the extended
 * profile's (`ExtendedProfileWindowCtrl`). `onGroupDetails`:
 *
 * - the name after the decorate icon when members may decorate, in its place when not; the type's
 *   icon (`grouptype_region_<type>`, of which there are three: a type 3 or 4 shows none);
 * - the description, its text grown to its lines plus 5, the scrollbar shown when that is taller
 *   than its list; the creation line, the member count, the base room link where there is a room;
 * - the badge, twice its size;
 * - join, request membership and leave as the group allows - join disabled from its click until the
 *   next answer; the pending text; "you are a member" for a non-guild group;
 * - the pending members link when there are any, and under it - each 16 lower when the one above
 *   shows - manage for the owner of a guild and delete (`group.deletion.enabled`, and the owner or a
 *   moderator on anyone's group);
 * - the owner, admin or member icon of a guild; the forum link for a group with a forum.
 */
import { GUILD_MEMBER_SEARCH_MEMBERS, GUILD_MEMBER_SEARCH_PENDING, IHabboGroupDetails, isGuildJoiningAllowed, isGuildLeaveAllowed, isGuildMembershipRequestAllowed } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { canDeleteAnyGroup, deleteGroup, goToGroupBaseRoom, joinGroup, leaveGroup, openGroupForum, openGroupFurniCatalog, openGroupManagement, showGroupBases, toggleGroupMembers } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupStore } from '#base/context/groups';
import { useConfigBoolean, useGroupBadgeImageUrl, useTranslation } from '#base/context/system';
import { findTemplateChild, measureTemplateText, TemplateElement, TemplateItem, templateTextMargins, TemplateWindows, useTemplate } from '#base/theme';

/** `GroupDetailsCtrl`'s step down the link column, from `pending_members_region`. */
const LINK_ROW_HEIGHT = 16;

/** `HabboGroupDetailsData.status`: a member, and one whose request waits. */
const STATUS_MEMBER = 1;
const STATUS_PENDING = 2;

/**
 * `group_description.textHeight`, as the window model measures it: wrapped at the text's width less
 * its margins.
 */
const descriptionTextHeight = (element: TemplateElement, text: string) => {
    const margins = templateTextMargins(element);
    const size = text ? measureTemplateText(element, text, element.width - margins.left - margins.right) : undefined;

    return size ? (size.textHeight ?? Math.max(0, size.height - 4)) : 0;
};

/** The type icons the layout has: `grouptype_region_0` .. `_2`. */
const GROUP_TYPE_REGIONS = [ 0, 1, 2 ] as const;

export const useGroupDetailsItem = (groupId: number): TemplateItem | undefined => {
    const details = useGroupStore(x => x.detailsById[groupId]);
    const groupDeletionEnabled = useConfigBoolean('group.deletion.enabled');
    const { send } = useWebSocketContext();
    const template = useTemplate('habbo-groups-com/group');
    const groupBadgeUrl = useGroupBadgeImageUrl();
    const t = useTranslation();
    // `onJoin` disables the button and every `onGroupDetails` enables it, so the next answer brings it back.
    const [ joinSentFor, setJoinSentFor ] = useState<IHabboGroupDetails | undefined>(undefined);

    if (joinSentFor && (joinSentFor !== details)) setJoinSentFor(undefined);

    if (!template || !details) return undefined;

    const status = Number(details.status);
    const showPending = details.pendingMemberCount > 0;
    const showManage = details.isOwner && details.isGuild;
    // `onDeleteGuild`'s gate: `group.deletion.enabled`, and the owner or a moderator on anyone's group.
    const showDelete = details.isGuild && groupDeletionEnabled && (details.isOwner || canDeleteAnyGroup());
    // `group_description_scrollbar.visible`: the text, grown to its lines plus 5, is taller than its list.
    const descriptionElement = findTemplateChild(template.elements, 'group_description');
    const descriptionList = findTemplateChild(template.elements, 'group_description_item_list');
    const scrolls = !!descriptionElement && !!descriptionList && ((descriptionTextHeight(descriptionElement, details.description) + 5) > descriptionList.height);

    /** The name after the decorate icon, the description sized to its text, the link column stepped down. */
    const arrange = ({ find }: TemplateWindows) => {
        const decorate = find('group_decorate_icon_region');
        const name = find('group_name');
        const description = find('group_description');
        const pending = find('pending_members_region');
        const manage = find('manage_guild_region');
        const remove = find('delete_guild_region');

        if (decorate && name) name.setX(details.membersCanDecorate ? (decorate.x + decorate.width) : decorate.x);

        if (description) description.setHeight(description.textHeight + 5);

        if (pending && manage) manage.setY(showPending ? (pending.y + LINK_ROW_HEIGHT) : pending.y);

        if (pending && manage && remove) remove.setY(showManage ? (manage.y + LINK_ROW_HEIGHT) : pending.y);
    };

    return {
        key: `group_${groupId}`,
        from: template,
        arrange,
        bindings: {
            group_name: { caption: details.groupName },
            group_decorate_icon_region: { visible: details.membersCanDecorate },
            group_description: { caption: details.description },
            group_description_scrollbar: { visible: scrolls },
            show_forum_link_region: { visible: details.hasBoard, onPointerTap: () => openGroupForum(send, groupId) },
            show_forum_link: { visible: details.hasBoard },
            created_txt: { caption: t('group.created', '', { date: details.creationDate, owner: details.ownerName }) },
            members_txt: { caption: t('group.membercount', '', { totalMembers: String(details.totalMembers) }) },
            members_region: { onPointerTap: () => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_MEMBERS) },
            group_room_link_region: { visible: details.roomId > -1, onPointerTap: () => goToGroupBaseRoom(send, groupId, details.roomId) },
            group_room_link: { caption: t('group.linktobase', '', { room_name: details.roomName }) },
            buy_furni_link_region: { onPointerTap: openGroupFurniCatalog },
            show_groups_link_region: { onPointerTap: () => showGroupBases(send) },
            group_logo: { asset: details.badgeCode ? groupBadgeUrl(details.badgeCode) : undefined },
            join_button: {
                visible: isGuildJoiningAllowed(details),
                disabled: joinSentFor === details,
                onPointerTap: () => {
                    setJoinSentFor(details);
                    joinGroup(send, groupId);
                },
            },
            request_membership_button: { visible: isGuildMembershipRequestAllowed(details), onPointerTap: () => joinGroup(send, groupId) },
            leave_button: { visible: isGuildLeaveAllowed(details), onPointerTap: () => leaveGroup(send, groupId) },
            membership_pending_txt: { visible: status === STATUS_PENDING },
            youaremember_txt: { visible: !details.isGuild && (status === STATUS_MEMBER) },
            youaremember_icon: { visible: !details.isGuild && (status === STATUS_MEMBER) },
            pending_members_region: { visible: showPending, onPointerTap: () => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_PENDING) },
            ...(showPending ? { pending_members_txt: { caption: t('group.pendingmembercount', '', { amount: String(details.pendingMemberCount) }) } } : {}),
            manage_guild_region: { visible: showManage, onPointerTap: () => openGroupManagement(send, groupId) },
            delete_guild_region: { visible: showDelete, onPointerTap: () => deleteGroup(send, groupId) },
            you_are_owner_region: { visible: details.isGuild && details.isOwner },
            you_are_admin_region: { visible: details.isGuild && details.isAdmin && !details.isOwner },
            you_are_member_region: { visible: details.isGuild && (status === STATUS_MEMBER) && !(details.isAdmin || details.isOwner) },
            ...Object.fromEntries(GROUP_TYPE_REGIONS.map(type => [ `grouptype_region_${type}`, { visible: Number(details.type) === type } ])),
        },
    };
};
