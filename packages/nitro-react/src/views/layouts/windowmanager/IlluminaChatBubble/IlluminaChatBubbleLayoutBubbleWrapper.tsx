import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { IlluminaChatBubbleLayoutMessageRegion, IlluminaChatBubbleLayoutMessageRegionProps } from './IlluminaChatBubbleLayoutMessageRegion';
import { IlluminaChatBubbleLayoutOfflinePlaceholderItem } from './IlluminaChatBubbleLayoutOfflinePlaceholderItem';
import { IlluminaChatBubbleLayoutPostTimeItem } from './IlluminaChatBubbleLayoutPostTimeItem';
import { IlluminaChatBubbleLayoutUserNameRegionItem } from './IlluminaChatBubbleLayoutUserNameRegionItem';

/** Named region `bubble_wrapper` of IlluminaChatBubbleLayout - configured through the parent's `bubbleWrapper` prop. */
export interface IlluminaChatBubbleLayoutBubbleWrapperProps {
    itemsBubbleWrapper?: ReactNode;
    layout?: BoxLayout;
    messageRegion?: IlluminaChatBubbleLayoutMessageRegionProps;
}

export const IlluminaChatBubbleLayoutBubbleWrapper = ({ itemsBubbleWrapper, layout, messageRegion }: IlluminaChatBubbleLayoutBubbleWrapperProps) => {
    return (
        <Region
            name="bubble_wrapper"
            layout={{ position: 'absolute', left: 52, top: 15, flexDirection: 'column', ...layout }}
        >
            {itemsBubbleWrapper ?? (
                <>
                    <IlluminaChatBubbleLayoutUserNameRegionItem />
                    <IlluminaChatBubbleLayoutPostTimeItem />
                    <IlluminaChatBubbleLayoutOfflinePlaceholderItem />
                </>
            )}
            <Border
                variant="106"
                layout={{ width: 207, height: 18, flexShrink: 0 }}
            >
                <IlluminaChatBubbleLayoutMessageRegion {...messageRegion} />
            </Border>
        </Region>
    );
};
