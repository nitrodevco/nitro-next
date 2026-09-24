/**
 * The controller half of the group windows - `HabboGroupsManager` and the window controllers it
 * owns (`GroupDetailsCtrl`, `GuildMembersWindowCtrl`, `GuildManagementWindowCtrl`,
 * `GroupCreatedWindowCtrl`, `HcRequiredWindowCtrl`, `GroupRoomInfoCtrl`). Their state is
 * `context/groups`; every function here takes the socket, because the manager is a component and
 * these are its methods.
 *
 * Two things Flash does that the port cannot yet:
 * - `openGroupForum` raises a `groupforum/<id>` link, which no window answers here - the group
 *   forums are not ported, as `FurnitureGuildMenuWidget` also records.
 * - the creation wizard's "create a room" link calls `startRoomCreation`, which opens the
 *   navigator's room-creation view; that view is not ported either, so the link is not offered.
 *
 * `ApproveAllMembershipRequestsComposer` has no caller here because it has none in the client
 * either: `GuildMembersWindowCtrl.onAcceptAll` is written but never bound, and
 * `guild_members_window` has no control to bind it to.
 */
import { ClubLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import {
    AddAdminRightsToMemberComposer, ApproveMembershipRequestComposer, CreateGuildComposer, DeactivateGuildComposer,
    EventLogComposer, GetGuildCreationInfoComposer, GetGuildEditInfoComposer, GetGuildEditorDataComposer, GetGuildMembersComposer, GetHabboGroupDetailsComposer,
    GetMemberGuildItemCountComposer, GUILD_MEMBER_SEARCH_MEMBERS, IMemberData, isGuildMemberAdmin, isGuildMemberBlocked, isGuildMemberMember, isGuildMemberOwner,
    JoinHabboGroupComposer, KickMemberComposer, NewNavigatorSearchComposer, RejectMembershipRequestComposer, RemoveAdminRightsFromMemberComposer,
    UnblockGroupMemberComposer, UpdateGuildBadgeComposer, UpdateGuildColorsComposer, UpdateGuildIdentityComposer, UpdateGuildSettingsComposer,
} from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import {
    badgeSettingsFromLayers, GROUP_MANAGEMENT_VIEW_BADGE, GROUP_MANAGEMENT_VIEW_COLORS, GROUP_MANAGEMENT_VIEW_IDENTITY, GROUP_MANAGEMENT_VIEW_SETTINGS,
    GROUP_MAX_DESCRIPTION_LENGTH, GROUP_MAX_NAME_LENGTH, GROUP_MEMBER_REQUEST_PAGE_RATELIMIT, groupStore, limitGroupManagementStep,
    limitGroupMemberPage,
} from '#base/context/groups';
import { navigatorStore } from '#base/context/navigator';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { openClubCenter } from './catalogClubCommands';
import { openClientLink } from './clientLinkCommands';
import { goToRoom } from './navigatorCommands';
import { openProfile } from './roomUserCommands';

type Send = WebSocketConnection['send'];

const t = (key: string, defaultValue?: string, replacements?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, defaultValue, replacements);

/** `GROUPS_TRACKING_CATEGORY` - every group action logs against the same category. */
const GROUPS_TRACKING_CATEGORY = 'HabboGroups';

/** `getBoolean`: only `true` / `"true"` / `"1"` count, anything else is Flash's `false` default. */
const getBoolean = (key: string): boolean => {
    const value = systemStore.getState().config[key];

    return (value === true) || (value === 'true') || (value === '1');
};

/** `HabboGroupsManager.hasVip` - `SessionDataManager.hasVip`, which is the VIP club level. */
export const hasGroupVip = (): boolean => Number(userStore.getState().clubLevel) >= Number(ClubLevelEnum.Vip);

/** `GroupDetailsCtrl.onDeleteGuild`: a moderator may delete a group they do not own. */
export const canDeleteAnyGroup = (): boolean => Number(userStore.getState().securityLevel) >= Number(SecurityLevelEnum.Moderator);

/** `HabboGroupsManager.openGroupInfo`: asks for the details *and* for the window to open. */
export const openGroupInfo = (send: Send, groupId: number) => send(new GetHabboGroupDetailsComposer({ groupId, openDetails: true }));

/** The same answer without the window - a refresh, or a group only being named. */
export const requestGroupDetails = (send: Send, groupId: number) => send(new GetHabboGroupDetailsComposer({ groupId, openDetails: false }));

/** `HabboGroupsManager.showGroupBadgeInfo`: a group badge was clicked. */
export const showGroupBadgeInfo = (send: Send, groupId: number) => {
    openGroupInfo(send, groupId);
    send(new EventLogComposer({ event: GROUPS_TRACKING_CATEGORY, data: `${groupId}`, action: 'badge clicked', extraString: '', extraInt: 0 }));
};

/** `GroupDetailsCtrl.onJoin` / `GroupRoomInfoCtrl.onJoin`. */
export const joinGroup = (send: Send, groupId: number) => {
    send(new JoinHabboGroupComposer({ groupId }));
    send(new EventLogComposer({ event: 'Groups', data: `${groupId}`, action: 'join', extraString: '', extraInt: 0 }));
};

/** `GroupDetailsCtrl.onRoomLink`. */
export const goToGroupBaseRoom = (send: Send, groupId: number, roomId: number) => {
    goToRoom(send, roomId);
    send(new EventLogComposer({ event: 'Groups', data: `${groupId}`, action: 'base', extraString: '', extraInt: 0 }));
};

/**
 * `GroupDetailsCtrl.onShowGroups` -> `performGuildBaseSearch`, which the transitional navigator
 * turns into the new navigator's `performSearch("groups")`.
 */
export const showGroupBases = (send: Send) => {
    const { setFilterType, setSearchFilter, setIsSearching } = navigatorStore.getState();

    setFilterType('group');
    setSearchFilter('');
    setIsSearching(true);

    send(new NewNavigatorSearchComposer({ searchCodeOriginal: 'groups', filteringData: '' }));

    systemStore.getState().showWindow('navigator');
};

/** `GroupDetailsCtrl.onBuyFurni` -> `openCatalog(CATALOG_PAGE_GROUP_FURNITURE)`. */
export const openGroupFurniCatalog = () => systemStore.getState().showWindow('catalog', { pageName: 'guild_custom_furni' });

/**
 * `HabboGroupsManager.openGroupForum`: a `groupforum/<id>` link. Nothing answers it yet - the
 * group forums are not ported - so the link is raised and logged as any unknown one is.
 */
export const openGroupForum = (send: Send, groupId: number) => openClientLink(send, `groupforum/${groupId}`);

/** `GroupDetailsCtrl.onDeleteGuild` + `onDeleteGuildConfirmation`. */
export const deleteGroup = (send: Send, groupId: number) => {
    systemStore.getState().showConfirm(t('group.deleteconfirm.title'), t('group.deleteconfirm.desc'), () => send(new DeactivateGuildComposer({ groupId })));
};

/**
 * `HabboGroupsManager.handleUserKick` / `handleUserBlock`: the furniture count comes first, and
 * the confirmation it raises is what actually sends the kick (`onKickConfirmation`).
 */
export const requestGroupMemberKick = (send: Send, groupId: number, userId: number, blocked: boolean = false) => {
    groupStore.getState().setGroupPendingKick({ guildId: groupId, userId, blocked });

    send(new GetMemberGuildItemCountComposer({ groupId, userId }));
};

/** `GroupDetailsCtrl.onLeave`: leaving is kicking yourself. */
export const leaveGroup = (send: Send, groupId: number) => requestGroupMemberKick(send, groupId, userStore.getState().userId);

/**
 * `HabboGroupsManager.onKickConfirmation`: the furniture count arrived, so the confirmation can
 * name it. Leaving has its own wording, and blocking a member its own again.
 */
export const confirmGroupMemberKick = (send: Send, userId: number, furniCount: number) => {
    const { pendingKick, members, setGroupPendingKick } = groupStore.getState();

    if (!pendingKick) return;

    const { showConfirm } = systemStore.getState();
    const isSelf = userId === userStore.getState().userId;
    const prefix = pendingKick.blocked ? 'group.block' : 'group.kick';
    const userName = members?.entries.find(entry => entry.userId === userId)?.userName ?? '';
    const amount = `${furniCount}`;

    const [ titleKey, messageKey, replacements ] = isSelf
        ? (furniCount > 0)
                ? [ 'group.leaveconfirm.title', 'group.leaveconfirm.desc', { amount } ]
                : [ 'group.leaveconfirm.title', 'group.leaveconfirm_nofurni.desc', {} ]
        : (furniCount > 0)
                ? [ `${prefix}confirm.title`, `${prefix}confirm.desc`, { amount, user: userName } ]
                : [ `${prefix}confirm.title`, `${prefix}confirm_nofurni.desc`, { user: userName } ];

    showConfirm(
        t(titleKey),
        t(messageKey, '', replacements),
        () => send(new KickMemberComposer({ guildId: pendingKick.guildId, userId: pendingKick.userId, blocked: pendingKick.blocked })),
        { onClose: () => setGroupPendingKick(undefined) },
    );
};

/**
 * `GuildMembersWindowCtrl.onMembersClick`: gated on `groupMembers.enabled`, and a second click on
 * the group already shown closes the window instead of asking again.
 */
export const toggleGroupMembers = (send: Send, groupId: number, searchType: number = GUILD_MEMBER_SEARCH_MEMBERS) => {
    if (!getBoolean('groupMembers.enabled')) return;

    const { members, membersGroupId, openGroupMembers, closeGroupMembers } = groupStore.getState();

    if (members && (membersGroupId === groupId)) {
        closeGroupMembers();

        return;
    }

    openGroupMembers(groupId);

    send(new GetGuildMembersComposer({ groupId, pageIndex: 0, searchText: '', searchType }));
};

/**
 * `GuildMembersWindowCtrl.doSearch`: a page of the current group, with the filter box and type as
 * they stand. A second request inside `REQUEST_PAGE_RATELIMIT` is dropped, so holding the page
 * buttons down does not put one packet on the wire per press.
 */
export const searchGroupMembers = (send: Send, pageIndex: number, searchText?: string, searchType?: number) => {
    const { members, filterText, lastSearchAt, setGroupMembersSearching, setGroupMembersLastSearch } = groupStore.getState();

    if (!members) return;

    const now = Date.now();

    if (lastSearchAt > (now - GROUP_MEMBER_REQUEST_PAGE_RATELIMIT)) return;

    setGroupMembersLastSearch(now);
    setGroupMembersSearching(true);

    send(new GetGuildMembersComposer({
        groupId: members.groupId,
        pageIndex,
        searchText: searchText ?? filterText,
        searchType: searchType ?? members.searchType,
    }));
};

/** `onGuildMemberMgmtFailed` / `onGuildMembershipRejected` / `onMembershipRequested`: the open page again. */
export const reloadGroupMembers = (send: Send, groupId: number) => {
    const { members } = groupStore.getState();

    if (!members || (members.groupId !== groupId)) return;

    searchGroupMembers(send, members.pageIndex);
};

/** `onPreviousPage` / `onNextPage`, and the page number input, all of which clamp to the page count. */
export const stepGroupMemberPage = (send: Send, pageIndex: number) => {
    const { members } = groupStore.getState();

    if (!members) return;

    searchGroupMembers(send, limitGroupMemberPage(members, pageIndex));
};

/**
 * `GuildMembersWindowCtrl.onActionLinkClick`: the one link every row carries, whose meaning is the
 * member's own type. An owner's row has no action.
 */
export const applyGroupMemberAction = (send: Send, member: IMemberData) => {
    const { members } = groupStore.getState();

    if (!members || isGuildMemberOwner(member)) return;

    const groupId = members.groupId;

    if (isGuildMemberBlocked(member)) send(new UnblockGroupMemberComposer({ groupId, userId: member.userId }));
    else if (isGuildMemberAdmin(member)) send(new RemoveAdminRightsFromMemberComposer({ groupId, userId: member.userId }));
    else if (isGuildMemberMember(member)) send(new AddAdminRightsToMemberComposer({ groupId, userId: member.userId }));
    else send(new ApproveMembershipRequestComposer({ groupId, userId: member.userId }));
};

/** `GuildMembersWindowCtrl.onRemoveMouseClick`: a member is kicked, a pending request is turned down. */
export const removeGroupMember = (send: Send, member: IMemberData) => {
    const { members } = groupStore.getState();

    if (!members || isGuildMemberOwner(member)) return;

    if (isGuildMemberMember(member)) requestGroupMemberKick(send, members.groupId, member.userId);
    else send(new RejectMembershipRequestComposer({ groupId: members.groupId, userId: member.userId }));
};

/** `GuildMembersWindowCtrl.onBlockMouseClick`. */
export const blockGroupMember = (send: Send, member: IMemberData) => {
    const { members } = groupStore.getState();

    if (!members || isGuildMemberOwner(member) || !isGuildMemberMember(member)) return;

    requestGroupMemberKick(send, members.groupId, member.userId, true);
};

/** `GuildMembersWindowCtrl.onBg`: a row opens that user's extended profile. */
export const showGroupMemberProfile = (send: Send, userId: number) => openProfile(send, userId);

/** `HabboGroupsManager.requestGuildEditorData` - asked for once a session, whichever window needs it. */
export const requestGuildEditorData = (send: Send) => {
    if (groupStore.getState().editorData) return;

    send(new GetGuildEditorDataComposer({}));
};

/** The creation wizard - `GuildMembershipsController.onCreateGroup` and the catalogue's buy-guild widget. */
export const startGroupCreation = (send: Send) => send(new GetGuildCreationInfoComposer({}));

/** `GroupDetailsCtrl.onManageGuild` / `GroupRoomInfoCtrl.onManage`. */
export const openGroupManagement = (send: Send, groupId: number) => send(new GetGuildEditInfoComposer({ groupId }));

/**
 * `GuildManagementWindowCtrl.validateView`: what a step has to hold before it may be left. It
 * raises the step's own alert and answers false, exactly as Flash does; the badge step has nothing
 * to check beyond closing the part picker (`onViewChange`).
 */
const validateGroupManagementView = (): boolean => {
    const { session, step, pickingLayerIndex, closeBadgePartPicker, setGroupWarnedControllersRoom } = groupStore.getState();

    if (!session) return false;

    const { showAlert } = systemStore.getState();

    switch (step) {
        case GROUP_MANAGEMENT_VIEW_IDENTITY: {
            if (!session.exists) {
                const baseRoom = session.ownedRooms.find(room => room.roomId === session.baseRoomId);

                if (!session.name.length || !baseRoom || (baseRoom.roomId === 0)) {
                    showAlert(t('group.edit.error.title'), t('group.edit.error.no.name.or.room.selected'));

                    return false;
                }

                // Warned once per room: warning about the same one twice would never let them past.
                if (baseRoom.hasControllers && (session.warnedControllersRoomId !== baseRoom.roomId)) {
                    setGroupWarnedControllersRoom(baseRoom.roomId);
                    showAlert(t('group.edit.error.warning'), t('group.edit.error.controllers'));

                    return false;
                }
            }

            if (session.name.length > GROUP_MAX_NAME_LENGTH) {
                showAlert(t('group.edit.error.title'), t('group.edit.error.name.length'));

                return false;
            }

            if (session.description.length >= GROUP_MAX_DESCRIPTION_LENGTH) {
                showAlert(t('group.edit.error.title'), t('group.edit.error.desc.length'));

                return false;
            }

            return true;
        }
        case GROUP_MANAGEMENT_VIEW_BADGE:
            if (pickingLayerIndex !== undefined) closeBadgePartPicker();

            return true;
        case GROUP_MANAGEMENT_VIEW_COLORS:
            if (!session.primaryColorId || !session.secondaryColorId) {
                showAlert(t('group.edit.error.title'), t('group.edit.error.no.color.selected'));

                return false;
            }

            return true;
        default:
            return true;
    }
};

/**
 * `GuildManagementWindowCtrl.saveView`: an existing group saves the step being left. The creation
 * wizard saves nothing - everything it collects goes out at once in `CreateGuildComposer`.
 */
const saveGroupManagementView = (send: Send) => {
    const { session, step, editorData } = groupStore.getState();

    if (!session || !session.exists || !session.isOwner) return;

    switch (step) {
        case GROUP_MANAGEMENT_VIEW_IDENTITY:
            send(new UpdateGuildIdentityComposer({ groupId: session.groupId, groupName: session.name, groupDescription: session.description }));

            return;
        case GROUP_MANAGEMENT_VIEW_BADGE:
            send(new UpdateGuildBadgeComposer({ groupId: session.groupId, badgeSettings: badgeSettingsFromLayers(session.layers, editorData) }));

            return;
        case GROUP_MANAGEMENT_VIEW_COLORS:
            send(new UpdateGuildColorsComposer({
                groupId: session.groupId,
                primaryColorId: session.primaryColorId,
                secondaryColorId: session.secondaryColorId,
            }));

            return;
        case GROUP_MANAGEMENT_VIEW_SETTINGS:
            send(new UpdateGuildSettingsComposer({ groupId: session.groupId, guildType: session.guildType, rightsLevel: session.rightsLevel }));

            return;
        default:
    }
};

/**
 * `onTab` (an existing group) and `onPreviousStep` / `onNextStep` (the wizard): validate, save what
 * is being left, then move. A step that does not validate stays put.
 */
export const goToGroupManagementStep = (send: Send, step: number) => {
    const { session, step: current, setGroupManagementStep, seedGroupColorsFromBadge } = groupStore.getState();

    if (!session || (step === current) || !validateGroupManagementView()) return;

    saveGroupManagementView(send);

    setGroupManagementStep(session.exists ? step : limitGroupManagementStep(step));

    // `refresh`: the colour step of a new group starts from the badge's own colours.
    if (groupStore.getState().step === GROUP_MANAGEMENT_VIEW_COLORS) seedGroupColorsFromBadge();
};

/** `onCloseWindow`: an existing group saves the open tab first, and a tab that does not validate keeps the window open. */
export const closeGroupManagement = (send: Send) => {
    const { session, closeGroupManagement: close } = groupStore.getState();

    if (session?.exists) {
        if (!validateGroupManagementView()) return;

        saveGroupManagementView(send);
    }

    close();
};

/** `onBuy` -> `sendCreateGuildMessage`. */
export const buyGroup = (send: Send) => {
    const { session, editorData, setGroupWarnedControllersRoom } = groupStore.getState();

    if (!session) return;

    const baseRoom = session.ownedRooms.find(room => room.roomId === session.baseRoomId);

    if (!baseRoom) return;

    setGroupWarnedControllersRoom(0);

    send(new CreateGuildComposer({
        groupName: session.name,
        groupDescription: session.description,
        roomId: baseRoom.roomId,
        primaryColorId: session.primaryColorId,
        secondaryColorId: session.secondaryColorId,
        badgeSettings: badgeSettingsFromLayers(session.layers, editorData),
    }));
};

/** `HcRequiredWindowCtrl.onOpenCatalog` and `GuildManagementWindowCtrl.onGetVip` - `openVipPurchase` -> `openClubCenter`. */
export const openGroupVipPurchase = (send: Send) => openClubCenter(send);
