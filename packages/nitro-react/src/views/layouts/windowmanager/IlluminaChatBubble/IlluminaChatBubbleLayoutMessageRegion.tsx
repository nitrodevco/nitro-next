import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { IlluminaChatBubbleLayoutMessageContainerItem } from './IlluminaChatBubbleLayoutMessageContainerItem';
import { IlluminaChatBubbleLayoutSpacingItem } from './IlluminaChatBubbleLayoutSpacingItem';
import { IlluminaChatBubbleLayoutSpacingItem2 } from './IlluminaChatBubbleLayoutSpacingItem2';

/** Named region `message_region` of IlluminaChatBubbleLayout - configured through the parent's `messageRegion` prop. */
export interface IlluminaChatBubbleLayoutMessageRegionProps {
    itemsSpacedMessageContainer?: ReactNode;
    layout?: BoxLayout;
    onMessageRegion?: () => void;
}

export const IlluminaChatBubbleLayoutMessageRegion = ({ itemsSpacedMessageContainer, layout, onMessageRegion }: IlluminaChatBubbleLayoutMessageRegionProps) => {
    return (
        <Region
            name="message_region"
            onPointerTap={onMessageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18, ...layout }}
        >
            <Region
                name="spaced_message_container"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
            >
                {itemsSpacedMessageContainer ?? (
                    <>
                        <IlluminaChatBubbleLayoutSpacingItem />
                        <IlluminaChatBubbleLayoutMessageContainerItem />
                        <IlluminaChatBubbleLayoutSpacingItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};
