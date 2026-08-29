import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { IlluminaChatBubbleLayoutHabbiconTemplateItem } from './IlluminaChatBubbleLayoutHabbiconTemplateItem';
import { IlluminaChatBubbleLayoutMessageTemplateItem } from './IlluminaChatBubbleLayoutMessageTemplateItem';

/** Row template `message_container` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageContainerItemProps {
    itemsMessageContainer?: ReactNode;
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutMessageContainerItem = ({ itemsMessageContainer, layout }: IlluminaChatBubbleLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsMessageContainer ?? (
                <>
                    <IlluminaChatBubbleLayoutMessageTemplateItem />
                    <IlluminaChatBubbleLayoutHabbiconTemplateItem />
                </>
            )}
        </Region>
    );
};
