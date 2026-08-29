import { BoxLayout, Region } from '#base/theme';

import { ChatinputWindowLayoutMasterContainer, ChatinputWindowLayoutMasterContainerProps } from './ChatinputWindowLayoutMasterContainer';

/** Generated from `925_chatinput_window_xml` (layout "chatinput_window", 1280x1024) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatinputWindowLayoutProps {
    layout?: BoxLayout;
    masterContainer?: ChatinputWindowLayoutMasterContainerProps;
}

export const ChatinputWindowLayout = ({ layout, masterContainer }: ChatinputWindowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1280, height: 1024, ...layout }}>
            <ChatinputWindowLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};
