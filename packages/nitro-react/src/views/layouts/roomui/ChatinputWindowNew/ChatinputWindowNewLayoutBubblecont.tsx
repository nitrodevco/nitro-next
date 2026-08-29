import { BoxLayout, CloseButton, Region } from '#base/theme';

import { ChatinputWindowNewLayoutChatInputContainer, ChatinputWindowNewLayoutChatInputContainerProps } from './ChatinputWindowNewLayoutChatInputContainer';

/** Named region `bubblecont` of ChatinputWindowNewLayout - configured through the parent's `bubblecont` prop. */
export interface ChatinputWindowNewLayoutBubblecontProps {
    chatInputContainer?: ChatinputWindowNewLayoutChatInputContainerProps;
    layout?: BoxLayout;
    onHelpbutton?: () => void;
}

export const ChatinputWindowNewLayoutBubblecont = ({ chatInputContainer, layout, onHelpbutton }: ChatinputWindowNewLayoutBubblecontProps) => {
    return (
        <Region
            name="bubblecont"
            layout={{ position: 'absolute', left: 0, width: 471, bottom: 0, height: 100, minWidth: 90, ...layout }}
        >
            <ChatinputWindowNewLayoutChatInputContainer {...chatInputContainer} />
            <CloseButton
                variant="4"
                name="helpbutton"
                onPointerTap={onHelpbutton}
                layout={{ position: 'absolute', left: 382, width: 20, top: 68, height: 25, minHeight: 25, maxHeight: 25 }}
            />
        </Region>
    );
};
