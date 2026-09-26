/**
 * Every group packet `HabboGroupsManager.initComponent` subscribes to, and where its answer goes.
 * One listener fans an answer out the way the manager hands it to each of its window controllers:
 * `HabboGroupDetailsMessage` fills the details cache, the details window and the room banner at
 * once, so the infostand's group name and the group window read the same record.
 *
 * The extended profile's four subscriptions (`ExtendedProfileMessage`,
 * `ExtendedProfileChangedMessage`, `RelationshipStatusInfoMessage`, `HabboUserBadgesMessage`) are
 * handled by `registerProfileHandlers`, the port of `ExtendedProfileWindowCtrl`; the badges and
 * relationships are also read by `registerRoomInfostandHandlers` for the avatar menu.
 * `ScrSendUserInfoMessage` only re-drew the confirm step's VIP panel, which reads the club level
 * from `userStore` as it renders, and `UserObjectMessage` only kept the avatar id, which
 * `userStore` holds.
 */
import {
    CloseConnectionMessage, FlatCreatedMessage, GetGuestRoomResultMessage, GroupDetailsChangedMessage, GroupMembershipRequestedMessage, GuildCreatedMessage,
    GuildCreationInfoMessage, GuildEditFailedMessage, GuildEditInfoMessage, GuildEditorDataMessage, GuildMemberFurniCountInHQMessage, GuildMemberMgmtFailedMessage,
    GuildMembershipRejectedMessage, GuildMembershipUpdatedMessage, GuildMembersMessage, HabboGroupDeactivatedMessage, HabboGroupDetailsMessage,
    HabboGroupJoinFailedMessage, RoomEntryInfoMessage,
} from '@nitrodevco/nitro-packets';

import { confirmGroupMemberKick, forwardToRoom, reloadGroupMembers, requestGroupDetails, requestGuildEditorData } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { groupStore } from '#base/context/groups';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `onJoinFailed`'s club reason, which opens the club window instead of an alert. */
const JOIN_FAIL_CLUB_REQUIRED = 4;

/** `onGuildEditFailed`'s club reason. */
const EDIT_FAIL_CLUB_REQUIRED = 2;

export const registerGroupHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const {
        setGroupDetails, forgetGroup, closeGroupInfo,
        setGroupMembers, updateGroupMember,
        openGroupCreation, openGroupEdit, closeGroupManagement, addGroupManagementRoom, setGuildEditorData, setCreatedGroupId, setHcRequiredFor,
        setGroupRoomExpectation, setGroupRoomInfo, closeGroupRoomInfo, setGroupCurrentRoom,
    } = groupStore.getState();

    /** `onJoinFailed` / `onGuildEditFailed`: one localized alert per reason, with the key as its own fallback. */
    const failureAlert = (titleKey: string, reasonKey: string) => {
        const { getLocalizationValue, showAlert } = systemStore.getState();

        showAlert(getLocalizationValue(titleKey), getLocalizationValue(reasonKey, reasonKey));
    };

    return subscribeAll(subscribe, [
        on(HabboGroupDetailsMessage, (data) => {
            setGroupDetails(data.data);
            setGroupRoomInfo(data.data.groupId);
        }),

        // `onGroupDetailsChanged`: only a group a window is actually showing is worth asking about again.
        on(GroupDetailsChangedMessage, (data) => {
            const { infoGroupId, roomGroupId } = groupStore.getState();

            if ((infoGroupId !== data.groupId) && (roomGroupId !== data.groupId)) return;

            requestGroupDetails(send, data.groupId);
        }),

        on(HabboGroupDeactivatedMessage, (data) => {
            forgetGroup(data.groupId);

            const { expectedGroupId, roomGroupId } = groupStore.getState();

            if ((expectedGroupId === data.groupId) || (roomGroupId === data.groupId)) closeGroupRoomInfo();
        }),

        on(HabboGroupJoinFailedMessage, (data) => {
            if (Number(data.reason) === JOIN_FAIL_CLUB_REQUIRED) setHcRequiredFor('join');
            else failureAlert('group.joinfail.title', `group.joinfail.${data.reason}`);
        }),

        on(GuildEditFailedMessage, (data) => {
            if (Number(data.reason) === EDIT_FAIL_CLUB_REQUIRED) setHcRequiredFor('manage');
            else failureAlert('group.edit.fail.title', `group.edit.fail.${data.reason}`);
        }),

        // The wizard and the editor both need the badge parts; the request is skipped once they are in.
        on(GuildCreationInfoMessage, (data) => {
            openGroupCreation(data.data);
            requestGuildEditorData(send);
        }),

        on(GuildEditInfoMessage, (data) => {
            openGroupEdit(data.data);
            requestGuildEditorData(send);
        }),

        on(GuildEditorDataMessage, data => setGuildEditorData(data.data)),

        /*
         * `onGuildCreated`: the welcome window, and a walk to the new base room when that is not
         * the room being stood in. The banner is told to expect the new *group*, so the details
         * that follow fill it.
         */
        on(GuildCreatedMessage, (data) => {
            setCreatedGroupId(data.groupId);
            closeGroupManagement();
            setGroupRoomExpectation(data.groupId);

            if (groupStore.getState().currentRoomId === data.baseRoomId) return;

            forwardToRoom(send, data.baseRoomId);
        }),

        // `onFlatCreated`: a room made while the wizard is open joins its base-room list.
        on(FlatCreatedMessage, (data) => {
            const { session } = groupStore.getState();

            if (!session || session.exists) return;

            addGroupManagementRoom(data.roomId, data.name);
        }),

        on(GuildMembersMessage, data => setGroupMembers(data.data)),

        on(GuildMembershipUpdatedMessage, (data) => {
            updateGroupMember(data.guildId, data.member);
        }),

        on(GuildMembershipRejectedMessage, data => reloadGroupMembers(send, data.guildId)),

        on(GroupMembershipRequestedMessage, data => reloadGroupMembers(send, data.groupId)),

        on(GuildMemberMgmtFailedMessage, (data) => {
            failureAlert('group.membermgmt.fail.title', `group.membermgmt.fail.${data.reason}`);
            reloadGroupMembers(send, data.guildId);
        }),

        // The answer to the count asked for before a kick: the confirmation names it, and its OK sends the kick.
        on(GuildMemberFurniCountInHQMessage, data => confirmGroupMemberKick(send, data.userId, data.furniCount)),

        /*
         * `onRoomInfo`: a room being entered names the group it belongs to, and the banner is drawn
         * once that group's details arrive. A room with no group clears it.
         */
        on(GetGuestRoomResultMessage, (data) => {
            if (!data.enterRoom) return;

            const groupId = data.roomInfo.groupId;

            setGroupRoomExpectation(groupId);

            if (groupId > 0) requestGroupDetails(send, groupId);
        }),

        /*
         * `onRoomEnter`: the details window and the banner belong to the room being left, and the
         * room entered is the one `onGuildCreated` compares a new group's base against. The members
         * window is not closed - it outlives a room change in the client too.
         */
        on(RoomEntryInfoMessage, (data) => {
            closeGroupInfo();
            closeGroupRoomInfo();
            setGroupCurrentRoom(data.roomId);
        }),

        on(CloseConnectionMessage, () => {
            closeGroupInfo();
            closeGroupRoomInfo();
        }),
    ]);
};
