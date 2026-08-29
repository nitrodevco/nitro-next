import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutHeaderTopItem } from './RoomInfoPopupBubbleLayoutHeaderTopItem';

/** Named region `header_content` of RoomInfoPopupBubbleLayout - configured through the parent's `headerContent` prop. */
export interface RoomInfoPopupBubbleLayoutHeaderContentProps {
    itemsHeaderContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutHeaderContent = ({ itemsHeaderContent, layout }: RoomInfoPopupBubbleLayoutHeaderContentProps) => {
    return (
        <Region
            name="header_content"
            layout={{ position: 'absolute', left: 7, right: 7, top: 6, bottom: 7, flexDirection: 'column', gap: 7, ...layout }}
        >
            {itemsHeaderContent ?? (
                <RoomInfoPopupBubbleLayoutHeaderTopItem />
            )}
        </Region>
    );
};
