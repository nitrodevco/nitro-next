import { createContext, useContext } from 'react';

import { ChatBubbleMotion, IChatFlowHost } from '#base/chat';

/** What `ChatFlowProvider` hands its bubbles: the host facts a bubble's motion needs, and the register/unregister pair that puts it into the simulation. */
export interface ChatFlowContextValue {
    host: IChatFlowHost;
    /** The wrap width the user's bubble-width preference maps to - shared here so bubbles don't each subscribe to the user store. */
    maxBubbleWidth: number;
    /** A bubble was clicked: select its speaker in the room. One stable callback for every bubble. */
    selectBubbleUser: (objectId: number) => void;
    /** A laid-out bubble joins the flow; the simulation places it and starts moving it. */
    addBubble: (bubble: ChatBubbleMotion) => void;
    /** The bubble unmounted. */
    removeBubble: (bubble: ChatBubbleMotion) => void;
}

export const ChatFlowContext = createContext<ChatFlowContextValue | null>(null);

export const useChatFlow = (): ChatFlowContextValue => {
    const value = useContext(ChatFlowContext);

    if (!value) throw new Error('useChatFlow must be used within ChatFlowProvider');

    return value;
};
