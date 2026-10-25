/**
 * The help store's actions. Zustand actions are created once and never change, so they are read off
 * the store a single time here rather than subscribed to: a component using these re-renders for
 * nothing.
 */
import { helpStore } from '../store';

const state = helpStore.getState();

const actions = {
    addChatItem: state.addChatItem,
    setChatItemSelected: state.setChatItemSelected,
    setHoldPurges: state.setHoldPurges,
    deselectChatItems: state.deselectChatItems,
    addImItem: state.addImItem,
    setImItemSelected: state.setImItemSelected,
    setImHoldPurges: state.setImHoldPurges,
    registerRoom: state.registerRoom,
    registerUser: state.registerUser,
    setCallForHelpCategories: state.setCallForHelpCategories,
    setReportedUserId: state.setReportedUserId,
    setReportedRoomId: state.setReportedRoomId,
    setReportedRoomName: state.setReportedRoomName,
    setReportedPhoto: state.setReportedPhoto,
    setReportedForumPost: state.setReportedForumPost,
};

export const useHelpActions = () => actions;
