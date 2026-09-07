import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '../useRoomContext';

export const useRoomChatSelector = () => useRoomContext(useShallow(x => ({
    chatBubbles: x.chatBubbles,
    floodBlockSeconds: x.floodBlockSeconds,
    floodBlockStamp: x.floodBlockStamp,
    chatInputContent: x.chatInputContent,
})));
