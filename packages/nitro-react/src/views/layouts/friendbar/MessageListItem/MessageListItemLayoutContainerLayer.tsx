import { BoxLayout, Region } from '#base/theme';

import { MessageListItemLayoutMsgContainer, MessageListItemLayoutMsgContainerProps } from './MessageListItemLayoutMsgContainer';
import { MessageListItemLayoutTextsContainer, MessageListItemLayoutTextsContainerProps } from './MessageListItemLayoutTextsContainer';

/** Named region `container_layer` of MessageListItemLayout - configured through the parent's `containerLayer` prop. */
export interface MessageListItemLayoutContainerLayerProps {
    layout?: BoxLayout;
    msgContainer?: MessageListItemLayoutMsgContainerProps;
    textsContainer?: MessageListItemLayoutTextsContainerProps;
}

export const MessageListItemLayoutContainerLayer = ({ layout, msgContainer, textsContainer }: MessageListItemLayoutContainerLayerProps) => {
    return (
        <Region
            name="container_layer"
            layout={{ position: 'absolute', left: 0, width: 670, top: 0, height: 126, minWidth: 0, minHeight: 0, ...layout }}
        >
            <MessageListItemLayoutMsgContainer {...msgContainer} />
            <MessageListItemLayoutTextsContainer {...textsContainer} />
        </Region>
    );
};
