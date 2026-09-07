import { useShallow } from 'zustand/shallow';

import { useUserContext } from '../useUserContext';

export const useOwnChatPreferences = () => useUserContext(useShallow(x => ({
    preferredChatStyle: x.preferredChatStyle,
    freeFlowChatDisabled: x.freeFlowChatDisabled,
    chatSizePreference: x.chatSizePreference,
    chatMode: x.chatMode,
    chatBubbleWidth: x.chatBubbleWidth,
    chatScrollSpeed: x.chatScrollSpeed,
})));
