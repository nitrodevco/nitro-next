import { BoxLayout, Region } from '#base/theme';

import { MessageListItemLayoutContainerLayer, MessageListItemLayoutContainerLayerProps } from './MessageListItemLayoutContainerLayer';

/** Generated from `40_message_list_item_xml` (layout "message_list_item", 670x126) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageListItemLayoutProps {
    containerLayer?: MessageListItemLayoutContainerLayerProps;
    layout?: BoxLayout;
}

export const MessageListItemLayout = ({ containerLayer, layout }: MessageListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 670, height: 126, ...layout }}>
            <MessageListItemLayoutContainerLayer {...containerLayer} />
        </Region>
    );
};
