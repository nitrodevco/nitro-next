import { groupStore } from '../store/GroupStore';

const state = groupStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single time
 * here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setGroupDetails: state.setGroupDetails,
    closeGroupInfo: state.closeGroupInfo,
    forgetGroup: state.forgetGroup,

    openGroupMembers: state.openGroupMembers,
    setGroupMembers: state.setGroupMembers,
    updateGroupMember: state.updateGroupMember,
    setGroupMembersSearching: state.setGroupMembersSearching,
    setGroupMembersFilterText: state.setGroupMembersFilterText,
    setGroupPendingKick: state.setGroupPendingKick,
    setGroupMembersLastSearch: state.setGroupMembersLastSearch,
    closeGroupMembers: state.closeGroupMembers,

    openGroupCreation: state.openGroupCreation,
    openGroupEdit: state.openGroupEdit,
    closeGroupManagement: state.closeGroupManagement,
    setGroupManagementStep: state.setGroupManagementStep,
    setGroupManagementName: state.setGroupManagementName,
    setGroupManagementDescription: state.setGroupManagementDescription,
    setGroupManagementBaseRoom: state.setGroupManagementBaseRoom,
    addGroupManagementRoom: state.addGroupManagementRoom,
    setGroupBadgeLayer: state.setGroupBadgeLayer,
    resetGroupBadge: state.resetGroupBadge,
    resetGroupColors: state.resetGroupColors,
    setGroupPrimaryColor: state.setGroupPrimaryColor,
    setGroupSecondaryColor: state.setGroupSecondaryColor,
    setGroupType: state.setGroupType,
    setGroupRightsLevel: state.setGroupRightsLevel,
    setGroupWarnedControllersRoom: state.setGroupWarnedControllersRoom,
    seedGroupColorsFromBadge: state.seedGroupColorsFromBadge,
    openBadgePartPicker: state.openBadgePartPicker,
    closeBadgePartPicker: state.closeBadgePartPicker,
    setGuildEditorData: state.setGuildEditorData,
    setCreatedGroupId: state.setCreatedGroupId,
    setHcRequiredFor: state.setHcRequiredFor,

    setGroupRoomExpectation: state.setGroupRoomExpectation,
    setGroupRoomInfo: state.setGroupRoomInfo,
    toggleGroupRoomInfoExpanded: state.toggleGroupRoomInfoExpanded,
    closeGroupRoomInfo: state.closeGroupRoomInfo,
    setGroupCurrentRoom: state.setGroupCurrentRoom,
};

export const useGroupActions = () => actions;
