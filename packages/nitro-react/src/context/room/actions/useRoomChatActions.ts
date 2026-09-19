import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    addChatBubble: state.addChatBubble,
    removeChatBubble: state.removeChatBubble,
    clearChatBubbles: state.clearChatBubbles,
    setFloodBlock: state.setFloodBlock,
    setChatInputContent: state.setChatInputContent,
    clearChatInputContent: state.clearChatInputContent,
};

export const useRoomChatActions = () => actions;
