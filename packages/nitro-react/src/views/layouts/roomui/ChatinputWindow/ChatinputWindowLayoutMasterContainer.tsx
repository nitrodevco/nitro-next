import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowLayoutBubblecont, ChatinputWindowLayoutBubblecontProps } from './ChatinputWindowLayoutBubblecont';

/** Named region `master_container` of ChatinputWindowLayout - configured through the parent's `masterContainer` prop. */
export interface ChatinputWindowLayoutMasterContainerProps {
    bubblecont?: ChatinputWindowLayoutBubblecontProps;
    chatstylesMenu?: ReactNode;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutMasterContainer = ({ bubblecont, chatstylesMenu, layout }: ChatinputWindowLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            layout={{ position: 'absolute', left: 0, width: 1280, top: 0, height: 1024, minWidth: 90, ...layout }}
        >
            <ChatinputWindowLayoutBubblecont {...bubblecont} />
            <Region
                name="chatstyles_menu"
                dropShadow={{ distance: 4, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 2, width: 160, bottom: 258, height: 105 }}
            >
                {chatstylesMenu}
            </Region>
        </Region>
    );
};
