import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowLayoutChatInputContainer, ChatinputWindowLayoutChatInputContainerProps } from './ChatinputWindowLayoutChatInputContainer';

/** Named region `bubblecont` of ChatinputWindowLayout - configured through the parent's `bubblecont` prop. */
export interface ChatinputWindowLayoutBubblecontProps {
    chatInputContainer?: ChatinputWindowLayoutChatInputContainerProps;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutBubblecont = ({ chatInputContainer, layout }: ChatinputWindowLayoutBubblecontProps) => {
    return (
        <Region
            name="bubblecont"
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 18, width: 733, bottom: 238, height: 117, minWidth: 90, justifyContent: 'center', ...layout }}
        >
            <ChatinputWindowLayoutChatInputContainer {...chatInputContainer} />
        </Region>
    );
};
