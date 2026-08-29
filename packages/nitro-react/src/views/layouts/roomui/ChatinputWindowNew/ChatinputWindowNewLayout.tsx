import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowNewLayoutMasterContainer, ChatinputWindowNewLayoutMasterContainerProps } from './ChatinputWindowNewLayoutMasterContainer';

/** Generated from `1021_chatinput_window_new_xml` (layout "chatinput_window_new", 471x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatinputWindowNewLayoutProps {
    layout?: BoxLayout;
    masterContainer?: ChatinputWindowNewLayoutMasterContainerProps;
}

export const ChatinputWindowNewLayout = ({ layout, masterContainer }: ChatinputWindowNewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 471, height: 100, ...layout }}>
            <ChatinputWindowNewLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};
