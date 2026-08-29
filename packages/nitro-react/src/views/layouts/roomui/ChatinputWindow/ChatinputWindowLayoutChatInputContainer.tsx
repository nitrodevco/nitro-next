import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowLayoutInputBorderItem } from './ChatinputWindowLayoutInputBorderItem';
import { ChatinputWindowLayoutSendButtonItem } from './ChatinputWindowLayoutSendButtonItem';
import { ChatinputWindowLayoutStylesItem } from './ChatinputWindowLayoutStylesItem';

/** Named region `chat_input_container` of ChatinputWindowLayout - configured through the parent's `chatInputContainer` prop. */
export interface ChatinputWindowLayoutChatInputContainerProps {
    itemsChatInputContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutChatInputContainer = ({ itemsChatInputContainer, layout }: ChatinputWindowLayoutChatInputContainerProps) => {
    return (
        <Region
            name="chat_input_container"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 484, top: 60, height: 57, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsChatInputContainer ?? (
                <>
                    <ChatinputWindowLayoutStylesItem />
                    <ChatinputWindowLayoutInputBorderItem />
                    <ChatinputWindowLayoutSendButtonItem />
                </>
            )}
        </Region>
    );
};
