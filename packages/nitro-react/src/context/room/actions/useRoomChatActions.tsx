import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';

export const useRoomChatActions = () => useRoomContext(useShallow(x => ({
    addChatBubble: x.addChatBubble,
    removeChatBubble: x.removeChatBubble,
    clearChatBubbles: x.clearChatBubbles,
    setFloodBlock: x.setFloodBlock,
    setChatInputContent: x.setChatInputContent,
    clearChatInputContent: x.clearChatInputContent,
})));
