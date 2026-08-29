import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowNewLayoutBubblecont, ChatinputWindowNewLayoutBubblecontProps } from './ChatinputWindowNewLayoutBubblecont';

/** Named region `master_container` of ChatinputWindowNewLayout - configured through the parent's `masterContainer` prop. */
export interface ChatinputWindowNewLayoutMasterContainerProps {
    bubblecont?: ChatinputWindowNewLayoutBubblecontProps;
    chatstylesMenu?: ReactNode;
    habbiconMenu?: ReactNode;
    layout?: BoxLayout;
}

export const ChatinputWindowNewLayoutMasterContainer = ({ bubblecont, chatstylesMenu, habbiconMenu, layout }: ChatinputWindowNewLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            layout={{ position: 'absolute', left: 0, width: 471, top: 0, height: 100, minWidth: 90, ...layout }}
        >
            <ChatinputWindowNewLayoutBubblecont {...bubblecont} />
            <Region
                name="chatstyles_menu"
                dropShadow={{ distance: 4, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 2, width: 160, bottom: 46, height: 60 }}
            >
                {chatstylesMenu}
            </Region>
            <Region
                name="habbicon_menu"
                dropShadow={{ distance: 4, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 2, width: 270, bottom: -154, height: 260 }}
            >
                {habbiconMenu}
            </Region>
        </Region>
    );
};
